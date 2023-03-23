import Head from "next/head";
import Header from "./header";

interface LayoutProps {
    children: React.ReactNode;
    pageTitle?: string;
}

const Layout = ({ children, pageTitle = "All In One Frenchies" }: LayoutProps) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Head>
                <title>{pageTitle}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <main className="container mx-auto px-4">{children}</main>
        </div>
    );
};

export default Layout;
