import {useState} from 'react';
import {GetStaticProps, InferGetStaticPropsType} from 'next';
import Link from 'next/link';
import sanityClient from '../lib/sanityClient';
import Layout from '../components/layout';
import imageUrlBuilder from "@sanity/image-url";
import {MediaItem} from "../types";

type ParentProps = {
    name: string;
    birthdate: string;
    gender: string;
    color: string;
    weight: number;
    mediaItems: MediaItem[];
};

type ParentsProps = {
    parents: ParentProps[];
};

const Parents = ({parents}: InferGetStaticPropsType<typeof getStaticProps>) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredParents = parents.filter((parent) => {
        return (
            parent.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    const imageBuilder = imageUrlBuilder(sanityClient);

    return (
        <Layout pageTitle="Parents">
            <div className="container mx-auto">
                <div className="flex justify-between items-center mb-4 bg-light-shades drop-shadow-lg rounded-lg p-2">
                    <h1 className="text-3xl font-bold on-secondary-text">Parents</h1>
                    <input
                        className="border-2 rounded py-1 px-2 w-48 sm:w-64"
                        type="text"
                        placeholder="Search parents"
                        onChange={(e) => setSearchTerm(e.target.value)}
                        value={searchTerm}
                    />
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                    {filteredParents.map((parent) => (
                        <Link href={`/parents/${parent.name.toLowerCase()}`} key={parent.name}
                              className="primary-container bg-light-shades rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1">
                            <div className="h-48 overflow-hidden">
                                <img
                                    src={imageBuilder.image(parent.mediaItems.find(item => item.type === "image")?.image).width(384).auto('format').quality(75).url()}
                                    alt={parent.name} className="w-full h-full object-cover"/>
                            </div>
                            <div className="p-2">
                                <h2 className="text-lg font-bold">{parent.name}</h2>
                                <p className="">{parent.gender} - {parent.color}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export const getStaticProps: GetStaticProps<ParentsProps> = async () => {
    const parents = await sanityClient.fetch(
        `*[_type == "parents"]{
      name,
      birthdate,
      gender,
      color,
      weight,
      mediaItems,
    }`
    );

    return {
        props: {parents},
        revalidate: 60,
    };
};

export default Parents;
