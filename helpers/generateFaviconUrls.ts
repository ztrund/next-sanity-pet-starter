import {SanityImage} from "../types";
import {sanityImgUrl} from "../lib/sanityImgUrl";

const generateFaviconUrls = (favicon: SanityImage) => ({
    default: sanityImgUrl(favicon, {
        w: 512,
        h: 512,
        fit: "fill",
        bg: "0000",
        ignoreImageParams: true
    }),
    png512: sanityImgUrl(favicon, {
        w: 512,
        h: 512,
        fit: "fill",
        fm: "png",
        bg: "0000",
        ignoreImageParams: true
    }),
    png192: sanityImgUrl(favicon, {
        w: 192,
        h: 192,
        fit: "fill",
        fm: "png",
        bg: "0000",
        ignoreImageParams: true
    }),
    png32: sanityImgUrl(favicon, {
        w: 32,
        h: 32,
        fit: "fill",
        fm: "png",
        bg: "0000",
        ignoreImageParams: true
    }),
    png16: sanityImgUrl(favicon, {
        w: 16,
        h: 16,
        fit: "fill",
        fm: "png",
        bg: "0000",
        ignoreImageParams: true
    }),
    appleTouch: sanityImgUrl(favicon, {
        w: 180,
        h: 180,
        fit: "fill",
        fm: "png",
        bg: "0000",
        ignoreImageParams: true
    }),
});

export default generateFaviconUrls;