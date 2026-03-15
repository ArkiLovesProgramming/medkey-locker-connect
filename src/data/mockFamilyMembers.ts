import { FamilyMember, InsuranceInfo, Allergy } from '@/types';

// ============================================================================
// Insurance Plans Database
// ============================================================================

export const insurancePlans: Record<string, InsuranceInfo> = {
  blueCrossPPO: {
    provider: 'Blue Cross Blue Shield',
    planName: 'PPO Premium Plus',
    memberId: 'BCB987654321',
    groupNumber: 'GRP-445821',
    coverageType: 'primary',
    clientName: 'Jenkins Family',
    relationship: 'self',
    cardholderGroupId: 'CHG-789456',
    effectiveDate: '2024-01-01',
    expirationDate: '2025-12-31',
    copayPrimary: 25,
    copaySpecialist: 50,
    deductible: 1500,
    outOfPocketMax: 5000,
    rxGroup: 'RXG123456',
    rxPCN: 'PCN789012',
    bin: 'BIN001234567',
    customerServicePhone: '1-800-555-0199',
    website: 'www.bcbs.com',
  },
  aetnaHMO: {
    provider: 'Aetna',
    planName: 'HMO Essential Care',
    memberId: 'AET456789012',
    groupNumber: 'GRP-556677',
    coverageType: 'secondary',
    clientName: 'Jenkins Family',
    relationship: 'spouse',
    cardholderGroupId: 'CHG-654321',
    effectiveDate: '2024-01-01',
    expirationDate: '2025-12-31',
    copayPrimary: 30,
    copaySpecialist: 60,
    deductible: 2000,
    outOfPocketMax: 6000,
    rxGroup: 'RXG654321',
    rxPCN: 'PCN456789',
    bin: 'BIN007654321',
    customerServicePhone: '1-800-555-0288',
    website: 'www.aetna.com',
  },
  unitedHealthcare: {
    provider: 'UnitedHealthcare',
    planName: 'Choice Plus',
    memberId: 'UHC789012345',
    groupNumber: 'GRP-889900',
    coverageType: 'primary',
    clientName: 'Jenkins Family',
    relationship: 'self',
    cardholderGroupId: 'CHG-112233',
    effectiveDate: '2024-01-01',
    expirationDate: '2025-12-31',
    copayPrimary: 20,
    copaySpecialist: 45,
    deductible: 1000,
    outOfPocketMax: 4500,
    rxGroup: 'RXG112233',
    rxPCN: 'PCN445566',
    bin: 'BIN009876543',
    customerServicePhone: '1-800-555-0377',
    website: 'www.uhc.com',
  },
  sunlife: {
    provider: 'Sunlife',
    planName: 'Health Plus',
    memberId: 'SUN123456789',
    groupNumber: 'GRP-778899',
    coverageType: 'secondary',
    clientName: 'Jenkins Family',
    relationship: 'self',
    cardholderGroupId: 'CHG-998877',
    effectiveDate: '2024-01-01',
    expirationDate: '2025-12-31',
    copayPrimary: 15,
    copaySpecialist: 30,
    deductible: 500,
    outOfPocketMax: 2500,
    rxGroup: 'RXG998877',
    rxPCN: 'PCN112233',
    bin: 'BIN001122334',
    customerServicePhone: '1-800-555-0466',
    website: 'www.sunlife.com',
  },
};

// ============================================================================
// Allergies Database
// ============================================================================

