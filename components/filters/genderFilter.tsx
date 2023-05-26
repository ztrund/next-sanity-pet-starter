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
        <div className="flex flex-col">
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
