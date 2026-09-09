import { Input } from "@/components/ui/input";

interface HostnameInputProps {
	value: string;
	onChange: (value: string) => void;
	onSubmit: () => void;
}

export function HostnameInput({
	value,
	onChange,
	onSubmit,
}: HostnameInputProps) {
	return (
		<Input
			type="text"
			value={value}
			onChange={(e) => onChange(e.target.value)}
			onKeyDown={(e) => {
				if (e.key === "Enter") {
					e.preventDefault();
					onSubmit();
				}
			}}
			placeholder="example.com"
			className="flex h-12 w-full border border-input bg-background px-3 py-2 font-mono text-base md:text-lg file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/20 focus-visible:border-ring disabled:cursor-not-allowed disabled:opacity-50"
			style={{ borderRadius: "var(--radius)" }}
			autoFocus
			spellCheck={false}
			autoCapitalize="off"
			autoCorrect="off"
		/>
	);
}
