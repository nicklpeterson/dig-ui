import { useEffect } from "react";
import { useDigQuery } from "@/hooks/use-dig-query";
import { QueryForm } from "./QueryForm";
import { AdvancedOptions } from "./AdvancedOptions";
import { ResultsPanel } from "./ResultsPanel";
import { ThemeToggle } from "./ThemeToggle";
import { Skeleton } from "@/components/ui/skeleton";

export function DigApp() {
  const {
    name,
    setName,
    type,
    setType,
    server,
    setServer,
    dnssec,
    setDnssec,
    ednsSubnet,
    setEdnsSubnet,
    state,
    submit,
  } = useDigQuery();

  // Sync form state to URL params
  useEffect(() => {
    if (state.status !== "success") return;
    const q = state.query;
    const params = new URLSearchParams();
    params.set("name", q.name);
    params.set("type", q.type);
    params.set("server", q.server);
    if (q.dnssec) params.set("dnssec", "1");
    if (q.ednsSubnet) params.set("edns", q.ednsSubnet);
    window.history.replaceState(null, "", `?${params.toString()}`);
  }, [state]);

  // Load from URL params on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlName = params.get("name");
    if (urlName) {
      setName(urlName);
      const urlType = params.get("type");
      if (urlType) setType(urlType);
      const urlServer = params.get("server");
      if (urlServer) setServer(urlServer);
      if (params.get("dnssec") === "1") setDnssec(true);
      const urlEdns = params.get("edns");
      if (urlEdns) setEdnsSubnet(urlEdns);
    }
  }, [setName, setType, setServer, setDnssec, setEdnsSubnet]);

  // Global keyboard shortcut: / to focus hostname input
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (
        e.key === "/" &&
        !e.metaKey &&
        !e.ctrlKey &&
        !(e.target instanceof HTMLInputElement) &&
        !(e.target instanceof HTMLTextAreaElement)
      ) {
        e.preventDefault();
        const input = document.querySelector<HTMLInputElement>(
          'input[placeholder="example.com"]',
        );
        input?.focus();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-8 md:py-16">
      <div className="mb-2 flex items-center justify-between">
        <h1 className="text-sm font-medium text-muted-foreground tracking-wide">
          dig
        </h1>
        <ThemeToggle />
      </div>

      <QueryForm
        name={name}
        onNameChange={setName}
        type={type}
        onTypeChange={setType}
        server={server}
        onServerChange={setServer}
        onSubmit={submit}
        loading={state.status === "loading"}
      />

      <AdvancedOptions
        dnssec={dnssec}
        onDnssecChange={setDnssec}
        ednsSubnet={ednsSubnet}
        onEdnsSubnetChange={setEdnsSubnet}
      />

      <div className="mt-8">
        {state.status === "loading" && (
          <div className="space-y-3">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        )}

        {state.status === "error" && (
          <div
            className="border border-destructive/30 bg-destructive/5 p-4 text-sm"
            style={{ borderRadius: "var(--radius)" }}
          >
            <p className="font-medium text-destructive">Query failed</p>
            <p className="mt-1 text-muted-foreground font-mono text-xs">
              {state.error}
            </p>
          </div>
        )}

        {state.status === "success" && (
          <ResultsPanel response={state.response} />
        )}
      </div>
    </div>
  );
}
