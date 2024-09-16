// import React, { useState } from 'react';
// import { useNavigate ,Link} from 'react-router-dom';
// import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";

// const DropDownUnits = ({ unitName,unit_ID, lessons }) => {
//   const [isOpen, setIsOpen] = useState(false);  // State for dropdown open/close
//   const navigate = useNavigate();

//   const handleDropdownToggle = () => {
//     setIsOpen(!isOpen);  // Toggle the dropdown
//   };

//   const handleLessonClick = (lessonPath) => {
//     console.log(lessonPath);
//     navigate(lessonPath);
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
//             <li 
//               key={index} 
//               className="lesson-item text-xl text-mainColor cursor-pointer hover:text-red-500 pl-4"
//               onClick={() => handleLessonClick(lesson.path)}
//             >
//               {lesson.name}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default DropDownUnits;



import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowBack, IoIosArrowDown } from "react-icons/io";

const DropDownUnits = ({ unitName, unit_ID, lessons }) => {
  const [isOpen, setIsOpen] = useState(false);  // State for dropdown open/close

  const handleDropdownToggle = () => {
    setIsOpen(!isOpen);  // Toggle the dropdown
  };

  return (
    <div className="dropdown-container w-full max-w-md p-4 border rounded-lg bg-white shadow-lg mb-4">
      {/* Unit Box (Clickable to toggle dropdown) */}
      <div 
        className="dropdown-header flex justify-between items-center cursor-pointer p-3 rounded-md" 
        onClick={handleDropdownToggle}
      >
        <span className="text-xl font-semibold text-mainColor">{unitName}</span>
        <span>
        {isOpen 
          ? <IoIosArrowDown className="text-3xl text-mainColor" />
          : <IoIosArrowBack className="text-3xl text-mainColor" />}
        </span>
      </div>

      {/* Lessons List (Visible only when dropdown is open) */}
      {isOpen && (
        <ul className="lessons-list mt-3 space-y-2">
          {lessons.map((lesson, index) => (
            <li key={index} className="lesson-item text-xl text-mainColor pl-4">
              {/* Use Link to navigate to lesson page */}
              <Link 
                to={lesson.path} 
                className="hover:text-red-500"
              >
                {lesson.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DropDownUnits;
