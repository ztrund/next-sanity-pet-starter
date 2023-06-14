import {MediaItem} from "../../types";
import React from "react";

interface ThumbnailVideoProps {
    mediaItem: MediaItem;
    index: number;
}

const ThumbnailVideo: React.FC<ThumbnailVideoProps> = ({mediaItem, index}) => {
    return <picture>
        <source
            type="image/webp"
            srcSet={`https://i.ytimg.com/vi_webp/${mediaItem.videoId}/default.webp`}
        />
        <img
            src={`https://i.ytimg.com/vi/${mediaItem.videoId}/default.jpg`}
            className="h-32 w-32 object-contain bg-black"
            alt={`Slide ${index} Thumbnail`}
            loading="lazy"
        />
    </picture>;
}

export default ThumbnailVideo;