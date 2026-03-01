// ============================================================================
// User & Family Types
// ============================================================================

export interface UserPreferences {
  homePharmacyId?: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  dateOfBirth?: string;
  avatar?: string;
  role: 'primary' | 'member';
  preferences?: UserPreferences;
  createdAt: string;
}

export interface FamilyMember extends User {
  relationship: 'self' | 'spouse' | 'child' | 'parent' | 'other';
  insuranceInfo?: InsuranceInfo;
  allergies?: Allergy[];
  medicalConditions?: string[];
}

export interface InsuranceInfo {
  provider: string;
  planName: string;
  memberId: string;
  groupNumber?: string;
  coverageType: 'primary' | 'secondary';
  // Extended fields for detailed insurance information
  clientName?: string;
  relationship?: 'self' | 'spouse' | 'child' | 'parent' | 'other';
  cardholderGroupId?: string;
  effectiveDate?: string;
  expirationDate?: string;
  copayPrimary?: number;
  copaySpecialist?: number;
  deductible?: number;
  outOfPocketMax?: number;
  rxGroup?: string;
  rxPCN?: string;
  bin?: string;
  customerServicePhone?: string;
  website?: string;
}

export interface Allergy {
  name: string;
  severity: 'mild' | 'moderate' | 'severe';
  reaction?: string;
}

// ============================================================================
// Medication Types
// ============================================================================

export interface Medication {
  id: string;
  name: string;
  genericName?: string;
  strength: string;
  form: 'tablet' | 'capsule' | 'liquid' | 'injection' | 'cream' | 'inhaler';
  dosage: string;
  frequency: string;
  instructions?: string;
  sideEffects?: string[];
  interactions?: string[];
  category: MedicationCategory;
  requiresRefill: boolean;
  prescriptionRequired: boolean;
}

export type MedicationCategory = 
  | 'antibiotic'
  | 'cardiovascular'
  | 'pain-relief'
  | 'allergy'
  | 'diabetes'
  | 'mental-health'
  | 'hormone'
  | 'other';

export interface ActiveMedication extends Medication {
  memberId: string;
  memberName: string;
  startDate: string;
  endDate?: string;
  nextDose?: string;
  takenToday: boolean;
  refillable: boolean;
  refillsRemaining?: number;
  prescriptionId: string;
}

export interface PastMedication extends Medication {
  memberId: string;
  memberName: string;
  startDate: string;
  endDate: string;
  reason?: string;
}

// ============================================================================
// Prescription Types
// ============================================================================

export interface Prescription {
  id: string;
  rxNumber: string;
  medicationId: string;
  medicationName: string;
  strength: string;
  quantity: number;
  dosage: string;
  frequency: string;
  status: PrescriptionStatus;
  patientId: string;
  patientName: string;
  prescriber: Prescriber;
  pharmacy?: Pharmacy;
  datePrescribed: string;
  dateExpires?: string;
  lastPickedUp?: string;
  refillsAllowed: number;
  refillsRemaining: number;
  insurance?: InsuranceInfo;
  financials?: PrescriptionFinancials;
  pickupInfo?: PickupInfo;
  notes?: string;
}

export type PrescriptionStatus = 
  | 'pending'
  | 'active'
  | 'ready'
  | 'picked-up'
  | 'expired'
  | 'cancelled'
  | 'needs-approval';

export interface Prescriber {
  id: string;
  name: string;
  specialty?: string;
  phone?: string;
  address?: string;
  npi?: string;
  avatar?: string;
}

export interface Pharmacy {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours?: string;
}

export interface PrescriptionFinancials {
  totalCost: number;
  insuranceCoverage: number;
  copay: number;
  deductible: number;
  coverageReason?: string;
}

export interface PickupInfo {
  estimatedReadyTime: string;
  pickupWindow?: {
    start: string;
    end: string;
  };
  lockerNumber?: string;
  orderNumber?: string;
}

