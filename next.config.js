require('dotenv').config();
const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT,
  },
  output: 'standalone',
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname, 'app'), // `@` を `app/` にマッピング
      '@/app/components': path.resolve(__dirname, 'app/components'), // `@/app/components` を明示的に設定
    };
    return config;
  },
};

module.exports = nextConfig;
