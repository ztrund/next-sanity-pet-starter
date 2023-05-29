import {GetStaticProps, InferGetStaticPropsType} from 'next';
import Layout from "../components/layout/layout";
import CustomCarousel from "../components/customCarousel";
import fetchPageData from "../lib/fetchPageData";
import {TeamMember} from "../types";
import {sanityImageUrl} from "../lib/sanityImageUrl";
import {sanitizeHTML} from "../helpers/sanitizeHTML";

const About = ({
                   pageData,
                   aboutContent,
                   aboutTeamDescription,
               }: InferGetStaticPropsType<typeof getStaticProps>) => {
    const {about, metaDescription} = pageData;
    return (
        <Layout pageTitle="About Us"
                metaDesc={metaDescription.description}
                pageData={pageData}>
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex flex-col w-full lg:w-1/2 h-min gap-4">
                    <div className="p-2 bg-light-shades drop-shadow-lg rounded-lg">
                        <h2 className="text-4xl font-extrabold text-center mb-2">About Us</h2>
                        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: aboutContent}}/>
                    </div>
                    <div className="p-2 bg-light-shades drop-shadow-lg rounded-lg">
                        <h2 className="text-4xl font-extrabold text-center mb-2">Our Team</h2>
                        <div className="flex flex-wrap justify-center gap-2 mb-2">
                            {about.team.map((teamMember: TeamMember) => (
                                <div key={teamMember.name} className="flex flex-col lg:flex-row items-center">
                                    <div className="flex flex-col items-center">
                                        <img
                                            src={sanityImageUrl(teamMember.image, {
                                                w: 128,
                                                h: 128,
                                                auto: "format",
                                                q: 75,
                                                fit: "crop"
                                            })}
                                            alt={teamMember.name} className="rounded-full shadow-lg" loading="lazy"
                                            height="128" width="128"/>
                                        <h3 className="text-xl font-bold mt-2 text-center">{teamMember.name}</h3>
                                        <p className="text-sm text-center">{teamMember.position}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: aboutTeamDescription}}/>
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

    const aboutContent = sanitizeHTML(pageData.about?.content);
    const aboutTeamDescription = sanitizeHTML(pageData.about?.teamDescription);

    return {
        props: {
            pageData,
            aboutContent,
            aboutTeamDescription,
        },
    };
};

export default About;
