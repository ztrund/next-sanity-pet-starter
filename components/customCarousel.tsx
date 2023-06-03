import React, {useCallback, useEffect, useState} from "react";
import {extractYoutubeVideoId} from "../helpers/youtubeLinkExtractor";
import {MediaItem} from "../types";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import {sanityImageUrl} from "../lib/sanityImageUrl";
import {createPortal} from "react-dom";

interface CustomCarouselProps {
    mediaItems: MediaItem[];
}

const CustomCarousel: React.FC<CustomCarouselProps> = ({mediaItems}) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [currentImage, setCurrentImage] = useState("");
    const [modalNode, setModalNode] = useState<Element | null>(null);

    useEffect(() => {
        setModalNode(document.getElementById('root'));
    }, []);

    useEffect(() => {
        if (showModal) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
    }, [showModal]);

    const [viewportRef, embla] = useEmblaCarousel({loop: true}, [Autoplay({delay: 5000, stopOnInteraction: true})]);
    const [thumbViewportRef, emblaThumbs] = useEmblaCarousel({loop: false, containScroll: 'keepSnaps'});

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

    const modal = (
        <div className={`${showModal ? "fixed" : "hidden"} inset-0 z-50 backdrop-blur-sm backdrop-brightness-50`}
             onClick={() => setShowModal(false)}>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 outline-0"
                 aria-modal={true}>
                <img src={currentImage} className="rounded-lg overflow-hidden shadow-lg max-w-[95vw] max-h-[95vh]"
                     onClick={() => setShowModal(false)} alt={"Modal Image"}/>
            </div>
        </div>);

    return (<>
        {modalNode && createPortal(modal, modalNode)}
        <div className="embla overflow-hidden" ref={viewportRef}>
            <div className="embla__container flex items-center">
                {mediaItems.map((mediaItem: MediaItem, index: number) => (<div
                    key={mediaItem._key}
                    className="embla__slide flex-grow-0 flex-shrink-0 basis-full min-w-0"
                >
                    {mediaItem.type === "image" && mediaItem.image && (<img
                        src={sanityImageUrl(mediaItem.image, {
                            w: 488, h: 488, auto: "format", q: 75, fit: "max",
                        })}
                        srcSet={`
        ${sanityImageUrl(mediaItem.image, {
                            w: 488, h: 488, auto: "format", q: 75, fit: "max",
                        })} 488w,
        ${sanityImageUrl(mediaItem.image, {
                            w: 616, h: 616, auto: "format", q: 75, fit: "max",
                        })} 616w,
        ${sanityImageUrl(mediaItem.image, {
                            w: 744, h: 744, auto: "format", q: 75, fit: "max",
                        })} 744w,
        ${sanityImageUrl(mediaItem.image, {
                            w: 976, h: 976, auto: "format", q: 75, fit: "max",
                        })} 976w,
        ${sanityImageUrl(mediaItem.image, {
                            w: 1232, h: 1232, auto: "format", q: 75, fit: "max",
                        })} 1232w,
        ${sanityImageUrl(mediaItem.image, {
                            w: 1488, h: 1488, auto: "format", q: 75, fit: "max",
                        })} 1488w,
    `}
                        sizes="(max-width: 1023px) calc(100vw - 32px),
                        (max-width: 1536px) calc(50vw - 24px),
                        744px"
                        alt={"Slide " + index}
                        loading={index == 0 ? "eager" : "lazy"}
                        className="w-full aspect-1 object-cover"
                        onClick={() => {
                            setCurrentImage(sanityImageUrl(mediaItem.image, {auto: "format", q: 75}));
                            setShowModal(true);
                        }}
                    />)}
                    {mediaItem.type === "video" && mediaItem.videoUrl && (<LiteYouTubeEmbed
                        id={extractYoutubeVideoId(mediaItem.videoUrl) || ""}
                        title={"Slide " + index + " Video"}
                        webp={true}
                        poster="hqdefault"
                        params="autoplay=1&mute=1"
                        rel={index == 0 ? "preload" : ""}

                    />)}
                </div>))}
            </div>
        </div>
        <div className="embla-thumbs overflow-hidden" ref={thumbViewportRef}>
            <div className="embla-thumbs__container flex flex-row">
                {mediaItems.map((mediaItem: MediaItem, index: number) => (<div
                    key={mediaItem._key}
                    className={`embla-thumbs__slide flex ${selectedIndex === index ? 'border-4 border-main-brand-color' : 'border-4'}`}
                    onClick={() => {
                        scrollTo(index)
                    }}
                >
                    <button className="embla-thumbs__slide__button h-32 w-32" type="button"
                            title={"Slide " + index + " Button"}>
                        {mediaItem.type === "image" && mediaItem.image && (<img
                            key={index}
                            src={sanityImageUrl(mediaItem.image, {
                                h: 128, w: 128, auto: "format", q: 75, dpr: 1, fit: "max"
                            })}
                            srcSet={`
        ${sanityImageUrl(mediaItem.image, {
                                h: 128, w: 128, auto: "format", q: 75, dpr: 1, fit: "max"
                            })} 1x,
        ${sanityImageUrl(mediaItem.image, {
                                h: 128, w: 128, auto: "format", q: 75, dpr: 1.5, fit: "max"
                            })} 1.5x,
        ${sanityImageUrl(mediaItem.image, {
                                h: 128, w: 128, auto: "format", q: 75, dpr: 2, fit: "max"
                            })} 2x
    `}
                            className="h-32 w-32 object-cover"
                            alt={"Slide " + index + " Thumbnail"}
                            loading="lazy"
                        />)}
                        {mediaItem.type === "video" && mediaItem.videoUrl && (<picture key={index}>
                            <source
                                type="image/webp"
                                srcSet={`https://i.ytimg.com/vi_webp/${extractYoutubeVideoId(mediaItem.videoUrl)}/default.webp`}
                            />
                            <img
                                src={`https://i.ytimg.com/vi/${extractYoutubeVideoId(mediaItem.videoUrl)}/default.jpg`}
                                className="h-32 w-32 object-cover"
                                alt={"Slide " + index + " Thumbnail"}
                                loading="lazy"
                            />
                        </picture>)}
                    </button>
                </div>))}
            </div>
        </div>
    </>);
};

export default CustomCarousel;