export const commonAllergies: Record<string, Allergy[]> = {
  penicillin: [
    {
      name: 'Penicillin',
      severity: 'severe',
      reaction: 'Hives, difficulty breathing, anaphylaxis',
    },
  ],
  peanuts: [
    {
      name: 'Peanuts',
      severity: 'severe',
      reaction: 'Anaphylaxis, throat swelling',
    },
  ],
  latex: [
    {
      name: 'Latex',
      severity: 'moderate',
      reaction: 'Skin rash, itching, redness',
    },
  ],
  shellfish: [
    {
      name: 'Shellfish',
      severity: 'moderate',
      reaction: 'Nausea, hives, stomach cramps',
    },
  ],
  aspirin: [
    {
      name: 'Aspirin',
      severity: 'moderate',
      reaction: 'Stomach upset, hives',
    },
  ],
  sulfa: [
    {
      name: 'Sulfa drugs',
      severity: 'severe',
      reaction: 'Skin rash, fever, allergic reaction',
    },
  ],
  codeine: [
    {
      name: 'Codeine',
      severity: 'moderate',
      reaction: 'Nausea, dizziness, itching',
    },
  ],
  ibuprofen: [
    {
      name: 'Ibuprofen',
      severity: 'mild',
      reaction: 'Stomach upset, heartburn',
    },
  ],
  dustMites: [
    {
      name: 'Dust mites',
      severity: 'mild',
      reaction: 'Sneezing, runny nose, itchy eyes',
    },
  ],
  pollen: [
    {
      name: 'Pollen',
      severity: 'mild',
      reaction: 'Seasonal allergies, sneezing, itchy eyes',
    },
  ],
  none: [],
};

// ============================================================================
// Medical Conditions Database
// ============================================================================

export const commonMedicalConditions: Record<string, string[]> = {
  hypertension: ['Hypertension (High Blood Pressure)'],
  diabetes: ['Type 2 Diabetes'],
  asthma: ['Asthma'],
  highCholesterol: ['High Cholesterol'],
  seasonalAllergies: ['Seasonal Allergies'],
  acidReflux: ['GERD (Acid Reflux)'],
  hypothyroidism: ['Hypothyroidism'],
  arthritis: ['Osteoarthritis'],
  anxiety: ['Anxiety Disorder'],
  depression: ['Depression'],
  migraines: ['Chronic Migraines'],
  none: [],
};

// ============================================================================
// Family Members Database
// ============================================================================

export const familyMembers: FamilyMember[] = [
  // Primary Account Holder
  {
    id: 'user-001',
    email: 'sarah.jenkins@email.com',
    firstName: 'Sarah',
    lastName: 'Jenkins',
    phone: '+1 (555) 234-5678',
    dateOfBirth: '1985-06-15',
    role: 'primary',
    relationship: 'self',
    avatar: undefined, // Use SVG avatar
    insuranceInfo: insurancePlans.blueCrossPPO,
    allergies: [...commonAllergies.penicillin, ...commonAllergies.peanuts],
    medicalConditions: [...commonMedicalConditions.hypertension, ...commonMedicalConditions.seasonalAllergies],
    preferences: {
      homePharmacyId: undefined,
    },
    createdAt: '2022-01-15T08:00:00Z',
  },
  // Spouse
  {
    id: 'user-002',
    email: 'david.jenkins@email.com',
    firstName: 'David',
    lastName: 'Jenkins',
    phone: '+1 (555) 234-5679',
    dateOfBirth: '1983-09-22',
    role: 'member',
    relationship: 'spouse',
    avatar: undefined, // Use SVG avatar
    insuranceInfo: insurancePlans.blueCrossPPO,
    allergies: commonAllergies.latex,
    medicalConditions: [...commonMedicalConditions.highCholesterol, ...commonMedicalConditions.diabetes],
    preferences: {
      homePharmacyId: undefined,
    },
    createdAt: '2022-01-15T08:00:00Z',
  },
  // Child - Daughter
  {
    id: 'user-003',
    email: '',
    firstName: 'Lily',
    lastName: 'Jenkins',
    phone: '',
    dateOfBirth: '2015-03-10',
    role: 'member',
    relationship: 'child',
    avatar: undefined, // Use SVG avatar
    insuranceInfo: insurancePlans.blueCrossPPO,
    allergies: commonAllergies.shellfish,
    medicalConditions: commonMedicalConditions.asthma,
    preferences: {
      homePharmacyId: undefined,
    },
    createdAt: '2022-01-15T08:00:00Z',
  },
  // Child - Son (New)
  {
    id: 'user-004',
    email: '',
    firstName: 'Emma',
    lastName: 'Jenkins',
    phone: '',
    dateOfBirth: '2018-07-25',
    role: 'member',
    relationship: 'child',
    avatar: undefined, // Use SVG avatar
    insuranceInfo: insurancePlans.blueCrossPPO,
    allergies: commonAllergies.none,
    medicalConditions: commonMedicalConditions.none,
    preferences: {
      homePharmacyId: undefined,
    },
    createdAt: '2022-01-15T08:00:00Z',
  },
  // Parent - Mother
  {
    id: 'user-005',
    email: 'margaret.smith@email.com',
    firstName: 'Margaret',
    lastName: 'Smith',
    phone: '+1 (555) 234-5680',
    dateOfBirth: '1960-04-12',
    role: 'member',
    relationship: 'parent',
    avatar: undefined, // Use SVG avatar
    insuranceInfo: insurancePlans.aetnaHMO,
    allergies: [...commonAllergies.aspirin, ...commonAllergies.sulfa],
    medicalConditions: [...commonMedicalConditions.arthritis, ...commonMedicalConditions.hypothyroidism],
    preferences: {
      homePharmacyId: undefined,
    },
    createdAt: '2023-03-20T10:00:00Z',
  },
  // Parent - Father
  {
    id: 'user-006',
    email: 'robert.smith@email.com',
    firstName: 'Robert',
    lastName: 'Smith',
    phone: '+1 (555) 234-5681',
    dateOfBirth: '1958-11-30',
    role: 'member',
    relationship: 'parent',
    avatar: undefined, // Use SVG avatar
    insuranceInfo: insurancePlans.unitedHealthcare,
    allergies: commonAllergies.codeine,
    medicalConditions: [...commonMedicalConditions.hypertension, ...commonMedicalConditions.acidReflux],
    preferences: {
      homePharmacyId: undefined,
    },
    createdAt: '2023-03-20T10:00:00Z',
  },
];

