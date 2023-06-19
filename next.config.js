const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})

// Define common aliases
const commonAliases = {
    "react": "preact/compat",
    "react-dom/test-utils": "preact/test-utils",
    "react-dom": "preact/compat",
    "react/jsx-runtime": "preact/jsx-runtime"
}

const optimizeWebpack = (config, {dev, isServer}) => {
    // Only optimize in a non-dev and non-server environment
    if (!dev && !isServer) {
        // Add common aliases
        Object.assign(config.resolve.alias, commonAliases)

        // Set minimum size for chunks
        config.optimization.splitChunks.minSize = 1;

        // Define cache groups
        config.optimization.splitChunks.cacheGroups = {
            ...config.optimization.splitChunks.cacheGroups,
            preact_dist: {
                name: 'preact_dist',
                test: /[\\/]node_modules[\\/]preact[\\/]dist[\\/]/,
                chunks: 'all',
                reuseExistingChunk: true,
                enforce: true,
            },
            preact_compat: {
                name: 'preact_compat',
                test: /[\\/]node_modules[\\/]preact[\\/]compat[\\/]/,
                chunks: 'all',
                reuseExistingChunk: true,
                enforce: true,
            },
            router: {
                name: 'router',
                test: /[\\/]node_modules[\\/]next[\\/]dist[\\/]shared[\\/]lib[\\/]router[\\/]router.js/,
                chunks: 'all',
                reuseExistingChunk: true,
                enforce: true,
            },
            router_utils: {
                name: 'router_utils',
                test: /[\\/]node_modules[\\/]next[\\/]dist[\\/]shared[\\/]lib[\\/]router[\\/]utils[\\/]/,
                chunks: 'all',
                reuseExistingChunk: true,
                enforce: true,
            },
            shared_lib_others: {
                name: 'shared_lib_others',
                test: /[\\/]node_modules[\\/]next[\\/]dist[\\/]shared[\\/]lib[\\/](?!router[\\/]).*/,
                chunks: 'all',
                reuseExistingChunk: true,
                enforce: true,
            },
        }
    }

    return config
}

module.exports = withBundleAnalyzer({
    webpack: optimizeWebpack,
    output: 'export',
})
