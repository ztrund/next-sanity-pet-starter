import {PageData} from '../types';
import axios from "axios";
import generateFaviconUrls from "../helpers/generateFaviconUrls";
import {sanityImgUrl} from "./sanityImgUrl";

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
        let pageData = deserializeToPageData(response.data.result);
        if (pageData.companyInfo.favicon) {
            pageData.companyInfo.faviconUrls = generateFaviconUrls(pageData.companyInfo.favicon);
        }
        if (pageData.companyInfo.companyLogo) {
            const imageUrlParams = {
                h: 64,
                auto: 'format',
                q: 75,
                fit: 'min'
            };
            const companyLogo = pageData.companyInfo.companyLogo;
            pageData.companyInfo.companyLogo.imageUrl = sanityImgUrl(companyLogo, {...imageUrlParams, dpr: 1});
            pageData.companyInfo.companyLogo.srcSet = [1, 1.5, 2].map(dpr => `${sanityImgUrl(companyLogo, {
                ...imageUrlParams,
                dpr
            })} ${dpr}x`).join(', ');
        }
        return pageData;
    } catch (error) {
        console.error('Error fetching page data:', error);
        throw error;
    }
};

export default fetchPageData;
