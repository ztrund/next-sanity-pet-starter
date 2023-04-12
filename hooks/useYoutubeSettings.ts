// useYoutubeSettings.ts
import {useState, useEffect} from 'react';
import sanityClient from '../lib/sanityClient';

interface YoutubeSettings {
    apiKey: string;
    channelUrl: string;
    fallbackVideoUrl: string;
}

const useYoutubeSettings = (): YoutubeSettings | null => {
    const [youtubeSettings, setYoutubeSettings] = useState<YoutubeSettings | null>(null);

    useEffect(() => {
        const fetchYoutubeSettings = async () => {
            try {
                const data = await sanityClient.fetch<{ channelUrl: string; fallbackVideoUrl: string }>(
                    `*[_type == "youtubeSettings"] | order(_updatedAt desc) [0] {
            channelUrl,
            fallbackVideoUrl
          }`
                );

                setYoutubeSettings({
                    apiKey: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY || '',
                    channelUrl: data.channelUrl,
                    fallbackVideoUrl: data.fallbackVideoUrl,
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