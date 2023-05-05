import {GetStaticPaths, GetStaticProps, InferGetStaticPropsType} from 'next';
import sanityClient from '../../lib/sanityClient';
import Layout from '../../components/layout';
import CustomCarousel from "../../components/customCarousel";
import {getAge} from "../../helpers/getAge";
import fetchPageData from "../../lib/fetchPageData";

const Parent = ({pageData}: InferGetStaticPropsType<typeof getStaticProps>) => {
    const {parent, metaDescription} = pageData;

    const {years, weeks, days} = getAge(parent.birthdate);

    const replaceTemplateLiterals = (description: string, data: { [x: string]: any; }) => {
        return description.replace(/\$\{(\w+)}/g, (_, key) => data[key]);
    };

    return (
        <Layout pageTitle={parent.name}
                metaDesc={replaceTemplateLiterals(metaDescription.description, parent)}
                pageData={pageData}>
            <div className="flex justify-between items-center p-2 mb-4 bg-light-shades shadow-lg rounded-lg">
                <h1 className="text-3xl font-bold">{parent.name}</h1>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-1/2 h-min p-0 bg-light-shades drop-shadow-lg rounded-lg overflow-hidden">
                    <CustomCarousel mediaItems={parent.mediaItems}/>
                </div>
                <div className="w-full md:w-1/2 h-min p-2 bg-light-shades drop-shadow-lg rounded-lg">
                    <p>
                        <strong>Age:</strong> {years > 0 ? `${years} ${years === 1 ? 'year' : 'years'},` : ''} {weeks} {weeks === 1 ? 'week' : 'weeks'} and {days} {days === 1 ? 'day' : 'days'} old
                    </p>
                    <p>
                        <strong>Gender:</strong> {parent.gender}
                    </p>
                    <p>
                        <strong>Color:</strong> {parent.color}
                    </p>
                    <p>
                        <strong>Weight:</strong> {parent.weight} lbs
                    </p>
                    <p>
                        <strong>Description:</strong> {parent.description}
                    </p>
                </div>
            </div>
        </Layout>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const parents = await sanityClient.fetch(`*[_type == "parents"]{ name }`);
    const paths = parents.map((parent: { name: string }) => ({
        params: {name: parent.name.toLowerCase()},
    }));

    return {paths, fallback: false};
};

export const getStaticProps: GetStaticProps = async ({params}) => {
    const additionalQuery = `
    "parent": *[_type == "parents" && name match $name][0]{
      name,
      birthdate,
      gender,
      color,
      weight,
      description,
      mediaItems,
    },
    "metaDescription": *[_type == "metaDescriptions"][0]{
      'description': parent,
    },
  `;

    const fetchParams = {name: params?.name};

    const pageData = await fetchPageData(additionalQuery, fetchParams);

    return {
        props: {
            pageData,
        },
        revalidate: 60,
    };
};

export default Parent;
