import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '../../../../Components/Button';
import axios from 'axios';
import Loading from '../../../../Components/Loading';
import { useAuth } from '../../../../Context/Auth';
import InputCustom from '../../../../Components/InputCustom';
import DropDownMenu from '../../../../Components/DropDownMenu';
import CheckBox from '../../../../Components/CheckBox';

const EditProfilePage = () => {
       const auth = useAuth();
       const navigate = useNavigate();
       const { profileStudentId } = useParams();

       const dropdownCountryStudentRef = useRef();
       const dropdownCityStudentRef = useRef();
       const dropdownCategoryStudentRef = useRef();
       const StudentTypeRef = useRef(null);
       const StudentJobRef = useRef(null);
       const dropdownLanguageStudentRef = useRef();
       const dropdownRelationStudentRef = useRef();

       const [isLoading, setIsLoading] = useState(false);

       const [tap, setTap] = useState('profile');
       const [stateTap, setStateTap] = useState(1);

       const [studentData, setStudentData] = useState(null)
       const [countries, setCountries] = useState([])
       const [allCities, setAllCities] = useState([])
       const [cities, setCities] = useState([])
       const [category, setCategory] = useState([])
       const [educations, setEducations] = useState([])
       const [relations, setRelations] = useState([])
       const [studentJobs, setStudentJobs] = useState([])

       const [studentImage, setStudentImage] = useState()
       const [parentImage, setParentImage] = useState()
       const [studentName, setStudentName] = useState()
       const [studentPhone, setStudentPhone] = useState()
       const [studentEmail, setStudentEmail] = useState()
       const [studentCountryName, setStudentCountryName] = useState()
       const [studentCountryId, setStudentCountryId] = useState()
       const [studentCityName, setStudentCityName] = useState()
       const [studentCityId, setStudentCityId] = useState()
       const [studentCategoryName, setStudentCategoryName] = useState()
       const [studentCategoryId, setStudentCategoryId] = useState()
       const [studentEducationName, setStudentEducationName] = useState()
       const [studentEducationId, setStudentEducationId] = useState()
       const [studentTypes, setStudentTypes] = useState([{ name: 'male' }, { name: 'female' }]);
       const [studentGenderState, setStudentGenderState] = useState('')
       const [studentGender, setStudentGender] = useState()
       const [studentJobState, setStudentJobState] = useState('')
       const [studentJobName, setStudentJobName] = useState()
       const [studentJobId, setStudentJobId] = useState()
       const [studentStatus, setStudentStatus] = useState()

       const [studentPassword, setStudentPassword] = useState('')

       const [parentName, setParentName] = useState()
       const [parentPhone, setParentPhone] = useState()
       const [parentRelationName, setParentRelationName] = useState()
       const [parentRelationId, setParentRelationId] = useState()
       const [parentEmail, setParentEmail] = useState()

       const [parentPassword, setParentPassword] = useState('')


       const [openCountry, setOpenCountry] = useState(false);
       const [openCity, setOpenCity] = useState(false);
       const [openLanguage, setOpenLanguage] = useState(false);
       const [openCategory, setOpenCategory] = useState(false);
       const [openStudentType, setOpenStudentType] = useState(false);
       const [openStudentJob, setOpenStudentJob] = useState(false);
       const [openRelation, setOpenRelation] = useState(false);



       const handleClickPrev = () => {
              setStateTap(stateTap - 1)
       };
       const handleClickNext = () => {
              setStateTap(stateTap + 1)
       };

       useEffect(() => {

              const fetchSupData = async () => {
                     try {
                            const response = await axios.get('https://bcknd.elmanhag.com/student/setting/view', {});
                            if (response.status === 200) {
                                   setCountries(response.data.country)
                                   setAllCities(response.data.city)
                                   setCities(response.data.city)
                                   setCategory(response.data.category)
                                   setEducations(response.data.education)
                                   setRelations(response.data.parentRelation)
                                   setStudentJobs(response.data.studentJobs)
                                   console.log('response fetchSupData:', response.data);
                            }
                     } catch (error) {
                            console.error('Error fetching fetchSupData data:', error);
                     }
              };

              fetchSupData();


       }, [])

       useEffect(() => {
              const fetchStudentProfile = async () => {
                     setIsLoading(true);
                     try {
                            const response = await axios.get(`https://bcknd.elmanhag.com/admin/student/student/${profileStudentId}`, {
                                   headers: {
                                          Authorization: `Bearer ${auth.user.token}`,
                                   },
                            });
                            if (response.status === 200) {
                                   const student = response.data.student;
                                   setStudentData(student);
                                   setStudentImage(student.image_link || '-');
                                   setParentImage(student.parents?.image_link || '-');
                                   setStudentName(student.name || '-');
                                   setStudentPhone(student.phone || '-');
                                   setStudentEmail(student.email || '-');
                                   setStudentCountryName(student?.country?.name || '-');
                                   setStudentCountryId(student?.country?.id || '-');
                                   setStudentCityName(student?.city?.name || '-');
                                   setStudentCityId(student?.city?.id || '-');
                                   setStudentCategoryName(student?.category?.name || '-');
                                   setStudentCategoryId(student?.category?.id || '-');
                                   setStudentEducationName(student?.education?.name || '-');
                                   setStudentEducationId(student?.education?.id || '-');
                                   setStudentGenderState(student.gender || '-');
                                   setStudentGender(student.gender || '-');
                                   setStudentJobName(student?.student_job?.job || '-');
                                   setStudentJobId(student?.student_job?.id || '-');
                                   setStudentStatus(student.status || '-');

                                   setParentName(student?.parents?.name || '-');
                                   setParentPhone(student?.parents?.phone || '-');
                                   setParentRelationName(student?.parent_relation?.name || '-');
                                   setParentRelationId(student?.parent_relation?.id || '-');
                                   setParentEmail(student?.parents?.email || '-');
                            }
                     } catch (error) {
                            const errorMessages = error?.response?.data?.errors;
                            let errorMessageString = 'Error occurred';

                            if (errorMessages) {
                                   errorMessageString = Object.values(errorMessages).flat().join(' ');
                            }
                            // auth.toastError('Error', errorMessageString);
                     } finally {
                            setIsLoading(false);
                     }
              };
              fetchStudentProfile();
       }, [profileStudentId]);  // Add dependencies

       useEffect(() => {
              console.log('studentData', studentData)
       }, [])


       const handleOpenCountryStudent = () => {
              setOpenCountry(!openCountry);
              setOpenCity(false);
              setOpenLanguage(false);
              setOpenCategory(false);
              setOpenStudentJob(false);
              setOpenStudentType(false);
              setOpenRelation(false);
       }
       const handleOpenCityStudent = () => {
              setOpenCountry(false);
              setOpenCity(!openCity);
              setOpenLanguage(false);
              setOpenCategory(false);
              setOpenStudentJob(false);
              setOpenStudentType(false);
              setOpenRelation(false);
       }
       const handleOpenLanguageStudent = () => {
              setOpenCountry(false);
              setOpenCity(false);
              setOpenLanguage(!openLanguage);
              setOpenCategory(false);
              setOpenStudentJob(false);
              setOpenStudentType(false);
              setOpenRelation(false);

       }
       const handleOpenCategoryStudent = () => {
              setOpenCountry(false);
              setOpenCity(false);
              setOpenLanguage(false);
              setOpenCategory(!openCategory);
              setOpenStudentJob(false);
              setOpenStudentType(false);
              setOpenRelation(false);

       }
       const handleOpenStudentType = () => {
              setOpenCountry(false);
              setOpenCity(false);
              setOpenLanguage(false);
              setOpenCategory(false);
              setOpenStudentType(!openStudentType);
              setOpenStudentJob(false);
              setOpenRelation(false);
       }
       const handleOpenStudentJob = () => {
              setOpenCountry(false);
              setOpenCity(false);
              setOpenLanguage(false);
              setOpenCategory(false);
              setOpenStudentType(false);
              setOpenStudentJob(!openStudentJob);
              setOpenRelation(false);
       }



       const handleCountryStudent = (e) => {
              // Get the input element inside the clicked option
              const inputElement = e.currentTarget.querySelector('.inputVal');

              // Get the selected option name and value
              const selectedOptionName = e.currentTarget.textContent.trim();
              const selectedOptionValue = inputElement ? parseInt(inputElement.value) || '' : '';

              // Safely filter cities by country ID if cities exist
              const allCitiesArr = allCities ? allCities.filter((city) => city.country_id === selectedOptionValue) : [];

              // Update state for country name, capitalizing the first letter safely
              if (selectedOptionName) {
                     setStudentCountryName(selectedOptionName[0].toUpperCase() + selectedOptionName.slice(1));
              }

              // Set the selected country and country ID

              // setCountry(selectedOptionName);
              setStudentCountryId(selectedOptionValue);

              // Close the dropdown for countries
              setOpenCountry(false);

              // Update the cities state and the state message
              setStudentCityName(allCitiesArr.length > 0 ? 'City' : "Not Found Cities");

              // Ensure that an array is passed, even when no cities are found
              setCities(allCitiesArr.length > 0 ? allCitiesArr : [{ id: 'Not Found Cities', name: 'Not Found Cities' }]);

              setStudentCityId(null)

              // setOpenCountry(false)

              // Debugging logs
              console.log('allCitiesArr:', allCitiesArr);
              console.log('allCities:', cities);
              console.log('Selected Name:', selectedOptionName);
              console.log('Selected Value:', selectedOptionValue);
       };
       const handleCityStudent = (e) => {
              const inputElement = e.currentTarget.querySelector('.inputVal');
              const selectedOptionName = e.currentTarget.textContent.trim();
              const selectedOptionValue = inputElement ? inputElement.value : '';
              // setCitiesState(selectedOptionName[0].toUpperCase() + selectedOptionName.slice(1));
              setStudentCityName(selectedOptionName);
              setStudentCityId(parseInt(selectedOptionValue))
              setOpenCity(false);
              console.log('Selected NameL:', selectedOptionName);
              console.log('Selected ValueL:', selectedOptionValue);
       }
       const handleLanguageStudent = (e) => {
              const inputElement = e.currentTarget.querySelector('.inputVal');
              const selectedOptionName = e.currentTarget.textContent.trim();
              const selectedOptionValue = inputElement ? inputElement.value : '';
              setStudentEducationName(selectedOptionName);
              setStudentEducationId(parseInt(selectedOptionValue))
              setOpenLanguage(false);
              console.log('Selected NameL:', selectedOptionName);
              console.log('Selected ValueL:', selectedOptionValue);
       }
       const handleCategoryStudent = (e) => {
              const inputElement = e.currentTarget.querySelector('.inputVal');
              const selectedOptionName = e.currentTarget.textContent.trim();
              const selectedOptionValue = inputElement ? inputElement.value : '';
              setStudentCategoryName(selectedOptionName);
              setStudentCategoryId(parseInt(selectedOptionValue))
              setOpenCategory(false);
              console.log('Selected NameL:', selectedOptionName);
              console.log('Selected ValueL:', selectedOptionValue);
       }
       const handleStudentType = (e) => {
              const inputElement = e.currentTarget.querySelector('.inputVal');
              const selectedOptionName = e.currentTarget.textContent.trim();
              const selectedOptionValue = inputElement ? inputElement.value : '';
              setStudentGenderState(selectedOptionName[0].toUpperCase() + selectedOptionName.slice(1));
              setStudentGender(selectedOptionName.toLowerCase());
              setOpenStudentType(false);
       };
       const handleStudentJob = (e) => {
              const inputElement = e.currentTarget.querySelector('.inputVal');
              const selectedOptionName = e.currentTarget.textContent.trim();
              const selectedOptionValue = inputElement ? inputElement.value : '';
              setStudentJobState(selectedOptionName[0].toUpperCase() + selectedOptionName.slice(1));
              setStudentJobName(selectedOptionName);
              setStudentJobId(parseInt(selectedOptionValue));
              setOpenStudentJob(false);
       };

       const handleOpenRelationStudent = () => {
              setOpenLanguage(false);
              setOpenCountry(false);
              setOpenCity(false);
              setOpenRelation(!openRelation);

       }
       const handleRelationStudent = (e) => {
              const inputElement = e.currentTarget.querySelector('.inputVal');
              const selectedOptionName = e.currentTarget.textContent.trim();
              const selectedOptionValue = inputElement ? inputElement.value : '';

              setParentRelationName(selectedOptionName);
              setParentRelationId(parseInt(selectedOptionValue))

              setOpenRelation(false);

              console.log('Selected NameRel:', selectedOptionName);
              console.log('Selected ValueRel:', selectedOptionValue);
       };

       const handleClick = (e) => {
              const isChecked = e.target.checked;
              setStudentStatus(isChecked ? 1 : 0);
       };


       const handleClickOutside = (event) => {
              if (
                     (dropdownLanguageStudentRef.current && !dropdownLanguageStudentRef.current.contains(event.target)) &&
                     (dropdownRelationStudentRef.current && !dropdownRelationStudentRef.current.contains(event.target)) &&
                     (dropdownCountryStudentRef.current && !dropdownCountryStudentRef.current.contains(event.target)) &&
                     (dropdownCategoryStudentRef.current && !dropdownCategoryStudentRef.current.contains(event.target)) &&
                     (dropdownCityStudentRef.current && !dropdownCityStudentRef.current.contains(event.target))
              ) {
                     setOpenCountry(false);
                     setOpenCity(false);
                     setOpenLanguage(false);
                     setOpenCategory(false);
                     setOpenRelation(false);
              }
       };

       useEffect(() => {
              document.addEventListener('mousedown', handleClickOutside);
              return () => {
                     document.removeEventListener('mousedown', handleClickOutside);
              };
       }, []);


       const handleGoBack = () => {
              navigate(-1, { replace: true });
       };
       const handleEditStudent = async (e) => {
              e.preventDefault();

              // Validate Student Data
              if (!studentName) {
                     auth.toastError('please Enter Student Name');
                     return;
              }
              if (!studentPhone) {
                     auth.toastError('please Enter student Phone');
                     return;
              }
              if (!studentEmail) {
                     auth.toastError('please Enter student Email');
                     return;
              }
              if (!studentCountryId) {
                     auth.toastError('please Select Country');
                     return;
              }
              if (!studentCityId) {
                     auth.toastError('please Select City');
                     return;
              }
              if (!studentCategoryId) {
                     auth.toastError('please Select Category');
                     return;
              }
              if (!studentEducationId) {
                     auth.toastError('please Select Education');
                     return;
              }
              if (!studentTypes) {
                     auth.toastError('please Select Types');
                     return;
              }
              // if (!studentGenderState) {
              //        auth.toastError('please Select GenderState');
              //        return;
              // }
              if (!studentGender) {
                     auth.toastError('please Select Gender');
                     return;
              }
              if (!studentJobId) {
                     auth.toastError('please Select Job');
                     return;
              }
              if (!studentStatus) {
                     auth.toastError('please Enter student Status');
                     return;
              }
              // if (!studentPassword) {
              //        auth.toastError('please Enter student Password');
              //        return;
              // }

              if (!parentName) {
                     auth.toastError('please Enter Parent Name');
                     return;
              }
              if (!parentPhone) {
                     auth.toastError('please Enter Parent Phone');
                     return;
              }
              if (!parentRelationId) {
                     auth.toastError('please Select Parent Relation');
                     return;
              }
              if (!parentEmail) {
                     auth.toastError('please Enter Parent Email');
                     return;
              }


              setIsLoading(true);

              const formData = new FormData();

              // Student Profile
              formData.append('name', studentName);
              formData.append('phone', studentPhone);
              formData.append('email', studentEmail);
              formData.append('country_id', studentCountryId);
              formData.append('city_id', studentCityId);
              formData.append('category_id', studentCategoryId);
              formData.append('education_id', studentEducationId);
              formData.append('gender', studentGender);
              formData.append('sudent_jobs_id', studentJobId);
              formData.append('status', studentStatus);
              // Parent Profile
              formData.append('parent_name', parentName);
              formData.append('parent_phone', parentPhone);
              formData.append('relation_id', parentRelationId);
              formData.append('parent_email', parentEmail);

              if (studentPassword) {
                     formData.append('passwoard', studentPassword);
              }
              if (parentPassword) {
                     formData.append('parent_password', parentPassword);
              }


              try {
                     const response = await axios.post(`https://bcknd.elmanhag.com/admin/student/update/${profileStudentId}`, formData, {
                            headers: {
                                   Authorization: `Bearer ${auth.user.token}`,
                                   'Content-Type': 'multipart/form-data',
                            },
                     });

                     if (response.status === 200) {
                            console.log('Response:', response);
                            auth.toastSuccess('Question added successfully!');
                            handleGoBack();
                     } else {
                            auth.toastError('Failed to add Question.');
                     }
              } catch (error) {
                     const errorMessages = error?.response?.data.errors;
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
              <>
                     <form onSubmit={handleEditStudent} className="w-full flex flex-col items-start justify-center gap-4">
                            <div className="w-full flex flex-wrap items-center justify-center mt-4">
                                   <div className="sm:w-full xl:w-1/3 flex items-center justify-center ">
                                          <span className={`${stateTap === 1 ? 'text-mainColor border-b-4 border-mainColor' : 'text-thirdColor '} text-3xl font-semibold py-1`}>
                                                 Profile
                                          </span>
                                   </div>
                                   <div className="sm:w-full xl:w-1/3 flex items-center justify-center ">
                                          <span className={`${stateTap === 2 ? 'text-mainColor border-b-4 border-mainColor' : 'text-thirdColor '} text-3xl font-semibold py-1`}>
                                                 Parent
                                          </span>
                                   </div>
                                   {/* <div className="sm:w-full xl:w-1/3 flex items-center justify-center">
                                          <span className={`${stateData === 3 ? 'text-mainColor border-b-4 border-mainColor' : 'text-thirdColor '} text-3xl font-semibold py-1`}>
                                                 Answers
                                          </span>
                                   </div> */}
                            </div>
                            {/* State 1 */}
                            {stateTap === 1 &&
                                   (
                                          <div className="w-full flex flex-wrap items-center justify-start gap-2">
                                                 <div className="w-full flex items-center justify-start gap-5 mb-4">
                                                        <img src={studentImage} loading='lazy' alt="Photo" className='w-72 h-72 object-cover object-center rounded-full' />
                                                        <div className="flex flex-col">
                                                               <span className='text-mainColor text-xl font-medium'>{studentName}</span>
                                                               <span className='text-mainColor text-xl font-medium'>{studentEmail}</span>
                                                        </div>
                                                 </div>

                                                 <div className="lg:w-[30%] sm:w-full">
                                                        <InputCustom
                                                               type="text"
                                                               borderColor="transparent"
                                                               placeholder="Student Name"
                                                               value={studentName || ""}
                                                               onChange={e => setStudentName(e.target.value)}
                                                        />
                                                 </div>

                                                 <div className="lg:w-[30%] sm:w-full">
                                                        <DropDownMenu
                                                               ref={dropdownCountryStudentRef}
                                                               handleOpen={handleOpenCountryStudent}
                                                               handleOpenOption={handleCountryStudent}
                                                               stateoption={studentCountryName}
                                                               openMenu={openCountry}
                                                               options={countries}
                                                        />
                                                 </div>

                                                 <div className="lg:w-[30%] sm:w-full">
                                                        <DropDownMenu
                                                               ref={dropdownCityStudentRef}
                                                               handleOpen={handleOpenCityStudent}
                                                               handleOpenOption={handleCityStudent}
                                                               stateoption={cities.length > 0 ? studentCityName : "Not Found Cities"}
                                                               openMenu={openCity}
                                                               options={cities.length > 0 ? cities : [{ id: "not-found", name: "Not Found Cities" }]}
                                                        />
                                                 </div>

                                                 <div className="lg:w-[30%] sm:w-full">
                                                        <DropDownMenu
                                                               ref={dropdownLanguageStudentRef}
                                                               handleOpen={handleOpenLanguageStudent}
                                                               handleOpenOption={handleLanguageStudent}
                                                               stateoption={studentEducationName}
                                                               openMenu={openLanguage}
                                                               options={educations}
                                                        />
                                                 </div>

                                                 <div className="lg:w-[30%] sm:w-full">
                                                        <InputCustom
                                                               type="number"
                                                               borderColor="transparent"
                                                               placeholder="Number"
                                                               value={studentPhone || ""}
                                                               onChange={e => setStudentPhone(e.target.value)}
                                                        />
                                                 </div>

                                                 <div className="lg:w-[30%] sm:w-full">
                                                        <DropDownMenu
                                                               ref={dropdownCategoryStudentRef}
                                                               handleOpen={handleOpenCategoryStudent}
                                                               handleOpenOption={handleCategoryStudent}
                                                               stateoption={studentCategoryName}
                                                               openMenu={openCategory}
                                                               options={category}
                                                        />
                                                 </div>

                                                 <div className="lg:w-[30%] sm:w-full">
                                                        <DropDownMenu
                                                               ref={StudentTypeRef}
                                                               handleOpen={handleOpenStudentType}
                                                               handleOpenOption={handleStudentType}
                                                               stateoption={studentGenderState}
                                                               openMenu={openStudentType}
                                                               options={studentTypes}
                                                        />
                                                 </div>

                                                 <div className="lg:w-[30%] sm:w-full">
                                                        <DropDownMenu
                                                               ref={StudentJobRef}
                                                               handleOpen={handleOpenStudentJob}
                                                               handleOpenOption={handleStudentJob}
                                                               stateoption={studentJobName}
                                                               openMenu={openStudentJob}
                                                               options={studentJobs}
                                                        />
                                                 </div>

                                                 <div className="lg:w-[30%] sm:w-full">
                                                        <InputCustom
                                                               type="email"
                                                               borderColor="transparent"
                                                               placeholder="Email"
                                                               value={studentEmail || ""}
                                                               onChange={e => setStudentEmail(e.target.value)}
                                                        />
                                                 </div>

                                                 <div className="lg:w-[30%] sm:w-full">
                                                        <InputCustom
                                                               type="password"
                                                               borderColor="transparent"
                                                               placeholder="Password"
                                                               value={studentPassword || ""}
                                                               onChange={e => setStudentPassword(e.target.value)}
                                                        />
                                                 </div>
                                                 <div className="flex items-center gap-x-4 lg:w-[30%] sm:w-full">
                                                        <span className="text-2xl text-thirdColor font-medium">Active:</span>
                                                        <div>
                                                               <CheckBox handleClick={handleClick} checked={studentStatus} />
                                                        </div>
                                                 </div>
                                          </div>

                                   )
                            }
                            {stateTap === 2 && (
                                   <div className="w-full flex flex-wrap items-center justify-start gap-2">
                                          <div className="w-full flex items-center justify-start gap-5 mb-4">
                                                 <img src={parentImage} alt="Photo" className='w-72 h-72 object-cover object-center rounded-full' />
                                                 <div className="flex flex-col">
                                                        <span className='text-mainColor text-xl font-medium'>{parentName}</span>
                                                        <span className='text-mainColor text-xl font-medium'>{parentEmail}</span>
                                                 </div>
                                          </div>
                                          <div className="lg:w-[30%] sm:w-full">
                                                 <InputCustom type={"text"} borderColor={"none"} placeholder={"Parent Name"} value={parentName} onChange={(e => setParentName(e.target.value))} />
                                          </div>
                                          <div className="lg:w-[30%] sm:w-full">
                                                 <InputCustom type={"number"} borderColor={"none"} placeholder={"Number"} value={parentPhone} onChange={(e => setParentPhone(e.target.value))} />
                                          </div>
                                          <div className="lg:w-[30%] sm:w-full">
                                                 <DropDownMenu
                                                        ref={dropdownRelationStudentRef}
                                                        handleOpen={handleOpenRelationStudent}
                                                        handleOpenOption={handleRelationStudent}
                                                        stateoption={parentRelationName}
                                                        openMenu={openRelation}
                                                        options={relations}
                                                 />
                                          </div>
                                          <div className="lg:w-[30%] sm:w-full">
                                                 <InputCustom type={"email"} borderColor={"none"} placeholder={"Email"} value={parentEmail} onChange={(e => setParentEmail(e.target.value))} />
                                          </div>
                                          <div className="lg:w-[30%] sm:w-full">
                                                 <InputCustom type={"password"} borderColor={"none"} placeholder={"Password"} value={parentPassword} onChange={(e => setParentPassword(e.target.value))} />
                                          </div>

                                   </div>
                            )}

                            <div className="w-full flex justify-between my-4">
                                   {stateTap === 1 &&
                                          (
                                                 <>
                                                        <div className="w-full text-end">
                                                               <Button Text="Next" handleClick={handleClickNext} />
                                                        </div>

                                                 </>
                                          )
                                   }
                                   {stateTap === 2 &&
                                          (
                                                 <>
                                                        <div className="w-full flex items-center justify-between">
                                                               <Button Text="Prev" handleClick={handleClickPrev} />
                                                               <Button Text="Edit" handleClick={handleEditStudent} />
                                                               {/* <Button Text="Next" handleClick={handleClickNext} /> */}
                                                        </div>
                                                 </>
                                          )
                                   }


                            </div>
                            {/* .
                            <button type="submit" className="w-full text-center text-2xl font-medium text-secoundColor px-6 py-maintext-mainColor rounded-2xl">Add</button>
                            <button type="button" className="w-full text-center text-2xl font-medium text-secoundColor px-6 py-maintext-mainColor rounded-2xl">Cancle</button> */}
                     </form>
              </>
       )
}

export default EditProfilePage