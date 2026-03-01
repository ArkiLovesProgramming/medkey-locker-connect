import { Appointment, Provider, Facility } from '@/types';

// Providers database
export const healthcareProviders: Record<string, Provider> = {
  'dr-wilson': {
    id: 'dr-001',
    name: 'Dr. James Wilson',
    specialty: 'Family Medicine',
    phone: '+1 (555) 345-6789',
    email: 'j.wilson@springfieldfm.com',
    npi: '1234567890',
    avatar: undefined, // Use SVG avatar
  },
  'dr-patel': {
    id: 'dr-002',
    name: 'Dr. Priya Patel',
    specialty: 'Pediatrics',
    phone: '+1 (555) 345-6790',
    email: 'p.patel@springfieldpeds.com',
    npi: '2345678901',
    avatar: undefined, // Use SVG avatar
  },
  'dr-chen': {
    id: 'dr-003',
    name: 'Dr. Robert Chen',
    specialty: 'Cardiology',
    phone: '+1 (555) 345-6791',
    email: 'r.chen@springfieldcardio.com',
    npi: '3456789012',
    avatar: undefined, // Use SVG avatar
  },
  'dr-martinez': {
    id: 'dr-004',
    name: 'Dr. Maria Martinez',
    specialty: 'Endocrinology',
    phone: '+1 (555) 345-6792',
    email: 'm.martinez@springfieldendo.com',
    npi: '4567890123',
    avatar: undefined, // Use SVG avatar
  },
  'dr-thompson': {
    id: 'dr-005',
    name: 'Dr. Jennifer Thompson',
    specialty: 'Allergy & Immunology',
    phone: '+1 (555) 345-6793',
    email: 'j.thompson@springfieldallergy.com',
    npi: '5678901234',
    avatar: undefined, // Use SVG avatar
  },
  'dr-kim': {
    id: 'dr-006',
    name: 'Dr. Susan Kim',
    specialty: 'OB/GYN',
    phone: '+1 (555) 345-6794',
    email: 's.kim@springfieldwomenshealth.com',
    npi: '6789012345',
    avatar: undefined, // Use SVG avatar
  },
};

// Facilities database
export const healthcareFacilities: Record<string, Facility> = {
  'springfield-fm': {
    id: 'fac-001',
    name: 'Springfield Family Medicine',
    address: '123 Medical Plaza, Suite 200, Springfield, IL 62701',
    phone: '+1 (555) 345-6789',
    type: 'clinic',
  },
  'springfield-peds': {
    id: 'fac-002',
    name: 'Springfield Pediatrics',
    address: '456 Children Way, Suite 100, Springfield, IL 62702',
    phone: '+1 (555) 345-6790',
    type: 'clinic',
  },
  'springfield-cardio': {
    id: 'fac-003',
    name: 'Springfield Cardiology Center',
    address: '789 Heart Drive, Suite 300, Springfield, IL 62703',
    phone: '+1 (555) 345-6791',
    type: 'clinic',
  },
  'springfield-endo': {
    id: 'fac-004',
    name: 'Springfield Endocrinology Center',
    address: '321 Diabetes Lane, Suite 150, Springfield, IL 62704',
    phone: '+1 (555) 345-6792',
    type: 'clinic',
  },
  'springfield-hospital': {
    id: 'fac-005',
    name: 'Springfield General Hospital',
    address: '1000 Hospital Drive, Springfield, IL 62705',
    phone: '+1 (555) 345-6700',
    type: 'hospital',
  },
  'springfield-lab': {
    id: 'fac-006',
    name: 'Springfield Medical Laboratory',
    address: '555 Lab Park, Suite 100, Springfield, IL 62706',
    phone: '+1 (555) 345-6800',
    type: 'lab',
  },
  'medkey-pharmacy': {
    id: 'fac-007',
    name: 'MEDkey Pharmacy - Main Street',
    address: '555 Main Street, Springfield, IL 62701',
    phone: '+1 (555) 456-7890',
    type: 'pharmacy',
  },
};

