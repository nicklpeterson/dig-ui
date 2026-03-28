import type {
	DnsQuery,
	DnsRecord,
	DnsQuestion,
	DnsResponse,
} from "./dns-types";
import { getServerById } from "./dns-servers";
import { RECORD_TYPE_MAP } from "./record-types";

function typeName(typeNum: number): string {
	return RECORD_TYPE_MAP.get(typeNum)?.type ?? `TYPE${typeNum}`;
}

interface DohJsonResponse {
	Status: number;
	TC: boolean;
	RD: boolean;
	RA: boolean;
	AD: boolean;
	Question?: { name: string; type: number }[];
	Answer?: { name: string; type: number; TTL: number; data: string }[];
	Authority?: { name: string; type: number; TTL: number; data: string }[];
	Additional?: { name: string; type: number; TTL: number; data: string }[];
}

const STATUS_TEXT: Record<number, string> = {
	0: "NOERROR",
	1: "FORMERR",
	2: "SERVFAIL",
	3: "NXDOMAIN",
	4: "NOTIMP",
	5: "REFUSED",
};

function mapRecords(
	records:
		| { name: string; type: number; TTL: number; data: string }[]
		| undefined,
): DnsRecord[] {
	if (!records) return [];
	return records.map((r) => ({
		name: r.name,
		type: r.type,
		typeName: typeName(r.type),
		TTL: r.TTL,
		data: r.data,
	}));
}

function mapQuestions(
	questions: { name: string; type: number }[] | undefined,
): DnsQuestion[] {
	if (!questions) return [];
	return questions.map((q) => ({
		name: q.name,
		type: q.type,
		typeName: typeName(q.type),
	}));
}

const DOH_RELAY = "https://doh.crypto.sx/dns-query";

async function fetchDoh(
	query: DnsQuery,
	serverHost: string,
): Promise<DohJsonResponse> {
	const url = new URL(DOH_RELAY);
	url.searchParams.set("name", query.name);
	url.searchParams.set("type", query.type);
	url.searchParams.set("server", serverHost);
	if (query.dnssec) url.searchParams.set("do", "1");
	if (query.ednsSubnet) url.searchParams.set("edns_client_subnet", query.ednsSubnet);

	const res = await fetch(url.toString(), {
		headers: { Accept: "application/dns-json" },
	});

	if (!res.ok) {
		throw new Error(`DoH request failed: ${res.status} ${res.statusText}`);
	}

	return res.json();
}

export async function queryDns(query: DnsQuery): Promise<DnsResponse> {
	const server = getServerById(query.server);
	if (!server) {
		throw new Error(`Unknown server: ${query.server}`);
	}

	const serverHost = new URL(server.dohUrl).hostname;
	const start = performance.now();
	const raw = await fetchDoh(query, serverHost);
	const elapsed = Math.round(performance.now() - start);

	return {
		status: raw.Status,
		statusText: STATUS_TEXT[raw.Status] ?? `UNKNOWN(${raw.Status})`,
		truncated: raw.TC,
		recursionDesired: raw.RD,
		recursionAvailable: raw.RA,
		authenticatedData: raw.AD,
		question: mapQuestions(raw.Question),
		answer: mapRecords(raw.Answer),
		authority: mapRecords(raw.Authority),
		additional: mapRecords(raw.Additional),
		queryTime: elapsed,
		server: `${server.name} (${server.ipv4 ?? server.dohUrl})`,
		timestamp: new Date().toISOString(),
	};
}
