import Layout from '../components/layout/layout';
import {GetStaticProps} from "next";
import fetchPageData from "../lib/fetchPageData";
import {BusinessHour, PageData, SocialMediaLink} from "../types";
import {CustomSVGIcon} from "../components/svgs";

const ContactPage = ({pageData}: { pageData: PageData }) => {
    const {contactInfo, metaDescription} = pageData;

    return (
        <Layout pageTitle="Contact Us"
                metaDesc={metaDescription.description}
                pageData={pageData}>
            <div className="container mx-auto p-4 bg-light-shades drop-shadow-lg rounded-lg max-w-3xl">
                <h1 className="text-3xl font-bold text-center mb-8">Contact Us</h1>
                <p className="text-center mb-12">Feel free to reach out to us through the following channels:</p>

                {/* Additional contact information */}
                <div className="mb-12 text-center">
                    <h2 className="text-2xl font-bold mb-4">Other ways to reach us:</h2>
                    <p>
                        <strong>Email:</strong> {contactInfo.email}
                    </p>
                    <p>
                        <strong>Phone:</strong> {contactInfo.phone}
                    </p>
                    <p>
                        <strong>Location:</strong> {contactInfo.location}
                    </p>
                </div>

                {/* Social Media Links */}
                <div className="mb-12 text-center">
                    <h2 className="text-2xl font-bold mb-4">Follow us on social media:</h2>
                    {contactInfo.socialMediaLinks.map((link: SocialMediaLink) => {
                        const [, viewBox, path] = link.icon.icon.split(" ~~ ");

                        return (
                            <a
                                key={link.platform}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 hover:fill-dark-accent hover:text-dark-accent inline-flex items-center gap-2"
                            >
                                <CustomSVGIcon viewBox={viewBox} path={path}/>
                                {link.platform}
                            </a>
                        );
                    })}
                </div>

                {/* Business Hours */}
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Business Hours:</h2>
                    {contactInfo.businessHours.map((hours: BusinessHour) => (
                        <p key={hours.day}>
                            <strong>{hours.day}:</strong> {hours.hours}
                        </p>
                    ))}
                </div>
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
