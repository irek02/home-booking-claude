'use client'

import { useSession } from 'next-auth/react'
import Header from '@/components/Header'

export default function Home() {
  const { data: session, status } = useSession()

  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <div className="z-10 max-w-5xl w-full items-center justify-center text-center">
          <h1 className="text-4xl font-bold mb-8">
            Hello World!
          </h1>
          <p className="text-xl mb-8">
            Welcome to your Home Booking Application
          </p>
          
          {status === 'loading' ? (
            <div className="text-gray-500">Loading authentication...</div>
          ) : session ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 max-w-md mx-auto">
              <h2 className="text-lg font-semibold text-green-800 mb-2">
                🎉 Successfully signed in!
              </h2>
              <div className="text-left text-sm text-green-700">
                <p><strong>Name:</strong> {session.user.name}</p>
                <p><strong>Email:</strong> {session.user.email}</p>
                <p><strong>Role:</strong> {session.user.role}</p>
                <p><strong>User ID:</strong> {session.user.id}</p>
              </div>
            </div>
          ) : (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 max-w-md mx-auto">
              <h2 className="text-lg font-semibold text-blue-800 mb-2">
                Not signed in
              </h2>
              <p className="text-blue-700 text-sm">
                Sign in to access your personalized home booking experience.
              </p>
            </div>
          )}
        </div>
      </main>
    </>
  )
}