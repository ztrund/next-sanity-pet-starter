import {GetStaticProps} from "next";
import fetchPageData from "../lib/fetchPageData";
import {PageData} from "../types";
import Layout from "../components/layout/layout";

const OfflinePage = ({pageData}: { pageData: PageData }) => {

    return (
        <Layout pageTitle="Offline - Page Not Available"
                pageData={pageData}>
            <div
                className="flex flex-col gap-4 mx-auto p-2 bg-light-shades drop-shadow-lg rounded-lg w-fit text-center max-w-3xl">
                <h1 className="text-5xl font-bold">Offline</h1>
                <h2 className="text-2xl font-semibold">Page Not Available</h2>
                <p className="text-lg font-medium">Whoops! Our frenchies must have chewed through the internet cable.
                    You're currently offline and the page you're trying to view isn't available. Please check your
                    network connection and tell the frenchie to stop nibbling on the wires!</p>
            </div>
        </Layout>
    );
};

export const getStaticProps: GetStaticProps = async () => {

    const pageData = await fetchPageData();

    return {
        props: {
            pageData,
        },
    };
};

export default OfflinePage;
