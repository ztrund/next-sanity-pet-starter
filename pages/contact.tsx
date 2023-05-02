import Layout from '../components/layout';
import React from "react";
import * as Icons from "react-icons/fa";
import {GetStaticProps, InferGetStaticPropsType} from "next";
import fetchPageData from "../lib/fetchPageData";
import {BusinessHour, SocialMediaLink} from "../types";

const ContactPage = ({pageData}: InferGetStaticPropsType<typeof getStaticProps>) => {
    const {contactInfo} = pageData;

    const DynamicFontAwesomeIcon = (name: string) => {
        const IconComponent = (Icons as any)[name];
        return IconComponent ? <IconComponent className="mr-2"/> : null;
    };

    return (
        <Layout pageTitle="Contact Us" pageData={pageData}>
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
                    {contactInfo.socialMediaLinks.map((link: SocialMediaLink) => (
                        <a
                            key={link.platform}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mx-2 hover:text-dark-accent inline-flex items-center"
                        >
                            {DynamicFontAwesomeIcon(link.icon.name)}
                            {link.platform}
                        </a>
                    ))}
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
    const pageData = await fetchPageData();

    return {
        props: {
            pageData,
        },
        revalidate: 60,
    };
};

export default ContactPage;
