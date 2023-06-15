import React, {useMemo, useState} from 'react';
import {GetStaticProps} from 'next';
import {PageData, Puppy} from "../types";
import fetchPageData from "../lib/fetchPageData";
import GenderFilter from "../components/filters/genderFilter";
import AvailabilityFilter from "../components/filters/availabilityFilter";
import ColorFilter from "../components/filters/colorFilter";
import PriceFilter from "../components/filters/priceFilter";
import SortFilter from "../components/filters/sortFilter";
import NameFilter from "../components/filters/nameFilter";
import {handleCheckboxChange} from "../helpers/handleCheckboxChange";
import Layout from "../components/layout/layout";
import {FilterOrCloseIcon} from "../components/svgIcons";
import DogCard from "../components/dogCard";
import FinancingContainer from "../components/financing/financingContainer";

const Puppies = ({pageData}: { pageData: PageData }) => {
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);
    const {puppies, metaDescription, financing} = pageData;

    const minPrice = Math.min(...puppies.map((puppy: Puppy) => puppy.price));
    const maxPrice = Math.max(...puppies.map((puppy: Puppy) => puppy.price));
    const availabilityOrder: Record<string, number> = {'Available': 1, 'Reserved': 2, 'Sold': 3};
    const uniqueColors = Array.from(new Set<string>(puppies.map((puppy: Puppy) => puppy.color)));

    const [searchTerm, setSearchTerm] = useState('');
    const [sortFilter, setSortFilter] = useState('availability');
    const [genderFilter, setGenderFilter] = useState<string[]>(['']);
    const [colorFilter, setColorFilter] = useState<string[]>(['']);
    const [availabilityFilter, setAvailabilityFilter] = useState<string[]>(['']);
    const [priceFilter, setPriceFilter] = useState<number[]>([minPrice, maxPrice]);

    const sortedAndFilteredPuppies = useMemo(() => {
        return [...puppies]
            .sort((a: Puppy, b: Puppy) => {
                switch (sortFilter) {
                    case 'availability':
                        return availabilityOrder[a.availability] - availabilityOrder[b.availability];
                    case 'price':
                        return a.price - b.price;
                    case 'name':
                        return a.name.localeCompare(b.name);
                    default:
                        return 0;
                }
            })
            .filter((puppy: Puppy) => {
                const matchesSearchTerm = puppy.name.toLowerCase().includes(searchTerm.toLowerCase());
                const matchesGender = genderFilter.includes('') || genderFilter.includes(puppy.gender);
                const matchesColor = colorFilter.includes('') || colorFilter.includes(puppy.color);
                const matchesAvailability = availabilityFilter.includes('') || availabilityFilter.includes(puppy.availability);
                const matchesPrice = puppy.price >= priceFilter[0] && puppy.price <= priceFilter[1];

                return (
                    matchesSearchTerm && matchesGender && matchesColor && matchesAvailability && matchesPrice
                );
            });
    }, [puppies, searchTerm, sortFilter, genderFilter, colorFilter, availabilityFilter, priceFilter]);

    return (
        <Layout pageTitle="Puppies"
                metaDesc={metaDescription.description}
                pageData={pageData}>
            <div className="flex flex-col gap-4">
                {financing.displayOption == "container" &&
                    <FinancingContainer financing={financing}/>}
                <div className="flex flex-row gap-4">
                    <div
                        className={`hidden lg:flex justify-center flex-col w-48 h-min gap-2 divide-black divide-y bg-light-shades shadow-lg rounded-lg p-2 overflow-hidden`}>
                        <NameFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} id="Desktop"/>
                        <SortFilter sortFilter={sortFilter} setSortFilter={setSortFilter} id="Desktop"/>
                        <PriceFilter priceFilter={priceFilter} setPriceFilter={setPriceFilter}
                                     maxPrice={maxPrice} minPrice={minPrice} id="Desktop"/>
                        <GenderFilter filter={genderFilter} setFilter={setGenderFilter}
                                      handleCheckboxChange={handleCheckboxChange} id="Desktop"/>
                        <AvailabilityFilter filter={availabilityFilter}
                                            setFilter={setAvailabilityFilter}
                                            handleCheckboxChange={handleCheckboxChange} id="Desktop"/>
                        <ColorFilter filter={colorFilter} setFilter={setColorFilter}
                                     handleCheckboxChange={handleCheckboxChange}
                                     uniqueColors={uniqueColors} id="Desktop"/>
                    </div>
                    <div className="flex flex-col w-full gap-4">
                        <div
                            className="flex h-12 justify-between lg:justify-center items-center bg-light-shades shadow-lg rounded-lg overflow-hidden">
                            <h1 className="text-3xl font-bold px-2">Puppies</h1>
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
                                <div className="flex flex-col md:w-1/2">
                                    <div className="pr-2 pb-2">
                                        <NameFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm}
                                                    id="Mobile"/>
                                    </div>
                                    <div className="border-t border-black"/>
                                    <div className="pr-2 pb-2">
                                        <SortFilter sortFilter={sortFilter} setSortFilter={setSortFilter} id="Mobile"/>
                                    </div>
                                </div>
                                <div className="border-t md:border-l border-black"/>
                                <div className="md:w-1/2 md:pl-2 pb-2">
                                    <PriceFilter priceFilter={priceFilter} setPriceFilter={setPriceFilter}
                                                 maxPrice={maxPrice} minPrice={minPrice} id="Mobile"/>
                                </div>
                            </div>
                            <div className="border-t border-black"/>
                            <div className="flex flex-row">
                                <div className="flex flex-col md:flex-row w-1/2">
                                    <div className="md:w-1/2 pr-2 pb-2 md:pb-0">
                                        <GenderFilter filter={genderFilter} setFilter={setGenderFilter}
                                                      handleCheckboxChange={handleCheckboxChange}
                                                      id="Mobile"/>
                                    </div>
                                    <div className="border-t md:border-l border-black"/>
                                    <div className="md:w-1/2 pr-2 md:pl-2">
                                        <AvailabilityFilter filter={availabilityFilter}
                                                            setFilter={setAvailabilityFilter}
                                                            handleCheckboxChange={handleCheckboxChange}
                                                            id="Mobile"/>
                                    </div>
                                </div>
                                <div className="border-l border-black"/>
                                <div className="w-1/2 pl-2">
                                    <ColorFilter filter={colorFilter} setFilter={setColorFilter}
                                                 handleCheckboxChange={handleCheckboxChange}
                                                 uniqueColors={uniqueColors} id="Mobile" gridStyle="md:grid-cols-2"/>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap justify-center gap-4">
                            {
                                sortedAndFilteredPuppies.length > 0 ? (
                                    sortedAndFilteredPuppies.map((puppy: Puppy, index: number) => (
                                        <DogCard
                                            dog={puppy}
                                            showPrice={true}
                                            cardWidth={"w-full sm:w-[calc(50%-8px)] xl:w-[calc(100%/3-10.66px)] 2xl:w-[calc(25%-12px)]"}
                                            imageSizes={"(max-width: 639px) calc(100vw-32px), (max-width: 767px) 296px, (max-width: 1023px) 360px, (max-width: 1279px) 399px, (max-width: 1535px) 344px, 317px"}
                                            key={puppy._id}
                                            lazy={index > 1}
                                        />
                                    ))
                                ) : (
                                    <div
                                        className="h-auto w-auto bg-light-shades rounded-lg text-xl p-2">
                                        No puppies found :(
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
    "puppies": *[_type == "puppies"] | order(name) {
      _id,
      name,
      gender,
      color,
      'picture': mediaItems[type == "image"][0],
      availability,
      price
    },
    "metaDescription": *[_type == "metaDescriptions"][0]{
      'description': puppies,
    },
    "financing": *[_type == "financing"][0]{
      logo,
      link,
      text,
      'displayOption': displayOptionPuppies,
    },
  `;

    const pageData = await fetchPageData(additionalQuery);

    return {
        props: {
            pageData
        },
    };
};

export default Puppies;
