import React, {ChangeEvent} from "react";

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
    id: string;
}

const ColorFilter: React.FC<ColorFilterProps> = ({filter, setFilter, handleCheckboxChange, uniqueColors, id}) => {
    const values = ["", ...uniqueColors];
    const labels = ["All Colors", ...uniqueColors];

    return (
        <div className="flex flex-col">
            <div className="w-full text-center font-medium">Color</div>
            <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-1">
                {values.map((value, index) => (
                    <label key={index}>
                        <input
                            id={"colorFilter-" + value + "-" + id}
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

export default ColorFilter;
