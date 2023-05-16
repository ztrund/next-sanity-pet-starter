import React, {useCallback, useEffect, useState} from "react";
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../lib/sanityClient";
import {extractYoutubeVideoId} from "../helpers/youtubeLinkExtractor";
import {MediaItem} from "../types";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import LiteYouTubeEmbed from "react-lite-youtube-embed";

interface CustomCarouselProps {
    mediaItems: MediaItem[];
}

const CustomCarousel: React.FC<CustomCarouselProps> = ({mediaItems}) => {
    const imageBuilder = imageUrlBuilder(sanityClient);
    const [selectedIndex, setSelectedIndex] = useState(0);

    const [viewportRef, embla] = useEmblaCarousel(
        {loop: true},
        [Autoplay({delay: 5000, stopOnInteraction: true})]
    );
    const [thumbViewportRef, emblaThumbs] = useEmblaCarousel(
        {loop: false, containScroll: 'keepSnaps'}
    );

    const scrollTo = useCallback((index: number) => {
        if (embla) {
            embla.scrollTo(index);
            embla.plugins().autoplay?.stop();
        }
    }, [embla]);

    useEffect(() => {
        if (embla && emblaThumbs) {
            embla.on('select', () => {
                emblaThumbs.scrollTo(embla.selectedScrollSnap());
            });
            emblaThumbs.on('select', () => {
                embla.scrollTo(emblaThumbs.selectedScrollSnap());
            });
        }
    }, [embla, emblaThumbs]);

    useEffect(() => {
        if (embla) {
            embla.on('select', () => {
                setSelectedIndex(embla.selectedScrollSnap());
            });
        }
    }, [embla]);

    return (
        <>
            <div className="embla overflow-hidden" ref={viewportRef}>
                <div className="embla__container flex items-center">
                    {mediaItems.map((mediaItem: MediaItem, index: number) => (
                        <div
                            key={mediaItem._key}
                            className="embla__slide flex-grow-0 flex-shrink-0 basis-full min-w-0"
                        >
                            {mediaItem.type === "image" && mediaItem.image && (
                                <img
                                    src={imageBuilder.image(mediaItem.image).width(744).height(744).auto('format').quality(75).url()}
                                    alt={"Slide " + index}
                                    loading={index < 1 ? "eager" : "lazy"}
                                    width="744"
                                    height="744"
                                />
                            )}
                            {mediaItem.type === "video" && mediaItem.videoUrl && (
                                <LiteYouTubeEmbed
                                    id={extractYoutubeVideoId(mediaItem.videoUrl) || ""}
                                    title={"Slide " + index + " Video"}
                                    webp={true}
                                    poster="hqdefault"
                                    params="autoplay=1&mute=1"
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div className="embla-thumbs overflow-hidden" ref={thumbViewportRef}>
                <div className="embla-thumbs__container flex flex-row">
                    {mediaItems.map((mediaItem: MediaItem, index: number) => (
                        <div
                            key={mediaItem._key}
                            className={`embla-thumbs__slide flex ${selectedIndex === index ? 'border-4 border-main-brand-color' : 'border-4'}`}
                            onClick={() => {
                                scrollTo(index)
                            }}
                        >
                            <button className="embla-thumbs__slide__button" type="button"
                                    title={"Slide " + index + " Button"}>
                                {mediaItem.type === "image" && mediaItem.image && (
                                    <img
                                        key={index}
                                        src={imageBuilder.image(mediaItem.image).height(128).width(128).auto('format').quality(75).url()}
                                        height="128"
                                        width="128"
                                        alt={"Slide " + index + " Thumbnail"}
                                        loading="lazy"
                                    />
                                )}
                                {mediaItem.type === "video" && mediaItem.videoUrl && (
                                    <picture key={index}>
                                        <source
                                            type="image/webp"
                                            srcSet={`https://i.ytimg.com/vi_webp/${extractYoutubeVideoId(mediaItem.videoUrl)}/default.webp`}
                                        />
                                        <img
                                            src={`https://i.ytimg.com/vi/${extractYoutubeVideoId(mediaItem.videoUrl)}/default.jpg`}
                                            height="128"
                                            width="128"
                                            className="h-32 object-cover"
                                            alt={"Slide " + index + " Thumbnail"}
                                            loading="lazy"
                                        />
                                    </picture>
                                )}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default CustomCarousel;
