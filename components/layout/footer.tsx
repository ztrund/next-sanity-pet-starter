import {PageData} from '../../types';
import {CustomSVGIcon} from "../svgIcons";
import Link from "next/link";

const Footer = ({pageData}: { pageData: PageData }) => {
    const {contactInfo, companyInfo} = pageData;

    const pages = [
        {
            name: 'Home',
            url: '/',
        },
        {
            name: 'About Us',
            url: '/about',
        },
        {
            name: 'Puppies',
            url: '/puppies',
        },
        {
            name: 'Parents',
            url: '/parents',
        },
        {
            name: 'Contact Us',
            url: '/contact',
        },
    ];

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col md:flex-row mb-4">
                {contactInfo.socialMediaLinks && (
                    <div className="w-full mb-4 text-center">
                        <div className="text-lg font-bold mb-2">Social Media</div>
                        <ul className="flex flex-col gap-2">
                            {contactInfo.socialMediaLinks.map((link) => {
                                return (
                                    <li key={link.platform}>
                                        <a
                                            key={link.platform}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="fill-white hover:fill-dark-accent hover:text-dark-accent flex justify-center items-center gap-2"
                                        >
                                            {link.icon && (
                                                <CustomSVGIcon viewBox={link.icon.viewBox} path={link.icon.path}/>
                                            )}
                                            {link.platform}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}
                <div className="w-full mb-4 text-center">
                    <div className="text-lg font-bold mb-2">Pages</div>
                    <ul className="flex flex-col gap-2">
                        {pages.map((page) => (
                            <li key={page.name}>
                                <Link href={page.url} className="flex justify-center items-center hover:text-dark-accent">{page.name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
                {contactInfo.businessHours && (
                    <div className="w-full mb-4 text-center">
                        <div className="text-lg font-bold mb-2">Business Hours</div>
                        <ul className="flex flex-col gap-2">
                            {contactInfo.businessHours.map((hours) => (
                                <li key={hours.day}>
                                    <strong>{hours.day}:</strong> {hours.hours}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
            <div className="flex flex-col gap-3 text-sm text-center">
                <p>&copy; {new Date().getFullYear()} {companyInfo.companyName}</p>
                {contactInfo.email &&
                    <a className="hover:text-dark-accent" href={`mailto:${contactInfo.email}`} target="_blank" rel="noopener noreferrer">
                        {contactInfo.email}
                    </a>
                }
                {contactInfo.phone &&
                    <a className="hover:text-dark-accent" href={`tel:${contactInfo.phone}`}>
                        {contactInfo.phone}
                    </a>
                }
                {contactInfo.location &&
                    <a className="hover:text-dark-accent" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contactInfo.location)}`} target="_blank" rel="noopener noreferrer">
                        {contactInfo.location}
                    </a>
                }
            </div>
        </div>
    );
};

export default Footer;
