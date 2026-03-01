import { useState, useEffect } from "react";
import { ArrowLeft, HelpCircle, Package, Pill, User, Copy, CheckCheck } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface SecureLockerPickupProps {
  onNavigate: (screen: number) => void;
}

const QRCodePlaceholder = () => {
  const pattern = [
    [1,1,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,1,0,0,1,0,1,1,0,0,0,0,0,1],
    [1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1,0,0,1,1,0,1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1,0,1,0,0,1,1,0,1,1,1,0,1],
    [1,0,0,0,0,0,1,0,0,1,0,0,1,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,0,1,0,1,0,1,1,1,1,1,1,1],
    [0,0,0,0,0,0,0,0,1,1,0,1,0,0,0,0,0,0,0],
    [1,0,1,1,0,1,1,1,0,0,1,0,1,1,0,1,0,1,1],
    [0,1,0,0,1,0,0,1,1,0,1,1,0,0,1,0,1,0,0],
    [1,0,1,0,1,1,1,0,0,1,1,0,1,0,1,1,0,1,1],
    [0,0,0,0,0,0,0,0,1,0,0,1,0,1,0,0,1,0,0],
    [1,1,1,1,1,1,1,0,0,1,1,0,1,0,1,1,1,0,1],
    [1,0,0,0,0,0,1,0,1,0,0,1,0,1,0,0,0,1,0],
    [1,0,1,1,1,0,1,0,0,1,1,0,1,0,1,1,0,1,1],
    [1,0,1,1,1,0,1,0,1,0,1,1,0,1,1,0,1,0,0],
    [1,0,1,1,1,0,1,0,0,1,0,0,1,0,1,1,1,1,1],
    [1,0,0,0,0,0,1,0,1,1,1,1,0,0,0,1,0,0,0],
    [1,1,1,1,1,1,1,0,0,0,1,0,1,1,0,1,1,1,1],
  ];

  return (
    <div className="inline-grid gap-0" style={{ gridTemplateColumns: `repeat(19, 1fr)` }}>
      {pattern.flat().map((cell, i) => (
        <div key={i} className={`w-3 h-3 ${cell ? "bg-teal-dark" : "bg-transparent"}`} />
      ))}
    </div>
  );
};

const SecureLockerPickup = ({ onNavigate }: SecureLockerPickupProps) => {
  const [timeLeft, setTimeLeft] = useState(14 * 60 + 59);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 14 * 60 + 59));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, "0");
  const seconds = (timeLeft % 60).toString().padStart(2, "0");

  const handleCopyOrder = () => {
    navigator.clipboard?.writeText("29384-B");
    setCopied(true);
    toast({ title: "📋 Copied!", description: "Order number copied to clipboard." });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="pb-24 px-5 pt-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <button onClick={() => onNavigate(1)} className="p-1 active:scale-90 transition-transform">
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
        <h2 className="font-semibold text-base text-foreground">Secure Locker Pickup</h2>
        <button
          onClick={() => toast({ title: "❓ Help", description: "Scan the QR code at any MEDlockd station to open your compartment." })}
          className="p-1 active:scale-90 transition-transform"
        >
          <HelpCircle className="w-5 h-5 text-teal-dark" />
        </button>
      </div>

      <h1 className="text-3xl font-bold text-teal-dark text-center mb-4">MEDlockd Access</h1>

      {/* Order Badge */}
      <div className="flex justify-center mb-5">
        <button
          onClick={handleCopyOrder}
          className="bg-teal-dark px-5 py-2 rounded-full flex items-center gap-2 active:scale-95 transition-transform"
        >
          <Package className="w-4 h-4 text-amber" />
          <span className="text-primary-foreground font-semibold text-sm">Order #29384-B</span>
          {copied ? <CheckCheck className="w-3.5 h-3.5 text-amber" /> : <Copy className="w-3.5 h-3.5 text-primary-foreground/50" />}
        </button>
      </div>

      {/* QR Code Card */}
      <div className="bg-card rounded-3xl p-5 shadow-sm border border-border relative overflow-hidden mb-4">
        <div className="flex items-center justify-center gap-2 mb-5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber animate-pulse" />
          <span className="text-sm text-muted-foreground">
            Code valid for <span className="font-bold text-teal-dark tabular-nums">{minutes}:{seconds}</span>
          </span>
        </div>

        <div className="relative flex items-center justify-center py-4">
          <div className="absolute top-0 left-4 w-8 h-8 border-l-4 border-t-4 border-amber rounded-tl-lg" />
          <div className="absolute top-0 right-4 w-8 h-8 border-r-4 border-t-4 border-amber rounded-tr-lg" />
          <div className="absolute bottom-0 left-4 w-8 h-8 border-l-4 border-b-4 border-amber rounded-bl-lg" />
          <div className="absolute bottom-0 right-4 w-8 h-8 border-r-4 border-b-4 border-amber rounded-br-lg" />
          <QRCodePlaceholder />
        </div>

        <p className="text-center text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-semibold mt-5">
          Scan at locker to open compartment
        </p>
      </div>

      <p className="text-xs text-muted-foreground text-center mb-6 italic">
        Note: The QR code will switch every 15 minutes, for security reasons.
      </p>

      {/* Inside this Box */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Pill className="w-5 h-5 text-teal-dark" />
          <h4 className="font-bold text-foreground">Inside this Box</h4>
        </div>

        <div className="space-y-3">
          {[
            { name: "Lily Jenkins", med: "Amoxicillin (Qty: 14)" },
            { name: "David Jenkins", med: "Atorvastatin (Qty: 30)" },
          ].map((item) => (
            <button
              key={item.name}
              onClick={() => onNavigate(2)}
              className="w-full bg-card rounded-2xl p-4 shadow-sm flex items-center gap-3 text-left active:scale-[0.98] transition-transform"
            >
              <div className="w-10 h-10 rounded-full bg-teal-light flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-teal-dark" />
              </div>
              <div>
                <p className="font-semibold text-foreground">{item.name}</p>
                <p className="text-sm text-muted-foreground">{item.med}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SecureLockerPickup;
