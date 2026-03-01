/**
 * Mock Data Manager
 * Central export point for all mock data
 */

// Users & Family
export {
  familyMembers,
  sarahJenkins,
  davidJenkins,
  lilyJenkins,
  jenkinsInsurance,
  familyAllergies,
  getMemberById,
  getMemberByName,
  getAllFamilyMembers,
} from './mockUsers';

// Medications
export {
  medicationDatabase,
  activeMedications,
  pastMedications,
  getMedicationById,
  getActiveMedicationsByMember,
  searchMedications,
} from './mockMedications';

// Prescriptions
export {
  prescriptions,
  prescribers,
  pharmacies,
  getPrescriptionById,
  getPrescriptionsByStatus,
  getPrescriptionsByPatient,
  getActivePrescriptions,
  getPrescriptionsNeedingApproval,
  getPrescriptionsDueForRefill,
} from './mockPrescriptions';

// Chat Messages
export {
  pharmacists,
  chatConversations,
  quickReplies,
  autoReplies,
  getChatByPharmacistId,
  getChatById,
  findQuickReplyByTrigger,
  getAutoReply,
  findAutoReplyByKeyword,
} from './mockChatMessages';

// Pickup Orders
export {
  pickupOrders,
  lockerLocations,
  getOrderByNumber,
  getOrderByLockerNumber,
  getActiveOrders,
  getReadyOrders,
  getOrdersByPatient,
  generateNewQRCode,
  isQRCodeValid,
  getLockerLocation,
} from './mockPickupOrders';

// Notifications
export {
  notifications,
  getUnreadNotifications,
  getNotificationsByType,
  getRecentNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  getUnreadCount,
} from './mockNotifications';

// Medical Records
export {
  medicalRecords,
  healthConditions,
  getMedicalRecordsByPatient,
  getMedicalRecordsByType,
  getMedicalRecordById,
  getHealthConditionsByPatient,
  getActiveHealthConditions,
  getHealthConditionById,
  searchMedicalRecords,
} from './mockMedicalRecords';

// Lab Results
export {
  labResults,
  getLabResultsByPatient,
  getLabResultsByStatus,
  getLabResultById,
  getRecentLabResults,
  getAbnormalLabResults,
  searchLabResults,
  getLabResultsByDateRange,
} from './mockLabResults';

// Vaccinations
export {
  vaccinationRecords,
  getVaccinationsByPatient,
  getVaccinationsByStatus,
  getVaccinationById,
  getDueVaccinations,
  getCompletedVaccinations,
  getVaccinationsByDateRange,
  searchVaccinations,
  getVaccinationSummary,
} from './mockVaccinations';

// Vital Signs
export {
  vitalSigns,
  getVitalSignsByPatient,
  getVitalSignsByType,
  getVitalSignById,
  getRecentVitalSigns,
  getVitalSignsByDateRange,
  getLatestVitalReading,
  getBloodPressureTrend,
  getGlucoseTrend,
  getVitalStatistics,
} from './mockVitalSigns';

// Medication Adherence
export {
  medicationAdherence,
  adherenceSummaries,
  getAdherenceByPatient,
  getAdherenceByPrescription,
  getAdherenceByMedication,
  getAdherenceByDateRange,
  getAdherenceByStatus,
  getAdherenceSummaryByPatient,
  calculateAdherenceRate,
  getAdherenceById,
  getMissedDoses,
  getAdherenceTrend,
} from './mockMedicationAdherence';

// Appointments
export {
  appointments,
  healthcareProviders,
  healthcareFacilities,
  getAppointmentsByPatient,
  getAppointmentsByStatus,
  getAppointmentsByType,
  getAppointmentById,
  getUpcomingAppointments,
  getPastAppointments,
  getAppointmentsByDateRange,
  getAppointmentsByProvider,
  searchAppointments,
  getAppointmentReminders,
} from './mockAppointments';

