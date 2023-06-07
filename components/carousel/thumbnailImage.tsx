import {MediaItem} from "../../types";
import React from "react";
import {sanityImageUrl} from "../../lib/sanityImageUrl";

interface ThumbnailImageProps {
    mediaItem: MediaItem;
    index: number;
}

const ThumbnailImage: React.FC<ThumbnailImageProps> = ({mediaItem, index}) => {
    const baseProps = {
        h: 128,
        w: 128,
        auto: "format",
        q: 75,
        fit: "min",
    };

    const sizes = [
        {dpr: 1},
        {dpr: 1.5},
        {dpr: 2},
    ];

    const src = sanityImageUrl(mediaItem.image, {...baseProps, ...sizes[0]});
    const srcSet = sizes.map(size => `${sanityImageUrl(mediaItem.image, {...baseProps, ...size})} ${size.dpr}x`).join(', ');

    return <img
        src={src}
        srcSet={srcSet}
        className="h-32 w-32 object-cover"
        alt={`Slide ${index} Thumbnail`}
        loading="lazy"
    />;
}

export default ThumbnailImage;