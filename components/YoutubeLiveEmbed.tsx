import React, {useState, useEffect} from 'react';
import useYoutubeSettings from '../hooks/useYoutubeSettings';

const YoutubeLiveEmbed: React.FC = () => {
    const youtubeSettings = useYoutubeSettings();
    const [videoId, setVideoId] = useState<string>('');

    useEffect(() => {
        if (!youtubeSettings) {
            return;
        }

        const fetchLivestreamData = async () => {
            try {
                const response: Response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${youtubeSettings.channelId}&eventType=live&type=video&key=${youtubeSettings.apiKey}`);
                const data: { items: { id: { videoId: string } }[] } = await response.json();

                if (data.items.length > 0) {
                    setVideoId(data.items[0].id.videoId);
                } else {
                    setVideoId(youtubeSettings.fallbackVideoId);
                }
            } catch (error) {
                console.error('Error fetching livestream data:', error);
            }
        };

        fetchLivestreamData();
    }, [youtubeSettings]);

    // if (!videoId) {
    //     return <div>Loading...</div>;
    // }

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
