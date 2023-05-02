import Link from "next/link";
import { useRouter } from "next/router";
import { Disclosure } from "@headlessui/react";
import { FiMenu, FiX } from "react-icons/fi";
import { SiteInfo } from "../types";

interface HeaderProps {
    pageData?: SiteInfo;
}

const Header = ({ pageData }: HeaderProps) => {
    const router = useRouter();

    const getLinkClassName = (href: string) => {
        const isActive = router.pathname === href;
        const baseClass = "hover:text-dark-accent focus:outline-none";
        const activeClass = "text-main-brand-color";
        const inactiveClass = "text-gray-100";

        return `${baseClass} ${isActive ? activeClass : inactiveClass}`;
    };

    const NavigationLinks = ({ isVertical }: { isVertical: boolean }) => (
        <div
            className={`flex ${
                isVertical ? "flex-col items-end space-y-4" : "space-x-4"
            }`}
        >
            <Link href="/" className={getLinkClassName("/")}>
                Home
            </Link>
            <Link href="/about" className={getLinkClassName("/about")}>
                About Us
            </Link>
            <Link href="/puppies" className={getLinkClassName("/puppies")}>
                Puppies
            </Link>
            <Link href="/parents" className={getLinkClassName("/parents")}>
                Parents
            </Link>
            <Link href="/contact" className={getLinkClassName("/contact")}>
                Contact Us
            </Link>
        </div>
    );

    return (
        <div className="flex justify-center bg-dark-shades">
            <div className="container mx-auto">
                <header className="text-white p-4">
                    <Disclosure as="nav">
                        {({ open }) => (
                            <>
                                <div className="flex justify-between items-center">
                                    <div className="text-xl font-bold">{pageData?.companyInfo?.companyName}</div>
                                    <div className="hidden lg:flex">
                                        <NavigationLinks isVertical={false} />
                                    </div>
                                    <Disclosure.Button className="lg:hidden focus:outline-none">
                                        {open ? <FiX size={24} /> : <FiMenu size={24} />}
                                    </Disclosure.Button>
                                </div>
                                <div
                                    className={`fixed top-0 right-0 w-64 h-full bg-dark-shades z-10 transform ${
                                        open ? "translate-x-0" : "translate-x-full"
                                    } transition-transform duration-300 ease-in-out lg:hidden`}
                                >
                                    <div className="pt-20 pr-4">
                                        <Disclosure.Button className="absolute top-4 right-4 text-white focus:outline-none">
                                            <FiX size={24} />
                                        </Disclosure.Button>
                                        <NavigationLinks isVertical={true} />
                                    </div>
                                </div>
                            </>
                        )}
                    </Disclosure>
                </header>
            </div>
        </div>
    );
};

export default Header;
