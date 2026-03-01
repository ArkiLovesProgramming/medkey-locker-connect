/**
 * Formatting Utilities
 * Common formatting functions for the application
 */

// Date formatting
export const formatDate = (date: string | Date, options?: Intl.DateTimeFormatOptions): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  
  return dateObj.toLocaleDateString('en-US', options || defaultOptions);
};

export const formatDateTime = (date: string | Date): string => {
  return formatDate(date, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
};

export const formatTime = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });
};

export const formatRelativeTime = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - dateObj.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  
  return formatDate(date);
};

// Currency formatting
export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

export const formatPrice = (price: number): string => {
  return formatCurrency(price);
};

// Medication formatting
export const formatDosage = (medication: {
  name: string;
  strength: string;
  form: string;
}): string => {
  return `${medication.name} ${medication.strength} ${medication.form}`;
};

export const formatMedicationSchedule = (frequency: string, instructions?: string): string => {
  if (instructions) {
    return `${frequency} - ${instructions}`;
  }
  return frequency;
};

// Prescription formatting
export const formatRxNumber = (rxNumber: string): string => {
  // Remove common prefixes and format
  const clean = rxNumber.replace(/^(RX|Rx|#)/i, '');
  return `#${clean}`;
};

export const formatPrescriptionStatus = (status: string): string => {
  const statusMap: Record<string, string> = {
    'pending': 'Pending',
    'active': 'Active',
    'ready': 'Ready for Pickup',
    'picked-up': 'Picked Up',
    'expired': 'Expired',
    'cancelled': 'Cancelled',
    'needs-approval': 'Needs Approval',
  };
  
  return statusMap[status] || status;
};

// Name formatting
export const formatFullName = (firstName: string, lastName: string): string => {
  return `${firstName} ${lastName}`.trim();
};

export const formatNameWithInitial = (firstName: string, lastName: string): string => {
  return `${firstName} ${lastName.charAt(0)}.`;
};

export const getInitials = (firstName: string, lastName: string): string => {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
};

// Phone number formatting
export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '');
  
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  
  if (cleaned.length === 11 && cleaned.charAt(0) === '1') {
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  }
  
  return phone;
};

// Percentage formatting
export const formatPercentage = (value: number, decimals: number = 0): string => {
  return `${value.toFixed(decimals)}%`;
};

export const formatCoveragePercentage = (coverage: number, total: number): string => {
  const percentage = total > 0 ? (coverage / total) * 100 : 0;
  return formatPercentage(percentage, 1);
};

// Quantity formatting
export const formatQuantity = (quantity: number, unit?: string): string => {
  if (unit) {
    return `${quantity} ${unit}`;
  }
  return quantity.toString();
};

// Time duration formatting
export const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours === 0) return `${mins}m`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
};

// Countdown formatting (for QR codes, etc.)
export const formatCountdown = (milliseconds: number): string => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

// File size formatting
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

// Address formatting
export const formatAddress = (address: {
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
}): string => {
  const parts = [
    address.street,
    address.city && address.state ? `${address.city}, ${address.state}` : address.city || address.state,
    address.zip,
  ].filter(Boolean);
  
  return parts.join(' ');
};

// Insurance formatting
export const formatInsuranceCard = (provider: string, memberId: string): string => {
  return `${provider} • ${memberId}`;
};

// Order number formatting
export const formatOrderNumber = (orderNumber: string): string => {
  return `Order #${orderNumber}`;
};

// Locker location formatting
export const formatLockerLocation = (section: string, row: string, number: string): string => {
  return `Section ${section}, Row ${row}, Locker ${number}`;
};

// Message timestamp formatting
export const formatMessageTime = (timestamp: string): string => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    return formatTime(date);
  } else if (diffDays === 1) {
    return 'Yesterday';
  } else if (diffDays < 7) {
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  } else {
    return formatDate(date);
  }
};

// Notification time formatting
export const formatNotificationTime = (timestamp: string): string => {
  return formatRelativeTime(timestamp);
};
