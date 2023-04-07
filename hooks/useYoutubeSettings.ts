// useYoutubeSettings.ts
import {useState, useEffect} from 'react';
import sanityClient from '../lib/sanityClient';

interface YoutubeSettings {
    apiKey: string;
    channelId: string;
    fallbackVideoId: string;
}

const useYoutubeSettings = (): YoutubeSettings | null => {
    const [youtubeSettings, setYoutubeSettings] = useState<YoutubeSettings | null>(null);

    useEffect(() => {
        const fetchYoutubeSettings = async () => {
            try {
                const data = await sanityClient.fetch<{ channelId: string; fallbackVideoId: string }>(
                    `*[_type == "youtubeSettings"] | order(_updatedAt desc) [0] {
            channelId,
            fallbackVideoId
          }`
                );

                setYoutubeSettings({
                    apiKey: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY || '',
                    channelId: data.channelId,
                    fallbackVideoId: data.fallbackVideoId,
                });
            } catch (error) {
                console.error('Error fetching YouTube settings:', error);
            }
        };

        fetchYoutubeSettings();
    }, []);

    return youtubeSettings;
};

export default useYoutubeSettings;
