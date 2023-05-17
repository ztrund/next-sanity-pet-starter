const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})
module.exports = withBundleAnalyzer({
    output: 'export',
    env: {
        NEXT_PUBLIC_YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY,
        NEXT_PUBLIC_SANITY_USE_CDN: process.env.SANITY_USE_CDN,
        NEXT_PUBLIC_API_BASE_URL: process.env.API_BASE_URL,
    },
    images: {
        unoptimized: true,
    },
})