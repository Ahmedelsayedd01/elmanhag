import React, { useEffect, useRef, useState } from 'react'
import { Button, ButtonAdd } from '../../../../Components/Button';
import InputCustom from '../../../../Components/InputCustom';
import DropDownMenu from '../../../../Components/DropDownMenu';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../../../Context/Auth';
import Loading from '../../../../Components/Loading';
import DeleteIcon from '../../../../Components/Icons/AdminIcons/DeleteIcon';

const MaterialLessonPage = () => {
       const auth = useAuth();
       const navigate = useNavigate()
       const location = useLocation()
       const lessonId = location.state;

       const [materialListOld, setMaterialListOld] = useState(null)
       const [materialListEdit, setMaterialListEdit] = useState([])

       const dropdownMaterialRefs = useRef([]);
       const dropdownMaterialTypeRefs = useRef([]);
       const uploadRefs = useRef([]);

       const [materialData] = useState([{ name: 'Voice' }, { name: 'Video' }, { name: 'Pdf' }]);
       const [materialTypeData] = useState([{ name: 'External' }, { name: 'Embedded' }, { name: 'Upload' }]);
       const [materialList, setMaterialList] = useState([]);

       const [material, setMaterial] = useState([]);
       const [materialType, setMaterialType] = useState([]);
       const [materialName, setMaterialName] = useState([]);
       const [materialTypeName, setMaterialTypeName] = useState([]);
       const [openMaterial, setOpenMaterial] = useState([]);
       const [openMaterialType, setOpenMaterialType] = useState([]);

       const [lessonExternal, setLessonExternal] = useState([]);
       const [lessonEmbedded, setLessonEmbedded] = useState([]);
       const [lessonVideoFile, setLessonVideoFile] = useState([]);
       const [lessonVideo, setLessonVideo] = useState([]);

       const [isLoading, setIsLoading] = useState(false);
       const [isLoadingEdit, setIsLoadingEdit] = useState(false);
       const [isLoadingDelete, setIsLoadingDelete] = useState(false);
       const [materials, setMaterials] = useState([]);

       const fetchMaterialLesson = async () => {
              try {
                     const response = await axios.get(`https://bcknd.elmanhag.com/admin/lessonMaterial/${lessonId}`, {
                            headers: {
                                   Authorization: `Bearer ${auth.user.token}`,
                            },
                     })
                     if (response.status === 200) {
                            const data = response.data.materials;
                            console.log('responsessssssssssssssssss', response)
                            console.log('dataOld', data)
                            setMaterialListOld(data)
                     }
              } catch (error) {
                     console.log(error)
              }
       }


       useEffect(() => {
              fetchMaterialLesson()
       }, [lessonId])

       const handleClickOutside = (event) => {
              dropdownMaterialRefs.current.forEach((ref, index) => {
                     if (ref.current && !ref.current.contains(event.target)) {
                            const newOpenMaterial = [...openMaterial];
                            newOpenMaterial[index] = false;
                            setOpenMaterial(newOpenMaterial);
                     }
              });

              dropdownMaterialTypeRefs.current.forEach((ref, index) => {
                     if (ref.current && !ref.current.contains(event.target)) {
                            const newOpenMaterialType = [...openMaterialType];
                            newOpenMaterialType[index] = false;
                            setOpenMaterialType(newOpenMaterialType);
                     }
              });
       };

       useEffect(() => {
              document.addEventListener('mousedown', handleClickOutside);
              return () => {
                     document.removeEventListener('mousedown', handleClickOutside);
              };
       }, [openMaterial, openMaterialType]);
       const handleGoBack = () => { navigate(-1, { replace: true }) }

       const handleOpenMaterial = (index) => {
              const newOpenMaterial = [...openMaterial];
              newOpenMaterial[index] = !openMaterial[index];
              setOpenMaterial(newOpenMaterial);

              const newOpenMaterialType = [...openMaterialType];
              newOpenMaterialType[index] = false;
              setOpenMaterialType(newOpenMaterialType);
       };

       const handleOpenMaterialType = (index) => {
              const newOpenMaterialType = [...openMaterialType];
              newOpenMaterialType[index] = !openMaterialType[index];
              setOpenMaterialType(newOpenMaterialType);

              const newOpenMaterial = [...openMaterial];
              newOpenMaterial[index] = false;
              setOpenMaterial(newOpenMaterial);
       };

       const handleMaterial = (index, e) => {
              const inputElement = e.currentTarget.querySelector('.inputVal');
              const selectedOptionName = e.currentTarget.textContent.trim();
              const selectedOptionValue = inputElement ? inputElement.value.toLowerCase() : '';

              const newMaterial = [...material];
              const newMaterialName = [...materialName];

              newMaterial[index] = selectedOptionName;
              newMaterialName[index] = parseInt(selectedOptionValue);

              setMaterial(newMaterial);
              setMaterialName(newMaterialName);

              const newOpenMaterial = [...openMaterial];
              newOpenMaterial[index] = false;
              setOpenMaterial(newOpenMaterial);
       };

       const handleMaterialType = (index, e) => {
              const inputElement = e.currentTarget.querySelector('.inputVal');
              const selectedOptionName = e.currentTarget.textContent.trim();
              const selectedOptionValue = inputElement ? inputElement.value.toLowerCase() : '';

              const newMaterialType = [...materialType];
              const newMaterialTypeName = [...materialTypeName];

              newMaterialType[index] = selectedOptionName;
              newMaterialTypeName[index] = selectedOptionValue;

              setMaterialType(newMaterialType);
              setMaterialTypeName(newMaterialTypeName);

              const newOpenMaterialType = [...openMaterialType];
              newOpenMaterialType[index] = false;
              setOpenMaterialType(newOpenMaterialType);
       };

       const handleVideoClick = (index) => {
              if (uploadRefs.current[index]) {
                     uploadRefs.current[index].click();
              }
       };

       const handleVideoChange = (index, e) => {
              const file = e.target.files[0];
              if (file) {
                     const newLessonVideoFile = [...lessonVideoFile];
                     const newLessonVideo = [...lessonVideo];
                     newLessonVideoFile[index] = file;
                     newLessonVideo[index] = file.name;
                     setLessonVideoFile(newLessonVideoFile);
                     setLessonVideo(newLessonVideo);
              }
       };
       const setUploadRef = (el, newIndex) => {
              if (el) uploadRefs.current[newIndex] = el;
       };
       const handleRemoveMaterialEdit = async (id) => {
              setIsLoadingDelete(true)
              try {
                     const response = await axios.delete(`https://bcknd.elmanhag.com/admin/lessonMaterial/delete/${id}`, {
                            headers: {
                                   Authorization: `Bearer ${auth.user.token}`,
                            },
                     });
                     if (response.status === 200) {
                            auth.toastSuccess('Material has Deleted')
                     } else {
                            auth.toastError('Material has Deleted')
                     }
              } catch (error) {
                     console.error('Error removing material:', error.response ? error.response.data : error.message);
              } finally {

                     setIsLoadingDelete(false)
              }
       };
       const handleRemoveMaterial = (index, e) => {
              const ele = e.target.closest('.materialEdit');
              ele.remove();
              console.log('ele', ele)
       }
       const addMaterialElement = () => {
              const newIndex = materialListEdit.length;

              dropdownMaterialRefs.current[newIndex] = React.createRef();
              dropdownMaterialTypeRefs.current[newIndex] = React.createRef();

              // Callback ref to ensure the ref is correctly attached to the input element
              const setUploadRef = (el) => {
                     if (el) uploadRefs.current[newIndex] = el;
              };

              setOpenMaterial((prev) => [...prev, false]);
              setOpenMaterialType((prev) => [...prev, false]);
              setLessonVideoFile((prev) => [...prev, '']);
              setLessonVideo((prev) => [...prev, '']);

              setMaterial((prev) => [...prev, 'Select Material']);
              setMaterialType((prev) => [...prev, 'Select Source']);
              setMaterialName((prev) => [...prev, null]);
              setMaterialTypeName((prev) => [...prev, null]);
              setLessonExternal((prev) => [...prev, '']);
              setLessonEmbedded((prev) => [...prev, '']);

              const ele = (
                     <div key={newIndex} className="w-full flex flex-wrap items-center justify-start gap-3 material">
                            <div className="lg:w-[30%] sm:w-full">
                                   <DropDownMenu
                                          ref={dropdownMaterialRefs.current[newIndex]}
                                          handleOpen={() => handleOpenMaterial(newIndex)}
                                          handleOpenOption={(e) => handleMaterial(newIndex, e)}
                                          stateoption={material[newIndex]}
                                          openMenu={openMaterial[newIndex]}
                                          options={materialData}
                                   />
                            </div>
                            <div className="lg:w-[30%] sm:w-full">
                                   <DropDownMenu
                                          ref={dropdownMaterialTypeRefs.current[newIndex]}
                                          handleOpen={() => handleOpenMaterialType(newIndex)}
                                          handleOpenOption={(e) => handleMaterialType(newIndex, e)}
                                          stateoption={materialType[newIndex]}
                                          openMenu={openMaterialType[newIndex]}
                                          options={materialTypeData}
                                   />
                            </div>
                            {materialTypeName[newIndex] === 'external' && (
                                   <div className="lg:w-[30%] sm:w-full">
                                          <InputCustom
                                                 type="text"
                                                 source="external"
                                                 placeholder="Paste The External Link"
                                                 value={lessonExternal[newIndex]}
                                                 readonly={false}
                                                 onChange={(e) => {
                                                        const newLessonExternal = [...lessonExternal];
                                                        newLessonExternal[newIndex] = e.target.value;
                                                        setLessonExternal(newLessonExternal);
                                                 }}
                                          />
                                   </div>
                            )}
                            {materialTypeName[newIndex] === 'embedded' && (
                                   <div className="lg:w-[30%] sm:w-full">
                                          <InputCustom
                                                 type="text"
                                                 source="embedded"
                                                 placeholder="Paste Whole Of The Iframe Code"
                                                 value={lessonEmbedded[newIndex]}
                                                 readonly={false}
                                                 onChange={(e) => {
                                                        const newLessonEmbedded = [...lessonEmbedded];
                                                        newLessonEmbedded[newIndex] = e.target.value;
                                                        setLessonEmbedded(newLessonEmbedded);
                                                 }}
                                          />
                                   </div>
                            )}
                            {materialTypeName[newIndex] === 'upload' && (
                                   <div className="lg:w-[30%] sm:w-full">
                                          <InputCustom
                                                 type="text"
                                                 source="upload"
                                                 placeholder="Upload Video"
                                                 value={lessonVideo[newIndex]}
                                                 readonly={true}
                                                 onClick={() => handleVideoClick(newIndex)}
                                          />
                                          <input
                                                 ref={setUploadRef}
                                                 type="file"
                                                 className="hidden"
                                                 onChange={(e) => handleVideoChange(newIndex, e)}
                                          />
                                   </div>
                            )}
                            <div className="lg:w-[5%] sm:w-full flex items-center justify-center bg-white py-3 rounded-xl border-mainColor">
                                   <button type="button" onClick={(e) => handleRemoveMaterial(newIndex, e)}>
                                          {isLoadingDelete ? <Loading /> : <DeleteIcon Width='30' Height='30' />}
                                   </button>
                            </div>
                     </div>
              );

              setMaterialListEdit((prevList) => [...prevList, ele]);

       };
       const handleSubmitEdit = async (event) => {
              event.preventDefault();

              setIsLoadingEdit(true);

              const formData = new FormData();
              const allMaterial = document.querySelectorAll('.materialEdit');

              allMaterial.forEach((ele, index) => {
                     const materialName = ele.getElementsByClassName('materialName')[0].getElementsByClassName('eleValueDropDown')[0].innerText.toLowerCase();
                     const materialSource = ele.getElementsByClassName('materialSource')[0].getElementsByClassName('eleValueDropDown')[0].innerText.toLowerCase();
                     let materialData = null;

                     if (materialName === 'select material' || materialName === '') {
                            auth.toastError('Please Enter Material Name.');
                            setIsLoading(false);
                            return;
                     }

                     if (materialSource === 'select source' || materialSource === '') {
                            auth.toastError('Please Enter Material Source.');
                            setIsLoading(false);
                            return;
                     }

                     if (materialSource === 'external' || materialSource === 'embedded') {
                            materialData = ele.getElementsByClassName('materialData')[0].getElementsByClassName('eleValueInput')[0].value;
                            formData.append(`materials[${index}][type]`, materialName);
                            formData.append(`materials[${index}][source]`, materialSource);
                            formData.append(`materials[${index}][material]`, materialData);
                     } else {
                            materialData = ele.getElementsByClassName('materialData')[0].getElementsByClassName('eleValueFile')[0]?.files[0];
                            if (materialData) {
                                   formData.append(`materials[${index}][type]`, materialName);
                                   formData.append(`materials[${index}][source]`, materialSource);
                                   formData.append(`materials[${index}][material]`, materialData); // File data
                            } else {
                                   auth.toastError('Please Enter Material Data.');
                                   setIsLoading(false);
                                   return;
                            }
                     }
              });

              try {
                     const response = await axios.post(`https://bcknd.elmanhag.com/admin/lessonMaterial/add/${lessonId}`, formData, {
                            headers: {
                                   Authorization: `Bearer ${auth.user.token}`,
                                   'Content-Type': 'multipart/form-data',
                            },
                     });

                     if (response.status === 200) {
                            auth.toastSuccess('Material Lesson Edited successfully!');
                            console.log('formData', formData)
                            console.log('response', response)
                            handleGoBack();
                     } else {
                            auth.toastError('Failed to Edit Material Lesson.');
                     }
              } catch (error) {
                     const errorMessages = error?.response?.data?.errors || {};
                     let errorMessageString = 'Error occurred';

                     if (errorMessages) {
                            errorMessageString = Object.values(errorMessages).flat().join(' ');
                     }
                     auth.toastError('Error', errorMessageString);
              } finally {
                     setIsLoadingEdit(false);
              }
       };
       if (!materialListOld) {
              return (
                     <div className="w-1/4 flex items-start mt-[10%] justify-center h-full m-auto">
                            <Loading />
                     </div>
              );
       }
       if (isLoading) {
              return (
                     <div className="w-1/4 flex items-start mt-[10%] justify-center h-full m-auto">
                            <Loading />
                     </div>
              );
       }
       return (
              <>
                     <form onSubmit={handleSubmitEdit} className="w-full flex flex-col items-center justify-center gap-y-3">
                            <div className="w-full mb-10 flex flex-col items-center justify-center gap-10">

                                   <div className="w-full">
                                          <div className="w-full flex flex-col gap-y-3">
                                                 {/* old List  */}
                                                 {materialListOld.map((ele, newIndex) => (
                                                        <div key={newIndex} className="w-full flex flex-wrap items-center justify-start gap-3">
                                                               <div className="lg:w-[30%] sm:w-full">
                                                                      <InputCustom
                                                                             type="text"
                                                                             readonly={true}
                                                                             placeholder="Name En"
                                                                             value={ele.type}
                                                                             onChange={(e) => setLessonNameEn(e.target.value)}
                                                                      />
                                                               </div>
                                                               <div className="lg:w-[30%] sm:w-full">
                                                                      <InputCustom
                                                                             type="text"
                                                                             readonly={true}
                                                                             placeholder="Name En"
                                                                             value={ele.source}
                                                                             onChange={(e) => setLessonNameEn(e.target.value)}
                                                                      />
                                                               </div>
                                                               {ele.source === 'external' && (
                                                                      <div className="lg:w-[30%] sm:w-full">
                                                                             <InputCustom
                                                                                    type="text"
                                                                                    source="external"
                                                                                    placeholder="Paste The External Link"
                                                                                    value={ele.file}
                                                                                    readonly={true}
                                                                             />
                                                                      </div>
                                                               )}
                                                               {ele.source === 'embedded' && (
                                                                      <div className="lg:w-[30%] sm:w-full">
                                                                             <InputCustom
                                                                                    type="text"
                                                                                    source="embedded"
                                                                                    placeholder="Paste Whole Of The Iframe Code"
                                                                                    value={ele.file}
                                                                                    readonly={true}
                                                                             />
                                                                      </div>
                                                               )}
                                                               {ele.source === 'upload' && (
                                                                      <div className="lg:w-[30%] sm:w-full">
                                                                             <video className='w-full rounded-2xl' controls >
                                                                                    <source src={ele.file_link} type="video/mp4" />
                                                                                    <source src={ele.file_link} type="video/webm" />
                                                                                    <source src={ele.file_link} type="video/ogg" />
                                                                                    Your browser does not support the video tag.
                                                                             </video>
                                                                      </div>
                                                               )}
                                                               <div className="lg:w-[5%] sm:w-full flex items-center justify-center bg-white py-3 rounded-xl border-mainColor">
                                                                      <button type="button" onClick={() => handleRemoveMaterialEdit(ele.id)}>
                                                                             <DeleteIcon Width='30' Height='30' />
                                                                      </button>
                                                               </div>
                                                        </div>
                                                 ))}
                                                 {/* //old List  */}

                                                 {materialListEdit.map((ele, newIndex) => (
                                                        <div key={newIndex} className="w-full flex flex-wrap items-center justify-start gap-3 materialEdit">
                                                               <div className="lg:w-[30%] sm:w-full materialName">
                                                                      <DropDownMenu
                                                                             ref={dropdownMaterialRefs.current[newIndex]}
                                                                             handleOpen={() => handleOpenMaterial(newIndex)}
                                                                             handleOpenOption={(e) => handleMaterial(newIndex, e)}
                                                                             stateoption={material[newIndex]}
                                                                             openMenu={openMaterial[newIndex]}
                                                                             options={materialData}
                                                                      />
                                                               </div>
                                                               <div className="lg:w-[30%] sm:w-full materialSource">
                                                                      <DropDownMenu
                                                                             ref={dropdownMaterialTypeRefs.current[newIndex]}
                                                                             handleOpen={() => handleOpenMaterialType(newIndex)}
                                                                             handleOpenOption={(e) => handleMaterialType(newIndex, e)}
                                                                             stateoption={materialType[newIndex]}
                                                                             openMenu={openMaterialType[newIndex]}
                                                                             options={materialTypeData}
                                                                      />
                                                               </div>
                                                               {materialTypeName[newIndex] === 'external' && (
                                                                      <div className="lg:w-[30%] sm:w-full materialData">
                                                                             <InputCustom
                                                                                    type="text"
                                                                                    source="external"
                                                                                    placeholder="Paste The External Link"
                                                                                    value={lessonExternal[newIndex]}
                                                                                    readonly={false}
                                                                                    onChange={(e) => {
                                                                                           const newLessonExternal = [...lessonExternal];
                                                                                           newLessonExternal[newIndex] = e.target.value;
                                                                                           setLessonExternal(newLessonExternal);
                                                                                    }}
                                                                             />
                                                                      </div>
                                                               )}
                                                               {materialTypeName[newIndex] === 'embedded' && (
                                                                      <div className="lg:w-[30%] sm:w-full materialData">
                                                                             <InputCustom
                                                                                    type="text"
                                                                                    source="embedded"
                                                                                    placeholder="Paste Whole Of The Iframe Code"
                                                                                    value={lessonEmbedded[newIndex]}
                                                                                    readonly={false}
                                                                                    onChange={(e) => {
                                                                                           const newLessonEmbedded = [...lessonEmbedded];
                                                                                           newLessonEmbedded[newIndex] = e.target.value;
                                                                                           setLessonEmbedded(newLessonEmbedded);
                                                                                    }}
                                                                             />
                                                                      </div>
                                                               )}
                                                               {materialTypeName[newIndex] === 'upload' && (
                                                                      <div className="lg:w-[30%] sm:w-full materialData">
                                                                             <InputCustom
                                                                                    type="text"
                                                                                    source="upload"
                                                                                    placeholder="Upload Video"
                                                                                    value={lessonVideo[newIndex]}
                                                                                    readonly={true}
                                                                                    onClick={() => handleVideoClick(newIndex)}
                                                                             />
                                                                             <input
                                                                                    ref={(el) => setUploadRef(el, newIndex)}
                                                                                    type="file"
                                                                                    className="hidden eleValueFile"
                                                                                    onChange={(e) => handleVideoChange(newIndex, e)}
                                                                             />
                                                                      </div>
                                                               )}
                                                               <div className="lg:w-[5%] sm:w-full flex items-center justify-center bg-white py-3 rounded-xl border-mainColor">
                                                                      <button type="button" onClick={(e) => handleRemoveMaterial(newIndex, e)}>
                                                                             <DeleteIcon Width='30' Height='30' />
                                                                      </button>
                                                               </div>
                                                        </div>
                                                 ))}
                                          </div>

                                          <div className="w-full mt-3">
                                                 <ButtonAdd
                                                        isWidth="true"
                                                        BgColor="mainColor"
                                                        Color="white"
                                                        handleClick={addMaterialElement}
                                                        iconColor="white"
                                                 />
                                          </div>
                                   </div>
                                   {/* Buttons */}
                            </div>
                     </form>
                     <div className="w-full flex sm:flex-col lg:flex-row items-center justify-start sm:gap-y-5 lg:gap-x-28 sm:my-8 lg:my-0">
                            <div className="flex items-center justify-center w-72">
                                   <Button
                                          type="submit"
                                          Text="Edit"
                                          BgColor="bg-mainColor"
                                          Color="text-white"
                                          Width="full"
                                          Size="text-2xl"
                                          px="px-28"
                                          handleClick={handleSubmitEdit}
                                          rounded="rounded-2xl"
                                          stateLoding={isLoadingEdit}
                                   />
                            </div>
                            <button onClick={handleGoBack} className="text-2xl text-mainColor">Cancel</button>
                     </div>
              </>
       )
}

export default MaterialLessonPage