// Appointments database
export const appointments: Appointment[] = [
  // Upcoming appointments
  {
    id: 'apt-001',
    patientId: 'user-002',
    patientName: 'David Jenkins',
    type: 'follow-up',
    title: 'Diabetes Follow-up',
    description: 'Quarterly diabetes management check-up and HbA1c review',
    dateTime: '2025-10-28T14:00:00Z',
    duration: 30,
    status: 'confirmed',
    provider: healthcareProviders['dr-martinez'],
    facility: healthcareFacilities['springfield-endo'],
    location: 'Room 205',
    notes: 'Bring glucose log. Fasting blood work required before appointment.',
    relatedLabs: ['lab-009'],
    reminders: [
      {
        id: 'rem-001',
        type: 'sms',
        timeBefore: 1440, // 24 hours
        sent: false,
      },
      {
        id: 'rem-002',
        type: 'email',
        timeBefore: 60, // 1 hour
        sent: false,
      },
    ],
  },
  {
    id: 'apt-002',
    patientId: 'user-001',
    patientName: 'Sarah Jenkins',
    type: 'medication-review',
    title: 'Thyroid Medication Review',
    description: 'Follow-up to review Levothyroxine dosage and TSH levels',
    dateTime: '2025-11-05T10:30:00Z',
    duration: 20,
    status: 'scheduled',
    provider: healthcareProviders['dr-martinez'],
    facility: healthcareFacilities['springfield-endo'],
    location: 'Room 203',
    notes: 'Continue current dose until lab results reviewed.',
    reminders: [
      {
        id: 'rem-003',
        type: 'sms',
        timeBefore: 1440,
        sent: false,
      },
    ],
  },
  {
    id: 'apt-003',
    patientId: 'user-002',
    patientName: 'David Jenkins',
    type: 'follow-up',
    title: 'Cardiology Follow-up',
    description: 'Blood pressure management and medication adjustment',
    dateTime: '2025-11-10T15:30:00Z',
    duration: 30,
    status: 'scheduled',
    provider: healthcareProviders['dr-chen'],
    facility: healthcareFacilities['springfield-cardio'],
    location: 'Room 310',
    notes: 'Bring home BP log. Metoprolol prescription may be adjusted.',
    relatedPrescriptions: ['rx-006'],
    reminders: [
      {
        id: 'rem-004',
        type: 'email',
        timeBefore: 2880, // 48 hours
        sent: false,
      },
    ],
  },
  {
    id: 'apt-004',
    patientId: 'user-003',
    patientName: 'Lily Jenkins',
    type: 'follow-up',
    title: 'Ear Infection Follow-up',
    description: 'Check resolution of otitis media after antibiotic course',
    dateTime: '2025-10-25T09:00:00Z',
    duration: 15,
    status: 'confirmed',
    provider: healthcareProviders['dr-patel'],
    facility: healthcareFacilities['springfield-peds'],
    location: 'Room 102',
    notes: 'Complete Amoxicillin course before visit.',
    relatedPrescriptions: ['rx-001'],
    reminders: [
      {
        id: 'rem-005',
        type: 'sms',
        timeBefore: 1440,
        sent: false,
      },
    ],
  },
  {
    id: 'apt-005',
    patientId: 'user-003',
    patientName: 'Lily Jenkins',
    type: 'vaccination',
    title: 'HPV Vaccination - Dose 2',
    description: 'Second dose of HPV vaccine series',
    dateTime: '2025-12-20T11:00:00Z',
    duration: 15,
    status: 'scheduled',
    provider: healthcareProviders['dr-patel'],
    facility: healthcareFacilities['springfield-peds'],
    location: 'Vaccination Room',
    notes: 'Second dose due 6-12 months after first dose.',
    reminders: [
      {
        id: 'rem-006',
        type: 'email',
        timeBefore: 10080, // 1 week
        sent: false,
      },
    ],
  },
  {
    id: 'apt-006',
    patientId: 'user-001',
    patientName: 'Sarah Jenkins',
    type: 'annual-physical',
    title: 'Annual Physical Examination',
    description: 'Comprehensive annual wellness visit',
    dateTime: '2026-06-15T09:00:00Z',
    duration: 60,
    status: 'scheduled',
    provider: healthcareProviders['dr-wilson'],
    facility: healthcareFacilities['springfield-fm'],
    location: 'Room 101',
    notes: 'Fasting required for blood work. Mammogram referral will be provided.',
    reminders: [
      {
        id: 'rem-007',
        type: 'email',
        timeBefore: 20160, // 2 weeks
        sent: false,
      },
    ],
  },
  {
    id: 'apt-007',
    patientId: 'user-002',
    patientName: 'David Jenkins',
    type: 'lab-work',
    title: 'Diabetes Lab Work',
    description: 'HbA1c and comprehensive metabolic panel',
    dateTime: '2025-10-28T08:00:00Z',
    duration: 30,
    status: 'scheduled',
    provider: healthcareProviders['dr-martinez'],
    facility: healthcareFacilities['springfield-lab'],
    location: 'Lab Station 3',
    notes: '12-hour fasting required. Schedule before endocrinology appointment.',
    relatedLabs: ['lab-009'],
    reminders: [
      {
        id: 'rem-008',
        type: 'sms',
        timeBefore: 720, // 12 hours
        sent: false,
      },
    ],
  },
  
  // Past appointments
  {
    id: 'apt-008',
    patientId: 'user-001',
    patientName: 'Sarah Jenkins',
    type: 'specialist',
    title: 'Endocrinology Consultation',
    description: 'Initial thyroid evaluation',
    dateTime: '2025-07-05T14:00:00Z',
    duration: 45,
    status: 'completed',
    provider: healthcareProviders['dr-martinez'],
    facility: healthcareFacilities['springfield-endo'],
    location: 'Room 203',
    notes: 'Started Levothyroxine 50mcg. Follow-up in 6 weeks with repeat TSH.',
    relatedPrescriptions: ['rx-007'],
  },
  {
    id: 'apt-009',
    patientId: 'user-002',
    patientName: 'David Jenkins',
    type: 'specialist',
    title: 'Cardiology Consultation',
    description: 'Hypertension and cholesterol management',
    dateTime: '2025-10-10T10:00:00Z',
    duration: 45,
    status: 'completed',
    provider: healthcareProviders['dr-chen'],
    facility: healthcareFacilities['springfield-cardio'],
    location: 'Room 310',
    notes: 'BP elevated. Starting Metoprolol 50mg BID. Home BP monitoring recommended.',
    relatedPrescriptions: ['rx-006'],
  },
  {
    id: 'apt-010',
    patientId: 'user-003',
    patientName: 'Lily Jenkins',
    type: 'urgent-care',
    title: 'Sick Visit - Ear Pain',
    description: 'Acute ear pain and fever',
    dateTime: '2025-10-18T10:00:00Z',
    duration: 20,
    status: 'completed',
    provider: healthcareProviders['dr-patel'],
    facility: healthcareFacilities['springfield-peds'],
    location: 'Room 105',
    notes: 'Diagnosed with acute otitis media. Prescribed Amoxicillin 500mg.',
    relatedPrescriptions: ['rx-001'],
  },
  {
    id: 'apt-011',
    patientId: 'user-001',
    patientName: 'Sarah Jenkins',
    type: 'annual-physical',
    title: 'Annual Physical Examination',
    description: 'Comprehensive annual wellness visit',
    dateTime: '2025-06-15T09:00:00Z',
    duration: 60,
    status: 'completed',
    provider: healthcareProviders['dr-wilson'],
    facility: healthcareFacilities['springfield-fm'],
    location: 'Room 101',
    notes: 'All vitals stable. Labs ordered. Mammogram scheduled.',
  },
  {
    id: 'apt-012',
    patientId: 'user-002',
    patientName: 'David Jenkins',
    type: 'annual-physical',
    title: 'Annual Physical with Diabetes Focus',
    description: 'Comprehensive annual wellness visit',
    dateTime: '2025-05-20T10:00:00Z',
    duration: 60,
    status: 'completed',
    provider: healthcareProviders['dr-martinez'],
    facility: healthcareFacilities['springfield-endo'],
    location: 'Room 205',
    notes: 'Diabetes well controlled. HbA1c 6.8%. Continue current regimen.',
  },
  {
    id: 'apt-013',
    patientId: 'user-003',
    patientName: 'Lily Jenkins',
    type: 'annual-physical',
    title: 'Annual Well-Child Visit',
    description: 'Annual pediatric check-up and vaccinations',
    dateTime: '2025-09-15T13:30:00Z',
    duration: 45,
    status: 'completed',
    provider: healthcareProviders['dr-patel'],
    facility: healthcareFacilities['springfield-peds'],
    location: 'Room 102',
    notes: 'Growth and development normal. Asthma well controlled. Flu shot administered.',
  },
  {
    id: 'apt-014',
    patientId: 'user-001',
    patientName: 'Sarah Jenkins',
    type: 'telehealth',
    title: 'Telehealth Visit - Allergy Consultation',
    description: 'Virtual consultation for seasonal allergy symptoms',
    dateTime: '2025-04-10T16:00:00Z',
    duration: 20,
    status: 'completed',
    provider: healthcareProviders['dr-wilson'],
    facility: healthcareFacilities['springfield-fm'],
    location: 'Virtual Visit',
    notes: 'Prescribed Cetirizine 10mg daily. Discussed trigger avoidance.',
    relatedPrescriptions: ['rx-005'],
  },
  {
    id: 'apt-015',
    patientId: 'user-002',
    patientName: 'David Jenkins',
    type: 'follow-up',
    title: 'Diabetes Follow-up',
    description: 'Quarterly diabetes management check-up',
    dateTime: '2025-07-15T14:00:00Z',
    duration: 30,
    status: 'completed',
    provider: healthcareProviders['dr-martinez'],
    facility: healthcareFacilities['springfield-endo'],
    location: 'Room 205',
    notes: 'HbA1c improved to 6.9%. Continue Metformin and lifestyle modifications.',
  },
  
  // Cancelled/Rescheduled appointments
  {
    id: 'apt-016',
    patientId: 'user-001',
    patientName: 'Sarah Jenkins',
    type: 'follow-up',
    title: 'Allergy Follow-up',
    description: 'Follow-up for seasonal allergy management',
    dateTime: '2025-09-20T11:00:00Z',
    duration: 20,
    status: 'cancelled',
    provider: healthcareProviders['dr-wilson'],
    facility: healthcareFacilities['springfield-fm'],
    location: 'Room 103',
    notes: 'Cancelled by patient - schedule conflict. Rescheduled for November.',
  },
  {
    id: 'apt-017',
    patientId: 'user-003',
    patientName: 'Lily Jenkins',
    type: 'follow-up',
    title: 'Asthma Follow-up',
    description: 'Routine asthma management check-up',
    dateTime: '2025-10-01T15:00:00Z',
    duration: 20,
    status: 'rescheduled',
    provider: healthcareProviders['dr-patel'],
    facility: healthcareFacilities['springfield-peds'],
    location: 'Room 102',
    notes: 'Rescheduled due to illness. New date: October 15.',
  },
];

