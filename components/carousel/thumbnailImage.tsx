import {MediaItem} from "../../types";
import React from "react";

interface ThumbnailImageProps {
    thumbnailImage: MediaItem["thumbnailImage"];
    index: number;
}

const ThumbnailImage: React.FC<ThumbnailImageProps> = ({thumbnailImage, index}) => {
    return <img
        src={thumbnailImage.imageUrl}
        srcSet={thumbnailImage.srcSet}
        className="h-32 w-32 object-cover"
        alt={`Slide ${index} Thumbnail`}
        loading="lazy"
    />;
}

export default ThumbnailImage;