import { LabResult, LabPanel, LabTest } from '@/types';

// Comprehensive lab results database
export const labResults: LabResult[] = [
  // David's Diabetes Panel
  {
    id: 'lab-001',
    patientId: 'user-002',
    patientName: 'David Jenkins',
    testName: 'Comprehensive Diabetes Panel',
    testCode: 'LAB-DIAB-001',
    date: '2025-10-15',
    status: 'final',
    orderedBy: 'Dr. Maria Martinez',
    facility: 'Springfield Medical Laboratory',
    panels: [
      {
        id: 'panel-001',
        name: 'Glucose Metabolism',
        tests: [
          {
            id: 'test-001',
            name: 'Hemoglobin A1c',
            loincCode: '4548-4',
            value: 6.8,
            unit: '%',
            referenceRange: { min: 4.0, max: 5.6, unit: '%' },
            flag: 'high',
            notes: 'Target for diabetics: <7.0%',
          },
          {
            id: 'test-002',
            name: 'Fasting Glucose',
            loincCode: '1558-6',
            value: 118,
            unit: 'mg/dL',
            referenceRange: { min: 70, max: 100, unit: 'mg/dL' },
            flag: 'high',
          },
        ],
      },
      {
        id: 'panel-002',
        name: 'Lipid Panel',
        tests: [
          {
            id: 'test-003',
            name: 'Total Cholesterol',
            loincCode: '2093-3',
            value: 172,
            unit: 'mg/dL',
            referenceRange: { min: 0, max: 200, unit: 'mg/dL' },
          },
          {
            id: 'test-004',
            name: 'LDL Cholesterol',
            loincCode: '2089-1',
            value: 95,
            unit: 'mg/dL',
            referenceRange: { min: 0, max: 100, unit: 'mg/dL' },
            notes: 'At goal for diabetic patient',
          },
          {
            id: 'test-005',
            name: 'HDL Cholesterol',
            loincCode: '2085-9',
            value: 48,
            unit: 'mg/dL',
            referenceRange: { min: 40, max: 60, unit: 'mg/dL' },
          },
          {
            id: 'test-006',
            name: 'Triglycerides',
            loincCode: '2571-8',
            value: 145,
            unit: 'mg/dL',
            referenceRange: { min: 0, max: 150, unit: 'mg/dL' },
          },
        ],
      },
      {
        id: 'panel-003',
        name: 'Kidney Function',
        tests: [
          {
            id: 'test-007',
            name: 'Creatinine',
            loincCode: '2160-0',
            value: 1.05,
            unit: 'mg/dL',
            referenceRange: { min: 0.74, max: 1.35, unit: 'mg/dL' },
          },
          {
            id: 'test-008',
            name: 'eGFR',
            loincCode: '33914-3',
            value: 78,
            unit: 'mL/min/1.73m²',
            referenceRange: { min: 60, max: 120, unit: 'mL/min/1.73m²' },
            notes: 'Normal for age',
          },
        ],
      },
    ],
    notes: 'Diabetes well controlled. Continue current medication regimen.',
  },
  
  // David's previous lab results
  {
    id: 'lab-002',
    patientId: 'user-002',
    patientName: 'David Jenkins',
    testName: 'Comprehensive Metabolic Panel',
    testCode: 'LAB-CMP-002',
    date: '2025-04-10',
    status: 'final',
    orderedBy: 'Dr. Maria Martinez',
    facility: 'Springfield Medical Laboratory',
    panels: [
      {
        id: 'panel-004',
        name: 'Glucose Metabolism',
        tests: [
          {
            id: 'test-009',
            name: 'Hemoglobin A1c',
            loincCode: '4548-4',
            value: 7.1,
            unit: '%',
            referenceRange: { min: 4.0, max: 5.6, unit: '%' },
            flag: 'high',
          },
          {
            id: 'test-010',
            name: 'Fasting Glucose',
            loincCode: '1558-6',
            value: 132,
            unit: 'mg/dL',
            referenceRange: { min: 70, max: 100, unit: 'mg/dL' },
            flag: 'high',
          },
        ],
      },
      {
        id: 'panel-005',
        name: 'Liver Function',
        tests: [
          {
            id: 'test-011',
            name: 'ALT (Alanine Aminotransferase)',
            loincCode: '1742-6',
            value: 42,
            unit: 'U/L',
            referenceRange: { min: 7, max: 56, unit: 'U/L' },
          },
          {
            id: 'test-012',
            name: 'AST (Aspartate Aminotransferase)',
            loincCode: '1920-8',
            value: 38,
            unit: 'U/L',
            referenceRange: { min: 10, max: 40, unit: 'U/L' },
          },
          {
            id: 'test-013',
            name: 'Alkaline Phosphatase',
            loincCode: '6768-6',
            value: 85,
            unit: 'U/L',
            referenceRange: { min: 44, max: 147, unit: 'U/L' },
          },
          {
            id: 'test-014',
            name: 'Total Bilirubin',
            loincCode: '1975-2',
            value: 0.8,
            unit: 'mg/dL',
            referenceRange: { min: 0.1, max: 1.2, unit: 'mg/dL' },
          },
        ],
      },
    ],
    notes: 'Slight improvement in A1c. Continue lifestyle modifications.',
  },
  
  // David's initial diagnosis labs
  {
    id: 'lab-003',
    patientId: 'user-002',
    patientName: 'David Jenkins',
    testName: 'Initial Diabetes Workup',
    testCode: 'LAB-DIAB-003',
    date: '2024-05-20',
    status: 'final',
    orderedBy: 'Dr. Maria Martinez',
    facility: 'Springfield Medical Laboratory',
    panels: [
      {
        id: 'panel-006',
        name: 'Glucose Metabolism',
        tests: [
          {
            id: 'test-015',
            name: 'Hemoglobin A1c',
            loincCode: '4548-4',
            value: 7.2,
            unit: '%',
            referenceRange: { min: 4.0, max: 5.6, unit: '%' },
            flag: 'high',
            notes: 'Diagnostic for diabetes',
          },
          {
            id: 'test-016',
            name: 'Fasting Glucose',
            loincCode: '1558-6',
            value: 145,
            unit: 'mg/dL',
            referenceRange: { min: 70, max: 100, unit: 'mg/dL' },
            flag: 'high',
          },
        ],
      },
      {
        id: 'panel-007',
        name: 'Lipid Panel',
        tests: [
          {
            id: 'test-017',
            name: 'Total Cholesterol',
            loincCode: '2093-3',
            value: 245,
            unit: 'mg/dL',
            referenceRange: { min: 0, max: 200, unit: 'mg/dL' },
            flag: 'high',
          },
          {
            id: 'test-018',
            name: 'LDL Cholesterol',
            loincCode: '2089-1',
            value: 165,
            unit: 'mg/dL',
            referenceRange: { min: 0, max: 100, unit: 'mg/dL' },
            flag: 'high',
          },
          {
            id: 'test-019',
            name: 'HDL Cholesterol',
            loincCode: '2085-9',
            value: 38,
            unit: 'mg/dL',
            referenceRange: { min: 40, max: 60, unit: 'mg/dL' },
            flag: 'low',
          },
          {
            id: 'test-020',
            name: 'Triglycerides',
            loincCode: '2571-8',
            value: 210,
            unit: 'mg/dL',
            referenceRange: { min: 0, max: 150, unit: 'mg/dL' },
            flag: 'high',
          },
        ],
      },
    ],
    notes: 'Initial diagnosis. Started on Metformin and Atorvastatin.',
  },
  
  // Sarah's Thyroid Panel
  {
    id: 'lab-004',
    patientId: 'user-001',
    patientName: 'Sarah Jenkins',
    testName: 'Comprehensive Thyroid Panel',
    testCode: 'LAB-THY-004',
    date: '2025-07-05',
    status: 'final',
    orderedBy: 'Dr. Maria Martinez',
    facility: 'Springfield Medical Laboratory',
    panels: [
      {
        id: 'panel-008',
        name: 'Thyroid Function',
        tests: [
          {
            id: 'test-021',
            name: 'TSH (Thyroid Stimulating Hormone)',
            loincCode: '3016-3',
            value: 5.8,
            unit: 'mIU/L',
            referenceRange: { min: 0.4, max: 4.0, unit: 'mIU/L' },
            flag: 'high',
          },
          {
            id: 'test-022',
            name: 'Free T4',
            loincCode: '3024-7',
            value: 0.9,
            unit: 'ng/dL',
            referenceRange: { min: 0.8, max: 1.8, unit: 'ng/dL' },
            notes: 'Low normal',
          },
          {
            id: 'test-023',
            name: 'Free T3',
            loincCode: '3022-1',
            value: 2.5,
            unit: 'pg/mL',
            referenceRange: { min: 2.0, max: 4.4, unit: 'pg/mL' },
          },
          {
            id: 'test-024',
            name: 'TPO Antibodies',
            loincCode: '3572-0',
            value: 125,
            unit: 'IU/mL',
            referenceRange: { min: 0, max: 35, unit: 'IU/mL' },
            flag: 'high',
            notes: 'Elevated - suggests Hashimoto\'s thyroiditis',
          },
        ],
      },
    ],
    notes: 'Subclinical hypothyroidism. Starting Levothyroxine 50mcg.',
  },
  
  // Sarah's follow-up thyroid labs
  {
    id: 'lab-005',
    patientId: 'user-001',
    patientName: 'Sarah Jenkins',
    testName: 'Thyroid Function Follow-up',
    testCode: 'LAB-THY-005',
    date: '2025-08-20',
    status: 'final',
    orderedBy: 'Dr. Maria Martinez',
    facility: 'Springfield Medical Laboratory',
    panels: [
      {
        id: 'panel-009',
        name: 'Thyroid Function',
        tests: [
          {
            id: 'test-025',
            name: 'TSH (Thyroid Stimulating Hormone)',
            loincCode: '3016-3',
            value: 3.2,
            unit: 'mIU/L',
            referenceRange: { min: 0.4, max: 4.0, unit: 'mIU/L' },
            notes: 'Improved on medication',
          },
          {
            id: 'test-026',
            name: 'Free T4',
            loincCode: '3024-7',
            value: 1.3,
            unit: 'ng/dL',
            referenceRange: { min: 0.8, max: 1.8, unit: 'ng/dL' },
          },
        ],
      },
    ],
    notes: 'Good response to Levothyroxine. Continue current dose.',
  },
  
  // Sarah's annual labs
  {
    id: 'lab-006',
    patientId: 'user-001',
    patientName: 'Sarah Jenkins',
    testName: 'Annual Physical Labs',
    testCode: 'LAB-ANN-006',
    date: '2025-06-15',
    status: 'final',
    orderedBy: 'Dr. James Wilson',
    facility: 'Springfield Medical Laboratory',
    panels: [
      {
        id: 'panel-010',
        name: 'Complete Blood Count',
        tests: [
          {
            id: 'test-027',
            name: 'White Blood Cell Count',
            loincCode: '6690-2',
            value: 7.2,
            unit: 'K/uL',
            referenceRange: { min: 4.5, max: 11.0, unit: 'K/uL' },
          },
          {
            id: 'test-028',
            name: 'Hemoglobin',
            loincCode: '718-7',
            value: 13.8,
            unit: 'g/dL',
            referenceRange: { min: 12.0, max: 16.0, unit: 'g/dL' },
          },
          {
            id: 'test-029',
            name: 'Hematocrit',
            loincCode: '4544-3',
            value: 41.2,
            unit: '%',
            referenceRange: { min: 37, max: 47, unit: '%' },
          },
          {
            id: 'test-030',
            name: 'Platelet Count',
            loincCode: '777-3',
            value: 245,
            unit: 'K/uL',
            referenceRange: { min: 150, max: 400, unit: 'K/uL' },
          },
        ],
      },
      {
        id: 'panel-011',
        name: 'Comprehensive Metabolic Panel',
        tests: [
          {
            id: 'test-031',
            name: 'Sodium',
            loincCode: '2951-2',
            value: 140,
            unit: 'mEq/L',
            referenceRange: { min: 136, max: 145, unit: 'mEq/L' },
          },
          {
            id: 'test-032',
            name: 'Potassium',
            loincCode: '2823-3',
            value: 4.2,
            unit: 'mEq/L',
            referenceRange: { min: 3.5, max: 5.0, unit: 'mEq/L' },
          },
          {
            id: 'test-033',
            name: 'Creatinine',
            loincCode: '2160-0',
            value: 0.85,
            unit: 'mg/dL',
            referenceRange: { min: 0.6, max: 1.1, unit: 'mg/dL' },
          },
          {
            id: 'test-034',
            name: 'Glucose',
            loincCode: '2345-7',
            value: 92,
            unit: 'mg/dL',
            referenceRange: { min: 70, max: 100, unit: 'mg/dL' },
          },
        ],
      },
    ],
    notes: 'All values within normal limits.',
  },
  
  // Lily's strep test
  {
    id: 'lab-007',
    patientId: 'user-003',
    patientName: 'Lily Jenkins',
    testName: 'Rapid Strep Test',
    testCode: 'LAB-STREP-007',
    date: '2025-03-10',
    status: 'final',
    orderedBy: 'Dr. Priya Patel',
    facility: 'Springfield Pediatrics',
    panels: [
      {
        id: 'panel-012',
        name: 'Microbiology',
        tests: [
          {
            id: 'test-035',
            name: 'Group A Streptococcus Antigen',
            loincCode: '1710-3',
            value: 'Negative',
            unit: '',
            notes: 'Rapid antigen detection test',
          },
        ],
      },
    ],
    notes: 'Viral pharyngitis. Supportive care recommended.',
  },
  
  // Lily's allergy testing
  {
    id: 'lab-008',
    patientId: 'user-003',
    patientName: 'Lily Jenkins',
    testName: 'Allergy Panel - Food',
    testCode: 'LAB-ALLERGY-008',
    date: '2023-06-10',
    status: 'final',
    orderedBy: 'Dr. Priya Patel',
    facility: 'Springfield Allergy Center',
    panels: [
      {
        id: 'panel-013',
        name: 'Food Allergy Panel',
        tests: [
          {
            id: 'test-036',
            name: 'IgE - Shrimp',
            loincCode: '6232-9',
            value: 45.2,
            unit: 'kU/L',
            referenceRange: { min: 0, max: 0.35, unit: 'kU/L' },
            flag: 'abnormal',
            notes: 'Class 3 - Clinically significant',
          },
          {
            id: 'test-037',
            name: 'IgE - Crab',
            loincCode: '6232-9',
            value: 38.5,
            unit: 'kU/L',
            referenceRange: { min: 0, max: 0.35, unit: 'kU/L' },
            flag: 'abnormal',
            notes: 'Class 3 - Clinically significant',
          },
          {
            id: 'test-038',
            name: 'IgE - Peanut',
            loincCode: '6232-9',
            value: 0.2,
            unit: 'kU/L',
            referenceRange: { min: 0, max: 0.35, unit: 'kU/L' },
          },
          {
            id: 'test-039',
            name: 'IgE - Egg',
            loincCode: '6232-9',
            value: 0.1,
            unit: 'kU/L',
            referenceRange: { min: 0, max: 0.35, unit: 'kU/L' },
          },
        ],
      },
    ],
    notes: 'Positive for shellfish. Strict avoidance recommended. Epinephrine auto-injector prescribed.',
  },
  
  // David's pending labs
  {
    id: 'lab-009',
    patientId: 'user-002',
    patientName: 'David Jenkins',
    testName: 'Diabetes Follow-up Panel',
    testCode: 'LAB-DIAB-009',
    date: '2025-10-28',
    status: 'pending',
    orderedBy: 'Dr. Maria Martinez',
    facility: 'Springfield Medical Laboratory',
    panels: [
      {
        id: 'panel-014',
        name: 'Glucose Metabolism',
        tests: [
          {
            id: 'test-040',
            name: 'Hemoglobin A1c',
            loincCode: '4548-4',
            unit: '%',
            referenceRange: { min: 4.0, max: 5.6, unit: '%' },
          },
          {
            id: 'test-041',
            name: 'Fasting Glucose',
            loincCode: '1558-6',
            unit: 'mg/dL',
            referenceRange: { min: 70, max: 100, unit: 'mg/dL' },
          },
        ],
      },
    ],
    notes: 'Scheduled for October 28, 2025',
  },
  
  // Sarah's vitamin D
  {
    id: 'lab-010',
    patientId: 'user-001',
    patientName: 'Sarah Jenkins',
    testName: 'Vitamin D Level',
    testCode: 'LAB-VTD-010',
    date: '2025-02-15',
    status: 'final',
    orderedBy: 'Dr. James Wilson',
    facility: 'Springfield Medical Laboratory',
    panels: [
      {
        id: 'panel-015',
        name: 'Vitamins',
        tests: [
          {
            id: 'test-042',
            name: 'Vitamin D, 25-Hydroxy',
            loincCode: '1989-3',
            value: 28,
            unit: 'ng/mL',
            referenceRange: { min: 30, max: 100, unit: 'ng/mL' },
            flag: 'low',
            notes: 'Insufficient. Recommend supplementation.',
          },
        ],
      },
    ],
    notes: 'Started on Vitamin D3 2000 IU daily.',
  },
];

// Helper functions
export function getLabResultsByPatient(patientId: string): LabResult[] {
  return labResults.filter(r => r.patientId === patientId);
}

export function getLabResultsByStatus(status: string): LabResult[] {
  return labResults.filter(r => r.status === status);
}

export function getLabResultById(id: string): LabResult | undefined {
  return labResults.find(r => r.id === id);
}

export function getRecentLabResults(limit: number = 5): LabResult[] {
  return labResults
    .filter(r => r.status === 'final')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}

export function getAbnormalLabResults(): LabResult[] {
  return labResults.filter(r => 
    r.status === 'final' &&
    r.panels.some(panel => 
      panel.tests.some(test => test.flag)
    )
  );
}

export function searchLabResults(query: string): LabResult[] {
  const lowerQuery = query.toLowerCase();
  return labResults.filter(r => 
    r.testName.toLowerCase().includes(lowerQuery) ||
    r.patientName.toLowerCase().includes(lowerQuery)
  );
}

export function getLabResultsByDateRange(start: string, end: string): LabResult[] {
  return labResults.filter(r => {
    const labDate = new Date(r.date);
    return labDate >= new Date(start) && labDate <= new Date(end);
  });
}
