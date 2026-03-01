import { InsuranceInfo, Relationship } from '@/types';

/**
 * Insurance Card Data Model
 * Extended insurance information with visual and benefit details
 */
export interface InsuranceCard extends InsuranceInfo {
  id: string;
  memberId: string;  // Associated family member ID
  memberName: string;
  relationship: Relationship;
  memberIdNumber: string;  // Member ID on card
  cardholderGroupId?: string;  // Cardholder group ID
  effectiveDate: string;
  expirationDate: string;
  copayPrimary: number;
  copaySpecialist: number;
  deductible: number;
  outOfPocketMax: number;
  rxGroup?: string;
  rxPCN?: string;
  bin?: string;
  customerServicePhone: string;
  website: string;
  cardImage?: string;  // Insurance card image URL
  status: 'active' | 'inactive' | 'pending';
}

// ============================================================================
// Mock Insurance Cards Data
// ============================================================================

export const insuranceCards: InsuranceCard[] = [
  {
    id: 'insurance-001',
    memberId: 'user-001',
    memberName: 'Sarah Jenkins',
    relationship: 'self',
    provider: 'Blue Cross Blue Shield',
    planName: 'PPO Premium Plus',
    memberIdNumber: 'BCB987654321',
    groupNumber: 'GRP-445821',
    cardholderGroupId: 'CG-887234',
    coverageType: 'primary',
    status: 'active',
    effectiveDate: '2024-01-01',
    expirationDate: '2026-12-31',
    copayPrimary: 25,
    copaySpecialist: 50,
    deductible: 1500,
    outOfPocketMax: 6000,
    rxGroup: 'RX-7782341',
    rxPCN: 'BCBSRX01',
    bin: '610014',
    customerServicePhone: '+1 (800) 555-1234',
    website: 'https://www.bcbs.com',
    cardImage: 'https://example.com/cards/bcbs-card.png',
  },
  {
    id: 'insurance-002',
    memberId: 'user-002',
    memberName: 'David Jenkins',
    relationship: 'spouse',
    provider: 'Aetna',
    planName: 'HMO Standard',
    memberIdNumber: 'AET456789123',
    groupNumber: 'GRP-998877',
    cardholderGroupId: 'CG-445566',
    coverageType: 'secondary',
    status: 'active',
    effectiveDate: '2024-01-01',
    expirationDate: '2026-12-31',
    copayPrimary: 30,
    copaySpecialist: 60,
    deductible: 2000,
    outOfPocketMax: 7500,
    rxGroup: 'RX-3344556',
    rxPCN: 'AETRX02',
    bin: '610020',
    customerServicePhone: '+1 (800) 555-5678',
    website: 'https://www.aetna.com',
    cardImage: 'https://example.com/cards/aetna-card.png',
  },
  {
    id: 'insurance-003',
    memberId: 'user-003',
    memberName: 'Lily Jenkins',
    relationship: 'child',
    provider: 'United Healthcare',
    planName: 'Pediatric Care Plus',
    memberIdNumber: 'UHC789456123',
    groupNumber: 'GRP-112233',
    cardholderGroupId: 'CG-998877',
    coverageType: 'primary',
    status: 'active',
    effectiveDate: '2024-01-01',
    expirationDate: '2026-12-31',
    copayPrimary: 15,
    copaySpecialist: 35,
    deductible: 500,
    outOfPocketMax: 3000,
    rxGroup: 'RX-9988776',
    rxPCN: 'UHCRX03',
    bin: '610035',
    customerServicePhone: '+1 (800) 555-9012',
    website: 'https://www.uhc.com',
    cardImage: 'https://example.com/cards/uhc-card.png',
  },
];

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * Get insurance card by ID
 */
export function getInsuranceCardById(id: string): InsuranceCard | undefined {
  return insuranceCards.find(card => card.id === id);
}

/**
 * Get insurance cards by member ID
 */
export function getInsuranceCardsByMemberId(memberId: string): InsuranceCard[] {
  return insuranceCards.filter(card => card.memberId === memberId);
}

/**
 * Get all active insurance cards
 */
export function getActiveInsuranceCards(): InsuranceCard[] {
  return insuranceCards.filter(card => card.status === 'active');
}

/**
 * Get primary insurance card (first active primary coverage)
 */
export function getPrimaryInsuranceCard(): InsuranceCard | undefined {
  return insuranceCards.find(card => 
    card.coverageType === 'primary' && card.status === 'active'
  );
}

/**
 * Get insurance cards by provider
 */
export function getInsuranceCardsByProvider(provider: string): InsuranceCard[] {
  return insuranceCards.filter(card => 
    card.provider.toLowerCase().includes(provider.toLowerCase())
  );
}

/**
 * Check if a card is expired
 */
export function isCardExpired(card: InsuranceCard): boolean {
  return new Date(card.expirationDate) < new Date();
}

/**
 * Get cards expiring within days
 */
export function getCardsExpiringSoon(days: number = 30): InsuranceCard[] {
  const soon = new Date();
  soon.setDate(soon.getDate() + days);
  
  return insuranceCards.filter(card => {
    const expDate = new Date(card.expirationDate);
    return expDate <= soon && expDate > new Date();
  });
}
