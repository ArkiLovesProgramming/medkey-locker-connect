import { useState } from "react";
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
  ChevronRight,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Prescription } from "@/types";
import { prescriptions } from "@/data/mockPrescriptions";

interface PrescriptionDetailsProps {
  prescriptionId?: string;
  onNavigate: (screen: number) => void;
}

const PrescriptionDetails = ({ prescriptionId, onNavigate }: PrescriptionDetailsProps) => {
  const [approved, setApproved] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [showDrugInfo, setShowDrugInfo] = useState(false);

  // Find the prescription from mock data, fallback to first needs-approval prescription
  const rx = prescriptions.find(p => p.id === prescriptionId) || 
             prescriptions.find(p => p.status === 'needs-approval') || 
             prescriptions[0];

  const handleApprove = () => {
    setApproved(true);
    toast({
      title: "Prescription Approved",
      description: `${rx.medicationName} fill has been approved. You'll be notified when it's ready.`,
    });
  };

  const handleCallPharmacy = () => {
    toast({
      title: "Calling Pharmacy",
      description: `Connecting you to ${rx.pharmacy?.name || 'MEDkey pharmacy'}...`,
    });
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatDateTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();
    const timeStr = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    return isToday ? `Today, ${timeStr}` : `${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}, ${timeStr}`;
  };

  // Get patient initials
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="pb-24">
      {/* Header - Teal background */}
      <div className="bg-teal-dark rounded-b-3xl px-5 pt-5 pb-7">
        <div className="flex items-center justify-between mb-5">
          <button onClick={() => onNavigate(1)} className="p-1 active:scale-90 transition-transform">
            <ArrowLeft className="w-6 h-6 text-primary-foreground" />
          </button>
          <h2 className="text-primary-foreground font-semibold text-base">Prescription Details</h2>
          <button
            onClick={() => setShowMore(!showMore)}
            className="p-1 active:scale-90 transition-transform"
          >
            <MoreVertical className="w-5 h-5 text-primary-foreground/70" />
          </button>
        </div>

        {/* Prescription Status Badge */}
        <div className="flex items-center justify-center mb-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            rx.status === 'needs-approval' 
              ? 'bg-amber/20 text-amber' 
              : rx.status === 'ready'
              ? 'bg-success/20 text-success'
              : 'bg-teal-light text-teal-dark'
          }`}>
            {rx.status === 'needs-approval' ? 'Needs Approval' : 
             rx.status === 'ready' ? 'Ready for Pickup' : 
             rx.status === 'active' ? 'Active' : rx.status}
          </span>
        </div>

        {/* Dropdown menu */}
        {showMore && (
          <div className="absolute right-6 top-14 bg-card rounded-2xl shadow-lg border border-border z-50 animate-fade-in overflow-hidden">
            {["Share Prescription", "Print Details", "Report Issue"].map((item) => (
              <button
                key={item}
                onClick={() => {
                  setShowMore(false);
                  toast({ title: item, description: `${item} action initiated.` });
                }}
                className="w-full text-left px-5 py-3 text-sm text-foreground hover:bg-muted transition-colors border-b border-border last:border-0"
              >
                {item}
              </button>
            ))}
          </div>
        )}

        {/* Medication Info */}
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-primary-foreground/10 flex items-center justify-center">
            <Pill className="w-7 h-7 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <h3 className="text-primary-foreground text-xl font-bold">{rx.medicationName} {rx.strength}</h3>
            <p className="text-primary-foreground/80 text-sm">
              {rx.quantity} Tablets · {rx.frequency}
            </p>
            {rx.notes && (
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber" />
                <p className="text-primary-foreground/80 text-sm">{rx.notes.split('.')[0]}</p>
              </div>
            )}
          </div>
          {/* Prescription ID Badge */}
          <div className="text-right">
            <span className="text-primary-foreground/60 text-xs">{rx.rxNumber}</span>
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
                <span className="text-primary-foreground text-xs font-bold">{getInitials(rx.patientName)}</span>
              </div>
              <span className="font-semibold text-foreground text-sm">{rx.patientName}</span>
            </div>
          </div>
          <div className="w-px bg-border mx-3" />
          <div className="flex-1">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">Prescriber</p>
            <p className="font-semibold text-foreground text-sm mt-2.5">{rx.prescriber.name}</p>
          </div>
        </div>

        {/* Rx Info Grid - New order matching images */}
        <div className="grid grid-cols-2 gap-3">
          {/* Row 1 */}
          <div className="bg-card rounded-2xl p-3.5 shadow-sm">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Date Prescribed</p>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="font-semibold text-sm text-foreground">{formatDate(rx.datePrescribed)}</span>
            </div>
          </div>
          <div className="bg-card rounded-2xl p-3.5 shadow-sm">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Refills Remaining</p>
            <div className="flex items-center gap-1.5">
              <RotateCcw className="w-3.5 h-3.5 text-muted-foreground" />
              <span className={`font-semibold text-sm ${rx.refillsRemaining > 0 ? 'text-success' : 'text-warning'}`}>
                {rx.refillsRemaining > 0 ? `${rx.refillsRemaining} remaining` : 'None'}
              </span>
            </div>
          </div>
          {/* Row 2 */}
          <div className="bg-card rounded-2xl p-3.5 shadow-sm">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Rx Number</p>
            <span className="font-semibold text-sm text-foreground">{rx.rxNumber}</span>
          </div>
          <div className="bg-card rounded-2xl p-3.5 shadow-sm">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-1">Last Picked Up</p>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-muted-foreground" />
              <span className="font-semibold text-sm text-foreground">
                {rx.lastPickedUp ? formatDate(rx.lastPickedUp) : 'Never'}
              </span>
            </div>
          </div>
        </div>

        {/* Scheduled Pickup */}
        {rx.pickupInfo && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-5 h-5 text-teal-dark" />
              <h4 className="font-bold text-foreground">Scheduled Pickup</h4>
            </div>
            <div className="bg-card rounded-2xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-xs text-muted-foreground">Estimated Ready Time</p>
                  <p className="font-bold text-lg text-foreground">
                    {formatDateTime(rx.pickupInfo.estimatedReadyTime)}
                  </p>
                </div>
                <button
                  onClick={() => toast({ title: "Calendar", description: "Opening date picker..." })}
                  className="w-10 h-10 rounded-xl bg-teal-light flex items-center justify-center active:scale-90 transition-transform"
                >
                  <Calendar className="w-5 h-5 text-teal-dark" />
                </button>
              </div>
              <button
                onClick={() => toast({ title: "Request Sent", description: "We'll try to prepare your order earlier." })}
                className="w-full bg-teal-light text-teal-dark font-semibold text-sm py-3 rounded-xl flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
              >
                <RotateCcw className="w-4 h-4" />
                Request Earlier Pickup
              </button>
            </div>
          </div>
        )}

        {/* Financial Breakdown */}
        {rx.financials && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-5 h-5 bg-teal-light rounded flex items-center justify-center">
                <span className="text-teal-dark text-[10px] font-bold">$</span>
              </div>
              <h4 className="font-bold text-foreground">Financial Breakdown</h4>
            </div>
            <div className="bg-card rounded-2xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-muted-foreground">Total Medication Cost</span>
                <span className="font-semibold text-foreground">${rx.financials.totalCost.toFixed(2)}</span>
              </div>

              {/* Insurance Coverage Items - Support multiple insurance plans */}
              {rx.financials.coverageReason?.includes('Blue Cross') && rx.financials.coverageReason?.includes('Sunlife') ? (
                <>
                  <div className="bg-success-light rounded-xl p-3 flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-success" />
                      <span className="text-sm font-medium text-foreground">Blue Cross (75%)</span>
                    </div>
                    <span className="font-bold text-success">-${(rx.financials.totalCost * 0.75).toFixed(2)}</span>
                  </div>
                  <div className="bg-success-light rounded-xl p-3 flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-success" />
                      <span className="text-sm font-medium text-foreground">Sunlife (25%)</span>
                    </div>
                    <span className="font-bold text-success">-${(rx.financials.totalCost * 0.25).toFixed(2)}</span>
                  </div>
                </>
              ) : rx.financials.coverageItems && rx.financials.coverageItems.length > 0 ? (
                <>
                  {rx.financials.coverageItems.map((item, index) => (
                    <div key={index} className="bg-success-light rounded-xl p-3 flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-success" />
                        <span className="text-sm font-medium text-foreground">{item.provider} ({item.percentage}%)</span>
                      </div>
                      <span className="font-bold text-success">-${item.amount.toFixed(2)}</span>
                    </div>
                  ))}
                </>
              ) : rx.financials.insuranceCoverage > 0 ? (
                <div className="bg-success-light rounded-xl p-3 flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-success" />
                    <span className="text-sm font-medium text-foreground">Insurance Coverage</span>
                  </div>
                  <span className="font-bold text-success">-${rx.financials.insuranceCoverage.toFixed(2)}</span>
                </div>
              ) : null}

              {/* Coverage Reason */}
              {rx.financials.coverageReason && (
                <div className="flex items-center gap-1.5 mb-3 px-1">
                  <Info className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground italic">Reason: {rx.financials.coverageReason}</span>
                </div>
              )}

              <div className="border-t border-dashed border-border my-3" />
              <div className="flex items-end justify-between">
                <div>
                  <p className="font-semibold text-foreground text-sm">Your Co-pay</p>
                  <p className="text-xs text-muted-foreground">Due at pickup</p>
                </div>
                <span className={`text-3xl font-bold ${rx.financials.copay === 0 ? 'text-success' : 'text-foreground'}`}>
                  ${rx.financials.copay.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Drug Information */}
        <div className="bg-muted rounded-2xl p-4">
          <button
            onClick={() => setShowDrugInfo(!showDrugInfo)}
            className="w-full flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <Info className="w-5 h-5 text-muted-foreground" />
              <span className="font-semibold text-foreground text-sm">Drug Information</span>
            </div>
            <ChevronRight className={`w-5 h-5 text-muted-foreground transition-transform ${showDrugInfo ? 'rotate-90' : ''}`} />
          </button>
          {showDrugInfo && (
            <div className="mt-3 pt-3 border-t border-border">
              <p className="text-sm text-muted-foreground">{rx.notes}</p>
            </div>
          )}
        </div>

        {/* Status Indicator */}
        <div className="flex items-center justify-center gap-2">
          <span className={`w-2 h-2 rounded-full ${approved ? 'bg-teal-dark' : rx.status === 'needs-approval' ? 'bg-success animate-pulse' : 'bg-teal-dark'}`} />
          <span className="text-sm text-muted-foreground">
            {approved ? 'Approved' : rx.status === 'needs-approval' ? 'Ready for review' : 'Ready for pickup'}
          </span>
        </div>

        {/* Bottom Actions */}
        <div className="pt-2 pb-4 space-y-3">
          {/* Approve Fill Button */}
          <button
            onClick={handleApprove}
            disabled={approved}
            className={`w-full font-bold py-4 rounded-2xl flex items-center justify-center gap-2 text-lg shadow-md active:scale-[0.97] transition-all duration-200 ${
              approved
                ? 'bg-success text-primary-foreground'
                : 'bg-teal-dark text-primary-foreground'
            }`}
          >
            {approved ? (
              <>
                <Check className="w-5 h-5" />
                Approved
              </>
            ) : (
              <>
                Approve Fill
                <Check className="w-5 h-5" />
              </>
            )}
          </button>

          {/* Call Pharmacy Button */}
          <button
            onClick={handleCallPharmacy}
            className="w-full bg-card border border-border text-foreground font-semibold text-base py-4 rounded-2xl flex items-center justify-center gap-2 active:scale-[0.97] transition-all duration-200 shadow-sm"
          >
            <Phone className="w-5 h-5" />
            Call Pharmacy
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionDetails;
