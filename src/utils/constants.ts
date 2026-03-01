/**
 * Application Constants
 * Common constants used throughout the application
 */

// ============================================================================
// Medication Categories
// ============================================================================

export const MEDICATION_CATEGORIES = {
  ANTIBIOTIC: 'antibiotic',
  CARDIOVASCULAR: 'cardiovascular',
  PAIN_RELIEF: 'pain-relief',
  ALLERGY: 'allergy',
  DIABETES: 'diabetes',
  MENTAL_HEALTH: 'mental-health',
  HORMONE: 'hormone',
  OTHER: 'other',
} as const;

export type MedicationCategory = typeof MEDICATION_CATEGORIES[keyof typeof MEDICATION_CATEGORIES];

export const MEDICATION_CATEGORY_LABELS: Record<MedicationCategory, string> = {
  [MEDICATION_CATEGORIES.ANTIBIOTIC]: 'Antibiotics',
  [MEDICATION_CATEGORIES.CARDIOVASCULAR]: 'Cardiovascular',
  [MEDICATION_CATEGORIES.PAIN_RELIEF]: 'Pain Relief',
  [MEDICATION_CATEGORIES.ALLERGY]: 'Allergy',
  [MEDICATION_CATEGORIES.DIABETES]: 'Diabetes',
  [MEDICATION_CATEGORIES.MENTAL_HEALTH]: 'Mental Health',
  [MEDICATION_CATEGORIES.HORMONE]: 'Hormones',
  [MEDICATION_CATEGORIES.OTHER]: 'Other',
};

// ============================================================================
// Medication Forms
// ============================================================================

export const MEDICATION_FORMS = {
  TABLET: 'tablet',
  CAPSULE: 'capsule',
  LIQUID: 'liquid',
  INJECTION: 'injection',
  CREAM: 'cream',
  INHALER: 'inhaler',
} as const;

export type MedicationForm = typeof MEDICATION_FORMS[keyof typeof MEDICATION_FORMS];

export const MEDICATION_FORM_LABELS: Record<MedicationForm, string> = {
  [MEDICATION_FORMS.TABLET]: 'Tablet',
  [MEDICATION_FORMS.CAPSULE]: 'Capsule',
  [MEDICATION_FORMS.LIQUID]: 'Liquid',
  [MEDICATION_FORMS.INJECTION]: 'Injection',
  [MEDICATION_FORMS.CREAM]: 'Cream',
  [MEDICATION_FORMS.INHALER]: 'Inhaler',
};

// ============================================================================
// Prescription Status
// ============================================================================

export const PRESCRIPTION_STATUS = {
  PENDING: 'pending',
  ACTIVE: 'active',
  READY: 'ready',
  PICKED_UP: 'picked-up',
  EXPIRED: 'expired',
  CANCELLED: 'cancelled',
  NEEDS_APPROVAL: 'needs-approval',
} as const;

export type PrescriptionStatus = typeof PRESCRIPTION_STATUS[keyof typeof PRESCRIPTION_STATUS];

export const PRESCRIPTION_STATUS_LABELS: Record<PrescriptionStatus, string> = {
  [PRESCRIPTION_STATUS.PENDING]: 'Pending',
  [PRESCRIPTION_STATUS.ACTIVE]: 'Active',
  [PRESCRIPTION_STATUS.READY]: 'Ready for Pickup',
  [PRESCRIPTION_STATUS.PICKED_UP]: 'Picked Up',
  [PRESCRIPTION_STATUS.EXPIRED]: 'Expired',
  [PRESCRIPTION_STATUS.CANCELLED]: 'Cancelled',
  [PRESCRIPTION_STATUS.NEEDS_APPROVAL]: 'Needs Approval',
};

export const PRESCRIPTION_STATUS_COLORS: Record<PrescriptionStatus, string> = {
  [PRESCRIPTION_STATUS.PENDING]: 'bg-amber-100 text-amber-800',
  [PRESCRIPTION_STATUS.ACTIVE]: 'bg-green-100 text-green-800',
  [PRESCRIPTION_STATUS.READY]: 'bg-blue-100 text-blue-800',
  [PRESCRIPTION_STATUS.PICKED_UP]: 'bg-gray-100 text-gray-800',
  [PRESCRIPTION_STATUS.EXPIRED]: 'bg-red-100 text-red-800',
  [PRESCRIPTION_STATUS.CANCELLED]: 'bg-gray-100 text-gray-800',
  [PRESCRIPTION_STATUS.NEEDS_APPROVAL]: 'bg-orange-100 text-orange-800',
};

