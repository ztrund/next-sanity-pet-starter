// hooks/useSiteInfo.ts
import { useState, useEffect } from 'react';
import sanityClient from '../lib/sanityClient';
import { BusinessHour, ContactInfo, SocialMediaLink, CompanyInfo } from '../types';

const useSiteInfo = (): { contactInfo: ContactInfo | null, companyInfo: CompanyInfo | null } => {
    const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);
    const [companyInfo, setCompanyInfo] = useState<CompanyInfo | null>(null);

    useEffect(() => {
        const fetchSiteInfo = async () => {
            try {
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
            }
          }
        `;

                const data = await sanityClient.fetch<{
                    contactInfo: {
                        email: string;
                        phone: string;
                        location: string;
                        businessHours: BusinessHour[];
                        socialMediaLinks: SocialMediaLink[];
                    },
                    companyInfo: {
                        companyName: string;
                        companyLogo: string;
                    },
                }>(query);

                setContactInfo(data.contactInfo);
                setCompanyInfo(data.companyInfo);
            } catch (error) {
                console.error('Error fetching site info:', error);
            }
        };

        fetchSiteInfo();
    }, []);

    return { contactInfo, companyInfo };
};

export default useSiteInfo;
