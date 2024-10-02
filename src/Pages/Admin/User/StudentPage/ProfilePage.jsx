import React, { useContext } from 'react';
import { StudentDataContext } from '../../../../Layouts/Admin/EditeProfileStudent';

const ProfilePage = () => {
  const student = useContext(StudentDataContext);

  return (
    <>
      {student ? (
        <>
          <h1>Name: {student.city_id}</h1>
          <h1>Name: {student.name}</h1>
          <div>ProfilePage</div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default ProfilePage;
