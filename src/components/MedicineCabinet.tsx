import { Search, Clock, Check, ChevronRight } from "lucide-react";
import avatarSarah from "@/assets/avatar-sarah.jpg";
import avatarDavid from "@/assets/avatar-david.jpg";
import avatarLily from "@/assets/avatar-lily.jpg";

interface MedicineCabinetProps {
  onNavigate: (screen: number) => void;
}

const filters = [
  { name: "All", selected: true },
  { name: "Sarah", avatar: avatarSarah },
  { name: "David", avatar: avatarDavid },
  { name: "Lily", avatar: avatarLily },
];

const activeMeds = [
  {
    name: "Amoxicillin",
    dose: "500mg · 1 tablet, twice daily",
    person: "Lily",
    avatar: avatarLily,
    nextDose: "8:00 PM",
    refillable: true,
  },
  {
    name: "Atorvastatin",
    dose: "20mg · 1 tablet, once daily",
    person: "David",
    avatar: avatarDavid,
    takenToday: true,
    refillable: true,
  },
  {
    name: "Lisinopril",
    dose: "10mg · 1 tablet, once daily",
    person: "Sarah",
    avatar: avatarSarah,
    nextDose: "9:00 AM",
    refillable: false,
  },
];

const pastMeds = [
  {
    name: "Ibuprofen",
    dose: "400mg · As needed",
    person: "David",
    ended: "Oct 2023",
  },
  {
    name: "Cetirizine",
    dose: "10mg · 1 tablet daily",
    person: "Sarah",
    ended: "Aug 2023",
  },
];

const MedicineCabinet = ({ onNavigate }: MedicineCabinetProps) => {
  return (
    <div className="pb-24 px-5 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-bold text-foreground">Medicine Cabinet</h1>
        <button className="w-11 h-11 rounded-full bg-secondary flex items-center justify-center">
          <Search className="w-5 h-5 text-teal-dark" />
        </button>
      </div>

      {/* Filter Pills */}
      <div className="flex gap-2 overflow-x-auto pb-4 -mx-1 px-1">
        {filters.map((f) => (
          <button
            key={f.name}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold flex-shrink-0 transition-colors ${
              f.selected
                ? "bg-teal-dark text-primary-foreground"
                : "bg-card text-muted-foreground border border-border"
            }`}
          >
            {f.avatar && (
              <img src={f.avatar} alt={f.name} className="w-5 h-5 rounded-full object-cover" />
            )}
            {f.name}
          </button>
        ))}
      </div>

      {/* Active Prescriptions */}
      <div className="mb-6">
        <p className="text-xs font-bold text-muted-foreground tracking-wider uppercase mb-3">
          Active Prescriptions
        </p>
        <div className="space-y-3">
          {activeMeds.map((med) => (
            <div key={med.name} className="bg-card rounded-2xl p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <img
                  src={med.avatar}
                  alt={med.person}
                  className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <p className="font-bold text-foreground text-lg">{med.name}</p>
                    <span className="bg-teal-light text-teal-dark text-[10px] font-semibold px-2.5 py-1 rounded-full">
                      For {med.person}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{med.dose}</p>
                  <div className="flex items-center gap-1.5 mt-2">
                    {med.takenToday ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-success" />
                        <span className="text-xs text-success">Taken today</span>
                      </>
                    ) : (
                      <>
                        <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          Next dose: {med.nextDose}
                        </span>
                      </>
                    )}
                  </div>
                  {/* Actions */}
                  <div className="flex items-center gap-3 mt-3 pt-3 border-t border-border">
                    <button
                      onClick={() => onNavigate(2)}
                      className="text-sm font-semibold text-teal-mid"
                    >
                      View Details
                    </button>
                    {med.refillable && (
                      <button className="text-sm font-semibold bg-amber text-amber-fg px-4 py-1.5 rounded-full">
                        Request Refill
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Past Medications */}
      <div>
        <p className="text-xs font-bold text-muted-foreground tracking-wider uppercase mb-3">
          Past Medications
        </p>
        <div className="space-y-3">
          {pastMeds.map((med) => (
            <div
              key={med.name}
              className="bg-muted rounded-2xl p-4 opacity-70"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-foreground">{med.name}</p>
                  <p className="text-sm text-muted-foreground">{med.dose}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    For {med.person} · Ended {med.ended}
                  </p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MedicineCabinet;
