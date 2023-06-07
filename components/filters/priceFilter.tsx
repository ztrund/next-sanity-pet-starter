import React, {ChangeEvent, useEffect, useState} from "react";

interface PriceFilterProps {
    minPrice: number;
    maxPrice: number;
    priceFilter: number[];
    setPriceFilter: React.Dispatch<React.SetStateAction<number[]>>;
    id: string;
}

const PriceFilter: React.FC<PriceFilterProps> = ({minPrice, maxPrice, priceFilter, setPriceFilter, id}) => {
    const [minVal, setMinVal] = useState(priceFilter[0]);
    const [maxVal, setMaxVal] = useState(priceFilter[1]);
    const [progressStyle, setProgressStyle] = useState({});

    const priceGap = (maxPrice - minPrice) / 10;

    useEffect(() => {
        const left = Math.max(0, ((minVal - minPrice) / (maxPrice - minPrice)) * 100);
        const right = Math.max(0, ((maxPrice - maxVal) / (maxPrice - minPrice)) * 100);

        setProgressStyle({
            left: `${left}%`,
            right: `${right}%`,
        });
    }, [minVal, maxVal, maxPrice, minPrice]);


    return (
        <div className="flex flex-col">
            <div className="w-full text-center font-medium">Price Range</div>
            <div className="flex flex-row justify-between">
                <label id={"labelMin-" + id} htmlFor={"priceFilter-Min-" + id} className="w-1/2 text-center">Min</label>
                <div className="w-2 text-center">-</div>
                <label id={"labelMax-" + id} htmlFor={"priceFilter-Max-" + id} className="w-1/2 text-center">Max</label>
            </div>
            <div className="flex flex-row justify-between pb-2">
                <input
                    id={"priceFilter-Min-" + id}
                    type="number"
                    className="rounded-lg w-1/2 text-center py-0 px-2 border-black focus:ring-dark-accent focus:border-dark-accent"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setMinVal(Number(e.target.value));
                    }}
                    onBlur={(e: ChangeEvent<HTMLInputElement>) => {
                        let newValue = Math.max(Number(e.target.value), minPrice);
                        if ((maxVal - newValue) < priceGap) {
                            newValue = Math.min(maxVal - priceGap, newValue);
                        }
                        setMinVal(newValue);
                        setPriceFilter([newValue, maxVal]);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            let newValue = Math.max(Number(e.currentTarget.value), minPrice);
                            if ((maxVal - newValue) < priceGap) {
                                newValue = Math.min(maxVal - priceGap, newValue);
                            }
                            setMinVal(newValue);
                            setPriceFilter([newValue, maxVal]);
                        }
                    }}
                    value={minVal}
                />
                <div className="w-2"></div>
                <input
                    id={"priceFilter-Max-" + id}
                    type="number"
                    className="rounded-lg w-1/2 text-center py-0 px-2 border-black focus:ring-dark-accent focus:border-dark-accent"
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setMaxVal(Number(e.target.value));
                    }}
                    onBlur={(e: ChangeEvent<HTMLInputElement>) => {
                        let newValue = Math.min(Number(e.target.value), maxPrice);
                        if ((newValue - minVal) < priceGap) {
                            newValue = Math.max(minVal + priceGap, newValue);
                        }
                        setMaxVal(newValue);
                        setPriceFilter([minVal, newValue]);
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            let newValue = Math.min(Number(e.currentTarget.value), maxPrice);
                            if ((newValue - minVal) < priceGap) {
                                newValue = Math.max(minVal + priceGap, newValue);
                            }
                            setMaxVal(newValue);
                            setPriceFilter([minVal, newValue]);
                        }
                    }}
                    value={maxVal}
                />
            </div>
            <div className="my-2">
                <div className="slider h-2 rounded-lg bg-dark-accent relative">
                    <div className="progress h-2 absolute rounded-lg bg-main-brand-color" style={progressStyle}/>
                </div>
                <div className="relative">
                    <input
                        aria-labelledby={"labelMin-" + id}
                        type="range"
                        min={minPrice}
                        max={maxPrice}
                        value={minVal}
                        className="bg-transparent absolute w-full -top-2 h-2 appearance-none pointer-events-none"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            let newValue = Number(e.target.value);
                            if ((maxVal - newValue) < priceGap) {
                                newValue = maxVal - priceGap;
                            }
                            setMinVal(newValue);
                            setPriceFilter([newValue, maxVal]);
                        }}
                    />
                    <input
                        aria-labelledby={"labelMax-" + id}
                        type="range"
                        min={minPrice}
                        max={maxPrice}
                        value={maxVal}
                        className="bg-transparent absolute w-full -top-2 h-2 appearance-none pointer-events-none"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            let newValue = Number(e.target.value);
                            if ((newValue - minVal) < priceGap) {
                                newValue = minVal + priceGap;
                            }
                            setMaxVal(newValue);
                            setPriceFilter([minVal, newValue]);
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default PriceFilter;
