import React from "react";

export const ChevronLeftIcon: React.FC = () => (
    <svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" className="h-6">
        <polyline points="15 18 9 12 15 6"/>
    </svg>
);

export const CloseIcon: React.FC = () => (
    <svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" className="h-6">
        <line x1="18" x2="6" y1="6" y2="18"/>
        <line x1="6" x2="18" y1="6" y2="18"/>
    </svg>
);

export const MenuIcon: React.FC = () => (
    <svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" className="h-6">
        <line x1="4" x2="20" y1="12" y2="12"/>
        <line x1="4" x2="20" y1="6" y2="6"/>
        <line x1="4" x2="20" y1="18" y2="18"/>
    </svg>
);

export const FilterOrCloseIcon: React.FC<{ isOpen: boolean }> = ({isOpen}) => (
    <svg viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
         fill="none" className="h-6">
        {isOpen ? <>
            <line x1="18" x2="6" y1="6" y2="18"/>
            <line x1="6" x2="18" y1="6" y2="18"/>
        </> : <>
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>
        </>}
    </svg>
);

export const CustomSVGIcon: React.FC<{ viewBox: string, path: string }> = ({viewBox, path}) => (
    <svg viewBox={viewBox} className="h-4">
        <path d={path}/>
    </svg>
);