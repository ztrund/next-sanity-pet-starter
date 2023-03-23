import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { PortableText } from '@portabletext/react';
import sanityClient from '../../lib/sanityClient';
import Layout from '../../components/layout';

type PuppyProps = {
    name: string;
    birthdate: string;
    gender: string;
    color: string;
    weight: number;
    temperament: string[];
    description: any;
    photos: {
        asset: {
            url: string;
        };
    }[];
    availability: string;
};

const Puppy = ({ puppy }: InferGetStaticPropsType<typeof getStaticProps>) => {
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
    } = puppy;

    return (
        <Layout pageTitle={name}>
            <div className="container mx-auto my-8">
                <h1 className="text-3xl font-bold my-4">{name}</h1>
                <div className="flex flex-wrap">
                    <div className="w-full md:w-1/2 p-4">
                        <img src={photos[0]?.asset?.url} alt={name} className="w-full" />
                    </div>
                    <div className="w-full md:w-1/2 p-4">
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
                        <PortableText value={description} />
                        <p>
                            <strong>Availability:</strong> {availability}
                        </p>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const puppies = await sanityClient.fetch(`*[_type == "puppies"]{ name }`);
    const paths = puppies.map((puppy: { name: string }) => ({
        params: { name: puppy.name.toLowerCase() },
    }));

    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<{ puppy: PuppyProps }> = async ({ params }) => {
    const puppy = await sanityClient.fetch(
        `*[_type == "puppies" && name match $name][0]{
      name,
      birthdate,
      gender,
      color,
      weight,
      temperament,
      description,
      photos,
      availability
    }`,
        { name: params?.name }
    );

    return {
        props: { puppy },
        revalidate: 60,
    };
};

export default Puppy;
