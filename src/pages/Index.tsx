import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import BottomNav from "@/components/BottomNav";
import FamilyDashboard from "@/components/FamilyDashboard";
import PrescriptionDetails from "@/components/PrescriptionDetails";
import SecureLockerPickup from "@/components/SecureLockerPickup";
import LockerUnlockedView from "@/components/LockerUnlockedView";
import MedicineCabinet from "@/components/MedicineCabinet";
import PharmacistChat from "@/components/PharmacistChat";
import ProfileScreen from "@/components/ProfileScreen";
import PrescriptionApprovedView from "@/components/PrescriptionApprovedView";

const Index = () => {
  const [searchParams] = useSearchParams();
  const initialScreen = parseInt(searchParams.get('screen') || '1', 10);
  const [activeScreen, setActiveScreen] = useState(initialScreen);
  const [selectedPrescriptionId, setSelectedPrescriptionId] = useState<string | undefined>(undefined);
  const [selectedOrderNumber, setSelectedOrderNumber] = useState<string | undefined>(undefined);
  const [showUnlockedView, setShowUnlockedView] = useState(false);
  const [showApprovedView, setShowApprovedView] = useState(false);
  const [approvedPrescriptionId, setApprovedPrescriptionId] = useState<string | undefined>(undefined);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Update activeScreen when URL parameter changes
  useEffect(() => {
    const screenParam = searchParams.get('screen');
    if (screenParam) {
      setActiveScreen(parseInt(screenParam, 10));
    }
  }, [searchParams]);

  // Scroll to top when navigating to approved view
  useEffect(() => {
    if (showApprovedView) {
      // Use setTimeout to ensure DOM is fully rendered before scrolling
      const timer = setTimeout(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTo({ top: 0, behavior: 'auto' });
        }
        window.scrollTo(0, 0);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [showApprovedView]);

  // Scroll to top when screen changes
  useEffect(() => {
    const timer = setTimeout(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTo({ top: 0, behavior: 'auto' });
      }
      window.scrollTo(0, 0);
    }, 50);
    return () => clearTimeout(timer);
  }, [activeScreen]);

  // Handle navigation with prescription ID
  const handleNavigate = (screen: number, prescriptionId?: string) => {
    if (prescriptionId) {
      setSelectedPrescriptionId(prescriptionId);
      // Check if navigating to approved view (screen 7)
      if (screen === 7) {
        setApprovedPrescriptionId(prescriptionId);
        setShowApprovedView(true);
        return;
      }
    }
    // Close approved view when navigating to any screen
    if (showApprovedView) {
      setShowApprovedView(false);
    }
    setActiveScreen(screen);
  };

  return (
    <div className="mx-auto min-h-screen relative bg-background shadow-2xl" style={{ maxWidth: '480px', overflowX: 'visible' }}>
      <div ref={scrollContainerRef} className="overflow-y-auto min-h-screen" style={{ overflowX: 'visible' }}>
        {/* Show unlocked view if scanning was successful */}
        {showUnlockedView ? (
          <LockerUnlockedView
            onNavigate={handleNavigate}
            onBack={() => setShowUnlockedView(false)}
            orderNumber={selectedOrderNumber}
          />
        ) : showApprovedView ? (
          <PrescriptionApprovedView
            onNavigate={handleNavigate}
            onBack={() => setShowApprovedView(false)}
            prescriptionId={approvedPrescriptionId}
          />
        ) : (
          <>
            {activeScreen === 1 && <FamilyDashboard onNavigate={handleNavigate} />}
            {activeScreen === 2 && <PrescriptionDetails prescriptionId={selectedPrescriptionId} onNavigate={handleNavigate} />}
            {activeScreen === 3 && (
              <SecureLockerPickup
                onNavigate={handleNavigate}
                onScanSuccess={(orderNumber) => {
                  setSelectedOrderNumber(orderNumber);
                  setShowUnlockedView(true);
                }}
              />
            )}
            {activeScreen === 4 && <MedicineCabinet onNavigate={handleNavigate} />}
            {activeScreen === 5 && <PharmacistChat onNavigate={handleNavigate} />}
            {activeScreen === 6 && <ProfileScreen onNavigate={handleNavigate} />}
          </>
        )}
      </div>
      {!showUnlockedView && !showApprovedView && <BottomNav activeScreen={activeScreen} onNavigate={setActiveScreen} />}
    </div>
  );
};

export default Index;
