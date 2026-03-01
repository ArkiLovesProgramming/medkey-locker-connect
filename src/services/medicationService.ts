import { Medication, ActiveMedication, PastMedication, MedicationSearchFilters, ApiResponse } from '@/types';
import { BaseApiService, simulateNetworkDelay } from './api';
import { 
  medicationDatabase, 
  activeMedications, 
  pastMedications,
  getMedicationById 
} from '@/data/mockMedications';

class MedicationService extends BaseApiService {
  /**
   * Get all medications from the database
   */
  async getMedicationDatabase(): Promise<ApiResponse<Medication[]>> {
    return this.request(
      async () => medicationDatabase,
      'Failed to fetch medication database'
    );
  }

  /**
   * Get active medications with optional filters
   */
  async getActiveMedications(filters?: MedicationSearchFilters): Promise<ApiResponse<ActiveMedication[]>> {
    return this.request(
      async () => {
        await simulateNetworkDelay();
        
        let result = [...activeMedications];
        
        if (filters) {
          // Filter by member
          if (filters.memberId && filters.memberId !== 'all') {
            result = result.filter(med => med.memberId === filters.memberId);
          }
          
          // Filter by search query
          if (filters.query) {
            const query = filters.query.toLowerCase();
            result = result.filter(med => 
              med.name.toLowerCase().includes(query) ||
              med.genericName?.toLowerCase().includes(query)
            );
          }
          
          // Filter by category
          if (filters.category) {
            result = result.filter(med => med.category === filters.category);
          }
          
          // Filter by refillable
          if (filters.refillable !== undefined) {
            result = result.filter(med => med.refillable === filters.refillable);
          }
        }
        
        return result;
      },
      'Failed to fetch active medications'
    );
  }

  /**
   * Get past medications with optional filters
   */
  async getPastMedications(filters?: MedicationSearchFilters): Promise<ApiResponse<PastMedication[]>> {
    return this.request(
      async () => {
        await simulateNetworkDelay();
        
        let result = [...pastMedications];
        
        if (filters) {
          // Filter by member
          if (filters.memberId && filters.memberId !== 'all') {
            result = result.filter(med => med.memberId === filters.memberId);
          }
          
          // Filter by search query
          if (filters.query) {
            const query = filters.query.toLowerCase();
            result = result.filter(med => 
              med.name.toLowerCase().includes(query) ||
              med.genericName?.toLowerCase().includes(query)
            );
          }
        }
        
        return result;
      },
      'Failed to fetch past medications'
    );
  }

  /**
   * Get medication details by ID
   */
  async getMedicationDetails(medicationId: string): Promise<ApiResponse<Medication | null>> {
    return this.request(
      async () => {
        await simulateNetworkDelay();
        const medication = getMedicationById(medicationId);
        return medication || null;
      },
      `Medication with ID ${medicationId} not found`
    );
  }

  /**
   * Request a refill for a medication
   */
  async requestRefill(medicationId: string, prescriptionId: string): Promise<ApiResponse<{ success: boolean; requestId: string }>> {
    return this.request(
      async () => {
        await simulateNetworkDelay(1000, 2000); // Longer delay for refill request
        
        const medication = getMedicationById(medicationId);
        if (!medication) {
          throw new Error('Medication not found');
        }
        
        // Generate a fake refill request ID
        const requestId = `REFILL-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        
        return {
          success: true,
          requestId,
        };
      },
      'Failed to submit refill request'
    );
  }

  /**
   * Search medications by query
   */
  async searchMedications(query: string): Promise<ApiResponse<Medication[]>> {
    return this.request(
      async () => {
        await simulateNetworkDelay();
        
        if (!query || query.trim().length === 0) {
          return medicationDatabase;
        }
        
        const lowerQuery = query.toLowerCase();
        return medicationDatabase.filter(med => 
          med.name.toLowerCase().includes(lowerQuery) ||
          med.genericName?.toLowerCase().includes(lowerQuery) ||
          med.category.toLowerCase().includes(lowerQuery) ||
          med.instructions?.toLowerCase().includes(lowerQuery)
        );
      },
      'Failed to search medications'
    );
  }

  /**
   * Get medications due for refill
   */
  async getMedicationsDueForRefill(): Promise<ApiResponse<ActiveMedication[]>> {
    return this.request(
      async () => {
        await simulateNetworkDelay();
        return activeMedications.filter(med => 
          med.refillable && med.refillsRemaining !== undefined && med.refillsRemaining <= 1
        );
      },
      'Failed to fetch medications due for refill'
    );
  }

  /**
   * Mark medication as taken
   */
  async markMedicationAsTaken(medicationId: string): Promise<ApiResponse<{ success: boolean }>> {
    return this.request(
      async () => {
        await simulateNetworkDelay();
        
        const medication = activeMedications.find(m => 
          m.prescriptionId === medicationId || m.id === medicationId
        );
        
        if (!medication) {
          throw new Error('Medication not found');
        }
        
        return { success: true };
      },
      'Failed to mark medication as taken'
    );
  }

  /**
   * Get medication adherence statistics
   */
  async getAdherenceStats(memberId?: string, days: number = 30): Promise<ApiResponse<{
    adherenceRate: number;
    dosesTaken: number;
    dosesMissed: number;
    totalDoses: number;
  }>> {
    return this.request(
      async () => {
        await simulateNetworkDelay();
        
        // Mock adherence statistics
        const totalDoses = days * (memberId ? 2 : 6); // Assume 2-6 medications per day
        const adherenceRate = 0.85 + Math.random() * 0.1; // 85-95% adherence
        const dosesTaken = Math.floor(totalDoses * adherenceRate);
        const dosesMissed = totalDoses - dosesTaken;
        
        return {
          adherenceRate: Math.round(adherenceRate * 100),
          dosesTaken,
          dosesMissed,
          totalDoses,
        };
      },
      'Failed to fetch adherence statistics'
    );
  }
}

// Export singleton instance
export const medicationService = new MedicationService();
