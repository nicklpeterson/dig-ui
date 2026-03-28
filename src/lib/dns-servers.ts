import type { DnsServerDef } from "./dns-types";

export const DNS_SERVERS: DnsServerDef[] = [
  // Major public resolvers
  {
    id: "google",
    name: "Google",
    ipv4: "8.8.8.8",
    dohUrl: "https://dns.google/resolve",
    category: "Public",
  },
  {
    id: "cloudflare",
    name: "Cloudflare",
    ipv4: "1.1.1.1",
    dohUrl: "https://cloudflare-dns.com/dns-query",
    category: "Public",
  },
  {
    id: "quad9",
    name: "Quad9",
    ipv4: "9.9.9.9",
    dohUrl: "https://dns.quad9.net/dns-query",
    category: "Public",
  },
  {
    id: "opendns",
    name: "OpenDNS",
    ipv4: "208.67.222.222",
    dohUrl: "https://doh.opendns.com/dns-query",
    category: "Public",
  },
  {
    id: "adguard",
    name: "AdGuard",
    ipv4: "94.140.14.14",
    dohUrl: "https://dns.adguard-dns.com/dns-query",
    category: "Filtering",
  },
  {
    id: "adguard-family",
    name: "AdGuard Family",
    ipv4: "94.140.14.15",
    dohUrl: "https://family.adguard-dns.com/dns-query",
    category: "Filtering",
  },
  {
    id: "cleanbrowsing-security",
    name: "CleanBrowsing Security",
    ipv4: "185.228.168.9",
    dohUrl: "https://doh.cleanbrowsing.org/doh/security-filter",
    category: "Filtering",
  },
  {
    id: "mullvad",
    name: "Mullvad",
    ipv4: "194.242.2.2",
    dohUrl: "https://dns.mullvad.net/dns-query",
    category: "Privacy",
  },
  {
    id: "nextdns",
    name: "NextDNS",
    ipv4: "45.90.28.0",
    dohUrl: "https://dns.nextdns.io/dns-query",
    category: "Privacy",
  },
  {
    id: "control-d",
    name: "Control D",
    ipv4: "76.76.2.0",
    dohUrl: "https://freedns.controld.com/p0",
    category: "Privacy",
  },
  // Authoritative / specialized
  {
    id: "cloudflare-security",
    name: "Cloudflare Malware",
    ipv4: "1.1.1.2",
    dohUrl: "https://security.cloudflare-dns.com/dns-query",
    category: "Filtering",
  },
  {
    id: "cloudflare-family",
    name: "Cloudflare Family",
    ipv4: "1.1.1.3",
    dohUrl: "https://family.cloudflare-dns.com/dns-query",
    category: "Filtering",
  },
  {
    id: "dns0",
    name: "dns0.eu",
    ipv4: "193.110.81.0",
    dohUrl: "https://dns0.eu/dns-query",
    category: "Public",
  },
  {
    id: "switch",
    name: "SWITCH (CH)",
    ipv4: "130.59.31.248",
    dohUrl: "https://dns.switch.ch/dns-query",
    category: "Regional",
  },
  {
    id: "cira",
    name: "CIRA Shield (CA)",
    ipv4: "149.112.121.10",
    dohUrl: "https://private.canadianshield.cira.ca/dns-query",
    category: "Regional",
  },
];

export const DNS_SERVER_CATEGORIES = [
  ...new Set(DNS_SERVERS.map((s) => s.category)),
];

export const DEFAULT_SERVER_ID = "cloudflare";

export function getServerById(id: string): DnsServerDef | undefined {
  return DNS_SERVERS.find((s) => s.id === id);
}
