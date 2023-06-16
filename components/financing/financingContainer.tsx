import {Financing} from "../../types";
import React from "react";

const FinancingContainer = ({financing}: { financing: Financing }) => {

    // Render nothing if there's no logo
    if (!financing.logo && !financing.text) {
        return null;
    }

    return (
        <a href={financing.link} target="_blank" rel="noopener noreferrer"
           className={`w-full h-32 md:h-16 gap-4 flex flex-col md:flex-row justify-center bg-light-shades drop-shadow-lg rounded-lg p-2 ${financing.link && 'hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1'}`}>
            {financing.logo && (
                <div className="flex items-center justify-center overflow-hidden">
                    <link
                        rel="preload"
                        as="image"
                        href={financing.logo.imageUrl}
                        imageSrcSet={financing.logo.srcSet}
                    />
                    <img
                        src={financing.logo.imageUrl}
                        srcSet={financing.logo.srcSet}
                        alt="Fiancing Logo"
                        loading="eager"
                        width={financing.logo.width}
                        height={financing.logo.height}
                    />
                </div>
            )}
            {financing.text && (
                <div className="flex items-center justify-center">
                    <div className="text-center text-md font-semibold overflow-clip"
                         dangerouslySetInnerHTML={{__html: financing.sanitizedText}}/>
                </div>
            )}
        </a>
    );
}

export default FinancingContainer;
