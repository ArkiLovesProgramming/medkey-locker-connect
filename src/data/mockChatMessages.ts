import { PharmacistChat, ChatMessage, Pharmacist, QuickReply } from '@/types';

// Pharmacists database
export const pharmacists: Record<string, Pharmacist> = {
  'michael-chen': {
    id: 'pharm-001',
    name: 'Michael Chen',
    title: 'Clinical Pharmacist',
    credentials: 'PharmD, BCPS',
    avatar: undefined, // Use SVG avatar
    isOnline: true,
    specialty: 'General Practice',
  },
  'emily-rodriguez': {
    id: 'pharm-002',
    name: 'Emily Rodriguez',
    title: 'Senior Pharmacist',
    credentials: 'PharmD, RPh',
    avatar: undefined, // Use SVG avatar
    isOnline: false,
    specialty: 'Pediatrics',
  },
  'james-thompson': {
    id: 'pharm-003',
    name: 'James Thompson',
    title: 'Pharmacist',
    credentials: 'RPh, CDE',
    avatar: undefined, // Use SVG avatar
    isOnline: true,
    specialty: 'Diabetes Care',
  },
};

// Quick replies with triggers
export const quickReplies: QuickReply[] = [
  {
    id: 'qr-001',
    text: 'Side effects?',
    category: 'side-effects',
    triggers: ['side effects', 'side effect', 'adverse', 'reaction', 'symptoms'],
  },
  {
    id: 'qr-002',
    text: 'Request a refill',
    category: 'refill',
    triggers: ['refill', 'renew', 'repeat', 'more medication'],
  },
  {
    id: 'qr-003',
    text: 'Drug interactions?',
    category: 'interactions',
    triggers: ['interaction', 'interactions', 'mix', 'combine', 'together'],
  },
  {
    id: 'qr-004',
    text: 'How should I take this?',
    category: 'dosage',
    triggers: ['how to take', 'when to take', 'dosage', 'dose', 'instructions'],
  },
  {
    id: 'qr-005',
    text: 'Can I take this with food?',
    category: 'food',
    triggers: ['food', 'eat', 'meal', 'empty stomach', 'with food'],
  },
  {
    id: 'qr-006',
    text: 'What if I miss a dose?',
    category: 'missed-dose',
    triggers: ['miss', 'missed', 'forgot', 'forget'],
  },
  {
    id: 'qr-007',
    text: 'Is this safe during pregnancy?',
    category: 'pregnancy',
    triggers: ['pregnancy', 'pregnant', 'breastfeeding', 'nursing'],
  },
  {
    id: 'qr-008',
    text: 'When will it be ready?',
    category: 'pickup',
    triggers: ['ready', 'pickup', 'collect', 'when'],
  },
];

