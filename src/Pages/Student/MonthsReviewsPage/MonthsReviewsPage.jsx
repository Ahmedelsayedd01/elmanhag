// import React, { useState, useEffect } from 'react';
// import { FaRegArrowAltCircleRight, FaRegArrowAltCircleLeft } from 'react-icons/fa';
// import { useNavigate, useLocation,Link } from 'react-router-dom';
// import axios from 'axios';
// import { useAuth } from '../../../Context/Auth';
// import { Button } from '../../../Components/Button';
// import Loading from '../../../Components/Loading';

// const MonthsReviewsPage = () => {

//   const [plans, setPlans] = useState([]);
//   const [subjectPlans, setSubjectPlans] = useState([]);
//   const [bundlePlans, setBundlePlans] = useState([]);
//   const [livePlans, setLivePlans] = useState([]);
//   const [liveRecordedPlans, setLiveRecordedPlans] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [selectedSubjects, setSelectedSubjects] = useState([]);
//   const [isSelecting, setIsSelecting] = useState(false);
//   const navigate = useNavigate();
//   const auth = useAuth();
//   const location = useLocation();

//   const [studentSubject, setStudentSubject] = useState([]);


//   const fetchSubjects = async () => {
//     setIsLoading(true);
//     try {
//            const response = await axios.get('http://62.84.185.153/plesk-site-preview/bcknd.elmanhag.com/https/62.84.185.153/student/recorded_live',
//           {
//                   headers: {
//                          Authorization: `Bearer ${auth.user.token}`,
//                          'Content-Type': 'application/json',
//                          Accept: 'application/json',
//                   },

//            });
//            if (response.status === 200) {
//                  console.log(response.data)
//                  setStudentSubject(response.data.live_recorded)
//            }
//          } 
//     catch (error) {
//           console.log(error.response); // Log the full response for debugging
//           const errorMessages = error?.response?.data?.errors;
//           let errorMessageString = 'Error occurred';
//         if (errorMessages) {
//                 errorMessageString = Object.values(errorMessages).flat().join(' ');
//         }
//         auth.toastError('Error', errorMessageString);
//         }
//     finally {
//         setIsLoading(false);
//         }
//     };

//    useEffect(() => {
//           fetchSubjects();
//    }, []);

//   const fetchPlans = async () => {
//     setIsLoading(true);
//     try {
//       const response = await axios.get('http://62.84.185.153/plesk-site-preview/bcknd.elmanhag.com/https/62.84.185.153/student/bundles', {
//         headers: {
//           Authorization: `Bearer ${auth.user.token}`,
//           'Content-Type': 'application/json',
//           'Accept': 'application/json',
//         },
//       });

//       if (response.status === 200) {
//         console.log(response.data)
//         setLiveRecordedPlans(response.data.live_recorded || []);
//       }
//     } catch (error) {
//       const errorMessages = error?.response?.data?.errors;
//       let errorMessageString = 'Error occurred';
//       if (errorMessages) {
//         errorMessageString = Object.values(errorMessages).flat().join(' ');
//       }
//       auth.toastError('Error', errorMessageString);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPlans();
//   }, [auth.user.token]);

//   const handleBuyClick = (plan, planType) => {
//     navigate('../subscriptions/plansMethod', { state: { plan, planType } });
//   };

//   if (isLoading) {
//     return (
//       <div className="w-1/4 h-full flex items-start mt-[10%] justify-center m-auto">
//         <Loading />
//       </div>
//     );
//   }

//   return (
//     <>

//     <div className="p-4 md:p-8 lg:p-12">        
//                     <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
//                         {studentSubject.map((subject) => (
//                             <Link to={`../curricula_live/lesson_live/${subject.id}`} state={{live:subject , liveId:subject.id}} key={subject.id}>
//                             <div

//                                 className="subject-box p-3 flex flex-col justify-center items-center bg-white rounded-xl shadow-lg hover:cursor-pointer transition-transform transform hover:scale-105"
//                                 style={{ boxShadow: '0px 0px 8px rgba(208, 16, 37, 0.12)' }}
//                                 // onClick={() => handleNavigate(subject.id ,subject)}
//                             >
//                                 <span className="text-mainColor text-lg md:text-xl lg:text-2xl font-bold mb-3">
//                                     {subject.name || '-'}
//                                 </span>
//                                 {/* <span className="text-mainColor text-lg md:text-xl lg:text-2xl font-bold mb-3">
//                                     {subject.description}
//                                 </span> */}
//                                 <span className="text-black text-lg md:text-xl lg:text-2xl font-bold mb-3">
//                                     {subject.chapter?.name || subject.description || '-'}
//                                 </span>
//                                 {/* <img
//                                     src={subject.thumbnail_url}
//                                     alt={subject.name}
//                                     // className="w-32 h-32"
//                                 /> */}
//                             </div>
//                             </Link>
//                         ))}
//                     </div>
//     </div>


