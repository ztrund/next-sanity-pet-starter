import {GetStaticPaths, GetStaticProps, InferGetStaticPropsType} from 'next';
import sanityClient from '../../lib/sanityClient';
import Layout from '../../components/layout/layout';
import CustomCarousel from "../../components/customCarousel";
import {getAge} from "../../helpers/getAge";
import fetchPageData, {FetchParams} from "../../lib/fetchPageData";
import DogCard from "../../components/dogCard";
import {Parent} from "../../types";
import FinancingBanner from "../../components/financing/financingBanner";

const Puppy = ({pageData}: InferGetStaticPropsType<typeof getStaticProps>) => {
    const {puppy, financing, metaDescription} = pageData;

    const {years, weeks, days} = getAge(puppy.birthdate);

    const replaceTemplateLiterals = (description: string, data: { [x: string]: any; }) => {
        return description.replace(/\$\{(\w+)}/g, (_, key) => data[key]);
    };

    return (
        <Layout pageTitle={puppy.name}
                metaDesc={replaceTemplateLiterals(metaDescription.description, puppy)}
                pageData={pageData}>
            <div className="flex justify-between items-center p-2 mb-4 bg-light-shades shadow-lg rounded-lg">
                <h1 className="text-3xl font-bold">{puppy.name}</h1>
                <h1 className="text-2xl font-normal">{puppy.availability} - ${puppy.price}</h1>
            </div>
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="w-full lg:w-1/2 h-min p-0 bg-light-shades shadow-lg rounded-lg overflow-hidden">
                    <CustomCarousel mediaItems={puppy.mediaItems}/>
                </div>
                <div className="w-full lg:w-1/2 flex flex-col gap-4">
                    <div className="h-min p-2 bg-light-shades shadow-lg rounded-lg">
                        <p>
                            <strong>Age:</strong> {years > 0 ? `${years} ${years === 1 ? 'year' : 'years'},` : ''} {weeks} {weeks === 1 ? 'week' : 'weeks'} and {days} {days === 1 ? 'day' : 'days'} old
                        </p>
                        <p>
                            <strong>Gender:</strong> {puppy.gender}
                        </p>
                        <p>
                            <strong>Color:</strong> {puppy.color}
                        </p>
                        <p>
                            <strong>Weight:</strong> {puppy.weight} lbs
                        </p>
                        <p>
                            <strong>Description:</strong> {puppy.description}
                        </p>
                    </div>
                    <FinancingBanner financing={financing}/>
                    {puppy.parents?.filter((parent: Parent) => parent).length > 0 && (
                        <>
                            <div className="p-2 bg-light-shades drop-shadow-lg rounded-lg">
                                <h2 className="text-2xl font-bold text-center">Meet Their Parents</h2>
                            </div>
                            <div className="flex flex-wrap gap-4">
                                {puppy.parents?.filter((parent: Parent) => parent).map((parent: Parent) => (
                                    <DogCard dog={parent} key={parent._id}/>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const puppies = await sanityClient.fetch(`*[_type == "puppies"]{ name }`);
    const paths = puppies.map((puppy: { name: string }) => ({
        params: {name: puppy.name.toLowerCase()},
    }));

    return {paths, fallback: false};
};

export const getStaticProps: GetStaticProps = async ({params}) => {
    const additionalQuery = `
    "puppy": *[_type == "puppies" && name match $name][0]{
      name,
      birthdate,
      gender,
      color,
      weight,
      description,
      mediaItems,
      availability,
      price,
      "parents": [
        parents.mother->{
          _id,
          name,
          gender,
          color,
          mediaItems,
        },
        parents.father->{
          _id,
          name,
          gender,
          color,
          mediaItems,
        },
      ],
    },
    "financing": *[_type == "financing"][0]{
      banner,
      link,
    },
    "metaDescription": *[_type == "metaDescriptions"][0]{
      'description': puppy,
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

export default Puppy;
