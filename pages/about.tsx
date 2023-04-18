import {GetStaticProps, InferGetStaticPropsType} from 'next';
import {PortableText} from '@portabletext/react';
import sanityClient from '../lib/sanityClient';
import Layout from "../components/layout";
import CustomCarousel from "../components/customCarousel";
import {MediaItem} from "../types";

type AboutProps = {
    content: any[];
    mediaItems: MediaItem[];
};

const About = ({content, mediaItems}: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <Layout pageTitle="About Us">
            <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-1/2 h-min p-2 bg-light-shades drop-shadow-lg rounded-lg">
                    <div className="prose max-w-none"><PortableText value={content}/></div>
                </div>
                <div className="w-full md:w-1/2 h-min p-0 bg-light-shades drop-shadow-lg rounded-lg overflow-hidden">
                    <CustomCarousel mediaItems={mediaItems}/>
                </div>
            </div>
        </Layout>
    );
};

export const getStaticProps: GetStaticProps<AboutProps> = async () => {
    const about = await sanityClient.fetch(`
    *[_type == "about"][0] {
      content,
      mediaItems
    }
  `);

    return {
        props: {
            content: about.content,
            mediaItems: about.mediaItems,
        },
        revalidate: 60,
    };
};

export default About;
