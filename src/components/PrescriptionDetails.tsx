import {
  ArrowLeft,
  Phone,
  MoreVertical,
  Pill,
  Calendar,
  Clock,
  ShieldCheck,
  Info,
  Check,
  RotateCcw,
} from "lucide-react";

interface PrescriptionDetailsProps {
  onNavigate: (screen: number) => void;
}

const PrescriptionDetails = ({ onNavigate }: PrescriptionDetailsProps) => {
  return (
    <div className="pb-24">
      {/* Header - Teal background */}
      <div className="bg-teal-dark rounded-b-3xl px-5 pt-5 pb-7">
        <div className="flex items-center justify-between mb-5">
          <button onClick={() => onNavigate(1)} className="p-1">
            <ArrowLeft className="w-6 h-6 text-primary-foreground" />
          </button>
          <h2 className="text-primary-foreground font-semibold text-base">Prescription Details</h2>
          <div className="flex items-center gap-2">
            <button className="w-9 h-9 rounded-full bg-amber flex items-center justify-center">
              <Phone className="w-4 h-4 text-amber-fg" />
            </button>
            <button className="p-1">
              <MoreVertical className="w-5 h-5 text-primary-foreground/70" />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-primary-foreground/10 flex items-center justify-center">
            <Pill className="w-7 h-7 text-primary-foreground" />
          </div>
          <div>
            <h3 className="text-primary-foreground text-xl font-bold">Amoxicillin</h3>
            <p className="text-primary-foreground/80 text-sm">500 mg BID for 7 days</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-amber" />
              <p className="text-primary-foreground/80 text-sm">Qty 14 tablets</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-5 pt-5 space-y-4">
        {/* People Info */}
        <div className="bg-teal-light rounded-2xl p-4 flex">
          <div className="flex-1">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Patient</p>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-teal-dark flex items-center justify-center">
                <span className="text-primary-foreground text-xs font-bold">SM</span>
              </div>
              <span className="font-semibold text-foreground text-sm">Sarah Miller</span>
            </div>
          </div>
          <div className="w-px bg-border mx-3" />
          <div className="flex-1">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Prescriber</p>
            <p className="font-semibold text-foreground text-sm mt-2.5">Dr. James Wilson</p>
          </div>
        </div>

        {/* Rx Info Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-card rounded-2xl p-3.5 shadow-sm">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Date Prescribed</p>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="font-semibold text-sm text-foreground">Oct 24, 2023</span>
            </div>
          </div>
          <div className="bg-card rounded-2xl p-3.5 shadow-sm">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Last Picked Up</p>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="font-semibold text-sm text-foreground">Never</span>
            </div>
          </div>
          <div className="bg-card rounded-2xl p-3.5 shadow-sm">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Rx Number</p>
            <span className="font-semibold text-sm text-foreground">#4920391-01</span>
          </div>
          <div className="bg-card rounded-2xl p-3.5 shadow-sm">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Refills Remaining</p>
            <span className="font-semibold text-sm text-warning">None</span>
          </div>
        </div>

        {/* Scheduled Pickup */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-5 h-5 text-warning" />
            <h4 className="font-bold text-foreground">Scheduled Pickup</h4>
          </div>
          <div className="bg-card rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-xs text-muted-foreground">Estimated Ready Time</p>
                <p className="font-bold text-lg text-foreground">Tomorrow, 2:00 PM</p>
              </div>
              <button className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                <Calendar className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>
            <button className="w-full bg-teal-light text-teal-dark font-semibold text-sm py-3 rounded-xl flex items-center justify-center gap-2">
              <RotateCcw className="w-4 h-4" />
              Request Earlier Pickup
            </button>
          </div>
        </div>

        {/* Financial Breakdown */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-5 h-5 bg-amber rounded flex items-center justify-center">
              <span className="text-amber-fg text-[10px] font-bold">$</span>
            </div>
            <h4 className="font-bold text-foreground">Financial Breakdown</h4>
          </div>
          <div className="bg-card rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">Total Medication Cost</span>
              <span className="font-semibold text-foreground">$45.00</span>
            </div>
            <div className="bg-success-light rounded-xl p-3 flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-success" />
                <span className="text-sm font-medium text-foreground">Blue Cross Insurance</span>
              </div>
              <span className="font-bold text-success">-$35.00</span>
            </div>
            <div className="flex items-center gap-1.5 mb-3 px-1">
              <Info className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground italic">Reason: DIN not covered</span>
            </div>
            <div className="border-t border-dashed border-border my-3" />
            <div className="flex items-end justify-between">
              <div>
                <p className="font-semibold text-foreground text-sm">Your Co-pay</p>
                <p className="text-xs text-muted-foreground">Due at pickup</p>
              </div>
              <span className="text-3xl font-bold text-foreground">$10.00</span>
            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="pt-2 pb-4">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-success" />
            <span className="text-sm text-muted-foreground">Ready for review</span>
          </div>
          <button className="w-full bg-amber text-amber-fg font-bold py-4 rounded-2xl flex items-center justify-center gap-2 text-lg shadow-md">
            Approve Fill
            <Check className="w-5 h-5" />
          </button>
          <button className="w-full text-center text-sm text-muted-foreground mt-3 py-2">
            Cancel Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionDetails;