// ============================================================================
// Chat Types
// ============================================================================

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderType: 'user' | 'pharmacist' | 'system';
  text: string;
  timestamp: string;
  read: boolean;
  attachments?: MessageAttachment[];
}

export interface MessageAttachment {
  type: 'image' | 'document' | 'prescription';
  url: string;
  name?: string;
}

export interface PharmacistChat {
  id: string;
  pharmacist: Pharmacist;
  messages: ChatMessage[];
  lastMessageAt: string;
  unreadCount: number;
}

export interface Pharmacist {
  id: string;
  name: string;
  title: string;
  credentials: string;
  avatar?: string;
  isOnline: boolean;
  specialty?: string;
}

export interface QuickReply {
  id: string;
  text: string;
  category?: string;
  triggers?: string[];
}

// ============================================================================
// Pickup Order Types
// ============================================================================

export interface PickupOrder {
  id: string;
  orderNumber: string;
  status: PickupOrderStatus;
  items: PickupOrderItem[];
  qrCode: string;
  qrCodeExpiresAt: string;
  lockerNumber: string;
  estimatedReadyTime: string;
  actualPickupTime?: string;
  createdAt: string;
  pharmacy: Pharmacy;
}

export type PickupOrderStatus = 
  | 'processing'
  | 'ready'
  | 'picked-up'
  | 'expired'
  | 'cancelled';

export interface PickupOrderItem {
  prescriptionId: string;
  medicationName: string;
  quantity: number;
  patientName: string;
}

// ============================================================================
// Notification Types
// ============================================================================

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  timestamp: string;
  actionUrl?: string;
  metadata?: NotificationMetadata;
}

export type NotificationType = 
  | 'prescription-ready'
  | 'refill-reminder'
  | 'medication-reminder'
  | 'appointment'
  | 'message'
  | 'delivery'
  | 'general';

export interface NotificationMetadata {
  prescriptionId?: string;
  medicationId?: string;
  orderId?: string;
  conversationId?: string;
}

// ============================================================================
// Dashboard & Analytics Types
// ============================================================================

export interface DashboardData {
  activeMedications: number;
  pendingPrescriptions: number;
  upcomingRefills: number;
  unreadMessages: number;
  recentActivity: ActivityItem[];
  actionNeeded: ActionItem[];
}

export interface ActivityItem {
  id: string;
  type: 'medication' | 'prescription' | 'message' | 'pickup';
  description: string;
  timestamp: string;
  memberId?: string;
}

export interface ActionItem {
  id: string;
  type: 'approve' | 'refill' | 'pickup' | 'message';
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDate?: string;
  prescriptionId?: string;
  medicationId?: string;
}

// ============================================================================
// API Response Types
// ============================================================================

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  timestamp: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, string>;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// ============================================================================
// Form & Input Types
// ============================================================================

export interface MedicationSearchFilters {
  query?: string;
  memberId?: string;
  category?: MedicationCategory;
  status?: 'active' | 'past';
  refillable?: boolean;
}

export interface PrescriptionFilters {
  status?: PrescriptionStatus;
  memberId?: string;
  dateRange?: {
    start: string;
    end: string;
  };
}

export interface ChatFilters {
  pharmacistId?: string;
  unreadOnly?: boolean;
  dateRange?: {
    start: string;
    end: string;
  };
}

// ============================================================================
// Medical Records & Health Events Types
// ============================================================================

export interface MedicalRecord {
  id: string;
  patientId: string;
  patientName: string;
  type: MedicalRecordType;
  title: string;
  description: string;
  date: string;
  provider?: string;
  facility?: string;
  notes?: string;
  attachments?: string[];
  relatedPrescriptions?: string[];
}

export type MedicalRecordType = 
  | 'diagnosis'
  | 'procedure'
  | 'hospitalization'
  | 'emergency-visit'
  | 'specialist-consult'
  | 'physical-therapy'
  | 'imaging'
  | 'other';

export interface HealthCondition {
  id: string;
  patientId: string;
  name: string;
  icd10Code?: string;
  dateDiagnosed: string;
  status: 'active' | 'resolved' | 'chronic' | 'in-remission';
  severity?: 'mild' | 'moderate' | 'severe';
  notes?: string;
}

