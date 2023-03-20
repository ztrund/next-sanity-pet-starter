import { createClient } from "@sanity/client";

const sanityClient = createClient({
    projectId: "fcb9r3pv",
    dataset: "production",
    apiVersion: "2023-03-19", // use current UTC date - see "specifying API version"!
    useCdn: false, // `false` if you want to ensure fresh data
});

export default sanityClient;
