import {SiteInfo} from '../types';
import Link from "next/link";

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

    return (
        <footer className="bg-dark-shades text-white">
            <div className="container mx-auto p-4">
                <div className="flex flex-wrap mb-8">
                    <div className="w-full md:w-1/3 mb-4 md:mb-0">
                        <div className="text-lg font-bold mb-2">Social Media</div>
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
                                        <i className={`fab mr-2`}>{String.fromCharCode(parseInt(link.icon.icon.split(" & ")[1], 16))}</i>
                                        {link.platform}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="w-full md:w-1/3 mb-4 md:mb-0">
                        <div className="text-lg font-bold mb-2">Pages</div>
                        <ul>
                            {pages.map((page) => (
                                <li key={page.name} className="mb-2">
                                    <Link href={page.url} className="hover:text-dark-accent">{page.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="w-full md:w-1/3 mb-4 md:mb-0">
                        <div className="text-lg font-bold mb-2">Business Hours</div>
                        <ul>
                            {pageData?.contactInfo?.businessHours.map((hours) => (
                                <li key={hours.day} className="mb-2">
                                    <strong>{hours.day}:</strong> {hours.hours}
                                </li>
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
