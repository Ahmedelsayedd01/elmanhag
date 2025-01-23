import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../Context/Auth';
import Loading from '../../../Components/Loading';
import axios from 'axios';
import { Button } from '../../../Components/Button';
import { IoIosArrowDown } from 'react-icons/io';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { FaDownload } from 'react-icons/fa'; // Import download icon

const AllLiveLessonesPage = () => {
  //   const [activeTab, setActiveTab] = useState("videos");
  const auth = useAuth();
  const location = useLocation();
  const { live, liveId } = location.state || {}; // Access the passed plan data safely
  //   const {live ,liveId}= useLocation()
  const [isLoading, setIsLoading] = useState(false);
  const [lessons, setLessons] = useState({});
  const [subjectData, setSubjectData] = useState([]);
  const [chapterID, setChapterID] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false); // Modal state

  const [videoProblemList, setVideoProblemList] = useState({});
  const [questionProblemList, setQuestionProblemList] = useState({});
  const [selectedProblem, setSelectedProblem] = useState('')
  //   const [problemType ,setProblemType] = useState('')
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    console.log(live, liveId)
  }, []);

  const fetchProblemList = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://62.84.185.153/plesk-site-preview/bcknd.elmanhag.com/https/62.84.185.153/student/issues',
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

      const response = await axios.post('http://62.84.185.153/plesk-site-preview/bcknd.elmanhag.com/https/62.84.185.153/student/issues', formData, {
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

  if (!live) {
    return <div className='text-mainColor text-2xl font-bold w-full h-full flex items-center justify-center'>No live data available</div>;
  }


  return (
    <>
      {showErrorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 lg:mr-10">
          <div className="bg-white p-6 md:p-12 rounded-lg w-11/12 md:w-1/2 lg:w-1/3">
            <h2 className="text-[#6B6B6B] text-xl md:text-2xl font-bold mb-4">غير متوفر حصص لايف مسجله</h2>
            <div className="flex justify-end gap-4 sm:gap-2">
              <Button Text="حسناً" Width="auto" BgColor="bg-mainColor" Color="text-white" handleClick={handleGoBack} />
            </div>
          </div>
        </div>
      )}

      {!showErrorModal && (
        <div className="p-6 mb-20 sm:p-2">
          <div className="w-full">
            <video className="w-full object-cover" controls controlsList='nodownload'>
              <source src={`${live.video_link}`} type="video/mp4" />
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
                  <IoIosArrowDown size={20} />
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
                        handleSubmitProblem(event, problem.id, live.id); // Auto submit when problem is selected
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
            <h4 className="text-2xl text-mainColor font-semibold">{live?.name || '-'}</h4>
            <p className="text-gray-900 text-lg">{live?.description || '-'}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default AllLiveLessonesPage;