// Helper functions
export function getAppointmentsByPatient(patientId: string): Appointment[] {
  return appointments.filter(a => a.patientId === patientId);
}

export function getAppointmentsByStatus(status: string): Appointment[] {
  return appointments.filter(a => a.status === status);
}

export function getAppointmentsByType(type: string): Appointment[] {
  return appointments.filter(a => a.type === type);
}

export function getAppointmentById(id: string): Appointment | undefined {
  return appointments.find(a => a.id === id);
}

export function getUpcomingAppointments(limit: number = 10): Appointment[] {
  const now = new Date();
  return appointments
    .filter(a => {
      const aptDate = new Date(a.dateTime);
      return a.status === 'scheduled' || a.status === 'confirmed';
    })
    .sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime())
    .slice(0, limit);
}

export function getPastAppointments(limit: number = 10): Appointment[] {
  const now = new Date();
  return appointments
    .filter(a => {
      const aptDate = new Date(a.dateTime);
      return a.status === 'completed' || aptDate < now;
    })
    .sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime())
    .slice(0, limit);
}

export function getAppointmentsByDateRange(start: string, end: string): Appointment[] {
  return appointments.filter(a => {
    const aptDate = new Date(a.dateTime);
    return aptDate >= new Date(start) && aptDate <= new Date(end);
  });
}

export function getAppointmentsByProvider(providerId: string): Appointment[] {
  return appointments.filter(a => a.provider?.id === providerId);
}

export function searchAppointments(query: string): Appointment[] {
  const lowerQuery = query.toLowerCase();
  return appointments.filter(a => 
    a.title.toLowerCase().includes(lowerQuery) ||
    a.patientName.toLowerCase().includes(lowerQuery) ||
    a.provider?.name.toLowerCase().includes(lowerQuery) ||
    a.description?.toLowerCase().includes(lowerQuery)
  );
}

export function getAppointmentReminders(patientId: string): Appointment[] {
  const now = new Date();
  return appointments.filter(a => {
    const aptDate = new Date(a.dateTime);
    const hoursUntil = (aptDate.getTime() - now.getTime()) / (1000 * 60 * 60);
    
    return a.patientId === patientId &&
           (a.status === 'scheduled' || a.status === 'confirmed') &&
           a.reminders?.some(r => {
             const hoursBefore = r.timeBefore / 60;
             return !r.sent && hoursUntil <= hoursBefore && hoursUntil > 0;
           });
  });
}