// ============================================================================
// Helper Functions
// ============================================================================

export function getMemberById(id: string): FamilyMember | undefined {
  return familyMembers.find(m => m.id === id);
}

export function getMemberByName(firstName: string, lastName?: string): FamilyMember | undefined {
  return familyMembers.find(m => 
    m.firstName.toLowerCase() === firstName.toLowerCase() && 
    (!lastName || m.lastName.toLowerCase() === lastName.toLowerCase())
  );
}

export function getFamilyMembers(): FamilyMember[] {
  return familyMembers;
}

export function addFamilyMember(memberData: Omit<FamilyMember, 'id' | 'createdAt'>): FamilyMember {
  const newMember: FamilyMember = {
    ...memberData,
    id: `user-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  familyMembers.push(newMember);
  return newMember;
}

export function updateFamilyMember(id: string, updates: Partial<FamilyMember>): FamilyMember | null {
  const member = getMemberById(id);
  if (!member) {
    return null;
  }
  
  const index = familyMembers.findIndex(m => m.id === id);
  familyMembers[index] = { ...member, ...updates };
  return familyMembers[index];
}

export function removeFamilyMember(id: string): boolean {
  const member = getMemberById(id);
  if (!member || member.role === 'primary') {
    return false;
  }
  
  const index = familyMembers.findIndex(m => m.id === id);
  if (index > -1) {
    familyMembers.splice(index, 1);
    return true;
  }
  return false;
}

export function searchFamilyMembers(query: string): FamilyMember[] {
  const searchTerm = query.toLowerCase();
  return familyMembers.filter(member => 
    member.firstName.toLowerCase().includes(searchTerm) ||
    member.lastName.toLowerCase().includes(searchTerm) ||
    member.email.toLowerCase().includes(searchTerm) ||
    member.relationship.toLowerCase().includes(searchTerm)
  );
}

export function getMembersByRelationship(relationship: FamilyMember['relationship']): FamilyMember[] {
  return familyMembers.filter(m => m.relationship === relationship);
}

export function getPrimaryMember(): FamilyMember | undefined {
  return familyMembers.find(m => m.role === 'primary');
}
