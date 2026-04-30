import { Globe } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const languages = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "ta", label: "Tamil", flag: "🇮🇳" },
  { code: "hi", label: "Hindi", flag: "🇮🇳" },
  { code: "ml", label: "Malayalam", flag: "🇮🇳" },
];

interface LanguageSelectProps {
  value: string;
  onChange: (val: string) => void;
}

export function LanguageSelect({ value, onChange }: LanguageSelectProps) {
  const selected = languages.find((l) => l.code === value);
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground flex items-center gap-2">
        <Globe className="w-4 h-4 text-primary" />
        Output Language
      </label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="h-11 rounded-lg border-border bg-card">
          <SelectValue>
            {selected && (
              <span className="flex items-center gap-2">
                <span>{selected.flag}</span>
                <span>{selected.label}</span>
              </span>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {languages.map((lang) => (
            <SelectItem key={lang.code} value={lang.code}>
              <span className="flex items-center gap-2">
                <span>{lang.flag}</span>
                <span>{lang.label}</span>
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
