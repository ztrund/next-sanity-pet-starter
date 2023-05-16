import {GetStaticPaths, GetStaticProps, InferGetStaticPropsType} from 'next';
import sanityClient from '../../lib/sanityClient';
import Layout from '../../components/layout';
import CustomCarousel from "../../components/customCarousel";
import {getAge} from "../../helpers/getAge";
import fetchPageData from "../../lib/fetchPageData";
import imageUrlBuilder from "@sanity/image-url";

const Puppy = ({pageData}: InferGetStaticPropsType<typeof getStaticProps>) => {
    const {puppy, financing, metaDescription} = pageData;

    const imageBuilder = imageUrlBuilder(sanityClient);

    const {years, weeks, days} = getAge(puppy.birthdate);

    const replaceTemplateLiterals = (description: string, data: { [x: string]: any; }) => {
        return description.replace(/\$\{(\w+)}/g, (_, key) => data[key]);
    };

    return (
        <Layout pageTitle={puppy.name}
                metaDesc={replaceTemplateLiterals(metaDescription.description, puppy)}
                pageData={pageData}>
            <div className="flex justify-between items-center p-2 mb-4 bg-light-shades shadow-lg rounded-lg">
                <h1 className="text-3xl font-bold">{puppy.name}</h1>
                <h1 className="text-2xl font-normal">{puppy.availability} - ${puppy.price}</h1>
            </div>
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="w-full lg:w-1/2 h-min p-0 bg-light-shades shadow-lg rounded-lg overflow-hidden">
                    <CustomCarousel mediaItems={puppy.mediaItems}/>
                </div>
                <div className="w-full lg:w-1/2">
                    <div className="h-min p-2 bg-light-shades shadow-lg rounded-lg mb-4">
                        <p>
                            <strong>Age:</strong> {years > 0 ? `${years} ${years === 1 ? 'year' : 'years'},` : ''} {weeks} {weeks === 1 ? 'week' : 'weeks'} and {days} {days === 1 ? 'day' : 'days'} old
                        </p>
                        <p>
                            <strong>Gender:</strong> {puppy.gender}
                        </p>
                        <p>
                            <strong>Color:</strong> {puppy.color}
                        </p>
                        <p>
                            <strong>Weight:</strong> {puppy.weight} lbs
                        </p>
                        <p>
                            <strong>Description:</strong> {puppy.description}
                        </p>
                    </div>
                    <div className="h-min p-0 bg-light-shades shadow-lg rounded-lg overflow-hidden">
                        <a href={financing.link} target="_blank"
                           rel="noopener noreferrer">
                            <img
                                src={imageBuilder.image(financing.banner).width(768).auto('format').quality(75).url()}
                                alt="Financing Available"
                                loading="lazy"
                                width="768"
                            />
                        </a>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const puppies = await sanityClient.fetch(`*[_type == "puppies"]{ name }`);
    const paths = puppies.map((puppy: { name: string }) => ({
        params: {name: puppy.name.toLowerCase()},
    }));

    return {paths, fallback: false};
};

export const getStaticProps: GetStaticProps = async ({params}) => {
    const additionalQuery = `
    "puppy": *[_type == "puppies" && name match $name][0]{
      name,
      birthdate,
      gender,
      color,
      weight,
      description,
      mediaItems,
      availability,
      price
    },
    "financing": *[_type == "financing"][0]{
      banner,
      link,
    },
    "metaDescription": *[_type == "metaDescriptions"][0]{
      'description': puppy,
    },
  `;

    const fetchParams = {name: params?.name};

    const pageData = await fetchPageData(additionalQuery, fetchParams);

    return {
        props: {
            pageData,
        },
        revalidate: 60,
    };
};

export default Puppy;
