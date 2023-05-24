import React, {useState, useMemo} from 'react';
import {GetStaticProps, InferGetStaticPropsType} from 'next';
import Layout from '../components/layout';
import {Puppy} from "../types";
import fetchPageData from "../lib/fetchPageData";
import DogCard from "../components/dogCard";
import FinancingContainer from "../components/financingContainer";
import {Disclosure} from '@headlessui/react';
import {FiMenu, FiX} from "react-icons/fi";

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
                                    className={`flex justify-center flex-col w-48 divide-y h-min gap-2 divide-black bg-light-shades shadow-lg rounded-lg p-2 overflow-clip`}>
                                    <div className="flex flex-col">
                                        <label className="w-full text-center font-medium">Name</label>
                                        <input
                                            type="text"
                                            className="rounded-lg w-full py-0 px-2 border-black focus:ring-dark-accent focus:border-dark-accent"
                                            placeholder="Search by name"
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            value={searchTerm}
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="w-full text-center font-medium">Sort</label>
                                        <select
                                            className="rounded-lg w-full py-0 px-2 border-black focus:ring-dark-accent focus:border-dark-accent"
                                            onChange={(e) => setSortFilter(e.target.value)}
                                            value={sortFilter}
                                        >
                                            <option value="availability">Availability</option>
                                            <option value="price">Price</option>
                                            <option value="name">Name</option>
                                        </select>
                                    </div>
                                    <div className="flex flex-col pt-2">
                                        <label className="w-full text-center font-medium">Gender</label>
                                        <label>
                                            <input
                                                type="checkbox"
                                                value=""
                                                className="text-main-brand-color rounded-lg focus:ring-dark-accent"
                                                checked={genderFilter.includes('')}
                                                onChange={(e) => handleCheckboxChange(e, genderFilter, setGenderFilter)}
                                            /> All Genders
                                        </label>
                                        <label>
                                            <input
                                                type="checkbox"
                                                value="Male"
                                                className="text-main-brand-color rounded-lg focus:ring-dark-accent"
                                                checked={genderFilter.includes('Male')}
                                                onChange={(e) => handleCheckboxChange(e, genderFilter, setGenderFilter)}
                                            /> Male
                                        </label>
                                        <label>
                                            <input
                                                type="checkbox"
                                                value="Female"
                                                className="text-main-brand-color rounded-lg focus:ring-dark-accent"
                                                checked={genderFilter.includes('Female')}
                                                onChange={(e) => handleCheckboxChange(e, genderFilter, setGenderFilter)}
                                            /> Female
                                        </label>
                                    </div>
                                    <div className="flex flex-col pt-2">
                                        <label className="w-full text-center font-medium">Color</label>
                                        <label>
                                            <input
                                                type="checkbox"
                                                value=""
                                                className="text-main-brand-color rounded-lg focus:ring-dark-accent"
                                                checked={colorFilter.includes('')}
                                                onChange={(e) => handleCheckboxChange(e, colorFilter, setColorFilter)}
                                            /> All Colors
                                        </label>
                                        {uniqueColors.map((color, index) => (
                                            <label key={index}>
                                                <input
                                                    type="checkbox"
                                                    value={color}
                                                    className="text-main-brand-color rounded-lg focus:ring-dark-accent"
                                                    checked={colorFilter.includes(color)}
                                                    onChange={(e) => handleCheckboxChange(e, colorFilter, setColorFilter)}
                                                /> {color}
                                            </label>
                                        ))}
                                    </div>
                                    <div className="flex flex-col pt-2">
                                        <label className="w-full text-center font-medium">Availability</label>
                                        <label>
                                            <input
                                                type="checkbox"
                                                value=""
                                                className="text-main-brand-color rounded-lg focus:ring-dark-accent"
                                                checked={availabilityFilter.includes('')}
                                                onChange={(e) => handleCheckboxChange(e, availabilityFilter, setAvailabilityFilter)}
                                            /> All Availability
                                        </label>
                                        <label>
                                            <input
                                                type="checkbox"
                                                value="Available"
                                                className="text-main-brand-color rounded-lg focus:ring-dark-accent"
                                                checked={availabilityFilter.includes('Available')}
                                                onChange={(e) => handleCheckboxChange(e, availabilityFilter, setAvailabilityFilter)}
                                            /> Available
                                        </label>
                                        <label>
                                            <input
                                                type="checkbox"
                                                value="Reserved"
                                                className="text-main-brand-color rounded-lg focus:ring-dark-accent"
                                                checked={availabilityFilter.includes('Reserved')}
                                                onChange={(e) => handleCheckboxChange(e, availabilityFilter, setAvailabilityFilter)}
                                            /> Reserved
                                        </label>
                                        <label>
                                            <input
                                                type="checkbox"
                                                value="Sold"
                                                className="text-main-brand-color rounded-lg focus:ring-dark-accent"
                                                checked={availabilityFilter.includes('Sold')}
                                                onChange={(e) => handleCheckboxChange(e, availabilityFilter, setAvailabilityFilter)}
                                            /> Sold
                                        </label>
                                    </div>
                                    <div className="flex flex-col pt-2">
                                        <label className="w-full text-center font-medium">Price Range</label>
                                        <div className="flex flex-row justify-between">
                                            <label className="w-1/2 text-center">Min</label>
                                            <label className="w-2 text-center">-</label>
                                            <label className="w-1/2 text-center">Max</label>
                                        </div>
                                        <div className="flex flex-row justify-between">
                                            <input
                                                type="number"
                                                className="rounded-lg w-1/2 text-center py-0 px-2 border-black focus:ring-dark-accent focus:border-dark-accent"
                                                onChange={(e) => setPriceFilter([Number(e.target.value), priceFilter[1]])}
                                                defaultValue={minPrice}
                                            />
                                            <label className="w-2"></label>
                                            <input
                                                type="number"
                                                className="rounded-lg w-1/2 text-center py-0 px-2 border-black focus:ring-dark-accent focus:border-dark-accent"
                                                onChange={(e) => setPriceFilter([priceFilter[0], Number(e.target.value)])}
                                                defaultValue={maxPrice}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col w-full gap-4">
                                    <div
                                        className="flex justify-between lg:justify-center items-center bg-light-shades drop-shadow-lg rounded-lg p-2">
                                        <h1 className="text-3xl font-bold on-secondary-text">Puppies</h1>
                                        <Disclosure.Button
                                            className="lg:hidden inline-flex justify-between w-auto px-4 py-2 text-sm font-medium text-left text-black bg-white rounded-lg hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                            Filters
                                            {open ? <FiX size={24}/> : <FiMenu size={24}/>}
                                        </Disclosure.Button>
                                    </div>
                                    <div className="flex flex-wrap justify-center gap-4">
                                        {
                                            sortedAndFilteredPuppies.length > 0 ? (
                                                sortedAndFilteredPuppies.map((puppy: Puppy, index: number) => (
                                                    <DogCard dog={puppy} showPrice={true}
                                                             cardWidth={"w-full md:w-[22.5rem] lg:w-[24.98rem] xl:w-[21.53rem] 2xl:w-[19.84rem]"}
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
