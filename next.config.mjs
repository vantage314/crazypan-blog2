/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['placeholder.svg'],
    unoptimized: true,
  },
  // ❌ 删除 output: 'export'
  // ❌ 删除 basePath 和 assetPrefix
  trailingSlash: true
}

export default nextConfig
