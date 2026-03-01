import { VitalSign, VitalReading } from '@/types';

// Comprehensive vital signs database
export const vitalSigns: VitalSign[] = [
  // Sarah's recent vital signs
  {
    id: 'vital-001',
    patientId: 'user-001',
    patientName: 'Sarah Jenkins',
    date: '2025-10-21T08:00:00Z',
    source: 'manual',
    readings: [
      {
        type: 'blood-pressure',
        systolic: 128,
        diastolic: 82,
        unit: 'mmHg',
        position: 'sitting',
        arm: 'left',
      },
      {
        type: 'heart-rate',
        value: 72,
        unit: 'bpm',
        position: 'sitting',
      },
      {
        type: 'weight',
        value: 142,
        unit: 'lbs',
      },
    ],
    notes: 'Morning readings. Feeling well.',
  },
  {
    id: 'vital-002',
    patientId: 'user-001',
    patientName: 'Sarah Jenkins',
    date: '2025-10-20T08:00:00Z',
    source: 'manual',
    readings: [
      {
        type: 'blood-pressure',
        systolic: 125,
        diastolic: 80,
        unit: 'mmHg',
        position: 'sitting',
        arm: 'right',
      },
      {
        type: 'heart-rate',
        value: 70,
        unit: 'bpm',
        position: 'sitting',
      },
      {
        type: 'weight',
        value: 143,
        unit: 'lbs',
      },
    ],
  },
  {
    id: 'vital-003',
    patientId: 'user-001',
    patientName: 'Sarah Jenkins',
    date: '2025-10-19T08:00:00Z',
    source: 'manual',
    readings: [
      {
        type: 'blood-pressure',
        systolic: 130,
        diastolic: 84,
        unit: 'mmHg',
        position: 'sitting',
        arm: 'left',
      },
      {
        type: 'heart-rate',
        value: 74,
        unit: 'bpm',
        position: 'sitting',
      },
    ],
  },
  {
    id: 'vital-004',
    patientId: 'user-001',
    patientName: 'Sarah Jenkins',
    date: '2025-10-15T14:30:00Z',
    source: 'clinic',
    readings: [
      {
        type: 'blood-pressure',
        systolic: 132,
        diastolic: 85,
        unit: 'mmHg',
        position: 'sitting',
        arm: 'left',
      },
      {
        type: 'heart-rate',
        value: 76,
        unit: 'bpm',
        position: 'sitting',
      },
      {
        type: 'temperature',
        value: 98.4,
        unit: '°F',
      },
      {
        type: 'respiratory-rate',
        value: 16,
        unit: 'breaths/min',
      },
      {
        type: 'oxygen-saturation',
        value: 98,
        unit: '%',
        finger: 'right-index',
      },
      {
        type: 'weight',
        value: 143.5,
        unit: 'lbs',
      },
      {
        type: 'height',
        value: 65,
        unit: 'inches',
      },
      {
        type: 'bmi',
        value: 23.8,
        unit: 'kg/m²',
      },
    ],
    notes: 'Annual physical examination. All vitals within normal limits.',
  },
  
  // David's vital signs (with diabetes and hypertension monitoring)
  {
    id: 'vital-005',
    patientId: 'user-002',
    patientName: 'David Jenkins',
    date: '2025-10-21T07:30:00Z',
    source: 'device',
    readings: [
      {
        type: 'blood-pressure',
        systolic: 138,
        diastolic: 88,
        unit: 'mmHg',
        position: 'sitting',
        arm: 'left',
      },
      {
        type: 'heart-rate',
        value: 68,
        unit: 'bpm',
        position: 'sitting',
      },
      {
        type: 'blood-glucose',
        value: 112,
        unit: 'mg/dL',
        notes: 'Fasting',
      },
      {
        type: 'weight',
        value: 198,
        unit: 'lbs',
      },
    ],
    notes: 'Morning readings before breakfast.',
  },
  {
    id: 'vital-006',
    patientId: 'user-002',
    patientName: 'David Jenkins',
    date: '2025-10-20T07:30:00Z',
    source: 'device',
    readings: [
      {
        type: 'blood-pressure',
        systolic: 135,
        diastolic: 86,
        unit: 'mmHg',
        position: 'sitting',
        arm: 'right',
      },
      {
        type: 'heart-rate',
        value: 66,
        unit: 'bpm',
        position: 'sitting',
      },
      {
        type: 'blood-glucose',
        value: 108,
        unit: 'mg/dL',
        notes: 'Fasting',
      },
    ],
  },
  {
    id: 'vital-007',
    patientId: 'user-002',
    patientName: 'David Jenkins',
    date: '2025-10-19T19:00:00Z',
    source: 'device',
    readings: [
      {
        type: 'blood-glucose',
        value: 145,
        unit: 'mg/dL',
        notes: '2 hours after dinner',
      },
    ],
  },
  {
    id: 'vital-008',
    patientId: 'user-002',
    patientName: 'David Jenkins',
    date: '2025-10-18T07:30:00Z',
    source: 'device',
    readings: [
      {
        type: 'blood-pressure',
        systolic: 142,
        diastolic: 90,
        unit: 'mmHg',
        position: 'sitting',
        arm: 'left',
      },
      {
        type: 'heart-rate',
        value: 70,
        unit: 'bpm',
        position: 'sitting',
      },
      {
        type: 'blood-glucose',
        value: 118,
        unit: 'mg/dL',
        notes: 'Fasting',
      },
      {
        type: 'weight',
        value: 199,
        unit: 'lbs',
      },
    ],
    notes: 'BP slightly elevated. Discussed with Dr. Wilson.',
  },
  {
    id: 'vital-009',
    patientId: 'user-002',
    patientName: 'David Jenkins',
    date: '2025-10-10T10:00:00Z',
    source: 'clinic',
    readings: [
      {
        type: 'blood-pressure',
        systolic: 145,
        diastolic: 92,
        unit: 'mmHg',
        position: 'sitting',
        arm: 'left',
      },
      {
        type: 'blood-pressure',
        systolic: 148,
        diastolic: 94,
        unit: 'mmHg',
        position: 'standing',
        arm: 'left',
        notes: 'Orthostatic check',
      },
      {
        type: 'heart-rate',
        value: 72,
        unit: 'bpm',
        position: 'sitting',
      },
      {
        type: 'temperature',
        value: 98.2,
        unit: '°F',
      },
      {
        type: 'weight',
        value: 200,
        unit: 'lbs',
      },
      {
        type: 'height',
        value: 70,
        unit: 'inches',
      },
      {
        type: 'bmi',
        value: 28.7,
        unit: 'kg/m²',
      },
    ],
    notes: 'Cardiology follow-up. BP elevated. Starting Metoprolol.',
  },
  
  // Lily's vital signs (pediatric)
  {
    id: 'vital-010',
    patientId: 'user-003',
    patientName: 'Lily Jenkins',
    date: '2025-10-18T10:30:00Z',
    source: 'clinic',
    readings: [
      {
        type: 'temperature',
        value: 101.2,
        unit: '°F',
        notes: 'Ear infection - fever present',
      },
      {
        type: 'heart-rate',
        value: 95,
        unit: 'bpm',
        position: 'sitting',
      },
      {
        type: 'respiratory-rate',
        value: 20,
        unit: 'breaths/min',
      },
      {
        type: 'oxygen-saturation',
        value: 98,
        unit: '%',
        finger: 'right-middle',
      },
      {
        type: 'weight',
        value: 72,
        unit: 'lbs',
      },
      {
        type: 'height',
        value: 54,
        unit: 'inches',
      },
    ],
    notes: 'Acute otitis media. Prescribed Amoxicillin.',
  },
  {
    id: 'vital-011',
    patientId: 'user-003',
    patientName: 'Lily Jenkins',
    date: '2025-09-15T14:00:00Z',
    source: 'clinic',
    readings: [
      {
        type: 'blood-pressure',
        systolic: 102,
        diastolic: 62,
        unit: 'mmHg',
        position: 'sitting',
        arm: 'right',
      },
      {
        type: 'heart-rate',
        value: 82,
        unit: 'bpm',
        position: 'sitting',
      },
      {
        type: 'respiratory-rate',
        value: 18,
        unit: 'breaths/min',
      },
      {
        type: 'oxygen-saturation',
        value: 99,
        unit: '%',
        finger: 'left-index',
      },
      {
        type: 'peak-flow',
        value: 320,
        unit: 'L/min',
        notes: 'Good for age and height',
      },
      {
        type: 'weight',
        value: 70,
        unit: 'lbs',
      },
      {
        type: 'height',
        value: 53.5,
        unit: 'inches',
      },
    ],
    notes: 'Annual asthma check-up. Lung function good.',
  },
  {
    id: 'vital-012',
    patientId: 'user-003',
    patientName: 'Lily Jenkins',
    date: '2025-06-20T09:00:00Z',
    source: 'manual',
    readings: [
      {
        type: 'temperature',
        value: 98.6,
        unit: '°F',
      },
      {
        type: 'heart-rate',
        value: 88,
        unit: 'bpm',
      },
    ],
    notes: 'Home monitoring - feeling well.',
  },
  
  // Historical vital signs - Sarah
  {
    id: 'vital-013',
    patientId: 'user-001',
    patientName: 'Sarah Jenkins',
    date: '2025-09-15T08:00:00Z',
    source: 'manual',
    readings: [
      {
        type: 'blood-pressure',
        systolic: 122,
        diastolic: 78,
        unit: 'mmHg',
        position: 'sitting',
        arm: 'left',
      },
      {
        type: 'heart-rate',
        value: 68,
        unit: 'bpm',
      },
      {
        type: 'weight',
        value: 140,
        unit: 'lbs',
      },
    ],
  },
  {
    id: 'vital-014',
    patientId: 'user-001',
    patientName: 'Sarah Jenkins',
    date: '2025-08-01T08:00:00Z',
    source: 'manual',
    readings: [
      {
        type: 'blood-pressure',
        systolic: 118,
        diastolic: 76,
        unit: 'mmHg',
        position: 'sitting',
        arm: 'right',
      },
      {
        type: 'heart-rate',
        value: 66,
        unit: 'bpm',
      },
      {
        type: 'weight',
        value: 139,
        unit: 'lbs',
      },
    ],
  },
  
  // Historical vital signs - David
  {
    id: 'vital-015',
    patientId: 'user-002',
    patientName: 'David Jenkins',
    date: '2025-09-01T07:30:00Z',
    source: 'device',
    readings: [
      {
        type: 'blood-pressure',
        systolic: 132,
        diastolic: 84,
        unit: 'mmHg',
        position: 'sitting',
        arm: 'left',
      },
      {
        type: 'heart-rate',
        value: 64,
        unit: 'bpm',
      },
      {
        type: 'blood-glucose',
        value: 105,
        unit: 'mg/dL',
        notes: 'Fasting',
      },
      {
        type: 'weight',
        value: 195,
        unit: 'lbs',
      },
    ],
  },
  {
    id: 'vital-016',
    patientId: 'user-002',
    patientName: 'David Jenkins',
    date: '2025-08-01T07:30:00Z',
    source: 'device',
    readings: [
      {
        type: 'blood-pressure',
        systolic: 130,
        diastolic: 82,
        unit: 'mmHg',
        position: 'sitting',
        arm: 'right',
      },
      {
        type: 'heart-rate',
        value: 62,
        unit: 'bpm',
      },
      {
        type: 'blood-glucose',
        value: 102,
        unit: 'mg/dL',
        notes: 'Fasting',
      },
      {
        type: 'weight',
        value: 193,
        unit: 'lbs',
      },
    ],
  },
  
  // More recent readings for trend analysis
  {
    id: 'vital-017',
    patientId: 'user-001',
    patientName: 'Sarah Jenkins',
    date: '2025-10-18T08:00:00Z',
    source: 'manual',
    readings: [
      {
        type: 'blood-pressure',
        systolic: 126,
        diastolic: 81,
        unit: 'mmHg',
        position: 'sitting',
        arm: 'left',
      },
      {
        type: 'heart-rate',
        value: 71,
        unit: 'bpm',
      },
    ],
  },
  {
    id: 'vital-018',
    patientId: 'user-002',
    patientName: 'David Jenkins',
    date: '2025-10-17T07:30:00Z',
    source: 'device',
    readings: [
      {
        type: 'blood-pressure',
        systolic: 140,
        diastolic: 89,
        unit: 'mmHg',
        position: 'sitting',
        arm: 'left',
      },
      {
        type: 'heart-rate',
        value: 67,
        unit: 'bpm',
      },
      {
        type: 'blood-glucose',
        value: 115,
        unit: 'mg/dL',
        notes: 'Fasting',
      },
    ],
  },
];

