export interface Message {
  id: string
  conversationId: string
  senderId: string
  senderName: string
  senderRole: 'guest' | 'host'
  content: string
  timestamp: string
  isRead: boolean
}

export interface Conversation {
  id: string
  propertyId: string
  propertyTitle: string
  propertyImage: string
  guestId: string
  guestName: string
  hostId: string
  hostName: string
  bookingId?: string
  lastMessage?: Message
  unreadCount: number
  createdAt: string
  updatedAt: string
} 