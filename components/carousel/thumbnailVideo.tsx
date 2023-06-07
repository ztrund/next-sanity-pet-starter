import {MediaItem} from "../../types";
import {extractYoutubeVideoId} from "../../helpers/youtubeLinkExtractor";
import React from "react";

interface ThumbnailVideoProps {
    mediaItem: MediaItem;
    index: number;
}

const ThumbnailVideo: React.FC<ThumbnailVideoProps> = ({mediaItem, index}) => {
    return <picture>
        <source
            type="image/webp"
            srcSet={`https://i.ytimg.com/vi_webp/${extractYoutubeVideoId(mediaItem.videoUrl)}/default.webp`}
        />
        <img
            src={`https://i.ytimg.com/vi/${extractYoutubeVideoId(mediaItem.videoUrl)}/default.jpg`}
            className="h-32 w-32 object-contain bg-black"
            alt={`Slide ${index} Thumbnail`}
            loading="lazy"
        />
    </picture>;
}

export default ThumbnailVideo;