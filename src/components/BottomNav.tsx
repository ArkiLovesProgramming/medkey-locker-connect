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
              "flex flex-col items-center justify-center",
              "py-2 px-3 mx-1 rounded-xl",
              "touch-target-md touch-feedback transition-medkey-normal",
              "relative"
            )}
          >
            {/* 选中状态背景 */}
            {activeScreen === item.screen && (
              <div className={cn(
                "absolute inset-0 rounded-xl",
                "bg-brand-teal-light/10",
                "-inset-x-1"
              )} />
            )}
            
            {/* 图标和文字容器 */}
            <div className="relative flex flex-col items-center">
              <item.icon className={cn(
                "w-6 h-6 transition-all duration-200",
                activeScreen === item.screen 
                  ? "text-brand-teal-dark scale-110" 
                  : "text-muted-foreground scale-100"
              )} />
              <span className={cn(
                "text-[11px] mt-1 font-bold",
                "transition-all duration-200",
                activeScreen === item.screen 
                  ? "text-brand-teal-dark" 
                  : "text-muted-foreground"
              )}>
                {item.label}
              </span>
              {/* 选中指示器 */}
              {activeScreen === item.screen && (
                <div className={cn(
                  "absolute -bottom-1 left-1/2 -translate-x-1/2",
                  "w-1 h-1 rounded-full",
                  "bg-brand-teal-dark"
                )} />
              )}
            </div>
          </button>
        )
      )}
    </div>
  );
};

export default BottomNav;
