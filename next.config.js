/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Emit publications/index.html so /publications, /publications/ both resolve on
  // GitHub Pages (default trailingSlash:false only makes publications.html -> /publications/ 404s).
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  reactStrictMode: true
}

module.exports = nextConfig
