import {GetStaticProps} from "next";
import fetchPageData from "../lib/fetchPageData";
import {BusinessHour, PageData, SocialMediaLink} from "../types";
import Layout from "../components/layout/layout";
import {CustomSVGIcon} from "../components/svgIcons";

const ContactPage = ({pageData}: { pageData: PageData }) => {
    const {contactInfo, metaDescription} = pageData;

    return (
        <Layout pageTitle="Contact Us"
                metaDesc={metaDescription.description}
                pageData={pageData}>
            <div className="flex flex-col gap-10 mx-auto p-4 bg-light-shades drop-shadow-lg rounded-lg max-w-3xl">
                <div className="flex flex-col gap-4 text-center">
                    <h1 className="text-3xl font-bold">Contact Us</h1>
                    {(contactInfo.email || contactInfo.phone || contactInfo.location) && (
                        <div>
                            {contactInfo.email &&
                                <div className="flex flex-row items-center justify-center">
                                    <strong>Email:</strong>
                                    <a className="hover:text-dark-accent p-2" href={`mailto:${contactInfo.email}`}
                                       target="_blank" rel="noopener noreferrer">
                                        {contactInfo.email}
                                    </a>
                                </div>
                            }
                            {contactInfo.phone &&
                                <div className="flex flex-row items-center justify-center">
                                    <strong>Phone:</strong>
                                    <a className="hover:text-dark-accent p-2" href={`tel:${contactInfo.phone}`}>
                                        {contactInfo.phone}
                                    </a>
                                </div>
                            }
                            {contactInfo.location &&
                                <div className="flex flex-row items-center justify-center">
                                    <strong>Location:</strong>
                                    <a className="hover:text-dark-accent p-2"
                                       href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contactInfo.location)}`}
                                       target="_blank" rel="noopener noreferrer">
                                        {contactInfo.location}
                                    </a>
                                </div>
                            }
                        </div>
                    )}
                </div>
                {contactInfo.socialMediaLinks && (
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-4">Follow us on social media:</h2>
                        <div className="flex flex-wrap justify-center">
                            {contactInfo.socialMediaLinks.map((link: SocialMediaLink) => {
                                return (
                                    <a
                                        key={link.platform}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex flex-row p-2 hover:fill-dark-accent hover:text-dark-accent items-center gap-2"
                                    >
                                        {link.icon && (
                                            <CustomSVGIcon viewBox={link.icon.viewBox} path={link.icon.path}/>
                                        )}
                                        {link.platform}
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                )}
                {contactInfo.businessHours && (
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-4">Business Hours:</h2>
                        {contactInfo.businessHours.map((hours: BusinessHour) => (
                            <p key={hours.day}>
                                <strong>{hours.day}:</strong> {hours.hours}
                            </p>
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const additionalQuery = `
    "metaDescription": *[_type == "metaDescriptions"][0]{
      'description': contact,
    },
  `;

    const pageData = await fetchPageData(additionalQuery);

    return {
        props: {
            pageData,
        },
    };
};

export default ContactPage;
