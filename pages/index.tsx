import {GetStaticProps} from "next";
import React, {useEffect, useState} from "react";
import {PageData, Puppy} from "../types";
import fetchPageData from "../lib/fetchPageData";
import Layout from "../components/layout/layout";
import DogCard from "../components/dogCard";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import Link from "next/link";

function shuffleArray(array: Puppy[]) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
}

const HomePage = ({pageData}: { pageData: PageData }) => {
    const {puppies, metaDescription, homepage} = pageData;
    const [randomPuppies, setRandomPuppies] = useState<Puppy[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [liveVideoId, setLiveVideoId] = useState(homepage.fallbackVideoId);

    useEffect(() => {
        const shuffledPuppies = shuffleArray(puppies);
        const availablePuppies: Puppy[] = [];
        const reservedPuppies: Puppy[] = [];
        const soldPuppies: Puppy[] = [];

        shuffledPuppies.forEach(puppy => {
            switch (puppy.availability) {
                case 'Available':
                    availablePuppies.push(puppy);
                    break;
                case 'Reserved':
                    reservedPuppies.push(puppy);
                    break;
                case 'Sold':
                    soldPuppies.push(puppy);
                    break;
                default:
                    break;
            }
        });

        const sortedPuppies = [...availablePuppies, ...reservedPuppies, ...soldPuppies];
        setRandomPuppies(sortedPuppies.slice(0, 4));
        setIsLoading(false);

        if (homepage.channelUrl) {
            const fetchLiveVideoId = async () => {
                try {
                    const response = await fetch(`/checkYoutubeStatus?channelId=${homepage.channelId}&fallbackVideoId=${homepage.fallbackVideoId}`);

                    if (!response.ok) {
                        console.error('Failed to fetch live video ID, status:', response.status);
                        return;
                    }

                    const liveVideoId = await response.text();
                    setLiveVideoId(liveVideoId);
                } catch (error) {
                    console.error('Failed to fetch live video ID:', error);
                }
            }

            fetchLiveVideoId();
        }
    }, []);

    return (
        <Layout pageTitle="Home Page"
                metaDesc={metaDescription.description}
                pageData={pageData}>
            <div className="flex flex-col xl:flex-row gap-4 mb-4 items-center">
                <div
                    className="w-full bg-light-shades shadow-lg rounded-lg flex flex-col justify-center overflow-hidden">
                    <LiteYouTubeEmbed
                        id={liveVideoId}
                        title="YouTube Live"
                        webp={true}
                        poster="hqdefault"
                        params="autoplay=1&mute=1"
                    />
                </div>
                <div
                    className="w-full p-2 bg-light-shades shadow-lg rounded-lg flex flex-col justify-center">
                    <div className="prose max-w-none"
                         dangerouslySetInnerHTML={{__html: homepage.sanitizedContent}}/>
                </div>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mb-4">
                {puppies.length > 0 ? (
                    isLoading ? (
                        Array.from({length: Math.min(puppies.length, 4)}, (_, i) => (
                            <div
                                key={i}
                                className="bg-light-shades rounded-lg shadow-lg w-full sm:w-[calc(50%-8px)] xl:w-[calc(25%-12px)]">
                                <div className="aspect-video"/>
                                <div className="h-24"/>
                            </div>
                        ))
                    ) : (
                        randomPuppies.map((puppy) => (
                            <DogCard
                                dog={puppy}
                                cardWidth='w-full sm:w-[calc(50%-8px)] xl:w-[calc(25%-12px)]'
                                key={puppy._id}
                            />
                        ))
                    )
                ) : (
                    <div
                        className="h-72 w-full bg-light-shades rounded-lg flex items-center justify-center text-xl p-2">
                        We're sorry, but we currently have no puppies available. We're constantly adding new
                        puppies, so please check back soon!
                    </div>
                )}
            </div>
            <Link href="/puppies"
                  className="flex items-center justify-center p-2 bg-light-shades rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1">
                <h1 className="text-2xl font-medium">See all of the puppies</h1>
            </Link>
        </Layout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const additionalQuery = `
    "puppies": *[_type == "puppies"] {
      _id,
      name,
      gender,
      color,
      'picture': mediaItems[type == "image"][0],
      availability,
    },
    "homepage": *[_type == "homepage"][0] {
      content,
      channelUrl,
      fallbackVideoUrl,
    },
    "metaDescription": *[_type == "metaDescriptions"][0]{
      'description': home,
    },
  `;

    const pageData = await fetchPageData(additionalQuery);

    return {
        props: {
            pageData
        },
    };
};

export default HomePage;
