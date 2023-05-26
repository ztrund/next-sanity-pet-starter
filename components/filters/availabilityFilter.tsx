import React, { ChangeEvent } from "react";

type HandleCheckboxChangeType = (
    event: ChangeEvent<HTMLInputElement>,
    filter: string[],
    setFilter: React.Dispatch<React.SetStateAction<string[]>>
) => void;

interface AvailabilityFilterProps {
    filter: string[];
    setFilter: React.Dispatch<React.SetStateAction<string[]>>;
    handleCheckboxChange: HandleCheckboxChangeType;
}

const AvailabilityFilter: React.FC<AvailabilityFilterProps> = ({ filter, setFilter, handleCheckboxChange }) => {
    const values = ["", "Available", "Reserved", "Sold"];
    const labels = ["All Availability", "Available", "Reserved", "Sold"];

    return (
        <div className="flex flex-col">
            <label className="w-full text-center font-medium">Availability</label>
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

export default AvailabilityFilter;
