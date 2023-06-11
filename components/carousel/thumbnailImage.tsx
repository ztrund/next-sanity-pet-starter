import {MediaItem} from "../../types";
import {sanityImgUrl} from "../../lib/sanityImgUrl";
import React from "react";

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

    const src = sanityImgUrl(mediaItem.image, {...baseProps, ...sizes[0]});
    const srcSet = sizes.map(size => `${sanityImgUrl(mediaItem.image, {...baseProps, ...size})} ${size.dpr}x`).join(', ');

    return <img
        src={src}
        srcSet={srcSet}
        className="h-32 w-32 object-cover"
        alt={`Slide ${index} Thumbnail`}
        loading="lazy"
    />;
}

export default ThumbnailImage;