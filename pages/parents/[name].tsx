import {GetStaticPaths, GetStaticProps} from 'next';
import {getAge} from "../../helpers/getAge";
import fetchPageData, {FetchParams} from "../../lib/fetchPageData";
import {PageData, Puppy} from "../../types";
import sanityClient from "../../lib/sanityClient";
import React, {useState} from "react";
import {sanitizeHTML} from "../../helpers/sanitizeHTML";
import useWindowSize from "../../helpers/useWindowSize";
import {Pagination} from "../../components/pagination";
import {replaceTemplateLiterals} from "../../helpers/replaceTemplateLiterals";
import dynamic from "next/dynamic";
import Layout from "../../components/layout/layout";

// const Layout = dynamic(() => import("../../components/layout/layout"), {ssr: false});
const CustomCarousel = dynamic(() => import("../../components/carousel/customCarousel"), {
    loading: () =>
        <>
            <div className="aspect-square"/>
            <div className="h-[136px]"/>
        </>,
    ssr: false
});
const FinancingContainer = dynamic(() => import("../../components/financing/financingContainer"), {
    loading: () => <div className="w-full h-32 md:h-16"/>,
    ssr: false
});
const FinancingBanner = dynamic(() => import("../../components/financing/financingBanner"), {
    ssr: false
});

const Parent = ({pageData, financingText}: { pageData: PageData, financingText: string }) => {
    const {parent, financing, metaDescription} = pageData;
    const DogCard = dynamic(() => import("../../components/dogCard"), {
        loading: () =>
            <div
                className={`bg-light-shades rounded-lg shadow-lg w-full sm:w-[calc(50%-8px)] ${financing.displayOption == "banner" && "lg:w-[calc(100%/3-10.66px)] xl:w-[calc(25%-12px)]"}`}>
                <div className="aspect-video"/>
                <div className="h-24"/>
            </div>,
        ssr: false
    });
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

    const {years, weeks, days} = getAge(parent.birthdate);

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
                metaDesc={replaceTemplateLiterals(metaDescription.description, parent)}
                pageData={pageData}>
            <div className="flex flex-col gap-4">
                {financing.displayOption == "container" &&
                    <FinancingContainer financing={financing} financingText={financingText}/>}
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
                                <strong>Age:</strong> {years > 0 && `${years} ${years === 1 ? 'year' : 'years'},`} {weeks} {weeks === 1 ? 'week' : 'weeks'} and {days} {days === 1 ? 'day' : 'days'} old
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

    const financingText = sanitizeHTML(pageData.financing?.text);

    return {
        props: {
            pageData,
            financingText,
        },
    };
};

export default Parent;
