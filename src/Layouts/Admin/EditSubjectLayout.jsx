import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import HeaderPageSection from '../../Components/HeaderPageSection';
import { EditSubjectPage } from '../../Pages/AllPages';

export const SubjectEditContext = createContext()

const EditSubjectLayout = () => {
  const navigate = useNavigate();

  const { subjectId } = useParams();

  const [subjectEdit, setSubjectEdit] = useState(null)


  useEffect(() => {
    const subjectsData = JSON.parse(localStorage.getItem('subjects')) || [];
    const subjectList = subjectsData.subjects;
    console.log('Subject from local storage:', subjectsData); // Debugging log
    console.log('subjectList from subjectData:', subjectList); // Debugging log

    if (subjectList.length > 0) {
      const Subject = subjectList.find(c => c.id === parseInt(subjectId));
      console.log('Selected Subject:', Subject); // Debugging log

      setSubjectEdit(Subject)
    } else {
      console.warn('No Subject available in local storage.'); // Warn if no countries are found
    }
  }, [subjectId]);


  const handleGoBack = () => {
    navigate(-1, { replace: true });
  };

  return (
    <>
      <HeaderPageSection handleClick={handleGoBack} name="Edit Subject" />
      <SubjectEditContext.Provider value={subjectEdit}>
        <EditSubjectPage />
      </SubjectEditContext.Provider>
    </>
  )
}

export default EditSubjectLayout