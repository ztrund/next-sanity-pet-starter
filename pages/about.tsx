import {GetStaticProps, InferGetStaticPropsType} from 'next';
import {PortableText} from '@portabletext/react';
import sanityClient from '../lib/sanityClient';
import Layout from "../components/layout";
import CustomCarousel from "../components/customCarousel";
import {MediaItem} from "../interfaces/mediaItem";

type AboutProps = {
    title: string;
    content: any[];
    mediaItems: MediaItem[];
};

const About = ({title, content, mediaItems}: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <Layout pageTitle="About Us">
            <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-1/2 h-min p-2 bg-light-shades drop-shadow-lg rounded-lg">
                    <h1 className="text-3xl font-bold">{title}</h1>
                    <PortableText value={content}/>
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
      title,
      content,
      mediaItems
    }
  `);

    return {
        props: {
            title: about.title,
            content: about.content,
            mediaItems: about.mediaItems,
        },
        revalidate: 60,
    };
};

export default About;
