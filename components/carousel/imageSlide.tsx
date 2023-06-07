import {sanityImageUrl} from "../../lib/sanityImageUrl";
import {MediaItem} from "../../types";
import React from "react";

interface ImageSlideProps {
    mediaItem: MediaItem;
    index: number;
    onClick: () => void;
}

const ImageSlide: React.FC<ImageSlideProps> = ({mediaItem, index, onClick}) => {
    const baseProps = {
        auto: "format",
        q: 75,
        fit: "min",
    };

    const dimensions = [
        {w: 488, h: 488},
        {w: 616, h: 616},
        {w: 744, h: 744},
        {w: 976, h: 976},
        {w: 1232, h: 1232},
        {w: 1488, h: 1488}
    ];

    const src = sanityImageUrl(mediaItem.image, {...baseProps, ...dimensions[0]});
    const srcSet = dimensions.map(size => `${sanityImageUrl(mediaItem.image, {...baseProps, ...size})} ${size.w}w`).join(', ');
    const sizes = "(max-width: 1023px) calc(100vw - 32px), (max-width: 1536px) calc(50vw - 24px), 744px";

    return (<>
        {index === 0 && <link
            rel="preload"
            as="image"
            href={src}
            imageSrcSet={srcSet}
            imageSizes={sizes}
        />}
        <img
            src={src}
            srcSet={srcSet}
            sizes={sizes}
            alt={`Slide ${index}`}
            loading={index === 0 ? "eager" : "lazy"}
            className="w-full aspect-[1] object-cover"
            onClick={onClick}
        />
    </>);
}

export default ImageSlide;