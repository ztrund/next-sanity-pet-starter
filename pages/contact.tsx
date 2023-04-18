import Layout from '../components/layout';
import React, {useEffect} from "react";
import * as Icons from "react-icons/fa";
import useContactInfo from "../hooks/useContactInfo";

const ContactPage: React.FC = () => {
    const contactInfo = useContactInfo();

    useEffect(() => {
        if (!contactInfo) {
            return;
        }
    }, [contactInfo]);

    const DynamicFontAwesomeIcon = (name: string) => {
        const IconComponent = (Icons as any)[name];
        return IconComponent ? <IconComponent className="mr-2"/> : null;
    };

    return (
        <Layout pageTitle="Contact Us">
            <div className="container mx-auto p-4 bg-light-shades drop-shadow-lg rounded-lg max-w-3xl">
                <h1 className="text-3xl font-bold text-center mb-8">Contact Us</h1>
                <p className="text-center mb-12">Feel free to reach out to us through the following channels:</p>

                {/* Additional contact information */}
                <div className="mb-12 text-center">
                    <h2 className="text-2xl font-bold mb-4">Other ways to reach us:</h2>
                    <p>
                        <strong>Email:</strong> {contactInfo?.email}
                    </p>
                    <p>
                        <strong>Phone:</strong> {contactInfo?.phone}
                    </p>
                    <p>
                        <strong>Location:</strong> {contactInfo?.location}
                    </p>
                </div>

                {/* Social Media Links */}
                <div className="mb-12 text-center">
                    <h2 className="text-2xl font-bold mb-4">Follow us on social media:</h2>
                    {contactInfo?.socialMediaLinks.map((link) => (
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
                    {contactInfo?.businessHours.map((hours) => (
                        <p key={hours.day}>
                            <strong>{hours.day}:</strong> {hours.hours}
                        </p>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default ContactPage;
