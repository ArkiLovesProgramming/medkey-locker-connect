import { useParams, useNavigate, useLocation } from "react-router-dom";
import { 
  ArrowLeft, Copy, Phone, Globe, Download, Share2, 
  Check, CreditCard, Users, Calendar, DollarSign,
  Pill, FileText, Info
} from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { getInsuranceCardById } from "@/data/mockInsuranceCards";
import { familyMembers } from "@/data/mockUsers";
import { cn } from "@/lib/utils";

const InsuranceCardDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const card = id ? getInsuranceCardById(id) : undefined;
  
  // Handle back button click - always return to profile (screen 6)
  const handleBack = () => {
    navigate('/?screen=6');
  };

  // Copy to clipboard helper
  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied!",
        description: `${label} copied to clipboard`,
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'inactive':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Get provider brand colors
  const getProviderBrand = (provider: string) => {
    if (provider.includes('Blue Cross')) {
      return {
        gradient: 'from-blue-600 to-blue-800',
        bg: 'bg-blue-50',
        text: 'text-blue-700',
        border: 'border-blue-200',
      };
    }
    if (provider.includes('Aetna')) {
      return {
        gradient: 'from-teal-600 to-teal-800',
        bg: 'bg-teal-50',
        text: 'text-teal-700',
        border: 'border-teal-200',
      };
    }
    if (provider.includes('United')) {
      return {
        gradient: 'from-indigo-600 to-indigo-800',
        bg: 'bg-indigo-50',
        text: 'text-indigo-700',
        border: 'border-indigo-200',
      };
    }
    // Default brand colors
    return {
      gradient: 'from-brand-teal-light to-brand-teal-dark',
      bg: 'bg-brand-teal-light/10',
      text: 'text-brand-teal-dark',
      border: 'border-brand-teal-light/20',
    };
  };

  if (!card) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Insurance Card Not Found
          </h1>
          <p className="text-muted-foreground mb-4">
            The insurance card you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-brand-teal-dark text-white rounded-lg hover:opacity-90 transition-opacity"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const brand = getProviderBrand(card.provider);
  const memberFamilyMembers = familyMembers.filter(
    m => m.insuranceInfo?.provider === card.provider
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-white border-b border-border sticky top-0 z-10">
        <div className="px-4 py-4 flex items-center gap-3">
          <button
            onClick={handleBack}
            className="p-2 -ml-2 rounded-full hover:bg-gray-100 transition-colors touch-target-md touch-feedback"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="text-lg font-bold text-foreground flex-1">
            Insurance Card Details
          </h1>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Insurance Card Visual */}
        <div className={cn(
          "rounded-2xl p-5 text-white shadow-medkey-lg",
          "bg-gradient-to-r",
          brand.gradient
        )}>
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-xs opacity-80 mb-1">Member</p>
              <p className="text-lg font-bold">{card.memberName}</p>
            </div>
            <div className="text-right">
              <p className="text-xs opacity-80 mb-1">Member ID</p>
              <p className="font-mono font-bold">{card.memberIdNumber}</p>
            </div>
          </div>
          
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-xs opacity-80 mb-1">Group Number</p>
              <p className="font-mono">{card.groupNumber}</p>
            </div>
            {card.cardholderGroupId && (
              <div>
                <p className="text-xs opacity-80 mb-1">Cardholder Group</p>
                <p className="font-mono">{card.cardholderGroupId}</p>
              </div>
            )}
          </div>

          <div className="flex justify-between items-end">
            <div>
              <p className="text-xs opacity-80 mb-1">Effective Date</p>
              <p className="font-mono text-sm">{formatDate(card.effectiveDate)}</p>
            </div>
            <div className="text-right">
              <p className="text-xs opacity-80 mb-1">Exp Date</p>
              <p className="font-mono text-sm">{formatDate(card.expirationDate)}</p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-white/20">
            <p className="text-xs opacity-80 mb-1">Coverage Type</p>
            <p className="font-bold capitalize">{card.coverageType} Coverage</p>
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex items-center justify-between bg-white rounded-xl p-3 border border-border">
          <div className="flex items-center gap-2">
            <Info className={cn("w-5 h-5", brand.text)} />
            <span className="text-sm font-medium text-foreground">Status</span>
          </div>
          <span className={cn(
            "px-3 py-1 rounded-full text-xs font-bold border",
            getStatusColor(card.status)
          )}>
            {card.status.charAt(0).toUpperCase() + card.status.slice(1)}
          </span>
        </div>

        {/* Coverage Information */}
        <div className="bg-white rounded-xl border border-border overflow-hidden">
          <div className="p-3 border-b border-border bg-gray-50">
            <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
              <CreditCard className={cn("w-4 h-4", brand.text)} />
              Coverage Information
            </h2>
          </div>
          <div className="divide-y divide-border">
            <div className="p-3 flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Provider</span>
              <span className="text-sm font-medium text-foreground">{card.provider}</span>
            </div>
            <div className="p-3 flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Plan Name</span>
              <span className="text-sm font-medium text-foreground">{card.planName}</span>
            </div>
            <div className="p-3 flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Relationship</span>
              <span className="text-sm font-medium text-foreground capitalize">{card.relationship}</span>
            </div>
            <div className="p-3 flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Coverage Type</span>
              <span className="text-sm font-medium text-foreground capitalize">{card.coverageType}</span>
            </div>
          </div>
        </div>

        {/* Cost Sharing */}
        <div className="bg-white rounded-xl border border-border overflow-hidden">
          <div className="p-3 border-b border-border bg-gray-50">
            <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
              <DollarSign className={cn("w-4 h-4", brand.text)} />
              Cost Sharing
            </h2>
          </div>
          <div className="divide-y divide-border">
            <div className="p-3 flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Copay (Primary Care)</span>
              <span className="text-sm font-bold text-foreground">{formatCurrency(card.copayPrimary)}</span>
            </div>
            <div className="p-3 flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Copay (Specialist)</span>
              <span className="text-sm font-bold text-foreground">{formatCurrency(card.copaySpecialist)}</span>
            </div>
            <div className="p-3 flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Deductible</span>
              <span className="text-sm font-bold text-foreground">{formatCurrency(card.deductible)}</span>
            </div>
            <div className="p-3 flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Out-of-Pocket Max</span>
              <span className="text-sm font-bold text-foreground">{formatCurrency(card.outOfPocketMax)}</span>
            </div>
          </div>
        </div>

        {/* Pharmacy Benefits */}
        {(card.rxGroup || card.rxPCN || card.bin) && (
          <div className="bg-white rounded-xl border border-border overflow-hidden">
            <div className="p-3 border-b border-border bg-gray-50">
              <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
                <Pill className={cn("w-4 h-4", brand.text)} />
                Pharmacy Benefits
              </h2>
            </div>
            <div className="divide-y divide-border">
              {card.rxGroup && (
                <div className="p-3 flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Rx Group</span>
                  <button
                    onClick={() => copyToClipboard(card.rxGroup!, 'Rx Group')}
                    className="flex items-center gap-2"
                  >
                    <span className="text-sm font-medium text-foreground font-mono">{card.rxGroup}</span>
                    <Copy className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              )}
              {card.rxPCN && (
                <div className="p-3 flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Rx PCN</span>
                  <button
                    onClick={() => copyToClipboard(card.rxPCN!, 'Rx PCN')}
                    className="flex items-center gap-2"
                  >
                    <span className="text-sm font-medium text-foreground font-mono">{card.rxPCN}</span>
                    <Copy className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              )}
              {card.bin && (
                <div className="p-3 flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">BIN</span>
                  <button
                    onClick={() => copyToClipboard(card.bin!, 'BIN')}
                    className="flex items-center gap-2"
                  >
                    <span className="text-sm font-medium text-foreground font-mono">{card.bin}</span>
                    <Copy className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Family Members with Same Insurance */}
        {memberFamilyMembers.length > 0 && (
          <div className="bg-white rounded-xl border border-border overflow-hidden">
            <div className="p-3 border-b border-border bg-gray-50">
              <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
                <Users className={cn("w-4 h-4", brand.text)} />
                Family Members Covered
              </h2>
            </div>
            <div className="divide-y divide-border">
              {memberFamilyMembers.map(member => (
                <div key={member.id} className="p-3 flex items-center gap-3">
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center",
                    brand.bg
                  )}>
                    <span className={cn("text-sm font-bold", brand.text)}>
                      {member.firstName.charAt(0)}{member.lastName.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{member.firstName} {member.lastName}</p>
                    <p className="text-xs text-muted-foreground capitalize">{member.relationship}</p>
                  </div>
                  {member.id === card.memberId && (
                    <span className="px-2 py-1 bg-brand-teal-light/10 text-brand-teal-dark text-xs font-bold rounded-full">
                      Cardholder
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contact Information */}
        <div className="bg-white rounded-xl border border-border overflow-hidden">
          <div className="p-3 border-b border-border bg-gray-50">
            <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
              <FileText className={cn("w-4 h-4", brand.text)} />
              Contact Information
            </h2>
          </div>
          <div className="divide-y divide-border">
            {card.customerServicePhone && (
              <div className="p-3">
                <p className="text-xs text-muted-foreground mb-1">Customer Service</p>
                <a
                  href={`tel:${card.customerServicePhone}`}
                  className={cn(
                    "flex items-center gap-2 text-sm font-medium",
                    brand.text,
                    "hover:underline"
                  )}
                >
                  <Phone className="w-4 h-4" />
                  {card.customerServicePhone}
                </a>
              </div>
            )}
            {card.website && (
              <div className="p-3">
                <p className="text-xs text-muted-foreground mb-1">Website</p>
                <a
                  href={card.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "flex items-center gap-2 text-sm font-medium",
                    brand.text,
                    "hover:underline"
                  )}
                >
                  <Globe className="w-4 h-4" />
                  Visit Provider Website
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => toast({
              title: "Download Card",
              description: "Downloading insurance card as PDF...",
            })}
            className={cn(
              "flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold",
              "bg-brand-teal-dark text-white",
              "hover:opacity-90 transition-opacity",
              "touch-target-md touch-feedback"
            )}
          >
            <Download className="w-5 h-5" />
            Download
          </button>
          <button
            onClick={() => toast({
              title: "Share Card",
              description: "Opening share options...",
            })}
            className={cn(
              "flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold",
              "bg-white border-2 border-brand-teal-dark text-brand-teal-dark",
              "hover:bg-brand-teal-light/10 transition-colors",
              "touch-target-md touch-feedback"
            )}
          >
            <Share2 className="w-5 h-5" />
            Share
          </button>
        </div>

        {/* Copy All Info Button */}
        <button
          onClick={() => {
            const info = `
Insurance Card Information
Provider: ${card.provider}
Plan: ${card.planName}
Member: ${card.memberName}
Member ID: ${card.memberIdNumber}
Group Number: ${card.groupNumber}
${card.cardholderGroupId ? `Cardholder Group: ${card.cardholderGroupId}\n` : ''}
Relationship: ${card.relationship}
Coverage: ${card.coverageType}
Status: ${card.status}
Effective: ${card.effectiveDate}
Expires: ${card.expirationDate}
Copay (Primary): ${formatCurrency(card.copayPrimary)}
Copay (Specialist): ${formatCurrency(card.copaySpecialist)}
Deductible: ${formatCurrency(card.deductible)}
Out-of-Pocket Max: ${formatCurrency(card.outOfPocketMax)}
${card.rxGroup ? `Rx Group: ${card.rxGroup}\n` : ''}
${card.rxPCN ? `Rx PCN: ${card.rxPCN}\n` : ''}
${card.bin ? `BIN: ${card.bin}\n` : ''}
Customer Service: ${card.customerServicePhone}
Website: ${card.website}
            `.trim();
            copyToClipboard(info, 'All insurance information');
          }}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold
            bg-white border-2 border-border text-foreground
            hover:bg-gray-50 transition-colors
            touch-target-md touch-feedback"
        >
          <Copy className="w-5 h-5" />
          Copy All Information
        </button>
      </div>
    </div>
  );
};

export default InsuranceCardDetail;
