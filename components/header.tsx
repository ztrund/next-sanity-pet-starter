import Link from "next/link";
import {useRouter} from "next/router";
import {Disclosure} from "@headlessui/react";
import {FiMenu, FiX} from "react-icons/fi";
import {SiteInfo} from "../types";

interface HeaderProps {
    pageData?: SiteInfo;
}

const Header = ({pageData}: HeaderProps) => {
    const router = useRouter();

    const getLinkClassName = (href: string, isVertical: boolean) => {
        const isActive = router.pathname === href;
        const baseClass = `hover:text-dark-accent focus:outline-none h-16 flex items-center ${isVertical ? "px-4 w-full text-end justify-end" : "px-2"}`;
        const activeClass = "text-main-brand-color";
        const inactiveClass = "text-gray-100";

        return `${baseClass} ${isActive ? activeClass : inactiveClass}`;
    };

    const NavigationLinks = ({isVertical}: { isVertical: boolean }) => (
        <div
            className={`flex items-center ${
                isVertical ? "flex-col" : ""
            }`}
        >
            <Link href="/" className={getLinkClassName("/", isVertical)}>
                Home
            </Link>
            <Link href="/about" className={getLinkClassName("/about", isVertical)}>
                About Us
            </Link>
            <Link href="/puppies" className={getLinkClassName("/puppies", isVertical)}>
                Puppies
            </Link>
            <Link href="/parents" className={getLinkClassName("/parents", isVertical)}>
                Parents
            </Link>
            <Link href="/contact" className={getLinkClassName("/contact", isVertical)}>
                Contact Us
            </Link>
        </div>
    );

    return (
        <div className="fixed w-full h-16 top-0 z-10 bg-dark-shades shadow-lg">
            <div className="container mx-auto h-full">
                <div className="flex h-full justify-center items-center text-white">
                    <Disclosure as="nav" className="w-full">
                        {({open}) => (
                            <>
                                <div className="flex justify-between">
                                    <Link href="/"
                                          className="text-xl font-bold px-4 h-16 flex items-center">{pageData?.companyInfo?.companyName}</Link>
                                    <div className="hidden lg:flex">
                                        <NavigationLinks isVertical={false}/>
                                    </div>
                                    <Disclosure.Button className="lg:hidden focus:outline-none px-4 h-16 flex items-center"
                                                       aria-label="Menu Toggle">
                                        {open ? <FiX size={24}/> : <FiMenu size={24}/>}
                                    </Disclosure.Button>
                                </div>
                                <Disclosure.Button className={`fixed top-0 right-0 w-full h-full z-20 backdrop-blur-sm backdrop-brightness-50 transform ${
                                    open ? "translate-x-0" : "translate-x-full"
                                } lg:hidden`} aria-label="Close Menu"/>
                                <div
                                    className={`fixed top-0 right-0 w-48 h-full bg-dark-shades z-30 transform ${
                                        open ? "translate-x-0 shadow-lg" : "translate-x-full"
                                    } transition-transform duration-300 ease-in-out lg:hidden`}
                                >
                                    <div className="flex-col">
                                        <div className="flex flex-col h-16 items-end justify-center">
                                            <Disclosure.Button className="text-white focus:outline-none px-4 w-full h-16 flex items-center justify-end"
                                                               aria-label="Close Menu">
                                                <FiX size={24}/>
                                            </Disclosure.Button>
                                        </div>
                                        <NavigationLinks isVertical={true}/>
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
