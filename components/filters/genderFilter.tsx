import React, { ChangeEvent } from "react";

type HandleCheckboxChangeType = (
    event: ChangeEvent<HTMLInputElement>,
    filter: string[],
    setFilter: React.Dispatch<React.SetStateAction<string[]>>
) => void;

interface GenderFilterProps {
    filter: string[];
    setFilter: React.Dispatch<React.SetStateAction<string[]>>;
    handleCheckboxChange: HandleCheckboxChangeType;
}

const GenderFilter: React.FC<GenderFilterProps> = ({ filter, setFilter, handleCheckboxChange }) => {
    const values = ["", "Male", "Female"];
    const labels = ["All Genders", "Male", "Female"];

    return (
        <div className="flex flex-col w-full md:w-1/2 lg:w-full px-1 lg:px-0 border-black border-b md:border-b-0 pb-2 md:pb-0 lg:border-b lg:pb-2">
            <label className="w-full text-center font-medium">Gender</label>
            {values.map((value, index) => (
                <label key={index}>
                    <input
                        type="checkbox"
                        value={value}
                        className="text-main-brand-color rounded-lg focus:ring-dark-accent"
                        checked={filter.includes(value)}
                        onChange={(e) => handleCheckboxChange(e, filter, setFilter)}
                    /> {labels[index]}
                </label>
            ))}
        </div>
    );
};

export default GenderFilter;
