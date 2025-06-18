export interface BookingRequest {
  id: string
  propertyId: string
  propertyTitle: string
  propertyImage: string
  propertyLocation: string
  guestId: string
  guestName: string
  guestEmail: string
  checkInDate: string
  checkOutDate: string
  guestCount: number
  nights: number
  basePrice: number
  cleaningFee: number
  totalPrice: number
  status: BookingStatus
  createdAt: string
  updatedAt: string
}

export type BookingStatus = 
  | 'pending' 
  | 'confirmed' 
  | 'cancelled' 
  | 'completed'

export interface BookingCalculation {
  nights: number
  basePrice: number
  cleaningFee: number
  total: number
}