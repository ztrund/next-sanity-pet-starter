import React, {ChangeEvent} from "react";

interface NameFilterProps {
    searchTerm: string;
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const NameFilter: React.FC<NameFilterProps> = ({searchTerm, setSearchTerm}) => {
    return (
        <div className="flex flex-col border-b md:border-b-0 border-black pb-2">
            <label className="w-full text-center font-medium" id="searchByNameMobile">Name</label>
            <input
                type="text"
                aria-labelledby="searchByNameMobile"
                className="rounded-lg w-full py-0 px-2 border-black focus:ring-dark-accent focus:border-dark-accent"
                placeholder="Search by name"
                onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                value={searchTerm}
            />
        </div>
    );
};

export default NameFilter;
