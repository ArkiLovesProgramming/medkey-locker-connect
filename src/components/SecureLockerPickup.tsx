import { useState, useEffect } from "react";
import { ArrowLeft, HelpCircle, Package, Pill, User, Scan, Sun } from "lucide-react";
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
        <div key={i} className={`w-3.5 h-3.5 ${cell ? "bg-teal-dark" : "bg-transparent"}`} />
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
    <div className="pb-20 px-5 pt-5">
      {/* Header - Compact */}
      <div className="flex items-center justify-between mb-4">
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

      {/* Title and Order Badge - Inline */}
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold text-teal-dark mb-3">MEDlockd Access</h1>
        <button
          onClick={handleCopyOrder}
          className="bg-teal-dark px-5 py-2 rounded-full flex items-center gap-2 mx-auto active:scale-95 transition-transform shadow-sm"
        >
          <Package className="w-4 h-4 text-white/90" />
          <span className="text-white font-semibold text-sm">Order #29384-B</span>
        </button>
      </div>

      {/* QR Code Card - Compact */}
      <div className="bg-gradient-to-b from-teal-light/10 to-white rounded-3xl p-4 shadow-medkey-md border border-teal-light/20 relative overflow-hidden mb-4">
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="w-2 h-2 rounded-full bg-teal-light/60 animate-pulse" />
          <span className="text-xs text-muted-foreground">
            Valid for <span className="font-bold text-teal-dark tabular-nums">{minutes}:{seconds}</span>
          </span>
        </div>

        <div className="relative flex items-center justify-center py-4">
          {/* QR Code */}
          <div className="relative">
            <QRCodePlaceholder />
            {/* Corner markers with spacing from QR code */}
            <div className="absolute -top-3 -left-3 w-9 h-9 border-l-[6px] border-t-[6px] border-amber rounded-tl-lg pointer-events-none" />
            <div className="absolute -top-3 -right-3 w-9 h-9 border-r-[6px] border-t-[6px] border-amber rounded-tr-lg pointer-events-none" />
            <div className="absolute -bottom-3 -left-3 w-9 h-9 border-l-[6px] border-b-[6px] border-amber rounded-bl-lg pointer-events-none" />
            <div className="absolute -bottom-3 -right-3 w-9 h-9 border-r-[6px] border-b-[6px] border-amber rounded-br-lg pointer-events-none" />
          </div>
        </div>

        <p className="text-center text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-semibold mt-4">
          Scan at locker to open
        </p>
      </div>

      {/* Single Action Button - Compact */}
      <button className="w-full bg-teal-dark text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 active:scale-[0.98] transition-transform shadow-medkey-md mb-4">
        <Scan className="w-5 h-5" />
        Scan at Locker (Mock)
      </button>

      {/* Medications In This Box - Compact */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Pill className="w-5 h-5 text-teal-dark" />
          <h4 className="font-bold text-foreground text-xs uppercase tracking-wider">
            In This Box
          </h4>
        </div>

        <div className="space-y-2">
          {[
            { name: "Lily Jenkins", med: "Amoxicillin (Qty: 14)" },
            { name: "David Jenkins", med: "Atorvastatin (Qty: 30)" },
          ].map((item) => (
            <button
              key={item.name}
              onClick={() => onNavigate(2)}
              className="w-full bg-white rounded-xl p-3 shadow-sm border border-border/50 flex items-center gap-3 text-left active:scale-[0.98] transition-transform"
            >
              <div className="w-10 h-10 rounded-full bg-teal-light/30 flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-teal-dark" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-foreground text-sm truncate">{item.name}</p>
                <p className="text-xs text-muted-foreground font-medium truncate">{item.med}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SecureLockerPickup;
