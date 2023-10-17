/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: true,
  },
images:{
  domains: ["telecrm.in"]
}
  
}

export default nextConfig
