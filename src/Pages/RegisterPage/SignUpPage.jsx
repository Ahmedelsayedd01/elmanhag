import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Link, Navigate, NavLink, useNavigate } from 'react-router-dom';
import Loading from '../../Components/Loading';
import { useAuth } from '../../Context/Auth';
import TextTitle from '../../Components/TextTitle';
import InputCustom from '../../Components/InputCustom';
import { Button } from '../../Components/Button';
import DropDownMenu from '../../Components/DropDownMenu';

const SignUpPage = () => {
  // const [show, setShow] = useState(false)
  const navigate = useNavigate();
  const auth = useAuth();
  const CitiesRef = useRef(null);
  const CountriesRef = useRef(null);
  const CategoryRef = useRef(null);
  const EducationRef = useRef(null);
  const StudentTypeRef = useRef(null);
  const StudentJobRef = useRef(null);
  const ParentRelationRef = useRef(null);

  /* Student */
  const [studentName, setStudentName] = useState('');
  const [studentPhone, setStudentPhone] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentPassword, setStudentPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  /* Parent */
  const [parentName, setParentName] = useState('');
  const [parentPhone, setParentPhone] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [parentPassword, setParentPassword] = useState('');
  const [confirmParentPassword, setConfirmParentPassword] = useState('');
  const [affiliateCode, setAffiliateCode] = useState('');

  const [stateData, setStateData] = useState(1);

  const [countries, setCountries] = useState([]);
  const [allCities, setAllCities] = useState([]);
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [educations, setEducations] = useState([]);
  const [parentRelations, setParentRelations] = useState([]);
  const [studentTypes, setStudentTypes] = useState([{ name: 'ولد' }, { name: 'بنت' }]);
  const [studentJobs, setStudentJobs] = useState([]);

  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [category, setCategory] = useState('');
  const [education, setEducation] = useState('');
  const [studentType, setStudentType] = useState('');
  const [studentJob, setStudentJob] = useState('');
  const [parentRelation, setParentRelation] = useState('');

  const [countriesState, setCountriesState] = useState('البلد');
  const [citiesState, setCitiesState] = useState('المدينة');
  const [categoryState, setCategoryState] = useState('السنة الدراسية');
  const [educationState, setEducationState] = useState('التعليم');
  const [studentTypeState, setStudentTypeState] = useState('النوع');
  const [studentJobState, setStudentJobState] = useState('نفسك تطلع ايه');
  const [parentRelationState, setParentRelationState] = useState('قرابة ولى الأمر');

  const [countryId, setCountryId] = useState('')
  const [cityId, setCityId] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [educationId, setEducationId] = useState('')
  const [studentTypeName, setStudentTypeName] = useState('')
  const [studentJobId, setStudentJobId] = useState('')
  const [parentRelationId, setParentRelationId] = useState('')

  const [openCountry, setOpenCountry] = useState(false);
  const [openCity, setOpenCity] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [openEducation, setOpenEducation] = useState(false);
  const [openStudentType, setOpenStudentType] = useState(false);
  const [openStudentJob, setOpenStudentJob] = useState(false);
  const [openParentRelation, setOpenParentRelation] = useState(false);


  const [data, setData] = useState(null);
  const [type, setType] = useState('');
  const [error, setError] = useState('');
  const [isloading, setIsLoading] = useState(false);


  useEffect(() => {

    const fetchSupData = async () => {
      try {
        const response = await axios.get('https://bdev.elmanhag.shop/student/setting/view', {});
        if (response.status === 200) {
          setCountries(response.data.country)
          setAllCities(response.data.city)
          setCategories(response.data.category)
          setEducations(response.data.education)
          setParentRelations(response.data.parentRelation)
          setStudentJobs(response.data.studentJobs)
          console.log('response fetchSupData:', response.data);
        }
      } catch (error) {
        console.error('Error fetching fetchSupData data:', error);
      }
    };

    fetchSupData();


    console.log('countries', countries)
    console.log('cities', cities)
    console.log('category', categories)
    console.log('education', educations)
    console.log('studentJobs', studentJobs)
    console.log('parentRelation', parentRelations)
  }, [])

  const handleOpenCountry = () => {
    setOpenCountry(!openCountry);
    setOpenCity(false);
    setOpenCategory(false);
    setOpenEducation(false);
    setOpenStudentType(false);
    setOpenStudentJob(false);
    setOpenParentRelation(false);
  }
  const handleOpenCity = () => {
    setOpenCountry(false);
    setOpenCity(!openCity);
    setOpenCategory(false);
    setOpenEducation(false);
    setOpenStudentType(false);
    setOpenStudentJob(false);
    setOpenParentRelation(false);
  }
  const handleOpenCategory = () => {
    setOpenCountry(false);
    setOpenCity(false);
    setOpenCategory(!openCategory);
    setOpenEducation(false);
    setOpenStudentType(false);
    setOpenStudentJob(false);
  }
  const handleOpenEducation = () => {
    setOpenCountry(false);
    setOpenCity(false);
    setOpenCategory(false);
    setOpenEducation(!openEducation);
    setOpenStudentType(false);
    setOpenStudentJob(false);
    setOpenParentRelation(false);
  }
  const handleOpenStudentType = () => {
    setOpenCountry(false);
    setOpenCity(false);
    setOpenCategory(false);
    setOpenEducation(false);
    setOpenStudentType(!openStudentType);
    setOpenStudentJob(false);
    setOpenParentRelation(false);
  }
  const handleOpenStudentJob = () => {
    setOpenCountry(false);
    setOpenCity(false);
    setOpenCategory(false);
    setOpenEducation(false);
    setOpenStudentType(false);
    setOpenStudentJob(!openStudentJob);
    setOpenParentRelation(false);
  }
  const handleOpenParentRelation = () => {
    setOpenCountry(false);
    setOpenCity(false);
    setOpenCategory(false);
    setOpenEducation(false);
    setOpenStudentType(false);
    setOpenStudentJob(false);
    setOpenParentRelation(!openParentRelation);
  }

  const handleCountry = (e) => {
    // Get the input element inside the clicked option
    const inputElement = e.currentTarget.querySelector('.inputVal');

    // Get the selected option name and value
    const selectedOptionName = e.currentTarget.textContent.trim();
    const selectedOptionValue = inputElement ? parseInt(inputElement.value) || '' : '';

    // Safely filter cities by country ID if cities exist
    const allCitiesArr = allCities ? allCities.filter((city) => city.country_id === selectedOptionValue) : [];

    // Update state for country name, capitalizing the first letter safely
    if (selectedOptionName) {
      setCountriesState(selectedOptionName[0].toUpperCase() + selectedOptionName.slice(1));
    }

    // Set the selected country and country ID
    setCountry(selectedOptionName);
    setCountryId(selectedOptionValue);

    // Close the dropdown for countries
    setOpenCountry(false);

    // Update the cities state and the state message
    setCitiesState(allCitiesArr.length > 0 ? 'المدينة' : "لا يوجد مدينة");

    // Ensure that an array is passed, even when no cities are found
    setCities(allCitiesArr.length > 0 ? allCitiesArr : [{ id: "لا يوجد مدن", name: "لا يوجد مدن" }]);

    setCityId(null)

    // Debugging logs
    console.log('allCitiesArr:', allCitiesArr);
    console.log('allCities:', allCities);
    console.log('Selected Name:', selectedOptionName);
    console.log('Selected Value:', selectedOptionValue);
  };

  const handleCity = (e) => {
    const inputElement = e.currentTarget.querySelector('.inputVal');
    const selectedOptionName = e.currentTarget.textContent.trim();
    const selectedOptionValue = inputElement ? inputElement.value : '';
    setCitiesState(selectedOptionName[0].toUpperCase() + selectedOptionName.slice(1));
    setCity(selectedOptionName);
    setCityId(parseInt(selectedOptionValue))
    setOpenCity(false);
    console.log('Selected NameL:', selectedOptionName);
    console.log('Selected ValueL:', selectedOptionValue);
  }
  const handleCategory = (e) => {
    const inputElement = e.currentTarget.querySelector('.inputVal');
    const selectedOptionName = e.currentTarget.textContent.trim();
    const selectedOptionValue = inputElement ? inputElement.value : '';
    setCategoryState(selectedOptionName[0].toUpperCase() + selectedOptionName.slice(1));
    setCategory(selectedOptionName);
    setCategoryId(parseInt(selectedOptionValue));
    setOpenCategory(false);

    console.log('Selected NameL:', selectedOptionName);
    console.log('Selected ValueL:', selectedOptionValue);
  };
  const handleEducation = (e) => {
    const inputElement = e.currentTarget.querySelector('.inputVal');
    const selectedOptionName = e.currentTarget.textContent.trim();
    const selectedOptionValue = inputElement ? inputElement.value : '';
    setEducationState(selectedOptionName[0].toUpperCase() + selectedOptionName.slice(1));
    setEducation(selectedOptionName);
    setEducationId(parseInt(selectedOptionValue));
    setOpenEducation(false);
  };
  const handleStudentType = (e) => {
    const inputElement = e.currentTarget.querySelector('.inputVal');
    const selectedOptionName = e.currentTarget.textContent.trim();
    const selectedOptionValue = inputElement ? inputElement.value : '';
    setStudentTypeState(selectedOptionName[0].toUpperCase() + selectedOptionName.slice(1));
    setStudentType(selectedOptionName.toLowerCase());
    setStudentTypeName(selectedOptionValue);
    setOpenStudentType(false);
  };
  const handleStudentJob = (e) => {
    const inputElement = e.currentTarget.querySelector('.inputVal');
    const selectedOptionName = e.currentTarget.textContent.trim();
    const selectedOptionValue = inputElement ? inputElement.value : '';
    setStudentJobState(selectedOptionName[0].toUpperCase() + selectedOptionName.slice(1));
    setStudentJob(selectedOptionName);
    setStudentJobId(parseInt(selectedOptionValue));
    setOpenStudentJob(false);
  };
  const handleParentRelation = (e) => {
    const inputElement = e.currentTarget.querySelector('.inputVal');
    const selectedOptionName = e.currentTarget.textContent.trim();
    const selectedOptionValue = inputElement ? inputElement.value : '';
    setParentRelationState(selectedOptionName[0].toUpperCase() + selectedOptionName.slice(1));
    setParentRelation(selectedOptionName);
    setParentRelationId(parseInt(selectedOptionValue));
    setOpenParentRelation(false);
  };

  const handleClickNext = (e) => {
    e.preventDefault();
    if (stateData === 1) {

      if (!studentName) {
        auth.toastError("ادخل اسمك")
        return;
      }
      if (!studentPhone) {
        auth.toastError("ادخل رقمك")
        return;
      }
      if (studentPhone.length < 11) {
        auth.toastError("ادخل رقم الهاتف صحيح")
        return;
      }
      if (!studentEmail) {
        setStudentEmail(`${studentPhone}@elmanhag.com`)
        // auth.toastError("Please write the Email")
        // return;
      }
      // if (!studentEmail.includes('@')) {
      //   auth.toastError("Please include '@' in the email address")
      //   return;
      // }
      if (!studentPassword) {
        auth.toastError("ادخل كلمة السر")
        return;
      }
      if (!confirmPassword) {
        auth.toastError("ادخل تأكيد كلمة السر")
        return;
      }

      if (confirmPassword !== studentPassword) {
        setConfirmPassword('')
        auth.toastError("خطأ فى تأكيد كلمة السر")
        return;
      }
      setStateData(stateData + 1)
    }

    if (stateData === 2) {

      if (!countryId) {
        auth.toastError("اختر البلد")
        return;
      }
      if (!cityId) {
        auth.toastError("اختر المدينة")
        return;
      }
      if (!category) {
        auth.toastError("اختر السنة الدراسية")
        return;
      }
      if (!education) {
        auth.toastError("اختر التعليم")
        return;
      }
      if (!studentType) {
        auth.toastError("اختر النوع")
        return;
      }
      if (!studentJob) {
        auth.toastError("اختر نفسك تطلع ايه")
        return;
      }

      setStateData(stateData + 1)
    }

  };
  const handleClickPrev = () => {
    setStateData(stateData - 1)
  };


  const handleClickOutside = (event) => {
    if (
      (CitiesRef.current && !CitiesRef.current.contains(event.target)) &&
      (CountriesRef.current && !CountriesRef.current.contains(event.target)) &&
      (CategoryRef.current && !CategoryRef.current.contains(event.target)) &&
      (EducationRef.current && !EducationRef.current.contains(event.target)) &&
      (StudentTypeRef.current && !StudentTypeRef.current.contains(event.target)) &&
      (StudentJobRef.current && !StudentJobRef.current.contains(event.target)) &&
      (ParentRelationRef.current && !ParentRelationRef.current.contains(event.target))

    ) {
      setOpenCountry(false);
      setOpenCity(false);
      setOpenCategory(false);
      setOpenEducation(false);
      setOpenStudentType(false);
      setOpenStudentJob(false);
      setOpenParentRelation(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);



  useEffect(() => {
    if (data) {
      console.log('Calling auth.login with data:', data); // Debugging line
      auth.login(data); // Call auth.login with the updated data

      setIsLoading(false);
      navigate("/dashboard", { replace: true });
    }
  }, [data]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    /* Student */
    if (!studentName) {
      auth.toastError("ادخل اسمك")
      return;
    }
    if (!studentPhone) {
      auth.toastError("ادخل رقمك")
      return;
    }
    if (studentPhone.length < 11) {
      auth.toastError("ادخل رقم هاتفك صحيح")
      return;
    }
    if (!studentEmail) {
      setStudentEmail(`${studentPhone}@elmanhag.com`)
      // auth.toastError("Please write the Email")
      // return;
    }
    // if (!studentEmail.includes('@')) {
    //   auth.toastError("Please include '@' in the email address")
    //   return;
    // }
    if (!studentPassword) {
      auth.toastError("ادخل كلمة السر")
      return;
    }
    if (!confirmPassword) {
      auth.toastError("ادخل تأكيد كلمة السر")
      return;
    }

    if (confirmPassword !== studentPassword) {
      setConfirmPassword('')
      auth.toastError("خطأ فى تأكيد كلمة السر")
      return;
    }
    if (!countryId) {
      auth.toastError("اختر البلد")
      return;
    }
    if (!cityId) {
      auth.toastError("اختر المدينة")
      return;
    }
    if (!category) {
      auth.toastError("اختر السنة الدراسية")
      return;
    }
    if (!education) {
      auth.toastError("اختر التعليم")
      return;
    }
    if (!studentType) {
      auth.toastError("اختر نوعك")
      return;
    }
    if (!studentJob) {
      auth.toastError("اختر نفسك تطلع ايه")
      return;
    }
    /* Parent */
    if (!parentName) {
      auth.toastError("ادخل اسم ولى الأمر")
      return;
    }
    if (!parentPhone) {
      auth.toastError("ادخل رقم ولى الأمر")
      return;
    }
    if (parentPhone.length < 11) {
      auth.toastError("ادخل رقم ولى الأمر صحيح")
      return;
    }
    if (parentPhone == studentPhone) {
      setParentPhone('')
      auth.toastError("ادخل رقم ولى الأمر مختلف عن رقمك")
      return;
    }
    if (parentEmail == studentEmail) {
      setParentEmail('')
      auth.toastError("ادخل ايميل ولى الأمر مختلف عن ايميلك")
      return;
    }
    // if (!parentEmail) {
    //   setParentEmail(`${parentPhone}@elmanhag.com`)
    //   auth.toastError("Please write the Parent Email")
    //   return;
    // }
    // if (!parentEmail.includes('@')) {
    //   auth.toastError("Please include '@' in the email address")
    //   return;
    // }
    if (!parentRelation) {
      auth.toastError("اختر قرابة ولى الأمر")
      return;
    }
    if (!parentPassword) {
      auth.toastError("ادخل كلمة السر ولى الأمر")
      return;
    }
    if (!confirmParentPassword) {
      auth.toastError("ادخل تاكيد كلمة السر ولى الأمر")
      return;
    }

    if (confirmParentPassword !== parentPassword) {
      setConfirmParentPassword('')
      auth.toastError("خطأ فى تاكيد كلمة السر ولى الأمر ")
      return;
    }
    // if (!affiliateCode) {
    //   setAffiliateCode(' ')
    //   return;
    // }
    console.log('parentName', parentName)
    console.log('parentPhone', parentPhone)
    console.log('parentEmail', parentEmail)
    console.log('parentRelation', parentRelation)
    console.log('parentPassword', parentPassword)
    console.log('confirmParentPassword', confirmParentPassword)
    console.log('affiliateCode', affiliateCode)

    setIsLoading(true)
    try {
      const parentEmailObj = parentEmail ? parentEmail : parentPhone + '@elmanhag.com';

      const response = await axios.post('https://bdev.elmanhag.shop/student/auth/signup/create', {
        'name': studentName,
        'phone': parseInt(studentPhone),
        'email': studentEmail,
        'password': studentPassword,
        'conf_password': confirmPassword,
        'category_id': categoryId,
        'country_id': countryId,
        'city_id': cityId,
        'education_id': educationId,
        'sudent_jobs_id': studentJobId,
        'gender': studentTypeName == 'ولد' ? "male" : 'female',
        'parent_relation_id': parentRelationId,
        // 'image': ' ',
        'parent_name': parentName,
        'parent_phone': parseInt(parentPhone),
        'parent_email': parentEmailObj,
        'parent_password': parentPassword,
        'affilate_code': affiliateCode,
      });

      if (response.status === 200) {
        const userData = {
          ...response.data.user,
          roles: ['student'] // Assuming type represents the user's role
        };
        setData(userData);
        setType(response.data.user.role);
        console.log("response", response);
        console.log("response role", response.data.user.role);

      } else {
        setError('Failed to post data');
        console.log("error", error);
        setIsLoading(false)
      }
    } catch (error) {
      setError('There was an error posting the data!');
      console.error(error);
      setIsLoading(false)
    }
  };
  if (isloading) {
    return (
      <div className="w-1/4 h-full flex items-center justify-center m-auto">
        <Loading />
      </div>
    )
  }


  return (
    <>
      <form onSubmit={handleSubmit} className="w-full flex flex-col items-start justify-center gap-4 mt-5">
        <div className="w-full flex items-center justify-between">
          <div className="relative w-1/3 flex items-center justify-start">
            <span className={`${stateData === 3 ? "text-white bg-mainColor before:content-[''] before:absolute before:top-2/4 before:right-[-30%] before:h-1 before:w-[100%] before:bg-mainColor before:transition-all duration-500 ease-in-out" : "text-mainColor bg-white before:w-[0%] before:bg-transparent before:transition-all duration-500 ease-out"} before:rounded-xl text-3xl font-semibold border-2 border-mainColor px-4 py-1 rounded-full`}>
              3
            </span>
          </div>
          <div className="relative w-1/3 flex items-center justify-center ">
            <span className={`${stateData === 2 || stateData === 3 ? "text-white bg-mainColor  before:content-[''] before:absolute before:top-2/4 before:right-[-70%] before:h-1 before:w-[100%] before:bg-mainColor before:transition-all duration-500 ease-out" : "text-mainColor bg-white before:content-[''] before:absolute before:top-2/4 before:right-[-70%] before:h-1 before:w-[10%] before:bg-mainColor before:transition-all duration-500 ease-in-out"} before:rounded-xl text-3xl font-semibold border-2 border-mainColor px-4 py-1  rounded-full`}>
              2
            </span>
          </div>
          <div className="relative w-1/3 flex items-center justify-end ">
            <span className={`${stateData === 1 || stateData === 2 || stateData === 3 ? 'text-white bg-mainColor' : 'text-mainColor bg-white'} text-3xl font-semibold border-2 border-mainColor px-4 py-1  rounded-full`}>
              1
            </span>
          </div>


        </div>
        {/* State 1 */}
        {stateData === 1 &&
          (
            <div className="w-full flex flex-col sm:gap-2 xl:gap-6 items-start">
              <span className='w-full text-right text-thirdColor text-2xl'>بيانات الطالب</span>
              <div className="w-full flex xl:flex-row-reverse flex-col gap-4 items-start">
                <InputCustom
                  type={"text"}
                  textDirection={true}
                  paddinRight="pr-4"
                  paddinLeft="pl-0"
                  placeholder={"اسم الطالب"}
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                />
                <InputCustom
                  type={"text"}
                  textDirection={true}
                  paddinRight="pr-2"
                  paddinLeft="pl-0"
                  placeholder={"رقم هاتفك"}
                  value={studentPhone}
                  onChange={(e) => {
                    const value = e.target.value;
                    // Only allow numbers
                    if (!isNaN(value)) {
                      setStudentPhone(value);
                      setStudentEmail(value + '@elmanhag.com');
                    }
                  }}
                />

              </div>
              <InputCustom
                type={"email"}
                textDirection={true}
                paddinRight="pr-4"
                paddinLeft="pl-0"
                placeholder={"ايميل الطالب"}
                value={studentEmail}
                onChange={(e) => setStudentEmail(e.target.value)}
              />
              <InputCustom
                type={"password"}
                iconDirection={true}
                textDirection={true}
                placeholder={"كلمة السر"}
                value={studentPassword}
                onChange={(e) => setStudentPassword(e.target.value)}
              />
              <InputCustom
                type={"password"}
                iconDirection={true}
                textDirection={true}
                placeholder={"تأكيد كلمة السر"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

          )
        }
        {/* State 2 */}
        {stateData === 2 &&
          (
            <div className="w-full flex flex-col sm:gap-2 xl:gap-6 items-end">
              <span className='w-full text-right text-thirdColor text-2xl'>أهلا بك معنا</span>
              <div className="w-full flex  flex-col xl:flex-row-reverse justify-between gap-4">

                <div className="w-full">
                  <DropDownMenu
                    ref={CountriesRef}
                    iconDirection={true}
                    handleOpen={handleOpenCountry}
                    handleOpenOption={handleCountry}
                    stateoption={countriesState}
                    openMenu={openCountry}
                    options={countries}
                  />
                </div>

                <div className="w-full">
                  <DropDownMenu
                    ref={CitiesRef}
                    iconDirection={true}
                    handleOpen={handleOpenCity}
                    handleOpenOption={handleCity}
                    stateoption={citiesState}
                    openMenu={openCity}
                    options={cities.length > 0 ? cities : [{ id: "لا يوجد مدن", name: "لا يوجد مدن" }]}
                  />
                </div>
              </div>

              <div className="w-full">
                <DropDownMenu
                  ref={CategoryRef}
                  iconDirection={true}
                  handleOpen={handleOpenCategory}
                  handleOpenOption={handleCategory}
                  stateoption={categoryState}
                  openMenu={openCategory}
                  options={categories}
                />
              </div>

              <div className="w-full">
                <DropDownMenu
                  ref={EducationRef}
                  iconDirection={true}
                  handleOpen={handleOpenEducation}
                  handleOpenOption={handleEducation}
                  stateoption={educationState}
                  openMenu={openEducation}
                  options={educations}
                />
              </div>

              <div className="w-full">
                <DropDownMenu
                  ref={StudentTypeRef}
                  iconDirection={true}
                  handleOpen={handleOpenStudentType}
                  handleOpenOption={handleStudentType}
                  stateoption={studentTypeState}
                  openMenu={openStudentType}
                  options={studentTypes}
                />
              </div>

              <div className="w-full">
                <DropDownMenu
                  ref={StudentJobRef}
                  iconDirection={true}
                  handleOpen={handleOpenStudentJob}
                  handleOpenOption={handleStudentJob}
                  stateoption={studentJobState}
                  openMenu={openStudentJob}
                  options={studentJobs}
                />
              </div>
            </div>
          )
        }
        {/* State 3 */}
        {stateData === 3 &&
          (
            <div className="w-full flex flex-col gap-2 items-end">
              <span className='w-full text-right text-thirdColor text-2xl'>بيانات ولى الأمر</span>
              <div className="w-full flex xl:flex-row-reverse flex-col sm:gap-2 xl:gap-6 items-start">
                <InputCustom
                  textDirection={true}
                  paddinRight={"pr-4"}
                  paddinLeft={"pl-0"}
                  type={"text"}
                  required={false}
                  placeholder={"أسم ولى الأمر"}
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                />
                <InputCustom type={"number"}
                  textDirection={true}
                  paddinRight={"pr-2"}
                  paddinLeft={"pl-0"}
                  required={false}
                  placeholder={"ادخل رقم ولى الأمر مختلف عن رقمك"}
                  placeholderSize={true}
                  value={parentPhone}
                  onChange={(e) => {
                    setParentPhone(e.target.value)
                    setParentEmail(e.target.value + '@elmanhag.com')
                  }}
                />
              </div>
              <InputCustom type={"email"}
                textDirection={true}
                paddinRight={"pr-4"}
                paddinLeft={"pl-0"}
                required={false}
                placeholder={"ادخل ايميل ولى الأمر مختلف عن ايميلك"}
                value={parentEmail}
                onChange={(e) => setParentEmail(e.target.value)}
              />
              <div className="w-full">
                <DropDownMenu
                  ref={ParentRelationRef}
                  iconDirection={true}
                  handleOpen={handleOpenParentRelation}
                  handleOpenOption={handleParentRelation}
                  stateoption={parentRelationState}
                  openMenu={openParentRelation}
                  options={parentRelations}
                />
              </div>
              <InputCustom type={"password"}
                iconDirection={true}
                textDirection={true}
                required={false}
                placeholder={"كلمة السر"}
                value={parentPassword}
                onChange={(e) => setParentPassword(e.target.value)}
              />
              <InputCustom
                type={"password"}
                iconDirection={true}
                textDirection={true}
                required={false}
                placeholder={"تاكيد كلمة السر"}
                value={confirmParentPassword}
                onChange={(e) => setConfirmParentPassword(e.target.value)}
              />
              <InputCustom type={"text"}
                textDirection={true}
                paddinRight='pr-2'
                required={false}
                placeholder={"كود التسويق التابع له"}
                value={affiliateCode}
                onChange={(e) => setAffiliateCode(e.target.value)}
              />

            </div>
          )
        }

        {/* {error && <div className="w-full text-mainColor text-center text-2xl mb-4 font-bold">{error}</div>} */}


        <div className="w-full flex justify-between">
          {stateData === 1 &&
            (
              <>
                <div className="w-full text-start">
                  <Button Text="التالى" handleClick={handleClickNext} />
                </div>

              </>
            )
          }
          {stateData === 2 &&
            (
              <>
                <Button Text="التالى" handleClick={handleClickNext} />
                <Button Text="السابق" handleClick={handleClickPrev} />
              </>
            )
          }
          {stateData === 3 &&
            (
              <>
                <div className="w-full text-end">

                  <Button Text="السابق" handleClick={handleClickPrev} />
                </div>
              </>
            )
          }
          {/* 
          {stateData === 1 ? (
            stateData === 1 ?
          ) : stateData === 2 ? (
            <Button Text="Prev" handleClick={handleClickPrev} />
          ) : stateData === 3 ? (
            <Button Text="Prev" handleClick={handleClickPrev} />
          ) : (
            <Button Text="Prev" handleClick={handleClickPrev} />
          )} */}


        </div>

        {/* <button type="submit" className="w-full text-center text-2xl font-medium text-secoundColor hover:text-mainColor px-6 py-3 bg-mainColor hover:bg-secoundColor ease-in-out duration-300 rounded-2xl">تسجيل دخول</button> */}
        <div className="w-full flex flex-col gap-y-4">
          <button type="submit" className="w-full text-center text-2xl font-medium text-secoundColor px-6 py-3 bg-mainColor rounded-2xl">انشاء حساب</button>
          <div className="w-full flex items-baseline justify-between">
            <span className='w-6/12 h-[2px] rounded-2xl bg-thirdColor'></span>
            <span className='px-2 text-center text-xl text-thirdColor font-semibold'>أو</span>
            <span className='w-6/12 h-[2px] rounded-2xl bg-thirdColor'></span>
          </div>
          <Link to={'/authentication/signup'} className='w-full text-center text-2xl font-medium text-mainColor hover:text-secoundColor px-6 py-3 bg-secoundColor hover:bg-mainColor ease-in-out duration-300 border-2 border-mainColor rounded-2xl'>
            تسجيل دخول
          </Link>
        </div>
      </form>
    </>
  )
}

export default SignUpPage