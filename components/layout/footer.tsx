import {PageData} from '../../types';
import Link from "next/link";

const Footer = ({pageData}: { pageData: PageData }) => {

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
                <div className="flex flex-wrap">
                    <div className="w-full md:w-1/3 mb-4 text-center">
                        <div className="text-lg font-bold mb-2">Social Media</div>
                        <ul>
                            {pageData?.contactInfo?.socialMediaLinks.map((link) => {
                                const [, viewBox, path] = link.icon.icon.split(" ~~ ");

                                return (
                                    <li key={link.platform} className="mb-2">
                                        <a
                                            key={link.platform}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="fill-white hover:fill-dark-accent hover:text-dark-accent flex justify-center items-center"
                                        >
                                            <svg viewBox={viewBox} className="h-4 mr-2">
                                                <path d={path}/>
                                            </svg>
                                            {link.platform}
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <div className="w-full md:w-1/3 mb-4 text-center">
                        <div className="text-lg font-bold mb-2">Pages</div>
                        <ul>
                            {pages.map((page) => (
                                <li key={page.name} className="mb-2">
                                    <Link href={page.url} className="hover:text-dark-accent">{page.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="w-full md:w-1/3 mb-4 text-center">
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
                <div className="text-sm text-center">
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
