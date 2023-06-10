import {PageData} from '../types';
import axios from "axios";

export interface FetchParams {
    name?: string;
}

const sanityConfig = {
    projectId: "fcb9r3pv",
    dataset: "production",
    apiVersion: "2023-04-12", // use current UTC date - see "specifying API version"!
    useCdn: process.env.NEXT_PUBLIC_SANITY_USE_CDN === 'true', // `false` if you want to ensure fresh data
};

const deserializeToPageData = (rawData: PageData): PageData => {
    return {
        contactInfo: rawData.contactInfo || {},
        companyInfo: rawData.companyInfo || {},
        puppies: rawData.puppies || {},
        homepage: rawData.homepage || {},
        youtubeSettings: rawData.youtubeSettings || {},
        about: rawData.about || {},
        parents: rawData.parents || {},
        parent: rawData.parent || {},
        puppy: rawData.puppy || {},
        financing: rawData.financing || {},
        metaDescription: rawData.metaDescription || {},
    };
};

const fetchPageData = async (additionalQuery: string = '', fetchParams: FetchParams = {}) => {
    const query = `
    {
        "contactInfo": *[_type == "contactInfo"][0] {
        email,
        phone,
        location,
        businessHours[] {
            day,
            hours
        },
        socialMediaLinks[] {
            platform,
            url,
            icon
        }
        },
        "companyInfo": *[_type == "companyInfo"][0] {
        companyName,
        companyLogo,
        favicon,
        },
        ${additionalQuery}
    }
    `;

    let url = `https://${sanityConfig.projectId}.api.sanity.io/v${sanityConfig.apiVersion}/data/query/${sanityConfig.dataset}?query=${encodeURIComponent(query)}`;

    if (fetchParams.name) {
        url += `&%24name=%22${encodeURIComponent(fetchParams.name)}%22`;
    }

    try {
        const response = await axios.get(url, {
            headers: {'Content-Type': 'application/json'}
        });
        return deserializeToPageData(response.data.result);
    } catch (error) {
        console.error('Error fetching page data:', error);
        throw error;
    }
};

export default fetchPageData;
