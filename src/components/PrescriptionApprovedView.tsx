import { useState } from "react";
import {
  CheckCircle,
  Calendar,
  MapPin,
  Lock,
  ArrowLeft,
  Clock,
  X,
  ChevronRight,
  RefreshCcw,
  Pill,
  Check,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { prescriptions } from "@/data/mockPrescriptions";

interface PrescriptionApprovedViewProps {
  onNavigate: (screen: number, prescriptionId?: string) => void;
  onBack: () => void;
  prescriptionId?: string;
}

const PrescriptionApprovedView = ({
  onNavigate,
  onBack,
  prescriptionId,
}: PrescriptionApprovedViewProps) => {
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [optInMedlockd, setOptInMedlockd] = useState(false);

  // Find the prescription from mock data
  const rx = prescriptions.find((p) => p.id === prescriptionId) || prescriptions[0];

  // Format date only
  const formatPickupDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleString("en-US", options);
  };

  // Format time only
  const formatPickupTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleChangePickupTime = () => {
    setShowTimePicker(true);
  };

  const handleSelectTime = (time: string) => {
    toast({
      title: "Pickup Time Updated",
      description: `Your pickup time has been changed to ${time}`,
    });
    setShowTimePicker(false);
  };

  const handleOptInMedlockd = () => {
    setOptInMedlockd(!optInMedlockd);
    toast({
      title: optInMedlockd ? "Opted Out" : "Opted In",
      description: optInMedlockd
        ? "You've been opted out of MEDLOCKD pickup"
        : "You've been opted into MEDLOCKD secure locker pickup",
    });
  };

  const handleBackToHome = () => {
    onNavigate(1);
  };

  const handleAddToCalendar = () => {
    toast({
      title: "Added to Calendar",
      description: `Pickup reminder added for ${formatPickupDate(rx.pickupInfo?.estimatedReadyTime || "")}`,
    });
  };

  // Progress steps
  const progressSteps = [
    { label: "REQUEST", subLabel: "RECEIVED", status: "completed", icon: Check },
    { label: "INSURANCE", subLabel: "VERIFIED", status: "completed", icon: Check },
    { label: "PHARMACIST", subLabel: "REVIEW", status: "active", icon: RefreshCcw },
    { label: "READY FOR", subLabel: "PICKUP", status: "pending", icon: Pill },
  ];

  return (
    <div className="min-h-screen bg-background pb-6">
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-5 pb-3">
        <button
          onClick={onBack}
          className="p-2 active:scale-90 transition-transform"
        >
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
        <h2 className="font-semibold text-base text-foreground">Approval Confirmed</h2>
        <div className="w-10" />
      </div>

      {/* Success State Section */}
      <div className="text-center py-6 bg-gradient-to-b from-teal-light/20 to-transparent rounded-b-3xl px-5">
        <div className="w-20 h-20 mx-auto mb-4 bg-gradient-medkey rounded-full flex items-center justify-center shadow-lg animate-bounce-slow">
          <CheckCircle className="w-10 h-10 text-primary-foreground" />
        </div>
        <h1 className="text-2xl font-bold text-teal-dark mb-2">Prescription Approved!</h1>
        <p className="text-muted-foreground text-sm max-w-xs mx-auto">
          Your request for {rx.medicationName} {rx.strength} has been confirmed for {rx.patientName}.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="px-5 mt-6">
        <div className="bg-card rounded-2xl p-6 shadow-medkey-sm border border-border">
          <div className="relative flex items-center">
            {/* Progress Line - Background */}
            <div className="absolute top-5 left-0 right-0 h-1 bg-muted rounded-full" />
            {/* Progress Line - Filled */}
            <div
              className="absolute top-5 left-0 h-1 bg-teal-dark rounded-full transition-all duration-500"
              style={{ width: "66%" }}
            />

            {/* Progress Steps */}
            {progressSteps.map((step) => {
              const IconComponent = step.icon;
              return (
                <div key={step.label} className="flex-1 flex flex-col items-center relative z-10">
                  {/* Circle Node */}
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      step.status === "completed"
                        ? "bg-teal-dark text-primary-foreground"
                        : step.status === "active"
                        ? "bg-white text-teal-dark border-2 border-teal-dark"
                        : "bg-white text-muted-foreground border-2 border-muted"
                    }`}
                  >
                    {step.status === "completed" ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <IconComponent className="w-5 h-5" />
                    )}
                  </div>
                  {/* Labels */}
                  <div className="mt-3 text-center">
                    <p
                      className={`text-[10px] font-bold uppercase tracking-wider ${
                        step.status === "pending" ? "text-muted-foreground" : "text-teal-dark"
                      }`}
                    >
                      {step.label}
                    </p>
                    <p
                      className={`text-[10px] font-bold uppercase tracking-wider ${
                        step.status === "pending" ? "text-muted-foreground" : "text-teal-dark"
                      }`}
                    >
                      {step.subLabel}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Pickup Details Section */}
      <div className="px-5 mt-4">
        <div className="flex items-center gap-2 mb-3">
          <Clock className="w-5 h-5 text-teal-dark" />
          <h3 className="font-bold text-foreground text-sm uppercase tracking-wider">
            Pickup Details
          </h3>
        </div>

        <div className="bg-card rounded-2xl p-4 shadow-medkey-sm border border-border">
          {/* Scheduled Time */}
          <div className="mb-4">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">
              Scheduled Pickup
            </p>
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold text-foreground text-base">
                  {formatPickupDate(rx.pickupInfo?.estimatedReadyTime || "")}
                </p>
                <p className="text-muted-foreground text-sm">
                  at {formatPickupTime(rx.pickupInfo?.estimatedReadyTime || "")}
                </p>
              </div>
              <button
                onClick={handleChangePickupTime}
                className="px-3 py-1.5 bg-teal-light text-teal-dark text-xs font-semibold rounded-lg active:scale-95 transition-transform flex items-center gap-1"
              >
                <Calendar className="w-3.5 h-3.5" />
                Change
              </button>
            </div>
          </div>

          {/* Location */}
          <div className="border-t border-border pt-4">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2">
              Location
            </p>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-light/30 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-teal-dark" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-foreground text-sm">
                  {rx.pharmacy?.name || "MEDkey Pharmacy"}
                </p>
                <p className="text-muted-foreground text-xs mt-0.5">
                  {rx.pharmacy?.address || "555 Main Street, Springfield, IL"}
                </p>
              </div>
            </div>
            {/* Map Preview Placeholder */}
            <div className="mt-3 rounded-xl overflow-hidden">
              <div className="h-24 bg-muted rounded-xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  <div className="h-full w-full" style={{
                    backgroundImage: 'linear-gradient(90deg, transparent 95%, rgba(45, 122, 138, 0.1) 95%), linear-gradient(transparent 95%, rgba(45, 122, 138, 0.1) 95%)',
                    backgroundSize: '20px 20px'
                  }} />
                </div>
                <div className="text-center z-10">
                  <MapPin className="w-6 h-6 text-teal-dark mx-auto mb-1" />
                  <p className="text-xs text-muted-foreground">Map Preview</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MEDLOCKD Option */}
      <div className="px-5 mt-4">
        <div className="flex items-center gap-2 mb-3">
          <Lock className="w-5 h-5 text-teal-dark" />
          <h3 className="font-bold text-foreground text-sm uppercase tracking-wider">
            Approve MEDLOCKD Pickup
          </h3>
        </div>

        <button
          onClick={handleOptInMedlockd}
          className={`w-full bg-card rounded-2xl p-4 shadow-medkey-sm border-2 transition-all duration-200 active:scale-[0.98] ${
            optInMedlockd
              ? "border-teal-dark bg-teal-light/10"
              : "border-border"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  optInMedlockd
                    ? "bg-teal-dark text-primary-foreground"
                    : "bg-teal-light/30 text-teal-dark"
                }`}
              >
                <Lock className="w-6 h-6" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-foreground text-sm">
                  {optInMedlockd ? "Opted In to MEDLOCKD" : "Opt In to MEDLOCKD"}
                </p>
                <p className="text-muted-foreground text-xs mt-0.5">
                  {optInMedlockd
                    ? "Secure locker pickup enabled"
                    : "Enable secure locker pickup for convenience"}
                </p>
              </div>
            </div>
            <div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                optInMedlockd
                  ? "border-teal-dark bg-teal-dark"
                  : "border-muted-foreground/30"
              }`}
            >
              {optInMedlockd && <CheckCircle className="w-4 h-4 text-primary-foreground" />}
            </div>
          </div>
        </button>
      </div>

      {/* Action Buttons */}
      <div className="px-5 mt-6 pb-6">
        <button
          onClick={handleBackToHome}
          className="w-full bg-teal-dark text-primary-foreground font-bold py-4 rounded-2xl shadow-medkey-md active:scale-[0.98] transition-transform flex items-center justify-center gap-2 mb-3"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </button>

        <button
          onClick={handleAddToCalendar}
          className="w-full bg-card border border-border text-foreground font-semibold py-4 rounded-2xl shadow-medkey-sm active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
        >
          <Calendar className="w-5 h-5" />
          Add to Calendar
        </button>
      </div>

      {/* Time Picker Modal */}
      {showTimePicker && (
        <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 animate-fade-in">
          <div className="bg-white rounded-t-3xl sm:rounded-2xl p-6 w-full max-w-md animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-foreground">Select Pickup Time</h3>
              <button
                onClick={() => setShowTimePicker(false)}
                className="p-2 active:scale-90 transition-transform"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto">
              {[
                "9:00 AM",
                "10:00 AM",
                "11:00 AM",
                "12:00 PM",
                "1:00 PM",
                "2:00 PM",
                "3:00 PM",
                "4:00 PM",
                "5:00 PM",
                "6:00 PM",
              ].map((time) => (
                <button
                  key={time}
                  onClick={() => handleSelectTime(time)}
                  className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-teal-light/10 active:scale-[0.98] transition-all border border-transparent hover:border-teal-light"
                >
                  <span className="font-medium text-foreground">{time}</span>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrescriptionApprovedView;
