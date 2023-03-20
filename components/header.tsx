import Link from "next/link";

const Header = () => {
    return (
        <header className="flex justify-between items-center bg-gray-900 text-white p-4">
            <div className="text-xl font-bold">All In One Frenchies</div>
            <nav>
                <ul className="flex space-x-4">
                    <li>
                        <Link href="/">Home</Link>
                    </li>
                    <li>
                        <Link href="/about">About Us</Link>
                    </li>
                    <li>
                        <Link href="/puppies">Puppies</Link>
                    </li>
                    <li>
                        <Link href="/contact">Contact Us</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
