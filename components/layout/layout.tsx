// components/Layout.tsx
import Head from "next/head";
import Header from "./header";
import Footer from "./footer";
import React from "react";
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../../lib/sanityClient";

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
    const imageBuilder = imageUrlBuilder(sanityClient);
    const favicon = pageData?.companyInfo?.favicon

    return (
        <div id="root" className="flex flex-col min-h-screen bg-light-accent">
            <Head>
                <title>{pageTitle}</title>
                <link rel="icon" href={imageBuilder.image(favicon).width(512).height(512).url()}/>
                <link rel="icon" type="image/png" sizes="512x512"
                      href={imageBuilder.image(favicon).width(512).height(512).format("png").url()}/>
                <link rel="icon" type="image/png" sizes="192x192"
                      href={imageBuilder.image(favicon).width(192).height(192).format("png").url()}/>
                <link rel="icon" type="image/png" sizes="32x32"
                      href={imageBuilder.image(favicon).width(32).height(32).format("png").url()}/>
                <link rel="icon" type="image/png" sizes="16x16"
                      href={imageBuilder.image(favicon).width(16).height(16).format("png").url()}/>
                <link rel="apple-touch-icon" sizes="180x180"
                      href={imageBuilder.image(favicon).width(180).height(180).format("png").url()}/>
                <meta
                    name="description"
                    content={metaDesc}
                />
            </Head>
            <Header pageData={pageData}/>
            <main className="container mx-auto p-4 flex-grow flex-shrink-0 mt-16">{children}</main>
            <Footer pageData={pageData}/>
        </div>
    );
};

export default Layout;
