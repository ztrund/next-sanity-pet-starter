import React from 'react';
import LiteYouTubeEmbed from 'react-lite-youtube-embed';

interface YoutubeLiveEmbedProps {
    liveVideoId: string;
}

const YoutubeLiveEmbed: React.FC<YoutubeLiveEmbedProps> = ({liveVideoId}) => {
    return (
        <div className="">
            {liveVideoId ? (
                <LiteYouTubeEmbed
                    id={liveVideoId}
                    title="YouTube Live"
                    poster="hqdefault"
                    params="autoplay=1&mute=1"
                />
            ) : (
                <div className="aspect-w-16 aspect-h-9"/>
            )}
        </div>
    );
};

export default YoutubeLiveEmbed;