// Comprehensive auto-replies database
export const autoReplies: Record<string, string> = {
  // Side effects responses
  'side-effects': "Common side effects may include nausea, headache, dizziness, or fatigue. These usually improve as your body adjusts. Contact us immediately if you experience severe reactions like difficulty breathing, swelling, or severe rash.",
  
  'side-effects-amoxicillin': "Common side effects of Amoxicillin include nausea, diarrhea, and rash. Taking it with food can help reduce stomach upset. Contact us immediately if you notice severe swelling, difficulty breathing, or severe skin reactions.",
  
  'side-effects-atorvastatin': "Common side effects include muscle pain, weakness, or tenderness. Rare but serious side effects include liver problems. Contact your doctor if you experience unusual fatigue, dark urine, or yellowing of skin/eyes.",
  
  'side-effects-lisinopril': "Common side effects include dizziness, headache, and dry cough. The cough may persist but is usually harmless. Contact us if you experience swelling of face/lips/tongue or difficulty breathing.",
  
  // Refill responses
  'refill': "I've initiated a refill request for your medication. You'll receive a notification when it's ready for pickup at the MEDkey station. This typically takes 24-48 hours.",
  
  'refill-urgent': "I've marked your refill request as urgent. We'll expedite the processing. You should receive a notification within 12-24 hours when it's ready.",
  
  // Drug interactions
  'interactions': "Drug interactions can affect how medications work. Please provide all medications, supplements, and herbal products you're taking so I can check for potential interactions.",
  
  'interactions-amoxicillin': "Amoxicillin may interact with blood thinners like Warfarin, methotrexate, and probenecid. It may also reduce the effectiveness of birth control pills. Please inform us of all medications you're taking.",
  
  'interactions-atorvastatin': "Atorvastatin interacts with grapefruit products (avoid consuming), certain antibiotics, antifungals, and other cholesterol medications. Always check with us before starting new medications.",
  
  // Dosage instructions
  'dosage-general': "Always follow the dosage instructions on your prescription label. Take at the same time(s) each day for best results. Do not exceed the prescribed dose.",
  
  'dosage-amoxicillin': "Take Amoxicillin every 8 hours (3 times daily) for the full prescribed course, usually 7-10 days. Complete the entire course even if you feel better to prevent antibiotic resistance.",
  
  'dosage-atorvastatin': "Take Atorvastatin once daily in the evening for best results. Can be taken with or without food. Avoid grapefruit products as they can increase drug levels.",
  
  'dosage-lisinopril': "Take Lisinopril once daily at the same time each day, preferably in the morning. Can be taken with or without food. Rise slowly from sitting/lying positions to minimize dizziness.",
  
  // Food interactions
  'food-general': "Some medications should be taken with food to reduce stomach upset, while others work best on an empty stomach. Check your specific medication instructions or ask me for details.",
  
  'food-amoxicillin': "Amoxicillin can be taken with or without food. Taking it with food may help reduce stomach upset. Complete the full course regardless of meals.",
  
  'food-atorvastatin': "Atorvastatin can be taken with or without food. However, avoid grapefruit and grapefruit juice as they can significantly increase drug levels and side effects.",
  
  'food-lisinopril': "Lisinopril can be taken with or without food. Maintain consistent timing relative to meals for best results.",
  
  // Missed dose
  'missed-dose-general': "If you miss a dose, take it as soon as you remember. If it's almost time for your next dose, skip the missed dose. Do not double up to make up for a missed dose.",
  
  'missed-dose-amoxicillin': "If you miss a dose of Amoxicillin, take it as soon as you remember. If it's within 2 hours of your next dose, skip the missed dose. Continue your regular schedule. Do not take two doses at once.",
  
  'missed-dose-atorvastatin': "If you miss a dose of Atorvastatin, take it as soon as you remember. If it's been more than 12 hours or close to your next dose, skip it. Resume your regular schedule the next day.",
  
  // Pregnancy/breastfeeding
  'pregnancy': "Medication safety during pregnancy and breastfeeding varies greatly. Please consult with your doctor and pharmacist before taking any medication during pregnancy or while breastfeeding.",
  
  'pregnancy-amoxicillin': "Amoxicillin is generally considered safe during pregnancy (Category B) and breastfeeding. However, always consult your OB/GYN before taking any medication.",
  
  // Pickup timing
  'pickup': "Most prescriptions are ready within 24-48 hours. You'll receive a notification when your medication is ready for pickup at the MEDkey locker station.",
  
  'pickup-urgent': "For urgent prescriptions, we offer same-day service if received before 2 PM. You'll receive a notification with your locker code when ready.",
  
  // Default responses
  'default': "Thank you for your message. I've reviewed your question and will provide detailed guidance. Is there anything else I can help you with regarding your medications?",
  
  'greeting': "Hello! I'm your MEDkey pharmacist. How can I help you with your medications today? Feel free to ask about side effects, interactions, dosage, or any other medication questions.",
  
  'thanks': "You're welcome! Don't hesitate to reach out if you have any other questions about your medications. Your health is our priority!",
  
  'goodbye': "Take care! Remember, we're always here if you have questions about your medications. Have a great day!",
};

