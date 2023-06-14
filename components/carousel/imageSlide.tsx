import {MediaItem} from "../../types";
import React from "react";

interface ImageSlideProps {
    imageSlide: MediaItem["imageSlide"];
    index: number;
    onClick: () => void;
}

const ImageSlide: React.FC<ImageSlideProps> = ({imageSlide, index, onClick}) => {
    return (<>
        {index === 0 && <link
            rel="preload"
            as="image"
            href={imageSlide.imageUrl}
            imageSrcSet={imageSlide.srcSet}
            imageSizes={imageSlide.sizes}
        />}
        <img
            src={imageSlide.imageUrl}
            srcSet={imageSlide.srcSet}
            sizes={imageSlide.sizes}
            alt={`Slide ${index}`}
            loading={index === 0 ? "eager" : "lazy"}
            className="w-full aspect-square object-cover"
            onClick={onClick}
        />
    </>);
}

export default ImageSlide;