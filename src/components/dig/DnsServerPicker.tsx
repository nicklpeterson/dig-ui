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
import { DNS_SERVER_CATEGORIES, DNS_SERVERS } from "@/lib/dns-servers";

interface DnsServerPickerProps {
	id: string;
	value: string;
	onChange: (value: string) => void;
}

export function DnsServerPicker({ id, value, onChange }: DnsServerPickerProps) {
	const [open, setOpen] = useState(false);
	const selected = DNS_SERVERS.find((s) => s.id === value);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<button
					id={id}
					type="button"
					className="flex h-12 w-full items-center justify-between border border-input bg-background px-3 text-sm hover:bg-accent transition-colors duration-150"
					style={{ borderRadius: "var(--radius)" }}
				>
					<span className="truncate">
						{selected ? (
							<>
								<span className="font-medium">{selected.name}</span>
								{selected.ipv4 && (
									<span className="ml-2 font-mono text-muted-foreground text-xs">
										{selected.ipv4}
									</span>
								)}
							</>
						) : (
							"Select server..."
						)}
					</span>
					<ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</button>
			</PopoverTrigger>
			<PopoverContent className="w-72 p-0" align="start">
				<Command
					value={
						selected ? `${selected.name} ${selected.ipv4 ?? ""}` : undefined
					}
				>
					<CommandInput placeholder="Search servers..." />
					<CommandList>
						<CommandEmpty>No server found.</CommandEmpty>
						{DNS_SERVER_CATEGORIES.map((cat) => (
							<CommandGroup key={cat} heading={cat}>
								{DNS_SERVERS.filter((s) => s.category === cat).map((server) => (
									<CommandItem
										key={server.id}
										value={`${server.name} ${server.ipv4 ?? ""}`}
										onSelect={() => {
											onChange(server.id);
											setOpen(false);
										}}
									>
										<span className="font-medium">{server.name}</span>
										{server.ipv4 && (
											<span className="ml-auto font-mono text-muted-foreground text-xs">
												{server.ipv4}
											</span>
										)}
									</CommandItem>
								))}
							</CommandGroup>
						))}
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
