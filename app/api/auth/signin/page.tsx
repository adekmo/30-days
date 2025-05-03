'use client'

import { signIn } from 'next-auth/react';

const SignInPage = () => {
  return (
    <div>
      <h1>Sign In</h1>
      <button 
        onClick={() => signIn('github')}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Sign in with GitHub
      </button>
    </div>
  )
}

export default SignInPage