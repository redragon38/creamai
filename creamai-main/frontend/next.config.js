/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Optimisations d'images
  images: {
    domains: ['thecreamai.com'],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    unoptimized: process.env.VERCEL_ENV === 'production' ? false : true,
  },

  // Compression
  compress: true,

  // Optimisation des performances
  poweredByHeader: false,
  productionBrowserSourceMaps: false,

  // Headers de sécurité et SEO
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains'
          },
        ],
      },
    ];
  },

  // Redirections SEO-friendly
  async redirects() {
    return [
      // Exemples de redirections
      // {
      //   source: '/old-page',
      //   destination: '/new-page',
      //   permanent: true,
      // },
    ];
  },

  // Variables d'environnement publiques
  env: {
    SITE_URL: process.env.SITE_URL || 'https://thecreamai.com',
  },
}

module.exports = nextConfig

