import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from '../../../Context/Auth';
import Loading from '../../../Components/Loading';
import axios from 'axios';
import { Button } from '../../../Components/Button';
import { useNavigate, Link } from 'react-router-dom';
import InputCustom from '../../../Components/InputCustom';
import { CiEdit } from "react-icons/ci";
import DropDownMenu from '../../../Components/DropDownMenu'


const EditProfileStudentPage = () => {
  const [allCountry, setAllCountry] = useState('')
  const [allCity, setAllCity] = useState('')
  const [allJob, setAllJob] = useState('')

  const [selectCountry, setSelectCountry] = useState('Select Country');
  const [selectCountryId, setSelectCountryId] = useState(null);
  const [openSelectCountry, setOpenSelectCountry] = useState(false);

  const [selectCity, setSelectCity] = useState('Select City');
  const [selectCityId, setSelectCityId] = useState(null);
  const [openSelectCity, setOpenSelectCity] = useState(false);

  const [selectJob, setSelectJob] = useState('Select Job');
  const [selectJobId, setSelectJobId] = useState(null);
  const [openSelectJob, setOpenSelectJob] = useState(false);

  const auth = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [student, setStudent] = useState('')
  const [studentId, setStudentId] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [job, setJob] = useState('')
  const [gender, setGender] = useState('')

  const CountryRef = useRef(null);
  const CityRef = useRef(null);
  const JobRef = useRef(null);

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const fileInputRef = useRef(null); // Create a ref for the file 


  const fetchCountries = async () => {
    try {
      const response = await axios.get('https://bcknd.elmanhag.com/student/setting/view');
      console.log(response.data)
      setAllCountry(response.data.country);
      setAllCity(response.data.city)
      setAllJob(response.data.studentJobs)
    } catch (error) {
      console.error('Error fetching countries and cities:', error);
    }
  };

  const fetchStudentData = async () => {
    try {
      const response = await axios.get('https://bcknd.elmanhag.com/student/profile/view', {
        headers: {
          Authorization: `Bearer ${auth.user.token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      if (response.status === 200) {
        console.log(response.data);
        setStudent(response.data.user)
        setStudentId(response.data.user.id)
        setSelectCountry(response.data.user.country_name)
        setSelectCity(response.data.user.city_name)
        setSelectCountryId(response.data.user.country_id)
        setSelectCityId(response.data.user.city_id)
        setPhone(response.data.user.phone);
        setPreview(response.data.user.image_link);
        setSelectJob(response.data.user.student_jobs?.job)
        setSelectJobId(response.data.user.sudent_jobs_id)
        setGender(response.data.user.gender)
      }
    } catch (error) {
      const errorMessages = error?.response?.data?.errors;
      let errorMessageString = 'Error occurred';
      if (errorMessages) {
        errorMessageString = Object.values(errorMessages).flat().join(' ');
      }
      auth.toastError('Error', errorMessageString);
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch countries and student data concurrently
        await Promise.all([fetchCountries(), fetchStudentData()]);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [auth.user.token]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(file);
      setPreview(imageUrl);
    }
  };

  const handleClick = (event) => {
    event.stopPropagation(); // Prevent any other click events
    fileInputRef.current.click(); // Trigger file input click using ref
  };


  const handleOpenSelectCountry = () => {
    setOpenSelectCountry(!openSelectCountry);
    setOpenSelectCity(false);
    setOpenSelectJob(false);
  };

  const handleOpenSelectCity = () => {
    setOpenSelectCity(!openSelectCity);
    setOpenSelectCountry(false);
    setOpenSelectJob(false);
  };

  const handleOpenSelectJob = () => {
    setOpenSelectJob(!openSelectJob);
    setOpenSelectCountry(false);
    setOpenSelectCity(false);
  };

  const handleSelectCountry = (e) => {
    const inputElement = e.currentTarget.querySelector('.inputVal');
    const selectedOptionName = e.currentTarget.textContent.trim();
    const selectedOptionValue = inputElement ? inputElement.value : '';
    setSelectCountry(selectedOptionName);
    setSelectCountryId(parseInt(selectedOptionValue));
    setOpenSelectCountry(false);
    console.log('Selected Country:', selectedOptionName);
    console.log('Country ID:', selectedOptionValue);
  };

  const handleSelectCity = (e) => {
    const inputElement = e.currentTarget.querySelector('.inputVal');
    const selectedOptionName = e.currentTarget.textContent.trim();
    const selectedOptionValue = inputElement ? inputElement.value : '';
    setSelectCity(selectedOptionName);
    setSelectCityId(parseInt(selectedOptionValue));
    setOpenSelectCity(false);
    console.log('Selected City:', selectedOptionName);
    console.log('City ID:', selectedOptionValue);
  };


  const handleSelectJob = (e) => {
    const inputElement = e.currentTarget.querySelector('.inputVal');
    const selectedOptionName = e.currentTarget.textContent.trim();
    const selectedOptionValue = inputElement ? inputElement.value : '';
    setSelectJob(selectedOptionName);
    setSelectJobId(parseInt(selectedOptionValue));
    setOpenSelectJob(false);
    console.log('Selected Job:', selectedOptionName);
    console.log('Job ID:', selectedOptionValue);
  };

  const handleGoBack = () => {
    navigate(-1, { replace: true });
  };

  if (isLoading) {
    return (
      <div className="w-1/4 h-full flex items-start mt-[10%] justify-center m-auto">
        <Loading />
      </div>
    );
  }

  if (!allCountry && !allJob) {
    return (
      <div className="w-1/4 h-full flex items-start mt-[10%] justify-center m-auto">
        No Data to Edit
      </div>
    );
  }

  const handleSubmitEdit = async (e) => {
    e.preventDefault();

    // if (!password) {
    //   auth.toastError('من فضلك ادخل الرقم السري');
    //   return;
    // }
    // if (!confirmPassword) {
    //        auth.toastError('من فضلك قم بتاكيد الرقم السري');
    //        return;
    // }

    setIsLoading(true);
    // try {
    const formData = new FormData();
    formData.append('password', password);
    formData.append('phone', phone);
    formData.append('conf_password', confirmPassword);
    formData.append('country_id', selectCountryId);
    formData.append('city_id', selectCityId);
    if (image) {
      formData.append('image', image);
    }
    formData.append('sudent_jobs_id', selectJobId);

    for (let pair of formData.entries()) {
      console.log(pair[0] + ', ' + pair[1]);
    }

    try {
      const response = await axios.post(`https://bcknd.elmanhag.com/student/profile/modify`, formData, {
        headers: {
          Authorization: `Bearer ${auth.user.token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status === 200) {
        auth.toastSuccess('Profile Updated successfully!');
        handleGoBack();
      } else {
        auth.toastError('Failed to update profile.');
      }
    } catch (error) {
      const errorMessages = error?.response?.data.errors;
      console.log(error?.response?.data)
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
    <>
      <form onSubmit={handleSubmitEdit}>
        <div className="w-full flex flex-wrap items-center justify-start gap-3 p-6">

          <div className="image-upload-container">
            <div className="image-wrapper" onClick={handleClick}>
              {preview ? (
                <img src={preview} alt="Profile" className="rounded-image w-28 h-28" />
              ) : (
                <span className="placeholder">Upload Image</span>
              )}
              <input
                type="file"
                ref={fileInputRef} // Attach ref to input
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }} // Hide input
              />
              <CiEdit size={36} />
            </div>
          </div>

          <div className="lg:w-[30%] sm:w-full">
            <DropDownMenu
              ref={CountryRef}
              handleOpen={handleOpenSelectCountry}
              handleOpenOption={handleSelectCountry}
              stateoption={selectCountry}
              openMenu={openSelectCountry}
              options={allCountry}
            />
          </div>
          <div className="lg:w-[30%] sm:w-full">
            <DropDownMenu
              ref={CityRef}
              handleOpen={handleOpenSelectCity}
              handleOpenOption={handleSelectCity}
              stateoption={selectCity}
              openMenu={openSelectCity}
              options={allCity}
            />
          </div>
          <div className="lg:w-[30%] sm:w-full">
            <DropDownMenu
              ref={JobRef}
              handleOpen={handleOpenSelectJob}
              handleOpenOption={handleSelectJob}
              stateoption={selectJob}
              openMenu={openSelectJob}
              options={allJob}
            />
          </div>
          <div className="lg:w-[30%] sm:w-full">
            <InputCustom
              type="text"
              placeholder="رقم التليفون"
              value={phone}
              textDirection="true"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="lg:w-[30%] sm:w-full">
            <InputCustom
              type="text"
              placeholder="الرقم السري"
              value={password}
              textDirection="true"
              onChange={(e) => setPassword(e.target.value)}
              required={false}
            />
          </div>
          <div className="lg:w-[30%] sm:w-full">
            <InputCustom
              type="text"
              placeholder="تاكيد الرقم السري"
              value={confirmPassword}
              textDirection="true"
              onChange={(e) => setConfirmPassword(e.target.value)}
              required={false}
            />
          </div>
        </div>

        <div className="w-full flex justify-center mt-10">
          <div className="flex items-center justify-center w-72">
            <Button
              type='submit'
              Text="حفظ التعديلات"
              BgColor="bg-mainColor"
              Color="text-white"
              Width="full"
              Size="text-2xl"
              px="px-3"
              rounded="rounded-2xl"
            // stateLoding={isLoading}
            />
          </div>
        </div>
      </form>
    </>
  )
}

export default EditProfileStudentPage