import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { LessonsPage } from '../../Pages/AllPages'
import { useNavigate } from 'react-router-dom';

const LessonsLayout = () => {
       const {lessonId} = useParams()
       // const { lessonId } = useParams()
       const navigate = useNavigate();
       const handleGoBack = () => {
       navigate(-1, { replace: true });
       };

       // useEffect(() => {
       //        console.log("Lesson ID:", lesson_Id);  // Log unitId to check if it's coming correctly
       //    }, [lesson_Id]);

       return (
              <>
                 <LessonsPage/> 
              </>
       )
}

export default LessonsLayout