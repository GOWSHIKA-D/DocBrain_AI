import { useState } from "react";
import { motion } from "framer-motion";
import { Brain, Send, Sparkles } from "lucide-react";
import { AppSidebar } from "@/components/AppSidebar";
import { UploadZone } from "@/components/UploadZone";
import { LanguageSelect } from "@/components/LanguageSelect";
import { LoadingAnimation } from "@/components/LoadingAnimation";
import { ResultSection } from "@/components/ResultSection";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [question, setQuestion] = useState("");
  const [language, setLanguage] = useState("en");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ answer: string; translated: string } | null>(null);
  const { toast } = useToast();

  const handleProcess = async () => {
    if (!pdfFile) {
      toast({ title: "No PDF uploaded", description: "Please upload a PDF document first.", variant: "destructive" });
      return;
    }

    setLoading(true);
    setResult(null);

    // Simulate AI processing (replace with real backend when Cloud is enabled)
    await new Promise((r) => setTimeout(r, 2500));

    const mockAnswer = `Based on the document "${pdfFile.name}", here is the simplified explanation:\n\nThis government document outlines the key regulations and procedures that citizens need to follow. The main points are:\n\n1. **Eligibility**: All residents above 18 years are eligible to apply.\n2. **Required Documents**: Aadhaar card, address proof, and passport-size photos.\n3. **Process**: Submit the application online or at the nearest government office.\n4. **Timeline**: Processing takes 15-30 working days.\n5. **Fees**: A nominal processing fee of ₹100 applies.\n\nThe document emphasizes that all applications must be submitted before the deadline mentioned in the official gazette.`;

    const langLabels: Record<string, string> = { en: "English", ta: "Tamil", hi: "Hindi", ml: "Malayalam" };

    const mockTranslations: Record<string, string> = {
      en: mockAnswer,
      ta: "இந்த அரசு ஆவணம் குடிமக்கள் பின்பற்ற வேண்டிய முக்கிய விதிமுறைகள் மற்றும் நடைமுறைகளை விவரிக்கிறது.\n\n1. தகுதி: 18 வயதுக்கு மேற்பட்ட அனைத்து குடியிருப்பாளர்களும் விண்ணப்பிக்க தகுதியானவர்கள்.\n2. தேவையான ஆவணங்கள்: ஆதார் அட்டை, முகவரி சான்று, பாஸ்போர்ட் அளவு புகைப்படங்கள்.\n3. செயல்முறை: விண்ணப்பத்தை ஆன்லைனில் அல்லது அருகிலுள்ள அரசு அலுவலகத்தில் சமர்ப்பிக்கவும்.",
      hi: "यह सरकारी दस्तावेज़ नागरिकों को पालन करने के लिए प्रमुख नियमों और प्रक्रियाओं की रूपरेखा प्रस्तुत करता है।\n\n1. पात्रता: 18 वर्ष से अधिक आयु के सभी निवासी आवेदन करने के पात्र हैं।\n2. आवश्यक दस्तावेज़: आधार कार्ड, पता प्रमाण, और पासपोर्ट आकार की तस्वीरें।\n3. प्रक्रिया: आवेदन ऑनलाइन या निकटतम सरकारी कार्यालय में जमा करें।",
      ml: "ഈ സർക്കാർ രേഖ പൗരന്മാർ പാലിക്കേണ്ട പ്രധാന നിയമങ്ങളും നടപടിക്രമങ്ങളും വിവരിക്കുന്നു.\n\n1. യോഗ്യത: 18 വയസ്സിന് മുകളിലുള്ള എല്ലാ താമസക്കാർക്കും അപേക്ഷിക്കാൻ യോഗ്യതയുണ്ട്.\n2. ആവശ്യമായ രേഖകൾ: ആധാർ കാർഡ്, വിലാസ തെളിവ്, പാസ്‌പോർട്ട് സൈസ് ഫോട്ടോകൾ.",
    };

    setResult({
      answer: mockAnswer,
      translated: mockTranslations[language] || mockAnswer,
    });
    setLoading(false);

    toast({ title: "Analysis complete!", description: `Simplified in ${langLabels[language]}.` });
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <AppSidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-border flex items-center px-6 bg-card/50 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-primary" />
            <h1 className="font-heading text-lg font-semibold text-foreground">DocBrain AI Assistant</h1>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          <div className="max-w-3xl mx-auto px-6 py-8 space-y-8">
            {/* Hero */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center space-y-3"
            >
              <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto shadow-lg shadow-primary/20">
                <Brain className="w-8 h-8 text-primary-foreground" />
              </div>
              <h2 className="font-heading text-2xl font-bold text-foreground">
                Simplify Government Documents
              </h2>
              <p className="text-muted-foreground text-sm max-w-md mx-auto">
                Upload any government PDF and get instant, easy-to-understand explanations in your preferred language.
              </p>
            </motion.div>

            {/* Upload Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="card-elevated p-6 space-y-5"
            >
              <div className="grid gap-5 md:grid-cols-2">
                <UploadZone
                  label="PDF Document"
                  accept=".pdf"
                  file={pdfFile}
                  onFileChange={setPdfFile}
                  icon="pdf"
                />
                <UploadZone
                  label="Image"
                  accept=".jpg,.jpeg,.png"
                  file={imageFile}
                  onFileChange={setImageFile}
                  icon="image"
                  optional
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Your Question</label>
                <Textarea
                  placeholder="e.g., What are the eligibility criteria mentioned in this document?"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="min-h-[80px] rounded-lg resize-none border-border bg-card"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-4 items-end">
                <div className="flex-1 w-full">
                  <LanguageSelect value={language} onChange={setLanguage} />
                </div>
                <Button
                  variant="gradient"
                  size="lg"
                  className="rounded-xl h-11 px-8 font-heading font-semibold w-full sm:w-auto"
                  onClick={handleProcess}
                  disabled={loading}
                >
                  <Send className="w-4 h-4" />
                  Process Document
                </Button>
              </div>
            </motion.div>

            {/* Results */}
            {loading && (
              <div className="card-elevated">
                <LoadingAnimation />
              </div>
            )}

            {result && !loading && (
              <ResultSection answer={result.answer} translated={result.translated} language={language} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
