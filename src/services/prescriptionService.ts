import { 
  Prescription, 
  PrescriptionStatus, 
  PrescriptionFilters,
  PrescriptionFinancials,
  InsuranceInfo,
  ApiResponse 
} from '@/types';
import { BaseApiService, simulateNetworkDelay } from './api';
import { 
  prescriptions,
  getPrescriptionById,
  getPrescriptionsByStatus,
  getPrescriptionsByPatient,
  getActivePrescriptions,
  getPrescriptionsNeedingApproval,
  getPrescriptionsDueForRefill,
} from '@/data/mockPrescriptions';

class PrescriptionService extends BaseApiService {
  /**
   * Get all prescriptions with optional filters
   */
  async getPrescriptions(filters?: PrescriptionFilters): Promise<ApiResponse<Prescription[]>> {
    return this.request(
      async () => {
        await simulateNetworkDelay();
        
        let result = [...prescriptions];
        
        if (filters) {
          // Filter by status
          if (filters.status) {
            result = result.filter(rx => rx.status === filters.status);
          }
          
          // Filter by patient
          if (filters.memberId) {
            result = result.filter(rx => rx.patientId === filters.memberId);
          }
          
          // Filter by date range
          if (filters.dateRange) {
            const startDate = new Date(filters.dateRange.start);
            const endDate = new Date(filters.dateRange.end);
            result = result.filter(rx => {
              const rxDate = new Date(rx.datePrescribed);
              return rxDate >= startDate && rxDate <= endDate;
            });
          }
        }
        
        // Sort by date prescribed (newest first)
        return result.sort((a, b) => 
          new Date(b.datePrescribed).getTime() - new Date(a.datePrescribed).getTime()
        );
      },
      'Failed to fetch prescriptions'
    );
  }

  /**
   * Get prescription details by ID
   */
  async getPrescriptionDetails(prescriptionId: string): Promise<ApiResponse<Prescription | null>> {
    return this.request(
      async () => {
        await simulateNetworkDelay();
        const prescription = getPrescriptionById(prescriptionId);
        return prescription || null;
      },
      `Prescription with ID ${prescriptionId} not found`
    );
  }

  /**
   * Get prescriptions by status
   */
  async getPrescriptionsByStatus(status: PrescriptionStatus): Promise<ApiResponse<Prescription[]>> {
    return this.request(
      async () => {
        await simulateNetworkDelay();
        return getPrescriptionsByStatus(status);
      },
      `Failed to fetch prescriptions with status ${status}`
    );
  }

  /**
   * Get prescriptions for a specific patient
   */
  async getPrescriptionsByPatient(patientId: string): Promise<ApiResponse<Prescription[]>> {
    return this.request(
      async () => {
        await simulateNetworkDelay();
        return getPrescriptionsByPatient(patientId);
      },
      `Failed to fetch prescriptions for patient ${patientId}`
    );
  }

  /**
   * Get active prescriptions (active, ready, pending)
   */
  async getActivePrescriptions(): Promise<ApiResponse<Prescription[]>> {
    return this.request(
      async () => {
        await simulateNetworkDelay();
        return getActivePrescriptions();
      },
      'Failed to fetch active prescriptions'
    );
  }

  /**
   * Get prescriptions needing approval
   */
  async getPrescriptionsNeedingApproval(): Promise<ApiResponse<Prescription[]>> {
    return this.request(
      async () => {
        await simulateNetworkDelay();
        return getPrescriptionsNeedingApproval();
      },
      'Failed to fetch prescriptions needing approval'
    );
  }

  /**
   * Get prescriptions due for refill
   */
  async getPrescriptionsDueForRefill(): Promise<ApiResponse<Prescription[]>> {
    return this.request(
      async () => {
        await simulateNetworkDelay();
        return getPrescriptionsDueForRefill();
      },
      'Failed to fetch prescriptions due for refill'
    );
  }

