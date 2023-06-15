import {FunctionComponent} from 'react';
import {Parent, Puppy} from '../types';
import Link from "next/link";

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

    const isPuppy = (pet: Puppy | Parent): pet is Puppy => {
        return (pet as Puppy).availability !== undefined;
    };

    const url = isPuppy(dog) ? `/puppies/${dog.name.toLowerCase()}` : `/parents/${dog.name.toLowerCase()}`;

    const dogImage = dog.picture.image;

    return (<Link href={url}
                  className={`primary-container bg-light-shades rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 ${cardWidth}`}>
        <div className="aspect-video overflow-hidden flex items-center justify-center">
            {!lazy && <link
                rel="preload"
                as="image"
                href={dogImage.imageUrl}
                imageSrcSet={dogImage.srcSet}
                imageSizes={imageSizes}
            />}
            <img
                src={dogImage.imageUrl}
                srcSet={dogImage.srcSet}
                sizes={imageSizes}
                alt={dog.name}
                className="w-full h-full object-cover"
                loading={lazy ? "lazy" : "eager"}
            />
        </div>
        <div className="p-2 h-24 flex justify-between items-center">
            <div>
                <h2 className="text-lg font-bold aspect">{dog.name}</h2>
                <p className="">{dog.gender} - {dog.color}</p>
                {isPuppy(dog) && <p className="">{dog.availability}</p>}
            </div>
            {isPuppy(dog) && showPrice && <div><p className="font-medium">{dog.price && `$${dog.price}`}</p></div>}
        </div>
    </Link>);
}

export default DogCard;