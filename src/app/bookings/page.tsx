'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Header from '@/components/Header'
import { getBookingsByUser } from '@/utils/bookingStorage'
import { formatDate } from '@/utils/booking'
import { BookingRequest } from '@/types/booking'

export default function BookingsPage() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [bookings, setBookings] = useState<BookingRequest[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (status === 'loading') return
    
    if (!session) {
      router.push('/auth/signin')
      return
    }

    // Fetch user's bookings from localStorage
    const userBookings = getBookingsByUser(session.user?.email || '')
    setBookings(userBookings.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))
    setIsLoading(false)
  }, [session, status, router])

  const getStatusBadgeClass = (status: BookingRequest['status']) => {
    switch (status) {
      case 'confirmed':
        return 'bg-success'
      case 'pending':
        return 'bg-warning'
      case 'cancelled':
        return 'bg-danger'
      case 'completed':
        return 'bg-info'
      default:
        return 'bg-secondary'
    }
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

  return (
    <>
      <Header />
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>My Bookings</h2>
          <button
            className="btn btn-primary"
            onClick={() => router.push('/properties')}
          >
            Browse Properties
          </button>
        </div>

        {bookings.length === 0 ? (
          <div className="text-center py-5">
            <div className="mb-4">
              <i className="text-muted" style={{ fontSize: '4rem' }}>📅</i>
            </div>
            <h4 className="text-muted">No bookings yet</h4>
            <p className="text-muted mb-4">
              You haven't made any bookings yet. Start exploring properties to make your first reservation!
            </p>
            <button
              className="btn btn-primary"
              onClick={() => router.push('/properties')}
            >
              Browse Properties
            </button>
          </div>
        ) : (
          <div className="row">
            {bookings.map((booking) => (
              <div key={booking.id} className="col-lg-6 mb-4">
                <div className="card shadow-sm">
                  <div className="row no-gutters">
                    <div className="col-md-4">
                      <img
                        src={booking.propertyImage}
                        alt={booking.propertyTitle}
                        className="card-img h-100"
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <h6 className="card-title mb-0">{booking.propertyTitle}</h6>
                          <span className={`badge ${getStatusBadgeClass(booking.status)}`}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </span>
                        </div>
                        
                        <p className="card-text text-muted small mb-2">
                          {booking.propertyLocation}
                        </p>
                        
                        <div className="mb-2">
                          <small className="text-muted">Check-in:</small>
                          <div className="fw-bold">{formatDate(booking.checkInDate)}</div>
                        </div>
                        
                        <div className="mb-2">
                          <small className="text-muted">Check-out:</small>
                          <div className="fw-bold">{formatDate(booking.checkOutDate)}</div>
                        </div>
                        
                        <div className="row mb-2">
                          <div className="col-6">
                            <small className="text-muted">Guests:</small>
                            <div className="fw-bold">{booking.guestCount}</div>
                          </div>
                          <div className="col-6">
                            <small className="text-muted">Nights:</small>
                            <div className="fw-bold">{booking.nights}</div>
                          </div>
                        </div>
                        
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <small className="text-muted">Total:</small>
                            <div className="fw-bold text-primary">${booking.totalPrice}</div>
                          </div>
                          <div>
                            <button
                              className="btn btn-outline-primary btn-sm me-2"
                              onClick={() => router.push(`/properties/${booking.propertyId}`)}
                            >
                              View Property
                            </button>
                            <button
                              className="btn btn-outline-secondary btn-sm"
                              onClick={() => router.push(`/booking/success/${booking.id}`)}
                            >
                              View Details
                            </button>
                          </div>
                        </div>
                        
                        <div className="mt-2">
                          <small className="text-muted">
                            Booked on {new Date(booking.createdAt).toLocaleDateString()}
                          </small>
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