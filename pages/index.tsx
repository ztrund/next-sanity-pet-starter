import Layout from "../components/layout";
import {GetStaticProps, InferGetStaticPropsType} from "next";
import sanityClient from "../lib/sanityClient";
import imageUrlBuilder from "@sanity/image-url";
import Link from "next/link";
import {useEffect, useState} from "react";
import {PortableText} from "@portabletext/react";
import YoutubeLiveEmbed from "../components/youtubeLiveEmbed";
import {Puppy} from "../types";
import fetchPageData from "../lib/fetchPageData";
import {extractYoutubeChannelId, extractYoutubeVideoId} from "../helpers/youtubeLinkExtractor";

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

const HomePage = ({pageData}: InferGetStaticPropsType<typeof getStaticProps>) => {

    const {puppies, homepage, metaDescription, youtubeSettings} = pageData;

    const imageBuilder = imageUrlBuilder(sanityClient);

    const [randomPuppies, setRandomPuppies] = useState<Puppy[]>([]);

    const [isLoading, setIsLoading] = useState(true);

    const [liveVideoId, setLiveVideoId] = useState('');

    const channelId = extractYoutubeChannelId(youtubeSettings.channelUrl || '') || '';
    const fallbackVideoId = extractYoutubeVideoId(youtubeSettings.fallbackVideoUrl || '') || '';

    useEffect(() => {
        setRandomPuppies(getRandomSample(puppies, 4));
        setIsLoading(false);
        const fetchLiveVideoId = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/checkYoutubeStatus?channelId=${channelId}&fallbackVideoId=${fallbackVideoId}`);
            const liveVideoId = await response.text();
            setLiveVideoId(liveVideoId);
        };

        fetchLiveVideoId();
    }, []);

    return (
        <Layout pageTitle="Home Page"
                metaDesc={metaDescription.description}
                pageData={pageData}>
            <div className="flex flex-col xl:flex-row gap-4 mb-4 items-center">
                <div
                    className="w-full xl:w-1/2 bg-light-shades shadow-lg rounded-lg flex flex-col justify-center overflow-hidden">
                    <YoutubeLiveEmbed liveVideoId={liveVideoId}/>
                </div>
                <div
                    className="w-full xl:w-1/2 p-2 bg-light-shades shadow-lg rounded-lg flex flex-col justify-center">
                    <div className="prose max-w-none"><PortableText value={homepage.content}/></div>
                </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 mb-4">
                {isLoading ? (
                    Array(4).fill(null).map((_, index) => (
                        <div key={index}
                             className="h-64 bg-light-shades rounded-lg shadow-lg overflow-hidden">
                        </div>
                    ))) : (
                    randomPuppies.map((puppy) => (
                        <Link href={`/puppies/${puppy.name.toLowerCase()}`} key={puppy.name}
                              className="primary-container bg-light-shades rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1">
                            <div className="h-48 overflow-hidden">
                                <img
                                    src={imageBuilder.image(puppy.mediaItems.find(item => item.type === "image")?.image).width(384).height(192).auto('format').quality(75).url()}
                                    alt={puppy.name} className="w-full h-full object-cover" loading="lazy" width="384" height="192"/>
                            </div>
                            <div className="p-2">
                                <h2 className="text-lg font-bold">{puppy.name}</h2>
                                <p className="">{puppy.gender} - {puppy.color}</p>
                                <p className="">{puppy.availability}</p>
                            </div>
                        </Link>
                    ))
                )}
            </div>
            <Link href="/puppies"
                  className="flex items-center justify-center p-2 bg-light-shades rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1">
                <h1 className="text-2xl font-medium">See the rest of the puppies</h1>
            </Link>
        </Layout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const additionalQuery = `
    "puppies": *[_type == "puppies"] {
      name,
      gender,
      color,
      mediaItems,
      availability,
    },
    "homepage": *[_type == "homepage"][0] {
      content
    },
    "youtubeSettings": *[_type == "youtubeSettings"][0] {
      channelUrl,
      fallbackVideoUrl
    },
    "metaDescription": *[_type == "metaDescriptions"][0]{
      'description': home,
    },
  `;

    const pageData = await fetchPageData(additionalQuery);

    return {
        props: {
            pageData,
        },
    };
};

export default HomePage;
