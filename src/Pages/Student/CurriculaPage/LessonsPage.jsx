import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../Context/Auth';
import Loading from '../../../Components/Loading';
import axios from 'axios';
import { Button } from '../../../Components/Button';
import { IoIosArrowDown } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
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
  const [showErrorPopup, setShowErrorPopup] = useState(false);

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
          console.log(response.data)
          if (response.data.lesson) {
            setLessons(response.data.lesson);
            setChapterID(response.data.lesson?.chapter_id || '');
          } else {
            setErrorMessage('Lesson data not found.');
            setShowErrorPopup(true);
          }
        }
      } catch (error) {
        console.error('Error fetching Lessons data:', error);

        if (error.response && error.response.status === 500) {
          setErrorMessage('An error occurred while fetching lessons.');
          setShowErrorPopup(true);
        } else {
          setErrorMessage('An unexpected error occurred.');
          setShowErrorPopup(true);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchLessons();
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

  const pdfResources = lessons.resources?.filter(resource => resource.type === "pdf") || [];

  return (
    <div className="p-6 mb-20">
      <div className="flex w-full gap-5 mb-5">
        {/* Tab buttons */}
        <Button
          Text="فيديوهات"
          Width="full"
          BgColor={activeTab === "videos" ? "bg-mainColor" : "bg-white"}
          Color={activeTab === "videos" ? "text-white" : "text-mainColor"}
          handleClick={() => setActiveTab("videos")}
        />

        <Button
          Text="مذكرات"
          Width="full"
          BgColor={activeTab === "pdf" ? "bg-red-600" : "bg-white"}
          Color={activeTab === "pdf" ? "text-white" : "text-red-600"}
          handleClick={() => setActiveTab("pdf")}
        />

        <Button
          Text="واجبات"
          Width="full"
          BgColor={activeTab === "homework" ? "bg-red-600" : "bg-white"}
          Color={activeTab === "homework" ? "text-white" : "text-red-600"}
          handleClick={() => setActiveTab("homework")}
        />

        <button type='button' onClick={handleGoBack}>
          <IoIosArrowDown className="rotate-90 text-mainColor text-5xl" />
        </button>
      </div>

      {activeTab === "videos" && mainResource &&(
        <div>
          {/* Main content from the first resource */}
          <div className="w-full h-screen mb-5">
            {mainResource.type === "video" && (
              <div className="w-full h-screen">
                <video className="w-full h-full object-cover" controls controlsList='nodownload'>
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
              <p className="text-gray-900 text-lg">{lessons.description}</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === "pdf" && mainResource && (
        <div className="mt-5">
          {pdfResources.length === 0 ? (
            <p>No PDF resources available.</p>
          ) : (
            <ul className="list-disc ml-5 space-y-4">
              {pdfResources.map((pdf, index) => (
                <li key={index} className="flex items-center">
                  <Button
                    Text={pdf.file_name || `PDF File ${index + 1}`}
                    Icon={<FaDownload />}
                    Width="auto"
                    BgColor="bg-mainColor"
                    Color="text-white"
                    handleClick={() => handleDownload(pdf.file_link, pdf.file_name || `PDF_File_${index + 1}`)}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {activeTab === "homework" && mainResource && (
        <div className="mt-5">
          {lessons.homework && lessons.homework.length === 0 ? (
            <p>No homework assigned for this lesson.</p>
          ) : (
            <ul className="list-disc ml-5">
              {lessons.homework && lessons.homework.map((hw, index) => (
                <li key={index} className="text-gray-700">{hw}</li>
              ))}
            </ul>
          )}
        </div>
      )}

      {showErrorPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-auto">
            <h2 className="text-xl font-bold text-red-600 mb-4">Error</h2>
            <p className="text-gray-700 mb-4">{errorMessage}</p>
            <div className="flex justify-end">
              <button 
                onClick={() => { setShowErrorPopup(false); handleGoBack(); }}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonsPage;
