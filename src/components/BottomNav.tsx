import { Home, Pill, QrCode, MessageSquare, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface BottomNavProps {
  activeScreen: number;
  onNavigate: (screen: number) => void;
}

const BottomNav = ({ activeScreen, onNavigate }: BottomNavProps) => {
  const navItems = [
    { icon: Home, label: "Home", screen: 1 },
    { icon: Pill, label: "Meds", screen: 4 },
    { icon: QrCode, label: "PickUp", screen: 3, isCenter: true },
    { icon: MessageSquare, label: "Chat", screen: 5 },
    { icon: User, label: "Profile", screen: 6 },
  ];

  return (
    <div className={cn(
      "fixed bottom-0 w-full max-w-md",
      "bg-card border-t border-border",
      "z-50 flex items-end justify-around",
      "px-2 pb-safe pt-2",
      "shadow-medkey-xl",
      "touch-no-delay"
    )}>
      {navItems.map((item) =>
        item.isCenter ? (
          <button
            key={item.label}
            onClick={() => onNavigate(item.screen)}
            className={cn(
              "relative -mt-6 flex flex-col items-center",
              "touch-target-lg touch-feedback"
            )}
          >
            <div className={cn(
              "w-16 h-16 rounded-full",
              "flex items-center justify-center",
              "shadow-medkey-lg border-4 border-card",
              "transition-all duration-200",
              activeScreen === 3 
                ? "bg-gradient-medkey scale-110" 
                : "bg-gradient-medkey-subtle hover:scale-105"
            )}>
              <QrCode className="w-7 h-7 text-white" />
            </div>
            <span className={cn(
              "text-[11px] mt-1 font-semibold",
              "transition-colors",
              activeScreen === 3 
                ? "text-brand-teal-dark" 
                : "text-muted-foreground"
            )}>
              {item.label}
            </span>
          </button>
        ) : (
          <button
            key={item.label}
            onClick={() => onNavigate(item.screen)}
            className={cn(
              "flex flex-col items-center",
              "py-3 px-4 touch-target-md",
              "touch-feedback transition-medkey-normal"
            )}
          >
            <item.icon className={cn(
              "w-6 h-6 transition-colors duration-200",
              activeScreen === item.screen 
                ? "text-brand-teal-dark" 
                : "text-muted-foreground"
            )} />
            <span className={cn(
              "text-[11px] mt-1 font-semibold",
              "transition-colors",
              activeScreen === item.screen 
                ? "text-brand-teal-dark" 
                : "text-muted-foreground"
            )}>
              {item.label}
            </span>
          </button>
        )
      )}
    </div>
  );
};

export default BottomNav;
