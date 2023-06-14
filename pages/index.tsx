import {GetStaticProps} from "next";
import React, {useEffect, useState} from "react";
import {PageData, Puppy} from "../types";
import fetchPageData from "../lib/fetchPageData";
import {sanitizeHTML} from "../helpers/sanitizeHTML";
import Layout from "../components/layout/layout";
import DogCard from "../components/dogCard";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import Link from "next/link";

function separateAndShufflePuppies(array: Puppy[]) {
    const availablePuppies = array.filter(puppy => puppy.availability === 'Available');
    const reservedPuppies = array.filter(puppy => puppy.availability === 'Reserved');
    const soldPuppies = array.filter(puppy => puppy.availability === 'Sold');

    const shuffledAvailable = shuffleArray(availablePuppies);
    const shuffledReserved = shuffleArray(reservedPuppies);
    const shuffledSold = shuffleArray(soldPuppies);

    return [...shuffledAvailable, ...shuffledReserved, ...shuffledSold];
}

function shuffleArray(array: Puppy[]) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
}

const HomePage = ({pageData, homepageContent}: { pageData: PageData, homepageContent: string }) => {
    const {puppies, metaDescription, youtubeSettings} = pageData;
    const [randomPuppies, setRandomPuppies] = useState<Puppy[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const channelId = youtubeSettings.channelId;
    const fallbackVideoId = youtubeSettings.fallbackVideoId;
    const [liveVideoId, setLiveVideoId] = useState(fallbackVideoId);

    useEffect(() => {
        const sortedPuppies = separateAndShufflePuppies(puppies);
        setRandomPuppies(sortedPuppies.slice(0, 4));
        setIsLoading(false);

        (async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/checkYoutubeStatus?channelId=${channelId}&fallbackVideoId=${fallbackVideoId}`);
                const liveVideoId = await response.text();
                setLiveVideoId(liveVideoId);
            } catch (error) {
                console.error('Failed to fetch live video ID:', error);
            }
        })();
    }, []);

    return (
        <Layout pageTitle="Home Page"
                metaDesc={metaDescription.description}
                pageData={pageData}>
            <div className="flex flex-col xl:flex-row gap-4 mb-4 items-center">
                <div
                    className="w-full xl:w-1/2 bg-light-shades shadow-lg rounded-lg flex flex-col justify-center overflow-hidden">
                    <LiteYouTubeEmbed
                        id={liveVideoId}
                        title="YouTube Live"
                        webp={true}
                        poster="hqdefault"
                        params="autoplay=1&mute=1"
                    />
                </div>
                <div
                    className="w-full xl:w-1/2 p-2 bg-light-shades shadow-lg rounded-lg flex flex-col justify-center">
                    <div className="prose max-w-none" dangerouslySetInnerHTML={{__html: homepageContent}}/>
                </div>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mb-4">
                {isLoading ? (
                    <div
                        className="h-72 w-full flex items-center justify-center text-xl">
                        Loading Puppies...
                    </div>
                ) : (
                    randomPuppies.length > 0 ? (
                        randomPuppies.map((puppy) => (
                            <DogCard
                                dog={puppy}
                                cardWidth='w-full sm:w-[calc(50%-8px)] xl:w-[calc(25%-12px)]'
                                key={puppy._id}
                            />
                        ))
                    ) : (
                        <div
                            className="h-72 w-full bg-light-shades rounded-lg flex items-center justify-center text-xl p-2">
                            We're sorry, but we currently have no puppies available. We're constantly adding new
                            puppies, so please check back soon!
                        </div>
                    )
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

    const homepageContent = sanitizeHTML(pageData.homepage.content);

    return {
        props: {
            pageData,
            homepageContent
        },
    };
};

export default HomePage;
