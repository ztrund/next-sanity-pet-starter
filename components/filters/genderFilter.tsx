import React, {ChangeEvent} from "react";

type HandleCheckboxChangeType = (
    event: ChangeEvent<HTMLInputElement>,
    filter: string[],
    setFilter: React.Dispatch<React.SetStateAction<string[]>>
) => void;

interface GenderFilterProps {
    filter: string[];
    setFilter: React.Dispatch<React.SetStateAction<string[]>>;
    handleCheckboxChange: HandleCheckboxChangeType;
    id: string;
    gridStyle?: string;
}

const GenderFilter: React.FC<GenderFilterProps> = ({
                                                       filter,
                                                       setFilter,
                                                       handleCheckboxChange,
                                                       id,
                                                       gridStyle = "grid-cols-1"
                                                   }) => {
    const values = ["", "Male", "Female"];
    const labels = ["All Genders", "Male", "Female"];

    return (
        <div className="flex flex-col">
            <div className="w-full text-center font-medium">Gender</div>
            <div className={`grid ${gridStyle} gap-1`}>
                {values.map((value, index) => (
                    <label key={index}>
                        <input
                            id={"genderFilter-" + value + "-" + id}
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

export default GenderFilter;
