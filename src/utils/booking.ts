import { BookingCalculation } from '@/types/booking'

export function calculateBookingPrice(
  checkInDate: string,
  checkOutDate: string,
  basePrice: number,
  cleaningFee: number = 0
): BookingCalculation {
  const checkIn = new Date(checkInDate)
  const checkOut = new Date(checkOutDate)
  const nights = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24))
  
  const total = (basePrice * nights) + cleaningFee
  
  return {
    nights,
    basePrice: basePrice * nights,
    cleaningFee,
    total
  }
}

export function isValidDateRange(checkInDate: string, checkOutDate: string): boolean {
  if (!checkInDate || !checkOutDate) return false
  
  const checkIn = new Date(checkInDate + 'T00:00:00')
  const checkOut = new Date(checkOutDate + 'T00:00:00')
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  return checkIn >= today && checkOut > checkIn
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}