import { useState } from "react";
import { Search, X, Calendar, Info } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useMedications, usePastMedications, useFamilyMembers, useRefillRequest } from "@/hooks/useData";
import { AvatarSVG } from "@/assets/AvatarSVG";

interface MedicineCabinetProps {
  onNavigate: (screen: number, prescriptionId?: string) => void;
}

const MedicineCabinet = ({ onNavigate }: MedicineCabinetProps) => {
  const [selected, setSelected] = useState("all");
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [requestingMedId, setRequestingMedId] = useState<string | null>(null);
  const { data: familyMembers } = useFamilyMembers();
  const { data: activeMeds, isLoading: activeLoading } = useMedications(
    selected !== "all" ? { memberId: selected } : undefined
  );
  const { data: pastMedsData } = usePastMedications(
    selected !== "all" ? { memberId: selected } : undefined
  );
  const refillMutation = useRefillRequest();

  const filteredActive = (activeMeds || []).filter(
    (m) => (!searchQuery || m.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  const filteredPast = (pastMedsData || []).filter(
    (m) => (!searchQuery || m.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleRefillRequest = (medicationId: string, prescriptionId: string, medicationName: string) => {
    setRequestingMedId(medicationId);
    refillMutation.mutate(
      { medicationId, prescriptionId },
      {
        onSuccess: () => {
          toast({
            title: "Refill Requested",
            description: `${medicationName} refill has been sent to your pharmacy.`,
          });
          setRequestingMedId(null);
        },
        onError: () => {
          toast({
            title: "Error",
            description: "Failed to request refill. Please try again.",
          });
          setRequestingMedId(null);
        },
      }
    );
  };

  // Helper to get due date (mock calculation based on prescription data)
  const getDueDate = (med: any) => {
    // Mock due dates based on medication name for demo
    const dueDates: Record<string, string> = {
      'Amoxicillin': 'March 17, 2026',
      'Rosuvastatin': 'March 17, 2026',
      'Metformin': 'April 27, 2026',
      'Cetirizine': 'March 20, 2026',
    };
    return dueDates[med.name] || 'Soon';
  };

  // Check if medication is new
  const isNewRx = (med: any) => {
    return med.isNew === true;
  };

  // Check if medication is as needed
  const isAsNeeded = (med: any) => {
    return med.asNeeded === true || med.frequency?.toLowerCase().includes('as needed');
  };

  const filters = ["all", ...(familyMembers || []).map(m => m.id)];
  const filterLabels: Record<string, string> = { all: "All", ...Object.fromEntries((familyMembers || []).map(m => [m.id, m.firstName])) };

  return (
    <div className="pb-24 px-4 pt-4 safe-area-inset-top">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        {searchOpen ? (
          <div className="flex-1 flex items-center gap-2 bg-card border border-border rounded-full px-4 py-2 animate-fade-in">
            <Search className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <input
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search medications..."
              className="flex-1 bg-transparent text-sm outline-none text-foreground placeholder:text-muted-foreground"
            />
            <button onClick={() => { setSearchOpen(false); setSearchQuery(""); }}>
              <X className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-foreground">Medicine Cabinet</h1>
            <button
              onClick={() => setSearchOpen(true)}
              className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center active:scale-95 transition-transform"
            >
              <Search className="w-5 h-5 text-teal-700" />
            </button>
          </>
        )}
      </div>

      {/* Filter Pills */}
      <div className="relative mb-6">
        {/* Right fade indicator */}
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide touch-smooth-scroll" style={{ scrollSnapType: 'x-mandatory' }}>
          {filters.map((f) => {
            const isSelected = selected === f;
            const member = familyMembers?.find(m => m.id === f);
            return (
              <button
                key={f}
                onClick={() => setSelected(f)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold flex-shrink-0 transition-all duration-200 active:scale-95 touch-feedback touch-no-delay border ${isSelected
                    ? "bg-teal-700 text-white border-teal-700 shadow-md"
                    : "bg-white text-gray-700 border-gray-200 hover:border-teal-300"
                  }`}
                style={{ scrollSnapAlign: 'start' }}
              >
                {f === "all" ? (
                  <span className="text-sm">All</span>
                ) : member ? (
                  <>
                    <AvatarSVG
                      name={`${member.firstName} ${member.lastName}`}
                      size={24}
                      className="rounded-full"
                    />
                    <span>{filterLabels[f]}</span>
                  </>
                ) : (
                  <span>{filterLabels[f] || f}</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Prescriptions */}
      <div className="mb-6">
        <p className="text-xs font-bold text-gray-500 tracking-wider uppercase mb-3">
          ACTIVE PRESCRIPTIONS ({filteredActive.length})
        </p>
        <div className="space-y-4">
          {activeLoading ? (
            <p className="text-sm text-muted-foreground text-center py-8">Loading medications...</p>
          ) : filteredActive.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">No active medications found.</p>
          ) : (
            filteredActive.map((med, index) => {
              const member = familyMembers?.find(m => m.id === med.memberId);
              const memberId = member?.id || 'user-001';
              const memberFullName = member ? `${member.firstName} ${member.lastName}` : med.memberName;
              const dueDate = getDueDate(med);
              const newRx = isNewRx(med);

              return (
                <div key={`${med.id || 'med'}-${index}`} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 animate-fade-in">
                  {/* Avatar and header info */}
                  <div className="flex items-start gap-3 mb-3">
                    <AvatarSVG
                      name={memberFullName}
                      size={48}
                      className="rounded-xl flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      {/* Medication name and tags row */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <p className="font-bold text-gray-900 text-lg leading-tight">{med.name}</p>
                          <p className="text-sm text-gray-500">For {med.memberName}</p>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          {newRx && (
                            <span className="bg-teal-100 text-teal-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
                              NEW RX
                            </span>
                          )}
                          <span className="bg-gray-100 text-gray-600 text-[10px] font-semibold px-2 py-0.5 rounded-full">
                            {med.strength}
                          </span>
                        </div>
                      </div>

                      {/* Frequency */}
                      <p className="text-sm text-gray-600 mt-1">{med.frequency}</p>

                      {/* Due date or As Needed */}
                      {isAsNeeded(med) ? (
                        <div className="flex items-center gap-1.5 mt-2">
                          <Info className="w-3.5 h-3.5 text-gray-400" />
                          <span className="text-xs text-gray-500">Available as needed</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 mt-2">
                          <Calendar className="w-3.5 h-3.5 text-gray-400" />
                          <span className="text-xs text-gray-500">Due {dueDate}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action buttons - full width */}
                  <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                    <button
                      onClick={() => onNavigate(2, med.prescriptionId)}
                      className="flex-1 py-2.5 px-4 rounded-xl border border-teal-600 text-teal-700 text-sm font-semibold active:scale-[0.98] transition-transform"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleRefillRequest(med.id, med.prescriptionId, med.name)}
                      disabled={requestingMedId === med.id}
                      className="flex-1 py-2.5 px-4 rounded-xl bg-teal-700 text-white text-sm font-semibold active:scale-[0.98] transition-transform disabled:opacity-50"
                    >
                      {requestingMedId === med.id ? "Requesting..." : "Request Refill"}
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Past Medications */}
      <div>
        <p className="text-xs font-bold text-gray-500 tracking-wider uppercase mb-3">PAST MEDICATIONS</p>
        <div className="space-y-3">
          {filteredPast.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">No past medications found.</p>
          ) : (
            filteredPast.map((med, index) => {
              const member = familyMembers?.find(m => m.id === med.memberId);
              const memberId = member?.id || 'user-001';
              const memberFullName = member ? `${member.firstName} ${member.lastName}` : med.memberName;

              return (
                <button
                  key={`${med.id || 'past-med'}-${index}`}
                  onClick={() => toast({ title: med.name, description: `${med.strength} · Ended ${med.endDate}` })}
                  className="w-full bg-gray-50 rounded-2xl p-4 opacity-70 hover:opacity-90 transition-opacity text-left active:scale-[0.98] border border-gray-100"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <AvatarSVG
                        name={memberFullName}
                        size={40}
                        className="rounded-full flex-shrink-0"
                      />
                      <div>
                        <p className="font-bold text-gray-900">{med.name}</p>
                        <p className="text-sm text-gray-500">{med.strength} · {med.frequency}</p>
                        <p className="text-xs text-gray-400 mt-0.5">For {med.memberName} · Ended {med.endDate}</p>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicineCabinet;
