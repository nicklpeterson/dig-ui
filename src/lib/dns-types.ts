export interface DnsQuery {
	name: string;
	type: string;
	server: string;
	dnssec?: boolean;
	ednsSubnet?: string;
}

export interface DnsRecord {
	name: string;
	type: number;
	typeName: string;
	TTL: number;
	data: string;
}

export interface DnsQuestion {
	name: string;
	type: number;
	typeName: string;
}

export interface DnsResponse {
	status: number;
	statusText: string;
	truncated: boolean;
	recursionDesired: boolean;
	recursionAvailable: boolean;
	authenticatedData: boolean;
	question: DnsQuestion[];
	answer: DnsRecord[];
	authority: DnsRecord[];
	additional: DnsRecord[];
	queryTime: number;
	server: string;
	timestamp: string;
}

export interface DnsServerDef {
	id: string;
	name: string;
	ipv4?: string;
	ipv6?: string;
	dohUrl: string;
	category: string;
}

export interface RecordTypeDef {
	type: string;
	value: number;
	description: string;
}

export type QueryState =
	| { status: "idle" }
	| { status: "loading"; query: DnsQuery }
	| { status: "success"; query: DnsQuery; response: DnsResponse }
	| { status: "error"; query: DnsQuery; error: string };
