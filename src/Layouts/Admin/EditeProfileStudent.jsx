import React, { createContext, useEffect, useState } from 'react';
import { EditProfilePage } from '../../Pages/AllPages';
import Taps from '../../Components/Taps';
import { useNavigate, useParams } from 'react-router-dom';
import HeaderPageSection from '../../Components/HeaderPageSection';

// Create the context outside the component
// export const StudentDataContext = createContext();

const EditeProfileStudent = () => {
    const [allStudent, setAllStudent] = useState([]);
    const [studentEdit, setStudentEdit] = useState(null);
    // const { profileStudentId } = useParams();
    const navigate = useNavigate();

    // useEffect(() => {
    //     const allStudentData = () => {
    //         const allStudent = JSON.parse(localStorage.getItem('students'));
    //         if (allStudent && allStudent.students) {
    //             setAllStudent(allStudent.students);
    //         }
    //     };
    //     allStudentData();
    // }, []);

    // useEffect(() => {
    //     if (allStudent.length > 0 && profileStudentId) {
    //         const filteredStudent = allStudent.find(
    //             (student) => student.id === parseInt(profileStudentId)
    //         );
    //         setStudentEdit(filteredStudent);
    //     }
    // }, [allStudent, profileStudentId]);

    // console.log('allStudent', allStudent);
    // console.log('studentEdit', studentEdit);

    const handleGoBack = () => {
        navigate('/dashboard_admin/student', { replace: true });
    };

    return (
        <>
            <HeaderPageSection name='Edit Student' handleClick={handleGoBack} />
            <div className="LinksProfile flex flex-wrap w-full justify-between mb-8 pt-5">
                <Taps path={'profile'} name={"profile"} />
                <Taps path={'parent'} name={"parent"} />
                <Taps path={'Purchases'} name={"Purchases"} />
                <Taps path={'Progress'} name={"Progress"} />
                <Taps path={'loginHistory'} name={"login History"} />
            </div>
            {/* <h1>Profile ID: {profileStudentId}</h1> */}
            {/* <StudentDataContext.Provider value={studentEdit}> */}
            <EditProfilePage />
            {/* </StudentDataContext.Provider> */}
        </>
    );
};

export default EditeProfileStudent;
