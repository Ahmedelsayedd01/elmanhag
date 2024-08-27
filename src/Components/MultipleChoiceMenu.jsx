import React, { forwardRef } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { FaTimes } from 'react-icons/fa';

const MultipleChoiceMenu = forwardRef(({
    iconMenu,
    handleOpen,
    selectedOptions = [], // Array to hold selected options
    openMenu,
    handleSelectOption, // Function to handle option selection
    handleRemoveOption, // Function to handle option removal
    options = [],
}, ref) => {

    return (
        <>
            <div className="w-full mx-auto relative" ref={ref}>
                <button
                    className="flex items-center justify-between w-full h-full px-5 py-3 border-2 rounded-2xl outline-none font-medium text-thirdColor text-center bg-secoundColor"
                    onClick={handleOpen}
                >
                    <div className="text-mainColor text-2xl">{iconMenu}</div>
                    <div className="flex flex-wrap gap-2 items-center">
                        {selectedOptions.length > 0 ? selectedOptions.map((option, index) => (
                            <div key={index} className="flex items-center bg-gray-200 text-mainColor px-3 py-1 rounded-full">
                                {option}
                                <FaTimes className="ml-2 text-sm cursor-pointer" onClick={() => handleRemoveOption(option)} />
                            </div>
                        )) : <span>Select Options</span>}
                    </div>
                    <IoIosArrowDown className={`${openMenu ? "rotate-180" : "rotate-0"} text-mainColor text-xl transition-all duration-300`} />
                </button>
                <div className={`${openMenu ? "block" : "hidden"} scrollSec absolute w-full min-h-10 max-h-32 top-14 bg-white rounded-xl drop-shadow-sm overflow-y-scroll z-10`}>
                    {options.map((option) => (
                        <div
                            key={option.id}
                            className={`flex items-center py-1 gap-1 justify-center text-xl font-medium text-mainColor hover:cursor-pointer hover:bg-mainColor hover:text-secoundColor transition-all duration-300 ${selectedOptions.includes(option.name) ? 'bg-mainColor text-secoundColor' : ''}`}
                            onClick={() => handleSelectOption(option.name)}
                        >
                            {option.name}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
});

export default MultipleChoiceMenu;

