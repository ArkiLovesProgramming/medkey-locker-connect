import { useState } from "react";
import BottomNav from "@/components/BottomNav";
import FamilyDashboard from "@/components/FamilyDashboard";
import PrescriptionDetails from "@/components/PrescriptionDetails";
import SecureLockerPickup from "@/components/SecureLockerPickup";

const Index = () => {
  const [activeScreen, setActiveScreen] = useState(1);

  return (
    <div className="max-w-md mx-auto min-h-screen relative bg-background overflow-hidden shadow-2xl">
      <div className="overflow-y-auto min-h-screen">
        {activeScreen === 1 && <FamilyDashboard onNavigate={setActiveScreen} />}
        {activeScreen === 2 && <PrescriptionDetails onNavigate={setActiveScreen} />}
        {activeScreen === 3 && <SecureLockerPickup onNavigate={setActiveScreen} />}
      </div>
      <BottomNav activeScreen={activeScreen} onNavigate={setActiveScreen} />
    </div>
  );
};

export default Index;