// ============================================================================
// Pickup Order Status
// ============================================================================

export const PICKUP_STATUS = {
  PROCESSING: 'processing',
  READY: 'ready',
  PICKED_UP: 'picked-up',
  EXPIRED: 'expired',
  CANCELLED: 'cancelled',
} as const;

export type PickupOrderStatus = typeof PICKUP_STATUS[keyof typeof PICKUP_STATUS];

export const PICKUP_STATUS_LABELS: Record<PickupOrderStatus, string> = {
  [PICKUP_STATUS.PROCESSING]: 'Processing',
  [PICKUP_STATUS.READY]: 'Ready for Pickup',
  [PICKUP_STATUS.PICKED_UP]: 'Picked Up',
  [PICKUP_STATUS.EXPIRED]: 'Expired',
  [PICKUP_STATUS.CANCELLED]: 'Cancelled',
};

// ============================================================================
// Notification Types
// ============================================================================

export const NOTIFICATION_TYPES = {
  PRESCRIPTION_READY: 'prescription-ready',
  REFILL_REMINDER: 'refill-reminder',
  MEDICATION_REMINDER: 'medication-reminder',
  APPOINTMENT: 'appointment',
  MESSAGE: 'message',
  DELIVERY: 'delivery',
  GENERAL: 'general',
} as const;

export type NotificationType = typeof NOTIFICATION_TYPES[keyof typeof NOTIFICATION_TYPES];

export const NOTIFICATION_TYPE_LABELS: Record<NotificationType, string> = {
  [NOTIFICATION_TYPES.PRESCRIPTION_READY]: 'Prescription Ready',
  [NOTIFICATION_TYPES.REFILL_REMINDER]: 'Refill Reminder',
  [NOTIFICATION_TYPES.MEDICATION_REMINDER]: 'Medication Reminder',
  [NOTIFICATION_TYPES.APPOINTMENT]: 'Appointment',
  [NOTIFICATION_TYPES.MESSAGE]: 'New Message',
  [NOTIFICATION_TYPES.DELIVERY]: 'Delivery Update',
  [NOTIFICATION_TYPES.GENERAL]: 'General',
};

// ============================================================================
// Priority Levels
// ============================================================================

export const PRIORITY = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent',
} as const;

export type Priority = typeof PRIORITY[keyof typeof PRIORITY];

export const PRIORITY_LABELS: Record<Priority, string> = {
  [PRIORITY.LOW]: 'Low',
  [PRIORITY.MEDIUM]: 'Medium',
  [PRIORITY.HIGH]: 'High',
  [PRIORITY.URGENT]: 'Urgent',
};

export const PRIORITY_COLORS: Record<Priority, string> = {
  [PRIORITY.LOW]: 'bg-blue-100 text-blue-800',
  [PRIORITY.MEDIUM]: 'bg-yellow-100 text-yellow-800',
  [PRIORITY.HIGH]: 'bg-orange-100 text-orange-800',
  [PRIORITY.URGENT]: 'bg-red-100 text-red-800',
};

// ============================================================================
// User Roles
// ============================================================================

export const USER_ROLES = {
  PRIMARY: 'primary',
  MEMBER: 'member',
} as const;

export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];

export const USER_ROLE_LABELS: Record<UserRole, string> = {
  [USER_ROLES.PRIMARY]: 'Primary Account Holder',
  [USER_ROLES.MEMBER]: 'Family Member',
};

// ============================================================================
// Family Relationships
// ============================================================================

export const RELATIONSHIPS = {
  SELF: 'self',
  SPOUSE: 'spouse',
  CHILD: 'child',
  PARENT: 'parent',
  OTHER: 'other',
} as const;

export type Relationship = typeof RELATIONSHIPS[keyof typeof RELATIONSHIPS];

