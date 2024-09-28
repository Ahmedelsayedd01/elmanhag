import React from 'react'
import SoonIcon from '../../../Components/SoonIcon'

const DutiesPage = () => {
       return (
              <>

              <div className='flex justify-center items-center flex-col'>
                      <div className='w-full flex justify-center items-center'>
                             <SoonIcon/>
                     </div>
                            <h1 className='text-center font-semibold text-mainColor text-xl md:text-3xl lg:text-4xl mt-4'>
                            قريباً سوف يتم افتتاح هذا القسم
                            </h1> 



              </div>
              </>
       )
}

export default DutiesPage

// import React, { useState } from 'react';
// import { LuCheck } from "react-icons/lu";
// import { LuX } from "react-icons/lu";

// const questions = [
//   {
//     id: 1,
//     questionText: "ما هي عاصمة فرنسا؟",
//     choices: ["برلين", "مدريد", "باريس", "لشبونة"],
//     image: "https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg", // Replace with your image URL
//   },
//   {
//     id: 2,
//     questionText: "أي كوكب يُعرف بالكوكب الأحمر؟",
//     choices: ["الأرض", "المريخ", "المشتري", "زحل"],
//     image: "https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg", // Replace with your image URL
//   },
//   {
//     id: 3,
//     questionText: "ما هو أكبر محيط على الأرض؟",
//     choices: ["المحيط الأطلسي", "المحيط الهندي", "المحيط القطبي", "المحيط الهادئ"],
//     image: "https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg", // Replace with your image URL
//   },
// ];

// const trueFalseQuestion = {
//   questionText: "هل الأرض كروية؟", // Sample True/False question
// };

// const DutiesPage = () => {
//   // const [selectedAnswers, setSelectedAnswers] = useState({});
//   const [trueFalseAnswer, setTrueFalseAnswer] = useState(null); // State to hold the True/False answer
//   const [expandedAnswer, setExpandedAnswer] = useState(null); // State for expanded answer

//   const handleAnswerChange = (questionId, choice) => {
//     setSelectedAnswers((prev) => ({
//       ...prev,
//       [questionId]: choice,
//     }));
//   };

//   // Handle the True/False answer selection
//   const handleTrueFalseClick = (answer) => {
//     setTrueFalseAnswer(answer);
//     setExpandedAnswer(answer);
//   };

//   const initialOptions1 = ['Answer1', 'Answer2', 'Correct Answer']; // Initial options for first blank
//   const initialOptions2 = ['OptionA', 'OptionB', 'Correct Option']; // Initial options for second blank
//   // Initial options for blanks (in Arabic)
//   const initialOptions = ['الإجابة الصحيحة', 'اختيار آخر', 'اختيار ثالث', 'جواب آخر'];
  
//   // State for tracking selected answers for each blank
//   const [selectedAnswers, setSelectedAnswers] = useState({
//     blank1: null,
//     blank2: null,
//     blank3: null,
//   });

//   // State for available options (filtered after selection)
//   const [availableOptions, setAvailableOptions] = useState(initialOptions);

//   // State to show dropdown for each blank
//   const [showDropdown, setShowDropdown] = useState({
//     blank1: false,
//     blank2: false,
//     blank3: false,
//   });

//   // Handle answer selection and removal from list
//   const handleSelectAnswer = (blankKey, answer) => {
//     setSelectedAnswers((prev) => ({ ...prev, [blankKey]: answer }));
//     setShowDropdown((prev) => ({ ...prev, [blankKey]: false }));

//     // Remove the selected answer from available options
//     setAvailableOptions((prev) => prev.filter((option) => option !== answer));
//   };
//   return (
//     <>
//     <div className="mcq-container flex flex-col gap-10 p-5 md:p-10 lg:p-20">
//       {questions.map((question) => (
//         <div key={question.id} className="question flex flex-col md:flex-row justify-between items-center sm:items-start">

//           <div className="question-content flex flex-col md:w-2/3">
//             <div className="question-text">
//               <h4 className='text-lg md:text-2xl font-semibold'>{question.questionText}</h4>
//               <div className="choices flex flex-col gap-4 mt-5 text-lg md:text-xl">
//                 {question.choices.map((choice, index) => (
//                   <label key={index} className="choice flex items-center cursor-pointer">
//                     <input
//                       type="radio"
//                       name={`question-${question.id}`}
//                       value={choice}
//                       checked={selectedAnswers[question.id] === choice}
//                       onChange={() => handleAnswerChange(question.id, choice)}
//                       className="hidden"
//                     />
//                     <span
//                       className={`flex items-center justify-center w-6 h-6 border-2 rounded-full mr-2 transition-all duration-200 ease-in-out ${
//                         selectedAnswers[question.id] === choice
//                           ? 'bg-red-500 border-red-500'
//                           : 'border-gray-300'
//                       }`}
//                     >
//                       {selectedAnswers[question.id] === choice && (
//                         <span className="w-3 h-3 bg-white rounded-full"></span>
//                       )}
//                     </span>
//                     {choice}
//                   </label>
//                 ))}
//               </div>
//             </div>
//           </div>

//           <div className="image-container mt-5 md:mt-0 md:ml-5">
//             <img 
//               src={question.image} 
//               alt={`Image for ${question.questionText}`} 
//               className="question-image w-full h-48 md:h-64 object-cover"
//             />
//           </div>