// Active chat conversations
export const chatConversations: PharmacistChat[] = [
  {
    id: 'chat-001',
    pharmacist: pharmacists['michael-chen'],
    messages: [
      {
        id: 'msg-001',
        conversationId: 'chat-001',
        senderId: 'system',
        senderType: 'system',
        text: 'Today, 10:42 AM',
        timestamp: '2025-10-21T10:42:00Z',
        read: true,
      },
      {
        id: 'msg-002',
        conversationId: 'chat-001',
        senderId: 'pharm-001',
        senderType: 'pharmacist',
        text: 'Hello Sarah, I see you just picked up Amoxicillin for Lily. Do you have any questions about the dosage?',
        timestamp: '2025-10-21T10:42:30Z',
        read: true,
      },
      {
        id: 'msg-003',
        conversationId: 'chat-001',
        senderId: 'user-001',
        senderType: 'user',
        text: 'Yes, should she take it with food?',
        timestamp: '2025-10-21T10:43:15Z',
        read: true,
      },
      {
        id: 'msg-004',
        conversationId: 'chat-001',
        senderId: 'pharm-001',
        senderType: 'pharmacist',
        text: 'Yes, taking it with a meal or a snack will help prevent stomach upset. Make sure she finishes the full course even if she feels better.',
        timestamp: '2025-10-21T10:44:00Z',
        read: true,
      },
    ],
    lastMessageAt: '2025-10-21T10:44:00Z',
    unreadCount: 0,
  },
  {
    id: 'chat-002',
    pharmacist: pharmacists['james-thompson'],
    messages: [
      {
        id: 'msg-005',
        conversationId: 'chat-002',
        senderId: 'system',
        senderType: 'system',
        text: 'Yesterday, 3:15 PM',
        timestamp: '2025-10-20T15:15:00Z',
        read: true,
      },
      {
        id: 'msg-006',
        conversationId: 'chat-002',
        senderId: 'user-002',
        senderType: 'user',
        text: 'Hi, I have a question about my Metformin. Can I take it with my other medications?',
        timestamp: '2025-10-20T15:16:00Z',
        read: true,
      },
      {
        id: 'msg-007',
        conversationId: 'chat-002',
        senderId: 'pharm-003',
        senderType: 'pharmacist',
        text: 'Hello David! Metformin is generally safe to take with most medications. However, certain diabetes medications, contrast dyes for imaging tests, and excessive alcohol can interact. What other medications are you currently taking?',
        timestamp: '2025-10-20T15:18:30Z',
        read: true,
      },
      {
        id: 'msg-008',
        conversationId: 'chat-002',
        senderId: 'user-002',
        senderType: 'user',
        text: 'I take Atorvastatin and Lisinopril',
        timestamp: '2025-10-20T15:19:45Z',
        read: true,
      },
      {
        id: 'msg-009',
        conversationId: 'chat-002',
        senderId: 'pharm-003',
        senderType: 'pharmacist',
        text: 'Good news! Metformin, Atorvastatin, and Lisinopril are commonly prescribed together and don\'t have significant interactions. Just make sure to take Metformin with meals to reduce stomach upset. Continue monitoring your blood sugar as directed.',
        timestamp: '2025-10-20T15:21:00Z',
        read: true,
      },
    ],
    lastMessageAt: '2025-10-20T15:21:00Z',
    unreadCount: 0,
  },
  {
    id: 'chat-003',
    pharmacist: pharmacists['emily-rodriguez'],
    messages: [
      {
        id: 'msg-010',
        conversationId: 'chat-003',
        senderId: 'system',
        senderType: 'system',
        text: 'Oct 18, 9:30 AM',
        timestamp: '2025-10-18T09:30:00Z',
        read: true,
      },
      {
        id: 'msg-011',
        conversationId: 'chat-003',
        senderId: 'user-001',
        senderType: 'user',
        text: 'My daughter has been experiencing diarrhea after starting Amoxicillin. Is this normal?',
        timestamp: '2025-10-18T09:31:00Z',
        read: true,
      },
      {
        id: 'msg-012',
        conversationId: 'chat-003',
        senderId: 'pharm-002',
        senderType: 'pharmacist',
        text: 'Hi Sarah! Yes, diarrhea is a common side effect of Amoxicillin, especially in children. Make sure she stays hydrated. You can give it with food to help reduce this. If the diarrhea becomes severe or persists after finishing the medication, please contact her pediatrician.',
        timestamp: '2025-10-18T09:33:00Z',
        read: true,
      },
    ],
    lastMessageAt: '2025-10-18T09:33:00Z',
    unreadCount: 0,
  },
];

