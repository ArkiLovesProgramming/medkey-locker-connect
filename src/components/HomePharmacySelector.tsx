import { useState, useEffect } from "react";
import { X, Search, MapPin, Phone, Clock, Check } from "lucide-react";
import { pharmacies } from "@/data/mockPrescriptions";
import { Pharmacy } from "@/types";
import { toast } from "@/hooks/use-toast";

interface HomePharmacySelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (pharmacyId: string) => void;
  currentPharmacyId?: string;
}

const HomePharmacySelector = ({
  isOpen,
  onClose,
  onSave,
  currentPharmacyId,
}: HomePharmacySelectorProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPharmacyId, setSelectedPharmacyId] = useState<string | undefined>(undefined);

  // Update selected pharmacy when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedPharmacyId(currentPharmacyId || undefined);
      setSearchQuery("");
    }
  }, [isOpen, currentPharmacyId]);

  const pharmacyList = Object.values(pharmacies);

  const filteredPharmacies = pharmacyList.filter((pharmacy) =>
    pharmacy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pharmacy.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePharmacyClick = (pharmacyId: string) => {
    setSelectedPharmacyId(pharmacyId);
  };

  const handleSave = () => {
    if (selectedPharmacyId) {
      onSave(selectedPharmacyId);
      const pharmacy = pharmacies[selectedPharmacyId];
      toast({
        title: "✓ Home pharmacy updated",
        description: `Your home pharmacy is now ${pharmacy.name}`,
      });
      onClose();
    } else {
      toast({
        title: "No pharmacy selected",
        description: "Please select a pharmacy to continue",
        variant: "destructive",
      });
    }
  };

  const handleReset = () => {
    setSelectedPharmacyId(undefined);
    setSearchQuery("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm sm:items-center">
      <div className="w-full max-w-lg bg-card rounded-t-3xl sm:rounded-3xl shadow-2xl max-h-[90vh] flex flex-col animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h2 className="text-lg font-bold text-foreground">Select Home Pharmacy</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/80 transition-colors"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        {/* Search */}
        <div className="p-5 border-b border-border">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search pharmacies by name or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-muted border border-border rounded-xl text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-teal focus:border-transparent"
            />
          </div>
        </div>

        {/* Pharmacy List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3">
          {filteredPharmacies.length === 0 ? (
            <div className="text-center py-12">
              <Search className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
              <p className="text-sm font-medium text-foreground">No pharmacies found</p>
              <p className="text-xs text-muted-foreground mt-1">Try adjusting your search</p>
            </div>
          ) : (
            filteredPharmacies.map((pharmacy) => (
              <button
                key={pharmacy.id}
                type="button"
                onClick={() => handlePharmacyClick(pharmacy.id)}
                className={`w-full p-4 rounded-2xl border-2 text-left transition-all active:scale-[0.98] cursor-pointer ${
                  selectedPharmacyId === pharmacy.id
                    ? "border-teal bg-teal/5 shadow-md shadow-teal/20"
                    : "border-border bg-card hover:border-teal/50 hover:shadow-sm"
                }`}
              >
                <div className="flex items-start gap-4 pointer-events-none">
                  {/* Radio Button - Larger and More Visible */}
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                      selectedPharmacyId === pharmacy.id
                        ? "border-teal bg-teal scale-110"
                        : "border-border"
                    }`}
                  >
                    {selectedPharmacyId === pharmacy.id && (
                      <Check className="w-4 h-4 text-white" />
                    )}
                  </div>
                  {/* Pharmacy Info */}
                  <div className="flex-1">
                    <p className="text-sm font-bold text-foreground mb-2">{pharmacy.name}</p>
                    <div className="space-y-1.5">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-muted-foreground leading-relaxed">{pharmacy.address}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
                        <p className="text-xs text-muted-foreground">{pharmacy.phone}</p>
                      </div>
                      {pharmacy.hours && (
                        <div className="flex items-start gap-2">
                          <Clock className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0 mt-0.5" />
                          <p className="text-xs text-muted-foreground">{pharmacy.hours}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            ))
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-border flex gap-3">
          <button
            onClick={handleReset}
            className="flex-1 px-4 py-3 rounded-xl border border-border text-sm font-medium text-foreground hover:bg-muted transition-colors"
          >
            Reset
          </button>
          <button
            onClick={handleSave}
            disabled={!selectedPharmacyId}
            className="flex-1 px-4 py-3 rounded-xl bg-teal text-sm font-medium text-white hover:bg-teal/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save Pharmacy
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePharmacySelector;
