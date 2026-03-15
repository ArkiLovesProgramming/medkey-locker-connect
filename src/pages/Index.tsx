import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import FamilyDashboard from "@/components/FamilyDashboard";
import PrescriptionDetails from "@/components/PrescriptionDetails";
import SecureLockerPickup from "@/components/SecureLockerPickup";
import LockerUnlockedView from "@/components/LockerUnlockedView";
import MedicineCabinet from "@/components/MedicineCabinet";
import PharmacistChat from "@/components/PharmacistChat";
import ProfileScreen from "@/components/ProfileScreen";

const Index = () => {
  const [searchParams] = useSearchParams();
  const initialScreen = parseInt(searchParams.get('screen') || '1', 10);
  const [activeScreen, setActiveScreen] = useState(initialScreen);
  const [selectedPrescriptionId, setSelectedPrescriptionId] = useState<string | undefined>(undefined);
  const [showUnlockedView, setShowUnlockedView] = useState(false);
  
  // Update activeScreen when URL parameter changes
  useEffect(() => {
    const screenParam = searchParams.get('screen');
    if (screenParam) {
      setActiveScreen(parseInt(screenParam, 10));
    }
  }, [searchParams]);

  // Handle navigation with prescription ID
  const handleNavigate = (screen: number, prescriptionId?: string) => {
    if (prescriptionId) {
      setSelectedPrescriptionId(prescriptionId);
    }
    setActiveScreen(screen);
  };

  return (
    <div className="max-w-md mx-auto min-h-screen relative bg-background overflow-hidden shadow-2xl">
      <div className="overflow-y-auto min-h-screen">
        {/* Show unlocked view if scanning was successful */}
        {showUnlockedView ? (
          <LockerUnlockedView
            onNavigate={setActiveScreen}
            onBack={() => setShowUnlockedView(false)}
          />
        ) : (
          <>
            {activeScreen === 1 && <FamilyDashboard onNavigate={handleNavigate} />}
            {activeScreen === 2 && <PrescriptionDetails prescriptionId={selectedPrescriptionId} onNavigate={handleNavigate} />}
            {activeScreen === 3 && (
              <SecureLockerPickup
                onNavigate={handleNavigate}
                onScanSuccess={() => setShowUnlockedView(true)}
              />
            )}
            {activeScreen === 4 && <MedicineCabinet onNavigate={handleNavigate} />}
            {activeScreen === 5 && <PharmacistChat onNavigate={handleNavigate} />}
            {activeScreen === 6 && <ProfileScreen onNavigate={handleNavigate} />}
          </>
        )}
      </div>
      {!showUnlockedView && <BottomNav activeScreen={activeScreen} onNavigate={setActiveScreen} />}
    </div>
  );
};

export default Index;
