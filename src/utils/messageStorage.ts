import { Conversation, Message } from '@/types/message'

const CONVERSATIONS_STORAGE_KEY = 'user_conversations'
const MESSAGES_STORAGE_KEY = 'conversation_messages'

// Generate simple IDs
function generateId(): string {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9)
}

// Conversation storage
export function saveConversation(conversation: Conversation): void {
  try {
    const existingConversations = getAllConversations()
    const updatedConversations = [...existingConversations, conversation]
    localStorage.setItem(CONVERSATIONS_STORAGE_KEY, JSON.stringify(updatedConversations))
  } catch (error) {
    console.error('Failed to save conversation:', error)
  }
}

export function getAllConversations(): Conversation[] {
  try {
    const conversations = localStorage.getItem(CONVERSATIONS_STORAGE_KEY)
    return conversations ? JSON.parse(conversations) : []
  } catch (error) {
    console.error('Failed to retrieve conversations:', error)
    return []
  }
}

export function getConversationsByUser(userId: string): Conversation[] {
  try {
    const allConversations = getAllConversations()
    return allConversations.filter(
      conversation => conversation.guestId === userId || conversation.hostId === userId
    )
  } catch (error) {
    console.error('Failed to retrieve user conversations:', error)
    return []
  }
}

export function getConversationById(conversationId: string): Conversation | null {
  try {
    const allConversations = getAllConversations()
    return allConversations.find(conversation => conversation.id === conversationId) || null
  } catch (error) {
    console.error('Failed to retrieve conversation:', error)
    return null
  }
}

// Message storage
export function saveMessage(message: Message): void {
  try {
    const existingMessages = getAllMessages()
    const updatedMessages = [...existingMessages, message]
    localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(updatedMessages))
  } catch (error) {
    console.error('Failed to save message:', error)
  }
}

export function getAllMessages(): Message[] {
  try {
    const messages = localStorage.getItem(MESSAGES_STORAGE_KEY)
    return messages ? JSON.parse(messages) : []
  } catch (error) {
    console.error('Failed to retrieve messages:', error)
    return []
  }
}

export function getMessagesByConversation(conversationId: string): Message[] {
  try {
    const allMessages = getAllMessages()
    return allMessages
      .filter(message => message.conversationId === conversationId)
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
  } catch (error) {
    console.error('Failed to retrieve conversation messages:', error)
    return []
  }
}

// Helper functions
export function createConversation(
  propertyId: string,
  propertyTitle: string,
  propertyImage: string,
  guestId: string,
  guestName: string,
  hostId: string,
  hostName: string,
  bookingId?: string
): Conversation {
  const conversation: Conversation = {
    id: generateId(),
    propertyId,
    propertyTitle,
    propertyImage,
    guestId,
    guestName,
    hostId,
    hostName,
    bookingId,
    unreadCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  
  saveConversation(conversation)
  return conversation
}

export function sendMessage(
  conversationId: string,
  senderId: string,
  senderName: string,
  senderRole: 'guest' | 'host',
  content: string
): Message {
  const message: Message = {
    id: generateId(),
    conversationId,
    senderId,
    senderName,
    senderRole,
    content,
    timestamp: new Date().toISOString(),
    isRead: false
  }
  
  saveMessage(message)
  
  // Update conversation's last message and unread count
  const conversation = getConversationById(conversationId)
  if (conversation) {
    const allConversations = getAllConversations()
    const updatedConversations = allConversations.map(conv => {
      if (conv.id === conversationId) {
        return {
          ...conv,
          lastMessage: message,
          unreadCount: conv.unreadCount + 1,
          updatedAt: new Date().toISOString()
        }
      }
      return conv
    })
    localStorage.setItem(CONVERSATIONS_STORAGE_KEY, JSON.stringify(updatedConversations))
  }
  
  return message
} 