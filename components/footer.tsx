import Link from 'next/link';
import { SiteInfo } from '../types';
import {IconType} from "react-icons";
import {FaFacebookF, FaInstagram, FaTwitter, FaYoutube} from "react-icons/fa";
import React from "react";

interface FooterProps {
    pageData?: SiteInfo;
}

const Footer = ({ pageData }: FooterProps) => {

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

    const iconComponents: { [key: string]: IconType } = {
        FaInstagram,
        FaFacebookF,
        FaYoutube,
        FaTwitter,
    };

    const DynamicFontAwesomeIcon = (name: string) => {
        const IconComponent = iconComponents[name];
        return IconComponent ? <IconComponent className="mr-2" /> : null;
    };

    return (
        <footer className="bg-dark-shades text-white">
            <div className="container mx-auto p-4">
                <div className="flex flex-wrap mb-8">
                    <div className="w-full md:w-1/3 mb-4 md:mb-0">
                        <h3 className="text-lg font-bold mb-2">Social Media</h3>
                        <ul>
                            {pageData?.contactInfo?.socialMediaLinks.map((link) => (
                                <li key={link.platform} className="mb-2">
                                    <a
                                        key={link.platform}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-dark-accent inline-flex items-center"
                                    >
                                        {DynamicFontAwesomeIcon(link.icon.name)}
                                        {link.platform}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="w-full md:w-1/3 mb-4 md:mb-0">
                        <h3 className="text-lg font-bold mb-2">Pages</h3>
                        <ul>
                            {pages.map((page) => (
                                <li key={page.name} className="mb-2">
                                    <Link href={page.url} className="hover:text-dark-accent">{page.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="w-full md:w-1/3 mb-4 md:mb-0">
                        <h3 className="text-lg font-bold mb-2">Business Hours</h3>
                        <ul>
                            {pageData?.contactInfo?.businessHours.map((hours) => (
                                <p key={hours.day} className="mb-2">
                                    <strong>{hours.day}:</strong> {hours.hours}
                                </p>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="text-sm">
                    <p>&copy; {new Date().getFullYear()} {pageData?.companyInfo?.companyName}</p>
                    <p>Email: {pageData?.contactInfo?.email}</p>
                    <p>Phone: {pageData?.contactInfo?.phone}</p>
                    <p>{pageData?.contactInfo?.location}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
