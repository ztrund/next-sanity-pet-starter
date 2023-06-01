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
    companyNameShort: string;
    companyDescription: string;
    companyLogo: any;
    favicon: any;
    pwaIcon: any;
}

export interface SiteInfo {
    contactInfo: ContactInfo | null;
    companyInfo: CompanyInfo | null;
}

export interface Puppy {
    _id: string;
    name: string;
    birthdate: string;
    gender: string;
    color: string;
    weight: number;
    mediaItems: MediaItem[];
    availability: string;
    price: number;
    parents: Parent[];
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
    team: TeamMember[];
    teamDescription: any[];
}

export interface TeamMember {
    name: string;
    position: string;
    image: any;
}

export interface Parent {
    _id: string;
    name: string;
    birthdate: string;
    gender: string;
    color: string;
    weight: number;
    mediaItems: MediaItem[];
    puppies: Puppy[];
}

export interface Parents {
    parents: Parent[];
}

export interface Financing {
    banner: any;
    link: string;
    logo: any;
    text: any[];
    displayOption: string;
}

export interface MetaDescription {
    description: string;
}
