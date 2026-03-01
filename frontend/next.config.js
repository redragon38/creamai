/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

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
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
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
        ],
      },
    ];
  },

  async redirects() {
    return [];
  },

  env: {
    SITE_URL: process.env.SITE_URL || 'https://thecreamai.com',
  },
}

module.exports = nextConfig
