import { 
  PharmacistChat, 
  ChatMessage, 
  Pharmacist,
  QuickReply,
  ChatFilters,
  ApiResponse 
} from '@/types';
import { BaseApiService, simulateNetworkDelay } from './api';
import { 
  pharmacists,
  chatConversations,
  quickReplies,
  getChatByPharmacistId,
  getChatById,
  findQuickReplyByTrigger,
  findAutoReplyByKeyword,
} from '@/data/mockChatMessages';

class ChatService extends BaseApiService {
  /**
   * Get all chat conversations
   */
  async getChatConversations(): Promise<ApiResponse<PharmacistChat[]>> {
    return this.request(
      async () => {
        await simulateNetworkDelay();
        return chatConversations;
      },
      'Failed to fetch chat conversations'
    );
  }

  /**
   * Get chat conversation by pharmacist ID
   */
  async getConversationByPharmacist(pharmacistId: string): Promise<ApiResponse<PharmacistChat | null>> {
    return this.request(
      async () => {
        await simulateNetworkDelay();
        const chat = getChatByPharmacistId(pharmacistId);
        return chat || null;
      },
      `Conversation with pharmacist ${pharmacistId} not found`
    );
  }

  /**
   * Get chat conversation by ID
   */
  async getConversationById(chatId: string): Promise<ApiResponse<PharmacistChat | null>> {
    return this.request(
      async () => {
        await simulateNetworkDelay();
        const chat = getChatById(chatId);
        return chat || null;
      },
      `Conversation ${chatId} not found`
    );
  }

  /**
   * Get conversations with filters
   */
  async getConversations(filters?: ChatFilters): Promise<ApiResponse<PharmacistChat[]>> {
    return this.request(
      async () => {
        await simulateNetworkDelay();
        
        let result = [...chatConversations];
        
        if (filters) {
          // Filter by pharmacist
          if (filters.pharmacistId) {
            result = result.filter(chat => chat.pharmacist.id === filters.pharmacistId);
          }
          
          // Filter unread only
          if (filters.unreadOnly) {
            result = result.filter(chat => chat.unreadCount > 0);
          }
          
          // Filter by date range
          if (filters.dateRange) {
            const startDate = new Date(filters.dateRange.start);
            const endDate = new Date(filters.dateRange.end);
            result = result.filter(chat => {
              const chatDate = new Date(chat.lastMessageAt);
              return chatDate >= startDate && chatDate <= endDate;
            });
          }
        }
        
        // Sort by last message time (newest first)
        return result.sort((a, b) => 
          new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime()
        );
      },
      'Failed to fetch conversations'
    );
  }

  /**
   * Send a message in a conversation
   */
  async sendMessage(
    chatId: string,
    senderId: string,
    text: string
  ): Promise<ApiResponse<{ message: ChatMessage; autoReply?: ChatMessage }>> {
    return this.request(
      async () => {
        await simulateNetworkDelay();
        
        const chat = getChatById(chatId);
        if (!chat) {
          throw new Error('Conversation not found');
        }
        
        // Create new message
        const newMessage: ChatMessage = {
          id: `msg-${Date.now()}`,
          conversationId: chatId,
          senderId,
          senderType: 'user',
          text,
          timestamp: new Date().toISOString(),
          read: false,
        };
        
        // Find auto-reply based on message content
        const autoReplyText = findAutoReplyByKeyword(text);
        let autoReply: ChatMessage | undefined;
        
        if (autoReplyText) {
          // Simulate typing delay
          await simulateNetworkDelay(1000, 2000);
          
          autoReply = {
            id: `msg-${Date.now() + 1}`,
            conversationId: chatId,
            senderId: chat.pharmacist.id,
            senderType: 'pharmacist',
            text: autoReplyText,
            timestamp: new Date().toISOString(),
            read: false,
          };
        }
        
        return {
          message: newMessage,
          autoReply,
        };
      },
      'Failed to send message'
    );
  }

