import { motion } from "framer-motion";
import { Bot, Languages, Volume2, VolumeX } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ResultSectionProps {
  answer: string;
  translated: string;
  language: string;
}

export function ResultSection({ answer, translated, language }: ResultSectionProps) {
  const [speaking, setSpeaking] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);
  const { toast } = useToast();

  // Load voices (some browsers load them async)
  useEffect(() => {
    const loadVoices = () => {
      const v = window.speechSynthesis.getVoices();
      if (v.length > 0) setVoices(v);
    };
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
      window.speechSynthesis.cancel();
    };
  }, []);

  // Stop speech if language or text changes
  useEffect(() => {
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }, [translated, language]);

  const pickVoice = (lang: string): { voice: SpeechSynthesisVoice | null; lang: string } => {
    // Preferred BCP-47 codes per app language, with sensible fallbacks.
    const preferences: Record<string, string[]> = {
      en: ["en-US", "en-GB", "en-IN", "en"],
      ta: ["ta-IN", "ta-LK", "ta", "hi-IN", "hi"], // fallback to Hindi if no Tamil
      hi: ["hi-IN", "hi"],
      ml: ["ml-IN", "ml", "hi-IN", "hi"], // fallback to Hindi if no Malayalam
    };

    const wanted = preferences[lang] || ["en-US"];

    for (const code of wanted) {
      const exact = voices.find((v) => v.lang.toLowerCase() === code.toLowerCase());
      if (exact) return { voice: exact, lang: exact.lang };
      const partial = voices.find((v) => v.lang.toLowerCase().startsWith(code.toLowerCase()));
      if (partial) return { voice: partial, lang: partial.lang };
    }
    return { voice: null, lang: wanted[0] };
  };

  const handleSpeak = () => {
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }

    const text = translated || answer;
    if (!text) return;

    const { voice, lang } = pickVoice(language);

    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = lang;
    if (voice) utter.voice = voice;
    utter.rate = 0.9;
    utter.pitch = 1;
    utter.onend = () => setSpeaking(false);
    utter.onerror = () => {
      setSpeaking(false);
      toast({
        title: "Audio unavailable",
        description: `Your browser doesn't have a voice installed for this language. Try Chrome or install a system voice.`,
        variant: "destructive",
      });
    };

    utterRef.current = utter;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
    setSpeaking(true);

    // If no matching voice found, warn the user immediately
    if (!voice && language !== "en") {
      toast({
        title: "Using fallback voice",
        description: `No native voice for ${language.toUpperCase()} is installed in your browser — playing with the closest available voice.`,
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-4"
    >
      {/* AI Answer */}
      <div className="result-box animate-fade-in">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-6 h-6 rounded-md gradient-primary flex items-center justify-center">
            <Bot className="w-3.5 h-3.5 text-primary-foreground" />
          </div>
          <h3 className="font-heading text-sm font-semibold text-foreground">AI Answer</h3>
        </div>
        <p className="text-sm text-foreground/85 leading-relaxed whitespace-pre-wrap">{answer}</p>
      </div>

      {/* Translated */}
      {translated && translated !== answer && (
        <div className="result-box" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 rounded-md bg-accent flex items-center justify-center">
              <Languages className="w-3.5 h-3.5 text-accent-foreground" />
            </div>
            <h3 className="font-heading text-sm font-semibold text-foreground">Translated</h3>
          </div>
          <p className="text-sm text-foreground/85 leading-relaxed whitespace-pre-wrap">{translated}</p>
        </div>
      )}

      {/* Audio */}
      <div className="result-box" style={{ animationDelay: "0.4s" }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-accent flex items-center justify-center">
              <Volume2 className="w-3.5 h-3.5 text-accent-foreground" />
            </div>
            <h3 className="font-heading text-sm font-semibold text-foreground">Audio Output</h3>
          </div>
          <Button
            variant={speaking ? "destructive" : "gradient"}
            size="sm"
            className="rounded-lg"
            onClick={handleSpeak}
          >
            {speaking ? (
              <>
                <VolumeX className="w-4 h-4" /> Stop
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4" /> Listen
              </>
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
