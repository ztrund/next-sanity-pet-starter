import {GetStaticPaths, GetStaticProps, InferGetStaticPropsType} from 'next';
import sanityClient from '../../lib/sanityClient';
import Layout from '../../components/layout';
import CustomCarousel from "../../components/customCarousel";
import {MediaItem} from "../../types";
import Image from 'next/image';
import {getAge} from "../../helpers/getAge";

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

    const { years, weeks, days } = getAge(birthdate);

    return (
        <Layout pageTitle={name}>
            <div className="flex justify-between items-center p-2 mb-4 bg-light-shades shadow-lg rounded-lg">
                <h1 className="text-3xl font-bold">{name}</h1>
                <h1 className="text-2xl font-normal">{availability} - ${price}</h1>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-1/2 h-min p-0 bg-light-shades shadow-lg rounded-lg overflow-hidden">
                    <CustomCarousel mediaItems={mediaItems}/>
                </div>
                <div className="w-full md:w-1/2">
                    <div className="h-min p-2 bg-light-shades shadow-lg rounded-lg mb-4">
                        <p>
                            <strong>Age:</strong> {years > 0 ? `${years} ${years === 1 ? 'year' : 'years'},` : ''} {weeks} {weeks === 1 ? 'week' : 'weeks'} and {days} {days === 1 ? 'day' : 'days'} old
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
                    </div>
                    <div className="h-min p-0 bg-light-shades shadow-lg rounded-lg overflow-hidden">
                        <a href="https://www.example.com/financing-application" target="_blank" rel="noopener noreferrer">
                            <Image
                                src="/TFC-rectangle-web-banner-800x500.png"
                                alt="Terrace Finance - Financing Available"
                                width='800'
                                height='500'
                            />
                        </a>
                    </div>
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
