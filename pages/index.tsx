import Layout from "../components/layout";
import {GetStaticProps, InferGetStaticPropsType} from "next";
import sanityClient from "../lib/sanityClient";
import imageUrlBuilder from "@sanity/image-url";
import Link from "next/link";
import {useEffect, useState} from "react";

type PuppyProps = {
    name: string;
    birthdate: string;
    gender: string;
    color: string;
    weight: number;
    temperament: string[];
    photo: {
        asset: {
            _id: string;
            metadata: {
                palette: {
                    darkMuted: string;
                };
            };
        };
    };
    availability: string;
    price: number;
};

type PuppiesProps = {
    puppies: PuppyProps[];
};

function shuffleArray(array: any) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
}

function getRandomSample(array: any, count: number) {
    const shuffledArray = shuffleArray(array);
    return shuffledArray.slice(0, count);
}

const HomePage = ({puppies}: InferGetStaticPropsType<typeof getStaticProps>) => {

    const imageBuilder = imageUrlBuilder(sanityClient);

    // const randomPuppies = getRandomSample(puppies, 4);

    const [randomPuppies, setRandomPuppies] = useState<PuppyProps[]>([]);

    useEffect(() => {
        setRandomPuppies(getRandomSample(puppies, 4));
    }, []);

    return (
        <Layout pageTitle="Home Page">
            <div className="flex flex-col xl:flex-row gap-4 mb-4 items-stretch">
                <div className="w-full xl:w-1/2 p-2 bg-light-shades shadow-lg rounded-lg flex flex-col justify-center">
                    <p className="text-lg mb-4">
                        Welcome to All In One Frenchies! We are a dedicated French Bulldog breeder located in Central Texas, committed to raising happy, healthy, and well-socialized Frenchies that make perfect companions for families and individuals alike.
                    </p>
                    <p className="text-lg mb-4">
                        At All In One Frenchies, we take great pride in our breeding program, focusing on quality genetics, temperament, and health. Our Frenchies are raised in a loving and nurturing environment, ensuring they grow up to be well-adjusted and affectionate pets.
                    </p>
                    <p className="text-lg mb-4">
                        Explore our website to learn more about our available puppies, breeding practices, and the wonderful world of French Bulldogs. We look forward to helping you find your perfect Frenchie companion from All In One Frenchies!
                    </p>
                </div>
                <div className="w-full xl:w-1/2 bg-light-shades shadow-lg rounded-lg flex flex-col justify-center overflow-hidden">
                    <div className="relative w-full" style={{paddingBottom: '56.25%'}}>
                        <iframe
                            className="absolute top-0 left-0 w-full h-full"
                            src="https://www.youtube.com/embed/live_stream?channel=YOUR_CHANNEL_ID"
                            title="YouTube Live Stream"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 mb-4">
                {randomPuppies.map((puppy) => (
                    <Link href={`/puppies/${puppy.name.toLowerCase()}`} key={puppy.name}
                          className="primary-container bg-light-shades rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1">
                        <div className="h-48 overflow-hidden">
                            <img src={imageBuilder.image(puppy.photo.asset).url()} alt={puppy.name}
                                 className="w-full h-full object-cover"/>
                        </div>
                        <div className="p-2">
                            <h2 className="text-lg font-bold">{puppy.name}</h2>
                            <p className="">{puppy.gender} - {puppy.color}</p>
                            <p className="">{puppy.availability}</p>
                        </div>
                    </Link>
                ))}
            </div>
            <Link href="/puppies"
                  className="flex items-center justify-center p-2 bg-light-shades rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1">
                <h1 className="text-2xl font-bold mb-2">Click to see the rest of the puppies</h1>
            </Link>
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
      temperament,
      "photo": photos[0]{
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
    }`
    );

    return {
        props: {puppies},
        revalidate: 60,
    };
};

export default HomePage;
