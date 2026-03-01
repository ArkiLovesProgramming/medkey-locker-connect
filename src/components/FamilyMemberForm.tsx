import { useState, useEffect } from 'react';
import { FamilyMember, Allergy } from '@/types';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from '@/components/ui/sheet';
import { toast } from '@/hooks/use-toast';
import { insurancePlans, commonAllergies, commonMedicalConditions } from '@/data/mockFamilyMembers';

interface FamilyMemberFormProps {
  member?: FamilyMember;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: Omit<FamilyMember, 'id' | 'createdAt' | 'role'>) => Promise<void>;
}

const FamilyMemberForm = ({ member, open, onOpenChange, onSubmit }: FamilyMemberFormProps) => {
  const isEditing = !!member;
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    // Basic Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    relationship: 'child' as FamilyMember['relationship'],
    avatar: '',
    
    // Insurance
    insuranceProvider: '',
    insurancePlanName: '',
    insuranceMemberId: '',
    insuranceGroupNumber: '',
    insuranceCoverageType: 'primary' as 'primary' | 'secondary',
    
    // Health Info
    allergies: [] as Allergy[],
    customAllergyName: '',
    customAllergySeverity: 'mild' as Allergy['severity'],
    customAllergyReaction: '',
    medicalConditions: [] as string[],
    customMedicalCondition: '',
  });

  // Load data when editing
  useEffect(() => {
    if (member && open) {
      setFormData({
        firstName: member.firstName || '',
        lastName: member.lastName || '',
        email: member.email || '',
        phone: member.phone || '',
        dateOfBirth: member.dateOfBirth || '',
        relationship: member.relationship || 'child',
        avatar: member.avatar || '',
        
        insuranceProvider: member.insuranceInfo?.provider || '',
        insurancePlanName: member.insuranceInfo?.planName || '',
        insuranceMemberId: member.insuranceInfo?.memberId || '',
        insuranceGroupNumber: member.insuranceInfo?.groupNumber || '',
        insuranceCoverageType: member.insuranceInfo?.coverageType || 'primary',
        
        allergies: member.allergies || [],
        customAllergyName: '',
        customAllergySeverity: 'mild',
        customAllergyReaction: '',
        medicalConditions: member.medicalConditions || [],
        customMedicalCondition: '',
      });
    } else if (!member && open) {
      // Reset form for adding new member
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        relationship: 'child',
        avatar: '',
        insuranceProvider: '',
        insurancePlanName: '',
        insuranceMemberId: '',
        insuranceGroupNumber: '',
        insuranceCoverageType: 'primary',
        allergies: [],
        customAllergyName: '',
        customAllergySeverity: 'mild',
        customAllergyReaction: '',
        medicalConditions: [],
        customMedicalCondition: '',
      });
    }
  }, [member, open]);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addAllergy = () => {
    if (!formData.customAllergyName.trim()) {
      toast({
        title: 'Allergy Name Required',
        description: 'Please enter the name of the allergy.',
        variant: 'destructive',
      });
      return;
    }

    const newAllergy: Allergy = {
      name: formData.customAllergyName.trim(),
      severity: formData.customAllergySeverity,
      reaction: formData.customAllergyReaction.trim() || undefined,
    };

    setFormData(prev => ({
      ...prev,
      allergies: [...prev.allergies, newAllergy],
      customAllergyName: '',
      customAllergySeverity: 'mild',
      customAllergyReaction: '',
    }));

    toast({
      title: 'Allergy Added',
      description: `${newAllergy.name} has been added to the allergies list.`,
    });
  };

  const removeAllergy = (index: number) => {
    setFormData(prev => ({
      ...prev,
      allergies: prev.allergies.filter((_, i) => i !== index),
    }));
  };

  const addMedicalCondition = () => {
    if (!formData.customMedicalCondition.trim()) {
      toast({
        title: 'Condition Required',
        description: 'Please enter a medical condition.',
        variant: 'destructive',
      });
      return;
    }

    setFormData(prev => ({
      ...prev,
      medicalConditions: [...prev.medicalConditions, formData.customMedicalCondition.trim()],
      customMedicalCondition: '',
    }));

    toast({
      title: 'Condition Added',
      description: 'Medical condition has been added.',
    });
  };

  const removeMedicalCondition = (index: number) => {
    setFormData(prev => ({
      ...prev,
      medicalConditions: prev.medicalConditions.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.firstName.trim() || !formData.lastName.trim()) {
      toast({
        title: 'Name Required',
        description: 'Please enter both first and last name.',
        variant: 'destructive',
      });
      return;
    }

    if (!formData.dateOfBirth) {
      toast({
        title: 'Date of Birth Required',
        description: 'Please enter the date of birth.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Build insurance info
      const insuranceInfo = formData.insuranceProvider ? {
        provider: formData.insuranceProvider,
        planName: formData.insurancePlanName,
        memberId: formData.insuranceMemberId,
        groupNumber: formData.insuranceGroupNumber || undefined,
        coverageType: formData.insuranceCoverageType,
      } : undefined;

      // Submit data
      await onSubmit({
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        dateOfBirth: formData.dateOfBirth,
        relationship: formData.relationship,
        avatar: formData.avatar || undefined,
        insuranceInfo,
        allergies: formData.allergies,
        medicalConditions: formData.medicalConditions,
        preferences: member?.preferences || {},
      });

      toast({
        title: isEditing ? 'Member Updated' : 'Member Added',
        description: isEditing 
          ? 'Family member has been updated successfully.' 
          : 'New family member has been added successfully.',
      });

      onOpenChange(false);
    } catch (error) {
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Failed to save family member.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const presetAllergies = Object.entries(commonAllergies)
    .filter(([key]) => key !== 'none')
    .map(([key, allergies]) => ({
      key,
      label: allergies[0]?.name || key,
      allergies,
    }));

  const presetConditions = Object.entries(commonMedicalConditions)
    .filter(([key]) => key !== 'none')
    .map(([key, conditions]) => ({
      key,
      label: conditions[0] || key,
      conditions,
    }));

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="max-h-[90vh] overflow-y-auto pb-8">
        <SheetHeader className="mb-6">
          <SheetTitle>{isEditing ? 'Edit Family Member' : 'Add Family Member'}</SheetTitle>
          <SheetDescription>
            {isEditing 
              ? 'Update the family member information below.' 
              : 'Fill in the information to add a new family member.'}
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Basic Information</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  placeholder="John"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  placeholder="Doe"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="john@example.com"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="relationship">Relationship *</Label>
                <Select
                  value={formData.relationship}
                  onValueChange={(value: FamilyMember['relationship']) => 
                    handleInputChange('relationship', value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select relationship" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="spouse">Spouse</SelectItem>
                    <SelectItem value="child">Child</SelectItem>
                    <SelectItem value="parent">Parent</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="avatar">Avatar URL (optional)</Label>
              <Input
                id="avatar"
                value={formData.avatar}
                onChange={(e) => handleInputChange('avatar', e.target.value)}
                placeholder="https://example.com/avatar.jpg"
              />
            </div>
          </div>

          {/* Insurance Information */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Insurance Information</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="insuranceProvider">Insurance Provider</Label>
                <Select
                  value={formData.insuranceProvider}
                  onValueChange={(value) => {
                    const plan = insurancePlans[value];
                    if (plan) {
                      setFormData(prev => ({
                        ...prev,
                        insuranceProvider: plan.provider,
                        insurancePlanName: plan.planName,
                        insuranceMemberId: plan.memberId,
                        insuranceGroupNumber: plan.groupNumber || '',
                        insuranceCoverageType: plan.coverageType,
                      }));
                    } else {
                      handleInputChange('insuranceProvider', value);
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blueCrossPPO">Blue Cross Blue Shield</SelectItem>
                    <SelectItem value="aetnaHMO">Aetna HMO</SelectItem>
                    <SelectItem value="unitedHealthcare">UnitedHealthcare</SelectItem>
                    <SelectItem value="custom">Custom / Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="insuranceCoverageType">Coverage Type</Label>
                <Select
                  value={formData.insuranceCoverageType}
                  onValueChange={(value: 'primary' | 'secondary') => 
                    handleInputChange('insuranceCoverageType', value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="primary">Primary</SelectItem>
                    <SelectItem value="secondary">Secondary</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="insurancePlanName">Plan Name</Label>
                <Input
                  id="insurancePlanName"
                  value={formData.insurancePlanName}
                  onChange={(e) => handleInputChange('insurancePlanName', e.target.value)}
                  placeholder="PPO Premium"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="insuranceMemberId">Member ID</Label>
                <Input
                  id="insuranceMemberId"
                  value={formData.insuranceMemberId}
                  onChange={(e) => handleInputChange('insuranceMemberId', e.target.value)}
                  placeholder="ABC123456789"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="insuranceGroupNumber">Group Number</Label>
              <Input
                id="insuranceGroupNumber"
                value={formData.insuranceGroupNumber}
                onChange={(e) => handleInputChange('insuranceGroupNumber', e.target.value)}
                placeholder="GRP-123456"
              />
            </div>
          </div>

          {/* Allergies */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Allergies</h3>
            
            {/* Preset Allergies */}
            <div className="flex flex-wrap gap-2">
              {presetAllergies.map(({ key, label, allergies }) => (
                <Button
                  key={key}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (!formData.allergies.find(a => a.name === allergies[0]?.name)) {
                      setFormData(prev => ({
                        ...prev,
                        allergies: [...prev.allergies, ...allergies],
                      }));
                    }
                  }}
                  disabled={!!formData.allergies.find(a => a.name === allergies[0]?.name)}
                >
                  {label}
                </Button>
              ))}
            </div>

            {/* Current Allergies */}
            {formData.allergies.length > 0 && (
              <div className="space-y-2">
                <Label>Current Allergies</Label>
                <div className="flex flex-wrap gap-2">
                  {formData.allergies.map((allergy, idx) => (
                    <div
                      key={idx}
                      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs ${
                        allergy.severity === 'severe' 
                          ? 'bg-red-100 text-red-800' 
                          : allergy.severity === 'moderate'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <span>{allergy.name}</span>
                      <button
                        type="button"
                        onClick={() => removeAllergy(idx)}
                        className="hover:opacity-70"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Custom Allergy */}
            <div className="grid grid-cols-3 gap-2">
              <Input
                placeholder="Custom allergy name"
                value={formData.customAllergyName}
                onChange={(e) => handleInputChange('customAllergyName', e.target.value)}
              />
              <Select
                value={formData.customAllergySeverity}
                onValueChange={(value: Allergy['severity']) => 
                  handleInputChange('customAllergySeverity', value)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mild">Mild</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="severe">Severe</SelectItem>
                </SelectContent>
              </Select>
              <Button type="button" onClick={addAllergy} variant="outline">
                Add
              </Button>
            </div>
            <Input
              placeholder="Reaction description (optional)"
              value={formData.customAllergyReaction}
              onChange={(e) => handleInputChange('customAllergyReaction', e.target.value)}
            />
          </div>

          {/* Medical Conditions */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Medical Conditions</h3>
            
            {/* Preset Conditions */}
            <div className="flex flex-wrap gap-2">
              {presetConditions.map(({ key, label, conditions }) => (
                <Button
                  key={key}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (!formData.medicalConditions.includes(conditions[0])) {
                      setFormData(prev => ({
                        ...prev,
                        medicalConditions: [...prev.medicalConditions, ...conditions],
                      }));
                    }
                  }}
                  disabled={!!formData.medicalConditions.includes(conditions[0])}
                >
                  {label}
                </Button>
              ))}
            </div>

            {/* Current Conditions */}
            {formData.medicalConditions.length > 0 && (
              <div className="space-y-2">
                <Label>Current Conditions</Label>
                <div className="flex flex-wrap gap-2">
                  {formData.medicalConditions.map((condition, idx) => (
                    <div
                      key={idx}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-blue-100 text-blue-800"
                    >
                      <span>{condition}</span>
                      <button
                        type="button"
                        onClick={() => removeMedicalCondition(idx)}
                        className="hover:opacity-70"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Custom Condition */}
            <div className="flex gap-2">
              <Input
                placeholder="Add custom medical condition"
                value={formData.customMedicalCondition}
                onChange={(e) => handleInputChange('customMedicalCondition', e.target.value)}
                className="flex-1"
              />
              <Button type="button" onClick={addMedicalCondition} variant="outline">
                Add
              </Button>
            </div>
          </div>

          <SheetFooter className="pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : isEditing ? 'Update Member' : 'Add Member'}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default FamilyMemberForm;
