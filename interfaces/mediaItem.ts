export interface MediaItem {
    _key: string;
    type: "image" | "video";
    image?: any; // Replace 'any' with the appropriate type for image from Sanity
    videoUrl?: string;
}