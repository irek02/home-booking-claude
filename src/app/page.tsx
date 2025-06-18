'use client'

import { useSession } from 'next-auth/react'
import Header from '@/components/Header'

export default function Home() {
  const { data: session, status } = useSession()

  return (
    <>
      <Header />
      <main className="container-fluid d-flex flex-column align-items-center justify-content-center" style={{minHeight: '80vh', padding: '3rem'}}>
        <div className="text-center" style={{maxWidth: '800px'}}>
          <h1 className="display-4 fw-bold mb-4">
            Hello World!
          </h1>
          <p className="fs-3 mb-5">
            Welcome to your Home Booking Application
          </p>
          
          {status === 'loading' ? (
            <div className="text-muted">Loading authentication...</div>
          ) : session ? (
            <div className="card border-success" style={{maxWidth: '500px', margin: '0 auto'}}>
              <div className="card-body bg-success bg-opacity-10">
                <h2 className="card-title fs-5 fw-semibold text-success mb-3">
                  🎉 Successfully signed in!
                </h2>
                <div className="text-start">
                  <p className="card-text mb-2"><strong>Name:</strong> {session.user.name}</p>
                  <p className="card-text mb-2"><strong>Email:</strong> {session.user.email}</p>
                  <p className="card-text mb-2"><strong>Role:</strong> {session.user.role}</p>
                  <p className="card-text mb-0"><strong>User ID:</strong> {session.user.id}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="card border-primary" style={{maxWidth: '500px', margin: '0 auto'}}>
              <div className="card-body bg-primary bg-opacity-10">
                <h2 className="card-title fs-5 fw-semibold text-primary mb-3">
                  Not signed in
                </h2>
                <p className="card-text text-primary">
                  Sign in to access your personalized home booking experience.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  )
}