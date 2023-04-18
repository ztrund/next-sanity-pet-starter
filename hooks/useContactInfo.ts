// useContactInfo.ts
import {useState, useEffect} from 'react';
import sanityClient from '../lib/sanityClient';
import {BusinessHour, ContactInfo, SocialMediaLink} from "../types";

const useContactInfo = (): ContactInfo | null => {
    const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null);

    useEffect(() => {
        const fetchContactInfo = async () => {
            try {
                const data = await sanityClient.fetch<{
                    email: string;
                    phone: string;
                    location: string;
                    businessHours: BusinessHour[];
                    socialMediaLinks: SocialMediaLink[];
                }>(
                    `*[_type == "contactInfo"][0]{
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
  }`
                );

                setContactInfo({
                    email: data.email,
                    phone: data.phone,
                    location: data.location,
                    businessHours: data.businessHours,
                    socialMediaLinks: data.socialMediaLinks,
                });
            } catch (error) {
                console.error('Error fetching contact info:', error);
            }
        };

        fetchContactInfo();
    }, []);

    return contactInfo;
};

export default useContactInfo;
