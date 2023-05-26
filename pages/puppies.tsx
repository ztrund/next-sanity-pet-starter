import React, {useState, useMemo} from 'react';
import {GetStaticProps, InferGetStaticPropsType} from 'next';
import Layout from '../components/layout/layout';
import {Puppy} from "../types";
import fetchPageData from "../lib/fetchPageData";
import DogCard from "../components/dogCard";
import FinancingContainer from "../components/financing/financingContainer";
import {Disclosure} from '@headlessui/react';
import {FiFilter, FiX} from "react-icons/fi";
import GenderFilter from "../components/filters/genderFilter";
import AvailabilityFilter from "../components/filters/availabilityFilter";
import ColorFilter from "../components/filters/colorFilter";
import PriceFilter from "../components/filters/priceFilter";
import SortFilter from "../components/filters/sortFilter";
import NameFilter from "../components/filters/nameFilter";

const Puppies = ({pageData}: InferGetStaticPropsType<typeof getStaticProps>) => {
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

    const handleCheckboxChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        filter: string[],
        setFilter: React.Dispatch<React.SetStateAction<string[]>>
    ) => {
        const value = event.target.value;

        if (event.target.checked) {
            if (value === '') {
                // If 'All' is checked, clear the other checkboxes
                setFilter(['']);
            } else {
                // If any other checkbox is checked, uncheck 'All'
                setFilter((prev) => [...prev.filter((item) => item !== ''), value]);
            }
        } else {
            // If a checkbox is unchecked, remove its value from the filter array
            setFilter((prev) => prev.filter((item) => item !== value));
        }
    };

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
            <Disclosure>
                {({open}) => (
                    <>
                        <div className="flex flex-col gap-4">
                            <FinancingContainer financing={financing}/>
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
                                        <Disclosure.Button
                                            className="lg:hidden flex flex-row justify-center items-center h-full px-4 border-l rounded-r-lg bg-main-brand-color text-light-shades focus:outline-none focus:ring-2 focus:ring-inset focus:ring-dark-accent"
                                            aria-label={open ? "Close filters" : "Open filters"}
                                        >
                                            {open ? <FiX size={24}/> : <FiFilter size={24}/>}
                                        </Disclosure.Button>
                                    </div>
                                    <div
                                        className={`${open ? "flex" : "hidden"} lg:hidden justify-center flex-col w-full h-min bg-light-shades shadow-lg rounded-lg p-2 overflow-clip`}>
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
                                                <div className="md:w-1/2 pr-2">
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
                                                             uniqueColors={uniqueColors} id="Mobile"/>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap justify-center gap-4">
                                        {
                                            sortedAndFilteredPuppies.length > 0 ? (
                                                sortedAndFilteredPuppies.map((puppy: Puppy, index: number) => (
                                                    <DogCard dog={puppy} showPrice={true}
                                                             cardWidth={"w-full md:w-[22.5rem] lg:w-[24.97rem] xl:w-[21.53rem] 2xl:w-[19.84rem]"}
                                                             key={puppy._id} lazy={index !== 0}/>
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
                    </>
                )}
            </Disclosure>
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
      mediaItems,
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
    },
  `;

    const pageData = await fetchPageData(additionalQuery);

    return {
        props: {
            pageData,
        },
    };
};

export default Puppies;
