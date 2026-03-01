import { useState } from "react";
import { ArrowLeft, HelpCircle, Camera, Send, Lock } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useChat } from "@/hooks/useChat";
import { useUserProfile, useChatConversations, useQuickReplies } from "@/hooks/useData";
import { formatMessageTime } from "@/utils/formatters";
import { AvatarWithImage } from "@/assets/AvatarSVG";

interface PharmacistChatProps {
  onNavigate: (screen: number) => void;
}

const PharmacistChat = ({ onNavigate }: PharmacistChatProps) => {
  const [inputValue, setInputValue] = useState("");
  const { data: user } = useUserProfile();
  const { data: conversations } = useChatConversations();
  const { data: quickRepliesData } = useQuickReplies();
  
  // Use first conversation or default to chat-001
  const activeChatId = conversations && conversations.length > 0 ? conversations[0].id : "chat-001";
  const { messages, conversation, isTyping, sendMessage, sendQuickReply, handleSubmit, messagesEndRef } = useChat({
    chatId: activeChatId,
    userId: user?.id || "user-001",
  });

  return (
    <div className="flex flex-col h-screen">
      {/* Header - Fixed at top */}
      <div className="bg-teal-dark px-5 pt-6 pb-5 rounded-b-3xl flex-shrink-0">
        <div className="flex items-center gap-3">
          <button onClick={() => onNavigate(1)} className="text-primary-foreground active:scale-90 transition-transform">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-3 flex-1">
            <div className="w-11 h-11 rounded-full bg-secondary flex items-center justify-center overflow-hidden">
              <AvatarWithImage
                imageUrl={conversation?.pharmacist?.avatar}
                alt={conversation?.pharmacist?.name || 'Pharmacist'}
                size={44}
                className="w-11 h-11"
              />
            </div>
            <div>
              <p className="text-primary-foreground font-bold text-sm">
                {conversation?.pharmacist?.name || 'Michael Chen, PharmD'}
              </p>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                <span className="text-primary-foreground/70 text-xs">Online</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => toast({ title: "ℹ️ About this Chat", description: "All messages are encrypted and PIPEDA compliant." })}
            className="text-primary-foreground/70 active:scale-90 transition-transform"
          >
            <HelpCircle className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* PIPEDA Banner - Fixed below header */}
      <div className="mx-5 mt-3 bg-amber/20 border border-amber/30 rounded-2xl px-4 py-2.5 flex items-center gap-2 flex-shrink-0">
        <Lock className="w-4 h-4 text-amber-fg flex-shrink-0" />
        <span className="text-xs font-medium text-amber-fg">Secure & PIPEDA Compliant Chat</span>
      </div>

      {/* Messages - Scrollable area */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
        {messages.map((msg) => {
          if (msg.senderType === "system") {
            return <p key={msg.id} className="text-center text-xs text-muted-foreground py-2">{formatMessageTime(msg.timestamp)}</p>;
          }
          if (msg.senderType === "pharmacist") {
            return (
              <div key={msg.id} className="flex gap-2 max-w-[85%] animate-fade-in">
                <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 mt-1 overflow-hidden">
                  <AvatarWithImage
                    imageUrl={conversation?.pharmacist?.avatar}
                    alt={conversation?.pharmacist?.name || 'Pharmacist'}
                    size={28}
                    className="w-7 h-7"
                  />
                </div>
                <div className="bg-card rounded-2xl rounded-tl-md px-4 py-3 shadow-sm">
                  <p className="text-sm text-foreground leading-relaxed">{msg.text}</p>
                </div>
              </div>
            );
          }
          return (
            <div key={msg.id} className="flex justify-end animate-fade-in">
              <div className="bg-teal-dark rounded-2xl rounded-tr-md px-4 py-3 max-w-[80%]">
                <p className="text-sm text-primary-foreground leading-relaxed">{msg.text}</p>
              </div>
            </div>
          );
        })}

        {/* Typing indicator */}
        {isTyping && (
          <div className="flex gap-2 max-w-[85%] animate-fade-in">
            <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 mt-1 overflow-hidden">
              <AvatarWithImage
                imageUrl={conversation?.pharmacist?.avatar}
                alt={conversation?.pharmacist?.name || 'Pharmacist'}
                size={28}
                className="w-7 h-7"
              />
            </div>
            <div className="bg-card rounded-2xl rounded-tl-md px-4 py-3 shadow-sm">
              <div className="flex gap-1.5 items-center h-5">
                <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:0ms]" />
                <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:150ms]" />
                <span className="w-2 h-2 rounded-full bg-muted-foreground/40 animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Replies and Input - Fixed at bottom */}
      <div className="flex-shrink-0">
        {/* Quick Replies */}
        <div className="px-5 pb-2">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {quickRepliesData && quickRepliesData.length > 0 ? (
              quickRepliesData.map((qr) => (
                <button
                  key={qr.id}
                  onClick={() => sendQuickReply(qr.text)}
                  className="flex-shrink-0 px-4 py-2 rounded-full border border-border text-sm font-medium text-teal-dark bg-card hover:bg-secondary active:scale-95 transition-all"
                >
                  {qr.text}
                </button>
              ))
            ) : (
              // Default quick replies
              [
                { id: 'qr-001', text: 'Side effects?' },
                { id: 'qr-002', text: 'Request a refill' },
                { id: 'qr-003', text: 'Drug interactions?' }
              ].map((qr) => (
                <button
                  key={qr.id}
                  onClick={() => sendQuickReply(qr.text)}
                  className="flex-shrink-0 px-4 py-2 rounded-full border border-border text-sm font-medium text-teal-dark bg-card hover:bg-secondary active:scale-95 transition-all"
                >
                  {qr.text}
                </button>
              ))
            )}
          </div>
        </div>

        {/* Input Area - Fixed at bottom */}
        <div className="px-5 pb-6 pt-2 bg-background border-t border-border">
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-3"
        >
          <button
            type="button"
            onClick={() => toast({ title: "📷 Camera", description: "Camera feature coming soon." })}
            className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0 active:scale-90 transition-transform"
          >
            <Camera className="w-5 h-5 text-muted-foreground" />
          </button>
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-card rounded-full border border-border px-4 py-2.5 text-sm text-foreground outline-none focus:border-teal-dark/50 transition-colors placeholder:text-muted-foreground"
          />
          <button
            type="submit"
            disabled={!inputValue.trim()}
            className="w-10 h-10 rounded-full bg-teal-dark flex items-center justify-center flex-shrink-0 active:scale-90 transition-transform disabled:opacity-40"
          >
            <Send className="w-5 h-5 text-primary-foreground" />
          </button>
        </form>
      </div>
      </div>
    </div>
  );
};

export default PharmacistChat;