// ============================================================================
// Lab Results Types
// ============================================================================

export interface LabResult {
  id: string;
  patientId: string;
  patientName: string;
  testName: string;
  testCode: string;
  date: string;
  status: LabResultStatus;
  orderedBy?: string;
  facility?: string;
  panels: LabPanel[];
  notes?: string;
  attachments?: string[];
}

export type LabResultStatus = 
  | 'pending'
  | 'final'
  | 'preliminary'
  | 'corrected';

export interface LabPanel {
  id: string;
  name: string;
  tests: LabTest[];
}

export interface LabTest {
  id: string;
  name: string;
  loincCode?: string;
  value?: string | number;
  unit?: string;
  referenceRange?: {
    min: number;
    max: number;
    unit: string;
  };
  flag?: 'low' | 'high' | 'abnormal' | 'critical';
  notes?: string;
}

// ============================================================================
// Vaccination Types
// ============================================================================

export interface VaccinationRecord {
  id: string;
  patientId: string;
  patientName: string;
  vaccineName: string;
  cvxCode: string;
  dateAdministered: string;
  manufacturer?: string;
  lotNumber?: string;
  site?: string;
  route?: string;
  dose?: string;
  dueDate?: string;
  status: VaccinationStatus;
  administeredBy?: string;
  facility?: string;
  notes?: string;
}

export type VaccinationStatus = 
  | 'completed'
  | 'due'
  | 'overdue'
  | 'declined'
  | 'contraindicated';

// ============================================================================
// Vital Signs Types
// ============================================================================

export interface VitalSign {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  source: 'manual' | 'device' | 'clinic';
  readings: VitalReading[];
  notes?: string;
}

export interface VitalReading {
  type: VitalType;
  value: number;
  unit: string;
  diastolic?: number; // For blood pressure
  systolic?: number; // For blood pressure
  position?: 'sitting' | 'standing' | 'lying';
  arm?: 'left' | 'right';
  finger?: string;
}

export type VitalType = 
  | 'blood-pressure'
  | 'heart-rate'
  | 'temperature'
  | 'respiratory-rate'
  | 'oxygen-saturation'
  | 'weight'
  | 'height'
  | 'bmi'
  | 'blood-glucose'
  | 'peak-flow';

// ============================================================================
// Medication Adherence Types
// ============================================================================

export interface MedicationAdherence {
  id: string;
  prescriptionId: string;
  medicationId: string;
  medicationName: string;
  patientId: string;
  patientName: string;
  scheduledDate: string;
  scheduledTime?: string;
  takenAt?: string;
  status: AdherenceStatus;
  doseTaken?: number;
  doseScheduled?: number;
  notes?: string;
}

export type AdherenceStatus = 
  | 'taken'
  | 'missed'
  | 'late'
  | 'partial'
  | 'skipped'
  | 'not-scheduled';

export interface AdherenceSummary {
  medicationId: string;
  medicationName: string;
  patientId: string;
  periodStart: string;
  periodEnd: string;
  dosesScheduled: number;
  dosesTaken: number;
  adherenceRate: number;
  missedDoses: number;
  lateDoses: number;
}

// ============================================================================
// Appointment Types
// ============================================================================

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  type: AppointmentType;
  title: string;
  description?: string;
  dateTime: string;
  duration?: number; // in minutes
  status: AppointmentStatus;
  provider?: Provider;
  facility?: Facility;
  location?: string;
  notes?: string;
  reminders?: AppointmentReminder[];
  relatedPrescriptions?: string[];
  relatedLabs?: string[];
}

export type AppointmentType = 
  | 'primary-care'
  | 'specialist'
  | 'follow-up'
  | 'annual-physical'
  | 'urgent-care'
  | 'telehealth'
  | 'lab-work'
  | 'vaccination'
  | 'medication-review'
  | 'other';

