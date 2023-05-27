import {GetStaticPaths, GetStaticProps, InferGetStaticPropsType} from 'next';
import Layout from '../../components/layout/layout';
import CustomCarousel from "../../components/customCarousel";
import {getAge} from "../../helpers/getAge";
import fetchPageData, {FetchParams} from "../../lib/fetchPageData";
import {Puppy} from "../../types";
import DogCard from "../../components/dogCard";
import sanityClient from "../../lib/sanityClient";
import FinancingBanner from "../../components/financing/financingBanner";

const Parent = ({pageData}: InferGetStaticPropsType<typeof getStaticProps>) => {
    const {parent, financing, metaDescription} = pageData;

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
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="w-full lg:w-1/2 h-min p-0 bg-light-shades drop-shadow-lg rounded-lg overflow-hidden">
                    <CustomCarousel mediaItems={parent.mediaItems}/>
                </div>
                <div className="w-full lg:w-1/2 flex flex-col gap-4">
                    <div className="p-2 bg-light-shades drop-shadow-lg rounded-lg">
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
                    <FinancingBanner financing={financing}/>
                </div>
            </div>
            {parent.puppies?.length > 0 && (
                <div className="flex flex-col gap-4 mt-4">
                    <div className="p-2 bg-light-shades drop-shadow-lg rounded-lg">
                        <h2 className="text-2xl font-bold text-center">Meet Their Puppies</h2>
                    </div>
                    <div className="flex flex-wrap justify-center gap-4">
                        {parent.puppies?.map((puppy: Puppy) => (
                            <DogCard dog={puppy} key={puppy._id} showPrice={true}
                                     cardWidth={"w-full md:w-[22.5rem] lg:w-[20rem] xl:w-[18.75rem] 2xl:w-[22.75rem]"}/>
                        ))}
                    </div>
                </div>
            )}
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
      "puppies": *[_type == "puppies" && references(^._id)] | order(name) {
        _id,
        name,
        gender,
        color,
        mediaItems,
        availability,
        price,
      },
    },
    "financing": *[_type == "financing"][0]{
      banner,
      link,
    },
    "metaDescription": *[_type == "metaDescriptions"][0]{
      'description': parent,
    },
  `;

    const fetchParams: FetchParams = {
        name: Array.isArray(params?.name) ? params?.name[0] : params?.name,
    };

    const pageData = await fetchPageData(additionalQuery, fetchParams);

    return {
        props: {
            pageData,
        },
    };
};

export default Parent;
