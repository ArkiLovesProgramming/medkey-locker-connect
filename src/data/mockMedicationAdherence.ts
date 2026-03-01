import { MedicationAdherence, AdherenceSummary } from '@/types';

// Generate adherence records for the past 30 days
function generateAdherenceRecords(
  prescriptionId: string,
  medicationId: string,
  medicationName: string,
  patientId: string,
  patientName: string,
  frequency: string,
  startDate: string,
  days: number = 30
): MedicationAdherence[] {
  const records: MedicationAdherence[] = [];
  const start = new Date(startDate);
  
  for (let i = 0; i < days; i++) {
    const date = new Date(start);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    
    // Determine number of doses per day based on frequency
    let dosesPerDay = 1;
    if (frequency.includes('twice') || frequency.includes('2 times') || frequency.includes('Every 12 hours')) {
      dosesPerDay = 2;
    } else if (frequency.includes('3 times') || frequency.includes('Every 8 hours')) {
      dosesPerDay = 3;
    } else if (frequency.includes('4 times') || frequency.includes('Every 6 hours')) {
      dosesPerDay = 4;
    }
    
    for (let dose = 0; dose < dosesPerDay; dose++) {
      const scheduledTime = dose === 0 ? '08:00' : dose === 1 ? '16:00' : dose === 2 ? '22:00' : '06:00';
      
      // Simulate adherence patterns (85-95% adherence rate)
      const random = Math.random();
      let status: MedicationAdherence['status'];
      let takenAt: string | undefined;
      
      if (random > 0.1) {
        // Taken on time (80% chance)
        status = 'taken';
        takenAt = `${dateStr}T${scheduledTime}:00Z`;
      } else if (random > 0.05) {
        // Late (5% chance)
        status = 'late';
        const lateHour = parseInt(scheduledTime.split(':')[0]) + 2;
        takenAt = `${dateStr}T${lateHour.toString().padStart(2, '0')}:${scheduledTime.split(':')[1]}:00Z`;
      } else {
        // Missed (5% chance)
        status = 'missed';
      }
      
      records.push({
        id: `adh-${prescriptionId}-${dateStr}-${dose}`,
        prescriptionId,
        medicationId,
        medicationName,
        patientId,
        patientName,
        scheduledDate: dateStr,
        scheduledTime,
        takenAt,
        status,
        doseTaken: status === 'taken' || status === 'late' ? 1 : 0,
        doseScheduled: 1,
        notes: status === 'late' ? 'Taken 2 hours late' : status === 'missed' ? 'Forgot to take' : undefined,
      });
    }
  }
  
  return records;
}

