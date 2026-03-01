import { ChevronRight, CheckCircle, AlertCircle, Clock, Check } from "lucide-react";
import avatarSarah from "@/assets/avatar-sarah.jpg";
import avatarDavid from "@/assets/avatar-david.jpg";
import avatarLily from "@/assets/avatar-lily.jpg";

interface FamilyDashboardProps {
  onNavigate: (screen: number) => void;
}

const familyMembers = [
  { name: "All", avatar: null, selected: true },
  { name: "Sarah", avatar: avatarSarah },
  { name: "David", avatar: avatarDavid },
  { name: "Lily", avatar: avatarLily },
];

const FamilyDashboard = ({ onNavigate }: FamilyDashboardProps) => {
  return (
    <div className="pb-24 px-5 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Family Dashboard</h1>
        <div className="w-11 h-11 rounded-full bg-teal-light flex items-center justify-center border-2 border-border">
          <span className="text-sm font-semibold text-teal-dark">SJ</span>
        </div>
      </div>

      {/* Family Members */}
      <div className="mb-6">
        <p className="text-xs font-bold text-muted-foreground tracking-wider uppercase mb-3">Family Members</p>
        <div className="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1">
          {familyMembers.map((m) => (
            <div key={m.name} className="flex flex-col items-center flex-shrink-0">
              {m.selected ? (
                <div className="w-16 h-16 rounded-2xl bg-teal-dark flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-sm">ALL</span>
                </div>
              ) : (
                <img src={m.avatar!} alt={m.name} className="w-16 h-16 rounded-2xl object-cover" />
              )}
              <span className="text-xs text-muted-foreground mt-1.5 font-medium">{m.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Needed */}
      <div className="mb-6">
        <p className="text-xs font-bold text-muted-foreground tracking-wider uppercase mb-3">Action Needed</p>

        {/* Amoxicillin Ready */}
        <button
          onClick={() => onNavigate(2)}
          className="w-full bg-teal-light rounded-2xl p-4 flex items-center gap-4 mb-3 text-left"
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
        <div className="w-full bg-warning-light rounded-2xl p-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-card flex items-center justify-center flex-shrink-0">
            <AlertCircle className="w-6 h-6 text-warning" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-foreground">Atorvastatin</p>
            <p className="text-sm text-warning">Refill due 2023-10-25</p>
            <p className="text-xs text-muted-foreground mt-0.5">For David</p>
          </div>
          <span className="bg-warning-light border border-warning/30 text-warning text-[10px] font-bold px-3 py-1 rounded-full flex-shrink-0 uppercase tracking-wide">
            Due Now
          </span>
        </div>
      </div>

      {/* Active Medications */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-bold text-muted-foreground tracking-wider uppercase">Active Medications</p>
          <button className="text-sm font-semibold text-teal-mid">See All</button>
        </div>

        {/* Amoxicillin */}
        <div className="bg-card rounded-2xl p-4 shadow-sm mb-3">
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
        </div>

        {/* Atorvastatin */}
        <div className="bg-card rounded-2xl p-4 shadow-sm">
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
        </div>
      </div>
    </div>
  );
};

export default FamilyDashboard;
