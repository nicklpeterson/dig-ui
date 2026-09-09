import { useCallback, useState } from "react";
import { queryDns } from "@/lib/api-client";
import { DEFAULT_SERVER_ID } from "@/lib/dns-servers";
import type { DnsQuery, QueryState } from "@/lib/dns-types";
import { DEFAULT_RECORD_TYPE } from "@/lib/record-types";

export function useDigQuery() {
	const [name, setName] = useState("");
	const [type, setType] = useState(DEFAULT_RECORD_TYPE);
	const [server, setServer] = useState(DEFAULT_SERVER_ID);
	const [dnssec, setDnssec] = useState(false);
	const [ednsSubnet, setEdnsSubnet] = useState("");
	const [state, setState] = useState<QueryState>({ status: "idle" });

	const submit = useCallback(async () => {
		const trimmed = name.trim();
		if (!trimmed) return;

		const query: DnsQuery = {
			name: trimmed,
			type,
			server,
			...(dnssec && { dnssec }),
			...(ednsSubnet && { ednsSubnet }),
		};

		setState({ status: "loading", query });

		try {
			const response = await queryDns(query);
			setState({ status: "success", query, response });
		} catch (err) {
			const message = err instanceof Error ? err.message : "Query failed";
			setState({ status: "error", query, error: message });
		}
	}, [name, type, server, dnssec, ednsSubnet]);

	return {
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
	};
}
