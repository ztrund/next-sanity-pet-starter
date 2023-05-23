import Layout from '../components/layout';
import {GetStaticProps, InferGetStaticPropsType} from "next";
import fetchPageData from "../lib/fetchPageData";

const ContactPage = ({pageData}: InferGetStaticPropsType<typeof getStaticProps>) => {

    return (
        <Layout pageTitle="404"
                pageData={pageData}>
            <div className="flex flex-col gap-4 mx-auto p-2 bg-light-shades drop-shadow-lg rounded-lg w-fit text-center max-w-3xl">
                <h1 className="text-5xl font-bold">404</h1>
                <h2 className="text-2xl font-semibold">Page Not Found</h2>
                <p className="text-lg font-medium">Whoops! It seems like one of our frenchies buried this page in the backyard. We're on a mission to dig it up!</p>
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

export default ContactPage;
