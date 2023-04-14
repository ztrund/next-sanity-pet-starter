import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Disclosure } from "@headlessui/react";
import { FiMenu, FiX } from "react-icons/fi";

const Header = () => {
    const router = useRouter();

    const getLinkClassName = (href: string) => {
        const isActive = router.pathname === href;
        const baseClass = "hover:drop-shadow-lg focus:outline-none";
        const activeClass = "text-main-brand-color";
        const inactiveClass = "text-gray-100 hover:text-white";

        return `${baseClass} ${isActive ? activeClass : inactiveClass}`;
    };

    const NavigationLinks = ({ isVertical }: { isVertical: boolean }) => (
        <div className={`flex ${isVertical ? "flex-col" : "space-x-4"}`}>
            <Link href="/" className={getLinkClassName("/")}>
                Home
            </Link>
            <Link href="/about" className={getLinkClassName("/about")}>
                About Us
            </Link>
            <Link href="/puppies" className={getLinkClassName("/puppies")}>
                Puppies
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
                                    <div className="text-xl font-bold">All In One Frenchies</div>
                                    <div className="hidden lg:flex">
                                        <NavigationLinks isVertical={false} />
                                    </div>
                                    <Disclosure.Button className="lg:hidden focus:outline-none">
                                        {open ? <FiX size={24} /> : <FiMenu size={24} />}
                                    </Disclosure.Button>
                                </div>
                                {open && (
                                    <div className="lg:hidden">
                                        <NavigationLinks isVertical={true} />
                                    </div>
                                )}
                            </>
                        )}
                    </Disclosure>
                </header>
            </div>
        </div>
    );
};

export default Header;
