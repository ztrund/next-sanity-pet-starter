import {GetStaticProps, InferGetStaticPropsType} from 'next';
import {PortableText} from '@portabletext/react';
import sanityClient from '../lib/sanityClient';
import Layout from "../components/layout";

type AboutProps = {
    title: string;
    content: any[];
};

const About = ({title, content}: InferGetStaticPropsType<typeof getStaticProps>) => {
    return (
        <Layout pageTitle="About Us">
            <div className="container p-2 rounded-lg drop-shadow-lg bg-light-shades">
                <h1 className="text-3xl font-bold">{title}</h1>
                <PortableText value={content}/>
            </div>
        </Layout>
    );
};

export const getStaticProps: GetStaticProps<AboutProps> = async () => {
    const about = await sanityClient.fetch(`
    *[_type == "about"][0] {
      title,
      content
    }
  `);

    return {
        props: {
            title: about.title,
            content: about.content,
        },
        revalidate: 60,
    };
};

export default About;
