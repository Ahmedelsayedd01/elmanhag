import React, { useContext, useEffect, useState } from 'react'
import { SubjectStudentContext } from '../../../../Layouts/Admin/StudentsSubjectLayout'
import TextTitle from '../../../../Components/TextTitle'

const StudentsSubjectPage = () => {
       const [subjectContent, setSubjectContent] = useState(null)
       const [students, setStudents] = useState([])


       const subjectStudentData = useContext(SubjectStudentContext)

       useEffect(() => {
              if (subjectStudentData) {
                     setSubjectContent(subjectStudentData);
                     setStudents(subjectStudentData.users || []);
              }
       }, [subjectStudentData]);

       if (students.length === 0) {
              return (
                     <div className="w-full h-full mt-60 text-center">
                            <TextTitle text={"NOt Found Student"} />
                     </div>
              );
       }

       console.log("subjectContent", subjectContent)
       console.log("students", students)

       return (
              <>
                     <div className="w-full flex items-center justify-between mt-4 overflow-x-auto">
                            <table className="w-full sm:min-w-0">
                                   <thead className="w-full">
                                          <tr className="w-full border-b-2">
                                                 <th className="min-w-[80px] sm:w-1/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">#</th>
                                                 <th className="min-w-[150px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Name</th>
                                                 <th className="min-w-[150px] sm:w-2/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Progress</th>
                                          </tr>
                                   </thead>
                                   <tbody className="w-full">
                                          {students.map((student, index) => (
                                                 <tr key={index} className="w-full border-b-2">
                                                        <td
                                                               className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                        >
                                                               {index + 1}
                                                        </td>
                                                        <td
                                                               className="min-w-[120px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                        >
                                                               {student.name} <br /> {student.phone}
                                                        </td>
                                                        <td
                                                               className="min-w-[150px] px-2 sm:min-w-[100px] sm:w-2/12 lg:w-1/12 py-2 overflow-hidden"
                                                        >
                                                               <div className="relative w-full bg-white h-6 rounded-xl overflow-hidden">
                                                                      <span
                                                                             style={{ width: `${student?.progress || 0}%` }}
                                                                             className="absolute left-0 h-full bg-mainColor"
                                                                      ></span>
                                                                      <span className='absolute left-[47%] -top-1 text-black font-semibold text-sm sm:text-base lg:text-lg xl:text-xl '>{student?.progress || 0}%</span>
                                                               </div>
                                                        </td>
                                                 </tr>
                                          ))}
                                   </tbody>
                            </table>
                     </div>

              </>
       )
}

export default StudentsSubjectPage