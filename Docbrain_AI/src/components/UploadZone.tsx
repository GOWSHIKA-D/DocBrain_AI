import { Upload, FileText, X, Image as ImageIcon } from "lucide-react";
import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface UploadZoneProps {
  label: string;
  accept: string;
  file: File | null;
  onFileChange: (file: File | null) => void;
  icon?: "pdf" | "image";
  optional?: boolean;
}

export function UploadZone({ label, accept, file, onFileChange, icon = "pdf", optional }: UploadZoneProps) {
  const [dragActive, setDragActive] = useState(false);
  const Icon = icon === "pdf" ? FileText : ImageIcon;

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragActive(false);
      const f = e.dataTransfer.files[0];
      if (f) onFileChange(f);
    },
    [onFileChange]
  );

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">
        {label}
        {optional && <span className="text-muted-foreground ml-1">(optional)</span>}
      </label>
      <AnimatePresence mode="wait">
        {file ? (
          <motion.div
            key="file"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex items-center gap-3 p-4 rounded-xl border border-primary/20 bg-accent"
          >
            <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
              <Icon className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{file.name}</p>
              <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
            </div>
            <button
              onClick={() => onFileChange(null)}
              className="p-1 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="upload"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`upload-zone ${dragActive ? "active" : ""}`}
            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            onClick={() => {
              const input = document.createElement("input");
              input.type = "file";
              input.accept = accept;
              input.onchange = (e) => {
                const f = (e.target as HTMLInputElement).files?.[0];
                if (f) onFileChange(f);
              };
              input.click();
            }}
          >
            <Upload className="w-8 h-8 text-primary/40 mx-auto mb-3" />
            <p className="text-sm font-medium text-foreground">
              Drop your file here or <span className="text-primary">browse</span>
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {icon === "pdf" ? "PDF files only" : "JPG, PNG, JPEG"}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