export const RELATIONSHIP_LABELS: Record<Relationship, string> = {
  [RELATIONSHIPS.SELF]: 'Self',
  [RELATIONSHIPS.SPOUSE]: 'Spouse',
  [RELATIONSHIPS.CHILD]: 'Child',
  [RELATIONSHIPS.PARENT]: 'Parent',
  [RELATIONSHIPS.OTHER]: 'Other',
};

// ============================================================================
// Allergy Severity
// ============================================================================

export const ALLERGY_SEVERITY = {
  MILD: 'mild',
  MODERATE: 'moderate',
  SEVERE: 'severe',
} as const;

export type AllergySeverity = typeof ALLERGY_SEVERITY[keyof typeof ALLERGY_SEVERITY];

export const ALLERGY_SEVERITY_LABELS: Record<AllergySeverity, string> = {
  [ALLERGY_SEVERITY.MILD]: 'Mild',
  [ALLERGY_SEVERITY.MODERATE]: 'Moderate',
  [ALLERGY_SEVERITY.SEVERE]: 'Severe',
};

// ============================================================================
// Insurance Coverage Types
// ============================================================================

export const COVERAGE_TYPE = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
} as const;

export type CoverageType = typeof COVERAGE_TYPE[keyof typeof COVERAGE_TYPE];

export const COVERAGE_TYPE_LABELS: Record<CoverageType, string> = {
  [COVERAGE_TYPE.PRIMARY]: 'Primary Insurance',
  [COVERAGE_TYPE.SECONDARY]: 'Secondary Insurance',
};

// ============================================================================
// Message Sender Types
// ============================================================================

export const MESSAGE_SENDER_TYPE = {
  USER: 'user',
  PHARMACIST: 'pharmacist',
  SYSTEM: 'system',
} as const;

export type MessageSenderType = typeof MESSAGE_SENDER_TYPE[keyof typeof MESSAGE_SENDER_TYPE];

// ============================================================================
// Attachment Types
// ============================================================================

export const ATTACHMENT_TYPE = {
  IMAGE: 'image',
  DOCUMENT: 'document',
  PRESCRIPTION: 'prescription',
} as const;

export type AttachmentType = typeof ATTACHMENT_TYPE[keyof typeof ATTACHMENT_TYPE];

// ============================================================================
// Time Constants
// ============================================================================

export const TIME = {
  MS_IN_SECOND: 1000,
  MS_IN_MINUTE: 60000,
  MS_IN_HOUR: 3600000,
  MS_IN_DAY: 86400000,
  QR_CODE_EXPIRY_MINUTES: 15,
  SESSION_TIMEOUT_MINUTES: 30,
  NOTIFICATION_CHECK_INTERVAL_MS: 60000, // 1 minute
} as const;

// ============================================================================
// API Constants
// ============================================================================

export const API = {
  BASE_URL: 'https://api.medkey.com', // Placeholder for real API
  VERSION: 'v1',
  TIMEOUT_MS: 30000,
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY_MS: 1000,
} as const;

// ============================================================================
// Pagination Constants
// ============================================================================

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  MAX_PAGE_SIZE: 100,
  MIN_PAGE_SIZE: 5,
} as const;

// ============================================================================
// Search Constants
// ============================================================================

export const SEARCH = {
  MIN_QUERY_LENGTH: 2,
  MAX_QUERY_LENGTH: 100,
  DEBOUNCE_DELAY_MS: 300,
} as const;

// ============================================================================
// File Upload Constants
// ============================================================================

export const FILE_UPLOAD = {
  MAX_FILE_SIZE_MB: 10,
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif'],
  ALLOWED_DOCUMENT_TYPES: ['application/pdf', 'image/jpeg', 'image/png'],
} as const;

// ============================================================================
// App Configuration
// ============================================================================

export const APP_CONFIG = {
  NAME: 'MEDkey Locker Connect',
  VERSION: '1.0.0',
  SUPPORT_EMAIL: 'support@medkey.com',
  SUPPORT_PHONE: '+1 (800) MED-KEY-1',
} as const;

// ============================================================================
// Feature Flags
// ============================================================================

export const FEATURES = {
  ENABLE_CHAT: true,
  ENABLE_DELIVERY: true,
  ENABLE_AUTO_REFILL: true,
  ENABLE_REMINDERS: true,
  ENABLE_PREMIUM: true,
} as const;
