import React from "react";
import {ChevronLeftIcon} from "./svgIcons";

type PaginationProps = {
    currentPage: number,
    setCurrentPage: (page: number) => void,
    totalPages: number,
};

export const Pagination: React.FC<PaginationProps> = ({currentPage, setCurrentPage, totalPages}) => {
    const maxItems = 7;  // Maximum items to show at a time including numbers and ...

    let start = currentPage - 1; // Start from the second page
    let end = start + 2; // Up to the second last page

    if (totalPages <= maxItems) {
        start = 1;
        end = totalPages;
    } else if (currentPage <= 4) {
        start = 1;
        end = 5;
    } else if (currentPage > totalPages - 4) {
        start = totalPages - 4;
        end = totalPages;
    }

    const handleClickNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    }

    const handleClickPrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    return (
        <div className={`flex flex-row w-full justify-center gap-2`}>
            <button onClick={handleClickPrev} disabled={currentPage === 1}
                    className={"h-12 w-12 flex justify-center items-center bg-light-shades shadow-lg rounded-lg stroke-black"}>
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon/>
            </button>
            <div className={`flex flex-row justify-center bg-light-shades shadow-lg rounded-lg w-fit overflow-hidden`}>
                {start > 1 && <button
                    key={1}
                    onClick={() => setCurrentPage(1)}
                    className={`h-12 w-12 ${1 === currentPage && 'bg-main-brand-color text-white'} font-bold text-lg`}
                >
                    {1}
                </button>}
                {start > 2 && <button className={"h-12 w-12"} disabled>...</button>}
                {Array.from({length: end - start + 1}, (_, i) => start + i).map((num) => (
                    <button
                        key={num}
                        onClick={() => setCurrentPage(num)}
                        className={`h-12 w-12 ${num === currentPage && 'bg-main-brand-color text-white'} font-bold text-lg`}
                    >
                        {num}
                    </button>
                ))}
                {end < totalPages - 1 && <button className={"h-12 w-12"} disabled>...</button>}
                {end < totalPages && <button
                    key={totalPages}
                    onClick={() => setCurrentPage(totalPages)}
                    className={`h-12 w-12 ${totalPages === currentPage && 'bg-main-brand-color text-white'} font-bold text-lg`}
                >
                    {totalPages}
                </button>}
            </div>
            <button onClick={handleClickNext} disabled={currentPage === totalPages}
                    className={"h-12 w-12 flex justify-center items-center bg-light-shades shadow-lg rounded-lg stroke-black"}>
                <span className="sr-only">Next</span>
                <div className="rotate-180">
                    <ChevronLeftIcon/>
                </div>
            </button>
        </div>
    )
}