// Helper functions
export function getVitalSignsByPatient(patientId: string): VitalSign[] {
  return vitalSigns.filter(v => v.patientId === patientId);
}

export function getVitalSignsByType(type: string): VitalSign[] {
  return vitalSigns.filter(v => 
    v.readings.some(r => r.type === type)
  );
}

export function getVitalSignById(id: string): VitalSign | undefined {
  return vitalSigns.find(v => v.id === id);
}

export function getRecentVitalSigns(limit: number = 10): VitalSign[] {
  return vitalSigns
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}

export function getVitalSignsByDateRange(start: string, end: string): VitalSign[] {
  return vitalSigns.filter(v => {
    const vitalDate = new Date(v.date);
    return vitalDate >= new Date(start) && vitalDate <= new Date(end);
  });
}

export function getLatestVitalReading(patientId: string, vitalType: string): VitalReading | undefined {
  const patientVitals = vitalSigns
    .filter(v => v.patientId === patientId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  for (const vital of patientVitals) {
    const reading = vital.readings.find(r => r.type === vitalType);
    if (reading) {
      return reading;
    }
  }
  return undefined;
}

export function getBloodPressureTrend(patientId: string, days: number = 30): Array<{ date: string; systolic: number; diastolic: number }> {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);
  
  return vitalSigns
    .filter(v => {
      const vitalDate = new Date(v.date);
      return v.patientId === patientId && vitalDate >= cutoffDate;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .map(v => {
      const bpReading = v.readings.find(r => r.type === 'blood-pressure') as any;
      return {
        date: v.date,
        systolic: bpReading?.systolic || 0,
        diastolic: bpReading?.diastolic || 0,
      };
    });
}

export function getGlucoseTrend(patientId: string, days: number = 30): Array<{ date: string; value: number; notes?: string }> {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);
  
  return vitalSigns
    .filter(v => {
      const vitalDate = new Date(v.date);
      return v.patientId === patientId && vitalDate >= cutoffDate;
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .flatMap(v => {
      const glucoseReadings = v.readings.filter(r => r.type === 'blood-glucose');
      return glucoseReadings.map(r => ({
        date: v.date,
        value: r.value as number,
        notes: r.notes,
      }));
    });
}

export function calculateBMI(weight: number, height: number): number {
  // Weight in kg, height in cm
  const weightKg = weight * 0.453592;
  const heightM = (height * 2.54) / 100;
  return parseFloat((weightKg / (heightM * heightM)).toFixed(1));
}

export function getVitalStatistics(patientId: string): Record<string, any> {
  const patientVitals = vitalSigns.filter(v => v.patientId === patientId);
  const latestVital = patientVitals.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
  
  if (!latestVital) {
    return {};
  }
  
  const bpReading = latestVital.readings.find(r => r.type === 'blood-pressure') as any;
  const hrReading = latestVital.readings.find(r => r.type === 'heart-rate');
  const weightReading = latestVital.readings.find(r => r.type === 'weight');
  const tempReading = latestVital.readings.find(r => r.type === 'temperature');
  
  return {
    patientId,
    lastUpdated: latestVital.date,
    bloodPressure: bpReading ? `${bpReading.systolic}/${bpReading.diastolic} mmHg` : 'N/A',
    heartRate: hrReading ? `${hrReading.value} bpm` : 'N/A',
    weight: weightReading ? `${weightReading.value} lbs` : 'N/A',
    temperature: tempReading ? `${tempReading.value} °F` : 'N/A',
  };
}
