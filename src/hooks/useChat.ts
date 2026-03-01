import { useState, useRef, useEffect, useCallback } from 'react';
import { useConversationById, useSendMessage, useMarkMessagesRead } from './useData';
import { ChatMessage } from '@/types';

interface UseChatProps {
  chatId: string;
  userId: string;
}

export const useChat = ({ chatId, userId }: UseChatProps) => {
  const { data: conversation, isLoading, error } = useConversationById(chatId);
  const sendMessageMutation = useSendMessage();
  const markReadMutation = useMarkMessagesRead();
  
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Update local messages when conversation data changes
  useEffect(() => {
    if (conversation?.messages) {
      setMessages(conversation.messages);
    }
  }, [conversation?.messages]);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  // Mark messages as read when conversation is opened
  useEffect(() => {
    if (conversation && conversation.unreadCount > 0) {
      markReadMutation.mutate(chatId);
    }
  }, [chatId]); // eslint-disable-line react-hooks/exhaustive-deps

  // Send a message
  const handleSendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;

    const messageText = text.trim();
    setInputValue(''); // Clear input immediately

    try {
      const result = await sendMessageMutation.mutateAsync({
        chatId,
        senderId: userId,
        text: messageText,
      });

      // Add user message immediately
      setMessages(prev => [...prev, result.message]);

      // Add auto-reply if exists (with typing simulation)
      if (result.autoReply) {
        setIsTyping(true);
        // Simulate pharmacist typing delay
        setTimeout(() => {
          setIsTyping(false);
          setMessages(prev => [...prev, result.autoReply!]);
        }, 1500);
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      // Restore the message input on error
      setInputValue(messageText);
    }
  }, [chatId, userId, sendMessageMutation]);

  // Quick reply handler
  const handleQuickReply = useCallback((replyText: string) => {
    handleSendMessage(replyText);
  }, [handleSendMessage]);

  // Form submit handler
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  }, [inputValue, handleSendMessage]);

  return {
    // State
    messages,
    conversation,
    isLoading,
    error,
    isTyping,
    inputValue,
    setInputValue,
    
    // Actions
    sendMessage: handleSendMessage,
    sendQuickReply: handleQuickReply,
    handleSubmit,
    
    // Refs
    messagesEndRef,
  };
};

// Hook for simulating pharmacist typing with variable speed
export const useTypingEffect = (
  text: string,
  speed: 'slow' | 'normal' | 'fast' = 'normal',
  enabled: boolean = true
) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!enabled) {
      setDisplayedText(text);
      setIsComplete(true);
      return;
    }

    setDisplayedText('');
    setIsComplete(false);

    const speeds = {
      slow: 100,
      normal: 50,
      fast: 25,
    };

    const typingSpeed = speeds[speed];
    let index = 0;

    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        setIsComplete(true);
        clearInterval(timer);
      }
    }, typingSpeed);

    return () => clearInterval(timer);
  }, [text, speed, enabled]);

  return { displayedText, isComplete };
};

// Hook for managing chat scroll position
export const useChatScroll = (dependencies: any[]) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);

  const checkScrollPosition = useCallback(() => {
    if (!scrollRef.current) return;
    
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    const threshold = 100; // pixels from bottom
    const atBottom = scrollHeight - scrollTop - clientHeight < threshold;
    
    setIsAtBottom(atBottom);
  }, []);

  const scrollToBottom = useCallback(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, []);

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    element.addEventListener('scroll', checkScrollPosition);
    return () => element.removeEventListener('scroll', checkScrollPosition);
  }, [checkScrollPosition]);

  // Auto-scroll when dependencies change and we're at bottom
  useEffect(() => {
    if (isAtBottom) {
      scrollToBottom();
    }
  }, dependencies); // eslint-disable-line react-hooks/exhaustive-deps

  return { scrollRef, isAtBottom, scrollToBottom };
};
