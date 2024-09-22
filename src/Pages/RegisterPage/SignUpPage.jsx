import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
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
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [educations, setEducations] = useState([]);
  const [parentRelations, setParentRelations] = useState([]);
  const [studentTypes, setStudentTypes] = useState([{ name: 'Male' }, { name: 'Female' }]);
  const [studentJobs, setStudentJobs] = useState([]);

  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [category, setCategory] = useState('');
  const [education, setEducation] = useState('');
  const [studentType, setStudentType] = useState('');
  const [studentJob, setStudentJob] = useState('');
  const [parentRelation, setParentRelation] = useState('');

  const [countriesState, setCountriesState] = useState('Choose Country');
  const [citiesState, setCitiesState] = useState('Choose City');
  const [categoryState, setCategoryState] = useState('Category');
  const [educationState, setEducationState] = useState('Education');
  const [studentTypeState, setStudentTypeState] = useState('Type');
  const [studentJobState, setStudentJobState] = useState('What do you want?');
  const [parentRelationState, setParentRelationState] = useState('Parent Relation');

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
          setCities(response.data.city)
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
    const inputElement = e.currentTarget.querySelector('.inputVal');
    const selectedOptionName = e.currentTarget.textContent.trim();
    const selectedOptionValue = inputElement ? parseInt(inputElement.value) : '';
    const allCities = cities.filter((city) => city.country_id === selectedOptionValue)
    setCountriesState(selectedOptionName[0].toUpperCase() + selectedOptionName.slice(1));
    setCountry(selectedOptionName);
    setCountryId(selectedOptionValue)
    setOpenCountry(false);
    setCitiesState(cities.length > 0 ? 'Choose City' : "No cities available")
    setCities(allCities)

    console.log('Selected NameL:', selectedOptionName);
    console.log('Selected ValueL:', selectedOptionValue);
  }
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
        auth.toastError("Please write the Name")
        return;
      }
      if (!studentPhone) {
        auth.toastError("Please write the Phone")
        return;
      }
      if (studentPhone.length < 11) {
        auth.toastError("Please write the phone more than 11 numbers")
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
        auth.toastError("Please write the Password")
        return;
      }
      if (!confirmPassword) {
        auth.toastError("Please write the Confirm Password")
        return;
      }

      if (confirmPassword !== studentPassword) {
        setConfirmPassword('')
        auth.toastError("Please rewrite the confirm password")
        return;
      }
      setStateData(stateData + 1)
    }

    if (stateData === 2) {

      if (!country) {
        auth.toastError("Please Choose the Country")
        return;
      }
      if (!city) {
        auth.toastError("Please Choose the City")
        return;
      }
      if (!category) {
        auth.toastError("Please Choose the Category")
        return;
      }
      if (!education) {
        auth.toastError("Please Choose the Education")
        return;
      }
      if (!studentType) {
        auth.toastError("Please Choose the Type")
        return;
      }
      if (!studentType) {
        auth.toastError("Please Choose the Type")
        return;
      }
      if (!studentJob) {
        auth.toastError("Please Choose what do you want?")
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
      navigate("/download", { replace: true });
    }
  }, [data]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    /* Student */
    if (!studentName) {
      auth.toastError("Please write the Name")
      return;
    }
    if (!studentPhone) {
      auth.toastError("Please write the Phone")
      return;
    }
    if (studentPhone.length < 11) {
      auth.toastError("Please write the phone more than 11 numbers")
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
      auth.toastError("Please write the Password")
      return;
    }
    if (!confirmPassword) {
      auth.toastError("Please write the Confirm Password")
      return;
    }

    if (confirmPassword !== studentPassword) {
      setConfirmPassword('')
      auth.toastError("Please rewrite the confirm password")
      return;
    }
    if (!country) {
      auth.toastError("Please Choose the Country")
      return;
    }
    if (!city) {
      auth.toastError("Please Choose the City")
      return;
    }
    if (!category) {
      auth.toastError("Please Choose the Category")
      return;
    }
    if (!education) {
      auth.toastError("Please Choose the Education")
      return;
    }
    if (!studentType) {
      auth.toastError("Please Choose the Type")
      return;
    }
    if (!studentType) {
      auth.toastError("Please Choose the Type")
      return;
    }
    if (!studentJob) {
      auth.toastError("Please Choose what do you want?")
      return;
    }
    /* Parent */
    if (!parentName) {
      auth.toastError("Please write the Parent Name")
      return;
    }
    if (!parentPhone) {
      auth.toastError("Please write the Parent Phone")
      return;
    }
    if (parentPhone.length < 11) {
      auth.toastError("Please write the Parent phone more than 11 numbers")
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
      auth.toastError("Please choose the Parent Relation")
      return;
    }
    if (!parentPassword) {
      auth.toastError("Please write the Parent Password")
      return;
    }
    if (!confirmParentPassword) {
      auth.toastError("Please write the Confirm Parent Password")
      return;
    }

    if (confirmParentPassword !== parentPassword) {
      setConfirmParentPassword('')
      auth.toastError("Please rewrite the confirm Parent password")
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
        'sudent_job_id': studentJobId,
        'gender': studentTypeName,
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
          roles: ['studentSignup'] // Assuming type represents the user's role
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
      <form onSubmit={handleSubmit} className="w-full flex flex-col items-start justify-center gap-4">
        <span className='text-thirdColor text-2xl font-medium'>Come on, Sign up</span>
        <div className="w-full flex items-center justify-between">
          <div className="relative w-1/3 flex items-center justify-start ">
            <span className={`${stateData === 1 || stateData === 2 || stateData === 3 ? 'text-white bg-mainColor' : 'text-mainColor bg-white'} text-3xl font-semibold border-2 border-mainColor px-4 py-1  rounded-full`}>
              1
            </span>
          </div>
          <div className="relative w-1/3 flex items-center justify-center ">
            <span className={`${stateData === 2 || stateData === 3 ? "text-white bg-mainColor  before:content-[''] before:absolute before:top-2/4 before:left-[-70%] before:h-1 before:w-[100%] before:bg-mainColor before:transition-all duration-500 ease-out" : "text-mainColor bg-white before:content-[''] before:absolute before:top-2/4 before:left-[-70%] before:h-1 before:w-[10%] before:bg-mainColor before:transition-all duration-500 ease-in-out"} before:rounded-xl text-3xl font-semibold border-2 border-mainColor px-4 py-1  rounded-full`}>
              2
            </span>
          </div>
          <div className="relative w-1/3 flex items-center justify-end">
            <span className={`${stateData === 3 ? "text-white bg-mainColor before:content-[''] before:absolute before:top-2/4 before:left-[-30%] before:h-1 before:w-[100%] before:bg-mainColor before:transition-all duration-500 ease-in-out" : "text-mainColor bg-white before:w-[0%] before:bg-transparent before:transition-all duration-500 ease-out"} before:rounded-xl text-3xl font-semibold border-2 border-mainColor px-4 py-1 rounded-full`}>
              3
            </span>
          </div>


        </div>
        {/* State 1 */}
        {stateData === 1 &&
          (
            <div className="w-full flex flex-col gap-6 items-end">
              <div className="w-full flex xl:flex-row flex-col gap-4 items-start">
                <InputCustom type={"text"} placeholder={"اسم الطالب"} value={studentName} onChange={(e) => setStudentName(e.target.value)} />
                <InputCustom type={"number"} paddinRight='pr-2' placeholder={"رقم الطالب"} value={studentPhone} onChange={(e) => setStudentPhone(e.target.value)} />
              </div>
              <InputCustom type={"email"} placeholder={"ايميل الطالب"} value={studentEmail} onChange={(e) => setStudentEmail(e.target.value)} />
              <InputCustom type={"password"} placeholder={"كلمة السر"} value={studentPassword} onChange={(e) => setStudentPassword(e.target.value)} />
              <InputCustom type={"password"} placeholder={"تاكيد كلمة السر"} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
          )
        }
        {/* State 2 */}
        {stateData === 2 &&
          (
            <div className="w-full flex flex-col gap-6 items-end">
              <div className="w-full flex  flex-col xl:flex-row justify-between gap-4">

                <div className="w-full">
                  <DropDownMenu
                    ref={CountriesRef}
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
                    handleOpen={handleOpenCity}
                    handleOpenOption={handleCity}
                    stateoption={citiesState}
                    openMenu={openCity}
                    options={cities}
                  />
                </div>
              </div>

              <div className="w-full">
                <DropDownMenu
                  ref={CategoryRef}
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
            <div className="w-full flex flex-col gap-4 items-end">
              <div className="w-full flex xl:flex-row flex-col gap-4 items-start">
                <InputCustom type={"text"} required={false} placeholder={"Parent Name"} value={parentName} onChange={(e) => setParentName(e.target.value)} />
                <InputCustom type={"number"} required={false} paddinRight='pr-2' placeholder={"Parent Phone"} value={parentPhone} onChange={(e) => setParentPhone(e.target.value)} />
              </div>
              <InputCustom type={"email"} required={false} placeholder={"Parent Email"} value={parentEmail} onChange={(e) => setParentEmail(e.target.value)} />
              <div className="w-full">
                <DropDownMenu
                  ref={ParentRelationRef}
                  handleOpen={handleOpenParentRelation}
                  handleOpenOption={handleParentRelation}
                  stateoption={parentRelationState}
                  openMenu={openParentRelation}
                  options={parentRelations}
                />
              </div>
              <InputCustom type={"password"} required={false} placeholder={"Password"} value={parentPassword} onChange={(e) => setParentPassword(e.target.value)} />
              <InputCustom type={"password"} required={false} placeholder={"Confirm Password"} value={confirmParentPassword} onChange={(e) => setConfirmParentPassword(e.target.value)} />
              <InputCustom type={"text"} required={false} placeholder={"Affiliate Code"} value={affiliateCode} onChange={(e) => setAffiliateCode(e.target.value)} />
            </div>
          )
        }

        {error && <div className="w-full text-mainColor text-center text-2xl mb-4 font-bold">{error}</div>}


        <div className="w-full flex justify-between">
          {stateData === 1 &&
            (
              <>
                <div className="w-full text-end">
                  <Button Text="Next" handleClick={handleClickNext} />
                </div>

              </>
            )
          }
          {stateData === 2 &&
            (
              <>
                <Button Text="Prev" handleClick={handleClickPrev} />
                <Button Text="Next" handleClick={handleClickNext} />
              </>
            )
          }
          {stateData === 3 &&
            (
              <>
                <Button Text="Prev" handleClick={handleClickPrev} />
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


        </div >
        <button type="submit" className="w-full text-center text-2xl font-medium text-secoundColor px-6 py-3 bg-mainColor rounded-2xl">sign up</button>
      </form >
    </>
  )
}

export default SignUpPage