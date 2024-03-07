import React from 'react';
import { MdOutlineTag } from 'react-icons/md';

interface ITitleSectionProps {
    name?: string;
}

export const TitleSection: React.FC<ITitleSectionProps> = ({ name }) => {
    return (
        <>
            <div className="w-full text-white uppercase align-middle mb-15 text-xs leading-normal flex">
                <div className="text-white uppercase text-xs leading-normal"></div>
                <div className="h-px bg-gradient-to-r from-transparent via-red-500 to-red-500 flex-grow ml-5"></div>
            </div>
            <h2 className='flex items-center justify-center mt-4 font-mono tracking-widest uppercase gap-2 text-rose-900'><MdOutlineTag />..{name}</h2>
        </>
    );
};
