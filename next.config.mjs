/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => {
    return [
      {
        source: '/api/auth/:path*',
        destination: '/endpoint/auth/:path*',
      },
      {
        source: '/api/data/:path*',
        destination: '/endpoint/data/:path*',
      },
      {
        source: '/api/:path*',
        destination:
          process.env.NODE_ENV === 'development'
            ? 'http://127.0.0.1:5328/api/:path*'
            : '/api/',
      },
    ]
  },
}

export default nextConfig