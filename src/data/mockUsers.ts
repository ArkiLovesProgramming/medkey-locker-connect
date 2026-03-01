import { FamilyMember, InsuranceInfo, Allergy } from '@/types';

// Insurance information for the family
export const jenkinsInsurance: InsuranceInfo = {
  provider: 'Blue Cross Blue Shield',
  planName: 'PPO Premium Plus',
  memberId: 'BCB987654321',
  groupNumber: 'GRP-445821',
  coverageType: 'primary',
};

// Family allergies database
export const familyAllergies: Record<string, Allergy[]> = {
  sarah: [
    {
      name: 'Penicillin',
      severity: 'severe',
      reaction: 'Hives, difficulty breathing',
    },
    {
      name: 'Peanuts',
      severity: 'severe',
      reaction: 'Anaphylaxis',
    },
  ],
  david: [
    {
      name: 'Latex',
      severity: 'moderate',
      reaction: 'Skin rash, itching',
    },
  ],
  lily: [
    {
      name: 'Shellfish',
      severity: 'moderate',
      reaction: 'Nausea, hives',
    },
  ],
};

// Main family members data
export const familyMembers: FamilyMember[] = [
  {
    id: 'user-001',
    email: 'sarah.jenkins@email.com',
    firstName: 'Sarah',
    lastName: 'Jenkins',
    phone: '+1 (555) 234-5678',
    dateOfBirth: '1985-06-15',
    role: 'primary',
    relationship: 'self',
    avatar: 'https://i.pravatar.cc/400?img=47', // Professional woman in her 30s
    insuranceInfo: jenkinsInsurance,
    allergies: familyAllergies.sarah,
    medicalConditions: ['Hypertension', 'Seasonal allergies'],
    createdAt: '2022-01-15T08:00:00Z',
  },
  {
    id: 'user-002',
    email: 'david.jenkins@email.com',
    firstName: 'David',
    lastName: 'Jenkins',
    phone: '+1 (555) 234-5679',
    dateOfBirth: '1983-09-22',
    role: 'member',
    relationship: 'spouse',
    avatar: 'https://i.pravatar.cc/400?img=11', // Professional man in his 40s
    insuranceInfo: jenkinsInsurance,
    allergies: familyAllergies.david,
    medicalConditions: ['High cholesterol', 'Type 2 diabetes'],
    createdAt: '2022-01-15T08:00:00Z',
  },
  {
    id: 'user-003',
    email: '',
    firstName: 'Lily',
    lastName: 'Jenkins',
    dateOfBirth: '2015-03-10',
    role: 'member',
    relationship: 'child',
    avatar: 'https://i.pravatar.cc/400?img=35', // Young girl around 10 years old
    insuranceInfo: jenkinsInsurance,
    allergies: familyAllergies.lily,
    medicalConditions: ['Asthma'],
    createdAt: '2022-01-15T08:00:00Z',
  },
];

// Export individual members for easy import
export const sarahJenkins = familyMembers[0];
export const davidJenkins = familyMembers[1];
export const lilyJenkins = familyMembers[2];

// Helper function to get member by ID
export function getMemberById(id: string): FamilyMember | undefined {
  return familyMembers.find(m => m.id === id);
}

// Helper function to get member by name
export function getMemberByName(name: string): FamilyMember | undefined {
  return familyMembers.find(m => m.firstName.toLowerCase() === name.toLowerCase());
}

// Get all family members (including 'All' option)
export function getAllFamilyMembers() {
  return [
    { id: 'all', firstName: 'All', lastName: '', role: 'primary' as const, relationship: 'self' as const, email: '', createdAt: '' },
    ...familyMembers,
  ];
}
