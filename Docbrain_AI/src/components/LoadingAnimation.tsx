import { motion } from "framer-motion";
import { Brain } from "lucide-react";

export function LoadingAnimation() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-start gap-3 p-5"
    >
      <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center flex-shrink-0 animate-pulse-soft">
        <Brain className="w-4 h-4 text-primary-foreground" />
      </div>
      <div className="space-y-3 pt-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground">Analyzing document</span>
          <div className="flex gap-1">
            <span className="typing-dot" />
            <span className="typing-dot" />
            <span className="typing-dot" />
          </div>
        </div>
        <div className="space-y-2">
          <div className="h-3 w-64 rounded-full bg-muted animate-pulse-soft" />
          <div className="h-3 w-48 rounded-full bg-muted animate-pulse-soft" style={{ animationDelay: "0.3s" }} />
          <div className="h-3 w-56 rounded-full bg-muted animate-pulse-soft" style={{ animationDelay: "0.6s" }} />
        </div>
      </div>
    </motion.div>
  );
}
