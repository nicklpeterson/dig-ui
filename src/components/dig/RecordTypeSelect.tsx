import { ChevronDown } from "lucide-react";
import { useState } from "react";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { RECORD_TYPES } from "@/lib/record-types";

interface RecordTypeSelectProps {
	value: string;
	onChange: (value: string) => void;
}

export function RecordTypeSelect({ value, onChange }: RecordTypeSelectProps) {
	const [open, setOpen] = useState(false);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<button
					type="button"
					className="flex h-12 w-full items-center justify-between border border-input bg-background px-3 font-mono text-sm hover:bg-accent transition-colors duration-150"
					style={{ borderRadius: "var(--radius)" }}
				>
					<span>{value}</span>
					<ChevronDown className="ml-2 h-4 w-4 opacity-50" />
				</button>
			</PopoverTrigger>
			<PopoverContent className="w-56 p-0" align="start">
				<Command>
					<CommandInput placeholder="Search types..." />
					<CommandList>
						<CommandEmpty>No record type found.</CommandEmpty>
						<CommandGroup>
							{RECORD_TYPES.map((rt) => (
								<CommandItem
									key={rt.type}
									value={`${rt.type} ${rt.description}`}
									onSelect={() => {
										onChange(rt.type);
										setOpen(false);
									}}
									className="font-mono"
								>
									<span className="w-20 shrink-0 font-medium">{rt.type}</span>
									<span className="text-muted-foreground text-xs truncate">
										{rt.description}
									</span>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