//     {liveRecordedPlans.length > 0 && (
//       <section className="mb-8">
//         {/* <h2 className="text-3xl font-semibold text-center mb-4">خطط اللايفات</h2> */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {liveRecordedPlans.map((live) => (
//             <div key={live.id} className="bg-white p-6 rounded-lg shadow-md text-center flex flex-col justify-between">
//               <div>
//                 {/* <div className='flex justify-center'>
//                   <img src={live.cover_photo_link} alt={live.name} className="" />
//                 </div> */}
//                 <h3 className="text-xl font-semibold mb-2">{live.name}</h3>
//                 <p className="text-gray-700 mb-2">
//                   {live.price_discount > 0 ? (
//                     <>
//                       {`${live.price_discount} جنيه بدلا من `}
//                       <span className="line-through">{live.price} جنيه</span>
//                     </>
//                   ) : (
//                     `${live.price} جنيه`
//                   )}
//                 </p>
//               </div>
//               <button
//                 onClick={() => handleBuyClick(live, 'Recorded live')}
//                 className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full mt-4"
//               >
//                 اشتراك الآن
//               </button>
//             </div>
//           ))}
//         </div>
//       </section>
//       )}
//     </>
//   );
// };

// export default MonthsReviewsPage;


import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../../Context/Auth';
import Loading from '../../../Components/Loading';

const MonthsReviewsPage = () => {
  const [plans, setPlans] = useState([]);
  const [subjectPlans, setSubjectPlans] = useState([]);
  const [bundlePlans, setBundlePlans] = useState([]);
  const [livePlans, setLivePlans] = useState([]);
  const [liveRecordedPlans, setLiveRecordedPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [isSelecting, setIsSelecting] = useState(false);
  const navigate = useNavigate();
  const auth = useAuth();
  const location = useLocation();
  const [studentSubject, setStudentSubject] = useState([]);

  const fetchSubjects = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://62.84.185.153/plesk-site-preview/bcknd.elmanhag.com/https/62.84.185.153/student/recorded_live', {
        headers: {
          Authorization: `Bearer ${auth.user.token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
      if (response.status === 200) {
        setStudentSubject(response.data.live_recorded);
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

  const fetchPlans = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('http://62.84.185.153/plesk-site-preview/bcknd.elmanhag.com/https/62.84.185.153/student/bundles', {
        headers: {
          Authorization: `Bearer ${auth.user.token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      if (response.status === 200) {
        setLiveRecordedPlans(response.data.live_recorded || []);
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
    fetchSubjects();
  }, []);

  useEffect(() => {
    fetchPlans();
  }, [auth.user.token]);

  const handleBuyClick = (plan, planType) => {
    navigate('../subscriptions/plansMethod', { state: { plan, planType } });
  };

  // Filter liveRecordedPlans based on studentSubject IDs
  const filteredLiveRecordedPlans = liveRecordedPlans.filter(
    (live) => !studentSubject.some((subject) => subject.id === live.id)
  );

  if (isLoading) {
    return (
      <div className="w-1/4 h-full flex items-start mt-[10%] justify-center m-auto">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <div className="p-4 md:p-8 lg:p-12">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {studentSubject.map((subject) => (
            <Link
              to={`../curricula_live/lesson_live/${subject.id}`}
              state={{ live: subject, liveId: subject.id }}
              key={subject.id}
            >
              <div
                className="subject-box p-3 flex flex-col justify-center items-center bg-white rounded-xl shadow-lg hover:cursor-pointer transition-transform transform hover:scale-105"
                style={{ boxShadow: '0px 0px 8px rgba(208, 16, 37, 0.12)' }}
              >
                <span className="text-mainColor text-lg md:text-xl lg:text-2xl font-bold mb-3">
                  {subject.name || '-'}
                </span>
                <span className="text-black text-lg md:text-xl lg:text-2xl font-bold mb-3">
                  {subject.chapter?.name || subject.description || '-'}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {filteredLiveRecordedPlans.length > 0 && (
        <section className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLiveRecordedPlans.map((live) => (
              <div
                key={live.id}
                className="bg-white p-6 rounded-lg shadow-md text-center flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-semibold mb-2">{live.name}</h3>
                  <p className="text-gray-700 mb-2">
                    {live.price_discount > 0 ? (
                      <>
                        {`${live.price_discount} جنيه بدلا من `}
                        <span className="line-through">{live.price} جنيه</span>
                      </>
                    ) : (
                      `${live.price} جنيه`
                    )}
                  </p>
                </div>
                <button
                  onClick={() => handleBuyClick(live, 'Recorded live')}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full mt-4"
                >
                  اشتراك الآن
                </button>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default MonthsReviewsPage;
