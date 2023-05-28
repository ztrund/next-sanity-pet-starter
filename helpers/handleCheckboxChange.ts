import React from "react";

export const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    filter: string[],
    setFilter: React.Dispatch<React.SetStateAction<string[]>>
) => {
    const value = event.target.value;

    if (event.target.checked) {
        if (value === '') {
            // If 'All' is checked, clear the other checkboxes
            setFilter(['']);
        } else {
            // If any other checkbox is checked, uncheck 'All'
            setFilter((prev) => [...prev.filter((item) => item !== ''), value]);
        }
    } else {
        // If a checkbox is unchecked, remove its value from the filter array
        setFilter((prev) => prev.filter((item) => item !== value));
    }
};