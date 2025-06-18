'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Header from '@/components/Header'
import { getBookingById } from '@/utils/bookingStorage'
import { formatDate } from '@/utils/booking'
import { BookingRequest } from '@/types/booking'

export default function BookingSuccess() {
  const params = useParams()
  const router = useRouter()
  const { data: session } = useSession()
  const bookingId = params.id as string
  const [booking, setBooking] = useState<BookingRequest | null>(null)

  useEffect(() => {
    const bookingData = getBookingById(bookingId)
    setBooking(bookingData)
  }, [bookingId])

  return (
    <>
      <Header />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="card shadow-sm">
              <div className="card-body text-center p-5">
                <div className="mb-4">
                  <div className="rounded-circle bg-success d-inline-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px' }}>
                    <i className="text-white" style={{ fontSize: '2rem' }}>✓</i>
                  </div>
                </div>
                
                <h2 className="card-title text-success mb-3">Booking Confirmed!</h2>
                
                <p className="lead mb-4">
                  Your booking has been successfully confirmed. You'll receive a confirmation email shortly.
                </p>
                
                <div className="bg-light p-3 rounded mb-4">
                  <small className="text-muted">Booking Reference</small>
                  <div className="fw-bold">{bookingId}</div>
                  {booking && (
                    <div className="mt-3">
                      <div className="row text-start">
                        <div className="col-md-6">
                          <small className="text-muted">Property</small>
                          <div className="fw-bold">{booking.propertyTitle}</div>
                          <small>{booking.propertyLocation}</small>
                        </div>
                        <div className="col-md-6">
                          <small className="text-muted">Dates</small>
                          <div className="fw-bold">
                            {formatDate(booking.checkInDate)} - {formatDate(booking.checkOutDate)}
                          </div>
                          <small>{booking.nights} nights • {booking.guestCount} guest{booking.guestCount > 1 ? 's' : ''}</small>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="alert alert-info">
                  <h6 className="alert-heading">What's next?</h6>
                  <ul className="list-unstyled mb-0 text-start">
                    <li>• You'll receive an email confirmation with booking details</li>
                    <li>• The host will receive your booking request</li>
                    <li>• Check your email for check-in instructions</li>
                    <li>• Contact support if you have any questions</li>
                  </ul>
                </div>
                
                <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                  <button
                    type="button"
                    className="btn btn-primary me-md-2"
                    onClick={() => router.push('/properties')}
                  >
                    Browse More Properties
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => router.push('/profile')}
                  >
                    View My Bookings
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}