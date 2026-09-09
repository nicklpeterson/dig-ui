import { ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DnsServerPicker } from "./DnsServerPicker";
import { HostnameInput } from "./HostnameInput";
import { RecordTypeSelect } from "./RecordTypeSelect";

interface QueryFormProps {
	name: string;
	onNameChange: (value: string) => void;
	type: string;
	onTypeChange: (value: string) => void;
	server: string;
	onServerChange: (value: string) => void;
	onSubmit: () => void;
	loading: boolean;
}

export function QueryForm({
	name,
	onNameChange,
	type,
	onTypeChange,
	server,
	onServerChange,
	onSubmit,
	loading,
}: QueryFormProps) {
	return (
		<div className="flex flex-col gap-3 lg:flex-row lg:items-end">
			<div className="flex-1 min-w-0">
				<label className="text-xs font-medium text-muted-foreground mb-1.5 block">
					Hostname
				</label>
				<HostnameInput
					value={name}
					onChange={onNameChange}
					onSubmit={onSubmit}
				/>
			</div>
			<div className="flex gap-3 lg:contents">
				<div className="flex-1 lg:w-32 lg:flex-none">
					<label className="text-xs font-medium text-muted-foreground mb-1.5 block">
						Type
					</label>
					<RecordTypeSelect value={type} onChange={onTypeChange} />
				</div>
				<div className="flex-1 lg:w-52 lg:flex-none">
					<label className="text-xs font-medium text-muted-foreground mb-1.5 block">
						Server
					</label>
					<DnsServerPicker value={server} onChange={onServerChange} />
				</div>
			</div>
			<Button
				onClick={onSubmit}
				disabled={loading || !name.trim()}
				className="h-12 px-6 shrink-0"
			>
				{loading ? (
					<Loader2 className="h-4 w-4 animate-spin" />
				) : (
					<>
						Dig
						<ArrowRight className="ml-2 h-4 w-4" />
					</>
				)}
			</Button>
		</div>
	);
}
