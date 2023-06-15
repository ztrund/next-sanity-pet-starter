import React, {useCallback, useEffect, useState} from "react";
import {MediaItem} from "../../types";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import {createPortal} from "react-dom";
import VideoSlide from "./videoSlide";
import ThumbnailImage from "./thumbnailImage";
import ThumbnailVideo from "./thumbnailVideo";
import ImageSlide from "./imageSlide";

const CustomCarousel = ({mediaItems}: { mediaItems: MediaItem[] }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [currentImage, setCurrentImage] = useState("");
    const [modalNode, setModalNode] = useState<Element | null>(null);

    if (!mediaItems) {
        return null;
    }

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
        <div className="overflow-hidden" ref={viewportRef}>
            <div className="flex items-center">
                {mediaItems.map((mediaItem: MediaItem, index: number) => (<div
                    key={mediaItem._key}
                    className="flex-grow-0 flex-shrink-0 basis-full min-w-0"
                >
                    {mediaItem.type === "image" &&
                        <ImageSlide imageSlide={mediaItem.imageSlide} index={index} onClick={() => {
                            setCurrentImage(mediaItem.image.imageUrl || '');
                            setShowModal(true);
                        }}/>}
                    {mediaItem.type === "video" && <VideoSlide mediaItem={mediaItem} index={index}/>}
                </div>))}
            </div>
        </div>
        <div className="overflow-hidden" ref={thumbViewportRef}>
            <div className="flex flex-row">
                {mediaItems.map((mediaItem: MediaItem, index: number) => (<div
                    key={mediaItem._key}
                    className={`flex ${selectedIndex === index ? 'border-4 border-main-brand-color' : 'border-4'}`}
                    onClick={() => {
                        scrollTo(index)
                    }}
                >
                    <button className="h-32 w-32" type="button"
                            title={"Slide " + index + " Button"}>
                        {mediaItem.type === "image" &&
                            <ThumbnailImage thumbnailImage={mediaItem.thumbnailImage} index={index}/>}
                        {mediaItem.type === "video" && <ThumbnailVideo mediaItem={mediaItem} index={index}/>}
                    </button>
                </div>))}
            </div>
        </div>
    </>);
};

export default CustomCarousel;
