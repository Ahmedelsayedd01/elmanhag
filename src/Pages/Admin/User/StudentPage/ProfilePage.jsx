import React, { useContext } from 'react';
// import { StudentDataContext } from '../../../../Layouts/Admin/EditeProfileStudent';
import { useParams } from 'react-router-dom';

const ProfilePage = () => {
  // const student = useContext(StudentDataContext);

  const { profileStudentId } = useParams()
  return (
    <>
      <div>{profileStudentId}</div>
      {/* {student ? (
        <> */}
      {/* <h1>Name: {student.city_id}</h1>
          <h1>Name: {student.name}</h1> */}
      {/* <div>ProfilePage</div>
        </>
      ) : (
      )} */}
    </>
  );
};

export default ProfilePage;
