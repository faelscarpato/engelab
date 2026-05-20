/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: __dirname,
  images: {
    unoptimized: true,
  },
}

if (process.env.NODE_ENV === 'development') {
  import('@opennextjs/cloudflare').then(({ initOpenNextCloudflareForDev }) => {
    initOpenNextCloudflareForDev();
  });
}

module.exports = nextConfig
