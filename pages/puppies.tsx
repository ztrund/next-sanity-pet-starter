import {useState} from 'react';
import {GetStaticProps, InferGetStaticPropsType} from 'next';
import Layout from '../components/layout';
import {Puppy} from "../types";
import fetchPageData from "../lib/fetchPageData";
import DogCard from "../components/dogCard";

const Puppies = ({pageData}: InferGetStaticPropsType<typeof getStaticProps>) => {
    const {puppies, metaDescription} = pageData;

    const [searchTerm, setSearchTerm] = useState('');

    const filteredPuppies = puppies.filter((puppy: Puppy) => {
        return (
            puppy.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    return (
        <Layout pageTitle="Puppies"
                metaDesc={metaDescription.description}
                pageData={pageData}>
            <div className="container mx-auto">
                <div className="flex justify-between items-center mb-4 bg-light-shades drop-shadow-lg rounded-lg p-2">
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
                    {filteredPuppies.map((puppy: Puppy, index: number) => (
                        <DogCard dog={puppy} showPrice={true} cardWidth={"w-full md:w-[22.5rem] lg:w-[20rem] xl:w-[18.75rem] 2xl:w-[22.75rem]"} key={index}/>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const additionalQuery = `
    "puppies": *[_type == "puppies"] {
      name,
      birthdate,
      gender,
      color,
      weight,
      mediaItems,
      availability,
      price
    },
    "metaDescription": *[_type == "metaDescriptions"][0]{
      'description': puppies,
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
