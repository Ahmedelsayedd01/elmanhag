import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../../Context/Auth';
import { useNavigate } from 'react-router-dom';
import HeaderPageSection from '../../../Components/HeaderPageSection';
import DropDownMenu from '../../../Components/DropDownMenu';
import axios from 'axios';
import Loading from '../../../Components/Loading';
import InputCustom from '../../../Components/InputCustom';
import CheckBox from '../../../Components/CheckBox';
import DeleteIcon from '../../../Components/Icons/AdminIcons/DeleteIcon';
import { Button, ButtonAdd } from '../../../Components/Button';

const AddRevisionPage = () => {
       const auth = useAuth();

       const educationRef = useRef();
       const semesterRef = useRef();
       const categoryRef = useRef();
       const subjectRef = useRef();
       const typeRef = useRef();
       const monthRef = useRef();

       const typeResoursRefs = useRef([]);
       const fileRefs = useRef([]);

       const navigate = useNavigate();

       const [isLoading, setIsLoading] = useState(false);

       const [title, setTitle] = useState('');
       const [price, setPrice] = useState('');
       const [expireDate, setExpireDate] = useState('');
       const [revisionActive, setRevisionActive] = useState(0);

       const [semesterState, setSemesterState] = useState('Select Semester');
       const [educationState, setEducationState] = useState('Select Education');
       const [categoryState, setCategoryState] = useState('Select Category');
       const [subjectState, setSubjectState] = useState('Select Subject');
       const [typeState, setTypeState] = useState('Select Type');
       const [monthState, setMonthState] = useState('Select Month');
       const [typeResoursState, setTypeResoursState] = useState([]);

       const [semesterId, setSemesterId] = useState('');
       const [educationId, setEducationId] = useState('');
       const [categoryId, setCategoryId] = useState('');
       const [subjectId, setSubjectId] = useState('');
       const [typeId, setTypeId] = useState('');
       const [monthId, setMonthId] = useState('');
       const [typeResoursId, setTypeResoursId] = useState([]);

       const [semester, setSemester] = useState('');
       const [educationName, setEducationName] = useState('');
       const [category, setCategory] = useState('');
       const [subject, setSubject] = useState('');
       const [type, setType] = useState('');
       const [month, setMonth] = useState('');

       const [typeResours, setTypeResours] = useState([]);

       const [allSubjects, setAllSubjects] = useState(null);

       const [semesters] = useState([{ name: 'first' }, { name: 'second' }]);
       const [types] = useState([{ name: 'monthly' }, { name: 'final' }]);

       const [fileName, setFileName] = useState([]);
       const [fileValue, setFileValue] = useState([]);

       const [monthes] = useState([
              { name: "January" },
              { name: "February" },
              { name: "March" },
              { name: "April" },
              { name: "May" },
              { name: "June" },
              { name: "July" },
              { name: "August" },
              { name: "September" },
              { name: "October" },
              { name: "November" },
              { name: "December" },
       ]);
       const [educations, setEducations] = useState([]);
       const [categories, setCategories] = useState([]);
       const [subjects, setSubjects] = useState([]);
       const [typeResourses] = useState([{ name: 'pdf' }, { name: 'video' }]);

       const [openSemester, setOpenSemester] = useState(false);
       const [openEducation, setOpenEducation] = useState(false);
       const [openCategory, setOpenCategory] = useState(false);
       const [openSubject, setOpenSubject] = useState(false);
       const [openType, setOpenType] = useState(false);
       const [openMonth, setOpenMonth] = useState(false);
       const [openTypeResours, setOpenTypeResours] = useState(false);
       const [openDropdownIndex, setOpenDropdownIndex] = useState(null);


       const [resourses, setResourses] = useState([]);
       /* Fetch Category && Subjects */
       const fetchCategoryAndSubjects = async () => {
              setIsLoading(true)
              try {
                     const response = await axios.get('http://62.84.185.153/plesk-site-preview/bcknd.elmanhag.com/https/62.84.185.153/admin/subject', {
                            headers: {
                                   Authorization: `Bearer ${auth.user.token}`,
                            },
                     });
                     if (response.status === 200) {
                            setCategories(response.data.categories);
                            setAllSubjects(response.data.subjects);
                            setEducations([...response.data.education, { id: 'null', name: 'Together' }]);
                            console.log('response Category & Subjects', response)
                     }
              } catch (error) {
                     console.error('Error fetching Subjects data:', error);
              } finally {
                     setIsLoading(false)
              }
       };

       useEffect(() => {
              fetchCategoryAndSubjects();
              console.log('categories', categories)
              console.log('subjects', allSubjects)
       }, [])

       const handleOpenEducation = () => {
              setOpenEducation(!openEducation);
              setOpenDropdownIndex(null)
              setOpenSemester(false);
              setOpenCategory(false);
              setOpenSubject(false);
              setOpenType(false);
              setOpenMonth(false);
              setOpenTypeResours(false);
       };
       const handleOpenSemester = () => {
              setOpenDropdownIndex(null)
              setOpenEducation(false);
              setOpenSemester(!openSemester);
              setOpenCategory(false);
              setOpenSubject(false);
              setOpenType(false);
              setOpenMonth(false);
              setOpenTypeResours(false);
       }

       const handleOpenCategory = () => {
              setOpenDropdownIndex(null)
              setOpenEducation(false);
              setOpenSemester(false);
              setOpenCategory(!openCategory);
              setOpenSubject(false);
              setOpenType(false);
              setOpenMonth(false);
              setOpenTypeResours(false);
       }
       const handleOpenSubject = () => {
              setOpenDropdownIndex(null)
              setOpenEducation(false);
              setOpenSemester(false);
              setOpenCategory(false);
              setOpenSubject(!openSubject);
              setOpenType(false);
              setOpenMonth(false);
              setOpenTypeResours(false);
       }
       const handleOpenType = () => {
              setOpenDropdownIndex(null)
              setOpenEducation(false);
              setOpenSemester(false);
              setOpenCategory(false);
              setOpenSubject(false);
              setOpenType(!openType);
              setOpenMonth(false);
       }
       const handleOpenMonth = () => {
              setOpenDropdownIndex(null)
              setOpenEducation(false);
              setOpenSemester(false);
              setOpenCategory(false);
              setOpenSubject(false);
              setOpenType(false);
              setOpenMonth(!openMonth);
              setOpenTypeResours(false);
       }

       useEffect(() => {
              console.log('resourses', resourses)
       }, [resourses]);

       const handleOpenTypeResours = (index) => {
              setOpenDropdownIndex(index === openDropdownIndex ? null : index); // Toggle dropdown state
       };

       const handleEducation = (e) => {
              const inputElement = e.currentTarget.querySelector('.inputVal');
              const selectedOptionName = e.currentTarget.textContent.trim();
              const selectedOptionValue = inputElement ? inputElement.value : '';

              if (selectedOptionValue == 'null') {
                     setEducationId(' ');
              } else {
                     setEducationId(parseInt(selectedOptionValue));
              }
              setEducationState(selectedOptionName);
              setEducationName(selectedOptionName);



              // console.log('educationId', educationId)

              setOpenEducation(false);
              console.log('selectedOptionName', selectedOptionName)
              console.log('selectedOptionValue', selectedOptionValue)
       };

       const handleSemester = (e) => {
              const inputElement = e.currentTarget.querySelector('.inputVal');
              const selectedOptionName = e.currentTarget.textContent.trim();
              const selectedOptionValue = inputElement ? inputElement.value : '';
              setSemesterState(selectedOptionName[0].toUpperCase() + selectedOptionName.slice(1));
              setSemester(selectedOptionName);
              setSemesterId(parseInt(selectedOptionValue));
              setOpenSemester(false);

              console.log('Selected NameL:', selectedOptionName);
              console.log('Selected ValueL:', selectedOptionValue);
       };

       const handleCategory = (e) => {
              const inputElement = e.currentTarget.querySelector('.inputVal');
              const selectedOptionName = e.currentTarget.textContent.trim();
              const selectedOptionValue = inputElement ? parseInt(inputElement.value) : '';

              const subjectsData = allSubjects.filter((subject) => subject.category_id == selectedOptionValue)

              setSubjects(subjectsData)
              console.log('subjectsData', subjectsData)

              setCategoryState(selectedOptionName[0].toUpperCase() + selectedOptionName.slice(1));
              setCategory(selectedOptionName);
              setCategoryId(parseInt(selectedOptionValue));
              setOpenCategory(false);

              console.log('Selected NameL:', selectedOptionName);
              console.log('Selected ValueL:', selectedOptionValue);
       };

       const handleSubject = (e) => {
              const inputElement = e.currentTarget.querySelector('.inputVal');
              const selectedOptionName = e.currentTarget.textContent.trim();
              const selectedOptionValue = inputElement ? parseInt(inputElement.value) : '';

              setSubjectState(selectedOptionName[0].toUpperCase() + selectedOptionName.slice(1));
              setSubject(selectedOptionName);
              setSubjectId(parseInt(selectedOptionValue));
              setOpenSubject(false);



              console.log('Selected NameL:', selectedOptionName);
              console.log('Selected ValueL:', selectedOptionValue);
       };
       const handleType = (e) => {
              const inputElement = e.currentTarget.querySelector('.inputVal');
              const selectedOptionName = e.currentTarget.textContent.trim();
              const selectedOptionValue = inputElement ? inputElement.value : '';
              setTypeState(selectedOptionName[0].toUpperCase() + selectedOptionName.slice(1));
              setType(selectedOptionName);
              setTypeId(parseInt(selectedOptionValue));
              setOpenType(false);
              setMonthState('Select Month')
              setMonthId('')
              setMonth('')

              console.log('Selected NameL:', selectedOptionName);
              console.log('Selected ValueL:', selectedOptionValue);
       };
       const handleMonth = (e) => {
              const inputElement = e.currentTarget.querySelector('.inputVal');
              const selectedOptionName = e.currentTarget.textContent.trim();
              const selectedOptionValue = inputElement ? inputElement.value : '';
              setMonthState(selectedOptionName[0].toUpperCase() + selectedOptionName.slice(1));
              setMonth(selectedOptionName);
              setMonthId(parseInt(selectedOptionValue));
              setOpenMonth(false);

              console.log('Selected NameL:', selectedOptionName);
              console.log('Selected ValueL:', selectedOptionValue);
       };

       const handleClick = (e) => {
              const isChecked = e.target.checked;
              setRevisionActive(isChecked ? 1 : 0);
       };

       const handleInputClick = (index) => {
              if (fileRefs.current[index]) {
                     fileRefs.current[index].click(); // Simulate a click on the hidden file input
              }
       };
       const handleTypeResours = (index, e) => {
              console.log('index:', index); // Check the index of the clicked dropdown
              console.log('Selected Option:', e); // This should log the selected option object

              const inputElement = e.currentTarget.querySelector('.inputVal');
              const selectedOptionName = e.currentTarget.textContent.trim();
              const selectedOptionValue = inputElement ? inputElement.value.toLowerCase() : '';

              const newResourseType = [...typeResoursState];
              const newResourseTypeName = [...typeResours];

              newResourseType[index] = selectedOptionName;
              newResourseTypeName[index] = selectedOptionValue;

              setTypeResours(newResourseTypeName);
              setTypeResoursState(newResourseType);

              setOpenDropdownIndex(null);

       };

       const handleFileChange = (index, e) => {
              const file = e.target.files[0];
              console.log(`File selected for index ${index}:`, file);

              if (file) {
                     const newVideoFile = [...fileValue];
                     const newVideo = [...fileName];
                     newVideoFile[index] = file;
                     newVideo[index] = file.name;

                     console.log('Updated fileValue:', newVideoFile);
                     console.log('Updated fileName:', newVideo);

                     setFileValue(newVideoFile);
                     setFileName(newVideo);
              }
       };

       const setFileRef = (el, newIndex) => {
              if (el) fileRefs.current[newIndex] = el;
       };

       const handleAddResourse = () => {
              const resourseIndex = resourses.length;

              typeResoursRefs.current[resourseIndex] = React.createRef();
              fileRefs.current[resourseIndex] = React.createRef();

              const setFileRef = (el) => {
                     if (el) fileRefs.current[resourseIndex] = el;
              };

              setFileValue((prev) => [...prev, '']);
              setFileName((prev) => [...prev, '']);

              setTypeResoursState((prev) => [...prev, 'Select Type']);

              const resource = (
                     <div
                            key={resourseIndex}
                            className="w-full flex sm:flex-col lg:flex-row justify-start items-center gap-4 resourse"
                     >
                            {/* Dropdown for type */}
                            <div className="sm:w-full xl:w-[40%] typeName">
                                   <DropDownMenu
                                          ref={typeResoursRefs.current[resourseIndex]}
                                          handleOpen={() => handleOpenTypeResours(resourseIndex)}
                                          handleOpenOption={(e) => handleTypeResours(resourseIndex, e)}
                                          stateoption={typeResoursState[resourseIndex]}
                                          openMenu={openDropdownIndex === resourseIndex}
                                          options={typeResourses}
                                   />

                            </div>


                            <div className="lg:w-[40%] sm:w-full imageFile">
                                   <InputCustom
                                          paddinRight='pr-11'
                                          type="text"
                                          source="upload"
                                          placeholder="Upload File"
                                          value={fileName[resourseIndex]}
                                          readonly={true}
                                          onClick={() => handleInputClick(resourseIndex)}
                                   />
                                   <input
                                          ref={setFileRef}
                                          type="file"
                                          className="hidden"
                                          onChange={(e) => handleFileChange(resourseIndex, e)}
                                   />
                            </div>
                            {/* Remove button */}
                            <div className="lg:w-[5%] sm:w-full flex items-center justify-center bg-white py-3 rounded-xl border-mainColor">
                                   <button type="button" onClick={(e) => handleRemoveResours(resourseIndex, e)}>
                                          <DeleteIcon Width="30" Height="30" />
                                   </button>
                            </div>
                     </div>
              )

              setResourses(prev => [...prev, resource])
       };


       const handleRemoveResours = (index, e) => {
              const ele = e.target.closest('.resourse');
              ele.remove();
              console.log('ele', ele)
              // setResourses((prev) => prev.filter((_, i) => i !== index));
       };


       const handleClickOutside = (event) => {
              const refs = [
                     educationRef,
                     semesterRef,
                     categoryRef,
                     subjectRef,
                     typeRef,
                     ...typeResoursRefs.current, // Spread refs of each dropdown
              ];

              const isClickInsideAny = refs.some((ref) => ref && ref.current && ref.current.contains(event.target));

              // If the click is outside all of the elements
              if (!isClickInsideAny) {
                     setOpenDropdownIndex(null); // Close any open dropdown
                     setOpenEducation(false);
                     setOpenSemester(false);
                     setOpenCategory(false);
                     setOpenSubject(false);
                     setOpenType(false);
              }
       };

       // Attach the event listener when the component mounts
       useEffect(() => {
              document.addEventListener('mousedown', handleClickOutside);
              return () => {
                     document.removeEventListener('mousedown', handleClickOutside);
              };
       }, []);

       const handleGoBack = () => {
              navigate(-1, { replace: true });
       };

       const handleAdd = async (e) => {
              e.preventDefault();

              if (!title) {
                     auth.toastError('Please Enter Title.');
                     return;
              }
              if (!educationId && !educationName) {
                     auth.toastError('Please Select Education.');
                     return;
              }
              if (!semester) {
                     auth.toastError('Please Select Semester.');
                     return;
              }
              if (!categoryId) {
                     auth.toastError('Please Select Category.');
                     return;
              }
              if (!subjectId) {
                     auth.toastError('Please Select Subject.');
                     return;
              }
              if (!expireDate) {
                     auth.toastError('Please Select Expire Date.');
                     return;
              }
              if (!price) {
                     auth.toastError('Please Enter Price.');
                     return;
              }
              if (!type) {
                     auth.toastError('Please Select Type.');
                     return;
              }
              if (type == 'monthly') {
                     if (!month) {
                            auth.toastError('Please Select Month.');
                            return;
                     }
              }
              if (resourses.length === 0) {
                     auth.toastError('Please Add Resourse.');
                     return;

              }
              // if (typeResours.length === 0) {
              //        auth.toastError('Please Select Type Resourse.');
              //        return;
              // }
              // if (fileName.length === 0) {
              //        auth.toastError('Please Select File Resourse.');
              //        return;
              // }
              setIsLoading(true);

              const formData = new FormData();
              formData.append('title', title);
              formData.append('semester', semester);
              formData.append('education_id', educationId);
              formData.append('semester', semester);
              formData.append('category_id', categoryId);
              formData.append('subject_id', subjectId);
              formData.append('price', price);
              formData.append('status', revisionActive);
              formData.append('month', month);
              formData.append('expire_date', expireDate);
              formData.append('type', type);



              // formData.append('files', revisionActive);

              const allResourses = document.querySelectorAll('.resourse');


              allResourses.forEach((ele, index) => {
                     console.log('Processing ele', ele);

                     const type = ele.querySelector('.typeName .eleValueDropDown')?.innerText?.toLowerCase();
                     const file = fileValue[index]; // Get the file from state instead of DOM
                     console.log('Processing file:', file);

                     if (!type || type === 'select type') {
                            auth.toastError('Please Select Type.');
                            setIsLoading(false);
                            return;
                     }

                     if (!file) {
                            auth.toastError('Please upload a file.');
                            setIsLoading(false);
                            return;
                     }

                     formData.append(`files[${index}][type]`, type);
                     formData.append(`files[${index}][file]`, file);
              });




              try {


                     const response = await axios.post(' http://62.84.185.153/plesk-site-preview/bcknd.elmanhag.com/https/62.84.185.153/admin/revisions/add', formData, {
                            headers: {
                                   Authorization: `Bearer ${auth.user.token}`,
                            },
                     });

                     if (response.status === 200) {
                            auth.toastSuccess('Revisions added successfully!');
                            handleGoBack();
                     } else {
                            auth.toastError('Failed to add revisions.');
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

       }

       return (
              <>
                     <HeaderPageSection handleClick={handleGoBack} name="Add Revision" />
                     {isLoading ? (
                            <div className="w-1/4 h-full flex items-start mt-[10%] justify-center m-auto">
                                   <Loading />
                            </div>
                     ) : (


                            <form onSubmit={handleAdd} className="w-full flex flex-wrap  justify-start gap-4 mt-4">
                                   <div className="lg:w-[30%] sm:w-full">
                                          <InputCustom
                                                 type="text"
                                                 placeholder="Title Revision"
                                                 value={title}
                                                 required={false}
                                                 onChange={(e) => setTitle(e.target.value)}
                                          />
                                   </div>

                                   <div className="sm:w-full xl:w-[30%]">
                                          <DropDownMenu
                                                 ref={educationRef}
                                                 handleOpen={handleOpenEducation}
                                                 handleOpenOption={handleEducation}
                                                 stateoption={educationState}
                                                 openMenu={openEducation}
                                                 options={educations || []}
                                          />
                                   </div>
                                   <div className="sm:w-full xl:w-[30%]">
                                          <DropDownMenu
                                                 ref={semesterRef}
                                                 handleOpen={handleOpenSemester}
                                                 handleOpenOption={handleSemester}
                                                 stateoption={semesterState}
                                                 openMenu={openSemester}
                                                 options={semesters || []}
                                          />
                                   </div>
                                   <div className="sm:w-full xl:w-[30%]">
                                          <DropDownMenu
                                                 ref={categoryRef}
                                                 handleOpen={handleOpenCategory}
                                                 handleOpenOption={handleCategory}
                                                 stateoption={categoryState}
                                                 openMenu={openCategory}
                                                 options={categories || []}
                                          />
                                   </div>
                                   <div className="sm:w-full xl:w-[30%]">
                                          <DropDownMenu
                                                 ref={subjectRef}
                                                 handleOpen={handleOpenSubject}
                                                 handleOpenOption={handleSubject}
                                                 stateoption={subjects.length > 0 ? subjectState : "No Subjects Available"}
                                                 openMenu={openSubject}
                                                 options={subjects || []}
                                          />
                                   </div>
                                   <div className="lg:w-[30%] sm:w-full flex sm:flex-col lg:flex-row sm:items-start lg:items-center">
                                          <span className='w-2/4 text-thirdColor font-semibold text-xl pl-1'>Expire Date:</span>
                                          <InputCustom
                                                 type="date"
                                                 placeholder="Expire Date"
                                                 value={expireDate}
                                                 minDate={true}
                                                 required={false}
                                                 onChange={(e) => setExpireDate(e.target.value)}
                                          />
                                   </div>



                                   <div className="lg:w-[30%] sm:w-full">
                                          <InputCustom
                                                 type="number"
                                                 placeholder="Price"
                                                 value={price}
                                                 required={false}
                                                 onChange={(e) => setPrice(e.target.value)}
                                          />
                                   </div>

                                   <div className="sm:w-full xl:w-[30%]">
                                          <DropDownMenu
                                                 ref={typeRef}
                                                 handleOpen={handleOpenType}
                                                 handleOpenOption={handleType}
                                                 stateoption={typeState}
                                                 openMenu={openType}
                                                 options={types || []}
                                          />
                                   </div>
                                   {type == 'monthly' && (
                                          <div className="lg:w-[30%] sm:w-full">
                                                 <DropDownMenu
                                                        ref={monthRef}
                                                        handleOpen={handleOpenMonth}
                                                        handleOpenOption={handleMonth}
                                                        stateoption={monthState}
                                                        openMenu={openMonth}
                                                        options={monthes || []}
                                                 />
                                          </div>
                                   )}


                                   <div className="flex items-center gap-x-4 lg:w-[30%] sm:w-full">
                                          <span className="text-2xl text-thirdColor font-medium">Active:</span>
                                          <div>
                                                 <CheckBox checked={revisionActive} handleClick={handleClick} />
                                          </div>
                                   </div>
                                   {/*

                                   {/* Render Resources */}
                                   {resourses.map((resourse, resourseIndex) => (
                                          <div
                                                 key={resourseIndex}
                                                 className="w-full flex sm:flex-col lg:flex-row justify-start items-center gap-4 resourse"
                                          >
                                                 {/* Dropdown for type */}
                                                 <div className="sm:w-full xl:w-[40%] typeName">
                                                        <DropDownMenu
                                                               ref={typeResoursRefs.current[resourseIndex]}
                                                               handleOpen={() => handleOpenTypeResours(resourseIndex)}
                                                               handleOpenOption={(e) => handleTypeResours(resourseIndex, e)}
                                                               stateoption={typeResoursState[resourseIndex]}
                                                               openMenu={openDropdownIndex === resourseIndex}
                                                               options={typeResourses}
                                                        />

                                                 </div>

                                                 {/* File input */}
                                                 <div className="lg:w-[40%] sm:w-full imageFile">
                                                        <InputCustom
                                                               paddinRight='pr-11'
                                                               type="text"
                                                               source="upload"
                                                               placeholder="Upload File"
                                                               value={fileName[resourseIndex]}
                                                               readonly={true}
                                                               onClick={() => handleInputClick(resourseIndex)}
                                                        />
                                                        <input
                                                               ref={(el) => setFileRef(el, resourseIndex)}
                                                               type="file"
                                                               className="hidden"
                                                               onChange={(e) => handleFileChange(resourseIndex, e)}
                                                        />
                                                 </div>
                                                 {/* Remove button */}
                                                 <div className="lg:w-[5%] sm:w-full flex items-center justify-center bg-white py-3 rounded-xl border-mainColor">
                                                        <button type="button" onClick={(e) => handleRemoveResours(resourseIndex, e)}>
                                                               <DeleteIcon Width="30" Height="30" />
                                                        </button>
                                                 </div>
                                          </div>
                                   ))}

                                   <div className="w-full">
                                          <ButtonAdd
                                                 isWidth={'w-full'}
                                                 BgColor='mainColor'
                                                 Color='white'
                                                 iconColor='white'
                                                 Text='Add Resours'
                                                 handleClick={handleAddResourse}
                                          />
                                   </div>





                                   {/* Buttons */}
                                   <div className="mt-5 w-full flex sm:flex-col lg:flex-row items-center justify-start sm:gap-y-5 lg:gap-x-28 ">
                                          <div className="flex items-center justify-center w-72">
                                                 <Button
                                                        type="submit"
                                                        Text="Add"
                                                        BgColor="bg-mainColor"
                                                        Color="text-white"
                                                        Width="full"
                                                        Size="text-2xl"
                                                        px="px-28"
                                                        rounded="rounded-2xl"
                                                        onClick={handleAdd}
                                                 />
                                          </div>
                                          <button onClick={handleGoBack} className="text-2xl text-mainColor">Cancel</button>
                                   </div>




                            </form>
                     )}
              </>
       )
}

export default AddRevisionPage
