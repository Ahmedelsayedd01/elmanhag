import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AllLiveLessonesPage } from '../../Pages/AllPages'
import { useNavigate } from 'react-router-dom';

const AllLiveLessonesLayout = () => {
       const { lessonliveId } = useParams()
       const { subjectliveId } = useParams()
       const navigate = useNavigate();
       const handleGoBack = () => {
              navigate(-1, { replace: true });
       };

       useEffect(() => {
              console.log("Lesson Live ID:", lessonliveId);  // Log unitId to check if it's coming correctly
       }, [lessonliveId]);

       return (
              <>
                     <AllLiveLessonesPage lessonId={lessonliveId} subjectId={subjectliveId} />
              </>
       )
}

export default AllLiveLessonesLayout