'use client'

import Link from 'next/link'
import Header from '@/components/Header'
import { mockProperties } from '@/data/mockProperties'
import { PROPERTY_TYPES } from '@/types/property'

export default function PropertiesPage() {
  return (
    <>
      <Header />
      <div className="container mt-4">
        <div className="row">
          <div className="col-12">
            <h1 className="display-6 mb-4">Browse Properties</h1>
            <p className="text-muted mb-4">
              Discover amazing places to stay around the world
            </p>
          </div>
        </div>

        <div className="row">
          {mockProperties.map((property) => {
            const propertyTypeLabel = PROPERTY_TYPES.find(type => type.value === property.details.propertyType)?.label || property.details.propertyType
            
            return (
              <div key={property.id} className="col-lg-4 col-md-6 mb-4">
                <div className="card h-100 shadow-sm">
                  <div className="position-relative">
                    <img
                      src={property.images[0]}
                      alt={property.title}
                      className="card-img-top"
                      style={{ height: '250px', objectFit: 'cover' }}
                    />
                    <div className="position-absolute top-0 end-0 m-2">
                      <span className="badge bg-primary">
                        {property.images.length} photos
                      </span>
                    </div>
                  </div>
                  
                  <div className="card-body d-flex flex-column">
                    <div className="mb-2">
                      <span className="badge bg-secondary me-2">{propertyTypeLabel}</span>
                      <span className="badge bg-info">{property.details.maxGuests} guests</span>
                    </div>
                    
                    <h5 className="card-title">{property.title}</h5>
                    
                    <p className="card-text text-muted small mb-2">
                      {property.location.city}, {property.location.state}
                    </p>
                    
                    <p className="card-text flex-grow-1">
                      {property.description.substring(0, 120)}...
                    </p>
                    
                    <div className="d-flex justify-content-between align-items-center mt-auto">
                      <div>
                        <span className="h5 fw-bold text-primary">
                          ${property.pricing.basePrice}
                        </span>
                        <small className="text-muted"> / night</small>
                      </div>
                      <Link
                        href={`/properties/${property.id}`}
                        className="btn btn-outline-primary"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Quick Links for Testing */}
        <div className="row mt-5">
          <div className="col-12">
            <div className="card bg-light">
              <div className="card-body">
                <h6 className="card-title">Quick Test Links</h6>
                <p className="card-text small text-muted">
                  Use these links to quickly test different property details:
                </p>
                <div className="d-flex flex-wrap gap-2">
                  {mockProperties.map((property) => (
                    <Link
                      key={property.id}
                      href={`/properties/${property.id}`}
                      className="btn btn-sm btn-outline-secondary"
                    >
                      {property.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}