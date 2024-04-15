/** @type {import('next').NextConfig} */
// const nextConfig = {}

// module.exports = nextConfig



// const nextConfig = {
//   reactStrictMode: true,
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
//   images: {
//     domains: ['imageupload.eaxyget.com'],
//   },
// }
const nextConfig = {
  images: {
    domains: ['imageupload.eaxyget.com', 'www.imageupload.eaxyget.com']
  },
}
module.exports = nextConfig;