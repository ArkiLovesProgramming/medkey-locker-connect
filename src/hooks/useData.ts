import { useQuery, useMutation, useQueryClient, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { medicationService } from '@/services/medicationService';
import { prescriptionService } from '@/services/prescriptionService';
import { chatService } from '@/services/chatService';
import { pickupService } from '@/services/pickupService';
import { userService } from '@/services/userService';
import { 
  MedicationSearchFilters, 
  PrescriptionFilters, 
  ChatFilters,
  ChatMessage,
  Prescription,
  ActiveMedication,
  PastMedication,
  PickupOrder,
  FamilyMember,
  Notification,
} from '@/types';

// ============================================================================
// Medication Hooks
// ============================================================================

export const useMedications = (filters?: MedicationSearchFilters) => {
  return useQuery({
    queryKey: ['medications', 'active', filters],
    queryFn: () => medicationService.getActiveMedications(filters).then(res => res.data),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const usePastMedications = (filters?: MedicationSearchFilters) => {
  return useQuery({
    queryKey: ['medications', 'past', filters],
    queryFn: () => medicationService.getPastMedications(filters).then(res => res.data),
    staleTime: 5 * 60 * 1000,
  });
};

export const useMedicationDetails = (medicationId: string) => {
  return useQuery({
    queryKey: ['medication', medicationId],
    queryFn: () => medicationService.getMedicationDetails(medicationId).then(res => res.data),
    enabled: !!medicationId,
    staleTime: 10 * 60 * 1000,
  });
};

export const useRefillRequest = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ medicationId, prescriptionId }: { medicationId: string; prescriptionId: string }) =>
      medicationService.requestRefill(medicationId, prescriptionId).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medications'] });
      queryClient.invalidateQueries({ queryKey: ['prescriptions'] });
    },
  });
};

export const useSearchMedications = (query: string) => {
  return useQuery({
    queryKey: ['medications', 'search', query],
    queryFn: () => medicationService.searchMedications(query).then(res => res.data),
    enabled: query.length > 0,
    staleTime: 5 * 60 * 1000,
  });
};

export const useMedicationsDueForRefill = () => {
  return useQuery({
    queryKey: ['medications', 'refill-due'],
    queryFn: () => medicationService.getMedicationsDueForRefill().then(res => res.data),
    staleTime: 5 * 60 * 1000,
  });
};

export const useMarkMedicationTaken = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (medicationId: string) =>
      medicationService.markMedicationAsTaken(medicationId).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['medications'] });
    },
  });
};

export const useAdherenceStats = (memberId?: string, days: number = 30) => {
  return useQuery({
    queryKey: ['adherence', memberId, days],
    queryFn: () => medicationService.getAdherenceStats(memberId, days).then(res => res.data),
    staleTime: 10 * 60 * 1000,
  });
};

// ============================================================================
// Prescription Hooks
// ============================================================================

export const usePrescriptions = (filters?: PrescriptionFilters) => {
  return useQuery({
    queryKey: ['prescriptions', filters],
    queryFn: () => prescriptionService.getPrescriptions(filters).then(res => res.data),
    staleTime: 5 * 60 * 1000,
  });
};

export const usePrescriptionDetails = (prescriptionId: string) => {
  return useQuery({
    queryKey: ['prescription', prescriptionId],
    queryFn: () => prescriptionService.getPrescriptionDetails(prescriptionId).then(res => res.data),
    enabled: !!prescriptionId,
    staleTime: 5 * 60 * 1000,
  });
};

export const usePrescriptionsByStatus = (status: string) => {
  return useQuery({
    queryKey: ['prescriptions', 'status', status],
    queryFn: () => prescriptionService.getPrescriptionsByStatus(status as any).then(res => res.data),
    staleTime: 5 * 60 * 1000,
  });
};

export const usePrescriptionsByPatient = (patientId: string) => {
  return useQuery({
    queryKey: ['prescriptions', 'patient', patientId],
    queryFn: () => prescriptionService.getPrescriptionsByPatient(patientId).then(res => res.data),
    enabled: !!patientId,
    staleTime: 5 * 60 * 1000,
  });
};

export const useActivePrescriptions = () => {
  return useQuery({
    queryKey: ['prescriptions', 'active'],
    queryFn: () => prescriptionService.getActivePrescriptions().then(res => res.data),
    staleTime: 5 * 60 * 1000,
  });
};

export const usePrescriptionsNeedingApproval = () => {
  return useQuery({
    queryKey: ['prescriptions', 'needs-approval'],
    queryFn: () => prescriptionService.getPrescriptionsNeedingApproval().then(res => res.data),
    staleTime: 2 * 60 * 1000, // 2 minutes - more frequent for approvals
  });
};

export const usePrescriptionsDueForRefill = () => {
  return useQuery({
    queryKey: ['prescriptions', 'refill-due'],
    queryFn: () => prescriptionService.getPrescriptionsDueForRefill().then(res => res.data),
    staleTime: 5 * 60 * 1000,
  });
};

