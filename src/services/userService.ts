import { User, FamilyMember, Notification, ApiResponse } from '@/types';
import { BaseApiService, simulateNetworkDelay } from './api';
import { 
  familyMembers,
  getMemberById,
  getMemberByName,
  getAllFamilyMembers,
  addFamilyMember as addMemberToMock,
  updateFamilyMember as updateMemberInMock,
  removeFamilyMember as removeMemberFromMock,
} from '@/data/mockUsers';
import { notifications, markNotificationAsRead, markAllNotificationsAsRead } from '@/data/mockNotifications';

class UserService extends BaseApiService {
  /**
   * Get current user profile
   */
  async getUserProfile(): Promise<ApiResponse<FamilyMember>> {
    return this.request(
      async () => {
        await simulateNetworkDelay();
        // Return Sarah as the primary user
        return familyMembers[0];
      },
      'Failed to fetch user profile'
    );
  }

  /**
   * Get user by ID
   */
  async getUserById(userId: string): Promise<ApiResponse<FamilyMember | null>> {
    return this.request(
      async () => {
        await simulateNetworkDelay();
        const user = getMemberById(userId);
        return user || null;
      },
      `User ${userId} not found`
    );
  }

  /**
   * Get all family members
   */
  async getFamilyMembers(): Promise<ApiResponse<FamilyMember[]>> {
    return this.request(
      async () => {
        await simulateNetworkDelay();
        return familyMembers;
      },
      'Failed to fetch family members'
    );
  }

  /**
   * Get family member by name
   */
  async getFamilyMemberByName(name: string): Promise<ApiResponse<FamilyMember | null>> {
    return this.request(
      async () => {
        await simulateNetworkDelay();
        const member = getMemberByName(name);
        return member || null;
      },
      `Family member ${name} not found`
    );
  }

  /**
   * Update user profile
   */
  async updateUserProfile(userId: string, updates: Partial<FamilyMember>): Promise<ApiResponse<{ success: boolean }>> {
    return this.request(
      async () => {
        await simulateNetworkDelay(1000, 1500);
        
        const user = getMemberById(userId);
        if (!user) {
          throw new Error('User not found');
        }
        
        // Update in mock data
        const updated = updateMemberInMock(userId, updates);
        if (!updated) {
          throw new Error('Failed to update user');
        }
        
        return { success: true };
      },
      'Failed to update user profile'
    );
  }

  /**
   * Add family member
   */
  async addFamilyMember(memberData: Omit<FamilyMember, 'id' | 'createdAt'>): Promise<ApiResponse<{ success: boolean; memberId: string }>> {
    return this.request(
      async () => {
        await simulateNetworkDelay(1500, 2000);
        
        // Add to mock data
        const newMember = addMemberToMock(memberData);
        
        return {
          success: true,
          memberId: newMember.id,
        };
      },
      'Failed to add family member'
    );
  }

  /**
   * Remove family member
   */
  async removeFamilyMember(memberId: string): Promise<ApiResponse<{ success: boolean }>> {
    return this.request(
      async () => {
        await simulateNetworkDelay(1000, 1500);
        
        const member = getMemberById(memberId);
        if (!member) {
          throw new Error('Member not found');
        }
        
        if (member.role === 'primary') {
          throw new Error('Cannot remove primary account holder');
        }
        
        // Remove from mock data
        const removed = removeMemberFromMock(memberId);
        if (!removed) {
          throw new Error('Failed to remove member');
        }
        
        return { success: true };
      },
      'Failed to remove family member'
    );
  }

  /**
   * Update insurance information
   */
  async updateInsurance(userId: string, insuranceData: Partial<FamilyMember['insuranceInfo']>): Promise<ApiResponse<{ success: boolean }>> {
    return this.request(
      async () => {
        await simulateNetworkDelay(1500, 2000);
        
        const user = getMemberById(userId);
        if (!user) {
          throw new Error('User not found');
        }
        
        // Update in mock data
        const updated = updateMemberInMock(userId, { 
          insuranceInfo: { ...user.insuranceInfo, ...insuranceData } 
        });
        if (!updated) {
          throw new Error('Failed to update insurance');
        }
        
        return { success: true };
      },
      'Failed to update insurance information'
    );
  }

