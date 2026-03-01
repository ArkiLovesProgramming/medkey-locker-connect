import { Prescription, Prescriber, Pharmacy } from '@/types';
import { jenkinsInsurance } from './mockUsers';

// Prescribers database
export const prescribers: Record<string, Prescriber> = {
  'dr-wilson': {
    id: 'dr-001',
    name: 'Dr. James Wilson',
    specialty: 'Family Medicine',
    phone: '+1 (555) 345-6789',
    address: '123 Medical Plaza, Suite 200, Springfield, IL 62701',
    npi: '1234567890',
    avatar: 'https://i.pravatar.cc/400?img=21', // Male doctor, family medicine
  },
  'dr-patel': {
    id: 'dr-002',
    name: 'Dr. Priya Patel',
    specialty: 'Pediatrics',
    phone: '+1 (555) 345-6790',
    address: '456 Children Way, Suite 100, Springfield, IL 62702',
    npi: '2345678901',
    avatar: 'https://i.pravatar.cc/400?img=38', // Female pediatrician
  },
  'dr-chen': {
    id: 'dr-003',
    name: 'Dr. Robert Chen',
    specialty: 'Cardiology',
    phone: '+1 (555) 345-6791',
    address: '789 Heart Drive, Suite 300, Springfield, IL 62703',
    npi: '3456789012',
    avatar: 'https://i.pravatar.cc/400?img=60', // Male cardiologist
  },
  'dr-martinez': {
    id: 'dr-004',
    name: 'Dr. Maria Martinez',
    specialty: 'Endocrinology',
    phone: '+1 (555) 345-6792',
    address: '321 Diabetes Lane, Suite 150, Springfield, IL 62704',
    npi: '4567890123',
    avatar: 'https://i.pravatar.cc/400?img=49', // Female endocrinologist
  },
};

// Pharmacy database
export const pharmacies: Record<string, Pharmacy> = {
  'medkey-main': {
    id: 'pharm-001',
    name: 'MEDkey Pharmacy - Main Street',
    address: '555 Main Street, Springfield, IL 62701',
    phone: '+1 (555) 456-7890',
    hours: 'Mon-Fri: 9AM-9PM, Sat-Sun: 10AM-6PM',
  },
  'medkey-west': {
    id: 'pharm-002',
    name: 'MEDkey Pharmacy - Westside',
    address: '888 West Avenue, Springfield, IL 62702',
    phone: '+1 (555) 456-7891',
    hours: 'Mon-Sun: 8AM-10PM',
  },
};

