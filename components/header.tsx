import Link from "next/link";
import { useRouter } from "next/router";

const Header = () => {
    const router = useRouter();

    const getLinkClassName = (href: string) => {
        const isActive = router.pathname === href;
        const baseClass = "hover:drop-shadow-lg focus:outline-none";
        const activeClass = "text-main-brand-color"; // Change this to the color you want for the active link
        const inactiveClass = "text-gray-100 hover:text-white";

        return `${baseClass} ${isActive ? activeClass : inactiveClass}`;
    };

    return (
        <div className="flex justify-center bg-dark-shades">
            <div className="container mx-auto">
                <header className="flex justify-between items-center text-white p-4">
                    <div className="text-xl font-bold">All In One Frenchies</div>
                    <nav className="flex items-center space-x-4">
                        <Link href="/" className={getLinkClassName("/")}>Home</Link>
                        <Link href="/about" className={getLinkClassName("/about")}>About Us</Link>
                        <Link href="/puppies" className={getLinkClassName("/puppies")}>Puppies</Link>
                        <Link href="/contact" className={getLinkClassName("/contact")}>Contact Us</Link>
                    </nav>
                </header>
            </div>
        </div>
    );
};

export default Header;