//         </div>
//       ))}

//       {/* True/False Question Section */}
//       <div className="true-false-question mt-10 p-5 rounded">
//         <h4 className="text-lg md:text-2xl font-semibold">{trueFalseQuestion.questionText}</h4>
//         <div className="true-false-options flex justify-between mt-4 w-1/2">
//           <div 
//             className={`cursor-pointer flex justify-center items-center h-[200px] rounded-r-[16px] rounded-l-none shadow-lg flex-1 text-center py-4 rounded transition-all duration-300 ease-in-out ${
//               trueFalseAnswer === true ? 'bg-green-500 text-white scale-110 shadow-lg' : 'bg-green-500'
//             }`} 
//             onClick={() => handleTrueFalseClick(true)}
//           >
//             <LuCheck size={64} color='white' className='font-bold'/>
//             {/* <p>صحيح</p> */}
//           </div>
//           <div 
//             className={`cursor-pointer flex justify-center items-center h-[200px] rounded-l-[16px] rounded-l-none shadow-lg flex-1 text-center py-4 rounded transition-all duration-300 ease-in-out ${
//               trueFalseAnswer === false ? 'bg-red-500 text-white scale-110 shadow-lg' : 'bg-red-500'
//             }`} 
//             onClick={() => handleTrueFalseClick(false)}
//           >
//             <LuX size={64} color='white' className='font-bold'/>
//             {/* <p>خطأ</p> */}
//           </div>
//         </div>
//       </div>

//       <div className="selected-answers mt-10">
//         <h3 className="text-xl font-semibold">إجاباتك:</h3>
//         <ul className="mt-2">
//           {Object.entries(selectedAnswers).map(([questionId, answer]) => (
//             <li key={questionId} className="text-lg">
//               سؤال {questionId}: {answer}
//             </li>
//           ))}
//           {trueFalseAnswer !== null && (
//             <li className="text-lg">
//               سؤال True/False: {trueFalseAnswer ? 'صحيح' : 'خطأ'}
//             </li>
//           )}
//         </ul>
//       </div>
//     </div>




//     <div className="fill-in-the-blanks-arabic p-5 bg-white rounded-lg shadow-md">
//       <p className="text-right text-lg">
//         جملة عربية{' '}
//         <span
//           className="cursor-pointer text-blue-500 underline"
//           onClick={() =>
//             setShowDropdown((prev) => ({ ...prev, blank1: !prev.blank1 }))
//           }
//         >
//           {selectedAnswers.blank1 || '........'}
//         </span>{' '}
//         تكمل{' '}
//         <span
//           className="cursor-pointer text-blue-500 underline"
//           onClick={() =>
//             setShowDropdown((prev) => ({ ...prev, blank2: !prev.blank2 }))
//           }
//         >
//           {selectedAnswers.blank2 || '........'}
//         </span>{' '}
//         وتستمر{' '}
//         <span
//           className="cursor-pointer text-blue-500 underline"
//           onClick={() =>
//             setShowDropdown((prev) => ({ ...prev, blank3: !prev.blank3 }))
//           }
//         >
//           {selectedAnswers.blank3 || '........'}
//         </span>{' '}
//         للنهاية.
//       </p>

//       {/* Dropdown for blank 1 */}
//       {showDropdown.blank1 && (
//         <div className="options bg-gray-100 p-2 mt-2 rounded shadow-md w-[150px]">
//           {availableOptions.length > 0 ? (
//             availableOptions.map((option, index) => (
//               <p
//                 key={index}
//                 className="cursor-pointer hover:bg-gray-200 p-1 rounded text-sm"
//                 onClick={() => handleSelectAnswer('blank1', option)}
//               >
//                 {option}
//               </p>
//             ))
//           ) : (
//             <p className="text-sm text-gray-500">لا توجد خيارات متاحة</p>
//           )}
//         </div>
//       )}

//       {/* Dropdown for blank 2 */}
//       {showDropdown.blank2 && (
//         <div className="options bg-gray-100 p-2 mt-2 rounded shadow-md w-[150px]">
//           {availableOptions.length > 0 ? (
//             availableOptions.map((option, index) => (
//               <p
//                 key={index}
//                 className="cursor-pointer hover:bg-gray-200 p-1 rounded text-sm"
//                 onClick={() => handleSelectAnswer('blank2', option)}
//               >
//                 {option}
//               </p>
//             ))
//           ) : (
//             <p className="text-sm text-gray-500">لا توجد خيارات متاحة</p>
//           )}
//         </div>
//       )}

//       {/* Dropdown for blank 3 */}
//       {showDropdown.blank3 && (
//         <div className="options bg-gray-100 p-2 mt-2 rounded shadow-md w-[150px]">
//           {availableOptions.length > 0 ? (
//             availableOptions.map((option, index) => (
//               <p
//                 key={index}
//                 className="cursor-pointer hover:bg-gray-200 p-1 rounded text-sm"
//                 onClick={() => handleSelectAnswer('blank3', option)}
//               >
//                 {option}
//               </p>
//             ))
//           ) : (
//             <p className="text-sm text-gray-500">لا توجد خيارات متاحة</p>
//           )}
//         </div>
//       )}
//     </div>

// </>
//   );
// };

// export default DutiesPage;

