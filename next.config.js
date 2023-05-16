const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})
module.exports = withBundleAnalyzer({
    env: {
        NEXT_PUBLIC_YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY,
        NEXT_PUBLIC_SANITY_USE_CDN: process.env.SANITY_USE_CDN,
    },
    images: {
        unoptimized: true,
    },
    async headers() {
        if (process.env.NODE_ENV !== 'production') {
            return [];
        }
        return [
            {
                // Apply these headers to all routes in your application.
                source: '/:path*',
                headers: [
                    {
                        key: 'Strict-Transport-Security',
                        value: 'max-age=63072000; includeSubDomains; preload',
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'SAMEORIGIN',
                    },
                    {
                        key: 'Content-Security-Policy',
                        value: "default-src 'self'; img-src 'self' https://i.ytimg.com https://*.sanity.io data:; media-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; frame-src 'self' https://www.youtube-nocookie.com/"
                    },
                ],
            },
        ]
    },
})