import {useState, useMemo} from 'react';
import {GetStaticProps, InferGetStaticPropsType} from 'next';
import Layout from '../components/layout';
import {Puppy} from "../types";
import fetchPageData from "../lib/fetchPageData";
import DogCard from "../components/dogCard";
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../lib/sanityClient";
import FinancingContainer from "../components/financingContainer";

const Puppies = ({pageData}: InferGetStaticPropsType<typeof getStaticProps>) => {
    const {puppies, metaDescription, financing} = pageData;

    const [searchTerm, setSearchTerm] = useState('');

    const availabilityOrder: Record<string, number> = {'Available': 1, 'Reserved': 2, 'Sold': 3};

    const sortedAndFilteredPuppies = useMemo(() => {
        return [...puppies]
            .sort((a: Puppy, b: Puppy) => {
                return availabilityOrder[a.availability] - availabilityOrder[b.availability];
            })
            .filter((puppy: Puppy) => puppy.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [puppies, searchTerm]);

    const imageBuilder = imageUrlBuilder(sanityClient);

    return (
        <Layout pageTitle="Puppies"
                metaDesc={metaDescription.description}
                pageData={pageData}>
            <div className="flex flex-col gap-4">
                <FinancingContainer financing={financing}/>
                <div className="flex justify-between items-center bg-light-shades drop-shadow-lg rounded-lg p-2">
                    <h1 className="text-3xl font-bold on-secondary-text">Puppies</h1>
                    <input
                        className="border-2 rounded py-1 px-2 w-48 sm:w-64"
                        type="text"
                        placeholder="Search puppies"
                        onChange={(e) => setSearchTerm(e.target.value)}
                        value={searchTerm}
                    />
                </div>
                <div className="flex flex-wrap justify-center gap-4">
                    {
                        sortedAndFilteredPuppies.length > 0 ? (
                            sortedAndFilteredPuppies.map((puppy: Puppy, index: number) => (
                                <DogCard dog={puppy} showPrice={true}
                                         cardWidth={"w-full md:w-[22.5rem] lg:w-[20rem] xl:w-[18.75rem] 2xl:w-[22.75rem]"}
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