export const useApprovePrescription = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (prescriptionId: string) =>
      prescriptionService.approvePrescription(prescriptionId).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['prescriptions'] });
      queryClient.invalidateQueries({ queryKey: ['prescription'] });
    },
  });
};

export const useRejectPrescription = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ prescriptionId, reason }: { prescriptionId: string; reason?: string }) =>
      prescriptionService.rejectPrescription(prescriptionId, reason).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['prescriptions'] });
      queryClient.invalidateQueries({ queryKey: ['prescription'] });
    },
  });
};

export const useRequestPrescriptionRefill = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (prescriptionId: string) =>
      prescriptionService.requestPrescriptionRefill(prescriptionId).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['prescriptions'] });
    },
  });
};

export const useCalculateCoverage = (insurance: any, medicationCost: number, prescriptionId?: string) => {
  return useQuery({
    queryKey: ['coverage', prescriptionId, medicationCost],
    queryFn: () => prescriptionService.calculateCoverage(insurance, medicationCost, prescriptionId).then(res => res.data),
    enabled: !!insurance && medicationCost > 0,
    staleTime: 5 * 60 * 1000,
  });
};

// ============================================================================
// Chat Hooks
// ============================================================================

export const useChatConversations = (filters?: ChatFilters) => {
  return useQuery({
    queryKey: ['chat', 'conversations', filters],
    queryFn: () => chatService.getConversations(filters).then(res => res.data),
    staleTime: 2 * 60 * 1000,
  });
};

export const useConversationByPharmacist = (pharmacistId: string) => {
  return useQuery({
    queryKey: ['chat', 'pharmacist', pharmacistId],
    queryFn: () => chatService.getConversationByPharmacist(pharmacistId).then(res => res.data),
    enabled: !!pharmacistId,
    staleTime: 2 * 60 * 1000,
  });
};

export const useConversationById = (chatId: string) => {
  return useQuery({
    queryKey: ['chat', chatId],
    queryFn: () => chatService.getConversationById(chatId).then(res => res.data),
    enabled: !!chatId,
    staleTime: 1 * 60 * 1000, // 1 minute - frequent updates for active chats
  });
};

export const useSendMessage = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ chatId, senderId, text }: { chatId: string; senderId: string; text: string }) =>
      chatService.sendMessage(chatId, senderId, text).then(res => res.data),
    onSuccess: (data, variables) => {
      // Update the chat conversation with new messages
      queryClient.setQueryData(['chat', variables.chatId], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          messages: [
            ...old.messages,
            data.message,
            ...(data.autoReply ? [data.autoReply] : []),
          ],
          lastMessageAt: new Date().toISOString(),
        };
      });
      queryClient.invalidateQueries({ queryKey: ['chat', 'conversations'] });
    },
  });
};

export const useQuickReplies = (context?: string) => {
  return useQuery({
    queryKey: ['chat', 'quick-replies', context],
    queryFn: () => chatService.getQuickReplies(context).then(res => res.data),
    staleTime: 10 * 60 * 1000,
  });
};

export const usePharmacists = () => {
  return useQuery({
    queryKey: ['chat', 'pharmacists'],
    queryFn: () => chatService.getPharmacists().then(res => res.data),
    staleTime: 10 * 60 * 1000,
  });
};

export const useMarkMessagesRead = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (chatId: string) =>
      chatService.markMessagesAsRead(chatId).then(res => res.data),
    onSuccess: (_, chatId) => {
      queryClient.invalidateQueries({ queryKey: ['chat', chatId] });
      queryClient.invalidateQueries({ queryKey: ['chat', 'conversations'] });
    },
  });
};

export const useUnreadMessageCount = () => {
  return useQuery({
    queryKey: ['chat', 'unread-count'],
    queryFn: () => chatService.getUnreadMessageCount().then(res => res.data),
    staleTime: 1 * 60 * 1000,
  });
};

// ============================================================================
// Pickup Hooks
// ============================================================================

export const usePickupOrders = () => {
  return useQuery({
    queryKey: ['pickup', 'orders'],
    queryFn: () => pickupService.getPickupOrders().then(res => res.data),
    staleTime: 2 * 60 * 1000,
  });
};

export const useActivePickupOrders = () => {
  return useQuery({
    queryKey: ['pickup', 'orders', 'active'],
    queryFn: () => pickupService.getActivePickupOrders().then(res => res.data),
    staleTime: 2 * 60 * 1000,
  });
};

export const useReadyOrders = () => {
  return useQuery({
    queryKey: ['pickup', 'orders', 'ready'],
    queryFn: () => pickupService.getReadyOrders().then(res => res.data),
    staleTime: 2 * 60 * 1000,
  });
};

export const useOrderByNumber = (orderNumber: string) => {
  return useQuery({
    queryKey: ['pickup', 'order', orderNumber],
    queryFn: () => pickupService.getOrderByNumber(orderNumber).then(res => res.data),
    enabled: !!orderNumber,
    staleTime: 2 * 60 * 1000,
  });
};

