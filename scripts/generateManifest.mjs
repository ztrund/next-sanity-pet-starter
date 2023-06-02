import fs from 'fs';
import {createClient} from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";


const sanityClient = createClient({
    projectId: "fcb9r3pv",
    dataset: "production",
    apiVersion: "2023-04-12", // use current UTC date - see "specifying API version"!
    useCdn: process.env.NEXT_PUBLIC_SANITY_USE_CDN === 'true', // `false` if you want to ensure fresh data
});

const fetchCompanyInfo = async () => {
    return await sanityClient.fetch("*[_type == 'companyInfo'][0]{favicon, companyName, companyNameShort, companyDescription, pwaIcon}");
}

async function generateManifest() {
    const companyInfo = await fetchCompanyInfo();
    const sanityImageUrl = imageUrlBuilder(sanityClient);
    const manifest = {
        name: companyInfo.companyName,
        short_name: companyInfo.companyNameShort,
        description: companyInfo.companyDescription,
        lang: 'en-US',
        icons: [
            {
                src: sanityImageUrl.image(companyInfo.pwaIcon).width(512).height(512).format("png").fit("fill").bg("3e3332").ignoreImageParams().url(),
                type: 'image/png',
                sizes: '512x512',
                purpose: 'maskable',
            },
            {
                src: sanityImageUrl.image(companyInfo.pwaIcon).width(192).height(192).format("png").fit("fill").bg("3e3332").ignoreImageParams().url(),
                type: 'image/png',
                sizes: '192x192',
                purpose: 'maskable',
            },
            {
                src: sanityImageUrl.image(companyInfo.favicon).width(512).height(512).format("png").fit("fill").bg("0000").ignoreImageParams().url(),
                type: 'image/png',
                sizes: '512x512',
                purpose: 'any',
            },
            {
                src: sanityImageUrl.image(companyInfo.favicon).width(192).height(192).format("png").fit("fill").bg("0000").ignoreImageParams().url(),
                type: 'image/png',
                sizes: '192x192',
                purpose: 'any',
            },
        ],
        start_url: '/',
        display: 'standalone',
        orientation: 'natural',
        theme_color: 'hsl(39, 76%, 52%)',
        background_color: 'hsl(5, 11%, 22%)',
        categories: ['pets'],
        scope: '/',
    };
    fs.writeFileSync('./public/manifest.json', JSON.stringify(manifest));
}

generateManifest();