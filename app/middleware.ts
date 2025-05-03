// app/middleware.ts
import { withAuth } from 'next-auth/middleware'

export default withAuth({
  secret: process.env.NEXTAUTH_SECRET,
})

export const config = {
  matcher: ['/dashboard', '/profile'], // Halaman yang hanya bisa diakses oleh pengguna yang sudah login
}
