import Link from "next/link";
import {PageData} from "../../../types";
import {useEffect, useState} from "react";
import {imageDimensionExtractor} from "../../../helpers/imageDimensionExtractor";
import dynamic from "next/dynamic";

const MenuIcon = dynamic(() => import('../../svgIcons').then(mod => mod.MenuIcon), {ssr: false});
const CloseIcon = dynamic(() => import('../../svgIcons').then(mod => mod.CloseIcon), {ssr: false});
const NavLinks = dynamic(() => import('./navLinks'), {ssr: false});

const Header = ({pageData}: { pageData: PageData }) => {
    const [isOpen, setIsOpen] = useState(false);
    const {companyInfo} = pageData;
    const {companyName, companyLogo} = companyInfo;
    let companyLogoElement = <span>{companyName}</span>;

    if (companyLogo) {
        const imageUrl = companyLogo.imageUrl;
        const srcSet = companyLogo.srcSet;

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

    useEffect(() => {
        if (isOpen) {
            document.body.classList.add("overflow-hidden", "lg:overflow-auto");
        } else {
            document.body.classList.remove("overflow-hidden", "lg:overflow-auto");
        }
    }, [isOpen]);

    return (
        <div className="fixed w-full h-16 top-0 z-10 bg-dark-shades shadow-lg">
            <div className="container mx-auto h-full">
                <div className="flex h-full justify-center items-center text-white">
                    <div className="w-full">
                        <div className="flex justify-between">
                            <Link href="/"
                                  className="text-xl font-bold px-4 h-16 flex items-center hover:text-dark-accent">
                                {companyLogoElement}
                            </Link>
                            <div className="hidden lg:flex">
                                <NavLinks isVertical={false}/>
                            </div>
                            <button
                                onClick={() => setIsOpen(true)}
                                className="lg:hidden focus:outline-none px-4 h-16 flex items-center stroke-white hover:stroke-dark-accent"
                                aria-label="Menu Toggle">
                                <MenuIcon/>
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
                                        className="text-white focus:outline-none px-4 w-full h-16 flex items-center justify-end stroke-white hover:stroke-dark-accent"
                                        aria-label="Close Menu">
                                        <CloseIcon/>
                                    </button>
                                </div>
                                <NavLinks isVertical={true}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
