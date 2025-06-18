'use client'

import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'

export default function Header() {
  const { data: session, status } = useSession()

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom shadow-sm">
      <div className="container">
        <Link href="/" className="navbar-brand text-primary fw-bold fs-4">
          HomeBooking
        </Link>
        
        <div className="navbar-nav me-auto">
          <Link href="/properties" className="nav-link">
            Browse Properties
          </Link>
          {session && (
            <Link href="/bookings" className="nav-link">
              My Bookings
            </Link>
          )}
        </div>
        
        <div className="d-flex align-items-center">
          {status === 'loading' ? (
            <div className="text-muted">Loading...</div>
          ) : session ? (
            <div className="d-flex align-items-center">
              {session.user.role === 'host' && (
                <Link
                  href="/listings/create"
                  className="btn btn-success btn-sm me-3"
                >
                  Create Listing
                </Link>
              )}
              <div className="me-3">
                <span className="text-muted">Welcome, </span>
                <span className="fw-medium">{session.user.name}</span>
                <span className="badge bg-primary ms-2">
                  {session.user.role}
                </span>
              </div>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="btn btn-outline-secondary btn-sm"
              >
                Sign out
              </button>
            </div>
          ) : (
            <Link
              href="/auth/signin"
              className="btn btn-primary"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}