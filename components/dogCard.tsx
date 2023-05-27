import {FunctionComponent} from 'react';
import Link from 'next/link';
import {Parent, Puppy} from '../types';
import {sanityImageUrl} from "../lib/sanityImageUrl";

interface DogCardProps {
    dog: Puppy | Parent;
    showPrice?: boolean;
    cardWidth?: string;
    lazy?: boolean;
}

const DogCard: FunctionComponent<DogCardProps> = ({
                                                      dog,
                                                      showPrice = false,
                                                      cardWidth = 'w-full md:w-[22.5rem] lg:w-[30.5rem] xl:w-[18.75rem] 2xl:w-[22.75rem]',
                                                      lazy = true,
                                                  }) => {
    const imageItem = dog.mediaItems?.find(item => item.type === 'image');
    const imageUrl = imageItem
        ? sanityImageUrl(imageItem.image, {w: 384, h: 192, auto: "format", q: 75, fit: "crop"})
        : '/images/paw-solid.svg';

    const isPuppy = (pet: Puppy | Parent): pet is Puppy => {
        return (pet as Puppy).availability !== undefined;
    };

    const imageClass = imageItem
        ? "w-full h-full object-cover"
        : "w-48 h-48 object-cover";

    const url = isPuppy(dog) ? `/puppies/${dog.name.toLowerCase()}` : `/parents/${dog.name.toLowerCase()}`;

    return (
        <Link href={url}
              className={`primary-container bg-light-shades rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 ${cardWidth}`}>
            <div className="h-48 overflow-hidden flex items-center justify-center">
                <img src={imageUrl} alt={dog.name} className={imageClass} loading={lazy ? "lazy" : "eager"} width="384" height="192"/>
            </div>
            <div className="p-2 h-24 flex justify-between items-center">
                <div>
                    <h2 className="text-lg font-bold">{dog.name}</h2>
                    <p className="">{dog.gender} - {dog.color}</p>
                    {isPuppy(dog) && <p className="">{dog.availability}</p>}
                </div>
                {isPuppy(dog) && showPrice && <div><p className="font-medium">${dog.price}</p></div>}
            </div>
        </Link>
    );
}

export default DogCard;