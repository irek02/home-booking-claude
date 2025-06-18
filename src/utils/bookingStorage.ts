import { BookingRequest } from '@/types/booking'

const BOOKINGS_STORAGE_KEY = 'user_bookings'

export function saveBooking(booking: BookingRequest): void {
  try {
    const existingBookings = getAllBookings()
    const updatedBookings = [...existingBookings, booking]
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(updatedBookings))
  } catch (error) {
    console.error('Failed to save booking:', error)
  }
}

export function getAllBookings(): BookingRequest[] {
  try {
    const bookingsJson = localStorage.getItem(BOOKINGS_STORAGE_KEY)
    return bookingsJson ? JSON.parse(bookingsJson) : []
  } catch (error) {
    console.error('Failed to retrieve bookings:', error)
    return []
  }
}

export function getBookingsByUser(guestId: string): BookingRequest[] {
  try {
    const allBookings = getAllBookings()
    return allBookings.filter(booking => booking.guestId === guestId)
  } catch (error) {
    console.error('Failed to retrieve user bookings:', error)
    return []
  }
}

export function getBookingById(bookingId: string): BookingRequest | null {
  try {
    const allBookings = getAllBookings()
    return allBookings.find(booking => booking.id === bookingId) || null
  } catch (error) {
    console.error('Failed to retrieve booking by ID:', error)
    return null
  }
}

export function updateBookingStatus(bookingId: string, status: BookingRequest['status']): boolean {
  try {
    const allBookings = getAllBookings()
    const bookingIndex = allBookings.findIndex(booking => booking.id === bookingId)
    
    if (bookingIndex === -1) return false
    
    allBookings[bookingIndex] = {
      ...allBookings[bookingIndex],
      status,
      updatedAt: new Date().toISOString()
    }
    
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(allBookings))
    return true
  } catch (error) {
    console.error('Failed to update booking status:', error)
    return false
  }
}

export function deleteBooking(bookingId: string): boolean {
  try {
    const allBookings = getAllBookings()
    const filteredBookings = allBookings.filter(booking => booking.id !== bookingId)
    
    if (filteredBookings.length === allBookings.length) return false
    
    localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(filteredBookings))
    return true
  } catch (error) {
    console.error('Failed to delete booking:', error)
    return false
  }
}

export function generateBookingId(): string {
  return 'booking_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
}