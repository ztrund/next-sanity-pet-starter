function createResponse(body, status = 200) {
    return new Response(body, {
        status, headers: {
            "Cache-Control": "max-age=60"
        }
    });
}

export async function onRequest(context) {
    const {YOUTUBE_API_KEY} = context.env;

    if (!YOUTUBE_API_KEY) {
        console.error('Missing required environment variables');
        return createResponse('Internal server error', 500);
    }

    const url = new URL(context.request.url);
    const channelId = url.searchParams.get('channelId');
    const fallbackVideoId = url.searchParams.get('fallbackVideoId');

    const origin = context.request.headers.get('Origin') || context.request.headers.get('Referer');
    const host = context.request.headers.get('Host');

    if (!origin || !(origin === `http://${host}/` || origin === `https://${host}/`)) {
        return createResponse('Unauthorized: invalid origin', 403);
    }

    if (!channelId || !fallbackVideoId) {
        return createResponse('Bad Request: Missing channelId or fallbackVideoId', 400);
    }

    try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&eventType=live&type=video&key=${YOUTUBE_API_KEY}`, {
            cf: {
                cacheTtl: 60, cacheEverything: true,
            }
        })

        if (!response.ok) {
            console.error('YouTube API request failed:', response.status);
            return createResponse(fallbackVideoId, 500);
        }

        const data = await response.json()

        let responseBody;
        if (data.items.length > 0) {
            responseBody = data.items[0].id.videoId;
        } else {
            responseBody = fallbackVideoId;
        }

        return createResponse(responseBody);
    } catch (error) {
        console.error('Error fetching livestream data:', error);
        return createResponse(fallbackVideoId, 500);
    }
}