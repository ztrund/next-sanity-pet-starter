import React, {useMemo, useState} from 'react';
import {GetStaticProps, InferGetStaticPropsType} from 'next';
import Layout from '../components/layout/layout';
import fetchPageData from "../lib/fetchPageData";
import DogCard from "../components/dogCard";
import NameFilter from "../components/filters/nameFilter";
import GenderFilter from "../components/filters/genderFilter";
import ColorFilter from "../components/filters/colorFilter";
import {Parent} from "../types";
import {handleCheckboxChange} from "../helpers/handleCheckboxChange";

const Parents = ({pageData}: InferGetStaticPropsType<typeof getStaticProps>) => {
    const {parents, metaDescription} = pageData;
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
                            className="lg:hidden flex flex-row justify-center items-center h-full px-4 border-l rounded-r-lg bg-main-brand-color text-light-shades focus:outline-none focus:ring-2 focus:ring-inset focus:ring-dark-accent"
                            aria-label={isFiltersOpen ? "Close filters" : "Open filters"}
                        >
                            {isFiltersOpen ? <img src="/images/x.svg" alt="Close" /> : <img src="/images/filter.svg" alt="Filter" />}
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
                                        cardWidth={"w-full sm:w-[18.50rem] md:w-[22.5rem] lg:w-[24.97rem] xl:w-[21.53rem] 2xl:w-[19.84rem]"}
                                        key={parent._id}
                                        lazy={index !== 0}
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
      mediaItems,
    },
    "metaDescription": *[_type == "metaDescriptions"][0]{
      'description': parents,
    },
  `;

    const pageData = await fetchPageData(additionalQuery);

    return {
        props: {
            pageData,
        },
    };
};

export default Parents;
