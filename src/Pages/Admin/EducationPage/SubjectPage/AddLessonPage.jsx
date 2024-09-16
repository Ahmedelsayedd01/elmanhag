import React, { useEffect, useRef, useState } from 'react';
import InputCustom from '../../../../Components/InputCustom';
import { Button, ButtonAdd } from '../../../../Components/Button';
import CheckBox from '../../../../Components/CheckBox';
import DropDownMenu from '../../../../Components/DropDownMenu';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../Context/Auth';
import axios from 'axios';
import DeleteIcon from '../../../../Components/Icons/AdminIcons/DeleteIcon';

const AddLessonPage = () => {
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

  const [lessonNameEn, setLessonNameEn] = useState('');
  const [lessonNameAr, setLessonNameAr] = useState('');
  const [lessonOrder, setLessonOrder] = useState('');
  const [lessonDescription, setLessonDescription] = useState('');

  const [lessonDripContent, setLessonDripContent] = useState(0);
  const [lessonFree, setLessonFree] = useState(0);
  // const [lessonPaid, setLessonPaid] = useState(0);
  const [lessonActive, setLessonActive] = useState(0);
  const [lessonMaterialsActive, setLessonMaterialsActive] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [materials, setMaterials] = useState([]);
  const [dataArr, setDataArr] = useState(null);

  const location = useLocation();
  const chapterID = location.state || {};

  const navigate = useNavigate();
  const auth = useAuth();

  const handleDripContentClick = (e) => {
    const isChecked = e.target.checked;

    setLessonDripContent(isChecked ? 1 : 0);
  };

  const handleFreeClick = (e) => {
    const isChecked = e.target.checked;
    setLessonFree(isChecked ? 0 : 1);
  };

  // const handlePaidClick = (e) => {
  //   const isChecked = e.target.checked;
  //   setLessonPaid(isChecked ? 1 : 0);
  // };

  const handleActiveClick = (e) => {
    const isChecked = e.target.checked;
    setLessonActive(isChecked ? 1 : 0);
  };
  const handleMaterialsActiveClick = (e) => {
    const isChecked = e.target.checked;
    setLessonMaterialsActive(isChecked ? 1 : 0);
  };

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
  const handleRemoveMaterial = (index, e) => {
    const ele = e.target.closest('.material');
    ele.remove();
    console.log('ele', ele)
  }
  const addMaterialElement = () => {
    const newIndex = materialList.length;

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
            <DeleteIcon Width='30' Height='30' />
          </button>
        </div>
      </div>
    );

    setMaterialList((prevList) => [...prevList, ele]);

  };

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

  const handleGoBack = () => {
    navigate(-1, { replace: true });
  };

  // const handleSubmitAdd = async (event) => {
  //   event.preventDefault()

  //   setIsLoading(true);


  //   if (lessonNameEn == '') {
  //     auth.toastError('Please Enter NameEn.');
  //     setIsLoading(false)
  //     return;
  //   }
  //   if (lessonNameAr == '') {
  //     auth.toastError('Please Enter NameAr.');
  //     setIsLoading(false)
  //     return;
  //   }
  //   if (lessonOrder == '') {
  //     auth.toastError('Please Enter Order.');
  //     setIsLoading(false)
  //     return;
  //   }
  //   if (lessonDescription == '') {
  //     auth.toastError('Please Enter Description.');
  //     setIsLoading(false)
  //     return;
  //   }

  //   const myMaterials = [];
  //   const allMaterial = document.querySelectorAll('.material');

  //   allMaterial.forEach((ele) => {
  //     const materialName = ele.getElementsByClassName('materialName')[0].getElementsByClassName('eleValueDropDown')[0].innerText.toLowerCase();
  //     const materialSource = ele.getElementsByClassName('materialSource')[0].getElementsByClassName('eleValueDropDown')[0].innerText.toLowerCase();
  //     let materialData = null;
  //     console.log('materialSource', materialSource)

  //     if (materialName == 'select material' || materialName == '') {
  //       auth.toastError('Please Enter Material Name.');
  //       setIsLoading(false)
  //       return;
  //     }


  //     if (materialSource == 'select source' || materialSource == '') {
  //       auth.toastError('Please Enter Material Source.');
  //       setIsLoading(false)
  //       return;
  //     }

  //     if (materialSource == "external" || materialSource == "embedded") {
  //       materialData = ele.getElementsByClassName('materialData')[0].getElementsByClassName('eleValueInput')[0].value;
  //     } else {
  //       materialData = ele.getElementsByClassName('materialData')[0].getElementsByClassName('eleValueFile')[0].files[0];
  //     }

  //     if (materialData == '') {
  //       auth.toastError('Please Enter Material Data.');
  //       setIsLoading(false)
  //       return;
  //     }

  //     const object = {
  //       type: materialName,
  //       source: materialSource,
  //       material: materialData,
  //     }
  //     myMaterials.push(object)
  //     console.log('materialName', materialName)
  //     console.log('materialSource', materialSource)
  //     console.log('materialData', materialData)
  //     console.log('object', object)
  //   }
  //   );
  //   setMaterials(myMaterials)
  //   console.log('materials', materials)

  //   if (!materials) {
  //     auth.toastError('Please Enter Materials.');
  //     setIsLoading(false)
  //     return;
  //   }

  //   console.log('myMaterials', myMaterials)
  //   console.log('materials', materials)
  //   console.log('dataArr', dataArr)

  //   setDataArr(
  //     {
  //       name: lessonNameEn,
  //       ar_name: lessonNameAr,
  //       description: lessonDescription,
  //       materials: materials,
  //       paid: lessonFree,
  //       status: lessonActive,
  //       order: lessonOrder,
  //       drip_content: lessonDripContent,
  //     }
  //   )
  //   console.log('materialssss', materials)
  //   if (materials == []) {
  //     return;
  //   } else {
  //     try {
  //       const response = await axios.post(`https://bdev.elmanhag.shop/admin/lesson/add/${chapterID}`, dataArr, {
  //         headers: {
  //           Authorization: `Bearer ${auth.user.token}`,
  //           // 'Content-Type': 'multipart/form-data',
  //         },
  //       });
  //       if (response.status === 200) {
  //         auth.toastSuccess('Lesson added successfully!');
  //         handleGoBack();
  //       } else {
  //         auth.toastError('Failed to add Lesson.');

  //       }
  //     } catch (error) {
  //       const errorMessages = error?.response;
  //       let errorMessageString = 'Error occurred';
  //       console.log('errorMessages', errorMessages)

  //       if (errorMessages) {
  //         errorMessageString = Object.values(errorMessages).flat().join(' ');
  //       }
  //       auth.toastError('Error', errorMessageString)
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }
  //   // console.log('myMaterials', myMaterials)
  // }

  const handleSubmitAdd = async (event) => {
    event.preventDefault();

    setIsLoading(true);

    // Validate form data
    if (!lessonNameEn) {
      auth.toastError('Please Enter NameEn.');
      setIsLoading(false);
      return;
    }
    if (!lessonNameAr) {
      auth.toastError('Please Enter NameAr.');
      setIsLoading(false);
      return;
    }
    if (!lessonOrder) {
      auth.toastError('Please Enter Order.');
      setIsLoading(false);
      return;
    }
    if (!lessonDescription) {
      auth.toastError('Please Enter Description.');
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    const allMaterial = document.querySelectorAll('.material');

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

    // Append other fields to the FormData
    formData.append('name', lessonNameEn);
    formData.append('ar_name', lessonNameAr);
    formData.append('description', lessonDescription);
    formData.append('paid', lessonFree);
    formData.append('status', lessonActive);
    formData.append('switch', lessonMaterialsActive);
    formData.append('order', lessonOrder);
    formData.append('drip_content', lessonDripContent);

    try {
      const response = await axios.post(`https://bdev.elmanhag.shop/admin/lesson/add/${chapterID}`, formData, {
        headers: {
          Authorization: `Bearer ${auth.user.token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        auth.toastSuccess('Lesson added successfully!');
        console.log('formData', formData)
        console.log('response', response)
        handleGoBack();
      } else {
        auth.toastError('Failed to add Lesson.');
      }
    } catch (error) {
      const errorMessages = error?.response?.data?.errors || {};
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
    console.log('Updated dataArr:', dataArr);
  }, [dataArr]);

  return (
    <>
      <form onSubmit={handleSubmitAdd} className="w-full flex flex-col items-center justify-center gap-y-3">
        <div className="w-full mb-10 flex flex-col items-center justify-center gap-10">

          <div className="w-full flex flex-wrap items-center justify-start gap-3">
            <div className="lg:w-[30%] sm:w-full">
              <InputCustom
                type="text"
                placeholder="Name En"
                value={lessonNameEn}
                onChange={(e) => setLessonNameEn(e.target.value)}
              />
            </div>
            <div className="lg:w-[30%] sm:w-full">
              <InputCustom
                type="text"
                placeholder="Name Ar"
                value={lessonNameAr}
                onChange={(e) => setLessonNameAr(e.target.value)}
              />
            </div>
            <div className="lg:w-[30%] sm:w-full">
              <InputCustom
                type="number"
                placeholder="Lesson Order"
                value={lessonOrder}
                onChange={(e) => setLessonOrder(e.target.value)}
              />
            </div>
            <div className="lg:w-[30%] sm:w-full">
              <InputCustom
                type="text"
                placeholder="Lesson Description"
                value={lessonDescription}
                onChange={(e) => setLessonDescription(e.target.value)}
              />
            </div>
          </div>

          <div className="w-full">
            <div className="w-full flex flex-col gap-y-3 materialList">
              {materialList.map((ele, newIndex) => (
                <div key={newIndex} className="w-full flex flex-wrap items-center justify-start gap-3 material">
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

          <div className="w-full">
            <div className="w-full flex flex-wrap items-center justify-between gap-x-4 gap-y-8">
              <div className="flex items-center gap-x-4">
                <span className="text-2xl text-thirdColor font-medium">Drip Content:</span>
                <div>
                  <CheckBox
                    handleClick={handleDripContentClick}
                  />
                </div>
              </div>
              <div className="flex items-center gap-x-4">
                <span className="text-2xl text-thirdColor font-medium">Free:</span>
                <div>
                  <CheckBox
                    handleClick={handleFreeClick}
                  />
                </div>
              </div>
              <div className="flex items-center gap-x-4">
                <span className="text-2xl text-thirdColor font-medium">Active:</span>
                <div>
                  <CheckBox
                    handleClick={handleActiveClick}
                  />
                </div>
              </div>
              <div className="flex items-center gap-x-4">
                <span className="text-2xl text-thirdColor font-medium">Materials Active:</span>
                <div>
                  <CheckBox
                    handleClick={handleMaterialsActiveClick}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Buttons */}
          <div className="w-full  flex sm:flex-col lg:flex-row items-center justify-start sm:gap-y-5 lg:gap-x-28 sm:my-8 lg:my-0">
            <div className="flex items-center justify-center w-72">
              <Button
                type="submit"
                Text="Done"
                BgColor="bg-mainColor"
                Color="text-white"
                Width="full"
                Size="text-2xl"
                px="px-28"
                handleClick={handleSubmitAdd}
                rounded="rounded-2xl"
                stateLoding={isLoading}
              />
            </div>
            <button onClick={handleGoBack} className="text-2xl text-mainColor">Cancel</button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddLessonPage;
