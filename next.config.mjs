/** @type {import('next').NextConfig} */

// 判断是否为生产环境
const isProd = process.env.NODE_ENV === 'production'

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

  // ✅ 开启静态导出
  output: 'export',

  // ✅ GitHub Pages 子路径支持（仅生产环境启用）
  basePath: isProd ? '/crazypan-blog' : '',
  assetPrefix: isProd ? '/crazypan-blog/' : '',

  // ✅ 建议开启避免 GitHub Pages 404
  trailingSlash: true,

  // ✅ 跳过动态页面导出（防止 build 报错）
  experimental: {
    skipExport: ['/admin/posts/[slug]/edit'],
  },
}

export default nextConfig
