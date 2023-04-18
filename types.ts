export interface MediaItem {
    _key: string;
    type: "image" | "video";
    image?: any; // Replace 'any' with the appropriate type for image from Sanity
    videoUrl?: string;
}

export interface SocialMediaLink {
    platform: string;
    url: string;
    icon: any; // Add the icon property
}

export interface BusinessHour {
    day: string;
    hours: string;
}

export interface ContactInfo {
    email: string;
    phone: string;
    location: string;
    businessHours: BusinessHour[];
    socialMediaLinks: SocialMediaLink[];
}