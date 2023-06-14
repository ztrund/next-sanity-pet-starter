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
            config.optimization.splitChunks.minSize = 1;
            config.optimization.splitChunks.cacheGroups = {
                ...config.optimization.splitChunks.cacheGroups,
                preact: {
                    name: 'preact',
                    test: /[\\/]node_modules[\\/]preact[\\/]/,
                    chunks: 'all',
                    reuseExistingChunk: true,
                    enforce: true,
                },
                shared_lib_router: {
                    name: 'shared_lib_router',
                    test: /[\\/]node_modules[\\/]next[\\/]dist[\\/]shared[\\/]lib[\\/]router[\\/]/,
                    chunks: 'all',
                    reuseExistingChunk: true,
                    enforce: true,
                },
                // shared_lib_others: {
                //     name: 'shared_lib_others',
                //     test: new RegExp(`[\\\\/]node_modules[\\\\/]next[\\\\/]dist[\\\\/]shared[\\\\/]lib[\\\\/](?!router[\\\\/]).*`),
                //     chunks: 'all',
                //     reuseExistingChunk: true,
                //     enforce: true,
                // },
                // layout: {
                //     name: 'layout',
                //     test: /[\\/]components[\\/]layout[\\/]/,
                //     chunks: 'all',
                //     minChunks: 2,
                //     reuseExistingChunk: true,
                //     enforce: true,
                // },
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