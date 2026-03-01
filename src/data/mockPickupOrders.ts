import { PickupOrder, PickupOrderItem, Pharmacy } from '@/types';
import { pharmacies } from './mockPrescriptions';

// Generate QR code pattern (simple 19x19 grid)
function generateQRCodePattern(seed: string): number[][] {
  const pattern: number[][] = [];
  const hash = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  for (let row = 0; row < 19; row++) {
    const rowData: number[] = [];
    for (let col = 0; col < 19; col++) {
      // Create position detection patterns (corners)
      const isTopLeft = row < 7 && col < 7;
      const isTopRight = row < 7 && col >= 12;
      const isBottomLeft = row >= 12 && col < 7;
      
      if (isTopLeft || isTopRight || isBottomLeft) {
        // Create finder patterns
        const inOuter = row === 0 || row === 6 || col === 0 || col === 6;
        const inMiddle = row >= 2 && row <= 4 && col >= 2 && col <= 4;
        rowData.push((inOuter || inMiddle) ? 1 : 0);
      } else {
        // Generate pseudo-random data based on seed
        const value = ((hash * (row + 1) * (col + 1)) % 100) > 50 ? 1 : 0;
        rowData.push(value);
      }
    }
    pattern.push(rowData);
  }
  
  return pattern;
}

// Convert QR pattern to string representation
function qrPatternToString(pattern: number[][]): string {
  return pattern.map(row => row.join('')).join('|');
}

// Active pickup orders
export const pickupOrders: PickupOrder[] = [
  {
    id: 'order-001',
    orderNumber: '29384-B',
    status: 'ready',
    items: [
      {
        prescriptionId: 'rx-001',
        medicationName: 'Amoxicillin 500mg',
        quantity: 14,
        patientName: 'Lily Jenkins',
      },
    ],
    qrCode: qrPatternToString(generateQRCodePattern('order-001')),
    qrCodeExpiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(), // 15 minutes from now
    lockerNumber: 'A-12',
    estimatedReadyTime: '2025-10-21T14:00:00Z',
    pharmacy: pharmacies['medkey-main'],
    createdAt: '2025-10-21T10:30:00Z',
  },
  {
    id: 'order-002',
    orderNumber: '29385-A',
    status: 'ready',
    items: [
      {
        prescriptionId: 'rx-002',
        medicationName: 'Atorvastatin 20mg',
        quantity: 90,
        patientName: 'David Jenkins',
      },
      {
        prescriptionId: 'rx-004',
        medicationName: 'Metformin 500mg',
        quantity: 180,
        patientName: 'David Jenkins',
      },
    ],
    qrCode: qrPatternToString(generateQRCodePattern('order-002')),
    qrCodeExpiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
    lockerNumber: 'B-05',
    estimatedReadyTime: '2025-10-21T15:00:00Z',
    pharmacy: pharmacies['medkey-main'],
    createdAt: '2025-10-21T11:00:00Z',
  },
  {
    id: 'order-003',
    orderNumber: '29380-C',
    status: 'picked-up',
    items: [
      {
        prescriptionId: 'rx-007',
        medicationName: 'Levothyroxine 50mcg',
        quantity: 90,
        patientName: 'Sarah Jenkins',
      },
    ],
    qrCode: qrPatternToString(generateQRCodePattern('order-003')),
    qrCodeExpiresAt: '2025-10-10T14:00:00Z',
    lockerNumber: 'A-08',
    estimatedReadyTime: '2025-10-10T14:00:00Z',
    actualPickupTime: '2025-10-10T16:30:00Z',
    pharmacy: pharmacies['medkey-main'],
    createdAt: '2025-10-10T10:00:00Z',
  },
  {
    id: 'order-004',
    orderNumber: '29375-D',
    status: 'picked-up',
    items: [
      {
        prescriptionId: 'rx-005',
        medicationName: 'Cetirizine 10mg',
        quantity: 30,
        patientName: 'Sarah Jenkins',
      },
    ],
    qrCode: qrPatternToString(generateQRCodePattern('order-004')),
    qrCodeExpiresAt: '2025-10-15T14:00:00Z',
    lockerNumber: 'A-15',
    estimatedReadyTime: '2025-10-15T14:00:00Z',
    actualPickupTime: '2025-10-15T18:45:00Z',
    pharmacy: pharmacies['medkey-main'],
    createdAt: '2025-10-15T09:30:00Z',
  },
  {
    id: 'order-005',
    orderNumber: '29390-E',
    status: 'processing',
    items: [
      {
        prescriptionId: 'rx-003',
        medicationName: 'Lisinopril 10mg',
        quantity: 90,
        patientName: 'Sarah Jenkins',
      },
    ],
    qrCode: qrPatternToString(generateQRCodePattern('order-005')),
    qrCodeExpiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
    lockerNumber: 'TBD',
    estimatedReadyTime: '2025-10-22T14:00:00Z',
    pharmacy: pharmacies['medkey-main'],
    createdAt: '2025-10-21T14:00:00Z',
  },
  {
    id: 'order-006',
    orderNumber: '29391-F',
    status: 'processing',
    items: [
      {
        prescriptionId: 'rx-006',
        medicationName: 'Metoprolol 50mg',
        quantity: 60,
        patientName: 'David Jenkins',
      },
    ],
    qrCode: qrPatternToString(generateQRCodePattern('order-006')),
    qrCodeExpiresAt: new Date(Date.now() + 15 * 60 * 1000).toISOString(),
    lockerNumber: 'TBD',
    estimatedReadyTime: '2025-10-23T14:00:00Z',
    pharmacy: pharmacies['medkey-main'],
    createdAt: '2025-10-21T15:30:00Z',
  },
];

// Locker locations map
export const lockerLocations: Record<string, string> = {
  'A-12': 'Section A, Row 2, Locker 12 - Ground Floor',
  'B-05': 'Section B, Row 1, Locker 5 - Ground Floor',
  'A-08': 'Section A, Row 2, Locker 8 - Ground Floor',
  'A-15': 'Section A, Row 3, Locker 15 - Ground Floor',
};

// Helper functions
export function getOrderByNumber(orderNumber: string): PickupOrder | undefined {
  return pickupOrders.find(o => o.orderNumber === orderNumber);
}

export function getOrderByLockerNumber(lockerNumber: string): PickupOrder | undefined {
  return pickupOrders.find(o => o.lockerNumber === lockerNumber);
}

export function getActiveOrders(): PickupOrder[] {
  return pickupOrders.filter(o => o.status === 'ready' || o.status === 'processing');
}

export function getReadyOrders(): PickupOrder[] {
  return pickupOrders.filter(o => o.status === 'ready');
}

export function getOrdersByPatient(patientName: string): PickupOrder[] {
  return pickupOrders.filter(o => 
    o.items.some(item => item.patientName === patientName)
  );
}

export function generateNewQRCode(orderId: string): string {
  return qrPatternToString(generateQRCodePattern(`${orderId}-${Date.now()}`));
}

export function isQRCodeValid(qrCodeExpiresAt: string): boolean {
  return new Date(qrCodeExpiresAt) > new Date();
}

export function getLockerLocation(lockerNumber: string): string {
  return lockerLocations[lockerNumber] || 'Location will be provided when ready';
}
