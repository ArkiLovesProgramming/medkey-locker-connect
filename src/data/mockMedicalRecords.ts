import { MedicalRecord, HealthCondition } from '@/types';

// Medical records database
export const medicalRecords: MedicalRecord[] = [
  // Sarah's medical records
  {
    id: 'mr-001',
    patientId: 'user-001',
    patientName: 'Sarah Jenkins',
    type: 'diagnosis',
    title: 'Hypertension Diagnosis',
    description: 'Essential hypertension, Stage 1',
    date: '2024-03-15',
    provider: 'Dr. James Wilson',
    facility: 'Springfield Family Medicine',
    notes: 'BP consistently elevated over 3 visits. Started on lifestyle modifications and Lisinopril.',
    relatedPrescriptions: ['rx-003'],
  },
  {
    id: 'mr-002',
    patientId: 'user-001',
    patientName: 'Sarah Jenkins',
    type: 'diagnosis',
    title: 'Seasonal Allergic Rhinitis',
    description: 'Seasonal allergies triggered by pollen',
    date: '2023-04-10',
    provider: 'Dr. James Wilson',
    facility: 'Springfield Family Medicine',
    notes: 'Patient experiences symptoms during spring and fall. Prescribed Cetirizine as needed.',
    relatedPrescriptions: ['rx-005'],
  },
  {
    id: 'mr-003',
    patientId: 'user-001',
    patientName: 'Sarah Jenkins',
    type: 'specialist-consult',
    title: 'Endocrinology Consultation',
    description: 'Thyroid function evaluation',
    date: '2025-07-05',
    provider: 'Dr. Maria Martinez',
    facility: 'Springfield Endocrinology Center',
    notes: 'TSH levels slightly elevated. Started on Levothyroxine 50mcg. Follow-up in 6 weeks.',
    relatedPrescriptions: ['rx-007'],
  },
  {
    id: 'mr-004',
    patientId: 'user-001',
    patientName: 'Sarah Jenkins',
    type: 'imaging',
    title: 'Thyroid Ultrasound',
    description: 'Ultrasound examination of thyroid gland',
    date: '2025-07-08',
    provider: 'Dr. Robert Chen',
    facility: 'Springfield Imaging Center',
    notes: 'Normal thyroid size and echogenicity. No nodules detected.',
    attachments: ['/documents/imaging/thyroid-ultrasound-2025.pdf'],
  },
  
  // David's medical records
  {
    id: 'mr-005',
    patientId: 'user-002',
    patientName: 'David Jenkins',
    type: 'diagnosis',
    title: 'Type 2 Diabetes Mellitus',
    description: 'Type 2 diabetes without complications',
    date: '2024-05-20',
    provider: 'Dr. Maria Martinez',
    facility: 'Springfield Endocrinology Center',
    notes: 'HbA1c 7.2% at diagnosis. Started on Metformin and lifestyle modifications.',
    relatedPrescriptions: ['rx-004'],
  },
  {
    id: 'mr-006',
    patientId: 'user-002',
    patientName: 'David Jenkins',
    type: 'diagnosis',
    title: 'Hyperlipidemia',
    description: 'Elevated cholesterol levels',
    date: '2024-01-10',
    provider: 'Dr. Robert Chen',
    facility: 'Springfield Cardiology',
    notes: 'LDL 165 mg/dL, HDL 38 mg/dL. Started on Atorvastatin 20mg and dietary changes.',
    relatedPrescriptions: ['rx-002'],
  },
  {
    id: 'mr-007',
    patientId: 'user-002',
    patientName: 'David Jenkins',
    type: 'procedure',
    title: 'Cardiac Stress Test',
    description: 'Exercise stress test with ECG monitoring',
    date: '2024-02-15',
    provider: 'Dr. Robert Chen',
    facility: 'Springfield Cardiology Center',
    notes: 'Normal stress test. No evidence of ischemia. Good exercise capacity.',
    attachments: ['/documents/procedures/stress-test-2024.pdf'],
  },
  {
    id: 'mr-008',
    patientId: 'user-002',
    patientName: 'David Jenkins',
    type: 'specialist-consult',
    title: 'Cardiology Follow-up',
    description: 'Routine cardiology follow-up for cholesterol management',
    date: '2025-09-10',
    provider: 'Dr. Robert Chen',
    facility: 'Springfield Cardiology',
    notes: 'Cholesterol well controlled on current medication. Continue Atorvastatin 20mg.',
    relatedPrescriptions: ['rx-002'],
  },
  {
    id: 'mr-009',
    patientId: 'user-002',
    patientName: 'David Jenkins',
    type: 'diagnosis',
    title: 'Hypertension',
    description: 'Essential hypertension, Stage 2',
    date: '2025-10-15',
    provider: 'Dr. James Wilson',
    facility: 'Springfield Family Medicine',
    notes: 'BP consistently 145-155/90-95. Starting Metoprolol in addition to lifestyle modifications.',
    relatedPrescriptions: ['rx-006'],
  },
  
  // Lily's medical records
  {
    id: 'mr-010',
    patientId: 'user-003',
    patientName: 'Lily Jenkins',
    type: 'diagnosis',
    title: 'Asthma, Mild Persistent',
    description: 'Childhood asthma with occasional exacerbations',
    date: '2022-09-15',
    provider: 'Dr. Priya Patel',
    facility: 'Springfield Pediatrics',
    notes: 'Diagnosed after recurrent wheezing episodes. Prescribed rescue inhaler. Monitor for triggers.',
  },
  {
    id: 'mr-011',
    patientId: 'user-003',
    patientName: 'Lily Jenkins',
    type: 'emergency-visit',
    title: 'Emergency Department Visit',
    description: 'Acute asthma exacerbation',
    date: '2024-11-20',
    provider: 'Dr. Susan Lee',
    facility: 'Springfield General Hospital ED',
    notes: 'Presented with wheezing and shortness of breath. Treated with albuterol nebulizer and oral steroids. Discharged with asthma action plan.',
    attachments: ['/documents/ed/asthma-exacerbation-2024.pdf'],
  },
  {
    id: 'mr-012',
    patientId: 'user-003',
    patientName: 'Lily Jenkins',
    type: 'diagnosis',
    title: 'Acute Otitis Media',
    description: 'Middle ear infection, right ear',
    date: '2025-10-18',
    provider: 'Dr. Priya Patel',
    facility: 'Springfield Pediatrics',
    notes: 'Fever and ear pain for 2 days. Tympanic membrane erythematous and bulging. Prescribed Amoxicillin.',
    relatedPrescriptions: ['rx-001'],
  },
  {
    id: 'mr-013',
    patientId: 'user-003',
    patientName: 'Lily Jenkins',
    type: 'diagnosis',
    title: 'Shellfish Allergy',
    description: 'IgE-mediated shellfish allergy',
    date: '2023-06-10',
    provider: 'Dr. Priya Patel',
    facility: 'Springfield Pediatrics',
    notes: 'Developed hives and nausea after eating shrimp. Advised to avoid all shellfish. Epinephrine auto-injector prescribed.',
  },
  
  // Additional historical records
  {
    id: 'mr-014',
    patientId: 'user-001',
    patientName: 'Sarah Jenkins',
    type: 'procedure',
    title: 'Annual Physical Examination',
    description: 'Comprehensive annual physical exam',
    date: '2025-06-15',
    provider: 'Dr. James Wilson',
    facility: 'Springfield Family Medicine',
    notes: 'All vitals stable. BMI 24.5. Up to date on screenings. Mammogram due next year.',
  },
  {
    id: 'mr-015',
    patientId: 'user-002',
    patientName: 'David Jenkins',
    type: 'procedure',
    title: 'Annual Physical Examination',
    description: 'Comprehensive annual physical exam with diabetes focus',
    date: '2025-05-20',
    provider: 'Dr. Maria Martinez',
    facility: 'Springfield Endocrinology Center',
    notes: 'Diabetes well controlled. HbA1c 6.8%. Foot exam normal. Dilated eye exam recommended.',
  },
  {
    id: 'mr-016',
    patientId: 'user-001',
    patientName: 'Sarah Jenkins',
    type: 'imaging',
    title: 'Mammography Screening',
    description: 'Annual screening mammogram',
    date: '2024-08-20',
    provider: 'Dr. Jennifer Adams',
    facility: 'Springfield Women\'s Imaging Center',
    notes: 'BIRADS Category 1 - Negative. No evidence of malignancy. Return in 1 year.',
    attachments: ['/documents/imaging/mammogram-2024.pdf'],
  },
  {
    id: 'mr-017',
    patientId: 'user-002',
    patientName: 'David Jenkins',
    type: 'imaging',
    title: 'Abdominal Ultrasound',
    description: 'Ultrasound of liver and gallbladder',
    date: '2024-03-10',
    provider: 'Dr. Michael Torres',
    facility: 'Springfield Imaging Center',
    notes: 'Mild hepatic steatosis (fatty liver). Gallbladder normal. Consistent with metabolic syndrome.',
    attachments: ['/documents/imaging/abdominal-ultrasound-2024.pdf'],
  },
];

