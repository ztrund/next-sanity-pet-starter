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

export const sanityImageUrl = (image: any, options?: SanityImageUrlOptions): string => {
    const projectId = "fcb9r3pv";
    const dataset = "production";

    if (!image || !image.asset || !image.asset._ref) {
        return '';
    }

    const imageId = image.asset._ref.split('-'); // [image, id, width x height, format]
    const imageDimensions = imageId[2].split('x'); // [width, height]
    let imageUrl = `https://cdn.sanity.io/images/${projectId}/${dataset}/${imageId[1]}-${imageId[2]}.${imageId[3]}`;

    let params = [];
    if (image.hotspot && options && options.w && options.h && !options.ignoreImageParams) {
        const croppedWidth = imageDimensions[0] * (1 - image.crop.left - image.crop.right);
        const croppedHeight = imageDimensions[1] * (1 - image.crop.bottom - image.crop.top);

        // calculate the scale ratio between original image and target size
        const scaleRatio = Math.min(croppedWidth / options.w, croppedHeight / options.h);

        // scale up hotspot dimensions
        const hsWidth = Math.round(options.w * scaleRatio);
        const hsHeight = Math.round(options.h * scaleRatio);

        // calculate hotspot position, scaled up but centered around original hotspot center
        let rectLeft = Math.round(image.hotspot.x * imageDimensions[0] - hsWidth / 2);
        let rectTop = Math.round(image.hotspot.y * imageDimensions[1] - hsHeight / 2);

        // ensure that the rectangle is within the image dimensions
        rectLeft = Math.max(0, Math.min(rectLeft, imageDimensions[0] - hsWidth));
        rectTop = Math.max(0, Math.min(rectTop, imageDimensions[1] - hsHeight));

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