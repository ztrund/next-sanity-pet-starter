// components/Layout.tsx
import Head from "next/head";
import Header from "./header";
import Footer from "./footer";

interface LayoutProps {
    children: React.ReactNode;
    pageTitle?: string;
    pageData?: any;
}

const Layout = ({children, pageTitle = "All In One Frenchies", pageData}: LayoutProps) => {
    return (
        <div className="flex flex-col min-h-screen bg-light-accent">
            <Head>
                <title>{pageTitle}</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <Header pageData={pageData}/>
            <main className="container mx-auto p-4 flex-grow flex-shrink-0">{children}</main>
            <Footer pageData={pageData}/>
        </div>
    );
};

export default Layout;
