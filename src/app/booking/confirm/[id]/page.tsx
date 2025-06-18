'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Header from '@/components/Header'
import { getPropertyById } from '@/data/mockProperties'
import { formatDate } from '@/utils/booking'
import { saveBooking, generateBookingId } from '@/utils/bookingStorage'
import { BookingRequest } from '@/types/booking'

interface PendingBooking {
  propertyId: string
  checkInDate: string
  checkOutDate: string
  guestCount: number
  totalPrice: number
}

export default function BookingConfirmation() {
  const params = useParams()
  const router = useRouter()
  const { data: session, status } = useSession()
  const propertyId = params.id as string
  const property = getPropertyById(propertyId)
  
  const [bookingData, setBookingData] = useState<PendingBooking | null>(null)
  const [isConfirming, setIsConfirming] = useState(false)
  const [confirmationError, setConfirmationError] = useState('')

  useEffect(() => {
    if (status === 'loading') return
    
    if (!session) {
      router.push('/auth/signin')
      return
    }

    const pendingBooking = sessionStorage.getItem('pendingBooking')
    if (!pendingBooking) {
      router.push('/properties')
      return
    }

    try {
      const parsedBooking = JSON.parse(pendingBooking)
      if (parsedBooking.propertyId !== propertyId) {
        router.push('/properties')
        return
      }
      setBookingData(parsedBooking)
    } catch (error) {
      router.push('/properties')
    }
  }, [session, status, propertyId, router])

  const handleConfirmBooking = async () => {
    if (!bookingData || !session || !property) return

    setIsConfirming(true)
    setConfirmationError('')

    try {
      // Simulate API call - in real app, this would create the booking
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Generate booking ID
      const bookingId = generateBookingId()
      
      // Create full booking object
      const booking: BookingRequest = {
        id: bookingId,
        propertyId: bookingData.propertyId,
        propertyTitle: property.title,
        propertyImage: property.images[0],
        propertyLocation: `${property.location.city}, ${property.location.state}`,
        guestId: session.user?.email || '',
        guestName: session.user?.name || '',
        guestEmail: session.user?.email || '',
        checkInDate: bookingData.checkInDate,
        checkOutDate: bookingData.checkOutDate,
        guestCount: bookingData.guestCount,
        nights,
        basePrice: property.pricing.basePrice * nights,
        cleaningFee: property.pricing.cleaningFee || 0,
        totalPrice: bookingData.totalPrice,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      
      // Save booking to localStorage
      saveBooking(booking)
      
      // Clear pending booking from session storage
      sessionStorage.removeItem('pendingBooking')
      
      // Redirect to success page
      router.push(`/booking/success/${bookingId}`)
    } catch (error) {
      setConfirmationError('Failed to confirm booking. Please try again.')
    } finally {
      setIsConfirming(false)
    }
  }

  if (status === 'loading' || !bookingData || !property) {
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

  const nights = Math.ceil((new Date(bookingData.checkOutDate).getTime() - new Date(bookingData.checkInDate).getTime()) / (1000 * 60 * 60 * 24))

  return (
    <>
      <Header />
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow">
              <div className="card-header bg-primary text-white">
                <h4 className="mb-0">Confirm Your Booking</h4>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-4">
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="img-fluid rounded"
                      style={{ height: '200px', objectFit: 'cover', width: '100%' }}
                    />
                  </div>
                  <div className="col-md-8">
                    <h5 className="card-title">{property.title}</h5>
                    <p className="card-text text-muted">
                      {property.location.address}, {property.location.city}, {property.location.state}
                    </p>
                    
                    <div className="row mt-4">
                      <div className="col-sm-6">
                        <h6 className="fw-bold">Check-in</h6>
                        <p>{formatDate(bookingData.checkInDate)}</p>
                      </div>
                      <div className="col-sm-6">
                        <h6 className="fw-bold">Check-out</h6>
                        <p>{formatDate(bookingData.checkOutDate)}</p>
                      </div>
                    </div>
                    
                    <div className="row">
                      <div className="col-sm-6">
                        <h6 className="fw-bold">Guests</h6>
                        <p>{bookingData.guestCount} guest{bookingData.guestCount > 1 ? 's' : ''}</p>
                      </div>
                      <div className="col-sm-6">
                        <h6 className="fw-bold">Duration</h6>
                        <p>{nights} night{nights > 1 ? 's' : ''}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <hr className="my-4" />

                <div className="row">
                  <div className="col-md-6">
                    <h6 className="fw-bold">Price Details</h6>
                    <div className="d-flex justify-content-between mb-2">
                      <span>${property.pricing.basePrice} x {nights} night{nights > 1 ? 's' : ''}</span>
                      <span>${property.pricing.basePrice * nights}</span>
                    </div>
                    {property.pricing.cleaningFee && (
                      <div className="d-flex justify-content-between mb-2">
                        <span>Cleaning fee</span>
                        <span>${property.pricing.cleaningFee}</span>
                      </div>
                    )}
                    <hr />
                    <div className="d-flex justify-content-between fw-bold">
                      <span>Total</span>
                      <span>${bookingData.totalPrice}</span>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <h6 className="fw-bold">Guest Information</h6>
                    <p>
                      <strong>Name:</strong> {session?.user?.name}<br />
                      <strong>Email:</strong> {session?.user?.email}
                    </p>
                  </div>
                </div>

                {confirmationError && (
                  <div className="alert alert-danger mt-3">
                    {confirmationError}
                  </div>
                )}

                <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
                  <button
                    type="button"
                    className="btn btn-outline-secondary me-md-2"
                    onClick={() => router.back()}
                    disabled={isConfirming}
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleConfirmBooking}
                    disabled={isConfirming}
                  >
                    {isConfirming ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Confirming...
                      </>
                    ) : (
                      'Confirm Booking'
                    )}
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