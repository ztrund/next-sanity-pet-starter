import {GetStaticPaths, GetStaticProps} from 'next';
import sanityClient from '../../lib/sanityClient';
import fetchPageData, {FetchParams} from "../../lib/fetchPageData";
import {PageData, Parent} from "../../types";
import {sanitizeHTML} from "../../helpers/sanitizeHTML";
import dynamic from "next/dynamic";
import React from "react";
import Layout from "../../components/layout/layout";
import DogCard from "../../components/dogCard";

const CustomCarousel = dynamic(() => import("../../components/carousel/customCarousel"), {
    loading: () =>
        <>
            <div className="aspect-square"/>
            <div className="h-[136px]"/>
        </>,
    ssr: false
});
const FinancingContainer = dynamic(() => import("../../components/financing/financingContainer"), {
    loading: () => <div className="w-full h-32 md:h-16 bg-light-shades rounded-lg shadow-lg"/>,
    ssr: false
});
const FinancingBanner = dynamic(() => import("../../components/financing/financingBanner"), {ssr: false});

const Puppy = ({pageData, financingText}: { pageData: PageData, financingText: string }) => {
    const {puppy, financing, metaDescription} = pageData;

    return (
        <Layout pageTitle={puppy.name}
                metaDesc={metaDescription.description}
                pageData={pageData}>
            <div className="flex flex-col gap-4">
                {financing.displayOption == "container" &&
                    <FinancingContainer financing={financing} financingText={financingText}/>}
                <div className="flex justify-between items-center p-2 bg-light-shades shadow-lg rounded-lg">
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
                                <strong>Age:</strong> {puppy.age}
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
                        {financing.displayOption == "banner" && <FinancingBanner financing={financing}/>}
                        {puppy.parents?.filter((parent: Parent) => parent).length > 0 && (
                            <>
                                <div className="p-2 bg-light-shades drop-shadow-lg rounded-lg">
                                    <h2 className="text-2xl font-bold text-center">Meet Their Parents</h2>
                                </div>
                                <div className="flex flex-wrap gap-4">
                                    {puppy.parents?.filter((parent: Parent) => parent).map((parent: Parent) => (
                                        <DogCard dog={parent} cardWidth='w-full sm:w-[calc(50%-8px)]' key={parent._id}/>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
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
          'picture': mediaItems[type == "image"][0],
        },
        parents.father->{
          _id,
          name,
          gender,
          color,
          'picture': mediaItems[type == "image"][0],
        },
      ],
    },
    "financing": *[_type == "financing"][0]{
      banner,
      logo,
      link,
      text,
      'displayOption': displayOptionPuppy,
    },
    "metaDescription": *[_type == "metaDescriptions"][0]{
      'description': puppy,
    },
  `;

    const fetchParams: FetchParams = {
        name: Array.isArray(params?.name) ? params?.name[0] : params?.name,
    };

    const pageData = await fetchPageData(additionalQuery, fetchParams);

    const financingText = sanitizeHTML(pageData.financing?.text);

    return {
        props: {
            pageData,
            financingText,
        },
    };
};

export default Puppy;
