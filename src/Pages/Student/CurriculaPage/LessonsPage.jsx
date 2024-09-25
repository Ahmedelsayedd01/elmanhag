import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../Context/Auth';
import Loading from '../../../Components/Loading';
import axios from 'axios';
import { Button } from '../../../Components/Button';
import { IoIosArrowDown } from 'react-icons/io';
import { useNavigate, Link } from 'react-router-dom';
import { FaDownload } from 'react-icons/fa'; // Import download icon

const LessonsPage = ({ subjectId, lessonId }) => {
  const [activeTab, setActiveTab] = useState("videos");
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [lessons, setLessons] = useState({});
  const [mainResource, setMainResource] = useState(null);
  const [subjectData, setSubjectData] = useState([]);
  const [chapterID, setChapterID] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false); // Modal state

  const navigate = useNavigate();

  useEffect(() => {
    const StorageSubjectData = JSON.parse(localStorage.getItem('StudentSubjects'));
    setSubjectData(StorageSubjectData || []);
  }, []);

  useEffect(() => {
    const fetchLessons = async () => {
      setIsLoading(true);
      try {
        const response = await axios.post(
          'https://bdev.elmanhag.shop/student/chapter/lesson/view',
          {
            'subject_id': subjectId,
            'lesson_id': lessonId,
          },
          {
            headers: {
              Authorization: `Bearer ${auth.user.token}`,
            },
          }
        );

        if (response.status === 200) {
          console.log('response lesson', response)
          if (response.data.lesson) {
            setLessons(response.data.lesson);
             // Check if the lesson exists but resources are empty
          if (response.data.lesson.resources && response.data.lesson.resources.length === 0) {
            setErrorMessage('عفوا هذا الدرس غير متاح حاليا. سوف يتوفر لاحقا');
            setShowErrorModal(true); // Show modal when error occurs
          } else {
            setChapterID(response.data.lesson.chapter_id || '');
          }
            // setChapterID(response.data.lesson?.chapter_id || '');
          } else {
            setErrorMessage('Lesson data not found.');
            setShowErrorModal(true); // Show modal when error occurs
          }
        }
      } catch (error) {
        console.log(error)
        console.error('Error fetching Lessons data:', error.response?.data || error);

        // Customize error messages based on specific text
        const statusCode = error.response?.status;
        console.log(statusCode)
        // Handle different status codes
        switch (statusCode) {
          case 204:
            setErrorMessage('This Lesson Is Closed');
            break;
          case 400:
            if (error.response.data.faield === 'This Material for This Lesson is Closed') {
              setErrorMessage('عفوا هذا الدرس غير متاح حاليا. سوف يتوفر لاحقا');
            } else if (error.response.data.faield === 'This Lesson Unpaid') {
              setErrorMessage('عذرًا , يبدوا ان هذا الدرس غير متاح حالياً إلا للمشتركين. اشترك الآن واستمتع بجميع الدروس بدون قيود !');
            } else if (error.response.data.not_found === "This Bundle Don't Have Subject") {
              setErrorMessage("This Bundle Don't Have Subject");
            } else if (error.response.data.error) {
              setErrorMessage('Error: ' + error.response.data.error);
            }
            break;
          case 404:
            setErrorMessage('This Lesson Not Found');
            break;
          case 403:
            setErrorMessage("You Can't Take This Lesson cause You Didn't Finish Homework Before Lesson");
            break;
          case 500:
            setErrorMessage('The previous lesson was not solved.');
            break;
          default:
            setErrorMessage('An unknown error occurred.');
            break;
        }
        setShowErrorModal(true); // Show modal for any error
      } finally {
        setIsLoading(false);
      }
    };
    fetchLessons();
    // console.log("err",errorMessage)
  }, [subjectId, lessonId, auth.user.token]);

  useEffect(() => {
    if (lessons.resources && lessons.resources.length > 0) {
      setMainResource(lessons.resources[0]);
    }
  }, [lessons]);

  const handleGoBack = () => {
    navigate(-1, { replace: true });
  };

  const chapterName = subjectData.find(sub => sub.id == subjectId)?.chapters?.find(chap => chap.id == chapterID)?.name || 'Chapter not found';

  const handleDownload = (url, filename) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename; // Set the filename to be used during download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Close modal function
  const handleCloseModal = () => {
    setShowErrorModal(false);
    setErrorMessage(''); // Clear error message after closing modal
  };

  // Navigate to subscription
  const handleSubscribe = () => {
    navigate('/subscribe'); // Assuming you have a /subscribe route
  };

  if (isLoading) {
    return (
      <div className="w-1/4 h-full flex items-start mt-[10%] justify-center m-auto">
        <Loading />
      </div>
    );
  }

  if (!lessons && !errorMessage) {
    return <div className='text-mainColor text-2xl font-bold w-full h-full flex items-center justify-center'>No lessons data available</div>;
  }

  const pdfResources = lessons.resources?.filter(resource => resource.type === "pdf") || [];

  return (
    <div className="p-6 mb-20 sm:p-2">
      {/* Error Modal */}
      {showErrorModal && (

          <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 lg:mr-10">
            <div className="bg-white p-6 md:p-12 rounded-lg w-11/12 md:w-1/2 lg:w-1/3">
              <h2 className="text-[#6B6B6B] text-xl md:text-2xl font-bold mb-4">{errorMessage}</h2>
              <div className="flex justify-end gap-4 sm:gap-2">
                {/* Conditional rendering based on the error message */}
                {errorMessage === `عذرًا , يبدوا ان هذا الدرس غير متاح حالياً إلا للمشتركين. اشترك الآن واستمتع بجميع الدروس بدون قيود !` ? (
                  <>
                    <Link to="/dashboard/My_Subscriptions/plans" state={{ subject_Id: subjectId }}>
                      <Button Text="اشترك الان" Width="auto" BgColor="bg-mainColor" Color="text-white" />
                    </Link>
                    <Button Text="حاول لاحقا" Width="auto" BgColor="bg-gray-300" Color="text-black" handleClick={handleGoBack} />
                  </>
                ) : (
                  <Button Text="حسناً" Width="auto" BgColor="bg-gray-300" Color="text-black" handleClick={handleGoBack} />
                )}
              </div>
            </div>
          </div>
        )}

      {!showErrorModal && (
        <>
          <div className="flex w-full gap-5 mb-5">
            {/* Tab buttons */}
            <div className='sm:w-1/4'> 
            <Button
              Text="فيديوهات"
              Width="full"
              px="px-1"
              Size='text-xl'
              BgColor={activeTab === "videos" ? "bg-mainColor" : "bg-white"}
              Color={activeTab === "videos" ? "text-white" : "text-mainColor"}
              handleClick={() => setActiveTab("videos")}
            />
            </div>
            <div className='sm:w-1/4'> 
            <Button
              Text="مذكرات"
              Width="full"
              px="px-1"
              Size='text-xl'
              BgColor={activeTab === "pdf" ? "bg-red-600" : "bg-white"}
              Color={activeTab === "pdf" ? "text-white" : "text-red-600"}
              handleClick={() => setActiveTab("pdf")}
            />
            </div>

            <div className='sm:w-1/4'> 
            <Button
              Text="واجبات"
              Width="full"
              px="px-1"
              Size='text-xl'
              BgColor={activeTab === "homework" ? "bg-red-600" : "bg-white"}
              Color={activeTab === "homework" ? "text-white" : "text-red-600"}
              handleClick={() => setActiveTab("homework")}
            />
            </div>
            <button type='button' onClick={handleGoBack}>
              <IoIosArrowDown className="rotate-90 text-mainColor text-5xl" />
            </button>
          </div>

          {activeTab === "videos" && mainResource && (
            <div>
              {/* Main content from the first resource */}
              <div className="w-full mb-5">
                {mainResource.type === "video" && (
                  <div className="w-full">
                    <video className="w-full object-cover" controls controlsList='nodownload'>
                      <source src={`${mainResource.file_link}`} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}
                {mainResource.type === "voice" && (
                  <div>
                    <audio className="w-full" controls>
                      <source src={`${mainResource.file_link}`} type="audio/mp3" />
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                )}
                {mainResource.type === "pdf" && (
                  <div>
                    <iframe
                      className="w-full h-96"
                      src={`${mainResource.file_link}`}
                      title="PDF"
                    />
                  </div>
                )}

                <div className="mt-4">
                  <h4 className="text-2xl text-mainColor font-semibold">{chapterName}</h4>
                  <p className="text-gray-900 text-lg">{lessons.name}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "pdf" && mainResource && (
            <div className="mt-5 w-full">
              {pdfResources.length === 0 ? (
                <p>No PDF resources available.</p>
              ) : (
                <ul className="list-disc ml-5 space-y-4 w-full">
                  {pdfResources.map((pdf, index) => (
                    <li key={index} className="flex items-center w-1/2">
                      <Button
                        Text={pdf.file_name || `PDF File ${index + 1}`}
                        Icon={<FaDownload />}
                        Width="w-1/2"
                        BgColor="bg-mainColor"
                        Color="text-white"
                        handleClick={() => handleDownload(pdf.file_link, pdf.file_name || `PDF_File_${index + 1}.pdf`)}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {activeTab === "homework" && (
            <div>
              <h4 className="text-2xl text-mainColor font-semibold">Homeworks</h4>
              {lessons.homework.length === 0 ? (
                <p>No homeworks available.</p>
              ) : (
                <ul className="list-disc ml-5 space-y-4">
                  {lessons.homework.map((task, index) => (
                    <li key={index}>
                      <p>{task.description}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LessonsPage;