// Helper functions
export function getChatByPharmacistId(pharmacistId: string): PharmacistChat | undefined {
  return chatConversations.find(c => c.pharmacist.id === pharmacistId);
}

export function getChatById(chatId: string): PharmacistChat | undefined {
  return chatConversations.find(c => c.id === chatId);
}

export function findQuickReplyByTrigger(text: string): QuickReply | undefined {
  const lowerText = text.toLowerCase();
  return quickReplies.find(qr => 
    qr.triggers?.some(trigger => lowerText.includes(trigger.toLowerCase()))
  );
}

export function getAutoReply(key: string): string {
  return autoReplies[key] || autoReplies['default'];
}

export function findAutoReplyByKeyword(text: string): string {
  const lowerText = text.toLowerCase();
  
  // Check for specific medication mentions
  if (lowerText.includes('amoxicillin')) {
    if (lowerText.includes('side effect')) return autoReplies['side-effects-amoxicillin'];
    if (lowerText.includes('interaction')) return autoReplies['interactions-amoxicillin'];
    if (lowerText.includes('dosage') || lowerText.includes('how to')) return autoReplies['dosage-amoxicillin'];
    if (lowerText.includes('food')) return autoReplies['food-amoxicillin'];
    if (lowerText.includes('miss')) return autoReplies['missed-dose-amoxicillin'];
  }
  
  if (lowerText.includes('atorvastatin')) {
    if (lowerText.includes('side effect')) return autoReplies['side-effects-atorvastatin'];
    if (lowerText.includes('interaction')) return autoReplies['interactions-atorvastatin'];
    if (lowerText.includes('dosage') || lowerText.includes('how to')) return autoReplies['dosage-atorvastatin'];
    if (lowerText.includes('food')) return autoReplies['food-atorvastatin'];
    if (lowerText.includes('miss')) return autoReplies['missed-dose-atorvastatin'];
  }
  
  if (lowerText.includes('lisinopril')) {
    if (lowerText.includes('dosage') || lowerText.includes('how to')) return autoReplies['dosage-lisinopril'];
    if (lowerText.includes('food')) return autoReplies['food-lisinopril'];
  }
  
  // Check for general categories
  if (lowerText.includes('side effect')) return autoReplies['side-effects'];
  if (lowerText.includes('refill')) return autoReplies['refill'];
  if (lowerText.includes('interaction')) return autoReplies['interactions'];
  if (lowerText.includes('dosage') || lowerText.includes('how to take')) return autoReplies['dosage-general'];
  if (lowerText.includes('food') || lowerText.includes('meal')) return autoReplies['food-general'];
  if (lowerText.includes('miss') || lowerText.includes('forgot')) return autoReplies['missed-dose-general'];
  if (lowerText.includes('pregnancy') || lowerText.includes('breastfeed')) return autoReplies['pregnancy'];
  if (lowerText.includes('ready') || lowerText.includes('pickup')) return autoReplies['pickup'];
  
  return autoReplies['default'];
}
