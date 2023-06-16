import {Financing} from "../../types";
import React from "react";

interface FinancingBannerProps {
    financing: Financing
}

const FinancingBanner: React.FC<FinancingBannerProps> = ({financing}) => {

    // Render nothing if there's no banner
    if (!financing.banner) {
        return null;
    }

    return (
        <a href={financing.link} target="_blank" rel="noopener noreferrer" className={`h-min p-0 bg-light-shades shadow-lg rounded-lg overflow-hidden ${financing.link && 'hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1'}`}>
            <img
                src={financing.banner.imageUrl}
                srcSet={financing.banner.srcSet}
                sizes={financing.banner.sizes}
                alt="Financing Available"
                loading="lazy"
                style={{aspectRatio: `${financing.banner.width} / ${financing.banner.height}`}}
            />
        </a>
    );
}

export default FinancingBanner;
