import {FunctionComponent} from 'react';
import Link from 'next/link';
import {Parent, Puppy} from '../types';
import imageUrlBuilder from '@sanity/image-url';
import sanityClient from '../lib/sanityClient';

interface DogCardProps {
    dog: Puppy | Parent;
    showPrice?: boolean;
    cardWidth?: string;
}

const DogCard: FunctionComponent<DogCardProps> = ({
                                                          dog,
                                                          showPrice = false,
                                                          cardWidth = 'w-full md:w-[22.5rem] lg:w-[30.5rem] xl:w-[18.75rem] 2xl:w-[22.75rem]'
                                                      }) => {
    const imageBuilder = imageUrlBuilder(sanityClient);
    const imageItem = dog.mediaItems?.find(item => item.type === 'image');
    const imageUrl = imageItem
        ? imageBuilder.image(imageItem.image).width(384).height(192).auto('format').quality(75).url()
        : 'url_to_some_default_image'; // Replace with a default image url

    const isPuppy = (pet: Puppy | Parent): pet is Puppy => {
        return (pet as Puppy).availability !== undefined;
    };

    return (
        <Link href={`/puppies/${dog.name.toLowerCase()}`} key={dog.name}
              className={`primary-container bg-light-shades rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 ${cardWidth}`}>
            <div className="h-48 overflow-hidden">
                <img src={imageUrl} alt={dog.name} className="w-full h-full object-cover" loading="lazy" width="384"
                     height="192"/>
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