import type { DnsResponse } from "@/lib/dns-types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ResultSection,
  QuestionTable,
  RecordTable,
} from "./ResultSection";
import { StatsFooter } from "./StatsFooter";
import { CopyButton } from "./CopyButton";

interface ResultsPanelProps {
  response: DnsResponse;
}

function formatRawOutput(response: DnsResponse): string {
  const lines: string[] = [];

  lines.push(
    `;; ->>HEADER<<- opcode: QUERY, status: ${response.statusText}, id: ---`,
  );

  const flags = [
    response.recursionDesired && "rd",
    response.recursionAvailable && "ra",
    response.authenticatedData && "ad",
  ]
    .filter(Boolean)
    .join(" ");
  lines.push(`;; flags: ${flags}; QUERY: ${response.question.length}, ANSWER: ${response.answer.length}, AUTHORITY: ${response.authority.length}, ADDITIONAL: ${response.additional.length}`);
  lines.push("");

  if (response.question.length > 0) {
    lines.push(";; QUESTION SECTION:");
    for (const q of response.question) {
      lines.push(`;${q.name}.\t\t\tIN\t${q.typeName}`);
    }
    lines.push("");
  }

  if (response.answer.length > 0) {
    lines.push(";; ANSWER SECTION:");
    for (const r of response.answer) {
      lines.push(`${r.name}.\t${r.TTL}\tIN\t${r.typeName}\t${r.data}`);
    }
    lines.push("");
  }

  if (response.authority.length > 0) {
    lines.push(";; AUTHORITY SECTION:");
    for (const r of response.authority) {
      lines.push(`${r.name}.\t${r.TTL}\tIN\t${r.typeName}\t${r.data}`);
    }
    lines.push("");
  }

  if (response.additional.length > 0) {
    lines.push(";; ADDITIONAL SECTION:");
    for (const r of response.additional) {
      lines.push(`${r.name}.\t${r.TTL}\tIN\t${r.typeName}\t${r.data}`);
    }
    lines.push("");
  }

  lines.push(`;; Query time: ${response.queryTime} msec`);
  lines.push(`;; SERVER: ${response.server}`);
  lines.push(`;; WHEN: ${new Date(response.timestamp).toUTCString()}`);

  return lines.join("\n");
}

export function ResultsPanel({ response }: ResultsPanelProps) {
  return (
    <Tabs defaultValue="formatted" className="w-full">
      <TabsList variant="line" className="bg-transparent border-b border-border rounded-none w-full justify-start gap-0 px-0 h-auto">
        <TabsTrigger
          value="formatted"
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 pb-2 pt-1 text-xs font-medium"
        >
          Formatted
        </TabsTrigger>
        <TabsTrigger
          value="raw"
          className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 pb-2 pt-1 text-xs font-medium"
        >
          Raw
        </TabsTrigger>
      </TabsList>

      <TabsContent value="formatted" className="mt-4 space-y-1">
        <ResultSection
          title="Question"
          count={response.question.length}
          defaultOpen={false}
        >
          <QuestionTable questions={response.question} />
        </ResultSection>

        <ResultSection title="Answer" count={response.answer.length}>
          <RecordTable records={response.answer} />
        </ResultSection>

        <ResultSection
          title="Authority"
          count={response.authority.length}
          defaultOpen={false}
        >
          <RecordTable records={response.authority} />
        </ResultSection>

        <ResultSection
          title="Additional"
          count={response.additional.length}
          defaultOpen={false}
        >
          <RecordTable records={response.additional} />
        </ResultSection>

        <StatsFooter response={response} />
      </TabsContent>

      <TabsContent value="raw" className="mt-4">
        <div className="relative group">
          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
            <CopyButton text={formatRawOutput(response)} />
          </div>
          <pre className="bg-muted p-4 text-sm font-mono leading-relaxed overflow-x-auto whitespace-pre" style={{ borderRadius: "var(--radius)" }}>
            {formatRawOutput(response)}
          </pre>
        </div>
        <StatsFooter response={response} />
      </TabsContent>
    </Tabs>
  );
}
