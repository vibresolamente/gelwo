/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      {
        source: '/customer-portal',
        destination: '/customer-portal.html',
      },
      {
        source: '/admin-portal',
        destination: '/admin-portal.html',
      },
    ];
  },
};

module.exports = nextConfig;

