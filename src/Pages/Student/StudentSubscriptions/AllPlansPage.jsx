// import React, { useEffect, useState } from 'react'; 
// import { useNavigate, useLocation } from 'react-router-dom';
// import Loading from '../../../Components/Loading';
// import { useAuth } from '../../../Context/Auth';
// import axios from 'axios';

// const AllPlansPage = () => {
//   const [plans, setPlans] = useState([]);
//   const [subjectPlans, setSubjectPlans] = useState([]);
//   const [bundlePlans, setBundlePlans] = useState([]);
//   const [livePlans, setLivePlans] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();
//   const auth = useAuth();
//   const location = useLocation();
//   const { subject_Id } = location.state || {}; // Retrieve state passed via navigation

//   const fetchPlans = async () => {
//     setIsLoading(true);
//     try {
//       const response = await axios.get('https://bdev.elmanhag.shop/student/bundles', {
//         headers: {
//           Authorization: `Bearer ${auth.user.token}`,
//           'Content-Type': 'application/json',
//           'Accept': 'application/json',
//         },
//       });

//       if (response.status === 200) {
//         console.log(response.data)
//         setPlans(response.data);
//         const allSubjects = response.data.subjects || [];

//         // Check if subject_Id exists and filter accordingly
//         if (subject_Id !== undefined) {
//           const filteredSubjects = allSubjects.filter(subject => subject.id == subject_Id);
//           setSubjectPlans(filteredSubjects);
//         } else {
//           setSubjectPlans(allSubjects); // If no subject_Id, show all subjects
//         }

//         setBundlePlans(response.data.bundles || []);
//         setLivePlans(response.data.live || []);
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
//     navigate('../plansMethod', { state: { plan, planType } });
//   };

//   if (isLoading) {
//     return (
//       <div className="w-1/4 h-full flex items-start mt-[10%] justify-center m-auto">
//         <Loading />
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <h1 className="text-4xl font-bold text-center mb-6">اشتراك واحد يفتح لك بابًا واسعًا من المعرفة</h1>
//       <h2 className="text-2xl font-light text-center mb-8">
//         استمتع بتجربة تعليمية شاملة: فيديوهات، واجبات، مراجعات، وحصص لايف لكل الدروس
//       </h2>

      // {/* Bundles Section */}
      // {bundlePlans.length > 0 && (
      //   <section className="mb-8">
      //     <h2 className="text-3xl font-semibold text-center mb-4">خطط الباقات</h2>
      //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      //       {bundlePlans.map((bundle) => (
      //         <div key={bundle.id} className="bg-white p-6 rounded-lg shadow-md text-center flex flex-col justify-between">
      //           <div>
      //             <div className='flex justify-center'>
      //               <img src={bundle.cover_photo_link} alt={bundle.name} className="" />
      //             </div>
      //             <h3 className="text-xl font-semibold mb-2">{bundle.name}</h3>
      //             <p className="text-gray-700 mb-2">
      //               {bundle.price_discount > 0 ?(
      //                 <>
      //                 {/* // ? `${bundle.price_discount} جنيه بدلا من ${bundle.price} جنيه`
      //                 // : `${bundle.price} جنيه` */}
      //                 {`${bundle.price_discount} جنيه بدلا من `}
      //                 <span className="line-through">{bundle.price} جنيه</span>
      //                 </>
      //             ) : (
      //               `${bundle.price} جنيه`
      //                 )}
      //             </p>
      //           </div>
      //           <button
      //             onClick={() => handleBuyClick(bundle, 'Bundle')}
      //             className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full mt-4"
      //           >
      //             اشتراك الآن
      //           </button>
      //         </div>
      //       ))}
      //     </div>
      //   </section>
      // )}

//       {/* Subjects Section */}
      // {subjectPlans.length > 0 && (
      //   <section className="mb-8">
      //     <h2 className="text-3xl font-semibold text-center mb-4">خطط المواد</h2>
      //     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      //       {subjectPlans.map((subject) => (
      //         <div key={subject.id} className="bg-white p-6 rounded-lg shadow-md text-center flex flex-col justify-between">
      //           <div>
      //             <div className='flex justify-center'>
      //               <img src={subject.cover_photo_url} alt={subject.name} className="" />
      //             </div>
      //             <h3 className="text-xl font-semibold mb-2">{subject.name}</h3>
      //             <p className="text-gray-700 mb-2">
      //               {subject.price_discount > 0 ? (
      //                 <>
      //                   {`${subject.price_discount} جنيه بدلا من `}
      //                   <span className="line-through">{subject.price} جنيه</span>
      //                 </>
      //               ) : (
      //                 `${subject.price} جنيه`
      //               )}
      //             </p>
      //           </div>
      //           <button
      //             onClick={() => handleBuyClick(subject, 'Subject')}
      //             className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full mt-4"
      //           >
      //             اشتراك الآن
      //           </button>
      //         </div>
      //       ))}
      //     </div>
      //   </section>
      // )}

//     </div>
//   );
// };

// export default AllPlansPage;

import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Loading from '../../../Components/Loading';
import { useAuth } from '../../../Context/Auth';
import axios from 'axios';

