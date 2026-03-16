import { useState } from "react";
import { ChevronRight, CheckCircle, AlertCircle, Clock, Check } from "lucide-react";
import { AvatarSVG } from "@/assets/AvatarSVG";
import { useFamilyMembers, useMedications } from "@/hooks/useData";
import { getReadyOrders } from "@/data/mockPickupOrders";
import { prescriptions } from "@/data/mockPrescriptions";

interface FamilyDashboardProps {
  onNavigate: (screen: number, prescriptionId?: string) => void;
}

const FamilyDashboard = ({ onNavigate }: FamilyDashboardProps) => {
  const [selectedMember, setSelectedMember] = useState("all");
  const { data: familyMembers, isLoading: membersLoading } = useFamilyMembers();
  const { data: activeMeds } = useMedications(selectedMember !== "all" ? { memberId: selectedMember } : undefined);

  // Dynamic data for Action Needed cards
  const readyOrders = getReadyOrders();
  const readyOrdersCount = readyOrders.reduce((sum, o) => sum + o.items.length, 0);
  const uniquePatients = Array.from(
    new Set(readyOrders.flatMap(o => o.items.map(i => i.patientName)))
  );
  const pharmacyName = readyOrders[0]?.pharmacy?.name || 'MEDkey Pharmacy';

  // Format patient names as "For Lily & David" (first names only)
  const firstNames = uniquePatients.map(name => name.split(' ')[0]);
  const patientNamesText = firstNames.length > 1
    ? `For ${firstNames.slice(0, -1).join(', ')} & ${firstNames.slice(-1)[0]}`
    : firstNames.length === 1
    ? `For ${firstNames[0]}`
    : '';

  // Find insurance denied prescription for Lily Jenkins
  const insuranceDeniedPrescription = prescriptions.find(
    p => p.patientName.includes('Lily') && p.status === 'needs-approval' &&
    (p.financials?.coverageItems?.some(item => item.isDenied) || p.financials?.coverageReason?.includes('denied'))
  );

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
    <div className="pb-24 px-4 pt-4 safe-area-inset-top">
      {/* Header - 移动端优化 */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm pb-4 mb-2">
        <div className="flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl font-bold text-foreground leading-tight">Family Dashboard</h1>
          <button
            onClick={() => onNavigate(6)}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-teal-light flex items-center justify-center border-2 border-border active:scale-95 transition-transform touch-feedback flex-shrink-0"
            aria-label="Profile settings"
          >
            <span className="text-xs sm:text-sm font-semibold text-teal-dark">SJ</span>
          </button>
        </div>
      </div>

      {/* Family Members */}
      <div className="relative mb-6">
        <p className="text-xs font-bold text-muted-foreground tracking-wider uppercase mb-3">Family Members</p>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide touch-smooth-scroll" style={{ scrollSnapType: 'x-mandatory' }}>
          {displayMembers.map((m) => {
            const isSelected = selectedMember === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setSelectedMember(m.id)}
                className={`flex flex-col items-center flex-shrink-0 gap-1.5 transition-all duration-200 active:scale-95 touch-feedback touch-no-delay ${
                  isSelected ? "opacity-100" : "opacity-70"
                }`}
                style={{ scrollSnapAlign: 'start' }}
              >
                <AvatarSVG
                  name={`${m.firstName} ${m.lastName}`}
                  size={64}
                  className={`rounded-2xl ${
                    isSelected ? "ring-3 ring-teal-dark ring-offset-2" : ""
                  }`}
                />
                <span className={`text-xs font-medium whitespace-nowrap ${
                  isSelected ? "text-teal-dark" : "text-muted-foreground"
                }`}>{m.firstName}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Action Needed */}
      <div className="mb-6">
        <p className="text-xs font-bold text-muted-foreground tracking-wider uppercase mb-3">Action Needed</p>

        <div className="space-y-3">
          {/* Card 1: Medications Ready for Pickup */}
          {readyOrdersCount > 0 && (
            <button
              onClick={() => onNavigate(3)}
              className="w-full bg-teal-light rounded-2xl p-4 flex items-center gap-4 text-left active:scale-[0.98] transition-transform duration-150"
            >
              <div className="w-11 h-11 rounded-lg bg-teal-100 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-5 h-5 text-teal-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-foreground text-sm leading-tight">
                  {readyOrdersCount} Medication{readyOrdersCount > 1 ? 's' : ''} Ready for PickUp
                </p>
                <p className="text-xs text-teal-700 leading-tight mt-0.5">Ready for pickup at {pharmacyName}</p>
                <p className="text-[10px] text-muted-foreground leading-tight mt-0.5">{patientNamesText}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            </button>
          )}

          {/* Card 2: Insurance Coverage Issue */}
          {insuranceDeniedPrescription && (
            <button
              onClick={() => onNavigate(2, insuranceDeniedPrescription.id)}
              className="w-full bg-amber-50 rounded-2xl p-4 flex items-center gap-4 text-left active:scale-[0.98] transition-transform duration-150 border border-amber-100"
            >
              <div className="w-11 h-11 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-5 h-5 text-amber-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-foreground text-sm leading-tight">
                  {insuranceDeniedPrescription.patientName}
                </p>
                <p className="text-xs text-red-500 font-medium leading-tight mt-0.5">
                  {insuranceDeniedPrescription.financials?.coverageItems?.find(item => item.isDenied)?.denialReason ||
                   insuranceDeniedPrescription.financials?.coverageReason ||
                   'Insurance denied coverage'}
                </p>
                <p className="text-[10px] text-muted-foreground leading-tight mt-0.5">
                  Action Needed: Insurance Coverage Issue
                </p>
              </div>
              <span className="bg-orange-100 text-orange-600 text-[10px] font-bold px-2.5 py-1 rounded-full flex-shrink-0">
                ALERT
              </span>
            </button>
          )}

          {/* Empty state when no action items */}
          {readyOrdersCount === 0 && !insuranceDeniedPrescription && (
            <p className="text-sm text-muted-foreground text-center py-4">No actions needed at the moment.</p>
          )}
        </div>
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
          activeMeds.map((med) => (
            <button
              key={med.prescriptionId}
              onClick={() => onNavigate(2, med.prescriptionId)}
              className="w-full bg-card rounded-2xl p-4 shadow-sm mb-3 text-left active:scale-[0.98] transition-transform duration-150"
            >
              <div className="flex items-start gap-3">
                <AvatarSVG
                  name={(() => {
                    const member = familyMembers?.find(m => m.id === med.memberId);
                    return member ? `${member.firstName} ${member.lastName}` : med.memberName;
                  })()}
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
