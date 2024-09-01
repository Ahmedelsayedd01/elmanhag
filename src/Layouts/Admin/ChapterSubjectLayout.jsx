import React, { createContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import HeaderPageSection from '../../Components/HeaderPageSection';
import { ChapterSubjectPage } from '../../Pages/AllPages';

export const ChapterContext = createContext();

const ChapterSubjectLayout = () => {

  const { subjectId } = useParams();
  const navigate = useNavigate();

  const [subjectChapter, setSubjectChapter] = useState(null)

  useEffect(() => {
    const Data = JSON.parse(localStorage.getItem('subjects')) || [];
    const allChapters = Data.subjects;
    // const allchapter = allChapters.subjects.chapters;
    console.log("allChapters", allChapters)


    // if (allChapters.length > 0) {
    //   const Chapter = allChapters.find(c => c.id === parseInt(subjectId));
    //   console.log('Selected Chapter:', Chapter); // Debugging log

    //   setSubjectChapter(Chapter)
    // } else {
    //   console.warn('No Subject available in local storage.'); // Warn if no countries are found
    // }


    if (allChapters.length > 0) {
      const Chapter = allChapters.find((c) => (c.id === parseInt(subjectId)));
      if (Chapter) {
        console.log('Selected Chapter:', Chapter.chapters); // Debugging log
        setSubjectChapter(Chapter.chapters)
      } else {
        console.warn('No chapter found with the given subjectId.');
        // Optionally, handle this case (e.g., navigate away, display error UI, etc.)
      }
    } else {
      console.warn('No Subject available in local storage.'); // Warn if no countries are found

    }

  }, [subjectId])


  const handleGoBack = () => {
    navigate(-1, { replace: true });
  };
  return (
    <>
      <HeaderPageSection handleClick={handleGoBack} name="Chapters" />
      <ChapterContext.Provider value={{ subjectChapter, subjectId }}>
        <ChapterSubjectPage />
      </ChapterContext.Provider>
    </>
  )
}

export default ChapterSubjectLayout