import {GetStaticProps, InferGetStaticPropsType} from 'next';
import {PortableText} from '@portabletext/react';
import Layout from "../components/layout";
import CustomCarousel from "../components/customCarousel";
import fetchPageData from "../lib/fetchPageData";

const About = ({pageData}: InferGetStaticPropsType<typeof getStaticProps>) => {
    const {about} = pageData;
    return (
        <Layout pageTitle="About Us"
                metaDesc="Learn about our passion for puppies, our commitment to their well-being, and our dedication to finding them loving homes. Discover what sets us apart in the world of puppy care."
                pageData={pageData}>
            <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-1/2 h-min p-2 bg-light-shades drop-shadow-lg rounded-lg">
                    <div className="prose max-w-none"><PortableText value={about.content}/></div>
                </div>
                <div className="w-full md:w-1/2 h-min p-0 bg-light-shades drop-shadow-lg rounded-lg overflow-hidden">
                    <CustomCarousel mediaItems={about.mediaItems}/>
                </div>
            </div>
        </Layout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const additionalQuery = `
    "about": *[_type == "about"][0] {
      content,
      mediaItems
    },
  `;

    const pageData = await fetchPageData(additionalQuery);

    return {
        props: {
            pageData,
        },
        revalidate: 60,
    };
};

export default About;
