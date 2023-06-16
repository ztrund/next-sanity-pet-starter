import {GetStaticProps} from 'next';
import fetchPageData from "../lib/fetchPageData";
import {PageData, TeamMember} from "../types";
import React from "react";
import Layout from "../components/layout/layout";
import CustomCarousel from "../components/carousel/customCarousel";

const About = ({pageData}: { pageData: PageData }) => {
    const {about, metaDescription} = pageData;
    return (<Layout pageTitle="About Us"
                    metaDesc={metaDescription.description}
                    pageData={pageData}>
        <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex flex-col w-full h-min gap-4">
                <div className="p-2 bg-light-shades drop-shadow-lg rounded-lg">
                    <h2 className="text-4xl font-extrabold text-center mb-2">About Us</h2>
                    <div className="prose max-w-none" dangerouslySetInnerHTML={{__html: about.sanitizedContent}}/>
                </div>
                {about.team && (
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
                                        {teamMember.position && (
                                            <p className="text-sm text-center">{teamMember.position}</p>
                                        )}
                                    </div>
                                </div>))}
                        </div>
                        {about.teamDescription && (
                            <div className="prose max-w-none"
                                 dangerouslySetInnerHTML={{__html: about.sanitizedTeamDescription}}/>
                        )}
                    </div>
                )}
            </div>
            {about.mediaItems && (
                <div className="w-full h-min p-0 bg-light-shades drop-shadow-lg rounded-lg overflow-hidden">
                    <CustomCarousel mediaItems={about.mediaItems}/>
                </div>
            )}
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

    return {
        props: {
            pageData
        },
    };
};

export default About;
