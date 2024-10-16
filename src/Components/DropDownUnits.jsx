// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";

// const DropDownUnits = ({ unitName, unit_ID, lessons }) => {
//   const [isOpen, setIsOpen] = useState(false);  // State for dropdown open/close

//   const handleDropdownToggle = () => {
//     setIsOpen(!isOpen);  // Toggle the dropdown
//   };

//   return (
//     <div className="dropdown-container w-full max-w-md p-4 border rounded-lg bg-white shadow-lg mb-4">
//       {/* Unit Box (Clickable to toggle dropdown) */}
//       <div 
//         className="dropdown-header flex justify-between items-center cursor-pointer p-3 rounded-md" 
//         onClick={handleDropdownToggle}
//       >
//         <span className="text-xl font-semibold text-mainColor">{unitName}</span>
//         <span>
//         {isOpen 
//           ? <IoIosArrowDown className="text-3xl text-mainColor" />
//           : <IoIosArrowBack className="text-3xl text-mainColor" />}
//         </span>
//       </div>

//       {/* Lessons List (Visible only when dropdown is open) */}
//       {isOpen && (
//         <ul className="lessons-list mt-3 space-y-2">
//           {lessons.map((lesson, index) => (
//             <li key={index} className="lesson-item text-xl text-mainColor pl-4">
//               {/* Use Link to navigate to lesson page */}
//               <Link 
//                 to={lesson.path} 
//                 className="hover:text-red-500"
//               >
//                 {lesson.name}
//               </Link>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default DropDownUnits;

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { PiVideoFill } from "react-icons/pi";

const DropDownUnits = ({ unit,lessons, onClick, isOpen }) => {

   // Sort lessons based on their order
   const sortedLessons = [...lessons].sort((a, b) => a.order - b.order);
   useEffect(() => {
    console.log(sortedLessons)
  }, []);
   
  return (
    <div className="relative mb-6">
      {/* Unit Box */}
      <div
        className="bg-white border rounded-lg shadow-lg cursor-pointer"
        style={{ minHeight: '60px' }} // Use minHeight instead of fixed height
        onClick={onClick}
      >
        <div className="flex justify-between items-center p-4">
          <span className="text-lg font-semibold whitespace-normal break-words text-mainColor">
            {unit.name}
          </span>
          <span>
            {isOpen ? (
              <IoIosArrowUp className="text-xl text-mainColor" />
            ) : (
              <IoIosArrowDown className="text-xl text-mainColor" />
            )}
          </span>
        </div>
      </div>
      {/* Lessons List */}
      {isOpen && (   
          <div className="bg-gray-100 border rounded-lg w-full">
            {sortedLessons.map((lesson, index) => (
              <div key={index} className="flex items-center gap-3">
                {/* Dot */}
                <div className="text-mainColor text-2xl mr-2"><PiVideoFill/></div>
                {/* Lesson Name */}
                <Link
                  to={lesson.path}
                  className="text-mainColor text-lg font-bold hover:underline"
                >
                  {lesson.name}
                </Link>
              </div>
            ))}
          </div>
        )}
    </div>
  );
};

export default DropDownUnits;
