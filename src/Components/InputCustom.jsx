import React, { useState } from 'react'
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { LuUpload } from "react-icons/lu";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FaLink } from "react-icons/fa6";




const InputCustom = ({ type, required = true, borderColor = "none", placeholder, value, readonly = false, onChange, onClick, paddinRight = 'pr-11', upload = false, source }) => {
       const [show, setShow] = useState(false)
       const [currentDay, setCurrentDay] = useState(new Date());

       const formattedDate = currentDay.toISOString().split('T')[0]; // Format as YYYY-MM-DD

       if (type === "password") {
              return (<>
                     <div className="relative w-full">
                            <input type={show ? "text" : "password"} placeholder={placeholder} className={`w-full border-2 rounded-2xl outline-none px-2 py-3 text-2xl font-normal text-thirdColor border-${borderColor}`} value={value}
                                   onChange={onChange} required={required} />
                            {show ? <IoMdEye className='absolute top-4 right-2 text-2xl text-mainColor cursor-pointer' onClick={() => { setShow(!show) }} /> : <IoMdEyeOff className='absolute top-4 right-2 text-2xl text-mainColor cursor-pointer' onClick={() => setShow(!show)} />}
                     </div>
              </>)
       }
       if (type === "date") {
              return (
                     <>
                            <input
                                   type="date"
                                   placeholder={placeholder}
                                   className={`w-full border-2 rounded-2xl border-${borderColor} 
          outline-none px-2 py-3 text-2xl font-normal text-thirdColor`}
                                   value={value}
                                   onChange={onChange}
                                   min={formattedDate}  // Use the correctly formatted date
                                   required={required}
                            />
                     </>
              )
       }
       if (type === "dateEdit") {
              return (
                     <>
                            <input
                                   type="date"
                                   placeholder={placeholder}
                                   className={`w-full border-2 rounded-2xl border-${borderColor} 
          outline-none px-2 py-3 text-2xl font-normal text-thirdColor`}
                                   value={value}
                                   onChange={onChange}
                                   required={required}
                            />
                     </>
              )
       }
       return (
              <>
                     <div className="relative w-full">

                            <input type={type}
                                   placeholder={placeholder}
                                   className={`w-full border-2 rounded-2xl border-${borderColor} 
                       outline-none px-2 py-3 ${paddinRight} text-2xl font-normal eleValueInput ${upload ? "text-mainColor cursor-pointer pr-10" : "text-thirdColor"}`}
                                   value={value}
                                   onChange={onChange}
                                   onClick={onClick}
                                   readOnly={readonly}
                                   required={required} />
                            {upload ? <LuUpload className='absolute right-4 top-1/3 text-mainColor text-2xl cursor-pointer' /> : ''}
                            {source == 'external' ? <FaExternalLinkAlt className='absolute right-4 top-1/3 text-mainColor text-2xl cursor-pointer' /> :
                                   source == 'embedded' ? <FaLink className='absolute right-4 top-1/3 text-mainColor text-2xl cursor-pointer' /> :
                                          source == 'upload' ? <LuUpload className='absolute right-4 top-1/3 text-mainColor text-2xl cursor-pointer' />
                                                 : ''}
                            {/* external, embedded, upload */}
                     </div>


              </>

       )
}

export default InputCustom