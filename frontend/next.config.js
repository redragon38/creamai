/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
<<<<<<< HEAD

  // Optimisations d'images
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'thecreamai.com' },
      { protocol: 'https', hostname: '**.cloudinary.com' },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [390, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 jours
  },

  // Compression Gzip/Brotli
  compress: true,

  // Optimisations perf
  poweredByHeader: false,
  generateEtags: true,

  // Experimental
  experimental: {
    optimizeCss: false, // Mettre true si critters est installé
    scrollRestoration: true,
  },

  // Headers sécurité + cache mobile
=======
  
  // Optimisations d'images
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'thecreamai.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Compression
  compress: true,

  // Headers de sécurité et SEO
>>>>>>> c228359ea51c899aa80248fc4488d9fe7c10d9f7
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
<<<<<<< HEAD
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
      // Cache long pour assets statiques
      {
        source: '/(.*)\\.(png|jpg|jpeg|gif|webp|avif|ico|svg|woff2|woff|ttf)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      // Cache pour les données JSON
      {
        source: '/data/(.*)\\.json',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=3600, stale-while-revalidate=86400' },
=======
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
>>>>>>> c228359ea51c899aa80248fc4488d9fe7c10d9f7
        ],
      },
    ];
  },

<<<<<<< HEAD
  async redirects() {
    return [];
  },

=======
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
>>>>>>> c228359ea51c899aa80248fc4488d9fe7c10d9f7
  env: {
    SITE_URL: process.env.SITE_URL || 'https://thecreamai.com',
  },
}

module.exports = nextConfig
<<<<<<< HEAD
=======

>>>>>>> c228359ea51c899aa80248fc4488d9fe7c10d9f7
