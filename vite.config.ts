import { resolve } from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [react(), tailwindcss()],
	server: {
		port: 3000,
		strictPort: true,
		allowedHosts: ["mac-mini.walleye-gentoo.ts.net"],
	},
	resolve: {
		alias: {
			"@": resolve(import.meta.dirname, "src"),
		},
	},
});
