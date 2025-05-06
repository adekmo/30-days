'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'

const SignInPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const result = await signIn('credentials', {
      redirect: true,
      email,
      password,
      callbackUrl: '/dashboard'
    })

    console.log(result)
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Sign In</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full border px-3 py-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border px-3 py-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          Login
        </button>
      </form>

      {error && (
        <p className="text-red-600 mt-4">
          {error === 'CredentialsSignin'
            ? 'Email atau password salah'
            : 'Terjadi kesalahan. Coba lagi.'}
        </p>
      )}

      <hr className="my-6" />

      <button
        onClick={() => signIn('github')}
        className="bg-gray-800 text-white px-4 py-2 rounded w-full"
      >
        Sign in with GitHub
      </button>
    </div>
  )
}

export default SignInPage
