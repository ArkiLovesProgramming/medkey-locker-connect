/**
 * Generator Utilities
 * Functions for generating IDs, codes, and other data
 */

// Generate unique ID
export const generateId = (prefix: string = ''): string => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 9);
  return `${prefix}${timestamp}${random}`;
};

// Generate prescription number
export const generateRxNumber = (): string => {
  const random = Math.floor(Math.random() * 9000000) + 1000000;
  return `RX-${random}-01`;
};

// Generate order number
export const generateOrderNumber = (): string => {
  const random = Math.floor(Math.random() * 90000) + 10000;
  const suffix = String.fromCharCode(65 + Math.floor(Math.random() * 26)); // A-Z
  return `${random}-${suffix}`;
};

// Generate medication ID
export const generateMedicationId = (): string => {
  return `med-${generateId()}`;
};

// Generate prescription ID
export const generatePrescriptionId = (): string => {
  return `rx-${generateId()}`;
};

// Generate user ID
export const generateUserId = (): string => {
  return `user-${generateId()}`;
};

// Generate chat message ID
export const generateMessageId = (): string => {
  return `msg-${generateId()}`;
};

// Generate conversation ID
export const generateConversationId = (): string => {
  return `chat-${generateId()}`;
};

// Generate notification ID
export const generateNotificationId = (): string => {
  return `notif-${generateId()}`;
};

// Generate QR code pattern (19x19 grid)
export const generateQRCodePattern = (seed?: string): number[][] => {
  const pattern: number[][] = [];
  const seedValue = seed || Math.random().toString();
  const hash = seedValue.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
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
};

// Convert QR pattern to string representation
export const qrPatternToString = (pattern: number[][]): string => {
  return pattern.map(row => row.join('')).join('|');
};

// Convert string to QR pattern
export const stringToQRPattern = (patternString: string): number[][] => {
  return patternString.split('|').map(row => 
    row.split('').map(cell => parseInt(cell, 10))
  );
};

// Generate locker number
export const generateLockerNumber = (): string => {
  const section = String.fromCharCode(65 + Math.floor(Math.random() * 5)); // A-E
  const number = Math.floor(Math.random() * 20) + 1;
  return `${section}-${number.toString().padStart(2, '0')}`;
};

// Generate refill request ID
export const generateRefillRequestId = (): string => {
  return `REFILL-${Date.now()}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
};

// Generate transfer ID
export const generateTransferId = (): string => {
  return `TRANSFER-${Date.now()}`;
};

// Generate appointment ID
export const generateAppointmentId = (): string => {
  return `APPT-${Date.now()}`;
};

// Generate delivery tracking number
export const generateTrackingNumber = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let tracking = 'MEDKEY';
  for (let i = 0; i < 10; i++) {
    tracking += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return tracking;
};

// Generate random medication schedule
export const generateMedicationSchedule = (): {
  frequency: string;
  times: string[];
} => {
  const schedules = [
    { frequency: 'Once daily', times: ['8:00 AM'] },
    { frequency: 'Twice daily', times: ['8:00 AM', '8:00 PM'] },
    { frequency: 'Three times daily', times: ['8:00 AM', '2:00 PM', '8:00 PM'] },
    { frequency: 'Four times daily', times: ['8:00 AM', '12:00 PM', '4:00 PM', '8:00 PM'] },
    { frequency: 'Every 6 hours', times: ['6:00 AM', '12:00 PM', '6:00 PM', '12:00 AM'] },
    { frequency: 'Every 8 hours', times: ['6:00 AM', '2:00 PM', '10:00 PM'] },
    { frequency: 'Every 12 hours', times: ['8:00 AM', '8:00 PM'] },
  ];
  
  return schedules[Math.floor(Math.random() * schedules.length)];
};

// Generate random date within range
export const generateRandomDate = (
  startDate: Date = new Date(2024, 0, 1),
  endDate: Date = new Date()
): string => {
  const start = startDate.getTime();
  const end = endDate.getTime();
  const randomTime = start + Math.random() * (end - start);
  return new Date(randomTime).toISOString();
};

// Generate random pharmacy
export const generatePharmacy = (): {
  name: string;
  address: string;
  phone: string;
} => {
  const pharmacies = [
    {
      name: 'MEDkey Pharmacy - Main Street',
      address: '555 Main Street, Springfield, IL 62701',
      phone: '+1 (555) 456-7890',
    },
    {
      name: 'MEDkey Pharmacy - Westside',
      address: '888 West Avenue, Springfield, IL 62702',
      phone: '+1 (555) 456-7891',
    },
    {
      name: 'MEDkey Pharmacy - Downtown',
      address: '123 Central Plaza, Springfield, IL 62703',
      phone: '+1 (555) 456-7892',
    },
    {
      name: 'MEDkey Pharmacy - Northgate',
      address: '999 North Boulevard, Springfield, IL 62704',
      phone: '+1 (555) 456-7893',
    },
  ];
  
  return pharmacies[Math.floor(Math.random() * pharmacies.length)];
};

// Generate random prescriber
export const generatePrescriber = (): {
  name: string;
  specialty: string;
  npi: string;
} => {
  const firstNames = ['James', 'Maria', 'Robert', 'Jennifer', 'Michael', 'Linda', 'William', 'Elizabeth'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis'];
  const specialties = ['Family Medicine', 'Internal Medicine', 'Pediatrics', 'Cardiology', 'Endocrinology'];
  
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const specialty = specialties[Math.floor(Math.random() * specialties.length)];
  const npi = `${Math.floor(Math.random() * 9000000000) + 1000000000}`;
  
  return {
    name: `Dr. ${lastName}, ${firstName.charAt(0)}.`,
    specialty,
    npi,
  };
};

// Generate random insurance member ID
export const generateMemberId = (): string => {
  const prefix = ['BCB', 'AET', 'UNI', 'HUM', 'CEN'];
  const randomPrefix = prefix[Math.floor(Math.random() * prefix.length)];
  const randomNum = Math.floor(Math.random() * 900000000) + 100000000;
  return `${randomPrefix}${randomNum}`;
};

// Generate chat conversation starter
export const generateConversationStarter = (medicationName?: string): string => {
  const starters = [
    `Hi, I have a question about my ${medicationName || 'medication'}.`,
    `Hello, I need help with my prescription.`,
    `Good morning, I'd like to know more about side effects.`,
    `Hi there, when will my refill be ready?`,
    `Hello, can you help me understand the dosage instructions?`,
  ];
  
  return starters[Math.floor(Math.random() * starters.length)];
};

// Generate notification message
export const generateNotificationMessage = (
  type: 'prescription-ready' | 'refill-reminder' | 'medication-reminder' | 'message',
  medicationName?: string
): string => {
  const messages = {
    'prescription-ready': `Your ${medicationName || 'prescription'} is ready for pickup at MEDkey locker.`,
    'refill-reminder': `Time to refill your ${medicationName || 'medication'}. Request your refill now.`,
    'medication-reminder': `It's time to take your ${medicationName || 'medication'}.`,
    'message': `You have a new message from your pharmacist.`,
  };
  
  return messages[type];
};

// Generate random adherence rate
export const generateAdherenceRate = (min: number = 75, max: number = 100): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Generate color from string (for avatars, etc.)
export const generateColorFromString = (str: string): string => {
  const colors = [
    '#0D9488', // teal
    '#DC2626', // red
    '#2563EB', // blue
    '#16A34A', // green
    '#EA580C', // orange
    '#9333EA', // purple
    '#DB2777', // pink
    '#0891B2', // cyan
  ];
  
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const index = Math.abs(hash) % colors.length;
  return colors[index];
};
