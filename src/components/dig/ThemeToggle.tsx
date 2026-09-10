import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
	const [dark, setDark] = useState(true);

	useEffect(() => {
		setDark(document.documentElement.classList.contains("dark"));

		// Follow the browser's color scheme until the user picks one explicitly.
		const media = window.matchMedia("(prefers-color-scheme: dark)");
		function onChange(e: MediaQueryListEvent) {
			if (localStorage.getItem("theme")) return;
			setDark(e.matches);
			document.documentElement.classList.toggle("dark", e.matches);
		}
		media.addEventListener("change", onChange);
		return () => media.removeEventListener("change", onChange);
	}, []);

	function toggle() {
		const next = !dark;
		setDark(next);
		document.documentElement.classList.toggle("dark", next);
		localStorage.setItem("theme", next ? "dark" : "light");
	}

	return (
		<button
			type="button"
			onClick={toggle}
			className="p-2 text-muted-foreground hover:text-foreground transition-colors duration-150"
			aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
		>
			{dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
		</button>
	);
}
