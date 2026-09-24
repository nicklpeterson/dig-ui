# dig

https://dig.nickpeterson.me/

A clean, fast, browser-based DNS lookup tool — a web UI in the spirit of the `dig` command-line utility.

## Features

- **Many record types** — A, AAAA, CNAME, MX, NS, SOA, TXT, SRV, CAA, HTTPS, DNSSEC types (DS, DNSKEY, RRSIG, NSEC/NSEC3), and more, or any numeric type.
- **Multiple resolvers** — Cloudflare (default), Google, Quad9, OpenDNS, AdGuard, Mullvad, NextDNS, and others, grouped as public, filtering, privacy, and regional.
- **Advanced options** — request DNSSEC records and set an EDNS Client Subnet.
- **Shareable URLs** — each successful query is saved in the URL (`?name=example.com&type=MX&server=google`), so you can bookmark or share a lookup.

## How it works

The app runs entirely in the browser. Lookups are sent as DNS-over-HTTPS JSON requests to a public relay (`https://doh.crypto.sx/dns-query`), which forwards each query to the resolver you selected. You need an internet connection, and the relay and resolver will see the names you look up.

## Running locally

**Prerequisites:** Node.js and [pnpm](https://pnpm.io/).

```sh
# Use the pinned Node version (optional, if you use nvm)
nvm use

# Install dependencies
pnpm install

# Start the dev server
pnpm dev
```

Then open <http://localhost:3000>. The port is fixed at 3000, so the dev server won't start if something else is already using that port.

### Other scripts

| Command        | Description                                  |
| -------------- | -------------------------------------------- |
| `pnpm build`   | Build a production bundle into `dist/`       |
| `pnpm preview` | Serve the production build locally           |
| `pnpm check`   | Lint and check formatting with Biome         |
| `pnpm format`  | Apply Biome lint fixes and formatting        |

A VS Code dev container config (`.devcontainer/`) is also included if you'd like a ready-made Node environment.
