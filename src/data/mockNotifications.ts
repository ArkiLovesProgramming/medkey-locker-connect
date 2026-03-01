import { Notification, NotificationType } from '@/types';

export const notifications: Notification[] = [
  {
    id: 'notif-001',
    type: 'prescription-ready',
    title: 'Prescription Ready for Pickup',
    message: 'Amoxicillin for Lily is ready for pickup at MEDkey locker A-12',
    read: false,
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 minutes ago
    actionUrl: '/pickup',
    metadata: {
      prescriptionId: 'rx-001',
      orderId: 'order-001',
    },
  },
  {
    id: 'notif-002',
    type: 'refill-reminder',
    title: 'Refill Reminder: Atorvastatin',
    message: 'David\'s Atorvastatin refill is due. Request your refill now.',
    read: false,
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    actionUrl: '/medications',
    metadata: {
      medicationId: 'med-003',
      prescriptionId: 'rx-002',
    },
  },
  {
    id: 'notif-003',
    type: 'medication-reminder',
    title: 'Time to Take Your Medication',
    message: 'Sarah, it\'s time to take Lisinopril 10mg',
    read: true,
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
    actionUrl: '/medications',
    metadata: {
      medicationId: 'med-004',
      prescriptionId: 'rx-003',
    },
  },
  {
    id: 'notif-004',
    type: 'message',
    title: 'New Message from Pharmacist',
    message: 'Dr. Michael Chen sent you a message about Amoxicillin',
    read: true,
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
    actionUrl: '/chat',
    metadata: {
      conversationId: 'chat-001',
    },
  },
  {
    id: 'notif-005',
    type: 'prescription-ready',
    title: 'Prescription Ready for Pickup',
    message: 'Atorvastatin and Metformin for David are ready for pickup at locker B-05',
    read: true,
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    actionUrl: '/pickup',
    metadata: {
      prescriptionId: 'rx-002',
      orderId: 'order-002',
    },
  },
  {
    id: 'notif-006',
    type: 'delivery',
    title: 'Delivery Scheduled',
    message: 'Your medication delivery is scheduled for tomorrow between 2-4 PM',
    read: false,
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    actionUrl: '/delivery',
    metadata: {},
  },
  {
    id: 'notif-007',
    type: 'refill-reminder',
    title: 'Refill Reminder: Lisinopril',
    message: 'Sarah\'s Lisinopril needs approval. Please review and approve.',
    read: false,
    timestamp: new Date(Date.now() - 30 * 60 * 60 * 1000).toISOString(), // 30 hours ago
    actionUrl: '/prescriptions',
    metadata: {
      medicationId: 'med-004',
      prescriptionId: 'rx-003',
    },
  },
  {
    id: 'notif-008',
    type: 'appointment',
    title: 'Upcoming Appointment Reminder',
    message: 'Medication review appointment scheduled for Oct 28 at 3:00 PM',
    read: true,
    timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(), // 2 days ago
    actionUrl: '/appointments',
    metadata: {},
  },
  {
    id: 'notif-009',
    type: 'general',
    title: 'MEDkey App Update',
    message: 'New features available! Check out medication tracking and family sharing.',
    read: true,
    timestamp: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(), // 3 days ago
    actionUrl: '/profile',
    metadata: {},
  },
  {
    id: 'notif-010',
    type: 'prescription-ready',
    title: 'Prescription Ready for Pickup',
    message: 'Levothyroxine for Sarah is ready for pickup at locker A-08',
    read: true,
    timestamp: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000).toISOString(), // 11 days ago
    actionUrl: '/pickup',
    metadata: {
      prescriptionId: 'rx-007',
      orderId: 'order-003',
    },
  },
  {
    id: 'notif-011',
    type: 'medication-reminder',
    title: 'Weekly Medication Summary',
    message: 'Great job! All medications taken as prescribed this week.',
    read: true,
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 1 week ago
    actionUrl: '/dashboard',
    metadata: {},
  },
  {
    id: 'notif-012',
    type: 'general',
    title: 'Insurance Card Updated',
    message: 'Your Blue Cross Blue Shield insurance information has been updated',
    read: true,
    timestamp: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(), // 2 weeks ago
    actionUrl: '/profile',
    metadata: {},
  },
];

// Helper functions
export function getUnreadNotifications(): Notification[] {
  return notifications.filter(n => !n.read);
}

export function getNotificationsByType(type: NotificationType): Notification[] {
  return notifications.filter(n => n.type === type);
}

export function getRecentNotifications(limit: number = 10): Notification[] {
  return notifications
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, limit);
}

export function markNotificationAsRead(notificationId: string): Notification | null {
  const notification = notifications.find(n => n.id === notificationId);
  if (notification) {
    notification.read = true;
    return notification;
  }
  return null;
}

export function markAllNotificationsAsRead(): void {
  notifications.forEach(n => n.read = true);
}

export function getUnreadCount(): number {
  return notifications.filter(n => !n.read).length;
}
