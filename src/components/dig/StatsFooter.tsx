import type { DnsResponse } from "@/lib/dns-types";

interface StatsFooterProps {
  response: DnsResponse;
}

export function StatsFooter({ response }: StatsFooterProps) {
  const time = new Date(response.timestamp);
  const formatted = time.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div className="flex flex-wrap gap-x-6 gap-y-1 pt-4 border-t border-border/50 text-xs font-mono text-muted-foreground">
      <span>Query time: {response.queryTime}ms</span>
      <span>Server: {response.server}</span>
      <span>When: {formatted}</span>
      <span>Status: {response.statusText}</span>
      {response.authenticatedData && <span>DNSSEC: validated</span>}
    </div>
  );
}
