/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: ["localhost:3000", "agentic-bc4361ec.vercel.app"]
    }
  }
};

export default nextConfig;
