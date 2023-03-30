import Link from 'next/link';

const Footer = () => {
    const socialMediaLinks = [
        {
            name: 'Twitter',
            url: 'https://twitter.com/',
        },
        {
            name: 'Facebook',
            url: 'https://www.facebook.com/',
        },
        {
            name: 'Instagram',
            url: 'https://www.instagram.com/',
        },
    ];

    const pages = [
        {
            name: 'Home',
            url: '/',
        },
        {
            name: 'Puppies',
            url: '/puppies',
        },
        {
            name: 'About Us',
            url: '/about',
        },
        {
            name: 'Contact Us',
            url: '/contact',
        },
    ];

    const businessHours = [
        'Monday-Friday: 9am-5pm',
        'Saturday: 10am-4pm',
        'Sunday: Closed',
    ];

    return (
        <footer className="bg-dark-shades text-white">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-wrap mb-8">
                    <div className="w-full md:w-1/3 mb-4 md:mb-0">
                        <h3 className="text-lg font-bold mb-2">Social Media</h3>
                        <ul>
                            {socialMediaLinks.map((link) => (
                                <li key={link.name} className="mb-2">
                                    <a
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:drop-shadow"
                                    >
                                        {link.name}
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
                                    <Link href={page.url} className="hover:drop-shadow">{page.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="w-full md:w-1/3 mb-4 md:mb-0">
                        <h3 className="text-lg font-bold mb-2">Business Hours</h3>
                        <ul>
                            {businessHours.map((hours) => (
                                <li key={hours} className="mb-2">
                                    <span className="">{hours}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="text-sm">
                    <p>&copy; {new Date().getFullYear()} Your Company Name</p>
                    <p>1234 Main Street, Anytown USA 12345</p>
                    <p>Phone: 555-555-5555</p>
                    <p>Email: info@yourcompany.com</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
