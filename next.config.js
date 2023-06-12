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
            config.optimization.splitChunks.cacheGroups = {
                ...config.optimization.splitChunks.cacheGroups,
                // Define a cache group for your common module
                preact: {
                    name: 'preact',
                    test: /[\\/]node_modules[\\/](preact)[\\/]/,
                    chunks: 'all',
                    reuseExistingChunk: true,
                    enforce: true,
                },
                dynamic: {
                    name: 'next/dynamic',
                    test: /[\\/]node_modules[\\/]next[\\/]dist[\\/]shared[\\/]lib[\\/](dynamic.js|loadable.js|loadable-context.js)/,
                    chunks: 'all',
                    reuseExistingChunk: true,
                    enforce: true,
                }
            }
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