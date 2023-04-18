import {GetStaticPaths, GetStaticProps, InferGetStaticPropsType} from 'next';
import sanityClient from '../../lib/sanityClient';
import Layout from '../../components/layout';
import CustomCarousel from "../../components/customCarousel";
import {MediaItem} from "../../types";

type PuppyProps = {
    name: string;
    birthdate: string;
    gender: string;
    color: string;
    weight: number;
    description: string;
    mediaItems: MediaItem[];
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
        description,
        mediaItems,
        availability,
        price,
    } = puppy;

    return (
        <Layout pageTitle={name}>
            <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-1/2 h-min p-0 bg-light-shades drop-shadow-lg rounded-lg overflow-hidden">
                    <CustomCarousel mediaItems={mediaItems}/>
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
      description,
      mediaItems,
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
