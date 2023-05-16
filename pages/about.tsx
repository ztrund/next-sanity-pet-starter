import {GetStaticProps, InferGetStaticPropsType} from 'next';
import {PortableText} from '@portabletext/react';
import Layout from "../components/layout";
import CustomCarousel from "../components/customCarousel";
import fetchPageData from "../lib/fetchPageData";
import {TeamMember} from "../types";
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../lib/sanityClient";

const About = ({pageData}: InferGetStaticPropsType<typeof getStaticProps>) => {
    const {about, metaDescription} = pageData;
    const imageBuilder = imageUrlBuilder(sanityClient);
    return (
        <Layout pageTitle="About Us"
                metaDesc={metaDescription.description}
                pageData={pageData}>
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex flex-col w-full lg:w-1/2 h-min gap-4">
                    <div className="p-2 bg-light-shades drop-shadow-lg rounded-lg">
                        <h2 className="text-4xl font-extrabold text-center mb-2">About Us</h2>
                        <div className="prose max-w-none"><PortableText value={about.content}/></div>
                    </div>
                    <div className="p-2 bg-light-shades drop-shadow-lg rounded-lg">
                        <h2 className="text-4xl font-extrabold text-center mb-2">Our Team</h2>
                        <div className="flex flex-wrap justify-center gap-2 mb-2">
                            {about.team.map((teamMember: TeamMember) => (
                                <div key={teamMember.name} className="flex flex-col lg:flex-row items-center">
                                    <div className="flex flex-col items-center">
                                        <img
                                            src={imageBuilder.image(teamMember.image).width(128).height(128).auto('format').quality(75).url()}
                                            alt={teamMember.name} className="rounded-full shadow-lg" loading="lazy" height="128" width="128"/>
                                        <h3 className="text-xl font-bold mt-2 text-center">{teamMember.name}</h3>
                                        <p className="text-sm text-center">{teamMember.position}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="prose max-w-none"><PortableText value={about.teamDescription}/></div>
                    </div>
                </div>
                <div className="w-full lg:w-1/2 h-min p-0 bg-light-shades drop-shadow-lg rounded-lg overflow-hidden">
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
      mediaItems,
      team[] {
        name,
        position,
        image,
      },
      teamDescription,
    },
    "metaDescription": *[_type == "metaDescriptions"][0]{
      'description': about,
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
