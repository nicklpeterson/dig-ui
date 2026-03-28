import { useState } from "react";
import type { DnsRecord, DnsQuestion } from "@/lib/dns-types";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ResultSectionProps {
  title: string;
  count: number;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

export function ResultSection({
  title,
  count,
  defaultOpen = true,
  children,
}: ResultSectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  if (count === 0) return null;

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center gap-2 py-2 text-xs font-medium uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors duration-150"
      >
        <ChevronRight
          className={cn(
            "h-3.5 w-3.5 transition-transform duration-150",
            open && "rotate-90",
          )}
        />
        {title}
        <span className="text-muted-foreground/60">{count}</span>
      </button>
      {open && <div className="pb-2">{children}</div>}
    </div>
  );
}

export function QuestionTable({ questions }: { questions: DnsQuestion[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm font-mono">
        <thead>
          <tr className="text-left text-xs text-muted-foreground">
            <th className="pr-6 pb-1 font-medium">Name</th>
            <th className="pr-6 pb-1 font-medium">Type</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((q, i) => (
            <tr key={i} className="border-t border-border/50">
              <td className="pr-6 py-1.5">{q.name}</td>
              <td className="pr-6 py-1.5">{q.typeName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function RecordTable({ records }: { records: DnsRecord[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm font-mono">
        <thead>
          <tr className="text-left text-xs text-muted-foreground">
            <th className="pr-6 pb-1 font-medium">Name</th>
            <th className="pr-4 pb-1 font-medium">TTL</th>
            <th className="pr-4 pb-1 font-medium">Type</th>
            <th className="pb-1 font-medium">Data</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r, i) => (
            <tr key={i} className="border-t border-border/50">
              <td className="pr-6 py-1.5 text-muted-foreground">{r.name}</td>
              <td className="pr-4 py-1.5 text-muted-foreground">{r.TTL}</td>
              <td className="pr-4 py-1.5">{r.typeName}</td>
              <td className="py-1.5 break-all">{r.data}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