export type AppointmentStatus = 
  | 'scheduled'
  | 'confirmed'
  | 'checked-in'
  | 'in-progress'
  | 'completed'
  | 'cancelled'
  | 'no-show'
  | 'rescheduled';

export interface Provider {
  id: string;
  name: string;
  specialty?: string;
  phone?: string;
  email?: string;
  npi?: string;
  avatar?: string;
}

export interface Facility {
  id: string;
  name: string;
  address: string;
  phone: string;
  type?: 'hospital' | 'clinic' | 'pharmacy' | 'lab';
}

export interface AppointmentReminder {
  id: string;
  type: 'sms' | 'email' | 'push' | 'call';
  timeBefore: number; // minutes before appointment
  sent?: boolean;
  sentAt?: string;
}

// ============================================================================
// Insurance & Billing Types
// ============================================================================

export interface InsuranceClaim {
  id: string;
  claimNumber: string;
  patientId: string;
  patientName: string;
  dateOfService: string;
  provider: Provider;
  facility?: Facility;
  serviceDescription: string;
  diagnosisCodes: string[];
  procedureCodes: string[];
  totalCharged: number;
  insuranceCoverage: number;
  patientResponsibility: number;
  deductibleApplied: number;
  copay: number;
  coinsurance: number;
  status: ClaimStatus;
  dateSubmitted: string;
  dateProcessed?: string;
  explanationOfBenefits?: string;
  relatedPrescriptionId?: string;
}

export type ClaimStatus = 
  | 'submitted'
  | 'pending'
  | 'approved'
  | 'denied'
  | 'partially-approved'
  | 'paid'
  | 'appealed';

export interface ExplanationOfBenefits {
  id: string;
  claimId: string;
  insuranceProvider: string;
  memberInfo: InsuranceInfo;
  serviceDate: string;
  provider: Provider;
  serviceDescription: string;
  allowedAmount: number;
  coveredAmount: number;
  deniedAmount: number;
  patientOwed: number;
  breakdown: EOBBreakdownItem[];
}

export interface EOBBreakdownItem {
  description: string;
  code: string;
  charged: number;
  allowed: number;
  covered: number;
  denied: number;
  denialReason?: string;
}

// ============================================================================
// Document & Attachment Types
// ============================================================================

export interface MedicalDocument {
  id: string;
  patientId: string;
  patientName: string;
  type: DocumentType;
  title: string;
  description?: string;
  url: string;
  mimeType: string;
  size?: number; // in bytes
  dateUploaded: string;
  dateOfService?: string;
  provider?: string;
  facility?: string;
  tags?: string[];
  relatedRecords?: string[];
}

export type DocumentType = 
  | 'lab-result'
  | 'imaging-report'
  | 'discharge-summary'
  | 'operative-report'
  | 'progress-note'
  | 'referral'
  | 'prescription'
  | 'insurance-card'
  | 'id-card'
  | 'vaccination-record'
  | 'other';

// ============================================================================
// Care Plan Types
// ============================================================================

export interface CarePlan {
  id: string;
  patientId: string;
  patientName: string;
  title: string;
  description: string;
  startDate: string;
  endDate?: string;
  status: CarePlanStatus;
  goals: CareGoal[];
  interventions: CareIntervention[];
  providers: Provider[];
  lastUpdated: string;
}

export type CarePlanStatus = 
  | 'draft'
  | 'active'
  | 'completed'
  | 'cancelled'
  | 'on-hold';

export interface CareGoal {
  id: string;
  description: string;
  targetDate?: string;
  status: 'in-progress' | 'achieved' | 'not-met' | 'on-hold';
  metrics?: GoalMetric[];
}

export interface GoalMetric {
  name: string;
  targetValue: string | number;
  currentValue?: string | number;
  unit?: string;
}

export interface CareIntervention {
  id: string;
  type: 'medication' | 'therapy' | 'lifestyle' | 'monitoring' | 'education';
  description: string;
  frequency?: string;
  instructions?: string;
  relatedMedicationId?: string;
}