export const useQRCode = (orderId: string) => {
  return useQuery({
    queryKey: ['pickup', 'qr', orderId],
    queryFn: () => pickupService.getQRCode(orderId).then(res => res.data),
    enabled: !!orderId,
    staleTime: 1 * 60 * 1000, // 1 minute - QR codes expire
    refetchInterval: 14 * 60 * 1000, // Refresh every 14 minutes
  });
};

export const useRefreshQRCode = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (orderId: string) =>
      pickupService.refreshQRCode(orderId).then(res => res.data),
    onSuccess: (data, orderId) => {
      queryClient.setQueryData(['pickup', 'qr', orderId], data);
    },
  });
};

export const useOpenLocker = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (orderId: string) =>
      pickupService.openLocker(orderId).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pickup'] });
    },
  });
};

export const useConfirmPickup = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (orderId: string) =>
      pickupService.confirmPickup(orderId).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pickup'] });
    },
  });
};

export const useCancelOrder = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ orderId, reason }: { orderId: string; reason?: string }) =>
      pickupService.cancelOrder(orderId, reason).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pickup'] });
    },
  });
};

export const useReschedulePickup = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ orderId, newTime }: { orderId: string; newTime: string }) =>
      pickupService.reschedulePickup(orderId, newTime).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pickup'] });
    },
  });
};

// ============================================================================
// User Hooks
// ============================================================================

export const useUserProfile = () => {
  return useQuery({
    queryKey: ['user', 'profile'],
    queryFn: () => userService.getUserProfile().then(res => res.data),
    staleTime: 10 * 60 * 1000,
  });
};

export const useFamilyMembers = () => {
  return useQuery({
    queryKey: ['user', 'family'],
    queryFn: () => userService.getFamilyMembers().then(res => res.data),
    staleTime: 10 * 60 * 1000,
  });
};

export const useUserNotifications = (unreadOnly?: boolean) => {
  return useQuery({
    queryKey: ['user', 'notifications', unreadOnly],
    queryFn: () => userService.getUserNotifications(unreadOnly).then(res => res.data),
    staleTime: 2 * 60 * 1000,
  });
};

export const useMarkNotificationRead = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (notificationId: string) =>
      userService.markNotificationRead(notificationId).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'notifications'] });
    },
  });
};

export const useMarkAllNotificationsRead = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: () =>
      userService.markAllNotificationsRead().then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'notifications'] });
    },
  });
};

export const useUnreadNotificationCount = () => {
  return useQuery({
    queryKey: ['user', 'notifications', 'unread-count'],
    queryFn: () => userService.getUnreadNotificationCount().then(res => res.data),
    staleTime: 1 * 60 * 1000,
  });
};

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ userId, updates }: { userId: string; updates: Partial<FamilyMember> }) =>
      userService.updateUserProfile(userId, updates).then(res => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'profile'] });
      queryClient.invalidateQueries({ queryKey: ['user', 'family'] });
    },
  });
};

export const useUserSettings = (userId: string) => {
  return useQuery({
    queryKey: ['user', 'settings', userId],
    queryFn: () => userService.getUserSettings(userId).then(res => res.data),
    enabled: !!userId,
    staleTime: 10 * 60 * 1000,
  });
};

export const useUpdateUserSettings = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ userId, settings }: { userId: string; settings: any }) =>
      userService.updateUserSettings(userId, settings).then(res => res.data),
    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({ queryKey: ['user', 'settings', userId] });
    },
  });
};

// ============================================================================
// Dashboard Data Hook (Composite)
// ============================================================================

export const useDashboardData = () => {
  const { data: activeMeds, isLoading: medsLoading } = useMedications();
  const { data: pendingPrescriptions, isLoading: pendingLoading } = usePrescriptionsNeedingApproval();
  const { data: refillDue, isLoading: refillLoading } = usePrescriptionsDueForRefill();
  const { data: unreadNotifications, isLoading: notifLoading } = useUserNotifications(true);
  
  const isLoading = medsLoading || pendingLoading || refillLoading || notifLoading;
  
  const dashboardData = {
    activeMedications: activeMeds?.length || 0,
    pendingPrescriptions: pendingPrescriptions?.length || 0,
    upcomingRefills: refillDue?.length || 0,
    unreadMessages: unreadNotifications?.filter(n => n.type === 'message').length || 0,
    actionNeeded: [
      ...(pendingPrescriptions?.map(p => ({
        id: p.id,
        type: 'approve' as const,
        title: `${p.medicationName} Needs Approval`,
        description: `Prescribed on ${p.datePrescribed}`,
        priority: 'high' as const,
        prescriptionId: p.id,
      })) || []),
      ...(refillDue?.slice(0, 3).map(p => ({
        id: `refill-${p.id}`,
        type: 'refill' as const,
        title: `${p.medicationName} Refill Due`,
        description: `Refills remaining: ${p.refillsRemaining}`,
        priority: 'medium' as const,
        prescriptionId: p.id,
      })) || []),
    ],
  };
  
  return {
    data: dashboardData,
    isLoading,
  };
};
