import {useState} from 'react';
import {GetStaticProps, InferGetStaticPropsType} from 'next';
import Link from 'next/link';
import sanityClient from '../lib/sanityClient';
import Layout from '../components/layout';
import imageUrlBuilder from "@sanity/image-url";
import {MediaItem} from "../interfaces/mediaItem";

type PuppyProps = {
    name: string;
    birthdate: string;
    gender: string;
    color: string;
    weight: number;
    mediaItems: MediaItem[];
    availability: string;
    price: number;
};

type PuppiesProps = {
    puppies: PuppyProps[];
};

const Puppies = ({puppies}: InferGetStaticPropsType<typeof getStaticProps>) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredPuppies = puppies.filter((puppy) => {
        return (
            puppy.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    const imageBuilder = imageUrlBuilder(sanityClient);

    return (
        <Layout pageTitle="Puppies">
            <div className="container mx-auto">
                <div className="flex justify-between items-center mb-4 bg-light-shades drop-shadow-lg rounded-lg p-2">
                    <h1 className="text-3xl font-bold on-secondary-text">Puppies</h1>
                    <input
                        className="border-2 rounded py-1 px-2 w-64"
                        type="text"
                        placeholder="Search puppies"
                        onChange={(e) => setSearchTerm(e.target.value)}
                        value={searchTerm}
                    />
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                    {filteredPuppies.map((puppy) => (
                        <Link href={`/puppies/${puppy.name.toLowerCase()}`} key={puppy.name}
                              className="primary-container bg-light-shades rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1">
                            <div className="h-48 overflow-hidden">
                                <img
                                    src={imageBuilder.image(puppy.mediaItems.find(item => item.type === "image")?.image).width(384).auto('format').quality(75).url()}
                                    alt={puppy.name} className="w-full h-full object-cover"/>
                            </div>
                            <div className="p-2">
                                <h2 className="text-lg font-bold">{puppy.name}</h2>
                                <p className="">{puppy.gender} - {puppy.color}</p>
                                <p className="">{puppy.availability}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export const getStaticProps: GetStaticProps<PuppiesProps> = async () => {
    const puppies = await sanityClient.fetch(
        `*[_type == "puppies"]{
      name,
      birthdate,
      gender,
      color,
      weight,
      mediaItems,
      availability,
      price
    }`
    );

    return {
        props: {puppies},
        revalidate: 60,
    };
};

export default Puppies;