  /**
   * Get quick replies based on context
   */
  async getQuickReplies(context?: string): Promise<ApiResponse<QuickReply[]>> {
    return this.request(
      async () => {
        await simulateNetworkDelay();
        
        if (!context) {
          return quickReplies;
        }
        
        // Find relevant quick replies based on context
        const lowerContext = context.toLowerCase();
        return quickReplies.filter(qr => 
          qr.triggers?.some(trigger => 
            lowerContext.includes(trigger.toLowerCase())
          )
        );
      },
      'Failed to fetch quick replies'
    );
  }

  /**
   * Get all pharmacists
   */
  async getPharmacists(): Promise<ApiResponse<Pharmacist[]>> {
    return this.request(
      async () => {
        await simulateNetworkDelay();
        return Object.values(pharmacists);
      },
      'Failed to fetch pharmacists'
    );
  }

  /**
   * Get pharmacist by ID
   */
  async getPharmacist(pharmacistId: string): Promise<ApiResponse<Pharmacist | null>> {
    return this.request(
      async () => {
        await simulateNetworkDelay();
        const pharmacist = pharmacists[pharmacistId];
        return pharmacist || null;
      },
      `Pharmacist ${pharmacistId} not found`
    );
  }

  /**
   * Mark messages as read
   */
  async markMessagesAsRead(chatId: string): Promise<ApiResponse<{ success: boolean }>> {
    return this.request(
      async () => {
        await simulateNetworkDelay();
        
        const chat = getChatById(chatId);
        if (!chat) {
          throw new Error('Conversation not found');
        }
        
        // In a real app, this would update the chat's unread count
        return { success: true };
      },
      'Failed to mark messages as read'
    );
  }

  /**
   * Get unread message count
   */
  async getUnreadMessageCount(): Promise<ApiResponse<{ count: number }>> {
    return this.request(
      async () => {
        await simulateNetworkDelay();
        const count = chatConversations.reduce((sum, chat) => sum + chat.unreadCount, 0);
        return { count };
      },
      'Failed to fetch unread message count'
    );
  }

  /**
   * Start a new conversation with a pharmacist
   */
  async startConversation(
    pharmacistId: string,
    userId: string,
    initialMessage: string
  ): Promise<ApiResponse<{ chatId: string; message: ChatMessage }>> {
    return this.request(
      async () => {
        await simulateNetworkDelay(1000, 1500);
        
        const pharmacist = pharmacists[pharmacistId];
        if (!pharmacist) {
          throw new Error('Pharmacist not found');
        }
        
        const chatId = `chat-${Date.now()}`;
        
        const message: ChatMessage = {
          id: `msg-${Date.now()}`,
          conversationId: chatId,
          senderId: userId,
          senderType: 'user',
          text: initialMessage,
          timestamp: new Date().toISOString(),
          read: false,
        };
        
        return {
          chatId,
          message,
        };
      },
      'Failed to start conversation'
    );
  }

  /**
   * Send attachment (image, document, etc.)
   */
  async sendAttachment(
    chatId: string,
    senderId: string,
    attachmentType: 'image' | 'document' | 'prescription',
    attachmentUrl: string,
    attachmentName?: string
  ): Promise<ApiResponse<{ message: ChatMessage }>> {
    return this.request(
      async () => {
        await simulateNetworkDelay(1500, 2500);
        
        const chat = getChatById(chatId);
        if (!chat) {
          throw new Error('Conversation not found');
        }
        
        const message: ChatMessage = {
          id: `msg-${Date.now()}`,
          conversationId: chatId,
          senderId,
          senderType: 'user',
          text: `[${attachmentType}] ${attachmentName || 'Attachment'}`,
          timestamp: new Date().toISOString(),
          read: false,
          attachments: [{
            type: attachmentType,
            url: attachmentUrl,
            name: attachmentName,
          }],
        };
        
        return { message };
      },
      'Failed to send attachment'
    );
  }
}

// Export singleton instance
export const chatService = new ChatService();
