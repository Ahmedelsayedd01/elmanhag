import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../../Context/Auth';
import Loading from '../../../Components/Loading';
import axios from 'axios';
import {Button} from '../../../Components/Button'
import { IoIosArrowDown } from 'react-icons/io'
import { useNavigate } from 'react-router-dom';

const LessonsPage = ({subjectId,lessonId}) => {
      const [activeTab, setActiveTab] = useState("videos"); // Tracks active tab (videos/homework)
      const auth = useAuth();
      const [isLoading, setIsLoading] = useState(false);
      const [lessons,setLessons] = useState([])

      const [subjectData, setSubjectData] = useState([]);
      const [chaptersData, setChaptersData] = useState([]);
      const [chapterID,setChapterID] = useState('')
//       const [chapterName, setChapterName] = useState(''); // For storing the chapter name
    
      useEffect(() => {
        // Fetch the subject and chapter data from local storage
        const StorageSubjectData = JSON.parse(localStorage.getItem('StudentSubjects'));
        setSubjectData(StorageSubjectData);
      }, []);
      
       const navigate = useNavigate();
       const handleGoBack = () => {
       navigate(-1, { replace: true });
       };

       // useEffect(() => {
       //        const StorageSubjectData = JSON.parse(localStorage.getItem('StudentSubjects'));                  
       //        setSubjectData(StorageSubjectData);
       //        setChaptersData(StorageSubjectData.chapters)         
       //      }, []);

      const fetchLessons = async () => {
       setIsLoading(true);
       console.log(subjectId)
        console.log(lessonId)
        try {
               const response = await axios.post('https://bdev.elmanhag.shop/student/chapter/lesson/view',{
                'subject_id': subjectId,
                'lesson_id' : lessonId
               },
               {
                      headers: {
                             Authorization: `Bearer ${auth.user.token}`,
                      },
               });
               if (response.status === 200) {
                     console.log(response.data)
                     setLessons(response.data.lesson);
                     setChapterID(response.data.lesson.chapter_id);
                   }
        } catch (error) {
               console.error('Error fetching Lessons data:', error);
        } finally {
               setIsLoading(false);
        }
        };

       //  const findChapterName = (subjectId, chapterId) => {
       //        // console.log(subjectData)
       //        // console.log(subjectId)
       //        if (subjectData) {
       //          const subject = subjectData.find(sub => sub.id == subjectId);
       //          console.log("selected subject",subject)
       //          if (subject && subject.chapters) {
       //            const chapter = subject.chapters.find(chap => chap.id == chapterId);
       //            setChapterName(chapter ? chapter.name : 'Chapter not found');
       //          } else {
       //            setChapterName('No chapters data available');
       //          }
       //        } else {
       //          setChapterName('No subjects data available');
       //        }
       //      };
 
     
       useEffect(() => {
              fetchLessons();
              console.log(chapterID)
       },  []);


  // Ensure lessonData and resources are available
  if (!lessons.resources || lessons.resources.length === 0) {
       return <div className="text-center text-xl">No Resouces available.</div>;
     }

       if (!lessons) {
              return <div className='text-mainColor text-2xl font-bold w-full h-full flex items-center justify-center'>No lessons data available</div>;
       }

  // Extract the first resource to be used as the main content
  const mainResource = lessons.resources[0];

  const chapterName = subjectData?.find(sub => sub.id === subjectId)?.chapters?.find(chap => chap.id === chapterID)?.name || 'Chapter not found';


  if (isLoading) {
       return (
              <div className="w-1/4 h-full flex items-start mt-[10%] justify-center m-auto">
                     <Loading />
              </div>
       );
      }

return (
       <div className="p-5">
         <div className="flex w-full gap-5 mb-5">
           {/* Tab buttons */}
       <Button
          Text="فيديوهات"
          Width="full"
          BgColor={activeTab === "videos" ? "bg-mainColor" : "bg-white"}
          Color={activeTab === "videos" ? "text-white" : "text-mainColor"}
          handleClick={() => setActiveTab("videos")}
        />

        {/* Using the Button component for Homework */}
        <Button
          Text="واجبات"
          Width="full"
          BgColor={activeTab === "homework" ? "bg-red-600" : "bg-white"}
          Color={activeTab === "homework" ? "text-white" : "text-red-600"}
          handleClick={() => setActiveTab("homework")}
        />

       <button type='button' className='' onClick={handleGoBack}>
              <IoIosArrowDown className="rotate-90 text-mainColor text-5xl" />
       </button>
         </div>
   
         {activeTab === "videos" && (
           <div>
             {/* Main content from the first resource */}
             <div className="w-full h-screen mb-5">
               {mainResource.type === "video" && (
             <div className="w-full h-screen">
                   <video className="w-full h-full object-cover" controls>
                     <source src={`${mainResource.file_link}`} type="video/mp4"/>
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
   
               {/* Main Details */}
               <div className="mt-4">
               <h4 className="text-lg font-semibold">Chapter: {chapterName}</h4>
               <p className="text-gray-600">{lessons.description}</p>
               </div>
             </div>
   
             {/* Playlist */}
             {/* <div>
               <h4 className="text-xl font-semibold mb-3">Playlist</h4>
               <div className="space-y-4">
                 {lessonData.resources.slice(1).map((item, index) => (
                   <div key={index} className="border p-4 rounded-md">
                     <div className="mb-2 text-lg font-semibold">Type: {item.type}</div>
                     {item.type === "video" && (
                       <video className="w-full" controls>
                         <source src={`https://api.example.com/${item.file}`} type="video/mp4" />
                         Your browser does not support the video tag.
                       </video>
                     )}
                     {item.type === "voice" && (
                       <audio className="w-full" controls>
                         <source src={`https://api.example.com/${item.file}`} type="audio/mp3" />
                         Your browser does not support the audio element.
                       </audio>
                     )}
                     {item.type === "pdf" && (
                       <a
                         href={`https://api.example.com/${item.file}`}
                         target="_blank"
                         rel="noopener noreferrer"
                         className="text-blue-500 underline"
                       >
                         Open PDF
                       </a>
                     )}
                   </div>
                 ))}
               </div>
             </div> */}
           </div>
         )}
   
         {activeTab === "homework" && (
           <div className="mt-5">
             {lessons.homework.length === 0 ? (
               <p>No homework assigned for this lesson.</p>
             ) : (
               <ul className="list-disc ml-5">
                 {lessons.homework.map((hw, index) => (
                   <li key={index} className="text-gray-700">{hw}</li>
                 ))}
               </ul>
             )}
           </div>
         )}
       </div>
     );
};

export default LessonsPage;

