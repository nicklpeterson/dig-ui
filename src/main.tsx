import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { DigApp } from "@/components/dig/DigApp";
import "./styles/global.css";

const rootElement = document.getElementById("root");
if (!rootElement) {
	throw new Error('Root element "#root" not found');
}

createRoot(rootElement).render(
	<StrictMode>
		<main className="min-h-screen">
			<DigApp />
		</main>
	</StrictMode>,
);
