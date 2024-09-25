import { Button } from '../../Components/Button'
import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import Loading from '../../Components/Loading';
import { useAuth } from '../../Context/Auth';
import TextTitle from '../../Components/TextTitle';
import InputCustom from '../../Components/InputCustom';
import DropDownMenu from '../../Components/DropDownMenu'

const SignUpAffilatePage = () => {

  const auth = useAuth();
  const [show, setShow] = useState(false)

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [conf_password, setConfirmPassword] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [isloading, setIsLoading] = useState(false);
  const [role, setRole] = useState('');

  const [studentCountry, setStudentCountry] = useState('البلد')
  const [countryId, setCountryId] = useState('')
  const [countries, setCountries] = useState([])
  const [openCountry, setOpenCountry] = useState(false);

  const [studentCityState, setStudentCityState] = useState('المدينة')
  const [cityId, setCityId] = useState('')
  const [cities, setCities] = useState([])
  const [allCities, setAllCities] = useState([])
  const [openCity, setOpenCity] = useState(false);

  const dropdownCountryStudentRef = useRef();
  const dropdownCityStudentRef = useRef();

  const navigate = useNavigate();
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://bdev.elmanhag.shop/student/setting/view');
        const data = await response.json();
        console.log(data)
        setCountries(data.country || []);
        setAllCities(data.city || []);
      } catch (error) {
        console.error('Error fetching countries and cities:', error);
      }
    };
    fetchCountries();
  }, []);


  const handleOpenCountryStudent = () => {
    setOpenCountry(!openCountry);
    setOpenCity(false);
  }
  const handleOpenCityStudent = () => {
    setOpenCountry(false);
    setOpenCity(!openCity);
  }

  const handleCountryStudent = (e) => {
    const inputElement = e.currentTarget.querySelector('.inputVal');
    const selectedOptionName = e.currentTarget.textContent.trim();
    const selectedOptionValue = inputElement ? parseInt(inputElement.value) : '';
    setStudentCountry(selectedOptionName);
    setCountryId(selectedOptionValue)
    setOpenCountry(false);
    const city = allCities.filter((city) => city.country_id === selectedOptionValue)
    setCities(city),
      console.log("mkl", city)
    setStudentCityState(city.length > 0 ? 'المدينة' : "لا يوجد مدن"),
      console.log('Selected Country:', selectedOptionName);
    console.log('Selected CountryId:', selectedOptionValue);
  }
  const handleCityStudent = (e) => {
    const inputElement = e.currentTarget.querySelector('.inputVal');
    const selectedOptionName = e.currentTarget.textContent.trim();
    const selectedOptionValue = inputElement ? inputElement.value : '';
    setStudentCityState(selectedOptionName);
    setCityId(parseInt(selectedOptionValue))
    setOpenCity(false);
    console.log('Selected City:', selectedOptionName);
    console.log('Selected CityId:', selectedOptionValue);
  }
  useEffect(() => {
    if (data) {
      console.log('Calling auth.login with data:', data); // Debugging line
      auth.login(data); // Call auth.login with the updated data

      setIsLoading(false);
      navigate("/dashboard_affilate", { replace: true });
    }
  }, [data]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!name) {
      auth.toastError("ادخل اسمك")
      return;
    }
    if (!phone) {
      auth.toastError("ادخل رقمك")
      return;
    }
    if (phone.length < 11) {
      auth.toastError("ادخل رقم الهاتف صحيح")
      return;
    }
    if (!email) {
      auth.toastError("ادخل الايميل")
      return;
    }
    if (!email.includes('@')) {
      auth.toastError("الرجاء تضمين '@' في عنوان البريد الإلكتروني.")
      return;
    }
    if (!countryId) {
      auth.toastError("اختر البلد")
      console.log('country_id', countryId)
      return;
    }
    if (!cityId) {
      console.log('city_id', cityId)
      auth.toastError("اختر المدينة")
      return;
    }
    if (!password) {
      auth.toastError("ادخل كلمة السر")
      return;
    }
    if (!conf_password) {
      auth.toastError("ادخل تأكيد كلمة السر")
      return;
    }

    if (conf_password !== password) {
      setConfirmPassword('')
      auth.toastError("خطأ فى تأكيد كلمة السر")
      return;
    }

    console.log('Email:', email);
    console.log('Password:', password);

    setIsLoading(true)
    const data = {
      name,
      phone,
      country_id: countryId,
      city_id: cityId,
      email,
      password,
      conf_password
    }
    console.log(data)
    try {
      const response = await axios.post('https://bdev.elmanhag.shop/affilate/auth/signup', data);

      if (response.status === 200) {
        console.log(response)
        const userData = {
          ...response.data.user,
          roles: [response.data.user.role] // Assuming type represents the user's role
        };
        auth.toastSuccess(`Welcome ${name}`);
        console.log('Login response:', response); // Debugging line
        setData(userData);
        setRole(response.data.user.role);
        console.log("response", response);

      } else {
        auth.toastError('Failed to post data');
        setError('Failed to post data');
        console.log("error", error);
      }
    } catch (error) {
      setError('There was an error posting the data!');
      console.error(error);
    } finally {
      setIsLoading(false)
    }
  };
  if (isloading) {
    return (
      <div className="w-1/4  flex items-center h-screen justify-center m-auto">
        <Loading />
      </div>
    )
  }
  return (
    <>
      <form onSubmit={handleSubmit} className="w-full flex flex-col items-start justify-center gap-4">
        <span className='w-full text-right text-thirdColor text-2xl font-medium'>أهلا بك شريكا فى منصة المنهج</span>
        <div className="w-full flex flex-col gap-6 items-end mt-4">
          <div className="w-full flex sm:flex-col xl:flex-row-reverse  gap-4">
            <InputCustom
              type={"name"}
              required={false}
              textDirection={true}
              iconDirection={true}
              placeholder={"الاسم"}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <InputCustom
              type={"phone"}
              required={false}
              textDirection={true}
              iconDirection={true}
              placeholder={"رقم الهاتف"}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <InputCustom
            type={"email"}
            required={false}
            iconDirection={true}
            textDirection={true}
            placeholder={"الايميل"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* <InputCustom type={"country"} placeholder={"Country"} value={country_id} onChange={(e) => setCountry(e.target.value)} /> */}
          {/* <InputCustom type={"city"} placeholder={"City"} value={city_id} onChange={(e) => setCity(e.target.value)} /> */}
          <div className="w-full flex sm:flex-col xl:flex-row-reverse gap-4">
            {/* <InputCustom type={"text"} borderColor={"none"} placeholder={"Country"} value={studentCountry} onChange={(e => setStudentCountry(e.target.value))} /> */}
            <DropDownMenu
              ref={dropdownCountryStudentRef}
              iconDirection={true}
              handleOpen={handleOpenCountryStudent}
              handleOpenOption={handleCountryStudent}
              stateoption={studentCountry}
              openMenu={openCountry}
              options={countries}
            />

            {/* <InputCustom type={"text"} borderColor={"none"} placeholder={"City"} value={studentCity} onChange={(e => setStudentCity(e.target.value))} /> */}
            <DropDownMenu
              ref={dropdownCityStudentRef}
              iconDirection={true}
              handleOpen={handleOpenCityStudent}
              handleOpenOption={handleCityStudent}
              stateoption={studentCityState}
              openMenu={openCity}
              options={cities}
            />
          </div>
          <InputCustom
            type={"password"}
            required={false}
            iconDirection={true}
            textDirection={true}
            placeholder={"كلمة السر"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputCustom
            type={"password"}
            required={false}
            iconDirection={true}
            textDirection={true}
            placeholder={"تأكيد كلمة السر"}
            value={conf_password}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />


        </div>
        <button type="submit" className="w-full text-center text-2xl font-medium text-secoundColor px-6 py-3 bg-mainColor rounded-2xl">تسجيل</button>
      </form>
    </>
  )
}

export default SignUpAffilatePage