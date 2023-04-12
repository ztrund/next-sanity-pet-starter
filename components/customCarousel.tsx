import React, {useEffect, useState, useRef, ReactElement} from "react";
import {Carousel} from "react-responsive-carousel";
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../lib/sanityClient";
import Player = YT.Player;
import PlayerEvent = YT.PlayerEvent;
import OnStateChangeEvent = YT.OnStateChangeEvent;
import {extractYoutubeVideoId} from "../helpers/youtubeLinkExtractor";

export interface MediaItem {
    _key: string;
    type: "image" | "video";
    image?: any; // Replace 'any' with the appropriate type for image from Sanity
    videoUrl?: string;
}

interface CustomCarouselProps {
    mediaItems: MediaItem[];
}

const CustomCarousel: React.FC<CustomCarouselProps> = ({mediaItems}) => {
    const imageBuilder = imageUrlBuilder(sanityClient);
    const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
    const [thumbnails, setThumbnails] = useState<ReactElement[]>([]);
    const [autoPlay, setAutoPlay] = useState(true);
    const videoRef = useRef<Player | null>(null);

    useEffect(() => {
        loadYouTubeAPI();
        generateThumbnails();
    }, [mediaItems]);

    const loadYouTubeAPI = () => {
        if (!document.getElementById("youtube-api")) {
            const tag = document.createElement("script");
            tag.src = "https://www.youtube.com/iframe_api";
            tag.id = "youtube-api";
            const firstScriptTag = document.getElementsByTagName("script")[0];
            if (firstScriptTag && firstScriptTag.parentNode) {
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            }
        }
    };

    const onCarouselChange = (index: number) => {
        setSelectedPhotoIndex(index);
        if (videoRef.current) {
            videoRef.current.pauseVideo();
        }
    };

    const onVideoReady = (event: PlayerEvent) => {
        videoRef.current = event.target;
    };

    const onVideoStateChange = (event: OnStateChangeEvent) => {
        if (event.data === 1) {
            // Video is playing
            setAutoPlay(false);
        } else {
            // Video is paused, buffering, or ended
            setAutoPlay(true);
        }
    };

    const renderThumb = (item: MediaItem, index: number) => {
        if (item.type === "image" && item.image) {
            const imgUrl = imageBuilder.image(item.image).width(100).height(56).url() || "";
            return (
                <div key={index}>
                    <img
                        src={imgUrl}
                        alt=""
                    />
                </div>
            );
        }

        if (item.type === "video" && item.videoUrl) {
            const videoId = extractYoutubeVideoId(item.videoUrl);
            const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/0.jpg`;
            return (
                <div key={index}>
                    <img src={thumbnailUrl} alt=""/>
                </div>
            );
        }

        return null;
    };

    const renderAllThumbs = (): ReactElement[] => {
        return mediaItems
            .map((item, index) => {
                return renderThumb(item, index);
            })
            .filter((thumb) => thumb !== null) as ReactElement[];
    };

    const generateThumbnails = () => {
        setThumbnails(renderAllThumbs());
    };

    useEffect(() => {
        generateThumbnails();
    }, []);

    return (
        <Carousel
            showThumbs={true}
            showArrows
            emulateTouch
            infiniteLoop
            autoPlay={autoPlay}
            dynamicHeight={false}
            showStatus={false}
            showIndicators={false}
            interval={5000}
            selectedItem={selectedPhotoIndex}
            onChange={onCarouselChange}
            renderThumbs={() => thumbnails}
        >
            {mediaItems.map((mediaItem) => (
                <div
                    key={mediaItem._key}
                    className="w-full h-full flex items-center justify-center"
                >
                    {mediaItem.type === "image" && mediaItem.image && (
                        <img
                            src={imageBuilder.image(mediaItem.image).url()}
                            alt="Puppy"
                            className="w-auto max-h-full"
                        />
                    )}
                    {mediaItem.type === "video" && mediaItem.videoUrl && (
                        <div className="aspect-w-16 aspect-h-9 w-full">
                            <iframe
                                className="w-full h-full absolute inset-0"
                                src={`https://www.youtube.com/embed/${extractYoutubeVideoId(
                                    mediaItem.videoUrl
                                )}?mute=1&enablejsapi=1`}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                ref={(el) => {
                                    // Assign the ref
                                    if (el && !videoRef.current && window.YT) {
                                        window.YT.ready(() => {
                                            new window.YT.Player(el, {
                                                events: {
                                                    onReady: onVideoReady,
                                                    onStateChange: onVideoStateChange,
                                                },
                                            });
                                        });
                                    }
                                }}
                            ></iframe>
                        </div>
                    )}
                </div>
            ))}
        </Carousel>
    );
};

export default CustomCarousel;
