import Link from "next/link";
import { useRouter } from "next/router";

const Header = () => {
    const router = useRouter();

    return (
        <div className="flex justify-center bg-gray-900">
            <div className="container mx-auto">
                <header className="flex justify-between items-center text-white p-4">
                    <div className="text-xl font-bold">All In One Frenchies</div>
                    <nav className="flex items-center space-x-4">
                        <Link href="/" className="text-white hover:text-gray-300 focus:outline-none">Home</Link>
                        <Link href="/about" className="text-white hover:text-gray-300 focus:outline-none">About Us</Link>
                        <Link href="/puppies" className="text-white hover:text-gray-300 focus:outline-none">Puppies</Link>
                        <Link href="/contact" className="text-white hover:text-gray-300 focus:outline-none">Contact Us</Link>
                    </nav>
                </header>
            </div>
        </div>
    );
};

export default Header;
