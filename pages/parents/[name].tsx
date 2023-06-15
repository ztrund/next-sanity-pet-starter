import {GetStaticPaths, GetStaticProps} from 'next';
import fetchPageData from "../../lib/fetchPageData";
import {FetchParams, PageData, Puppy} from "../../types";
import React, {useState} from "react";
import useWindowSize from "../../helpers/useWindowSize";
import {Pagination} from "../../components/pagination";
import Layout from "../../components/layout/layout";
import DogCard from "../../components/dogCard";
import FinancingContainer from "../../components/financing/financingContainer";
import FinancingBanner from "../../components/financing/financingBanner";
import CustomCarousel from "../../components/carousel/customCarousel";
import fetchPagePaths from "../../lib/fetchPagePaths";

const Parent = ({pageData}: { pageData: PageData }) => {
    const {parent, financing, metaDescription} = pageData;
    const windowSize = useWindowSize();

    let puppiesPerPage;  // Set the number of puppies to display per page
    if (windowSize.width && windowSize.width < 640) {
        puppiesPerPage = 2;
    } else if (financing.displayOption == "banner" && windowSize.width && windowSize.width >= 1280) {
        puppiesPerPage = 8;
    } else if (financing.displayOption == "banner" && windowSize.width && windowSize.width >= 1024) {
        puppiesPerPage = 6;
    } else {
        puppiesPerPage = 4;
    }
    const pages = Math.ceil(parent.puppies?.length / puppiesPerPage);
    const [currentPage, setCurrentPage] = useState(1);

    const meetTheirPuppies = (
        <div className="flex flex-col gap-4">
            <div className="p-2 bg-light-shades shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold text-center">Meet Their Puppies</h2>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
                {parent.puppies?.slice((currentPage - 1) * puppiesPerPage, currentPage * puppiesPerPage).map((puppy: Puppy) => (
                    <DogCard
                        dog={puppy}
                        key={puppy._id}
                        showPrice={true}
                        cardWidth={`w-full sm:w-[calc(50%-8px)] ${financing.displayOption == "banner" && "lg:w-[calc(100%/3-10.66px)] xl:w-[calc(25%-12px)]"}`}
                        imageSizes={`(max-width: 639px) calc(100vw-32px), (max-width: 767px) 296px, (max-width: 1023px) 360px, (max-width: 1279px) ${financing.displayOption == "banner" ? "320px" : "276px"}, (max-width: 1535px) 300px, 364px`}
                    />
                ))}
            </div>
            {pages > 1 && <Pagination
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={pages}/>}
        </div>
    );

    return (
        <Layout pageTitle={parent.name}
                metaDesc={metaDescription.description}
                pageData={pageData}>
            <div className="flex flex-col gap-4">
                {financing.displayOption == "container" &&
                    <FinancingContainer financing={financing}/>}
                <div className="flex justify-between items-center p-2 bg-light-shades shadow-lg rounded-lg">
                    <h1 className="text-3xl font-bold">{parent.name}</h1>
                </div>
                <div className="flex flex-col lg:flex-row gap-4">
                    <div
                        className={`w-full ${financing.displayOption == "banner" ? "lg:w-1/2" : "lg:w-5/12 xl:w-1/2"} h-min p-0 bg-light-shades drop-shadow-lg rounded-lg overflow-hidden`}>
                        <CustomCarousel mediaItems={parent.mediaItems}/>
                    </div>
                    <div className="w-full lg:w-7/12 xl:w-1/2 flex flex-col gap-4">
                        <div className="p-2 bg-light-shades drop-shadow-lg rounded-lg">
                            <p>
                                <strong>Gender:</strong> {parent.gender}
                            </p>
                            <p>
                                <strong>Color:</strong> {parent.color}
                            </p>
                            {parent.birthdate && (
                                <p>
                                    <strong>Age:</strong> {parent.age}
                                </p>
                            )}
                            {parent.weight && (
                                <p>
                                    <strong>Weight:</strong> {parent.weight} lbs
                                </p>
                            )}
                            {parent.description && (
                                <p>
                                    <strong>Description:</strong> {parent.description}
                                </p>
                            )}
                        </div>
                        {financing.displayOption == "banner" && <FinancingBanner financing={financing}/>}
                        {parent.puppies?.length > 0 && financing.displayOption != "banner" && (meetTheirPuppies)}
                    </div>
                </div>
                {parent.puppies?.length > 0 && financing.displayOption == "banner" && (meetTheirPuppies)}
            </div>
        </Layout>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = await fetchPagePaths(`*[_type == "parents"]{ name }`);
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
        'picture': mediaItems[type == "image"][0],
        availability,
        price,
      },
    },
    "financing": *[_type == "financing"][0]{
      banner,
      logo,
      link,
      text,
      'displayOption': displayOptionParent,
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
            pageData
        },
    };
};

export default Parent;
