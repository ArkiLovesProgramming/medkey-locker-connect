import { useState } from "react";
import { ChevronRight, CheckCircle, AlertCircle, Clock, Check, Bell } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import avatarSarah from "@/assets/avatar-sarah.jpg";
import avatarDavid from "@/assets/avatar-david.jpg";
import avatarLily from "@/assets/avatar-lily.jpg";

interface FamilyDashboardProps {
  onNavigate: (screen: number) => void;
}

const familyMembersData = [
  { name: "All", avatar: null },
  { name: "Sarah", avatar: avatarSarah },
  { name: "David", avatar: avatarDavid },
  { name: "Lily", avatar: avatarLily },
];

const FamilyDashboard = ({ onNavigate }: FamilyDashboardProps) => {
  const [selectedMember, setSelectedMember] = useState("All");

  return (
    <div className="pb-24 px-5 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Family Dashboard</h1>
        <button
          onClick={() => onNavigate(6)}
          className="w-11 h-11 rounded-full bg-teal-light flex items-center justify-center border-2 border-border active:scale-95 transition-transform"
        >
          <span className="text-sm font-semibold text-teal-dark">SJ</span>
        </button>
      </div>

      {/* Family Members */}
      <div className="mb-6">
        <p className="text-xs font-bold text-muted-foreground tracking-wider uppercase mb-3">Family Members</p>
        <div className="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1">
          {familyMembersData.map((m) => (
            <button
              key={m.name}
              onClick={() => setSelectedMember(m.name)}
              className="flex flex-col items-center flex-shrink-0 group"
            >
              {m.avatar ? (
                <img
                  src={m.avatar}
                  alt={m.name}
                  className={`w-16 h-16 rounded-2xl object-cover transition-all duration-200 active:scale-95 ${
                    selectedMember === m.name
                      ? "ring-3 ring-teal-dark ring-offset-2"
                      : "opacity-70 group-hover:opacity-100"
                  }`}
                />
              ) : (
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-200 active:scale-95 ${
                    selectedMember === m.name
                      ? "bg-teal-dark"
                      : "bg-muted"
                  }`}
                >
                  <span className={`font-bold text-sm ${selectedMember === m.name ? "text-primary-foreground" : "text-muted-foreground"}`}>ALL</span>
                </div>
              )}
              <span className={`text-xs mt-1.5 font-medium transition-colors ${
                selectedMember === m.name ? "text-teal-dark" : "text-muted-foreground"
              }`}>{m.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Action Needed */}
      <div className="mb-6">
        <p className="text-xs font-bold text-muted-foreground tracking-wider uppercase mb-3">Action Needed</p>

        {/* Amoxicillin Ready */}
        <button
          onClick={() => onNavigate(2)}
          className="w-full bg-teal-light rounded-2xl p-4 flex items-center gap-4 mb-3 text-left active:scale-[0.98] transition-transform duration-150"
        >
          <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
            <CheckCircle className="w-6 h-6 text-teal-icon" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-foreground">Amoxicillin Ready</p>
            <p className="text-sm text-teal-mid">Ready for pickup at MEDkey.</p>
            <p className="text-xs text-muted-foreground mt-0.5">For Lily Jenkins</p>
          </div>
          <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
        </button>

        {/* Atorvastatin Due */}
        <button
          onClick={() => {
            toast({
              title: "⏰ Refill Reminder",
              description: "Atorvastatin refill request has been sent to your pharmacy.",
            });
          }}
          className="w-full bg-warning-light rounded-2xl p-4 flex items-center gap-4 text-left active:scale-[0.98] transition-transform duration-150"
        >
          <div className="w-12 h-12 rounded-xl bg-card flex items-center justify-center flex-shrink-0">
            <AlertCircle className="w-6 h-6 text-warning" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-foreground">Atorvastatin</p>
            <p className="text-sm text-warning">Refill due 2023-10-25</p>
            <p className="text-xs text-muted-foreground mt-0.5">For David</p>
          </div>
          <span className="bg-warning-light border border-warning/30 text-warning text-[10px] font-bold px-3 py-1 rounded-full flex-shrink-0 uppercase tracking-wide animate-pulse">
            Due Now
          </span>
        </button>
      </div>

      {/* Active Medications */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-bold text-muted-foreground tracking-wider uppercase">Active Medications</p>
          <button
            onClick={() => onNavigate(4)}
            className="text-sm font-semibold text-teal-mid active:opacity-70 transition-opacity"
          >
            See All
          </button>
        </div>

        {/* Amoxicillin */}
        <button
          onClick={() => onNavigate(2)}
          className="w-full bg-card rounded-2xl p-4 shadow-sm mb-3 text-left active:scale-[0.98] transition-transform duration-150"
        >
          <div className="flex items-start gap-3">
            <img src={avatarLily} alt="Lily" className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <p className="font-bold text-foreground text-lg">Amoxicillin</p>
                <span className="bg-teal-light text-teal-dark text-[10px] font-semibold px-2.5 py-1 rounded-full">For Lily</span>
              </div>
              <p className="text-sm text-muted-foreground">500mg · Take 1 tablet daily</p>
              <div className="flex items-center gap-1.5 mt-2">
                <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Next dose: 8:00 PM</span>
              </div>
            </div>
          </div>
        </button>

        {/* Atorvastatin */}
        <button
          onClick={() => onNavigate(2)}
          className="w-full bg-card rounded-2xl p-4 shadow-sm text-left active:scale-[0.98] transition-transform duration-150"
        >
          <div className="flex items-start gap-3">
            <img src={avatarDavid} alt="David" className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <p className="font-bold text-foreground text-lg">Atorvastatin</p>
                <span className="bg-teal-light text-teal-dark text-[10px] font-semibold px-2.5 py-1 rounded-full">For David</span>
              </div>
              <p className="text-sm text-muted-foreground">20mg · Take 1 tablet daily</p>
              <div className="flex items-center gap-1.5 mt-2">
                <Check className="w-3.5 h-3.5 text-success" />
                <span className="text-xs text-success">Taken today</span>
              </div>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default FamilyDashboard;
