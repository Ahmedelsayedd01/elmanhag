import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../Context/Auth';
import Loading from '../../../Components/Loading';
import axios from 'axios';
import { Button } from '../../../Components/Button';
import { IoIosArrowDown } from 'react-icons/io';
import { useNavigate, Link } from 'react-router-dom';
import { FaDownload } from 'react-icons/fa'; // Import download icon

const AllLiveLessonesPage = ({ subjectId, lessonId }) => {
//   const [activeTab, setActiveTab] = useState("videos");
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [lessons, setLessons] = useState({});
  const [subjectData, setSubjectData] = useState([]);
  const [chapterID, setChapterID] = useState('');

  const [videoProblemList, setVideoProblemList] = useState({});
  const [questionProblemList, setQuestionProblemList] = useState({});
  const [selectedProblem,setSelectedProblem]= useState('')
//   const [problemType ,setProblemType] = useState('')
  const [dropdownVisible, setDropdownVisible] = useState(false); 

  const navigate = useNavigate();

  useEffect(() => {
       const fetchLiveRecorded = async () => {
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
                            console.log('Live Recorded:', response.data);
                               // Check if any of the live recorded matches the lessonId
                            const matchedLesson = response.data.live_recorded.find((item) =>
                                   item.
                            subject_id === parseInt(subjectId) && item.lesson_id=== parseInt(lessonId));
                  
                            if (matchedLesson) {
                              // Set the lesson if found
                              setLessons(matchedLesson);
                              setChapterID(matchedLesson.chapter_id)
                            } else {
                              console.log('غير متوفر حصص لايف مسجله');
                            }
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
        
              fetchLiveRecorded();
  }, [subjectId, lessonId, auth.user.token]);


  useEffect(() => {
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
                    setSubjectData(response.data.subject)
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
               fetchSubjects();
      }, []);


  const fetchProblemList = async () => {
    setIsLoading(true);
    try {
           const response = await axios.get('https://bdev.elmanhag.shop/student/issues',
          {
                  headers: {
                         Authorization: `Bearer ${auth.user.token}`,
                         'Content-Type': 'application/json',
                         Accept: 'application/json',
                  },

           });
           if (response.status === 200) {
                 console.log(response.data)
                 setVideoProblemList(response.data.video_issues)
                 setQuestionProblemList(response.data.question_issues)
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
    fetchProblemList();
    console.log(videoProblemList)
   }, []);


   const handleSubmitProblem = async (event, problemId, resourceId) => {
    event.preventDefault(); // Prevent the default form submission

    setIsLoading(true); // Show loading state

    try {
        const formData = new FormData();
        
        // Determine the type based on problemType
       //  const typeToSend = resourceType === "video" ? "video" : "question"; 
        formData.append('type', "video");
        formData.append('issue_id', problemId);
        formData.append('id', resourceId);

          // Print each FormData entry for debugging
          for (const [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }

        const response = await axios.post('https://bdev.elmanhag.shop/student/issues', formData, {
            headers: {
                Authorization: `Bearer ${auth.user.token}`,
                'Content-Type': 'multipart/form-data',
            },
        });

        if (response.status === 200) {
            console.log('formData', formData);
            auth.toastSuccess("تم ارسال المشكله بنجاح");
        } else {
            auth.toastError('فشل ارسال المشكله !.');
        }
    } catch (error) {
        const errorMessages = error?.response?.data.errors;
        let errorMessageString = 'Error occurred';

        if (errorMessages) {
            errorMessageString = Object.values(errorMessages).flat().join(' ');
        }
        auth.toastError('Error', errorMessageString);
    } finally {
        setIsLoading(false);
    }
};

  const handleGoBack = () => {
    navigate(-1, { replace: true });
  };

  const chapterName = subjectData.find(sub => sub.id == subjectId)?.chapters?.find(chap => chap.id == chapterID)?.name || 'Chapter not found';


  if (isLoading) {
    return (
      <div className="w-1/4 h-full flex items-start mt-[10%] justify-center m-auto">
        <Loading />
      </div>
    );
  }

  if (!lessons) {
    return <div className='text-mainColor text-2xl font-bold w-full h-full flex items-center justify-center'>No lessons data available</div>;
  }


  return (
    <div className="p-6 mb-20 sm:p-2">
       <div className="w-full">
              <video className="w-full object-cover" controls controlsList='nodownload'>
                     <source src={`${lessons.video_link}`} type="video/mp4" />
                     Your browser does not support the video tag.
              </video>

              <div className="mt-4 relative">             
                     <button
                     className="bg-mainColor text-white py-2 px-4 rounded-md flex items-center gap-3"
                     onClick={() => setDropdownVisible(!dropdownVisible)}
                     >
                     <div>
                     <h1>الإبلاغ عن مشكلة في الفيديو</h1>
                     </div>
                     <div
                     className={`mt-1 transition-transform duration-200 ${dropdownVisible ? 'rotate-180' : 'rotate-0'}`}
                     >
                     <IoIosArrowDown size={20}/>
                     </div>
                     </button>

                     {dropdownVisible && videoProblemList?.length > 0 && (
                     <ul className="left-0 mt-2 bg-mainColor text-white border border-red-600 rounded-md shadow-lg z-10 xl:w-1/5 md:w-2/5 w-4/5">
                     {videoProblemList.map((problem) => (
                     <li
                            key={problem.id}
                            className={`p-2 hover:bg-white hover:text-mainColor rounded-2xl text-lg font-semibold cursor-pointer ${selectedProblem === problem ? "bg-mainColor" : ""}`}
                            onClick={() => {
                            setSelectedProblem(problem);
                            handleSubmitProblem(event,problem.id, lessons.id); // Auto submit when problem is selected
                            }}
                     >
                            {problem.title}
                     </li>
                     ))}
                     </ul>
                     )}
              </div>

       </div>

       <div className="mt-4">
       <h4 className="text-2xl text-mainColor font-semibold">{chapterName}</h4>
       <p className="text-gray-900 text-lg">{lessons.name}</p>
       </div>
    </div>
 
  );
};

export default AllLiveLessonesPage;

