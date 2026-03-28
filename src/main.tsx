import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { DigApp } from "@/components/dig/DigApp";
import "./styles/global.css";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<main className="min-h-screen">
			<DigApp />
		</main>
	</StrictMode>,
);
