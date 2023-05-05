import sanityClient from './sanityClient';
import {
    About,
    CompanyInfo,
    ContactInfo,
    Financing,
    HomePage,
    MetaDescription,
    Parent,
    Parents,
    Puppies,
    Puppy,
    YoutubeSettings
} from '../types';

interface PageData {
    contactInfo: ContactInfo | null;
    companyInfo: CompanyInfo | null;
    puppies: Puppies | null;
    homepage: HomePage | null;
    youtubeSettings: YoutubeSettings | null;
    about: About | null;
    parents: Parents | null;
    parent: Parent | null;
    puppy: Puppy | null;
    financing: Financing | null;
    metaDescription: MetaDescription | null;
    additionalQuery?: string;
}

const fetchPageData = async (additionalQuery = '', fetchParams = {}): Promise<PageData> => {
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
      companyLogo
    },
    ${additionalQuery}
  }
  `;

    try {
        return await sanityClient.fetch(query, fetchParams);
    } catch (error) {
        console.error('Error fetching page data:', error);
        throw error;
    }
};

export default fetchPageData;
