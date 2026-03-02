import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import FamilyDashboard from "@/components/FamilyDashboard";
import PrescriptionDetails from "@/components/PrescriptionDetails";
import SecureLockerPickup from "@/components/SecureLockerPickup";
import MedicineCabinet from "@/components/MedicineCabinet";
import PharmacistChat from "@/components/PharmacistChat";
import ProfileScreen from "@/components/ProfileScreen";

const Index = () => {
  const [searchParams] = useSearchParams();
  const initialScreen = parseInt(searchParams.get('screen') || '1', 10);
  const [activeScreen, setActiveScreen] = useState(initialScreen);
  
  // Update activeScreen when URL parameter changes
  useEffect(() => {
    const screenParam = searchParams.get('screen');
    if (screenParam) {
      setActiveScreen(parseInt(screenParam, 10));
    }
  }, [searchParams]);

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
