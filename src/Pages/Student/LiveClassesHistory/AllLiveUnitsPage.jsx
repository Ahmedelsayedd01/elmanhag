import React, { useEffect, useState } from 'react';
import DropDownUnits from '../../../Components/DropDownUnits'; // Import the Unit component
import { useAuth } from '../../../Context/Auth';
import Loading from '../../../Components/Loading';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const AllLiveUnitsPage = ({subjectId}) => {
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [chapters, setChapters] = useState([]);
  const [openUnits, setOpenUnits] = useState({});

  const location = useLocation();
  const { thumbnail_image} = location.state || {}; // Access the passed plan data safely

  const fetchChapters = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        'https://bdev.elmanhag.shop/student/mySubject/chapter/view',
        { subject_id: subjectId },
        {
          headers: {
            Authorization: `Bearer ${auth.user.token}`,
          },
        }
      );
      if (response.status === 200) {
        console.log(response.data)
        setChapters(response.data.chapter);
      }
    } catch (error) {
      console.error('Error fetching Chapters data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (subjectId) {
      fetchChapters();
    }
  }, [subjectId]);

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
                   console.log("Live Recorded",response.data)
                  //  setStudentSubject(response.data.subject)
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
        fetchSubjects()
        }, []);

  const handleUnitClick = (unitId) => {
    setOpenUnits((prev) => ({
      ...prev,
      [unitId]: !prev[unitId],
    }));
  };
        
 // Prepare data for dropdowns
 const dropdowns = chapters.map((chapter, index) => ({
  name: chapter.name,
  id:chapter.id,
  lessons: chapter.lessons.map(lesson => ({
    name: lesson.name,
    path: `lesson_live/${lesson.id}`,
    order:lesson.order
  })),
}));

  if (isLoading) {
    return (
           <div className="w-1/4 h-full flex items-start mt-[10%] justify-center m-auto">
                  <Loading />
           </div>
    );}

  if (!chapters) {
    return (
      <div className="text-mainColor text-2xl font-bold w-full h-full flex items-center justify-center">
        No chapters data available
      </div>
    );
  }
  
  return (
    // <div className="p-4 md:p-8 lg:p-12">
    <div className="p-4 md:p-8 lg:p-12">
    {/* Image above chapters */}
    <div className='flex justify-center mb-5 ml-5'>
    {thumbnail_image && (
      <img 
        src={thumbnail_image} 
        alt="Subject Thumbnail" 
      />
    )}
    </div>
      {/* Flex container for columns */}
      <div className="flex flex-wrap">
        {/* Column 1 */}
        <div className="flex flex-col w-full md:w-1/2 px-4">
          {dropdowns.filter((_, index) => index % 2 === 0).map((dropdown) => (
             <DropDownUnits
             key={dropdown.id}
             unit={dropdown}
             lessons={dropdown.lessons}
             isOpen={openUnits[dropdown.id]}
             onClick={() => handleUnitClick(dropdown.id)}
           />
          ))}
        </div>
        {/* Column 2 */}
        <div className="flex flex-col w-full md:w-1/2 px-4">
          {dropdowns.filter((_, index) => index % 2 !== 0).map((dropdown) => (
            <DropDownUnits
              key={dropdown.id}
              unit={dropdown}
              lessons={dropdown.lessons}
              isOpen={openUnits[dropdown.id]}
              onClick={() => handleUnitClick(dropdown.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllLiveUnitsPage;

