import Link from "next/link";
import {useRouter} from "next/router";
import {SiteInfo} from "../../types";
import {sanityImageUrl} from "../../lib/sanityImageUrl";
import React, {useEffect, useState} from "react";
import {imageDimensionExtractor} from "../../helpers/imageDimensionExtractor";

interface HeaderProps {
    pageData?: SiteInfo;
}

const Header = ({pageData}: HeaderProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const {companyInfo} = pageData || {};
    const {companyName, companyLogo} = companyInfo || {};
    let companyLogoElement = <span>{companyName}</span>;

    if (companyLogo) {
        const DPR_VALUES = [1, 1.5, 2];
        const imageUrlParams = {
            h: 64,
            auto: 'format',
            q: 75,
            fit: 'min'
        };
        const imageUrl = sanityImageUrl(companyLogo, {...imageUrlParams, dpr: 1});
        const srcSet = DPR_VALUES.map(dpr => `${sanityImageUrl(companyLogo, {
            ...imageUrlParams,
            dpr
        })} ${dpr}x`).join(', ');

        const altText = `${companyName} Logo`;
        const imgDimensions = imageDimensionExtractor(companyLogo.asset._ref);
        const adjustedWidth = imgDimensions.width / imgDimensions.height * 64;

        companyLogoElement = (
            <>
                <link rel="preload" as="image" href={imageUrl} imageSrcSet={srcSet}/>
                <img
                    src={imageUrl}
                    srcSet={srcSet}
                    alt={altText}
                    loading="eager"
                    width={adjustedWidth}
                    height="64"
                />
            </>
        );
    }

    const getLinkClassName = (href: string, isVertical: boolean) => {
        const isActive = router.pathname === href;
        const baseClass = `hover:text-dark-accent focus:outline-none h-16 flex items-center ${isVertical ? "px-4 w-full text-end justify-end" : "px-2"}`;
        const activeClass = "text-main-brand-color";
        const inactiveClass = "text-gray-100";

        return `${baseClass} ${isActive ? activeClass : inactiveClass}`;
    };

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add("overflow-hidden", "lg:overflow-auto");
        } else {
            document.body.classList.remove("overflow-hidden", "lg:overflow-auto");
        }
    }, [isOpen]);

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
                    <div className="w-full">
                        <div className="flex justify-between">
                            <Link href="/"
                                  className="text-xl font-bold px-4 h-16 flex items-center">
                                {companyLogoElement}
                            </Link>
                            <div className="hidden lg:flex">
                                <NavigationLinks isVertical={false}/>
                            </div>
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="lg:hidden focus:outline-none px-4 h-16 flex items-center"
                                aria-label="Menu Toggle">
                                {isOpen ? <img src="/images/x.svg" width="24" height="24" alt="Close Menu"/> :
                                    <img src="/images/menu.svg" width="24" height="24" alt="Open Menu"/>}
                            </button>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className={`fixed top-0 right-0 w-full h-full z-[90] backdrop-blur-sm backdrop-brightness-50 transform ${
                                isOpen ? "translate-x-0" : "translate-x-full"
                            } lg:hidden`} aria-label="Close Menu"/>
                        <div
                            className={`fixed top-0 right-0 w-48 h-full bg-dark-shades z-[100] transform ${
                                isOpen ? "translate-x-0 shadow-lg" : "translate-x-full"
                            } transition-transform duration-300 ease-in-out lg:hidden`}
                        >
                            <div className="flex-col">
                                <div className="flex flex-col h-16 items-end justify-center">
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="text-white focus:outline-none px-4 w-full h-16 flex items-center justify-end"
                                        aria-label="Close Menu">
                                        <img src="/images/x.svg" width="24" height="24" alt="Close Menu"/>
                                    </button>
                                </div>
                                <NavigationLinks isVertical={true}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
