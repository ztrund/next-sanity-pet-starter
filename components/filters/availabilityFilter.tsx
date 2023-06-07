import React, {ChangeEvent} from "react";

type HandleCheckboxChangeType = (
    event: ChangeEvent<HTMLInputElement>,
    filter: string[],
    setFilter: React.Dispatch<React.SetStateAction<string[]>>
) => void;

interface AvailabilityFilterProps {
    filter: string[];
    setFilter: React.Dispatch<React.SetStateAction<string[]>>;
    handleCheckboxChange: HandleCheckboxChangeType;
    id: string;
}

const AvailabilityFilter: React.FC<AvailabilityFilterProps> = ({filter, setFilter, handleCheckboxChange, id}) => {
    const values = ["", "Available", "Reserved", "Sold"];
    const labels = ["All Availability", "Available", "Reserved", "Sold"];

    return (
        <div className="flex flex-col">
            <div className="w-full text-center font-medium">Availability</div>
            <div className="flex flex-col gap-1">
                {values.map((value, index) => (
                    <label key={index}>
                        <input
                            id={"availabilityFilter-" + value + "-" + id}
                            type="checkbox"
                            value={value}
                            className="text-main-brand-color rounded-lg focus:ring-dark-accent"
                            checked={filter.includes(value)}
                            onChange={(e) => handleCheckboxChange(e, filter, setFilter)}
                        /> {labels[index]}
                    </label>
                ))}
            </div>
        </div>
    );
};

export default AvailabilityFilter;
