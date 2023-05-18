import {useState} from 'react';
import {GetStaticProps, InferGetStaticPropsType} from 'next';
import Layout from '../components/layout';
import {Parent} from "../types";
import fetchPageData from "../lib/fetchPageData";
import DogCard from "../components/dogCard";

const Parents = ({pageData}: InferGetStaticPropsType<typeof getStaticProps>) => {
    const {parents, metaDescription} = pageData;

    const [searchTerm, setSearchTerm] = useState('');

    const filteredParents = parents.filter((parent: Parent) => {
        return (
            parent.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    return (
        <Layout pageTitle="Parents"
                metaDesc={metaDescription.description}
                pageData={pageData}>
            <div className="container mx-auto">
                <div className="flex justify-between items-center mb-4 bg-light-shades drop-shadow-lg rounded-lg p-2">
                    <h1 className="text-3xl font-bold on-secondary-text">Parents</h1>
                    <input
                        className="border-2 rounded py-1 px-2 w-48 sm:w-64"
                        type="text"
                        placeholder="Search parents"
                        onChange={(e) => setSearchTerm(e.target.value)}
                        value={searchTerm}
                    />
                </div>
                <div className="flex flex-wrap justify-center gap-4">
                    {
                        filteredParents.length > 0 ? (
                            filteredParents.map((parent: Parent) => (
                                <DogCard dog={parent} showPrice={false}
                                         cardWidth={"w-full md:w-[22.5rem] lg:w-[20rem] xl:w-[18.75rem] 2xl:w-[22.75rem]"}
                                         key={parent._id}/>
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
        </Layout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const additionalQuery = `
    "parents": *[_type == "parents"] | order(name) {
      _id,
      name,
      birthdate,
      gender,
      color,
      weight,
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
