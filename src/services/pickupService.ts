import { PickupOrder, PickupOrderStatus, ApiResponse } from '@/types';
import { BaseApiService, simulateNetworkDelay } from './api';
import { 
  pickupOrders,
  getOrderByNumber,
  getOrderByLockerNumber,
  getActiveOrders,
  getReadyOrders,
  getOrdersByPatient,
  generateNewQRCode,
  isQRCodeValid,
  getLockerLocation,
} from '@/data/mockPickupOrders';

class PickupService extends BaseApiService {
  /**
   * Get all pickup orders
   */
  async getPickupOrders(): Promise<ApiResponse<PickupOrder[]>> {
    return this.request(
      async () => {
        await simulateNetworkDelay();
        return pickupOrders;
      },
      'Failed to fetch pickup orders'
    );
  }

  /**
   * Get active pickup orders (ready or processing)
   */
  async getActivePickupOrders(): Promise<ApiResponse<PickupOrder[]>> {
    return this.request(
      async () => {
        await simulateNetworkDelay();
        return getActiveOrders();
      },
      'Failed to fetch active pickup orders'
    );
  }

  /**
   * Get ready orders (ready for pickup)
   */
  async getReadyOrders(): Promise<ApiResponse<PickupOrder[]>> {
    return this.request(
      async () => {
        await simulateNetworkDelay();
        return getReadyOrders();
      },
      'Failed to fetch ready orders'
    );
  }

  /**
   * Get order by order number
   */
  async getOrderByNumber(orderNumber: string): Promise<ApiResponse<PickupOrder | null>> {
    return this.request(
      async () => {
        await simulateNetworkDelay();
        const order = getOrderByNumber(orderNumber);
        return order || null;
      },
      `Order ${orderNumber} not found`
    );
  }

  /**
   * Get order by locker number
   */
  async getOrderByLockerNumber(lockerNumber: string): Promise<ApiResponse<PickupOrder | null>> {
    return this.request(
      async () => {
        await simulateNetworkDelay();
        const order = getOrderByLockerNumber(lockerNumber);
        return order || null;
      },
      `No order found for locker ${lockerNumber}`
    );
  }

  /**
   * Get orders for a specific patient
   */
  async getOrdersByPatient(patientName: string): Promise<ApiResponse<PickupOrder[]>> {
    return this.request(
      async () => {
        await simulateNetworkDelay();
        return getOrdersByPatient(patientName);
      },
      `Failed to fetch orders for patient ${patientName}`
    );
  }

  /**
   * Get QR code for an order
   */
  async getQRCode(orderId: string): Promise<ApiResponse<{ qrCode: string; expiresAt: string; isValid: boolean }>> {
    return this.request(
      async () => {
        await simulateNetworkDelay();
        
        const order = pickupOrders.find(o => o.id === orderId);
        if (!order) {
          throw new Error('Order not found');
        }
        
        return {
          qrCode: order.qrCode,
          expiresAt: order.qrCodeExpiresAt,
          isValid: isQRCodeValid(order.qrCodeExpiresAt),
        };
      },
      `Failed to fetch QR code for order ${orderId}`
    );
  }

  /**
   * Refresh QR code (generate new one)
   */
  async refreshQRCode(orderId: string): Promise<ApiResponse<{ qrCode: string; expiresAt: string }>> {
    return this.request(
      async () => {
        await simulateNetworkDelay(500, 1000);
        
        const order = pickupOrders.find(o => o.id === orderId);
        if (!order) {
          throw new Error('Order not found');
        }
        
        const newQRCode = generateNewQRCode(orderId);
        const newExpiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString();
        
        return {
          qrCode: newQRCode,
          expiresAt: newExpiresAt,
        };
      },
      'Failed to refresh QR code'
    );
  }

  /**
   * Open locker for order
   */
  async openLocker(orderId: string): Promise<ApiResponse<{ success: boolean; lockerNumber: string; location: string }>> {
    return this.request(
      async () => {
        await simulateNetworkDelay(1000, 2000);
        
        const order = pickupOrders.find(o => o.id === orderId);
        if (!order) {
          throw new Error('Order not found');
        }
        
        if (order.status !== 'ready') {
          throw new Error('Order is not ready for pickup');
        }
        
        const location = getLockerLocation(order.lockerNumber);
        
        return {
          success: true,
          lockerNumber: order.lockerNumber,
          location,
        };
      },
      'Failed to open locker'
    );
  }

