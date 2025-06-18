'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Header from '@/components/Header'
import { PROPERTY_TYPES, COMMON_AMENITIES, PropertyType } from '@/types/property'

export default function CreateListing() {
  const { data: session } = useSession()
  const router = useRouter()
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    address: '',
    city: '',
    state: '',
    country: '',
    zipCode: '',
    basePrice: '',
    cleaningFee: '',
    bedrooms: '1',
    bathrooms: '1',
    maxGuests: '1',
    propertyType: 'apartment' as PropertyType,
    amenities: [] as string[]
  })
  
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Redirect if not a host
  if (session && session.user.role !== 'host') {
    return (
      <>
        <Header />
        <div className="container mt-5">
          <div className="alert alert-warning">
            <h4>Access Denied</h4>
            <p>Only hosts can create property listings. Please contact support to upgrade your account to a host account.</p>
          </div>
        </div>
      </>
    )
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const handleAmenityToggle = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.title.trim()) newErrors.title = 'Title is required'
    if (!formData.description.trim()) newErrors.description = 'Description is required'
    if (!formData.address.trim()) newErrors.address = 'Address is required'
    if (!formData.city.trim()) newErrors.city = 'City is required'
    if (!formData.country.trim()) newErrors.country = 'Country is required'
    if (!formData.basePrice || parseFloat(formData.basePrice) <= 0) {
      newErrors.basePrice = 'Base price must be greater than 0'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    
    // Simulate API call - in real app, this would save to database
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Show success message and redirect
      alert('Property listing created successfully!')
      router.push('/listings')
    } catch (error) {
      alert('Error creating listing. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Header />
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-8 mx-auto">
            <div className="card">
              <div className="card-header">
                <h2 className="card-title mb-0">Create New Property Listing</h2>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  {/* Basic Information */}
                  <div className="mb-4">
                    <h5>Basic Information</h5>
                    <div className="mb-3">
                      <label htmlFor="title" className="form-label">Property Title *</label>
                      <input
                        type="text"
                        className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="Beautiful downtown apartment"
                      />
                      {errors.title && <div className="invalid-feedback">{errors.title}</div>}
                    </div>
                    
                    <div className="mb-3">
                      <label htmlFor="description" className="form-label">Description *</label>
                      <textarea
                        className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                        id="description"
                        name="description"
                        rows={4}
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Describe your property, its features, and what makes it special..."
                      />
                      {errors.description && <div className="invalid-feedback">{errors.description}</div>}
                    </div>
                  </div>

                  {/* Location */}
                  <div className="mb-4">
                    <h5>Location</h5>
                    <div className="row">
                      <div className="col-md-12 mb-3">
                        <label htmlFor="address" className="form-label">Street Address *</label>
                        <input
                          type="text"
                          className={`form-control ${errors.address ? 'is-invalid' : ''}`}
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          placeholder="123 Main Street"
                        />
                        {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="city" className="form-label">City *</label>
                        <input
                          type="text"
                          className={`form-control ${errors.city ? 'is-invalid' : ''}`}
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          placeholder="New York"
                        />
                        {errors.city && <div className="invalid-feedback">{errors.city}</div>}
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="state" className="form-label">State/Province</label>
                        <input
                          type="text"
                          className="form-control"
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          placeholder="NY"
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="country" className="form-label">Country *</label>
                        <input
                          type="text"
                          className={`form-control ${errors.country ? 'is-invalid' : ''}`}
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          placeholder="United States"
                        />
                        {errors.country && <div className="invalid-feedback">{errors.country}</div>}
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="zipCode" className="form-label">Zip/Postal Code</label>
                        <input
                          type="text"
                          className="form-control"
                          id="zipCode"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleInputChange}
                          placeholder="10001"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Property Details */}
                  <div className="mb-4">
                    <h5>Property Details</h5>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="propertyType" className="form-label">Property Type</label>
                        <select
                          className="form-select"
                          id="propertyType"
                          name="propertyType"
                          value={formData.propertyType}
                          onChange={handleInputChange}
                        >
                          {PROPERTY_TYPES.map(type => (
                            <option key={type.value} value={type.value}>
                              {type.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-2 mb-3">
                        <label htmlFor="bedrooms" className="form-label">Bedrooms</label>
                        <select
                          className="form-select"
                          id="bedrooms"
                          name="bedrooms"
                          value={formData.bedrooms}
                          onChange={handleInputChange}
                        >
                          {[1,2,3,4,5,6].map(num => (
                            <option key={num} value={num}>{num}</option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-2 mb-3">
                        <label htmlFor="bathrooms" className="form-label">Bathrooms</label>
                        <select
                          className="form-select"
                          id="bathrooms"
                          name="bathrooms"
                          value={formData.bathrooms}
                          onChange={handleInputChange}
                        >
                          {[1,2,3,4,5,6].map(num => (
                            <option key={num} value={num}>{num}</option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-2 mb-3">
                        <label htmlFor="maxGuests" className="form-label">Max Guests</label>
                        <select
                          className="form-select"
                          id="maxGuests"
                          name="maxGuests"
                          value={formData.maxGuests}
                          onChange={handleInputChange}
                        >
                          {[1,2,3,4,5,6,7,8,9,10].map(num => (
                            <option key={num} value={num}>{num}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="mb-4">
                    <h5>Pricing</h5>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label htmlFor="basePrice" className="form-label">Base Price per Night (USD) *</label>
                        <input
                          type="number"
                          className={`form-control ${errors.basePrice ? 'is-invalid' : ''}`}
                          id="basePrice"
                          name="basePrice"
                          value={formData.basePrice}
                          onChange={handleInputChange}
                          placeholder="100"
                          min="1"
                          step="0.01"
                        />
                        {errors.basePrice && <div className="invalid-feedback">{errors.basePrice}</div>}
                      </div>
                      <div className="col-md-6 mb-3">
                        <label htmlFor="cleaningFee" className="form-label">Cleaning Fee (USD)</label>
                        <input
                          type="number"
                          className="form-control"
                          id="cleaningFee"
                          name="cleaningFee"
                          value={formData.cleaningFee}
                          onChange={handleInputChange}
                          placeholder="25"
                          min="0"
                          step="0.01"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="mb-4">
                    <h5>Amenities</h5>
                    <div className="row">
                      {COMMON_AMENITIES.map(amenity => (
                        <div key={amenity} className="col-md-4 mb-2">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id={`amenity-${amenity}`}
                              checked={formData.amenities.includes(amenity)}
                              onChange={() => handleAmenityToggle(amenity)}
                            />
                            <label className="form-check-label" htmlFor={`amenity-${amenity}`}>
                              {amenity}
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="d-grid">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Creating Listing...' : 'Create Listing'}
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