// Health conditions tracking
export const healthConditions: HealthCondition[] = [
  // Sarah's conditions
  {
    id: 'hc-001',
    patientId: 'user-001',
    name: 'Essential Hypertension',
    icd10Code: 'I10',
    dateDiagnosed: '2024-03-15',
    status: 'chronic',
    severity: 'moderate',
    notes: 'Well controlled on Lisinopril 10mg daily. Home BP monitoring recommended.',
  },
  {
    id: 'hc-002',
    patientId: 'user-001',
    name: 'Seasonal Allergic Rhinitis',
    icd10Code: 'J30.2',
    dateDiagnosed: '2023-04-10',
    status: 'active',
    severity: 'mild',
    notes: 'Symptoms during spring and fall. Managed with antihistamines as needed.',
  },
  {
    id: 'hc-003',
    patientId: 'user-001',
    name: 'Hypothyroidism',
    icd10Code: 'E03.9',
    dateDiagnosed: '2025-07-05',
    status: 'active',
    severity: 'mild',
    notes: 'Subclinical hypothyroidism. TSH monitored every 6 weeks. On Levothyroxine replacement.',
  },
  
  // David's conditions
  {
    id: 'hc-004',
    patientId: 'user-002',
    name: 'Type 2 Diabetes Mellitus',
    icd10Code: 'E11.9',
    dateDiagnosed: '2024-05-20',
    status: 'chronic',
    severity: 'moderate',
    notes: 'Well controlled on Metformin. HbA1c target <7%. Regular foot exams and eye exams recommended.',
  },
  {
    id: 'hc-005',
    patientId: 'user-002',
    name: 'Hyperlipidemia',
    icd10Code: 'E78.5',
    dateDiagnosed: '2024-01-10',
    status: 'chronic',
    severity: 'moderate',
    notes: 'LDL goal <100 mg/dL. On Atorvastatin 20mg. Lifestyle modifications ongoing.',
  },
  {
    id: 'hc-006',
    patientId: 'user-002',
    name: 'Essential Hypertension',
    icd10Code: 'I10',
    dateDiagnosed: '2025-10-15',
    status: 'active',
    severity: 'moderate',
    notes: 'Recently diagnosed. Starting Metoprolol. Home BP monitoring initiated.',
  },
  {
    id: 'hc-007',
    patientId: 'user-002',
    name: 'Hepatic Steatosis',
    icd10Code: 'K76.0',
    dateDiagnosed: '2024-03-10',
    status: 'chronic',
    severity: 'mild',
    notes: 'Mild fatty liver. Weight loss and exercise recommended. Avoid alcohol.',
  },
  
  // Lily's conditions
  {
    id: 'hc-008',
    patientId: 'user-003',
    name: 'Asthma, Mild Persistent',
    icd10Code: 'J45.30',
    dateDiagnosed: '2022-09-15',
    status: 'chronic',
    severity: 'mild',
    notes: 'Well controlled. Uses rescue inhaler 1-2 times per month. Annual pulmonary function tests recommended.',
  },
  {
    id: 'hc-009',
    patientId: 'user-003',
    name: 'Shellfish Allergy',
    icd10Code: 'Z91.013',
    dateDiagnosed: '2023-06-10',
    status: 'active',
    severity: 'severe',
    notes: 'IgE-mediated allergy. Strict avoidance of all shellfish. Epinephrine auto-injector available.',
  },
];

// Helper functions
export function getMedicalRecordsByPatient(patientId: string): MedicalRecord[] {
  return medicalRecords.filter(r => r.patientId === patientId);
}

export function getMedicalRecordsByType(type: string): MedicalRecord[] {
  return medicalRecords.filter(r => r.type === type);
}

export function getMedicalRecordById(id: string): MedicalRecord | undefined {
  return medicalRecords.find(r => r.id === id);
}

export function getHealthConditionsByPatient(patientId: string): HealthCondition[] {
  return healthConditions.filter(c => c.patientId === patientId);
}

export function getActiveHealthConditions(): HealthCondition[] {
  return healthConditions.filter(c => c.status === 'active' || c.status === 'chronic');
}

export function getHealthConditionById(id: string): HealthCondition | undefined {
  return healthConditions.find(c => c.id === id);
}

export function searchMedicalRecords(query: string): MedicalRecord[] {
  const lowerQuery = query.toLowerCase();
  return medicalRecords.filter(r => 
    r.title.toLowerCase().includes(lowerQuery) ||
    r.description.toLowerCase().includes(lowerQuery) ||
    r.provider?.toLowerCase().includes(lowerQuery)
  );
}