const AllPlansPage = () => {
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
  const { subject_Id } = location.state || {};

  const fetchPlans = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://bdev.elmanhag.shop/student/bundles', {
        headers: {
          Authorization: `Bearer ${auth.user.token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

      if (response.status === 200) {
        console.log(response.data)
        setPlans(response.data);
        const allSubjects = response.data.subjects || [];

        if (subject_Id !== undefined) {
          const filteredSubjects = allSubjects.filter(subject => subject.id == subject_Id);
          setSubjectPlans(filteredSubjects);
        } else {
          setSubjectPlans(allSubjects);
        }

        setBundlePlans(response.data.bundles || []);
        setLivePlans(response.data.live || []);
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
    fetchPlans();
  }, [auth.user.token]);

  const handleSelectSubject = (subjectId) => {
    setSelectedSubjects((prevSelected) =>
      prevSelected.includes(subjectId)
        ? prevSelected.filter((id) => id !== subjectId)
        : [...prevSelected, subjectId]
    );
  };

  const handleCancelSelection = () => {
    setSelectedSubjects([]);
    setIsSelecting(false);
  };

  const handleBuyClick = (plan, planType) => {
    navigate('../plansMethod', { state: { plan, planType } });
  };

  const handleSelectedPlansClick = () => {
    const selectedPlans = subjectPlans.filter(subject => selectedSubjects.includes(subject.id));
    console.log(selectedPlans)
    navigate('../plansMethod', { state: { plan: selectedPlans, planType: 'Subject' } });
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
      <h1 className="text-4xl font-bold text-center mb-6">اشتراك واحد يفتح لك بابًا واسعًا من المعرفة</h1>
      <h2 className="text-2xl font-light text-center mb-8">
        استمتع بتجربة تعليمية شاملة: فيديوهات، واجبات، مراجعات، وحصص لايف لكل الدروس
      </h2>

      {bundlePlans.length > 0 && (
        <section className="mb-8">
          <h2 className="text-3xl font-semibold text-center mb-4">خطط الباقات</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bundlePlans.map((bundle) => (
              <div key={bundle.id} className="bg-white p-6 rounded-lg shadow-md text-center flex flex-col justify-between">
                <div>
                  <div className='flex justify-center'>
                    <img src={bundle.cover_photo_link} alt={bundle.name} className="" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{bundle.name}</h3>
                  <p className="text-gray-700 mb-2">
                    {bundle.price_discount > 0 ? (
                      <>
                        {`${bundle.price_discount} جنيه بدلا من `}
                        <span className="line-through">{bundle.price} جنيه</span>
                      </>
                    ) : (
                      `${bundle.price} جنيه`
                    )}
                  </p>
                </div>
                <button
                  onClick={() => handleBuyClick(bundle, 'Bundle')}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full mt-4"
                >
                  اشتراك الآن
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {subjectPlans.length > 0 && (
        <section className="mb-8">
          <h2 className="text-3xl font-semibold text-center mb-4">خطط المواد</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjectPlans.map((subject) => (
              <div key={subject.id} className="bg-white p-6 rounded-lg shadow-md text-center flex flex-col justify-between">
                <div>
                  <div className='flex justify-center'>
                    <img src={subject.cover_photo_url} alt={subject.name} className="" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{subject.name}</h3>
                  <p className="text-gray-700 mb-2">
                    {subject.price_discount > 0 ? (
                      <>
                        {`${subject.price_discount} جنيه بدلا من `}
                        <span className="line-through">{subject.price} جنيه</span>
                      </>
                    ) : (
                      `${subject.price} جنيه`
                    )}
                  </p>
                  
                  {!isSelecting && (
                    <button
                      onClick={() => handleBuyClick(subject, 'Subject')}
                      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-full mt-4"
                    >
                      اشتراك الآن
                    </button>
                  )}

                  {isSelecting && (
                    <div className="mt-4">
                      <label>
                        <input
                          type="checkbox"
                          checked={selectedSubjects.includes(subject.id)}
                          onChange={() => handleSelectSubject(subject.id)}
                        />
                        {' '} اختر المادة
                      </label>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {!isSelecting ? (
            <div className='w-full flex justify-center'>
              <button
                onClick={() => setIsSelecting(true)}
                className="bg-mainColor text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
              >
                اختر المواد
              </button>
            </div>
          ) : (
            <div className="flex justify-between mt-4">
              <button
                onClick={handleSelectedPlansClick} // Navigate with selected plans
                className="bg-mainColor text-white px-4 py-2 rounded hover:bg-green-600"
              >
                {` اشترك الان : (${selectedSubjects.length})`}
              </button>
              <button
                onClick={handleCancelSelection}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                إلغاء
              </button>
            </div>
          )}
        </section>
      )}

      {liveRecordedPlans.length > 0 && (
        <section className="mb-8">
          <h2 className="text-3xl font-semibold text-center mb-4">خطط اللايفات</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {liveRecordedPlans.map((live) => (
              <div key={live.id} className="bg-white p-6 rounded-lg shadow-md text-center flex flex-col justify-between">
                <div>
                  <div className='flex justify-center'>
                    <img src={live.cover_photo_link} alt={live.name} className="" />
                  </div>
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
    </div>
  );
};

export default AllPlansPage;
