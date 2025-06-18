export interface Property {
  id: string
  title: string
  description: string
  location: {
    address: string
    city: string
    state: string
    country: string
    zipCode: string
  }
  pricing: {
    basePrice: number
    currency: string
    cleaningFee?: number
  }
  details: {
    bedrooms: number
    bathrooms: number
    maxGuests: number
    propertyType: PropertyType
  }
  amenities: string[]
  images: string[]
  hostId: string
  createdAt: Date
  updatedAt: Date
}

export type PropertyType = 
  | 'house' 
  | 'apartment' 
  | 'condo' 
  | 'villa' 
  | 'cabin' 
  | 'cottage' 
  | 'loft' 
  | 'other'

export const PROPERTY_TYPES: { value: PropertyType; label: string }[] = [
  { value: 'house', label: 'House' },
  { value: 'apartment', label: 'Apartment' },
  { value: 'condo', label: 'Condo' },
  { value: 'villa', label: 'Villa' },
  { value: 'cabin', label: 'Cabin' },
  { value: 'cottage', label: 'Cottage' },
  { value: 'loft', label: 'Loft' },
  { value: 'other', label: 'Other' },
]

export const COMMON_AMENITIES = [
  'WiFi',
  'Kitchen',
  'Washing machine',
  'Air conditioning',
  'Heating',
  'TV',
  'Hot tub',
  'Pool',
  'Gym',
  'Parking',
  'Balcony',
  'Garden',
  'Fireplace',
  'BBQ grill',
  'Pets allowed'
]