const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})
module.exports = withBundleAnalyzer({
    webpack: (config, {dev, isServer}) => {
        if (!dev && !isServer) {
            Object.assign(config.resolve.alias, {
                "react": "preact/compat",
                "react-dom/test-utils": "preact/test-utils",
                "react-dom": "preact/compat",
                "react/jsx-runtime": "preact/jsx-runtime"
            })
        }
        return config
    },
    output: 'export',
    env: {
        NEXT_PUBLIC_YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY,
        NEXT_PUBLIC_SANITY_USE_CDN: process.env.SANITY_USE_CDN,
        NEXT_PUBLIC_API_BASE_URL: process.env.API_BASE_URL,
    },
})