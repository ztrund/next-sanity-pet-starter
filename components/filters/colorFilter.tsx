import React, { ChangeEvent } from "react";

type HandleCheckboxChangeType = (
    event: ChangeEvent<HTMLInputElement>,
    filter: string[],
    setFilter: React.Dispatch<React.SetStateAction<string[]>>
) => void;

interface ColorFilterProps {
    filter: string[];
    setFilter: React.Dispatch<React.SetStateAction<string[]>>;
    handleCheckboxChange: HandleCheckboxChangeType;
    uniqueColors: string[];
}

const ColorFilter: React.FC<ColorFilterProps> = ({ filter, setFilter, handleCheckboxChange, uniqueColors }) => {
    return (
        <div className="flex flex-col w-1/2 lg:w-full px-1 lg:px-0 border-black border-l md:border-l-0">
            <label className="w-full text-center font-medium">Color</label>
            <div className="grid md:grid-cols-2 lg:grid-cols-1">
                <label>
                    <input
                        type="checkbox"
                        value=""
                        className="text-main-brand-color rounded-lg focus:ring-dark-accent"
                        checked={filter.includes('')}
                        onChange={(e) => handleCheckboxChange(e, filter, setFilter)}
                    /> All Colors
                </label>
                {uniqueColors.map((color, index) => (
                    <label key={index}>
                        <input
                            type="checkbox"
                            value={color}
                            className="text-main-brand-color rounded-lg focus:ring-dark-accent"
                            checked={filter.includes(color)}
                            onChange={(e) => handleCheckboxChange(e, filter, setFilter)}
                        /> {color}
                    </label>
                ))}
            </div>
        </div>
    );
};

export default ColorFilter;
