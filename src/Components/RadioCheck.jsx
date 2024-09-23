import React, { useState } from 'react';

const RadioCheck = ({ options, check }) => {
       const [selectedOption, setSelectedOption] = useState('');

       const handleOptionChange = (value) => {
              setSelectedOption(value);
              check(value); // Pass the selected option to the parent or external logic
       };

       return (
              <>
                     {options.map((option) => (
                            <div key={option.value} className="inline-block relative cursor-pointer">
                                   <input
                                          name="radio-group"
                                          id={option.value}
                                          className="radio-button__input absolute opacity-0 w-0 h-0"
                                          type="radio"
                                          checked={selectedOption === option.value}
                                          onChange={() => handleOptionChange(option.value)} // Call handler on change
                                   />
                                   <label
                                          htmlFor={option.value}
                                          className={`radio-button__label inline-block pl-7 mb-2.5 relative text-2xl font-medium ${selectedOption === option.value ? 'text-[#D01025]' : 'text-thirdColor'
                                                 } cursor-pointer transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]`}
                                   >
                                          <span
                                                 className={`radio-button__custom absolute top-1/2 left-0 transform -translate-y-1/2 w-5 h-5 rounded-full border-2 border-gray-600 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${selectedOption === option.value
                                                        ? 'transform -translate-y-1/2 scale-90 border-5 border-[#D01025] text-[#D01025]'
                                                        : ''
                                                        } hover:transform hover:scale-110 hover:border-[#D01025] hover:shadow-[0_0_10px_#D01025]`}
                                          ></span>
                                          {option.label}
                                   </label>
                            </div>
                     ))}
              </>
       );
};

export default RadioCheck;
