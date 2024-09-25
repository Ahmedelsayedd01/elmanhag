import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { LessonsPage } from '../../Pages/AllPages'
import { useNavigate } from 'react-router-dom';

const LessonsLayout = () => {
       const { lessonId } = useParams()
       const { subject_Id } = useParams()
       const navigate = useNavigate();
       const handleGoBack = () => {
              navigate(-1, { replace: true });
       };

       useEffect(() => {
              console.log("Lesson ID:", lessonId);  // Log unitId to check if it's coming correctly
       }, [lessonId]);

       return (
              <>
                     <LessonsPage lessonId={lessonId} subjectId={subject_Id} />
              </>
       )
}

export default LessonsLayout