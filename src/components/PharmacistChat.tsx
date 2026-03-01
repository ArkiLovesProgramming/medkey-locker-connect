import { ArrowLeft, HelpCircle, Camera, Send, Lock } from "lucide-react";

interface PharmacistChatProps {
  onNavigate: (screen: number) => void;
}

const messages = [
  {
    type: "system",
    text: "Today, 10:42 AM",
  },
  {
    type: "pharmacist",
    text: "Hello Sarah, I see you just picked up Amoxicillin for Lily. Do you have any questions about the dosage?",
  },
  {
    type: "user",
    text: "Yes, should she take it with food?",
  },
  {
    type: "pharmacist",
    text: "Yes, taking it with a meal or a snack will help prevent stomach upset. Make sure she finishes the full course even if she feels better.",
  },
];

const quickReplies = ["Side effects?", "Request a refill", "Drug interactions?"];

const PharmacistChat = ({ onNavigate }: PharmacistChatProps) => {
  return (
    <div className="flex flex-col min-h-screen pb-0">
      {/* Header */}
      <div className="bg-teal-dark px-5 pt-6 pb-5 rounded-b-3xl">
        <div className="flex items-center gap-3">
          <button onClick={() => onNavigate(1)} className="text-primary-foreground">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-3 flex-1">
            <div className="w-11 h-11 rounded-full bg-secondary flex items-center justify-center">
              <span className="text-sm font-bold text-teal-dark">MC</span>
            </div>
            <div>
              <p className="text-primary-foreground font-bold text-sm">
                Dr. Michael Chen, PharmD
              </p>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-success" />
                <span className="text-primary-foreground/70 text-xs">Online</span>
              </div>
            </div>
          </div>
          <button className="text-primary-foreground/70">
            <HelpCircle className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* HIPAA Banner */}
      <div className="mx-5 -mt-3 bg-amber/20 border border-amber/30 rounded-2xl px-4 py-2.5 flex items-center gap-2 z-10">
        <Lock className="w-4 h-4 text-amber-fg flex-shrink-0" />
        <span className="text-xs font-medium text-amber-fg">
          Secure & HIPAA Compliant Chat
        </span>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
        {messages.map((msg, i) => {
          if (msg.type === "system") {
            return (
              <p key={i} className="text-center text-xs text-muted-foreground py-2">
                {msg.text}
              </p>
            );
          }
          if (msg.type === "pharmacist") {
            return (
              <div key={i} className="flex gap-2 max-w-[85%]">
                <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-[10px] font-bold text-teal-dark">MC</span>
                </div>
                <div className="bg-card rounded-2xl rounded-tl-md px-4 py-3 shadow-sm">
                  <p className="text-sm text-foreground leading-relaxed">{msg.text}</p>
                </div>
              </div>
            );
          }
          return (
            <div key={i} className="flex justify-end">
              <div className="bg-teal-dark rounded-2xl rounded-tr-md px-4 py-3 max-w-[80%]">
                <p className="text-sm text-primary-foreground leading-relaxed">{msg.text}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Replies */}
      <div className="px-5 pb-2">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {quickReplies.map((q) => (
            <button
              key={q}
              className="flex-shrink-0 px-4 py-2 rounded-full border border-border text-sm font-medium text-teal-dark bg-card hover:bg-secondary transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="px-5 pb-24 pt-2 bg-background border-t border-border">
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
            <Camera className="w-5 h-5 text-muted-foreground" />
          </button>
          <div className="flex-1 bg-card rounded-full border border-border px-4 py-2.5">
            <span className="text-sm text-muted-foreground">Type a message...</span>
          </div>
          <button className="w-10 h-10 rounded-full bg-teal-dark flex items-center justify-center flex-shrink-0">
            <Send className="w-5 h-5 text-primary-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PharmacistChat;
