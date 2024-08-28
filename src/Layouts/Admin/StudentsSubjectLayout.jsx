import React, { createContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import HeaderPageSection from '../../Components/HeaderPageSection';
import { StudentsSubjectPage } from '../../Pages/AllPages';

export const SubjectStudentContext = createContext()

const StudentsSubjectLayout = () => {

  const navigate = useNavigate();

  const { subjectId } = useParams();

  const [subjectStudent, setSubjectStudent] = useState(null)


  useEffect(() => {
    const subjectData = JSON.parse(localStorage.getItem('subjects')) || [];
    const allStudents = subjectData.subjects;
    console.log('Subject Students from local storage:', subjectData); // Debugging log
    console.log('allStudents:', allStudents); // Debugging log

    if (allStudents.length > 0) {
      const Student = allStudents.find(c => c.id === parseInt(subjectId));
      console.log('Selected Student:', Student); // Debugging log

      setSubjectStudent(Student)
    } else {
      console.warn('No Subject Students available in local storage.'); // Warn if no countries are found
    }
  }, [subjectId]);

  const handleGoBack = () => {
    navigate(-1, { replace: true });
  };
  return (
    <>
      <HeaderPageSection handleClick={handleGoBack} name="Students" />
      <SubjectStudentContext.Provider value={subjectStudent}>
        <StudentsSubjectPage />
      </SubjectStudentContext.Provider>
    </>
  )
}

export default StudentsSubjectLayout