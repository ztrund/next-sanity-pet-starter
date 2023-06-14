import {PageData, TeamMember} from '../types';
import axios from "axios";
import generateFaviconUrls from "../helpers/generateFaviconUrls";
import {sanityImgUrl} from "./sanityImgUrl";
import {imageDimensionExtractor} from "../helpers/imageDimensionExtractor";
import generateCarouselUrls from "../helpers/generateCarouselUrls";
import generateDogCardUrls from "../helpers/generateDogCardUrls";
import {extractYoutubeChannelId, extractYoutubeVideoId} from "../helpers/youtubeLinkExtractor";
import {replaceTemplateLiterals} from "../helpers/replaceTemplateLiterals";
import {getAge} from "../helpers/getAge";

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
            companyLogo.imageUrl = sanityImgUrl(companyLogo, {...imageUrlParams, dpr: 1});
            companyLogo.srcSet = [1, 1.5, 2].map(dpr => `${sanityImgUrl(companyLogo, {
                ...imageUrlParams,
                dpr
            })} ${dpr}x`).join(', ');
            const imgDimensions = imageDimensionExtractor(companyLogo.asset._ref);
            companyLogo.width = imgDimensions.width / imgDimensions.height * 64;
            companyLogo.height = 64
        }
        if (pageData.about.team) {
            const imageUrlParams = {
                h: 128,
                w: 128,
                auto: 'format',
                q: 75,
                fit: 'min'
            };
            pageData.about.team.map((teamMember: TeamMember) => {
                teamMember.image.imageUrl = sanityImgUrl(teamMember.image, {...imageUrlParams, dpr: 1});
                teamMember.image.srcSet = [1, 1.5, 2].map(dpr => `${sanityImgUrl(teamMember.image, {
                    ...imageUrlParams,
                    dpr
                })} ${dpr}x`).join(', ');
            })
        }
        if (pageData.financing.displayOption === 'container' && pageData.financing.logo) {
            const imageUrlParams = {
                h: 48,
                auto: 'format',
                q: 75,
                fit: 'min'
            };
            const financingLogo = pageData.financing.logo;
            financingLogo.imageUrl = sanityImgUrl(financingLogo, {...imageUrlParams, dpr: 1});
            financingLogo.srcSet = [1, 1.5, 2].map(dpr => `${sanityImgUrl(financingLogo, {
                ...imageUrlParams,
                dpr
            })} ${dpr}x`).join(', ');
            const imgDimensions = imageDimensionExtractor(financingLogo.asset._ref);
            financingLogo.width = imgDimensions.width / imgDimensions.height * 48;
            financingLogo.height = 48
        }
        if (pageData.financing.displayOption === 'banner' && pageData.financing.banner) {
            const imageUrlParams = {
                auto: 'format',
                q: 75,
                fit: 'min'
            };
            const financingBanner = pageData.financing.banner;
            financingBanner.imageUrl = sanityImgUrl(financingBanner, {...imageUrlParams, w: 488});
            financingBanner.srcSet = [488, 616, 744, 976, 1232, 1488].map(w => `${sanityImgUrl(financingBanner, {
                ...imageUrlParams,
                w: w
            })} ${w}w`).join(', ');
            financingBanner.sizes = '(max-width: 1023px) calc(100vw - 32px), (max-width: 1536px) calc(50vw - 24px), 744px';
            const imgDimensions = imageDimensionExtractor(financingBanner.asset._ref);
            financingBanner.width = imgDimensions.width;
            financingBanner.height = imgDimensions.height;
        }
        if (pageData.about.mediaItems) {
            generateCarouselUrls(pageData.about.mediaItems);
        }
        if (pageData.puppy.mediaItems) {
            generateCarouselUrls(pageData.puppy.mediaItems);
            pageData.metaDescription.description = replaceTemplateLiterals(pageData.metaDescription.description, pageData.puppy);
            pageData.puppy.age = getAge(pageData.puppy.birthdate);
            if (pageData.puppy.parents.length > 0) {
                generateDogCardUrls(pageData.puppy.parents.filter(Boolean));
            }
        }
        if (pageData.parent.mediaItems) {
            generateCarouselUrls(pageData.parent.mediaItems);
            pageData.metaDescription.description = replaceTemplateLiterals(pageData.metaDescription.description, pageData.parent);
            pageData.parent.age = getAge(pageData.parent.birthdate);
            if (pageData.parent.puppies.length > 0) {
                generateDogCardUrls(pageData.parent.puppies);
            }
        }
        if (pageData.puppies.length > 0) {
            generateDogCardUrls(pageData.puppies);
        }
        if (pageData.parents.length > 0) {
            generateDogCardUrls(pageData.parents);
        }
        if (pageData.youtubeSettings) {
            pageData.youtubeSettings.channelId = extractYoutubeChannelId(pageData.youtubeSettings.channelUrl);
            pageData.youtubeSettings.fallbackVideoId = extractYoutubeVideoId(pageData.youtubeSettings.fallbackVideoUrl);
        }
        return pageData;
    } catch (error) {
        console.error('Error fetching page data:', error);
        throw error;
    }
};

export default fetchPageData;
