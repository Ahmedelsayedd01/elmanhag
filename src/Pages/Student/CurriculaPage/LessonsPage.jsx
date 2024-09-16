import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../../Context/Auth';
import Loading from '../../../Components/Loading';
import axios from 'axios';

const LessonsPage = ({unitId,lessonId}) => {

       const auth = useAuth();
      const [isLoading, setIsLoading] = useState(false);
      const [lessons,setLessons] = useState([])

//       const fetchChapters = async () => {
//         setIsLoading(true);
//         console.log(unitId)
//         console.log(lessonId)
//         try {
//                const response = await axios.post(': https://bdev.elmanhag.shop/student/chapter/lesson/view',{
//                 'subject_id': unitId,
//                 'lesson_id' : lessonId
//                },
//                {
//                       headers: {
//                              Authorization: `Bearer ${auth.user.token}`,
//                       },
//                });
//                if (response.status === 200) {
//                       console.log(response.data)
//                       setLessons(response.data.lesson)
//                }
//         } catch (error) {
//                console.error('Error fetching Lessons data:', error);
//         } finally {
//                setIsLoading(false);
//         }
//         };

//        useEffect(() => {
//               fetchChapters();
//        }, []);

//  // Prepare data for dropdowns
//  const dropdowns = chapters.map((chapter, index) => ({
//     name: chapter.name,
//     lessons: chapter.lessons.map(lesson => ({
//       name: lesson.name,
//       path: `/dashboard/curricula/lesson/${lesson.id}`
//     })),
//   }));

//     // Split into pairs for row display
//     const pairs = [];
//     for (let i = 0; i < dropdowns.length; i += 2) {
//       pairs.push(dropdowns.slice(i, i + 2));
//     }

//     if (isLoading) {
//         return (
//                <div className="w-1/4 h-full flex items-start mt-[10%] justify-center m-auto">
//                       <Loading />
//                </div>
//         );
//        }

//        if (!chapters) {
//               return <div className='text-mainColor text-2xl font-bold w-full h-full flex items-center justify-center'>No chapters data available</div>;
//        }

       return (
              <>
                     <div>LessonsPage</div>
              </>
       )
}

export default LessonsPage