import React, {ChangeEvent} from "react";

interface NameFilterProps {
    searchTerm: string;
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
    id: string;
}

const NameFilter: React.FC<NameFilterProps> = ({searchTerm, setSearchTerm, id}) => {
    const inputId = `nameFilter-${id}`;
    return (
        <div className="flex flex-col">
            <label htmlFor={inputId} className="w-full text-center font-medium">Name</label>
            <input
                id={inputId}
                type="text"
                className="rounded-lg w-full py-0 px-2 border-black focus:ring-dark-accent focus:border-dark-accent"
                placeholder="Search by name"
                onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
                value={searchTerm}
            />
        </div>
    );
};

export default NameFilter;
