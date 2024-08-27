import React, { useRef, useState ,useEffect} from 'react';
import InputCustom from '../../../../Components/InputCustom';
import { Button } from '../../../../Components/Button';
import { useAuth } from '../../../../Context/Auth';
import DropDownMenu from '../../../../Components/DropDownMenu';
import MultipleChoiceMenu from '../../../../Components/MultipleChoiceMenu';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddBundlesPage = () => {
  const auth = useAuth();
  const [nameEn, setNameEn] = useState('');
  const [selectCategory, setSelectCategory] = useState('Select Category');
  const [selectCategoryId, setSelectCategoryId] = useState(null);
  const [openSelectCategory, setOpenSelectCategory] = useState(false);
  const [thumbnail, setThumbnail] = useState('');
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [nameAr, setNameAr] = useState('');
  const [selectSemester, setSelectSemester] = useState('Select Semester');
  const [selectSemesterId, setSelectSemesterId] = useState(null);
  const [openSelectSemester, setOpenSelectSemester] = useState(false);
  const [coverPhoto, setCoverPhoto] = useState('');
  const [coverPhotoFile, setCoverPhotoFile] = useState(null);
  const [url, setUrl] = useState('');
  const [price, setPrice] = useState('');
  const [demoVideo, setDemoVideo] = useState('');
  const [demoVideoFile, setDemoVideoFile] = useState(null);
  const [selectSubject, setSelectSubject] = useState([]);
  const [openSelectSubject, setOpenSelectSubject] = useState(false);
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  // const [adminData, setAdminData] = useState([]);
  // const [selectSubjectId, setSelectSubjectId] = useState();
  
  const options = [
    { id: 1, name: 'Option 1' },
    { id: 2, name: 'Option 2' },
    { id: 3, name: 'Option 3' },
  ];

  const dropdownCategoryRef = useRef();
  const dropdownSemesterRef = useRef();
  const uploadThumbnailRef = useRef();
  const uploadCoverPhotoRef = useRef();
  const uploadDemoVideoRef = useRef();
  // const dropdownSubjectRef = useRef();

  const handleOpenSelectCategory = () => {
    setOpenSelectCategory(!openSelectCategory);
  };

  const handleOpenSelectSemester = () => {
    setOpenSelectSemester(!openSelectSemester);
  };

  const handleOpenSelectSubject = () => {
    setOpenSelectSubject(!openSelectSubject);
  };

  const handleSelectCategory = (e) => {
    const inputElement = e.currentTarget.querySelector('.inputVal');
    const selectedOptionName = e.currentTarget.textContent.trim();
    const selectedOptionValue = inputElement ? parseInt(inputElement.value) : null;
    setSelectCategory(selectedOptionName);
    setSelectCategoryId(selectedOptionValue);
    setOpenSelectCategory(false);
  };

  const handleSelectSemester = (e) => {
    const inputElement = e.currentTarget.querySelector('.inputVal');
    const selectedOptionName = e.currentTarget.textContent.trim();
    const selectedOptionValue = inputElement ? parseInt(inputElement.value) : null;
    setSelectSemester(selectedOptionName);
    setSelectSemesterId(selectedOptionValue);
    setOpenSelectSemester(false);
  };

     //   // Handle Subject selection
    // const handleSelectSubject = (e) => {
    //   const inputElement = e.currentTarget.querySelector('.inputVal');
    //   const selectedOptionName = e.currentTarget.textContent.trim();
    //   const selectedOptionValue = inputElement ? parseInt(inputElement.value) : '';
    //   setSelectSubject(selectedOptionName);
    //   setSelectSubjectId(selectedOptionValue);
    //   setOpenSelectSubject(false);
    //   console.log('Selected Subject:', selectedOptionName);
    //   console.log('Subject ID:', selectedOptionValue);
    // };

  const handleSelectSubject = (subjectName) => {
    if (!selectSubject.includes(subjectName)) {
      setSelectSubject([...selectSubject, subjectName]);
    }
  };

  const handleRemoveSubject = (subjectName) => {
    setSelectSubject(selectSubject.filter(subject => subject !== subjectName));
  };


  const handleInputClick = (ref) => {
    if (ref.current) {
      ref.current.click();
    }
  };

  const handleThumbnailFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnailFile(file);
      setThumbnail(file.name);
    }
  };

  const handleCoverPhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverPhotoFile(file);
      setCoverPhoto(file.name);
    }
  };

  const handleDemoVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setDemoVideoFile(file);
      setDemoVideo(file.name);
    }
  };

  const handleGoBack = () => {
    navigate(-1, { replace: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append('name', nameEn);
    formData.append('name_ar', nameAr);
    formData.append('category_id', selectCategoryId);
    formData.append('semester_id', selectSemesterId);
    formData.append('url', url);
    formData.append('price', price);
    formData.append('description', description);
    formData.append('thumbnail', thumbnailFile);
    formData.append('cover_photo', coverPhotoFile);
    formData.append('demo_video', demoVideoFile);
    formData.append('subjects', JSON.stringify(selectSubject));

    try {
      await axios.post('https://bdev.elmanhag.shop/admin/bundle/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${auth.token}`, // Include token if authentication is required
        },
      });
      if (response.status === 200) {
        auth.toastSuccess('Bundles added successfully!');
        handleGoBack();
      } else {
              auth.toastError('Failed to add Bundle.');
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

  return (
    <form className="w-full flex flex-col items-center justify-center gap-y-3" onSubmit={handleSubmit}>
      <div className="w-full flex flex-wrap items-center justify-start gap-3">
        <div className="lg:w-[30%] sm:w-full">
          <InputCustom
            type="text"
            placeholder="Name En"
            value={nameEn}
            onChange={(e) => setNameEn(e.target.value)}
          />
        </div>
        <div className="lg:w-[30%] sm:w-full">
          <DropDownMenu
            ref={dropdownCategoryRef}
            handleOpen={handleOpenSelectCategory}
            handleOpenOption={handleSelectCategory}
            stateoption={selectCategory}
            openMenu={openSelectCategory}
            options={[{ id: 1, name: 'Category 1' }, { id: 2, name: 'Category 2' }]}
          />
        </div>
        <div className="lg:w-[30%] sm:w-full">
          <InputCustom
            type="text"
            placeholder="Thumbnail Photo"
            value={thumbnail}
            readOnly
            onClick={() => handleInputClick(uploadThumbnailRef)}
          />
          <input
            type="file"
            className="hidden"
            onChange={handleThumbnailFileChange}
            ref={uploadThumbnailRef}
          />
        </div>
        <div className="lg:w-[30%] sm:w-full">
          <InputCustom
            type="text"
            placeholder="Name Ar"
            value={nameAr}
            onChange={(e) => setNameAr(e.target.value)}
          />
        </div>
        <div className="lg:w-[30%] sm:w-full">
          <DropDownMenu
            ref={dropdownSemesterRef}
            handleOpen={handleOpenSelectSemester}
            handleOpenOption={handleSelectSemester}
            stateoption={selectSemester}
            openMenu={openSelectSemester}
            options={[{ id: 1, name: 'Semester 1' }, { id: 2, name: 'Semester 2' }]}
          />
        </div>
        <div className="lg:w-[30%] sm:w-full">
          <InputCustom
            type="text"
            placeholder="Cover Photo"
            value={coverPhoto}
            readOnly
            onClick={() => handleInputClick(uploadCoverPhotoRef)}
          />
          <input
            type="file"
            className="hidden"
            onChange={handleCoverPhotoChange}
            ref={uploadCoverPhotoRef}
          />
        </div>
        <div className="lg:w-[30%] sm:w-full">
          <InputCustom
            type="text"
            placeholder="URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        <div className="lg:w-[30%] sm:w-full">
          <InputCustom
            type="text"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="lg:w-[30%] sm:w-full">
          <InputCustom
            type="text"
            placeholder="Demo Video"
            value={demoVideo}
            readOnly
            onClick={() => handleInputClick(uploadDemoVideoRef)}
          />
          <input
            type="file"
            accept="video/mp4,video/x-m4v,video/*"
            className="hidden"
            onChange={handleDemoVideoChange}
            ref={uploadDemoVideoRef}
          />
        </div>
        <div className="lg:w-[30%] sm:w-full">
          <MultipleChoiceMenu
            handleOpen={handleOpenSelectSubject}
            selectedOptions={selectSubject}
            openMenu={openSelectSubject}
            handleSelectOption={handleSelectSubject}
            handleRemoveOption={handleRemoveSubject}
            options={options}
          />
        </div>
        <div className="lg:w-[30%] sm:w-full">
          <InputCustom
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>
      {/* Buttons */}
      <div className="w-full flex sm:flex-col lg:flex-row items-center justify-start sm:gap-y-5 lg:gap-x-28 sm:my-8 lg:my-0">
                          <div className="flex items-center justify-center w-72">
                                <Button
                                        type="submit"
                                        Text="Done"
                                        BgColor="bg-mainColor"
                                        Color="text-white"
                                        Width="full"
                                        Size="text-2xl"
                                        px="px-28"
                                        rounded="rounded-2xl"
                                        stateLoding={isLoading}
                                />
                          </div>
                          <button onClick={handleGoBack} className="text-2xl text-mainColor">Cancel</button>
        </div>
    </form>
  );
};

export default AddBundlesPage;