// Medication adherence tracking database
export const medicationAdherence: MedicationAdherence[] = [
  // Generate records for Sarah's Lisinopril (once daily)
  ...generateAdherenceRecords(
    'rx-003',
    'med-004',
    'Lisinopril',
    'user-001',
    'Sarah Jenkins',
    'Once daily in the morning',
    '2025-09-20',
    30
  ),
  
  // Generate records for Sarah's Cetirizine (once daily)
  ...generateAdherenceRecords(
    'rx-005',
    'med-008',
    'Cetirizine',
    'user-001',
    'Sarah Jenkins',
    'Once daily',
    '2025-09-20',
    30
  ),
  
  // Generate records for David's Atorvastatin (once daily)
  ...generateAdherenceRecords(
    'rx-002',
    'med-003',
    'Atorvastatin',
    'user-002',
    'David Jenkins',
    'Once daily in the evening',
    '2025-09-20',
    30
  ),
  
  // Generate records for David's Metformin (twice daily)
  ...generateAdherenceRecords(
    'rx-004',
    'med-011',
    'Metformin',
    'user-002',
    'David Jenkins',
    'Twice daily with meals',
    '2025-09-20',
    30
  ),
  
  // Generate records for Lily's Amoxicillin (3 times daily, shorter course)
  ...generateAdherenceRecords(
    'rx-001',
    'med-001',
    'Amoxicillin',
    'user-003',
    'Lily Jenkins',
    'Every 8 hours (3 times daily)',
    '2025-10-14',
    7
  ),
  
  // Additional specific records for demonstration
  {
    id: 'adh-001',
    prescriptionId: 'rx-002',
    medicationId: 'med-003',
    medicationName: 'Atorvastatin',
    patientId: 'user-002',
    patientName: 'David Jenkins',
    scheduledDate: '2025-10-20',
    scheduledTime: '20:00',
    takenAt: '2025-10-20T20:00:00Z',
    status: 'taken',
    doseTaken: 1,
    doseScheduled: 1,
    notes: 'Taken with evening meal',
  },
  {
    id: 'adh-002',
    prescriptionId: 'rx-002',
    medicationId: 'med-003',
    medicationName: 'Atorvastatin',
    patientId: 'user-002',
    patientName: 'David Jenkins',
    scheduledDate: '2025-10-19',
    scheduledTime: '20:00',
    takenAt: '2025-10-19T22:15:00Z',
    status: 'late',
    doseTaken: 1,
    doseScheduled: 1,
    notes: 'Forgot until after TV show',
  },
  {
    id: 'adh-003',
    prescriptionId: 'rx-002',
    medicationId: 'med-003',
    medicationName: 'Atorvastatin',
    patientId: 'user-002',
    patientName: 'David Jenkins',
    scheduledDate: '2025-10-15',
    scheduledTime: '20:00',
    status: 'missed',
    doseTaken: 0,
    doseScheduled: 1,
    notes: 'Out of town, forgot to bring medication',
  },
  {
    id: 'adh-004',
    prescriptionId: 'rx-004',
    medicationId: 'med-011',
    medicationName: 'Metformin',
    patientId: 'user-002',
    patientName: 'David Jenkins',
    scheduledDate: '2025-10-21',
    scheduledTime: '08:00',
    takenAt: '2025-10-21T08:00:00Z',
    status: 'taken',
    doseTaken: 1,
    doseScheduled: 1,
    notes: 'Taken with breakfast',
  },
  {
    id: 'adh-005',
    prescriptionId: 'rx-004',
    medicationId: 'med-011',
    medicationName: 'Metformin',
    patientId: 'user-002',
    patientName: 'David Jenkins',
    scheduledDate: '2025-10-21',
    scheduledTime: '18:00',
    takenAt: '2025-10-21T18:00:00Z',
    status: 'taken',
    doseTaken: 1,
    doseScheduled: 1,
    notes: 'Taken with dinner',
  },
  {
    id: 'adh-006',
    prescriptionId: 'rx-003',
    medicationId: 'med-004',
    medicationName: 'Lisinopril',
    patientId: 'user-001',
    patientName: 'Sarah Jenkins',
    scheduledDate: '2025-10-21',
    scheduledTime: '09:00',
    takenAt: '2025-10-21T09:00:00Z',
    status: 'taken',
    doseTaken: 1,
    doseScheduled: 1,
  },
  {
    id: 'adh-007',
    prescriptionId: 'rx-003',
    medicationId: 'med-004',
    medicationName: 'Lisinopril',
    patientId: 'user-001',
    patientName: 'Sarah Jenkins',
    scheduledDate: '2025-10-20',
    scheduledTime: '09:00',
    takenAt: '2025-10-20T09:00:00Z',
    status: 'taken',
    doseTaken: 1,
    doseScheduled: 1,
  },
  {
    id: 'adh-008',
    prescriptionId: 'rx-003',
    medicationId: 'med-004',
    medicationName: 'Lisinopril',
    patientId: 'user-001',
    patientName: 'Sarah Jenkins',
    scheduledDate: '2025-10-18',
    scheduledTime: '09:00',
    status: 'missed',
    doseTaken: 0,
    doseScheduled: 1,
    notes: 'Busy morning, completely forgot',
  },
  {
    id: 'adh-009',
    prescriptionId: 'rx-001',
    medicationId: 'med-001',
    medicationName: 'Amoxicillin',
    patientId: 'user-003',
    patientName: 'Lily Jenkins',
    scheduledDate: '2025-10-20',
    scheduledTime: '08:00',
    takenAt: '2025-10-20T08:00:00Z',
    status: 'taken',
    doseTaken: 1,
    doseScheduled: 1,
    notes: 'Taken with breakfast',
  },
  {
    id: 'adh-010',
    prescriptionId: 'rx-001',
    medicationId: 'med-001',
    medicationName: 'Amoxicillin',
    patientId: 'user-003',
    patientName: 'Lily Jenkins',
    scheduledDate: '2025-10-20',
    scheduledTime: '16:00',
    takenAt: '2025-10-20T16:00:00Z',
    status: 'taken',
    doseTaken: 1,
    doseScheduled: 1,
    notes: 'After school snack',
  },
  {
    id: 'adh-011',
    prescriptionId: 'rx-001',
    medicationId: 'med-001',
    medicationName: 'Amoxicillin',
    patientId: 'user-003',
    patientName: 'Lily Jenkins',
    scheduledDate: '2025-10-20',
    scheduledTime: '22:00',
    takenAt: '2025-10-20T22:00:00Z',
    status: 'taken',
    doseTaken: 1,
    doseScheduled: 1,
    notes: 'Before bedtime',
  },
];

