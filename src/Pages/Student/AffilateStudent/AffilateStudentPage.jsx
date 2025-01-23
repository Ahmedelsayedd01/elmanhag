import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../../Context/Auth';
import { Button } from '../../../Components/Button';
import AndroidIcon from "../../../Components/AndroidIcon";
import AppleIcon from "../../../Components/AppleIcon";
import Loading from '../../../Components/Loading';
import { NavLink, Link } from "react-router-dom";

const AffilateStudentPage = () => {
  const [hasCode, setHasCode] = useState(false); // Track if code is already fetched
  const [affiliateCode, setAffiliateCode] = useState(''); // State for storing the affiliate code
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const auth = useAuth();
  const [userId, setUserId] = useState(null); // Store the user ID
  const [showModal, setShowModal] = useState(false);
  const [isWarningOpen, setIsWarningOpen] = useState(false);
  const warningMessage = "قريبا !";

  const showWarning = () => {
    setIsWarningOpen(true);
  };

  const handleCloseWarning = () => {
    setIsWarningOpen(false);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/app.apk";  // Correct path to the APK
    link.download = "app.apk";  // Name of the file when downloaded
    link.click();
  };

  useEffect(() => {
    // Fetch the user details from localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser && storedUser.id) {
      setUserId(storedUser.id);

      // Check if code exists in the user object in local storage
      const storedCode = storedUser.affilate_code;
      if (storedCode) {
        setAffiliateCode(storedCode); // Use the stored affiliate code
        setHasCode(true);
      }
    }
  }, [auth.user.token]);

  const fetchAffiliateCode = async (e) => {
    e.preventDefault(); // Prevent page reload on form submission
    setIsLoading(true); // Set loading state when fetching the code
    try {
      const response = await axios.post(
        'http://62.84.185.153/plesk-site-preview/bcknd.elmanhag.com/https/62.84.185.153/api/createAffilate',
        { user_id: userId },
        {
          headers: {
            Authorization: `Bearer ${auth.user.token}`,
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      );

      if (response.status === 200) {
        const code = response.data.affilate_code; // Assuming the response has a 'affilate_code' property
        setAffiliateCode(code); // Set the affiliate code in state
        setHasCode(true); // Hide the button and show the code
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

  if (isLoading) {
    return (
      <div className="w-1/4 h-full flex items-start mt-[10%] justify-center m-auto">
        <Loading />
      </div>
    );
  }

  return (
    <div className="affiliate-page w-full mt-10">
      {!hasCode ? (
        <form onSubmit={fetchAffiliateCode} className="w-full flex flex-col items-center justify-center gap-y-5 px-4 md:px-10">
          <div className="w-full flex flex-col justify-start gap-5">
            <p className="font-almarai text-[24px] md:text-[36px] leading-[32px] md:leading-[54px] font-normal text-right capitalize text-[#7E7D7D]">
              يمكنك الحصول على كود خاص بك الآن
            </p>
            <div className="flex items-center justify-center w-full md:w-1/2 lg:w-1/3 mt-4">
              <Button
                type="submit"
                Text="الحصول علي كود"
                BgColor="bg-mainColor"
                Color="text-white"
                Width="full"
                Size="text-lg md:text-2xl"
                px="px-10 md:px-28"
                rounded="rounded-2xl"
                disabled={isLoading} // Disable button while loading
              />
            </div>
          </div>
        </form>
      ) : (
        <div className="w-full flex flex-col items-center gap-10 mt-5">
          <div className='flex flex-col gap-5 items-center'>
            <h1 className='text-2xl font-semibold'>الكود الخاص  <span className='text-mainColor'>{affiliateCode}</span></h1>
            <h1 className='text=xl font-bold text-mainColor'>حمل التطبيق من هنا</h1>
          </div>
          <div className="flex gap-5">
            <button style={{ cursor: "pointer" }} onClick={handleDownload}>
              <div className="flex gap-5 bg-[#F6F6F6] px-7 py-4 justify-center items-center">
                <h1 className="text-mainColor font-semibold">Google Store</h1>
                <div>
                  <AndroidIcon />
                </div>
              </div>
            </button>

            <button onClick={showWarning}>
              <div className="flex gap-5 bg-[#F6F6F6] px-7 py-4 justify-center items-center cursor-pointer">
                <h1 className="text-mainColor font-semibold">App Store</h1>
                <div>
                  <AppleIcon />
                </div>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Warning Modal */}
      {isWarningOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 lg:mr-10">
          <div className="bg-white p-6 md:p-12 rounded-lg w-11/12 md:w-1/2 lg:w-1/3">
            <h2 className="text-[#6B6B6B] text-xl md:text-2xl font-bold mb-4">{warningMessage}</h2>
            <div className="flex justify-end gap-4 sm:gap-2">
              <Button
                Text="حسنا"
                Width="auto"
                BgColor="bg-mainColor"
                Color="text-white"
                handleClick={handleCloseWarning} // Close modal when clicked
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AffilateStudentPage;
