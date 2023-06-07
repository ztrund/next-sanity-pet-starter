import {imageDimensionExtractor} from "../../helpers/imageDimensionExtractor";
import {Financing} from "../../types";
import {sanityImageUrl} from "../../lib/sanityImageUrl";
import React from "react";

interface FinancingBannerProps {
    financing: Financing
}

const FinancingBanner: React.FC<FinancingBannerProps> = ({financing}) => {

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
        <div
            className="h-min p-0 bg-light-shades shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1">
            <a href={financing.link} target="_blank" rel="noopener noreferrer">
                <img
                    src={sanityImageUrl(financing.banner, {w: 488, auto: "format", q: 75, fit: "min"})}
                    srcSet={`
        ${sanityImageUrl(financing.banner, {
                        w: 488, auto: "format", q: 75, fit: "min",
                    })} 488w,
        ${sanityImageUrl(financing.banner, {
                        w: 616, auto: "format", q: 75, fit: "min",
                    })} 616w,
        ${sanityImageUrl(financing.banner, {
                        w: 744, auto: "format", q: 75, fit: "min",
                    })} 744w,
        ${sanityImageUrl(financing.banner, {
                        w: 976, auto: "format", q: 75, fit: "min",
                    })} 976w,
        ${sanityImageUrl(financing.banner, {
                        w: 1232, auto: "format", q: 75, fit: "min",
                    })} 1232w,
        ${sanityImageUrl(financing.banner, {
                        w: 1488, auto: "format", q: 75, fit: "min",
                    })} 1488w,
    `}
                    sizes="(max-width: 1023px) calc(100vw - 32px),
                    (max-width: 1536px) calc(50vw - 24px),
                    744px"
                    alt="Financing Available"
                    loading="lazy"
                    style={{aspectRatio: `${imgDimensions.width} / ${imgDimensions.height}`}}
                />
            </a>
        </div>
    );
}

export default FinancingBanner;
