'use client'

import { useState, useEffect, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import Header from '@/components/Header'
import { getConversationById, getMessagesByConversation, sendMessage } from '@/utils/messageStorage'
import { Conversation, Message } from '@/types/message'

export default function ConversationPage() {
  const params = useParams()
  const router = useRouter()
  const { data: session, status } = useSession()
  const conversationId = params.id as string
  
  const [conversation, setConversation] = useState<Conversation | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSending, setIsSending] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (status === 'loading') return
    
    if (!session) {
      router.push('/auth/signin')
      return
    }

    // Load conversation and messages
    const conversationData = getConversationById(conversationId)
    if (!conversationData) {
      router.push('/messages')
      return
    }

    // Check if user is part of this conversation
    if (conversationData.guestId !== session.user?.id && conversationData.hostId !== session.user?.id) {
      router.push('/messages')
      return
    }

    setConversation(conversationData)
    const conversationMessages = getMessagesByConversation(conversationId)
    setMessages(conversationMessages)
    setIsLoading(false)
  }, [session, status, conversationId, router])

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || !session || !conversation) return

    setIsSending(true)
    
    try {
      const message = sendMessage(
        conversationId,
        session.user?.id || '',
        session.user?.name || '',
        session.user?.role as 'guest' | 'host',
        newMessage.trim()
      )
      
      setMessages(prev => [...prev, message])
      setNewMessage('')
      
      // Update conversation in state
      setConversation(prev => prev ? {
        ...prev,
        lastMessage: message,
        updatedAt: new Date().toISOString()
      } : null)
    } catch (error) {
      console.error('Failed to send message:', error)
    } finally {
      setIsSending(false)
    }
  }

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  if (status === 'loading' || isLoading) {
    return (
      <>
        <Header />
        <div className="container mt-5">
          <div className="d-flex justify-content-center">
            <div className="spinner-border" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
      </>
    )
  }

  if (!conversation) {
    return (
      <>
        <Header />
        <div className="container mt-5">
          <div className="alert alert-danger">
            <h4>Conversation Not Found</h4>
            <p>The conversation you're looking for doesn't exist.</p>
            <Link href="/messages" className="btn btn-primary">
              Back to Messages
            </Link>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            {/* Conversation Header */}
            <div className="card mb-3">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <Link href="/messages" className="btn btn-outline-secondary btn-sm me-3">
                    ← Back
                  </Link>
                  <img
                    src={conversation.propertyImage}
                    alt={conversation.propertyTitle}
                    className="rounded me-3"
                    style={{ width: '60px', height: '45px', objectFit: 'cover' }}
                  />
                  <div>
                    <h5 className="mb-1">{conversation.propertyTitle}</h5>
                    <p className="text-muted small mb-0">
                      {session?.user?.role === 'guest' 
                        ? `Host: ${conversation.hostName}`
                        : `Guest: ${conversation.guestName}`
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="card" style={{ height: '500px' }}>
              <div className="card-body d-flex flex-column">
                <div className="flex-grow-1 overflow-auto mb-3">
                  {messages.length === 0 ? (
                    <div className="text-center text-muted py-5">
                      <p>No messages yet. Start the conversation!</p>
                    </div>
                  ) : (
                    <div className="d-flex flex-column gap-3">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`d-flex ${message.senderId === session?.user?.id ? 'justify-content-end' : 'justify-content-start'}`}
                        >
                          <div
                            className={`p-3 rounded ${
                              message.senderId === session?.user?.id
                                ? 'bg-primary text-white'
                                : 'bg-light'
                            }`}
                            style={{ maxWidth: '70%' }}
                          >
                            <div className="d-flex justify-content-between align-items-start mb-1">
                              <small className="fw-medium">
                                {message.senderName}
                                <span className="badge bg-secondary ms-2">
                                  {message.senderRole}
                                </span>
                              </small>
                              <small className="text-muted">
                                {formatTime(message.timestamp)}
                              </small>
                            </div>
                            <p className="mb-0">{message.content}</p>
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  )}
                </div>

                {/* Message Input */}
                <form onSubmit={handleSendMessage} className="mt-auto">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      disabled={isSending}
                    />
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={!newMessage.trim() || isSending}
                    >
                      {isSending ? (
                        <span className="spinner-border spinner-border-sm" role="status" />
                      ) : (
                        'Send'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 