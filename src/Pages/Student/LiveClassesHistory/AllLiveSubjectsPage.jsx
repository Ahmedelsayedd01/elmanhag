import React, { useEffect, useState } from 'react'; 
import { useNavigate,Link } from 'react-router-dom';
import { useAuth } from '../../../Context/Auth';
import Loading from '../../../Components/Loading';
import axios from 'axios';

const AllLiveSubjectsPage = () => {
    const navigate = useNavigate();
    const auth = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [studentSubject, setStudentSubject] = useState([]);

    // const handleNavigate = (subjectId , subject) => {
    //   navigate(`../../lesson_live/${subjectId}`, { state: {live : subject} });  // Navigate to the correct path under "curricula"
    // };

   const fetchSubjects = async () => {
     setIsLoading(true);
     try {
            const response = await axios.get('https://bdev.elmanhag.shop/student/recorded_live',
           {
                   headers: {
                          Authorization: `Bearer ${auth.user.token}`,
                          'Content-Type': 'application/json',
                          Accept: 'application/json',
                   },

            });
            if (response.status === 200) {
                  console.log(response.data)
                  setStudentSubject(response.data.live_recorded)
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

//     localStorage.setItem("StudentSubjects", JSON.stringify(studentSubject));

    if (isLoading) {
       return (
              <div className="w-1/4 h-full flex items-start mt-[10%] justify-center m-auto">
                     <Loading />
              </div>
       );}

    return (
        <div className="p-4 md:p-8 lg:p-12">        
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {studentSubject.map((subject) => (
                        <Link to={`lesson_live/${subject.id}`} state={{live:subject , liveId:subject.id}} key={subject.id}>
                        <div
                            
                            className="subject-box p-3 flex flex-col justify-center items-center bg-white rounded-xl shadow-lg hover:cursor-pointer transition-transform transform hover:scale-105"
                            style={{ boxShadow: '0px 0px 8px rgba(208, 16, 37, 0.12)' }}
                            // onClick={() => handleNavigate(subject.id ,subject)}
                        >
                            <span className="text-mainColor text-lg md:text-xl lg:text-2xl font-bold mb-3">
                                {subject.name}
                            </span>
                            <img
                                src={subject.thumbnail_url}
                                alt={subject.name}
                                // className="w-32 h-32"
                            />
                        </div>
                        </Link>
                    ))}
                </div>
        </div>
    );
};

export default AllLiveSubjectsPage;

