import React, { useState, useEffect } from 'react';
import { FaRegArrowAltCircleRight, FaRegArrowAltCircleLeft } from 'react-icons/fa';
import { useNavigate, useLocation,Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../../Context/Auth';
import { Button } from '../../../Components/Button';
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

  const handleBuyClick = (plan, planType) => {
    navigate('../subscriptions/plansMethod', { state: { plan, planType } });
  };

  if (isLoading) {
    return (
      <div className="w-1/4 h-full flex items-start mt-[10%] justify-center m-auto">
        <Loading />
      </div>
    );
  }

  return (
    <>
      {liveRecordedPlans.length > 0 && (
        <section className="mb-8">
          {/* <h2 className="text-3xl font-semibold text-center mb-4">خطط اللايفات</h2> */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {liveRecordedPlans.map((live) => (
              <div key={live.id} className="bg-white p-6 rounded-lg shadow-md text-center flex flex-col justify-between">
                <div>
                  {/* <div className='flex justify-center'>
                    <img src={live.cover_photo_link} alt={live.name} className="" />
                  </div> */}
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