  /**
   * Approve a prescription
   */
  async approvePrescription(prescriptionId: string): Promise<ApiResponse<{ success: boolean; prescriptionId: string }>> {
    return this.request(
      async () => {
        await simulateNetworkDelay(1000, 1500);
        
        const prescription = getPrescriptionById(prescriptionId);
        if (!prescription) {
          throw new Error('Prescription not found');
        }
        
        if (prescription.status !== 'needs-approval') {
          throw new Error('Prescription is not pending approval');
        }
        
        // In a real app, this would update the prescription status
        return {
          success: true,
          prescriptionId,
        };
      },
      'Failed to approve prescription'
    );
  }

  /**
   * Reject/cancel a prescription
   */
  async rejectPrescription(prescriptionId: string, reason?: string): Promise<ApiResponse<{ success: boolean }>> {
    return this.request(
      async () => {
        await simulateNetworkDelay(1000, 1500);
        
        const prescription = getPrescriptionById(prescriptionId);
        if (!prescription) {
          throw new Error('Prescription not found');
        }
        
        // In a real app, this would update the prescription status
        return { success: true };
      },
      'Failed to reject prescription'
    );
  }

  /**
   * Calculate insurance coverage for a prescription
   */
  async calculateCoverage(
    insurance: InsuranceInfo,
    medicationCost: number,
    prescriptionId?: string
  ): Promise<ApiResponse<PrescriptionFinancials>> {
    return this.request(
      async () => {
        await simulateNetworkDelay();
        
        // Mock insurance coverage calculation
        const coveragePercentage = 0.70 + Math.random() * 0.15; // 70-85% coverage
        const insuranceCoverage = Math.round(medicationCost * coveragePercentage * 100) / 100;
        const copay = Math.round((medicationCost - insuranceCoverage) * 100) / 100;
        
        return {
          totalCost: medicationCost,
          insuranceCoverage,
          copay,
          deductible: 0,
          coverageReason: `${Math.round(coveragePercentage * 100)}% formulary coverage`,
        };
      },
      'Failed to calculate insurance coverage'
    );
  }

  /**
   * Request a refill for a prescription
   */
  async requestPrescriptionRefill(prescriptionId: string): Promise<ApiResponse<{ success: boolean; requestId: string }>> {
    return this.request(
      async () => {
        await simulateNetworkDelay(1000, 2000);
        
        const prescription = getPrescriptionById(prescriptionId);
        if (!prescription) {
          throw new Error('Prescription not found');
        }
        
        if (prescription.refillsRemaining <= 0) {
          throw new Error('No refills remaining. New prescription required.');
        }
        
        const requestId = `REFILL-RX-${Date.now()}`;
        
        return {
          success: true,
          requestId,
        };
      },
      'Failed to request prescription refill'
    );
  }

  /**
   * Get prescription history for a patient
   */
  async getPrescriptionHistory(patientId: string, limit: number = 20): Promise<ApiResponse<Prescription[]>> {
    return this.request(
      async () => {
        await simulateNetworkDelay();
        
        const patientPrescriptions = getPrescriptionsByPatient(patientId);
        return patientPrescriptions
          .sort((a, b) => new Date(b.datePrescribed).getTime() - new Date(a.datePrescribed).getTime())
          .slice(0, limit);
      },
      'Failed to fetch prescription history'
    );
  }

  /**
   * Transfer prescription to another pharmacy
   */
  async transferPrescription(prescriptionId: string, targetPharmacyId: string): Promise<ApiResponse<{ success: boolean; transferId: string }>> {
    return this.request(
      async () => {
        await simulateNetworkDelay(1500, 2500);
        
        const prescription = getPrescriptionById(prescriptionId);
        if (!prescription) {
          throw new Error('Prescription not found');
        }
        
        const transferId = `TRANSFER-${Date.now()}`;
        
        return {
          success: true,
          transferId,
        };
      },
      'Failed to transfer prescription'
    );
  }
}

// Export singleton instance
export const prescriptionService = new PrescriptionService();
