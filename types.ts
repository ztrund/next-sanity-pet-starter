import {PortableTextBlock} from "@portabletext/types";

export interface MediaItem {
    _key: string;
    type: "image" | "video";
    image: SanityImage;
    videoUrl: string;
}

export interface SanityImage {
    asset: {
        _ref: string;
    };
    crop: {
        bottom: number;
        left: number;
        right: number;
        top: number;
    };
    hotspot: {
        height: number;
        width: number;
        x: number;
        y: number;
    }
    imageUrl?: string;
    srcSet?: string;
    sizes?: string;
}

export interface SocialMediaLink {
    platform: string;
    url: string;
    icon: {
        icon: string;
    };
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
    companyLogo: SanityImage;
    favicon: SanityImage;
    faviconUrls: {
        default: string;
        png512: string;
        png192: string;
        png32: string;
        png16: string;
        appleTouch: string;
    }
    pwaIcon: SanityImage;
}

export interface Puppy {
    _id: string;
    name: string;
    birthdate: string;
    gender: string;
    color: string;
    weight: number;
    description: string;
    availability: string;
    price: number;
    mediaItems: MediaItem[];
    parents: Parent[];
}

export interface Homepage {
    content: PortableTextBlock[];
}

export interface YoutubeSettings {
    channelUrl: string;
    fallbackVideoUrl: string;
}

export interface About {
    content: PortableTextBlock[];
    mediaItems: MediaItem[];
    team: TeamMember[];
    teamDescription: PortableTextBlock[];
}

export interface TeamMember {
    name: string;
    position: string;
    image: SanityImage;
}

export interface Parent {
    _id: string;
    name: string;
    birthdate: string;
    gender: string;
    color: string;
    weight: number;
    description: string;
    mediaItems: MediaItem[];
    puppies: Puppy[];
}

export interface Financing {
    banner: SanityImage;
    link: string;
    logo: SanityImage;
    text: PortableTextBlock[];
    displayOption: string;
}

export interface MetaDescription {
    description: string;
}

export interface PageData {
    companyInfo: CompanyInfo;
    homepage: Homepage;
    youtubeSettings: YoutubeSettings;
    about: About;
    contactInfo: ContactInfo;
    financing: Financing;
    metaDescription: MetaDescription;
    puppies: Puppy[];
    puppy: Puppy;
    parents: Parent[];
    parent: Parent;
}