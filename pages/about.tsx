import {GetStaticProps} from 'next';
import fetchPageData from "../lib/fetchPageData";
import {PageData, TeamMember} from "../types";
import {sanitizeHTML} from "../helpers/sanitizeHTML";
import dynamic from "next/dynamic";
import React from "react";
import Layout from "../components/layout/layout";

// const Layout = dynamic(() => import("../components/layout/layout"), {ssr: false});
const CustomCarousel = dynamic(() => import("../components/carousel/customCarousel"), {
    loading: () =>
        <>
            <div className="aspect-square"/>
            <div className="h-[136px]"/>
        </>,
    ssr: false
});

const About = ({pageData, aboutContent, aboutTeamDescription}: {
    pageData: PageData,
    aboutContent: string,
    aboutTeamDescription: string
}) => {
    const {about, metaDescription} = pageData;
    return (<Layout pageTitle="About Us"
                    metaDesc={metaDescription.description}
                    pageData={pageData}>
        <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex flex-col w-full lg:w-1/2 h-min gap-4">
                <div className="p-2 bg-light-shades drop-shadow-lg rounded-lg">
                    <h2 className="text-4xl font-extrabold text-center mb-2">About Us</h2>
                    <div className="prose max-w-none" dangerouslySetInnerHTML={{__html: aboutContent}}/>
                </div>
                <div className="p-2 bg-light-shades drop-shadow-lg rounded-lg">
                    <h2 className="text-4xl font-extrabold text-center mb-2">Our Team</h2>
                    <div className="flex flex-wrap justify-center gap-2 mb-2">
                        {about.team.map((teamMember: TeamMember) => (
                            <div key={teamMember.name} className="flex flex-col lg:flex-row items-center">
                                <div className="flex flex-col items-center">
                                    <img
                                        src={teamMember.image.imageUrl}
                                        srcSet={teamMember.image.srcSet}
                                        alt={teamMember.name}
                                        className="h-32 w-32 rounded-full shadow-lg"
                                        loading="lazy"
                                    />
                                    <h3 className="text-xl font-bold mt-2 text-center">{teamMember.name}</h3>
                                    <p className="text-sm text-center">{teamMember.position}</p>
                                </div>
                            </div>))}
                    </div>
                    <div className="prose max-w-none" dangerouslySetInnerHTML={{__html: aboutTeamDescription}}/>
                </div>
            </div>
            <div className="w-full lg:w-1/2 h-min p-0 bg-light-shades drop-shadow-lg rounded-lg overflow-hidden">
                <CustomCarousel mediaItems={about.mediaItems}/>
            </div>
        </div>
    </Layout>);
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

    const aboutContent = sanitizeHTML(pageData.about?.content);
    const aboutTeamDescription = sanitizeHTML(pageData.about?.teamDescription);

    return {
        props: {
            pageData, aboutContent, aboutTeamDescription,
        },
    };
};

export default About;
