function createResponse(body, status = 200) {
    return new Response(body, {
        status,
        headers: {
            "Cache-Control": "max-age=60"
        }
    });
}

export async function onRequest(context) {
    const url = new URL(context.request.url);
    const channelId = url.searchParams.get('channelId');
    const fallbackVideoId = url.searchParams.get('fallbackVideoId');
    const apiKey = context.env.YOUTUBE_API_KEY;

    if (!channelId || !fallbackVideoId) {
        return createResponse('Missing channelId or fallbackVideoId', 400);
    }

    try {
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&eventType=live&type=video&key=${apiKey}`,
            {
                cf: {
                    cacheTtl: 60,
                    // cacheTtlByStatus: { "200-299": 86400, 404: 1, "500-599": 0 }, Set Later
                    cacheEverything: true,
                }
            }
        )
        const data = await response.json()

        console.log('data:', data)

        let responseBody;
        if (data.items.length > 0) {
            responseBody = data.items[0].id.videoId;
        } else {
            responseBody = fallbackVideoId;
        }

        return createResponse(responseBody);
    } catch (error) {
        console.error('Error fetching livestream data:', error)
        return createResponse(fallbackVideoId, 500);
    }
}
