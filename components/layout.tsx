// components/Layout.tsx
import Head from "next/head";
import Header from "./header";
import Footer from "./footer";
import useSiteInfo from "../hooks/useSiteInfo";

interface LayoutProps {
    children: React.ReactNode;
    pageTitle?: string;
}

const Layout = ({ children, pageTitle = "All In One Frenchies" }: LayoutProps) => {
    const siteInfo = useSiteInfo();

    return (
        <div className="flex flex-col min-h-screen bg-light-accent">
            <Head>
                <title>{pageTitle}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header siteInfo={siteInfo} />
            <main className="container mx-auto p-4 flex-grow flex-shrink-0">{children}</main>
            <Footer siteInfo={siteInfo} />
        </div>
    );
};

export default Layout;
