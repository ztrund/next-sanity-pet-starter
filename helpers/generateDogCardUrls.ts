import {Parent, Puppy} from "../types";
import {sanityImgUrl} from "../lib/sanityImgUrl";

const generateDogCardUrls = (dogs: (Puppy | Parent)[]) => {
    const imageUrlParams = {
        auto: 'format',
        q: 75,
        fit: 'min'
    };
    const widths = [300, 364, 488,].map(w => [w, w * 1.5, w * 2]).flat()
    const heights = widths.map(w => Math.round(w / (16 / 9)))
    dogs.map((dog: Puppy | Parent) => {
        dog.picture.image.imageUrl = sanityImgUrl(dog.picture.image, {...imageUrlParams, w: widths[0], h: heights[0]});
        dog.picture.image.srcSet = widths.map((w, i) => `${sanityImgUrl(dog.picture.image, {
            ...imageUrlParams,
            w: w,
            h: heights[i]
        })} ${w}w`).join(', ');
    });
}

export default generateDogCardUrls;