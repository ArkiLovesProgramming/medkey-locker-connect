import { useState } from "react";
import BottomNav from "@/components/BottomNav";
import FamilyDashboard from "@/components/FamilyDashboard";
import PrescriptionDetails from "@/components/PrescriptionDetails";
import SecureLockerPickup from "@/components/SecureLockerPickup";
import MedicineCabinet from "@/components/MedicineCabinet";
import PharmacistChat from "@/components/PharmacistChat";
import ProfileScreen from "@/components/ProfileScreen";

const Index = () => {
  const [activeScreen, setActiveScreen] = useState(1);

  return (
    <div className="max-w-md mx-auto min-h-screen relative bg-background overflow-hidden shadow-2xl">
      <div className="overflow-y-auto min-h-screen">
        {activeScreen === 1 && <FamilyDashboard onNavigate={setActiveScreen} />}
        {activeScreen === 2 && <PrescriptionDetails onNavigate={setActiveScreen} />}
        {activeScreen === 3 && <SecureLockerPickup onNavigate={setActiveScreen} />}
        {activeScreen === 4 && <MedicineCabinet onNavigate={setActiveScreen} />}
        {activeScreen === 5 && <PharmacistChat onNavigate={setActiveScreen} />}
        {activeScreen === 6 && <ProfileScreen onNavigate={setActiveScreen} />}
      </div>
      <BottomNav activeScreen={activeScreen} onNavigate={setActiveScreen} />
    </div>
  );
};

export default Index;
