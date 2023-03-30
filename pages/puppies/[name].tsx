import {GetStaticPaths, GetStaticProps, InferGetStaticPropsType} from 'next';
import imageUrlBuilder from '@sanity/image-url';
import sanityClient from '../../lib/sanityClient';
import Layout from '../../components/layout';
import {Carousel} from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import {useState} from "react";

type PuppyProps = {
    name: string;
    birthdate: string;
    gender: string;
    color: string;
    weight: number;
    temperament: string[];
    description: string;
    photos: {
        asset: {
            _id: string;
            metadata: {
                palette: {
                    darkMuted: string;
                };
            };
        };
    }[];
    availability: string;
    price: number;
};


const Puppy = ({puppy}: InferGetStaticPropsType<typeof getStaticProps>) => {
    const {
        name,
        birthdate,
        gender,
        color,
        weight,
        temperament,
        description,
        photos,
        availability,
        price,
    } = puppy;

    const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

    const imageBuilder = imageUrlBuilder(sanityClient);

    const onCarouselChange = (index: number) => {
        setSelectedPhotoIndex(index);
    };

    return (
        <Layout pageTitle={name}>
            <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-1/2 h-min p-0 bg-light-shades drop-shadow-lg rounded-lg overflow-hidden">
                    <Carousel
                        showThumbs={true}
                        showArrows={true}
                        emulateTouch={true}
                        infiniteLoop={true}
                        autoPlay={true}
                        dynamicHeight={false}
                        showStatus={false}
                        interval={5000}
                        selectedItem={selectedPhotoIndex}
                        onChange={onCarouselChange}
                        className=""
                    >
                        {photos.map((photo, index) => (
                            <div key={photo.asset._id}>
                                <img
                                    src={imageBuilder.image(photo.asset).url()}
                                    alt={name}
                                    className="w-full"
                                    style={{
                                        backgroundColor: photo.asset.metadata.palette.darkMuted,
                                    }}
                                />
                            </div>
                        ))}
                    </Carousel>
                </div>
                <div className="w-full md:w-1/2 h-min p-2 bg-light-shades drop-shadow-lg rounded-lg">
                    <h1 className="text-3xl font-bold mb-2">{name}</h1>
                    <p>
                        <strong>Birthdate:</strong> {new Date(birthdate).toLocaleDateString()}
                    </p>
                    <p>
                        <strong>Gender:</strong> {gender}
                    </p>
                    <p>
                        <strong>Color:</strong> {color}
                    </p>
                    <p>
                        <strong>Weight:</strong> {weight} lbs
                    </p>
                    <p>
                        <strong>Temperament:</strong> {temperament.join(', ')}
                    </p>
                    <p>
                        <strong>Description:</strong> {description}
                    </p>
                    <p>
                        <strong>Availability:</strong> {availability}
                    </p>
                    <p>
                        <strong>Price:</strong> ${price}
                    </p>
                </div>
            </div>
        </Layout>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const puppies = await sanityClient.fetch(`*[_type == "puppies"]{ name }`);
    const paths = puppies.map((puppy: { name: string }) => ({
        params: {name: puppy.name.toLowerCase()},
    }));

    return {paths, fallback: false};
};

export const getStaticProps: GetStaticProps<{ puppy: PuppyProps }> = async ({params}) => {
    const puppy = await sanityClient.fetch(
        `*[_type == "puppies" && name match $name][0]{
      name,
      birthdate,
      gender,
      color,
      weight,
      temperament,
      description,
      "photos": photos[] {
        asset->{ 
          _id,
          metadata {
            palette {
              darkMuted
            }
          }
        }
      },
      availability,
      price
    }`,
        {name: params?.name}
    );

    return {
        props: {puppy},
        revalidate: 60,
    };
};

export default Puppy;
