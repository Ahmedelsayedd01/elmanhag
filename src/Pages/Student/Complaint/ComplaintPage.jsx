import React, { useState } from 'react';
import { useAuth } from '../../../Context/Auth';
import axios from 'axios';
import InputCustom from '../../../Components/InputCustom';
import { Button } from '../../../Components/Button';
import { useNavigate } from 'react-router-dom';

const ComplaintPage = () => {
  const auth = useAuth();
  const [problem, setProblem] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();


  const handleGoBack = () => {
    navigate(-1, { replace: true });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      // Make the API request
      const response = await axios.post('https://bcknd.elmanhag.com/student/complaint/store',
        { complaint: problem },
        {
          headers: {
            Authorization: `Bearer ${auth.user.token}`,
          },
        });
      if (response.status === 200) {
        auth.toastSuccess('تم الارسال بنجاح');
      } else {
        auth.toastError('فشل الارسال');
      }
    } catch (error) {
      console.log(error.response); // Log the full response for debugging
      console.log(error.response.data.errors);
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

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col items-center justify-center gap-y-5 px-4 md:px-10">
      <div className="w-full flex flex-col justify-start gap-5">
        <p className="font-almarai text-[24px] md:text-[36px] leading-[32px] md:leading-[54px] font-normal text-right capitalize text-[#7E7D7D]">
          نحن نقدّر ملاحظاتك واسمحوا لنا أن نعرف شكواك أو اقتراحاتك
        </p>

        <div className="w-full md:w-2/3 lg:w-1/2 mt-4">
          <InputCustom
            type="text"
            placeholder="اكتب اقتراحك أو شكوتك هنا"
            value={problem}
            textDirection="text-right"
            borderColor="mainColor"
            paddinRight="pr-15"
            onChange={(e) => setProblem(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-center w-full md:w-1/2 lg:w-1/3 mt-4">
          <Button
            type="submit"
            Text="ارسال"
            BgColor="bg-mainColor"
            Color="text-white"
            Width="full"
            Size="text-lg md:text-2xl"
            px="px-10 md:px-28"
            rounded="rounded-2xl"
            stateLoding={isLoading}
          />
        </div>
      </div>
    </form>
  );
};

export default ComplaintPage;
