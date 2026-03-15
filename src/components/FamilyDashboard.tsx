import { useState } from "react";
import { ChevronRight, CheckCircle, AlertCircle, Clock, Check, Bell } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { AvatarSVG, AvatarWithImage } from "@/assets/AvatarSVG";
import { useFamilyMembers, usePrescriptionsNeedingApproval, useMedications, useDashboardData } from "@/hooks/useData";
import { formatRelativeTime } from "@/utils/formatters";
import { PRESCRIPTION_STATUS } from "@/utils/constants";

interface FamilyDashboardProps {
  onNavigate: (screen: number, prescriptionId?: string) => void;
}

const FamilyDashboard = ({ onNavigate }: FamilyDashboardProps) => {
  const [selectedMember, setSelectedMember] = useState("all");
  const { data: familyMembers, isLoading: membersLoading } = useFamilyMembers();
  const { data: activeMeds } = useMedications(selectedMember !== "all" ? { memberId: selectedMember } : undefined);
  const { data: pendingPrescriptions } = usePrescriptionsNeedingApproval();
  const { data: dashboardData } = useDashboardData();

  if (membersLoading) {
    return (
      <div className="pb-24 px-5 pt-6 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const allMembersOption = [{ id: 'all', firstName: 'All', lastName: '', role: 'primary' as const }];
  const displayMembers = [...allMembersOption, ...(familyMembers || [])];

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
        <div className="relative">
          {/* Left fade indicator */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none opacity-0" />
          {/* Right fade indicator - always visible to hint scrollability */}
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          <div className="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide touch-smooth-scroll" style={{ scrollSnapType: 'x-mandatory' }}>
            {displayMembers.map((m) => (
              <button
                key={m.id}
                onClick={() => setSelectedMember(m.id)}
                className="flex flex-col items-center flex-shrink-0 group touch-feedback touch-no-delay"
                style={{ scrollSnapAlign: 'start' }}
              >
                <AvatarSVG
                  name={`${m.firstName} ${m.lastName}`}
                  size={64}
                  className={`rounded-2xl transition-all duration-200 active:scale-95 ${
                    selectedMember === m.id
                      ? "ring-3 ring-teal-dark ring-offset-2"
                      : "opacity-70 group-hover:opacity-100"
                  }`}
                />
                <span className={`text-xs mt-1.5 font-medium transition-colors ${
                  selectedMember === m.id ? "text-teal-dark" : "text-muted-foreground"
                }`}>{m.firstName}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Action Needed */}
      <div className="mb-6">
        <p className="text-xs font-bold text-muted-foreground tracking-wider uppercase mb-3">Action Needed</p>

        {/* Pending Prescriptions */}
        {pendingPrescriptions && pendingPrescriptions.length > 0 ? (
          pendingPrescriptions.map((prescription) => (
            <button
              key={prescription.id}
              onClick={() => onNavigate(2, prescription.id)}
              className="w-full bg-teal-light rounded-2xl p-4 flex items-center gap-4 mb-3 text-left active:scale-[0.98] transition-transform duration-150"
            >
              <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-6 h-6 text-teal-icon" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-foreground">{prescription.medicationName} Ready</p>
                <p className="text-sm text-teal-mid">Ready for pickup at MEDkey.</p>
                <p className="text-xs text-muted-foreground mt-0.5">For {prescription.patientName}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            </button>
          ))
        ) : (
          <p className="text-sm text-muted-foreground text-center py-4">No actions needed at the moment.</p>
        )}
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

        {/* Display active medications from hook */}
        {activeMeds && activeMeds.length > 0 ? (
          activeMeds.slice(0, 3).map((med) => (
            <button
              key={med.prescriptionId}
              onClick={() => onNavigate(2, med.prescriptionId)}
              className="w-full bg-card rounded-2xl p-4 shadow-sm mb-3 text-left active:scale-[0.98] transition-transform duration-150"
            >
              <div className="flex items-start gap-3">
                <AvatarSVG
                  name={med.memberName}
                  size={48}
                  className="rounded-xl flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <p className="font-bold text-foreground text-lg">{med.name}</p>
                    <span className="bg-teal-light text-teal-dark text-[10px] font-semibold px-2.5 py-1 rounded-full">
                      For {med.memberName}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{med.strength} · {med.frequency}</p>
                  <div className="flex items-center gap-1.5 mt-2">
                    {med.takenToday ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-success" />
                        <span className="text-xs text-success">Taken today</span>
                      </>
                    ) : (
                      <>
                        <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Next dose: {med.nextDose || 'Not scheduled'}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </button>
          ))
        ) : (
          <p className="text-sm text-muted-foreground text-center py-4">No active medications found.</p>
        )}
      </div>
    </div>
  );
};

export default FamilyDashboard;
