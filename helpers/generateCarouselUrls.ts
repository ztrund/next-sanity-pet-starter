import {MediaItem} from "../types";
import {sanityImgUrl} from "../lib/sanityImgUrl";
import {extractYoutubeVideoId} from "./youtubeLinkExtractor";

const generateCarouselUrls = (mediaItems: MediaItem[]) => {
    const imageUrlParams = {
        auto: 'format',
        q: 75,
        fit: 'min'
    };
    mediaItems.map((mediaItem) => {
        if (mediaItem.type === 'image') {
            mediaItem.image.imageUrl = sanityImgUrl(mediaItem.image, {...imageUrlParams});
            mediaItem.imageSlide = {
                imageUrl: sanityImgUrl(mediaItem.image, {...imageUrlParams, w: 488, h: 488}),
                srcSet: [488, 616, 744, 976, 1232, 1488].map(dimension => `${sanityImgUrl(mediaItem.image, {
                    ...imageUrlParams,
                    w: dimension,
                    h: dimension
                })} ${dimension}w`).join(', '),
                sizes: '(max-width: 1023px) calc(100vw - 32px), (max-width: 1536px) calc(50vw - 24px), 744px'
            };
            mediaItem.thumbnailImage = {
                imageUrl: sanityImgUrl(mediaItem.image, {...imageUrlParams, w: 128, h: 128, dpr: 1}),
                srcSet: [1, 1.5, 2].map(dpr => `${sanityImgUrl(mediaItem.image, {
                    ...imageUrlParams,
                    w: 128,
                    h: 128,
                    dpr: dpr
                })} ${dpr}x`).join(', '),
            };
        }
        if (mediaItem.type === 'video') {
            mediaItem.videoId = extractYoutubeVideoId(mediaItem.videoUrl);
        }
    });
}

export default generateCarouselUrls;