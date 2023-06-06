import {FunctionComponent} from 'react';
import Link from 'next/link';
import {Parent, Puppy} from '../types';
import {sanityImageUrl} from "../lib/sanityImageUrl";

interface DogCardProps {
    dog: Puppy | Parent;
    showPrice?: boolean;
    cardWidth?: string;
    imageSizes?: string;
    lazy?: boolean;
}

const DogCard: FunctionComponent<DogCardProps> = ({
                                                      dog,
                                                      showPrice = false,
                                                      cardWidth = 'w-full sm:w-[calc(50%-8px)] xl:w-[calc(25%-12px)]',
                                                      imageSizes = '(max-width: 639px) calc(100vw-32px), (max-width: 767px) 296px, (max-width: 1023px) 360px, (max-width: 1279px) 488px, (max-width: 1535px) 300px, 364px',
                                                      lazy = true,
                                                  }) => {
    const imageItem = dog.mediaItems?.find(item => item.type === 'image');

    const isPuppy = (pet: Puppy | Parent): pet is Puppy => {
        return (pet as Puppy).availability !== undefined;
    };

    const url = isPuppy(dog) ? `/puppies/${dog.name.toLowerCase()}` : `/parents/${dog.name.toLowerCase()}`;

    const aspectRatio = 16 / 9;

    let srcSet = "";
    if (imageItem) {
        // Calculate width for 1x, 1.5x, 2x DPR at each breakpoint
        const widths = [300, 364, 488,].map(w => [w, w * 1.5, w * 2]);
        srcSet = widths.flat().map(w => {
            const h = Math.round(w / aspectRatio);
            return `${sanityImageUrl(imageItem.image, {w, h, auto: "format", q: 75, fit: "min"})} ${w}w`;
        }).join(', ');
    }

    return (<Link href={url}
                  className={`primary-container bg-light-shades rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 ${cardWidth}`}>
        <div className="aspect-video overflow-hidden flex items-center justify-center">
            {imageItem ?
                <img src={sanityImageUrl(imageItem.image, {w: 300, h: 169, auto: "format", q: 75, fit: "min"})}
                     srcSet={srcSet}
                     sizes={imageSizes}
                     alt={dog.name} className="w-full h-full object-cover" loading={lazy ? "lazy" : "eager"}/> :
                <img src="/images/paw-solid.svg" alt={dog.name} className="w-full h-full object-contain"/>}
        </div>
        <div className="p-2 h-24 flex justify-between items-center">
            <div>
                <h2 className="text-lg font-bold aspect">{dog.name}</h2>
                <p className="">{dog.gender} - {dog.color}</p>
                {isPuppy(dog) && <p className="">{dog.availability}</p>}
            </div>
            {isPuppy(dog) && showPrice && <div><p className="font-medium">${dog.price}</p></div>}
        </div>
    </Link>);
}

export default DogCard;