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

export interface CompanyInfo {
    companyName: string;
    companyLogo: any; // Replace 'any' with the appropriate type for image from Sanity
}

export interface SiteInfo {
    contactInfo: ContactInfo | null;
    companyInfo: CompanyInfo | null;
}

export interface Puppy {
    name: string;
    birthdate: string;
    gender: string;
    color: string;
    weight: number;
    mediaItems: MediaItem[];
    availability: string;
    price: number;
}

export interface Puppies {
    puppies: Puppy[];
}

export interface HomePage {
    content: any[];
}

export interface YoutubeSettings {
    channelUrl: string;
    fallbackVideoUrl: string;
}

export interface About {
    content: any[];
    mediaItems: MediaItem[];
}

export interface Parent {
    name: string;
    birthdate: string;
    gender: string;
    color: string;
    weight: number;
    mediaItems: MediaItem[];
}

export interface Parents {
    parents: Parent[];
}

export interface Financing {
    banner: any;
    link: string;
}