import React, { forwardRef } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

// const DropDownMenu = forwardRef(({ iconMenu, handleOpen, stateoption, openMenu, handleOpenOption, options }, ref)) => {
const DropDownMenu = forwardRef(({
       iconMenu,
       iconDirection = false,
       handleOpen,
       stateoption,
       openMenu,
       handleOpenOption,
       options = [], // Default to an empty array
}, ref) => {

       // console.log({ ref, handleOpen, stateoption, openMenu, options });

       return (
              <>
                     <div className="w-full mx-auto relative" ref={ref}>
                            <button type='button'
                                   className={`flex ${iconDirection ? 'flex-row-reverse' : 'flex-row'} items-center justify-between w-full h-full px-5 py-3  border-2 rounded-2xl outline-none font-medium text-thirdColor text-center bg-secoundColor`}
                                   onClick={handleOpen}
                            >
                                   <div className="text-mainColor text-2xl">{iconMenu}</div>
                                   <span className='eleValueDropDown'>{stateoption}</span>
                                   <IoIosArrowDown className={`${openMenu ? "rotate-180" : "rotate-0"} text-mainColor text-xl transition-all duration-300`} />
                            </button>
                            <div className={`${openMenu ? "block" : "hidden"} scrollSec absolute w-full min-h-10 max-h-32 top-14 bg-white rounded-xl drop-shadow-sm overflow-y-scroll z-10`}>
                                   {options.map((option, index) => (
                                          <div
                                                 key={option?.id || index}
                                                 className="flex items-center py-1 gap-1 justify-center text-xl font-medium text-mainColor hover:cursor-pointer hover:bg-mainColor hover:text-secoundColor transition-all duration-300"
                                                 onClick={handleOpenOption}
                                          >
                                                 {option.name}
                                                 {option.job}
                                                 <input type="hidden" value={option?.id || option.name || option.job} className='inputVal' />
                                          </div>
                                   ))}
                            </div>

                     </div >

              </>
       );
});
export default DropDownMenu;
