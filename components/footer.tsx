import Link from 'next/link';
import React, {useEffect} from "react";
import * as Icons from "react-icons/fa";
import { SiteInfo } from '../types';

interface FooterProps {
    siteInfo?: SiteInfo;
}

const Footer = ({ siteInfo }: FooterProps) => {

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

    const DynamicFontAwesomeIcon = (name: string) => {
        const IconComponent = (Icons as any)[name];
        return IconComponent ? <IconComponent className="mr-2" /> : null;
    };

    return (
        <footer className="bg-dark-shades text-white">
            <div className="container mx-auto p-4">
                <div className="flex flex-wrap mb-8">
                    <div className="w-full md:w-1/3 mb-4 md:mb-0">
                        <h3 className="text-lg font-bold mb-2">Social Media</h3>
                        <ul>
                            {siteInfo?.contactInfo?.socialMediaLinks.map((link) => (
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
                            {siteInfo?.contactInfo?.businessHours.map((hours) => (
                                <p key={hours.day} className="mb-2">
                                    <strong>{hours.day}:</strong> {hours.hours}
                                </p>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="text-sm">
                    <p>&copy; {new Date().getFullYear()} {siteInfo?.companyInfo?.companyName}</p>
                    <p>Email: {siteInfo?.contactInfo?.email}</p>
                    <p>Phone: {siteInfo?.contactInfo?.phone}</p>
                    <p>{siteInfo?.contactInfo?.location}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
