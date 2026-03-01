import { FamilyMember, UserPreferences } from '@/types';
import { 
  familyMembers,
  getMemberById,
  getMemberByName,
  insurancePlans,
  commonAllergies,
  commonMedicalConditions,
} from './mockFamilyMembers';

// Re-export for backward compatibility
export { 
  familyMembers,
  getMemberById,
  getMemberByName,
  insurancePlans,
  commonAllergies,
  commonMedicalConditions,
  addFamilyMember,
  updateFamilyMember,
  removeFamilyMember,
  searchFamilyMembers,
  getMembersByRelationship,
  getPrimaryMember,
} from './mockFamilyMembers';

export const jenkinsInsurance = insurancePlans.blueCrossPPO;
export const familyAllergies = commonAllergies;

// Export individual members for easy import
export const sarahJenkins = familyMembers[0];
export const davidJenkins = familyMembers[1];
export const lilyJenkins = familyMembers[2];

// Get all family members (including 'All' option)
export function getAllFamilyMembers() {
  return [
    { id: 'all', firstName: 'All', lastName: '', role: 'primary' as const, relationship: 'self' as const, email: '', createdAt: '' },
    ...familyMembers,
  ];
}

// User preferences helper functions
export function getUserPreferences(userId: string): UserPreferences | undefined {
  const member = getMemberById(userId);
  return member?.preferences;
}

export function setUserHomePharmacy(userId: string, pharmacyId: string | undefined): void {
  const member = getMemberById(userId);
  if (member) {
    if (!member.preferences) {
      member.preferences = {};
    }
    member.preferences.homePharmacyId = pharmacyId;
  }
}

export function getHomePharmacyId(userId: string): string | undefined {
  const preferences = getUserPreferences(userId);
  return preferences?.homePharmacyId;
}
