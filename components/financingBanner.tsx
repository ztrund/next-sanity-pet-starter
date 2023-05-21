import React from 'react';
import imageUrlBuilder from "@sanity/image-url";
import sanityClient from "../lib/sanityClient";
import {imageDimensionExtractor} from "../helpers/imageDimensionExtractor";

interface Financing {
    banner: {
        asset: {
            _ref: string
        }
    },
    link: string
}

interface FinancingBannerProps {
    financing: Financing
}

const FinancingBanner: React.FC<FinancingBannerProps> = ({financing}) => {
    const imageBuilder = imageUrlBuilder(sanityClient);

    // Render nothing if there's no banner
    if (!financing.banner) {
        return null;
    }

    let imgDimensions = null;
    if (financing.banner.asset._ref) {
        imgDimensions = imageDimensionExtractor(financing.banner.asset._ref);
    }

    return (
        imgDimensions ? (
            <div className="h-min p-0 bg-light-shades shadow-lg rounded-lg overflow-hidden">
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
        ) : null
    );
}

export default FinancingBanner;