// All prescriptions
export const prescriptions: Prescription[] = [
  {
    id: 'rx-001',
    rxNumber: 'RX-4920391-01',
    medicationId: 'med-001',
    medicationName: 'Amoxicillin',
    strength: '500mg',
    quantity: 14,
    dosage: '500mg',
    frequency: 'Every 8 hours',
    status: 'ready',
    patientId: 'user-003',
    patientName: 'Lily Jenkins',
    prescriber: prescribers['dr-patel'],
    pharmacy: pharmacies['medkey-main'],
    datePrescribed: '2025-10-20',
    dateExpires: '2026-10-20',
    refillsAllowed: 0,
    refillsRemaining: 0,
    insurance: jenkinsInsurance,
    financials: {
      totalCost: 45.00,
      insuranceCoverage: 35.00,
      copay: 10.00,
      deductible: 0,
      coverageReason: 'Standard formulary coverage',
    },
    pickupInfo: {
      estimatedReadyTime: '2025-10-21T14:00:00Z',
      lockerNumber: 'A-12',
      orderNumber: '29384-B',
    },
    notes: 'Complete full 7-day course. Take with food to reduce stomach upset.',
  },
  {
    id: 'rx-002',
    rxNumber: 'RX-4920392-03',
    medicationId: 'med-003',
    medicationName: 'Atorvastatin',
    strength: '20mg',
    quantity: 90,
    dosage: '20mg',
    frequency: 'Once daily',
    status: 'active',
    patientId: 'user-002',
    patientName: 'David Jenkins',
    prescriber: prescribers['dr-chen'],
    pharmacy: pharmacies['medkey-main'],
    datePrescribed: '2024-01-15',
    dateExpires: '2026-01-15',
    lastPickedUp: '2025-09-15',
    refillsAllowed: 5,
    refillsRemaining: 3,
    insurance: jenkinsInsurance,
    financials: {
      totalCost: 85.00,
      insuranceCoverage: 70.00,
      copay: 15.00,
      deductible: 0,
    },
    notes: 'Take in the evening. Avoid grapefruit products.',
  },
  {
    id: 'rx-003',
    rxNumber: 'RX-4920393-02',
    medicationId: 'med-004',
    medicationName: 'Lisinopril',
    strength: '10mg',
    quantity: 90,
    dosage: '10mg',
    frequency: 'Once daily',
    status: 'needs-approval',
    patientId: 'user-001',
    patientName: 'Sarah Jenkins',
    prescriber: prescribers['dr-wilson'],
    pharmacy: pharmacies['medkey-main'],
    datePrescribed: '2025-10-24',
    dateExpires: '2026-10-24',
    refillsAllowed: 11,
    refillsRemaining: 11,
    insurance: jenkinsInsurance,
    financials: {
      totalCost: 35.00,
      insuranceCoverage: 25.00,
      copay: 10.00,
      deductible: 0,
    },
    notes: 'Monitor blood pressure regularly. Rise slowly from sitting position.',
  },
  {
    id: 'rx-004',
    rxNumber: 'RX-4920394-05',
    medicationId: 'med-011',
    medicationName: 'Metformin',
    strength: '500mg',
    quantity: 180,
    dosage: '500mg',
    frequency: 'Twice daily',
    status: 'active',
    patientId: 'user-002',
    patientName: 'David Jenkins',
    prescriber: prescribers['dr-martinez'],
    pharmacy: pharmacies['medkey-west'],
    datePrescribed: '2024-06-01',
    dateExpires: '2026-06-01',
    lastPickedUp: '2025-09-01',
    refillsAllowed: 6,
    refillsRemaining: 5,
    insurance: jenkinsInsurance,
    financials: {
      totalCost: 25.00,
      insuranceCoverage: 20.00,
      copay: 5.00,
      deductible: 0,
    },
    notes: 'Take with meals. Monitor blood glucose levels regularly.',
  },
  {
    id: 'rx-005',
    rxNumber: 'RX-4920395-01',
    medicationId: 'med-008',
    medicationName: 'Cetirizine',
    strength: '10mg',
    quantity: 30,
    dosage: '10mg',
    frequency: 'Once daily',
    status: 'active',
    patientId: 'user-001',
    patientName: 'Sarah Jenkins',
    prescriber: prescribers['dr-wilson'],
    pharmacy: pharmacies['medkey-main'],
    datePrescribed: '2025-09-15',
    dateExpires: '2026-09-15',
    lastPickedUp: '2025-10-15',
    refillsAllowed: 3,
    refillsRemaining: 2,
    insurance: jenkinsInsurance,
    financials: {
      totalCost: 15.00,
      insuranceCoverage: 10.00,
      copay: 5.00,
      deductible: 0,
    },
    notes: 'May cause drowsiness. Use caution when driving.',
  },
  {
    id: 'rx-006',
    rxNumber: 'RX-4920396-01',
    medicationId: 'med-005',
    medicationName: 'Metoprolol',
    strength: '50mg',
    quantity: 60,
    dosage: '50mg',
    frequency: 'Twice daily',
    status: 'pending',
    patientId: 'user-002',
    patientName: 'David Jenkins',
    prescriber: prescribers['dr-chen'],
    pharmacy: pharmacies['medkey-main'],
    datePrescribed: '2025-10-22',
    dateExpires: '2026-10-22',
    refillsAllowed: 5,
    refillsRemaining: 5,
    insurance: jenkinsInsurance,
    financials: {
      totalCost: 40.00,
      insuranceCoverage: 30.00,
      copay: 10.00,
      deductible: 0,
    },
    notes: 'Do not stop abruptly. Monitor heart rate and blood pressure.',
  },
  {
    id: 'rx-007',
    rxNumber: 'RX-4920397-02',
    medicationId: 'med-015',
    medicationName: 'Levothyroxine',
    strength: '50mcg',
    quantity: 90,
    dosage: '50mcg',
    frequency: 'Once daily',
    status: 'picked-up',
    patientId: 'user-001',
    patientName: 'Sarah Jenkins',
    prescriber: prescribers['dr-martinez'],
    pharmacy: pharmacies['medkey-main'],
    datePrescribed: '2025-07-10',
    dateExpires: '2026-07-10',
    lastPickedUp: '2025-10-10',
    refillsAllowed: 11,
    refillsRemaining: 10,
    insurance: jenkinsInsurance,
    financials: {
      totalCost: 30.00,
      insuranceCoverage: 25.00,
      copay: 5.00,
      deductible: 0,
    },
    notes: 'Take on empty stomach 30-60 minutes before breakfast.',
  },
  {
    id: 'rx-008',
    rxNumber: 'RX-4920398-01',
    medicationId: 'med-013',
    medicationName: 'Sertraline',
    strength: '50mg',
    quantity: 30,
    dosage: '50mg',
    frequency: 'Once daily',
    status: 'expired',
    patientId: 'user-001',
    patientName: 'Sarah Jenkins',
    prescriber: prescribers['dr-wilson'],
    pharmacy: pharmacies['medkey-main'],
    datePrescribed: '2024-08-15',
    dateExpires: '2025-08-15',
    refillsAllowed: 6,
    refillsRemaining: 0,
    insurance: jenkinsInsurance,
    financials: {
      totalCost: 55.00,
      insuranceCoverage: 45.00,
      copay: 10.00,
      deductible: 0,
    },
    notes: 'Prescription expired. New prescription required.',
  },
];

// Helper functions
export function getPrescriptionById(id: string): Prescription | undefined {
  return prescriptions.find(p => p.id === id);
}

export function getPrescriptionsByStatus(status: string): Prescription[] {
  return prescriptions.filter(p => p.status === status);
}

export function getPrescriptionsByPatient(patientId: string): Prescription[] {
  return prescriptions.filter(p => p.patientId === patientId);
}

export function getActivePrescriptions(): Prescription[] {
  return prescriptions.filter(p => p.status === 'active' || p.status === 'ready' || p.status === 'pending');
}

export function getPrescriptionsNeedingApproval(): Prescription[] {
  return prescriptions.filter(p => p.status === 'needs-approval');
}

export function getPrescriptionsDueForRefill(): Prescription[] {
  return prescriptions.filter(p => 
    (p.status === 'active' || p.status === 'picked-up') && 
    p.refillsRemaining > 0
  );
}
