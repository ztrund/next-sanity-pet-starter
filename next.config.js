module.exports = {
    env: {
        NEXT_PUBLIC_YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY,
        NEXT_PUBLIC_SANITY_USE_CDN: process.env.SANITY_USE_CDN,
    },
    images: {
        unoptimized: true,
    },
};