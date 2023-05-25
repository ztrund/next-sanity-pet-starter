import React, {ChangeEvent} from "react";

interface SortFilterProps {
    sortFilter: string;
    setSortFilter: React.Dispatch<React.SetStateAction<string>>;
}

const SortFilter: React.FC<SortFilterProps> = ({sortFilter, setSortFilter}) => {
    return (
        <div className="flex flex-col md:w-1/2 lg:w-full md:pl-1 lg:pl-0 lg:border-t border-black pb-2">
            <label className="w-full text-center font-medium">Sort</label>
            <select
                className="rounded-lg w-full py-0 px-2 border-black focus:ring-dark-accent focus:border-dark-accent"
                onChange={(e: ChangeEvent<HTMLSelectElement>) => setSortFilter(e.target.value)}
                value={sortFilter}
            >
                <option value="availability">Availability</option>
                <option value="price">Price</option>
                <option value="name">Name</option>
            </select>
        </div>
    );
};

export default SortFilter;
