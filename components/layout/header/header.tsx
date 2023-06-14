import {PageData} from "../../../types";
import {useEffect, useState} from "react";
import {CloseIcon, MenuIcon} from "../../svgIcons";
import NavLinks from "./navLinks";
import Link from "next/link";

const Header = ({pageData}: { pageData: PageData }) => {
    const [isOpen, setIsOpen] = useState(false);
    const {companyInfo} = pageData;
    const {companyName, companyLogo} = companyInfo;
    let companyLogoElement = <span>{companyName}</span>;

    if (companyLogo) {
        companyLogoElement = (
            <>
                <link rel="preload" as="image" href={companyLogo.imageUrl} imageSrcSet={companyLogo.srcSet}/>
                <img
                    src={companyLogo.imageUrl}
                    srcSet={companyLogo.srcSet}
                    alt={`${companyName} Logo`}
                    loading="eager"
                    width={companyLogo.width}
                    height={companyLogo.height}
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
        <div className="container mx-auto h-full">
            <div className="flex h-full justify-center items-center">
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
    );
};

export default Header;
