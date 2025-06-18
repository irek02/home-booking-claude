import { Property } from '@/types/property'

export const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Cozy Downtown Apartment',
    description: 'Beautiful 2-bedroom apartment in the heart of downtown. Walking distance to restaurants, shops, and public transportation. Perfect for business travelers or vacation stays.',
    location: {
      address: '123 Main Street',
      city: 'New York',
      state: 'NY',
      country: 'United States',
      zipCode: '10001'
    },
    pricing: {
      basePrice: 150,
      currency: 'USD',
      cleaningFee: 25
    },
    details: {
      bedrooms: 2,
      bathrooms: 1,
      maxGuests: 4,
      propertyType: 'apartment'
    },
    amenities: ['WiFi', 'Kitchen', 'Air conditioning', 'TV', 'Heating'],
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80'
    ],
    hostId: '2',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    title: 'Luxury Oceanview Villa',
    description: 'Stunning 4-bedroom villa with panoramic ocean views. Private pool, large deck, and direct beach access. The perfect retreat for families or groups looking for luxury and privacy.',
    location: {
      address: '456 Ocean Drive',
      city: 'Miami',
      state: 'FL',
      country: 'United States',
      zipCode: '33139'
    },
    pricing: {
      basePrice: 450,
      currency: 'USD',
      cleaningFee: 75
    },
    details: {
      bedrooms: 4,
      bathrooms: 3,
      maxGuests: 8,
      propertyType: 'villa'
    },
    amenities: ['WiFi', 'Kitchen', 'Pool', 'Air conditioning', 'TV', 'Balcony', 'BBQ grill', 'Parking'],
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80'
    ],
    hostId: '2',
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10')
  },
  {
    id: '3',
    title: 'Rustic Mountain Cabin',
    description: 'Charming 3-bedroom log cabin nestled in the mountains. Fireplace, hot tub, and breathtaking views. Perfect for a peaceful getaway from city life.',
    location: {
      address: '789 Pine Ridge Road',
      city: 'Aspen',
      state: 'CO',
      country: 'United States',
      zipCode: '81611'
    },
    pricing: {
      basePrice: 275,
      currency: 'USD',
      cleaningFee: 50
    },
    details: {
      bedrooms: 3,
      bathrooms: 2,
      maxGuests: 6,
      propertyType: 'cabin'
    },
    amenities: ['WiFi', 'Kitchen', 'Fireplace', 'Hot tub', 'Heating', 'TV', 'Parking'],
    images: [
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&q=80',
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80'
    ],
    hostId: '2',
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05')
  },
  {
    id: '4',
    title: 'Modern City Loft',
    description: 'Stylish industrial loft in trendy neighborhood. High ceilings, exposed brick, and modern amenities. Close to art galleries, cafes, and nightlife.',
    location: {
      address: '321 Industrial Blvd',
      city: 'San Francisco',
      state: 'CA',
      country: 'United States',
      zipCode: '94107'
    },
    pricing: {
      basePrice: 200,
      currency: 'USD',
      cleaningFee: 35
    },
    details: {
      bedrooms: 1,
      bathrooms: 1,
      maxGuests: 2,
      propertyType: 'loft'
    },
    amenities: ['WiFi', 'Kitchen', 'Air conditioning', 'TV', 'Gym', 'Parking'],
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80',
      'https://images.unsplash.com/photo-1524813686514-a57563d77965?w=800&q=80'
    ],
    hostId: '2',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20')
  },
  {
    id: '5',
    title: 'Charming Countryside Cottage',
    description: 'Quaint 2-bedroom cottage surrounded by rolling hills and gardens. Perfect for a romantic getaway or peaceful retreat. Farm-to-table breakfast available.',
    location: {
      address: '567 Country Lane',
      city: 'Napa',
      state: 'CA',
      country: 'United States',
      zipCode: '94558'
    },
    pricing: {
      basePrice: 185,
      currency: 'USD',
      cleaningFee: 30
    },
    details: {
      bedrooms: 2,
      bathrooms: 1,
      maxGuests: 4,
      propertyType: 'cottage'
    },
    amenities: ['WiFi', 'Kitchen', 'Garden', 'Fireplace', 'Heating', 'TV'],
    images: [
      'https://images.unsplash.com/photo-1551033406-611cf9a28f67?w=800&q=80',
      'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&q=80',
      'https://images.unsplash.com/photo-1597047084993-bf337f6e3fbc?w=800&q=80'
    ],
    hostId: '2',
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-12')
  }
]

export const getPropertyById = (id: string): Property | undefined => {
  return mockProperties.find(property => property.id === id)
}

export const getPropertiesByHostId = (hostId: string): Property[] => {
  return mockProperties.filter(property => property.hostId === hostId)
}