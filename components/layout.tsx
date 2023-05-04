// components/Layout.tsx
import Head from "next/head";
import Header from "./header";
import Footer from "./footer";

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
    return (
        <div className="flex flex-col min-h-screen bg-light-accent">
            <Head>
                <title>{pageTitle}</title>
                <link rel="icon" href="/favicon.ico"/>
                <meta
                    name="description"
                    content={metaDesc}
                />
            </Head>
            <Header pageData={pageData}/>
            <main className="container mx-auto p-4 flex-grow flex-shrink-0">{children}</main>
            <Footer pageData={pageData}/>
        </div>
    );
};

export default Layout;
