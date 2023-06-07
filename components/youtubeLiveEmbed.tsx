import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import React from "react";

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
                    webp={true}
                    poster="hqdefault"
                    params="autoplay=1&mute=1"
                />
            ) : (
                <div className="aspect-video"/>
            )}
        </div>
    );
};

export default YoutubeLiveEmbed;
