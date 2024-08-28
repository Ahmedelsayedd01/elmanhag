import React, { useRef, useState ,useEffect} from 'react';
import InputCustom from '../../../../Components/InputCustom';
import { Button } from '../../../../Components/Button';
import { useAuth } from '../../../../Context/Auth';
import DropDownMenu from '../../../../Components/DropDownMenu';
import MultipleChoiceMenu from '../../../../Components/MultipleChoiceMenu';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CheckBox from '../../../../Components/CheckBox';

const AddBundlesPage = () => {
  const auth = useAuth();
  const [nameEn, setNameEn] = useState('');
  const [nameAr, setNameAr] = useState('');

  const [selectCategory, setSelectCategory] = useState('Select Category');
  const [selectCategoryId, setSelectCategoryId] = useState(null);
  const [openSelectCategory, setOpenSelectCategory] = useState(false);

  const [thumbnail, setThumbnail] = useState('');
  const [thumbnailFile, setThumbnailFile] = useState(null);

  const [selectSemester, setSelectSemester] = useState('Select Semester');
  const [selectSemesterId, setSelectSemesterId] = useState(null);
  const [openSelectSemester, setOpenSelectSemester] = useState(false);

  const [selectEducation, setSelectEducation] = useState('Select Education');
  const [selectEducationId, setSelectEducationId] = useState(null);
  const [openSelectEducation, setOpenSelectEducation] = useState(false);

  const [coverPhoto, setCoverPhoto] = useState('');
  const [coverPhotoFile, setCoverPhotoFile] = useState(null);

  const [selectSubject, setSelectSubject] = useState([]);
  const [openSelectSubject, setOpenSelectSubject] = useState(false);

  const [url, setUrl] = useState('');
  const [price, setPrice] = useState('');

  const [demoVideo, setDemoVideo] = useState('');
  const [demoVideoFile, setDemoVideoFile] = useState(null);
  
  const [description, setDescription] = useState('');
  const [expiredDate, setExpiredDate] = useState('');
  const [bundleTags, setBundleTags] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [bundleActive, setBundleActive] = useState(0);

  const navigate = useNavigate();
  // const [adminData, setAdminData] = useState([]);
  // const [selectSubjectId, setSelectSubjectId] = useState();

  const dropdownCategoryRef = useRef();
  const dropdownSemesterRef = useRef();
  const dropdownSubjectRef = useRef();
  const dropdownEducationRef=useRef();

  const uploadThumbnailRef = useRef();
  const uploadCoverPhotoRef = useRef();
  const uploadDemoVideoRef = useRef();

  const handleOpenSelectCategory = () => {
    setOpenSelectCategory(!openSelectCategory);
    setOpenSelectSemester(false);
    setOpenSelectSubject(false);
  };

  const handleOpenSelectSemester = () => {
    setOpenSelectSemester(!openSelectSemester);
    setOpenSelectCategory(false);
    setOpenSelectSubject(false);
  };

  const handleOpenSelectSubject = () => {
    setOpenSelectSubject(!openSelectSubject);
    setOpenSelectCategory(false);
    setOpenSelectSemester(false);
    setOpenSelectEducation(false)
  };

  const handleOpenSelectEducation = () => {
    setOpenSelectEducation(!openSelectEducation);
    setOpenSelectCategory(false);
    setOpenSelectSemester(false);
    setOpenSelectSubject(false);
  };

  const handleSelectCategory = (e) => {
    const inputElement = e.currentTarget.querySelector('.inputVal');
    const selectedOptionName = e.currentTarget.textContent.trim();
    const selectedOptionValue = inputElement ? parseInt(inputElement.value) : null;
    setSelectCategory(selectedOptionName);
    setSelectCategoryId(selectedOptionValue);
    setOpenSelectCategory(false);
    console.log('Selected Category:', selectedOptionName);
    console.log('Category ID:', selectedOptionValue);
  };

  const handleSelectSemester = (e) => {
    const inputElement = e.currentTarget.querySelector('.inputVal');
    const selectedOptionName = e.currentTarget.textContent.trim();
    const selectedOptionValue = inputElement ? parseInt(inputElement.value) : null;
    setSelectSemester(selectedOptionName);
    setSelectSemesterId(selectedOptionValue);
    setOpenSelectSemester(false);
    console.log('Selected Semester:', selectedOptionName);
    console.log('Semester ID:', selectedOptionValue);
  };

  const handleSelectEducation = (e) => {
    const inputElement = e.currentTarget.querySelector('.inputVal');
    const selectedOptionName = e.currentTarget.textContent.trim();
    const selectedOptionValue = inputElement ? parseInt(inputElement.value) : '';
    setSelectEducation(selectedOptionName);
    setSelectEducationId(selectedOptionValue);
    setOpenSelectEducation(false);
    console.log('Selected Education:', selectedOptionName);
    console.log('Education ID:', selectedOptionValue);
  };

  const handleSelectSubject = (subjectName) => {
    if (!selectSubject.includes(subjectName)) {
      setSelectSubject([...selectSubject, subjectName]);
    }
  };

  const handleRemoveSubject = (subjectName) => {
    setSelectSubject(selectSubject.filter(subject => subject !== subjectName));
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
            document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
      if (dropdownCategoryRef.current && !dropdownCategoryRef.current.contains(event.target) &&
          dropdownSemesterRef.current && !dropdownSemesterRef.current.contains(event.target)&&
          dropdownSubjectRef.current &&  !dropdownSubjectRef.current.contains(event.target)&&
          dropdownEducationRef.current &&  !dropdownEducationRef.current.contains(event.target)
      ) {
          setOpenSelectCategory(false);
          setOpenSelectSemester(false);
          setOpenSelectSubject(false);
          setOpenSelectEducation(false);
      }
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

  const handleClick = (e) => {
    const isChecked = e.target.checked;
    setBundleActive(isChecked ? 1 : 0);
  };

  const handleGoBack = () => {
    navigate(-1, { replace: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nameEn) {
      auth.toastError('Please Enter NameEn.');
      return;
    }
    if (!nameAr) {
      auth.toastError('Please Enter NameAr.');
      return;
    }
    if (!price) {
      auth.toastError('Please Enter Price.');
      return;
    }
    if (selectCategoryId) {
      auth.toastError('Please Select category.');
      return;
    }
    if (selectSemesterId) {
      auth.toastError('Please Select Semester.');
      return;
    }
    if (!coverPhotoFile) {
      auth.toastError('Please Enter Cover Photo.');
      return;
    }
    if (!description) {
      auth.toastError('Please Enter Description.');
      return;
    }
    if (!educationId) {
      auth.toastError('Please Select Education.');
      return;
    }
    if (!bundleTags) {
      auth.toastError('Please Enter Tags.');
      return;
    }
    if (!url) {
      auth.toastError('Please Enter Url.');
      return;
    }
    if (!demoVideoFile) {
      auth.toastError('Please Enter Video.');
      return;
    }
    if (!expiredDate) {
      auth.toastError('Please Enterexpired Date.');
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append('name', nameEn);
    formData.append('ar_name', nameAr);
    formData.append('price', price);
    formData.append('category_id', selectCategoryId);
    formData.append('semester_id', selectSemesterId);
    formData.append('subjects', JSON.stringify(selectSubject));
    formData.append('thumbnail', thumbnailFile);
    formData.append('cover_photo', coverPhotoFile);
    formData.append('demo_video', demoVideoFile);
    formData.append('url', url);
    formData.append('description', description);
    formData.append('expiredDate', expiredDate);
    formData.append('tags', bundleTags);
    bundleTags

    try {
      await axios.post('https://bdev.elmanhag.shop/admin/bundle/add', formData, {
        headers: {
          Authorization: `Bearer ${auth.user.token}`,
          'Content-Type': 'multipart/form-data',
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
          <InputCustom
            type="text"
            placeholder="Name Ar"
            value={nameAr}
            onChange={(e) => setNameAr(e.target.value)}
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
          <DropDownMenu
            ref={dropdownCategoryRef}
            handleOpen={handleOpenSelectCategory}
            handleOpenOption={handleSelectCategory}
            stateoption={selectCategory}
            openMenu={openSelectCategory}
            options={CategoryData}
          />
        </div>
        <div className="lg:w-[30%] sm:w-full">
          <DropDownMenu
            ref={dropdownSemesterRef}
            handleOpen={handleOpenSelectSemester}
            handleOpenOption={handleSelectSemester}
            stateoption={selectSemester}
            openMenu={openSelectSemester}
            options={SemesterData}
          />
        </div>
        <div className="lg:w-[30%] sm:w-full">
          <DropDownMenu
            ref={dropdownEducationRef}
            handleOpen={handleOpenSelectEducation}
            handleOpenOption={handleSelectEducation}
            stateoption={selectEducation}
            openMenu={openSelectEducation}
            options={EducationData}
          />
        </div>
        <div className="lg:w-[30%] sm:w-full">
          <MultipleChoiceMenu
            ref={dropdownSubjectRef}
            handleOpen={handleOpenSelectSubject}
            selectedOptions={selectSubject}
            openMenu={openSelectSubject}
            handleSelectOption={handleSelectSubject}
            handleRemoveOption={handleRemoveSubject}
            options={SubjectData}
            name="Subjects"
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
            placeholder="Demo Video"
            value={demoVideo}
            readOnly
            onClick={() => handleInputClick(uploadDemoVideoRef)}
          />
          <input
            type="file"
            // accept="video/mp4,video/x-m4v,video/*"
            className="hidden"
            onChange={handleDemoVideoChange}
            ref={uploadDemoVideoRef}
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
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="lg:w-[30%] sm:w-full">
          <InputCustom
                  type="text"
                  placeholder="Tags"
                  value={bundleTags}
                  onChange={(e) => setBundleTags(e.target.value)}
          />
        </div>
        <div className="lg:w-[30%] sm:w-full">
          <InputCustom
            type="date"
            placeholder="Expired Date"
            value={expiredDate}
            onChange={(e) => setExpiredDate(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-x-4 lg:w-[30%] sm:w-full">
            <span className="text-2xl text-thirdColor font-medium">Active:</span>
            <div>
              <CheckBox handleClick={handleClick} />
            </div>
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








