import React from 'react';
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../lib/sanityClient";
import {imageDimensionExtractor} from "../helpers/imageDimensionExtractor";
import {Financing} from "../types";

interface FinancingBannerProps {
    financing: Financing
}

const FinancingBanner: React.FC<FinancingBannerProps> = ({financing}) => {
    const imageBuilder = imageUrlBuilder(sanityClient);

    // Render nothing if there's no banner
    if (!financing.banner) {
        return null;
    }

    const imgDimensions = imageDimensionExtractor(financing.banner.asset._ref);

    // If we couldn't extract dimensions, don't render the component
    if (!imgDimensions) {
        return null;
    }

    return (
        <div className="h-min p-0 bg-light-shades shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1">
            <a href={financing.link} target="_blank" rel="noopener noreferrer">
                <img
                    src={imageBuilder.image(financing.banner).width(744).auto('format').quality(75).url()}
                    alt="Financing Available"
                    loading="lazy"
                    width="744"
                    height={imgDimensions.width / 744 * imgDimensions.height}
                />
            </a>
        </div>
    );
}

export default FinancingBanner;