// Pre-calculated adherence summaries
export const adherenceSummaries: AdherenceSummary[] = [
  {
    medicationId: 'med-003',
    medicationName: 'Atorvastatin',
    patientId: 'user-002',
    periodStart: '2025-09-21',
    periodEnd: '2025-10-20',
    dosesScheduled: 30,
    dosesTaken: 28,
    adherenceRate: 93.3,
    missedDoses: 2,
    lateDoses: 3,
  },
  {
    medicationId: 'med-011',
    medicationName: 'Metformin',
    patientId: 'user-002',
    periodStart: '2025-09-21',
    periodEnd: '2025-10-20',
    dosesScheduled: 60,
    dosesTaken: 56,
    adherenceRate: 93.3,
    missedDoses: 3,
    lateDoses: 4,
  },
  {
    medicationId: 'med-004',
    medicationName: 'Lisinopril',
    patientId: 'user-001',
    periodStart: '2025-09-21',
    periodEnd: '2025-10-20',
    dosesScheduled: 30,
    dosesTaken: 28,
    adherenceRate: 93.3,
    missedDoses: 2,
    lateDoses: 1,
  },
  {
    medicationId: 'med-008',
    medicationName: 'Cetirizine',
    patientId: 'user-001',
    periodStart: '2025-09-21',
    periodEnd: '2025-10-20',
    dosesScheduled: 30,
    dosesTaken: 29,
    adherenceRate: 96.7,
    missedDoses: 1,
    lateDoses: 0,
  },
  {
    medicationId: 'med-001',
    medicationName: 'Amoxicillin',
    patientId: 'user-003',
    periodStart: '2025-10-14',
    periodEnd: '2025-10-20',
    dosesScheduled: 21,
    dosesTaken: 21,
    adherenceRate: 100.0,
    missedDoses: 0,
    lateDoses: 0,
  },
];

// Helper functions
export function getAdherenceByPatient(patientId: string): MedicationAdherence[] {
  return medicationAdherence.filter(a => a.patientId === patientId);
}

export function getAdherenceByPrescription(prescriptionId: string): MedicationAdherence[] {
  return medicationAdherence.filter(a => a.prescriptionId === prescriptionId);
}

export function getAdherenceByMedication(medicationId: string): MedicationAdherence[] {
  return medicationAdherence.filter(a => a.medicationId === medicationId);
}

export function getAdherenceByDateRange(start: string, end: string): MedicationAdherence[] {
  return medicationAdherence.filter(a => {
    const adherenceDate = new Date(a.scheduledDate);
    return adherenceDate >= new Date(start) && adherenceDate <= new Date(end);
  });
}

export function getAdherenceByStatus(status: string): MedicationAdherence[] {
  return medicationAdherence.filter(a => a.status === status);
}

export function getAdherenceSummaryByPatient(patientId: string): AdherenceSummary[] {
  return adherenceSummaries.filter(s => s.patientId === patientId);
}

export function calculateAdherenceRate(
  records: MedicationAdherence[]
): { scheduled: number; taken: number; missed: number; late: number; rate: number } {
  const scheduled = records.length;
  const taken = records.filter(r => r.status === 'taken').length;
  const missed = records.filter(r => r.status === 'missed').length;
  const late = records.filter(r => r.status === 'late').length;
  const rate = scheduled > 0 ? parseFloat(((taken + late) / scheduled * 100).toFixed(1)) : 0;
  
  return { scheduled, taken, missed, late, rate };
}

export function getAdherenceById(id: string): MedicationAdherence | undefined {
  return medicationAdherence.find(a => a.id === id);
}

export function getMissedDoses(patientId?: string): MedicationAdherence[] {
  let missed = medicationAdherence.filter(a => a.status === 'missed');
  if (patientId) {
    missed = missed.filter(a => a.patientId === patientId);
  }
  return missed.sort((a, b) => new Date(b.scheduledDate).getTime() - new Date(a.scheduledDate).getTime());
}

export function getAdherenceTrend(
  patientId: string,
  medicationId: string,
  weeks: number = 4
): Array<{ week: number; rate: number; dosesTaken: number; dosesScheduled: number }> {
  const trends: Array<{ week: number; rate: number; dosesTaken: number; dosesScheduled: number }> = [];
  const today = new Date();
  
  for (let i = 0; i < weeks; i++) {
    const weekStart = new Date(today);
    weekStart.setDate(weekStart.getDate() - (i + 1) * 7);
    const weekEnd = new Date(today);
    weekEnd.setDate(weekEnd.getDate() - i * 7);
    
    const weekRecords = medicationAdherence.filter(a => {
      const recordDate = new Date(a.scheduledDate);
      return a.patientId === patientId && 
             a.medicationId === medicationId &&
             recordDate >= weekStart && 
             recordDate < weekEnd;
    });
    
    const { taken, late, scheduled, rate } = calculateAdherenceRate(weekRecords);
    
    trends.unshift({
      week: weeks - i,
      rate,
      dosesTaken: taken + late,
      dosesScheduled: scheduled,
    });
  }
  
  return trends;
}
