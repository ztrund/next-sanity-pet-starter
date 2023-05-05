export async function fetchLiveVideoId(channelId: string, fallbackVideoId: string): Promise<string> {
    try {
        const response: Response = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&eventType=live&type=video&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`
        );
        const data: { items: { id: { videoId: string } }[] } = await response.json();

        if (data.items.length > 0) {
            return data.items[0].id.videoId;
        } else {
            return fallbackVideoId;
        }
    } catch (error) {
        console.error('Error fetching livestream data:', error);
        return fallbackVideoId;
    }
}