  /**
   * Confirm order pickup
   */
  async confirmPickup(orderId: string): Promise<ApiResponse<{ success: boolean; pickupTime: string }>> {
    return this.request(
      async () => {
        await simulateNetworkDelay(1000, 1500);
        
        const order = pickupOrders.find(o => o.id === orderId);
        if (!order) {
          throw new Error('Order not found');
        }
        
        const pickupTime = new Date().toISOString();
        
        return {
          success: true,
          pickupTime,
        };
      },
      'Failed to confirm pickup'
    );
  }

  /**
   * Get locker location details
   */
  async getLockerLocationDetails(lockerNumber: string): Promise<ApiResponse<{ lockerNumber: string; location: string; instructions?: string }>> {
    return this.request(
      async () => {
        await simulateNetworkDelay();
        
        const location = getLockerLocation(lockerNumber);
        
        return {
          lockerNumber,
          location,
          instructions: 'Scan the QR code at the locker terminal to open your compartment.',
        };
      },
      `Failed to fetch locker location for ${lockerNumber}`
    );
  }

  /**
   * Get order status
   */
  async getOrderStatus(orderId: string): Promise<ApiResponse<{ orderId: string; status: PickupOrderStatus; estimatedReadyTime?: string }>> {
    return this.request(
      async () => {
        await simulateNetworkDelay();
        
        const order = pickupOrders.find(o => o.id === orderId);
        if (!order) {
          throw new Error('Order not found');
        }
        
        return {
          orderId: order.id,
          status: order.status,
          estimatedReadyTime: order.estimatedReadyTime,
        };
      },
      `Failed to fetch status for order ${orderId}`
    );
  }

  /**
   * Cancel order
   */
  async cancelOrder(orderId: string, reason?: string): Promise<ApiResponse<{ success: boolean }>> {
    return this.request(
      async () => {
        await simulateNetworkDelay(1000, 1500);
        
        const order = pickupOrders.find(o => o.id === orderId);
        if (!order) {
          throw new Error('Order not found');
        }
        
        if (order.status === 'picked-up') {
          throw new Error('Cannot cancel order that has been picked up');
        }
        
        return { success: true };
      },
      'Failed to cancel order'
    );
  }

  /**
   * Reschedule pickup time
   */
  async reschedulePickup(orderId: string, newTime: string): Promise<ApiResponse<{ success: boolean; newTime: string }>> {
    return this.request(
      async () => {
        await simulateNetworkDelay(1000, 1500);
        
        const order = pickupOrders.find(o => o.id === orderId);
        if (!order) {
          throw new Error('Order not found');
        }
        
        return {
          success: true,
          newTime,
        };
      },
      'Failed to reschedule pickup'
    );
  }

  /**
   * Get pickup history
   */
  async getPickupHistory(limit: number = 10): Promise<ApiResponse<PickupOrder[]>> {
    return this.request(
      async () => {
        await simulateNetworkDelay();
        
        const pickedUpOrders = pickupOrders.filter(o => o.status === 'picked-up');
        return pickedUpOrders
          .sort((a, b) => {
            const timeA = a.actualPickupTime ? new Date(a.actualPickupTime).getTime() : 0;
            const timeB = b.actualPickupTime ? new Date(b.actualPickupTime).getTime() : 0;
            return timeB - timeA;
          })
          .slice(0, limit);
      },
      'Failed to fetch pickup history'
    );
  }

  /**
   * Get statistics
   */
  async getPickupStatistics(): Promise<ApiResponse<{
    totalOrders: number;
    readyOrders: number;
    processingOrders: number;
    pickedUpOrders: number;
    averageWaitTime: string;
  }>> {
    return this.request(
      async () => {
        await simulateNetworkDelay();
        
        const totalOrders = pickupOrders.length;
        const readyOrders = pickupOrders.filter(o => o.status === 'ready').length;
        const processingOrders = pickupOrders.filter(o => o.status === 'processing').length;
        const pickedUpOrders = pickupOrders.filter(o => o.status === 'picked-up').length;
        
        // Mock average wait time
        const averageWaitTime = '1.5 hours';
        
        return {
          totalOrders,
          readyOrders,
          processingOrders,
          pickedUpOrders,
          averageWaitTime,
        };
      },
      'Failed to fetch pickup statistics'
    );
  }
}

// Export singleton instance
export const pickupService = new PickupService();
