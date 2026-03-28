import type { RecordTypeDef } from "./dns-types";

export const RECORD_TYPES: RecordTypeDef[] = [
  { type: "A", value: 1, description: "IPv4 address" },
  { type: "AAAA", value: 28, description: "IPv6 address" },
  { type: "CNAME", value: 5, description: "Canonical name" },
  { type: "MX", value: 15, description: "Mail exchange" },
  { type: "NS", value: 2, description: "Name server" },
  { type: "SOA", value: 6, description: "Start of authority" },
  { type: "TXT", value: 16, description: "Text record" },
  { type: "SRV", value: 33, description: "Service locator" },
  { type: "PTR", value: 12, description: "Pointer record" },
  { type: "CAA", value: 257, description: "Certification authority authorization" },
  { type: "DS", value: 43, description: "Delegation signer" },
  { type: "DNSKEY", value: 48, description: "DNS public key" },
  { type: "RRSIG", value: 46, description: "DNSSEC signature" },
  { type: "NSEC", value: 47, description: "Next secure record" },
  { type: "NSEC3", value: 50, description: "NSEC version 3" },
  { type: "TLSA", value: 52, description: "TLS certificate association" },
  { type: "SSHFP", value: 44, description: "SSH fingerprint" },
  { type: "HTTPS", value: 65, description: "HTTPS service binding" },
  { type: "SVCB", value: 64, description: "Service binding" },
  { type: "NAPTR", value: 35, description: "Naming authority pointer" },
  { type: "LOC", value: 29, description: "Geographic location" },
  { type: "HINFO", value: 13, description: "Host information" },
  { type: "RP", value: 17, description: "Responsible person" },
  { type: "DNAME", value: 39, description: "Delegation name" },
  { type: "CERT", value: 37, description: "Certificate record" },
  { type: "OPENPGPKEY", value: 61, description: "OpenPGP public key" },
  { type: "SMIMEA", value: 53, description: "S/MIME certificate association" },
  { type: "URI", value: 256, description: "Uniform resource identifier" },
  { type: "ANY", value: 255, description: "All records" },
];

export const RECORD_TYPE_MAP = new Map(
  RECORD_TYPES.map((r) => [r.value, r]),
);

export const DEFAULT_RECORD_TYPE = "A";
