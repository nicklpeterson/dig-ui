import { Input } from "@/components/ui/input";

interface HostnameInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}

export function HostnameInput({ value, onChange, onSubmit }: HostnameInputProps) {
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
      className="h-12 font-mono text-base md:text-lg"
      autoFocus
      spellCheck={false}
      autoCapitalize="off"
      autoCorrect="off"
    />
  );
}
