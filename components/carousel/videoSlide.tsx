import LiteYouTubeEmbed from "react-lite-youtube-embed";
import {extractYoutubeVideoId} from "../../helpers/youtubeLinkExtractor";
import {MediaItem} from "../../types";
import React from "react";

interface VideoSlideProps {
    mediaItem: MediaItem;
    index: number;
}

const VideoSlide: React.FC<VideoSlideProps> = ({mediaItem, index}) => {
    return <LiteYouTubeEmbed
        id={extractYoutubeVideoId(mediaItem.videoUrl)}
        title={`Slide ${index} Video`}
        webp={true}
        poster="hqdefault"
        params="autoplay=1&mute=1"
        rel={index === 0 ? "preload" : "prefetch"}
    />;
}

export default VideoSlide;