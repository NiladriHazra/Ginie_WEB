/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add this serverRuntimeConfig section
  serverRuntimeConfig: {
    // Will only be available on the server side
    mongodb_uri: process.env.MONGODB_URI,
  },
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'randomuser.me',
        pathname: '/api/portraits/**',
      },
    ],
    loader: 'custom',
    loaderFile: './image-loader.js',
  },
};

export default nextConfig;