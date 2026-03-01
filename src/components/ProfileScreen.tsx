import {
  Users, CreditCard, Wallet, Lock, Bell, ShieldCheck,
  HelpCircle, LogOut, ChevronRight, Sparkles, Home,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { getPrimaryInsuranceCard } from "@/data/mockInsuranceCards";
import { useState } from "react";
import HomePharmacySelector from "./HomePharmacySelector";
import { getHomePharmacyId, setUserHomePharmacy, familyMembers } from "@/data/mockUsers";
import { pharmacies } from "@/data/mockPrescriptions";

interface ProfileScreenProps {
  onNavigate: (screen: number) => void;
}

const menuGroups = [
  {
    title: "Account",
    items: [
      { icon: Users, label: "Family Management", detailKey: "familyCount" },
      { icon: CreditCard, label: "Insurance Cards", detail: "Blue Cross" },
      { icon: Home, label: "Home Pharmacy", detailKey: "pharmacy" },
      { icon: Wallet, label: "Payment Methods" },
    ],
  },
  {
    title: "App & Hardware",
    items: [
      { icon: Lock, label: "MEDlockd Preferences" },
      { icon: Bell, label: "Notifications" },
      { icon: ShieldCheck, label: "Security & Privacy" },
    ],
  },
  {
    title: "Support",
    items: [
      { icon: HelpCircle, label: "Help Center" },
      { icon: LogOut, label: "Log Out", danger: true },
    ],
  },
];

const ProfileScreen = ({ onNavigate }: ProfileScreenProps) => {
  const navigate = useNavigate();
  const [isPharmacySelectorOpen, setIsPharmacySelectorOpen] = useState(false);
  const [pharmacyId, setPharmacyId] = useState<string | undefined>(getHomePharmacyId('user-001'));
  
  // Get current home pharmacy for the primary user (user-001)
  const currentPharmacy = pharmacyId ? pharmacies[pharmacyId] : undefined;

  const handleMenuClick = (label: string, danger?: boolean) => {
    if (danger) {
      toast({ title: "👋 Logging Out", description: "You have been logged out successfully." });
    } else if (label === "Insurance Cards") {
      // Navigate to insurance card detail page
      const primaryCard = getPrimaryInsuranceCard();
      if (primaryCard) {
        navigate(`/insurance-card/${primaryCard.id}`);
      } else {
        toast({ title: "No Insurance Cards", description: "No active insurance cards found." });
      }
    } else if (label === "Family Management") {
      // Navigate to family management page
      navigate('/family-management');
    } else if (label === "Home Pharmacy") {
      // Open pharmacy selector modal
      setIsPharmacySelectorOpen(true);
    } else {
      toast({ title: label, description: `Opening ${label}...` });
    }
  };

  const handleSavePharmacy = (pharmacyId: string) => {
    // Save the pharmacy preference for the primary user
    setUserHomePharmacy('user-001', pharmacyId);
    // Update local state to trigger re-render
    setPharmacyId(pharmacyId);
  };

  const getPharmacyDetail = () => {
    if (currentPharmacy) {
      // Return short name for display
      return currentPharmacy.name.replace('MEDkey Pharmacy - ', '');
    }
    return "Not set";
  };

  const getFamilyCountDetail = () => {
    return `${familyMembers.length} Members`;
  };

  return (
    <div className="pb-24 px-5 pt-6">
      <h1 className="text-2xl font-bold text-foreground mb-6">Profile</h1>

      {/* User Info */}
      <div className="flex flex-col items-center mb-5">
        <button
          onClick={() => toast({ title: "📸 Change Photo", description: "Profile photo upload coming soon." })}
          className="w-20 h-20 rounded-full bg-teal-light flex items-center justify-center border-2 border-border mb-3 active:scale-95 transition-transform"
        >
          <span className="text-xl font-bold text-teal-dark">SJ</span>
        </button>
        <p className="text-lg font-bold text-foreground">Sarah Jenkins</p>
        <p className="text-sm text-muted-foreground">sarah.jenkins@email.com</p>
      </div>

      {/* Premium Banner */}
      <button
        onClick={() => toast({ title: "⭐ MEDkey Premium", description: "Premium subscription details coming soon. Free delivery & priority support!" })}
        className="w-full bg-amber/15 border border-amber/25 rounded-2xl px-4 py-3.5 flex items-center gap-3 mb-6 text-left active:scale-[0.98] transition-transform"
      >
        <div className="w-10 h-10 rounded-xl bg-amber flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-5 h-5 text-amber-fg" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold text-foreground">Upgrade to MEDkey Premium</p>
          <p className="text-xs text-muted-foreground">Free delivery & priority support</p>
        </div>
        <ChevronRight className="w-5 h-5 text-muted-foreground" />
      </button>

      {/* Menu Groups */}
      <div className="space-y-5">
        {menuGroups.map((group) => (
          <div key={group.title}>
            <p className="text-xs font-bold text-muted-foreground tracking-wider uppercase mb-2">{group.title}</p>
            <div className="bg-card rounded-2xl shadow-sm overflow-hidden divide-y divide-border">
              {group.items.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleMenuClick(item.label, item.danger)}
                  className="w-full flex items-center gap-3 px-4 py-3.5 text-left active:bg-muted transition-colors"
                >
                  <item.icon className={`w-5 h-5 flex-shrink-0 ${item.danger ? "text-destructive" : "text-teal-dark"}`} />
                  <span className={`flex-1 text-sm font-medium ${item.danger ? "text-destructive" : "text-foreground"}`}>{item.label}</span>
                  {item.detail && <span className="text-xs text-muted-foreground mr-1">{item.detail}</span>}
                  {item.detailKey === "pharmacy" && <span className="text-xs text-muted-foreground mr-1">{getPharmacyDetail()}</span>}
                  {item.detailKey === "familyCount" && <span className="text-xs text-muted-foreground mr-1">{getFamilyCountDetail()}</span>}
                  {!item.danger && <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0" />}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Home Pharmacy Selector Modal */}
      <HomePharmacySelector
        isOpen={isPharmacySelectorOpen}
        onClose={() => setIsPharmacySelectorOpen(false)}
        onSave={handleSavePharmacy}
        currentPharmacyId={pharmacyId}
      />
    </div>
  );
};

export default ProfileScreen;
