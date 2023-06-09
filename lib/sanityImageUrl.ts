import {SanityImage} from "../types";

interface SanityImageUrlOptions {
    w?: number;
    h?: number;
    auto?: string;
    bg?: string;
    blur?: number;
    crop?: string;
    dl?: string;
    dlRaw?: string;
    dpr?: number;
    fit?: string;
    flip?: string;
    fm?: string;
    fpX?: number;
    fpY?: number;
    invert?: boolean;
    or?: number;
    q?: number;
    rect?: string;
    sat?: number;
    sharp?: number;
    ignoreImageParams?: boolean;
}

export const sanityImageUrl = (image: SanityImage, options?: SanityImageUrlOptions): string => {
    const projectId = "fcb9r3pv";
    const dataset = "production";

    if (!image || !image.asset || !image.asset._ref) {
        return '';
    }

    const [, imgID, imgDimensions, imgFormat] = image.asset._ref.split('-');
    const [width, height] = imgDimensions.split('x').map(Number);
    let imageUrl = `https://cdn.sanity.io/images/${projectId}/${dataset}/${imgID}-${imgDimensions}.${imgFormat}`;

    let params = [];
    if (image.hotspot && options && options.w && options.h && !options.ignoreImageParams) {
        const croppedWidth = width * (1 - image.crop.left - image.crop.right);
        const croppedHeight = height * (1 - image.crop.bottom - image.crop.top);

        // calculate the scale ratio between original image and target size
        const scaleRatio = Math.min(croppedWidth / options.w, croppedHeight / options.h);

        // scale up hotspot dimensions
        const hsWidth = Math.round(options.w * scaleRatio);
        const hsHeight = Math.round(options.h * scaleRatio);

        // calculate hotspot position, scaled up but centered around original hotspot center
        let rectLeft = Math.round(image.hotspot.x * width - hsWidth / 2);
        let rectTop = Math.round(image.hotspot.y * height - hsHeight / 2);

        // ensure that the rectangle is within the image dimensions
        rectLeft = Math.max(0, Math.min(rectLeft, width - hsWidth));
        rectTop = Math.max(0, Math.min(rectTop, height - hsHeight));

        params.push(`rect=${rectLeft},${rectTop},${hsWidth},${hsHeight}`);
    }

    if (options) {
        for (const [key, value] of Object.entries(options)) {
            params.push(`${key}=${value}`);
        }
    }

    if (params.length > 0) {
        imageUrl += `?${params.join('&')}`;
    }

    return imageUrl;
};