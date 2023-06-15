import React, {useMemo, useState} from 'react';
import {GetStaticProps} from 'next';
import fetchPageData from "../lib/fetchPageData";
import NameFilter from "../components/filters/nameFilter";
import GenderFilter from "../components/filters/genderFilter";
import ColorFilter from "../components/filters/colorFilter";
import {PageData, Parent} from "../types";
import {handleCheckboxChange} from "../helpers/handleCheckboxChange";
import Layout from "../components/layout/layout";
import {FilterOrCloseIcon} from "../components/svgIcons";
import DogCard from "../components/dogCard";
import FinancingContainer from "../components/financing/financingContainer";

const Parents = ({pageData}: { pageData: PageData }) => {
    const {parents, metaDescription, financing} = pageData;
    const uniqueColors = Array.from(new Set<string>(parents.map((parent: Parent) => parent.color)));

    const [isFiltersOpen, setIsFiltersOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [genderFilter, setGenderFilter] = useState<string[]>(['']);
    const [colorFilter, setColorFilter] = useState<string[]>(['']);

    const sortedAndFilteredParents = useMemo(() => {
        return [...parents]
            .filter((parent: Parent) => {
                const matchesSearchTerm = parent.name.toLowerCase().includes(searchTerm.toLowerCase());
                const matchesGender = genderFilter.includes('') || genderFilter.includes(parent.gender);
                const matchesColor = colorFilter.includes('') || colorFilter.includes(parent.color);

                return (
                    matchesSearchTerm && matchesGender && matchesColor
                );
            });
    }, [parents, searchTerm, genderFilter, colorFilter]);

    return (
        <Layout pageTitle="Parents"
                metaDesc={metaDescription.description}
                pageData={pageData}>
            <div className="flex flex-col gap-4">
                {financing.displayOption == "container" &&
                    <FinancingContainer financing={financing}/>}
                <div className="flex flex-row gap-4">
                    <div
                        className={`hidden lg:flex justify-center flex-col w-48 h-min gap-2 divide-black divide-y bg-light-shades shadow-lg rounded-lg p-2 overflow-hidden`}>
                        <NameFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} id="Desktop"/>
                        <GenderFilter filter={genderFilter} setFilter={setGenderFilter}
                                      handleCheckboxChange={handleCheckboxChange} id="Desktop"/>
                        <ColorFilter filter={colorFilter} setFilter={setColorFilter}
                                     handleCheckboxChange={handleCheckboxChange}
                                     uniqueColors={uniqueColors} id="Desktop"/>
                    </div>
                    <div className="flex flex-col w-full gap-4">
                        <div
                            className="flex h-12 justify-between lg:justify-center items-center bg-light-shades shadow-lg rounded-lg overflow-hidden">
                            <h1 className="text-3xl font-bold px-2">Parents</h1>
                            <button
                                onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                                className="lg:hidden flex flex-row justify-center items-center h-full px-4 border-l rounded-r-lg bg-main-brand-color text-light-shades focus:outline-none focus:ring-2 focus:ring-inset focus:ring-dark-accent stroke-white hover:stroke-dark-accent"
                                aria-label={isFiltersOpen ? "Close filters" : "Open filters"}
                            >
                                <FilterOrCloseIcon isOpen={isFiltersOpen}/>
                            </button>
                        </div>
                        <div
                            className={`${isFiltersOpen ? "flex" : "hidden"} lg:hidden justify-center flex-col w-full h-min bg-light-shades shadow-lg rounded-lg p-2 overflow-clip`}>
                            <div className="flex flex-col md:flex-row">
                                <div className="md:w-1/2 pb-2 md:pr-2">
                                    <NameFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm}
                                                id="Mobile"/>
                                </div>
                                <div className="border-t border-l border-black"/>
                                <div className="md:w-1/2 pb-2 md:pl-2">
                                    <GenderFilter filter={genderFilter} setFilter={setGenderFilter}
                                                  handleCheckboxChange={handleCheckboxChange}
                                                  id="Mobile" gridStyle="grid-cols-3 text-center"/>
                                </div>
                            </div>
                            <div className="border-t border-l border-black"/>
                            <div className="w-full">
                                <ColorFilter filter={colorFilter} setFilter={setColorFilter}
                                             handleCheckboxChange={handleCheckboxChange}
                                             uniqueColors={uniqueColors} id="Mobile"
                                             gridStyle="grid-cols-3 md:grid-cols-6 text-center"/>
                            </div>
                        </div>
                        <div className="flex flex-wrap justify-center gap-4">
                            {
                                sortedAndFilteredParents.length > 0 ? (
                                    sortedAndFilteredParents.map((parent: Parent, index: number) => (
                                        <DogCard
                                            dog={parent}
                                            showPrice={false}
                                            cardWidth={"w-full sm:w-[calc(50%-8px)] xl:w-[calc(100%/3-10.66px)] 2xl:w-[calc(25%-12px)]"}
                                            imageSizes={"(max-width: 639px) calc(100vw-32px), (max-width: 767px) 296px, (max-width: 1023px) 360px, (max-width: 1279px) 399px, (max-width: 1535px) 344px, 317px"}
                                            key={parent._id}
                                            lazy={index > 1}
                                        />
                                    ))
                                ) : (
                                    <div
                                        className="h-auto w-auto bg-light-shades rounded-lg text-xl p-2">
                                        No parents found :(
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const additionalQuery = `
    "parents": *[_type == "parents"] | order(name) {
      _id,
      name,
      gender,
      color,
      'picture': mediaItems[type == "image"][0],
    },
    "metaDescription": *[_type == "metaDescriptions"][0]{
      'description': parents,
    },
    "financing": *[_type == "financing"][0]{
      logo,
      link,
      text,
      'displayOption': displayOptionParents,
    },
  `;

    const pageData = await fetchPageData(additionalQuery);

    return {
        props: {
            pageData
        },
    };
};

export default Parents;
