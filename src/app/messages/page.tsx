'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Header from '@/components/Header'
import { getConversationsByUser } from '@/utils/messageStorage'
import { Conversation } from '@/types/message'

export default function MessagesPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (status === 'loading') return
    
    if (!session) {
      router.push('/auth/signin')
      return
    }

    // Fetch user's conversations
    const userConversations = getConversationsByUser(session.user?.id || '')
    setConversations(userConversations.sort((a, b) => 
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    ))
    setIsLoading(false)
  }, [session, status, router])

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

  return (
    <>
      <Header />
      <div className="container mt-4">
        <div className="row">
          <div className="col-12">
            <h1 className="display-6 mb-4">Messages</h1>
          </div>
        </div>

        {conversations.length === 0 ? (
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-body text-center py-5">
                  <h5 className="text-muted">No messages yet</h5>
                  <p className="text-muted">
                    Start a conversation by messaging a property host
                  </p>
                  <Link href="/properties" className="btn btn-primary">
                    Browse Properties
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="row">
            {conversations.map((conversation) => (
              <div key={conversation.id} className="col-12 mb-3">
                <div className="card">
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col-md-2">
                        <img
                          src={conversation.propertyImage}
                          alt={conversation.propertyTitle}
                          className="img-fluid rounded"
                          style={{ width: '80px', height: '60px', objectFit: 'cover' }}
                        />
                      </div>
                      <div className="col-md-7">
                        <h6 className="mb-1">{conversation.propertyTitle}</h6>
                        <p className="text-muted small mb-1">
                          {session?.user?.role === 'guest' 
                            ? `Host: ${conversation.hostName}`
                            : `Guest: ${conversation.guestName}`
                          }
                        </p>
                        {conversation.lastMessage && (
                          <p className="text-muted small mb-0">
                            {conversation.lastMessage.content.substring(0, 50)}...
                          </p>
                        )}
                      </div>
                      <div className="col-md-3 text-end">
                        <div className="d-flex flex-column align-items-end">
                          {conversation.unreadCount > 0 && (
                            <span className="badge bg-primary mb-2">
                              {conversation.unreadCount} new
                            </span>
                          )}
                          <Link
                            href={`/messages/${conversation.id}`}
                            className="btn btn-outline-primary btn-sm"
                          >
                            View Conversation
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
} 