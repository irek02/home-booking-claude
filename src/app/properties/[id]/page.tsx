'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Header from '@/components/Header'
import { getPropertyById } from '@/data/mockProperties'
import { PROPERTY_TYPES } from '@/types/property'

export default function PropertyDetails() {
  const params = useParams()
  const propertyId = params.id as string
  const property = getPropertyById(propertyId)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  if (!property) {
    return (
      <>
        <Header />
        <div className="container mt-5">
          <div className="alert alert-danger">
            <h4>Property Not Found</h4>
            <p>The property you're looking for doesn't exist or has been removed.</p>
          </div>
        </div>
      </>
    )
  }

  const propertyTypeLabel = PROPERTY_TYPES.find(type => type.value === property.details.propertyType)?.label || property.details.propertyType

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length)
  }

  return (
    <>
      <Header />
      <div className="container mt-4">
        <div className="row">
          <div className="col-lg-8">
            {/* Property Images */}
            <div className="mb-4">
              <div className="position-relative">
                <img
                  src={property.images[currentImageIndex]}
                  alt={property.title}
                  className="img-fluid rounded w-100"
                  style={{ height: '400px', objectFit: 'cover' }}
                />
                {property.images.length > 1 && (
                  <>
                    <button
                      className="btn btn-dark btn-sm position-absolute top-50 start-0 translate-middle-y ms-2"
                      onClick={prevImage}
                      style={{ opacity: 0.8 }}
                    >
                      ‹
                    </button>
                    <button
                      className="btn btn-dark btn-sm position-absolute top-50 end-0 translate-middle-y me-2"
                      onClick={nextImage}
                      style={{ opacity: 0.8 }}
                    >
                      ›
                    </button>
                    <div className="position-absolute bottom-0 end-0 m-3">
                      <span className="badge bg-dark">
                        {currentImageIndex + 1} / {property.images.length}
                      </span>
                    </div>
                  </>
                )}
              </div>
              
              {/* Image Thumbnails */}
              {property.images.length > 1 && (
                <div className="row mt-3">
                  {property.images.map((image, index) => (
                    <div key={index} className="col-3 col-md-2">
                      <img
                        src={image}
                        alt={`${property.title} ${index + 1}`}
                        className={`img-fluid rounded cursor-pointer ${
                          index === currentImageIndex ? 'border border-primary border-3' : ''
                        }`}
                        style={{ 
                          height: '80px', 
                          objectFit: 'cover',
                          cursor: 'pointer'
                        }}
                        onClick={() => setCurrentImageIndex(index)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Property Information */}
            <div className="mb-4">
              <h1 className="display-5 fw-bold mb-3">{property.title}</h1>
              
              <div className="row mb-3">
                <div className="col-md-6">
                  <h6 className="text-muted">Location</h6>
                  <p className="mb-0">
                    {property.location.address}<br />
                    {property.location.city}, {property.location.state} {property.location.zipCode}<br />
                    {property.location.country}
                  </p>
                </div>
                <div className="col-md-6">
                  <h6 className="text-muted">Property Details</h6>
                  <p className="mb-0">
                    <span className="badge bg-secondary me-2">{propertyTypeLabel}</span>
                    <span className="badge bg-info me-2">{property.details.bedrooms} bed</span>
                    <span className="badge bg-info me-2">{property.details.bathrooms} bath</span>
                    <span className="badge bg-info">{property.details.maxGuests} guests</span>
                  </p>
                </div>
              </div>

              <div className="mb-4">
                <h6 className="text-muted">Description</h6>
                <p className="lead">{property.description}</p>
              </div>

              {/* Amenities */}
              <div className="mb-4">
                <h6 className="text-muted">Amenities</h6>
                <div className="row">
                  {property.amenities.map((amenity, index) => (
                    <div key={index} className="col-md-4 col-sm-6 mb-2">
                      <div className="d-flex align-items-center">
                        <i className="text-success me-2">✓</i>
                        <span>{amenity}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Booking Card */}
          <div className="col-lg-4">
            <div className="card shadow-sm position-sticky" style={{ top: '100px' }}>
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <h4 className="mb-0">
                      <span className="fw-bold">${property.pricing.basePrice}</span>
                      <small className="text-muted"> / night</small>
                    </h4>
                    {property.pricing.cleaningFee && (
                      <small className="text-muted">
                        + ${property.pricing.cleaningFee} cleaning fee
                      </small>
                    )}
                  </div>
                </div>

                <form>
                  <div className="row mb-3">
                    <div className="col-6">
                      <label className="form-label small text-muted">CHECK-IN</label>
                      <input type="date" className="form-control" />
                    </div>
                    <div className="col-6">
                      <label className="form-label small text-muted">CHECK-OUT</label>
                      <input type="date" className="form-control" />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label small text-muted">GUESTS</label>
                    <select className="form-select">
                      {Array.from({ length: property.details.maxGuests }, (_, i) => i + 1).map(num => (
                        <option key={num} value={num}>
                          {num} guest{num > 1 ? 's' : ''}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="d-grid mb-3">
                    <button type="button" className="btn btn-primary btn-lg">
                      Reserve
                    </button>
                  </div>

                  <div className="text-center">
                    <small className="text-muted">You won't be charged yet</small>
                  </div>
                </form>

                {/* Price Breakdown */}
                <hr />
                <div className="small">
                  <div className="d-flex justify-content-between mb-1">
                    <span>${property.pricing.basePrice} x 5 nights</span>
                    <span>${property.pricing.basePrice * 5}</span>
                  </div>
                  {property.pricing.cleaningFee && (
                    <div className="d-flex justify-content-between mb-1">
                      <span>Cleaning fee</span>
                      <span>${property.pricing.cleaningFee}</span>
                    </div>
                  )}
                  <hr />
                  <div className="d-flex justify-content-between fw-bold">
                    <span>Total</span>
                    <span>${property.pricing.basePrice * 5 + (property.pricing.cleaningFee || 0)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}