  /**
   * Get user notifications
   */
  async getUserNotifications(unreadOnly?: boolean): Promise<ApiResponse<Notification[]>> {
    return this.request(
      async () => {
        await simulateNetworkDelay();
        
        if (unreadOnly) {
          return notifications.filter(n => !n.read);
        }
        
        return notifications.sort((a, b) => 
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
      },
      'Failed to fetch notifications'
    );
  }

  /**
   * Mark notification as read
   */
  async markNotificationRead(notificationId: string): Promise<ApiResponse<{ success: boolean }>> {
    return this.request(
      async () => {
        await simulateNetworkDelay();
        
        const notification = markNotificationAsRead(notificationId);
        if (!notification) {
          throw new Error('Notification not found');
        }
        
        return { success: true };
      },
      'Failed to mark notification as read'
    );
  }

  /**
   * Mark all notifications as read
   */
  async markAllNotificationsRead(): Promise<ApiResponse<{ success: boolean }>> {
    return this.request(
      async () => {
        await simulateNetworkDelay();
        
        markAllNotificationsAsRead();
        return { success: true };
      },
      'Failed to mark all notifications as read'
    );
  }

  /**
   * Get unread notification count
   */
  async getUnreadNotificationCount(): Promise<ApiResponse<{ count: number }>> {
    return this.request(
      async () => {
        await simulateNetworkDelay();
        
        const count = notifications.filter(n => !n.read).length;
        return { count };
      },
      'Failed to fetch unread notification count'
    );
  }

  /**
   * Update notification preferences
   */
  async updateNotificationPreferences(
    userId: string,
    preferences: {
      emailNotifications?: boolean;
      pushNotifications?: boolean;
      smsNotifications?: boolean;
      medicationReminders?: boolean;
      refillReminders?: boolean;
      pickupNotifications?: boolean;
    }
  ): Promise<ApiResponse<{ success: boolean }>> {
    return this.request(
      async () => {
        await simulateNetworkDelay(1000, 1500);
        
        const user = getMemberById(userId);
        if (!user) {
          throw new Error('User not found');
        }
        
        return { success: true };
      },
      'Failed to update notification preferences'
    );
  }

  /**
   * Get user settings
   */
  async getUserSettings(userId: string): Promise<ApiResponse<{
    theme: 'light' | 'dark' | 'system';
    language: string;
    notifications: {
      email: boolean;
      push: boolean;
      sms: boolean;
    };
    privacy: {
      shareDataWithPharmacy: boolean;
      shareDataWithPrescriber: boolean;
    };
  }>> {
    return this.request(
      async () => {
        await simulateNetworkDelay();
        
        const user = getMemberById(userId);
        if (!user) {
          throw new Error('User not found');
        }
        
        // Return default settings
        return {
          theme: 'system',
          language: 'en',
          notifications: {
            email: true,
            push: true,
            sms: false,
          },
          privacy: {
            shareDataWithPharmacy: true,
            shareDataWithPrescriber: true,
          },
        };
      },
      'Failed to fetch user settings'
    );
  }

  /**
   * Update user settings
   */
  async updateUserSettings(userId: string, settings: Partial<any>): Promise<ApiResponse<{ success: boolean }>> {
    return this.request(
      async () => {
        await simulateNetworkDelay(1000, 1500);
        
        const user = getMemberById(userId);
        if (!user) {
          throw new Error('User not found');
        }
        
        return { success: true };
      },
      'Failed to update user settings'
    );
  }

  /**
   * Delete account (soft delete)
   */
  async deleteAccount(userId: string, reason?: string): Promise<ApiResponse<{ success: boolean }>> {
    return this.request(
      async () => {
        await simulateNetworkDelay(2000, 3000);
        
        const user = getMemberById(userId);
        if (!user) {
          throw new Error('User not found');
        }
        
        if (user.role === 'primary') {
          throw new Error('Cannot delete primary account. Please transfer ownership or remove family members first.');
        }
        
        return { success: true };
      },
      'Failed to delete account'
    );
  }

  /**
   * Export user data (GDPR compliance)
   */
  async exportUserData(userId: string): Promise<ApiResponse<{ downloadUrl: string; expiresAt: string }>> {
    return this.request(
      async () => {
        await simulateNetworkDelay(3000, 5000);
        
        const user = getMemberById(userId);
        if (!user) {
          throw new Error('User not found');
        }
        
        // Generate fake download URL
        const downloadUrl = `https://medkey.com/exports/${userId}-${Date.now()}.json`;
        const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
        
        return {
          downloadUrl,
          expiresAt,
        };
      },
      'Failed to export user data'
    );
  }
}

// Export singleton instance
export const userService = new UserService();
