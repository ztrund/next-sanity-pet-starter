import React, {ChangeEvent} from "react";

interface PriceFilterProps {
    priceFilter: number[];
    setPriceFilter: React.Dispatch<React.SetStateAction<number[]>>;
}

const PriceFilter: React.FC<PriceFilterProps> = ({priceFilter, setPriceFilter}) => {
    return (
        <div className="flex flex-col border-y border-black pb-2">
            <label className="w-full text-center font-medium">Price Range</label>
            <div className="flex flex-row justify-between">
                <label className="w-1/2 text-center" id="minPriceMobile">Min</label>
                <label className="w-2 text-center">-</label>
                <label className="w-1/2 text-center" id="maxPriceMobile">Max</label>
            </div>
            <div className="flex flex-row justify-between">
                <input
                    type="number"
                    aria-labelledby="minPriceMobile"
                    className="rounded-lg w-1/2 text-center py-0 px-2 border-black focus:ring-dark-accent focus:border-dark-accent"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPriceFilter([Number(e.target.value), priceFilter[1]])}
                    value={priceFilter[0]}
                />
                <label className="w-2"></label>
                <input
                    type="number"
                    aria-labelledby="maxPriceMobile"
                    className="rounded-lg w-1/2 text-center py-0 px-2 border-black focus:ring-dark-accent focus:border-dark-accent"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setPriceFilter([priceFilter[0], Number(e.target.value)])}
                    value={priceFilter[1]}
                />
            </div>
        </div>
    );
};

export default PriceFilter;
