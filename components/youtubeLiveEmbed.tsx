import React, {useState, useEffect} from 'react';
import {extractYoutubeChannelId, extractYoutubeVideoId} from '../helpers/youtubeLinkExtractor';
import {YoutubeSettings} from "../types"; // Import the extractor functions

interface YoutubeLiveEmbedProps {
    youtubeSettings: YoutubeSettings;
}

const YoutubeLiveEmbed: React.FC<YoutubeLiveEmbedProps> = ({ youtubeSettings }) => {
    const [videoId, setVideoId] = useState<string>('');

    useEffect(() => {
        if (!youtubeSettings) {
            return;
        }

        const channelId = extractYoutubeChannelId(youtubeSettings.channelUrl) || '';
        const fallbackVideoId = extractYoutubeVideoId(youtubeSettings.fallbackVideoUrl) || '';

        const fetchLivestreamData = async () => {
            try {
                const response: Response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&eventType=live&type=video&key=${process.env.NEXT_PUBLIC_YOUTUBE_API_KEY}`);
                const data: { items: { id: { videoId: string } }[] } = await response.json();

                if (data.items.length > 0) {
                    setVideoId(data.items[0].id.videoId);
                } else {
                    setVideoId(fallbackVideoId);
                }
            } catch (error) {
                console.error('Error fetching livestream data:', error);
            }
        };

        fetchLivestreamData();
    }, [youtubeSettings]);

    return (
        <div className="aspect-w-16 aspect-h-9">
            <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        </div>
    );
};

export default YoutubeLiveEmbed;
