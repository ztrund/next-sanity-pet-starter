import React from 'react';
import {imageDimensionExtractor} from "../../helpers/imageDimensionExtractor";
import {Financing} from "../../types";
import {sanityImageUrl} from "../../lib/sanityImageUrl";

interface FinancingContainerProps {
    financing: Financing
    financingText: string
}

const FinancingContainer: React.FC<FinancingContainerProps> = ({financing, financingText}) => {

    // Render nothing if there's no logo
    if (!financing.logo) {
        return null;
    }

    const imgDimensions = imageDimensionExtractor(financing.logo.asset._ref);

    // If we couldn't extract dimensions, don't render the component
    if (!imgDimensions) {
        return null;
    }

    return (
        <div className="flex justify-center">
            <a href={financing.link} target="_blank" rel="noopener noreferrer"
               className="w-full gap-4 flex flex-col md:flex-row justify-center bg-light-shades drop-shadow-lg rounded-lg p-2 hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1">
                <div className="flex items-center justify-center overflow-hidden">
                    <img
                        src={sanityImageUrl(financing.logo, {h: 48, auto: "format", q: 75, fit: "min"})}
                        srcSet={`${sanityImageUrl(financing.logo, {h: 48, auto: "format", q: 75, dpr: 1, fit: "min"})} 1x,
                        ${sanityImageUrl(financing.logo, {h: 48, auto: "format", q: 75, dpr: 1.5, fit: "min"})} 1.5x,
                        ${sanityImageUrl(financing.logo, {h: 48, auto: "format", q: 75, dpr: 2, fit: "min"})} 2x`}
                        alt="Fiancing Logo"
                        loading="eager"
                        width={imgDimensions.width / imgDimensions.height * 48}
                        height="48"
                    />
                </div>
                {financing.text && (
                    <div className="flex items-center justify-center">
                        <div className="text-center text-md font-semibold overflow-clip"
                             dangerouslySetInnerHTML={{__html: financingText}}/>
                    </div>
                )}
            </a>
        </div>
    );
}

export default FinancingContainer;
