import { Home, Pill, QrCode, MessageSquare, User } from "lucide-react";

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
    <div className="fixed bottom-0 w-full max-w-md bg-card border-t border-border z-50 flex items-end justify-around px-2 pb-2 pt-1">
      {navItems.map((item) =>
        item.isCenter ? (
          <button
            key={item.label}
            onClick={() => onNavigate(item.screen)}
            className="relative -mt-6 flex flex-col items-center group"
          >
            <div className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg border-4 border-card transition-all duration-200 active:scale-90 ${
              activeScreen === 3 ? "bg-teal-dark scale-110" : "bg-teal-dark group-hover:scale-105"
            }`}>
              <QrCode className="w-7 h-7 text-primary-foreground" />
            </div>
            <span className={`text-[10px] mt-0.5 font-medium ${activeScreen === 3 ? "text-teal-dark" : "text-muted-foreground"}`}>
              {item.label}
            </span>
          </button>
        ) : (
          <button
            key={item.label}
            onClick={() => onNavigate(item.screen)}
            className="flex flex-col items-center py-2 px-3 active:scale-90 transition-transform"
          >
            <div className="relative">
              <item.icon className={`w-6 h-6 transition-colors duration-200 ${activeScreen === item.screen ? "text-teal-dark" : "text-muted-foreground"}`} />
              {activeScreen === item.screen && (
                <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-teal-dark" />
              )}
            </div>
            <span className={`text-[10px] mt-1 font-medium transition-colors ${activeScreen === item.screen ? "text-teal-dark" : "text-muted-foreground"}`}>
              {item.label}
            </span>
          </button>
        )
      )}
    </div>
  );
};

export default BottomNav;
