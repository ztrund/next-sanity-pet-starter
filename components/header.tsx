import Link from "next/link";
import {useRouter} from "next/router";
import {Disclosure} from "@headlessui/react";
import {FiMenu, FiX} from "react-icons/fi";
import {SiteInfo} from "../types";

interface HeaderProps {
    pageData?: SiteInfo;
}

const Header = ({ pageData }: HeaderProps) => {
    const router = useRouter();

    const getLinkClassName = (href: string) => {
        const isActive = router.pathname === href;
        const baseClass = "hover:text-dark-accent focus:outline-none p-2";
        const activeClass = "text-main-brand-color";
        const inactiveClass = "text-gray-100";

        return `${baseClass} ${isActive ? activeClass : inactiveClass}`;
    };

    const NavigationLinks = ({ isVertical }: { isVertical: boolean }) => (
        <div
            className={`flex ${
                isVertical ? "flex-col items-end space-y-2 w-full" : ""
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
        <div className="fixed w-full h-16 top-0 z-10 bg-dark-shades shadow-lg">
            <div className="container mx-auto h-full">
                <div className="flex h-full justify-center items-center text-white">
                    <Disclosure as="nav" className="w-full px-2">
                        {({ open }) => (
                            <>
                                <div className="flex justify-between">
                                    <Link href="/" className="text-xl font-bold p-2">{pageData?.companyInfo?.companyName}</Link>
                                    <div className="hidden lg:flex">
                                        <NavigationLinks isVertical={false} />
                                    </div>
                                    <Disclosure.Button className="lg:hidden focus:outline-none p-2" aria-label="Menu Toggle">
                                        {open ? <FiX size={24} /> : <FiMenu size={24} />}
                                    </Disclosure.Button>
                                </div>
                                <Disclosure.Button className={`fixed top-0 right-0 w-full h-full z-20 transform ${
                                    open ? "translate-x-0" : "translate-x-full"
                                } lg:hidden`}/>
                                <div
                                    className={`fixed top-0 right-0 w-48 h-full bg-dark-shades z-30 transform ${
                                        open ? "translate-x-0 shadow-lg" : "translate-x-full"
                                    } transition-transform duration-300 ease-in-out lg:hidden`}
                                >
                                    <div className="flex-col px-2">
                                        <div className="flex flex-col h-16 items-end justify-center mb-2">
                                            <Disclosure.Button className="text-white focus:outline-none p-2" aria-label="Close Menu">
                                                <FiX size={24} />
                                            </Disclosure.Button>
                                        </div>
                                        <NavigationLinks isVertical={true} />
                                    </div>
                                </div>
                            </>
                        )}
                    </Disclosure>
                </div>
            </div>
        </div>
    );
};

export default Header;