// Dashboard Data Helper
import { DashboardData, ActivityItem, ActionItem } from '@/types';
import { activeMedications, pastMedications, medicationDatabase } from './mockMedications';
import { getPrescriptionsNeedingApproval, getPrescriptionsDueForRefill } from './mockPrescriptions';
import { getUnreadNotifications, notifications } from './mockNotifications';
import { getChatById, chatConversations } from './mockChatMessages';
import { getUpcomingAppointments, getMissedDoses, appointments } from './mockAppointments';
import { getDueVaccinations, vaccinationRecords } from './mockVaccinations';
import { getAbnormalLabResults, labResults } from './mockLabResults';
import { medicalRecords, healthConditions } from './mockMedicalRecords';
import { vitalSigns } from './mockVitalSigns';

export function getDashboardData(): DashboardData {
  const activeMeds = activeMedications;
  const pendingPrescriptions = getPrescriptionsNeedingApproval();
  const upcomingRefills = getPrescriptionsDueForRefill();
  const unreadMessages = getUnreadNotifications().filter(n => n.type === 'message');
  
  const recentActivity: ActivityItem[] = [
    {
      id: 'activity-001',
      type: 'pickup',
      description: 'Picked up Levothyroxine from locker A-08',
      timestamp: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toISOString(),
      memberId: 'user-001',
    },
    {
      id: 'activity-002',
      type: 'message',
      description: 'Messaged Dr. Michael Chen about Amoxicillin',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      memberId: 'user-001',
    },
    {
      id: 'activity-003',
      type: 'medication',
      description: 'Started Metformin 500mg',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      memberId: 'user-002',
    },
    {
      id: 'activity-004',
      type: 'prescription',
      description: 'Prescription approved for Atorvastatin',
      timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
      memberId: 'user-002',
    },
  ];
  
  const actionNeeded: ActionItem[] = [
    {
      id: 'action-001',
      type: 'pickup',
      title: 'Amoxicillin Ready',
      description: 'Ready for pickup at MEDkey',
      priority: 'high',
      prescriptionId: 'rx-001',
    },
    {
      id: 'action-002',
      type: 'refill',
      title: 'Atorvastatin Refill Due',
      description: 'Refill due 2025-10-25',
      priority: 'urgent',
      medicationId: 'med-003',
      prescriptionId: 'rx-002',
    },
    {
      id: 'action-003',
      type: 'approve',
      title: 'Lisinopril Needs Approval',
      description: 'New prescription requires approval',
      priority: 'high',
      prescriptionId: 'rx-003',
    },
  ];
  
  return {
    activeMedications: activeMeds.length,
    pendingPrescriptions: pendingPrescriptions.length,
    upcomingRefills: upcomingRefills.length,
    unreadMessages: unreadMessages.length,
    recentActivity,
    actionNeeded,
  };
}

// Mock Data Manager Class
class MockDataManager {
  private static instance: MockDataManager;
  
  private constructor() {}
  
  static getInstance(): MockDataManager {
    if (!MockDataManager.instance) {
      MockDataManager.instance = new MockDataManager();
    }
    return MockDataManager.instance;
  }
  
  // Reset all data to initial state (useful for testing)
  resetData(): void {
    // In a real implementation, this would reload data from storage
    console.log('Mock data reset to initial state');
  }
  
  // Get comprehensive statistics
  getStatistics(): Record<string, number> {
    return {
      totalFamilyMembers: familyMembers.length,
      totalMedications: medicationDatabase.length,
      activeMedications: activeMedications.length,
      pastMedications: pastMedications.length,
      totalPrescriptions: prescriptions.length,
      activePrescriptions: getActivePrescriptions().length,
      pendingApprovals: getPrescriptionsNeedingApproval().length,
      totalOrders: pickupOrders.length,
      activeOrders: getActiveOrders().length,
      totalNotifications: notifications.length,
      unreadNotifications: getUnreadCount(),
      totalChats: chatConversations.length,
      // New statistics
      totalMedicalRecords: medicalRecords.length,
      totalHealthConditions: healthConditions.length,
      totalLabResults: labResults.length,
      totalVaccinations: vaccinationRecords.length,
      totalVitalSigns: vitalSigns.length,
      totalAppointments: appointments.length,
      upcomingAppointments: getUpcomingAppointments().length,
      dueVaccinations: getDueVaccinations().length,
      abnormalLabResults: getAbnormalLabResults().length,
      missedMedicationDoses: getMissedDoses().length,
    };
  }
}

export const mockDataManager = MockDataManager.getInstance();
