// components/Layout.tsx
import Head from "next/head";
import Header from "./header";
import Footer from "./footer";
import React from "react";
import {sanityImageUrl} from "../../lib/sanityImageUrl";

interface LayoutProps {
    children: React.ReactNode;
    pageTitle?: string;
    pageData?: any;
    metaDesc?: string;
}

const Layout = ({
                    children,
                    pageTitle = "All In One Frenchie Enterprise",
                    metaDesc = "All In One Frenchie Enterprise is a small family-owned business that specializes in breeding and selling French Bulldogs.",
                    pageData,
                }: LayoutProps) => {
    const favicon = pageData?.companyInfo?.favicon

    return (
        <div id="root" className="flex flex-col min-h-screen bg-light-accent">
            <Head>
                <title>{pageTitle}</title>
                {/*<link rel="manifest" href="/manifest.json"/>*/}
                <link rel="icon" href={sanityImageUrl(favicon, {w: 512, h: 512})}/>
                <link rel="icon" type="image/png" sizes="512x512"
                      href={sanityImageUrl(favicon, {w: 512, h: 512, fit: "fill", fm: "png", bg: "0000"})}/>
                <link rel="icon" type="image/png" sizes="192x192"
                      href={sanityImageUrl(favicon, {w: 192, h: 192, fit: "fill", fm: "png", bg: "0000"})}/>
                <link rel="icon" type="image/png" sizes="32x32"
                      href={sanityImageUrl(favicon, {w: 32, h: 32, fit: "fill", fm: "png", bg: "0000"})}/>
                <link rel="icon" type="image/png" sizes="16x16"
                      href={sanityImageUrl(favicon, {w: 16, h: 16, fit: "fill", fm: "png", bg: "0000"})}/>
                <link rel="apple-touch-icon" sizes="180x180"
                      href={sanityImageUrl(favicon, {w: 180, h: 180, fit: "fill", fm: "png", bg: "0000"})}/>
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
