require('dotenv').config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // Reference a variable that was defined in the .env file and make it available at Build Time
    NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT,
  },
  output: 'standalone', // ✅ "export" ではなく、"standalone" に変更！
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;

// require('dotenv').config()
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     env: {
//         // Reference a variable that was defined in the .env file and make it available at Build Time
//         NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT,
//       },
// }

// // module.exports = nextConfig
// module.exports = {
//   output: 'export', // 静的エクスポートの設定（デプロイできたけどアプリ見えない対策）
// };
