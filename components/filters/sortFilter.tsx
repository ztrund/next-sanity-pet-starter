import React, {ChangeEvent} from "react";

interface SortFilterProps {
    sortFilter: string;
    setSortFilter: React.Dispatch<React.SetStateAction<string>>;
    id: string;
}

const SortFilter: React.FC<SortFilterProps> = ({sortFilter, setSortFilter, id}) => {
    return (
        <div className="flex flex-col">
            <div className="w-full text-center font-medium">Sort</div>
            <select
                id={"sortFilter-" + id}
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
