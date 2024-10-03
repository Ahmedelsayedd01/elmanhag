// import React, { useContext } from 'react'

// const My_SubscriptionsPage = () => {
//        return (
//               <>
//                      <div className="flex">My_SubscriptionsPage</div>
//               </>
//        )
// }

// export default My_SubscriptionsPage



import React, { useEffect, useState } from 'react'; 
import { useNavigate, useLocation } from 'react-router-dom';
import Loading from '../../../Components/Loading';
import { useAuth } from '../../../Context/Auth';
import axios from 'axios';

const My_SubscriptionsPage = () => {
  const [plans, setPlans] = useState([]);
  const [subjectPlans, setSubjectPlans] = useState([]);
//   const [bundlePlans, setBundlePlans] = useState([]);
  const [livePlans, setLivePlans] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();
  const location = useLocation();
  const { subject_Id } = location.state || {}; // Retrieve state passed via navigation

  const fetchMyPlans = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://bdev.elmanhag.shop/student/subscription', {
        headers: {
          Authorization: `Bearer ${auth.user.token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      if (response.status === 200) {
       console.log(response.data)
        setPlans(response.data);
        setSubjectPlans(response.data.subjects || []);
        setLivePlans(response.data.live || []);
      }
    } catch (error) {
      const errorMessages = error?.response?.data?.errors;
      let errorMessageString = 'Error occurred';
      if (errorMessages) {
        errorMessageString = Object.values(errorMessages).flat().join(' ');
      }
      auth.toastError('Error', errorMessageString);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMyPlans();
  }, [auth.user.token]);

  const handleBuyClick = (plan, planType) => {
    navigate('../plansMethod', { state: { plan, planType } });
  };

  if (isLoading) {
    return (
      <div className="w-1/4 h-full flex items-start mt-[10%] justify-center m-auto">
        <Loading />
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-6">اشتراكاتي الحاليه</h1>
      
      {/* Subjects Section */}
      {subjectPlans.length > 0 && (
        <section className="mb-8">
          <h2 className="text-3xl font-semibold text-center mb-4"> المواد</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjectPlans.map((subject) => (
              <div key={subject.id} className="bg-white p-6 rounded-lg shadow-md text-center flex flex-col justify-between">
                <div>
                  <div className='flex justify-center'>
                    <img src={subject.cover_photo_url} alt={subject.name} className="" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{subject.name}</h3>
                  {/* <p className="text-gray-700 mb-2">
                   {subject.description}
                  </p> */}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Live Plans Section */}
      {/* {livePlans.length > 0 && (
        <section className="mb-8">
          <h2 className="text-3xl font-semibold text-center mb-4"> اللايف</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {livePlans.map((live) => (
              <div key={live.id} className="bg-white p-6 rounded-lg shadow-md text-center flex flex-col justify-between">
                <div>
                  <div className='flex justify-center'>
                    <img src={live.cover_photo_url} alt={live.name} className="" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{live.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>
      )} */}
    </div>
  );
};

export default My_SubscriptionsPage;
