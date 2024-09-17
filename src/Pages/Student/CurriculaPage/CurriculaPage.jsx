import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../Context/Auth';
import Loading from '../../../Components/Loading';
import axios from 'axios'

const CurriculaPage = () => {

       const navigate = useNavigate();

       const handleNavigate = (subjectId) => {
         navigate(`subject/${subjectId}`);  // Navigate to the correct path under "curricula"
       };

      const auth = useAuth();
      const [isLoading, setIsLoading] = useState(false);
      const [studentSubject,setStudentSubject] =useState([])

      const fetchSubjects = async () => {
        setIsLoading(true);
        try {
               const response = await axios.get('https://bdev.elmanhag.shop/student/setting/subject/student',
              {
                      headers: {
                             Authorization: `Bearer ${auth.user.token}`,
                             'Content-Type': 'application/json',
                             Accept: 'application/json',
                      },

               });
               if (response.status === 200) {
                     console.log(response.data)
                     setStudentSubject(response.data.subject)
               }
             } 
        catch (error) {
              console.log(error.response); // Log the full response for debugging
              const errorMessages = error?.response?.data?.errors;
              let errorMessageString = 'Error occurred';
            if (errorMessages) {
                    errorMessageString = Object.values(errorMessages).flat().join(' ');
            }
            auth.toastError('Error', errorMessageString);
            }
        finally {
            setIsLoading(false);
            }
        };

       useEffect(() => {
              fetchSubjects();
       }, []);

       localStorage.setItem("StudentSubjects", JSON.stringify(studentSubject));
       
       return (
              <div className="subjects grid grid-cols-2 gap-10 p-12">
              {/* Subject Boxes */}
              {studentSubject.map((subject) => (
                     <div
                     key={subject.id}
                     className="subject-box flex flex-col justify-center items-center w-full h-52 bg-white rounded-xl shadow-lg hover:cursor-pointer"
                     style={{ boxShadow: '0px 0px 8px rgba(208, 16, 37, 0.12)' }}
                     onClick={() => handleNavigate(subject.id)} // Navigate based on the subject ID
                     >
                     <span className="text-mainColor text-3xl font-bold mb-3">{subject.name}</span>
                     <img src={subject.thumbnail_url} alt=''/>
                     {/* {iconMap[subject.name] || <div>No Icon</div>} Render the corresponding icon */}
                     </div>
              ))}
            </div>
       )
}

export default CurriculaPage