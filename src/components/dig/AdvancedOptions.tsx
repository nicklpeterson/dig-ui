import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

interface AdvancedOptionsProps {
	dnssec: boolean;
	onDnssecChange: (value: boolean) => void;
	ednsSubnet: string;
	onEdnsSubnetChange: (value: string) => void;
}

export function AdvancedOptions({
	dnssec,
	onDnssecChange,
	ednsSubnet,
	onEdnsSubnetChange,
}: AdvancedOptionsProps) {
	const [open, setOpen] = useState(false);

	return (
		<div className="mt-3">
			<button
				type="button"
				onClick={() => setOpen(!open)}
				className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors duration-150"
			>
				<ChevronRight
					className={cn(
						"h-3 w-3 transition-transform duration-150",
						open && "rotate-90",
					)}
				/>
				Advanced options
			</button>

			{open && (
				<div className="mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
					<div className="flex items-center gap-3">
						<Switch
							id="dnssec"
							checked={dnssec}
							onCheckedChange={onDnssecChange}
						/>
						<Label htmlFor="dnssec" className="text-sm">
							DNSSEC
						</Label>
					</div>

					<div className="md:col-span-1 lg:col-span-2">
						<Label
							htmlFor="edns-subnet"
							className="text-xs font-medium text-muted-foreground mb-1.5 block"
						>
							EDNS Client Subnet
						</Label>
						<Input
							id="edns-subnet"
							type="text"
							value={ednsSubnet}
							onChange={(e) => onEdnsSubnetChange(e.target.value)}
							placeholder="e.g. 1.2.3.4/24"
							className="h-9 font-mono text-sm"
							spellCheck={false}
						/>
					</div>
				</div>
			)}
		</div>
	);
}
