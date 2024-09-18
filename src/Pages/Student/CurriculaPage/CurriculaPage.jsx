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
              <div>
                     CurriculaPage
              </div>
       )
}

export default CurriculaPage
