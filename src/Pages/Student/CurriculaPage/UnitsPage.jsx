import React, { useEffect, useRef, useState } from 'react';
import DropDownUnits from '../../../Components/DropDownUnits';
import { useAuth } from '../../../Context/Auth';
import Loading from '../../../Components/Loading';
import axios from 'axios';

const UnitsPage = ({subjectId}) => {

      const auth = useAuth();
      const [isLoading, setIsLoading] = useState(false);
      const [chapters,setChapters] = useState([])

      const fetchChapters = async () => {
        setIsLoading(true);
        console.log(subjectId)
        try {
               const response = await axios.post('https://bdev.elmanhag.shop/student/mySubject/chapter/view',{
                'subject_id': subjectId
               },
               {
                      headers: {
                             Authorization: `Bearer ${auth.user.token}`,
                      },
               });
               if (response.status === 200) {
                      console.log(response.data)
                      setChapters(response.data.chapter)
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
      }, [subjectId]); // Add subjectId as a dependency
      
 // Prepare data for dropdowns
 const dropdowns = chapters.map((chapter, index) => ({
    name: chapter.name,
    id:chapter.id,
    lessons: chapter.lessons.map(lesson => ({
      name: lesson.name,
      path: `lesson/${lesson.id}`
    })),
  }));

    // Split into pairs for row display
    const pairs = [];
    for (let i = 0; i < dropdowns.length; i += 2) {
      pairs.push(dropdowns.slice(i, i + 2));
    }

    if (isLoading) {
        return (
               <div className="w-1/4 h-full flex items-start mt-[10%] justify-center m-auto">
                      <Loading />
               </div>
        );
 }

 if (!chapters) {
        return <div className='text-mainColor text-2xl font-bold w-full h-full flex items-center justify-center'>No chapters data available</div>;
 }

    return(
      <>
        <div className="curricula-page p-10">
          {pairs.map((pair, index) => (
            <div key={index} className="flex flex-wrap gap-10 mb-5 md:flex-nowrap">
              {pair.map((dropdown, i) => (
                <div key={i} className="flex-1">
                  <DropDownUnits
                    unitName={dropdown.name}
                    unit_ID={dropdown.id}
                    lessons={dropdown.lessons}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </>
    )
}
export default UnitsPage;

