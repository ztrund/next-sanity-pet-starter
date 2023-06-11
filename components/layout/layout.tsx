import Head from "next/head";
import dynamic from "next/dynamic";
import React from "react";
import {PageData} from "../../types";

interface LayoutProps {
    children: React.ReactNode;
    pageTitle?: string;
    pageData: PageData;
    metaDesc?: string;
}

const Header = dynamic(() => import("./header/header"), {ssr: false});
const Footer = dynamic(() => import("./footer"), {ssr: false});

const Layout = ({
                    children,
                    pageTitle = "All In One Frenchie Enterprise",
                    metaDesc = "All In One Frenchie Enterprise is a small family-owned business that specializes in breeding and selling French Bulldogs.",
                    pageData,
                }: LayoutProps) => {
    const faviconUrls = pageData.companyInfo.faviconUrls;

    return (
        <div id="root" className="flex flex-col min-h-screen bg-light-accent">
            <Head>
                <title>{pageTitle}</title>
                {/*<link rel="manifest" href="/manifest.json"/>*/}
                <link rel="icon" href={faviconUrls.default}/>
                <link rel="icon" type="image/png" sizes="512x512"
                      href={faviconUrls.png512}/>
                <link rel="icon" type="image/png" sizes="192x192"
                      href={faviconUrls.png192}/>
                <link rel="icon" type="image/png" sizes="32x32"
                      href={faviconUrls.png32}/>
                <link rel="icon" type="image/png" sizes="16x16"
                      href={faviconUrls.png16}/>
                <link rel="apple-touch-icon" sizes="180x180"
                      href={faviconUrls.appleTouch}/>
                <meta
                    name="description"
                    content={metaDesc}
                />
                <meta name="theme-color" content="hsl(39, 76%, 52%)"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
            </Head>
            <Header pageData={pageData}/>
            <main className="container mx-auto p-4 flex-grow flex-shrink-0 mt-16">{children}</main>
            <Footer pageData={pageData}/>
        </div>
    );
};

export default Layout;
