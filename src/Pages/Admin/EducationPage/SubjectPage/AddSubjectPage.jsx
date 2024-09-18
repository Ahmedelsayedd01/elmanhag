import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputCustom from '../../../../Components/InputCustom';
import DropDownMenu from '../../../../Components/DropDownMenu';
import { Button } from '../../../../Components/Button';
import axios from 'axios';
import { useAuth } from '../../../../Context/Auth';
import CheckBox from '../../../../Components/CheckBox';

const AddSubjectPage = () => {
  const dropdownCategory = useRef();
  const dropdownEducation = useRef();
  const dropdownSemester = useRef();
  const uploadVideoRef = useRef();
  const uploadThumbnailRef = useRef();
  const uploadCoverRef = useRef();
  const navigate = useNavigate();
  const auth = useAuth();

  const [categoryData, setCategoryData] = useState([]);
  const [educationData, setEducationData] = useState([]);
  const [semesterData, setSemesterData] = useState([{ name: 'First' }, { name: 'Second' }]);

  const [subjectNameEn, setSubjectNameEn] = useState('');

  const [subjectNameAr, setSubjectNameAr] = useState('');

  const [subjectPrice, setSubjectPrice] = useState('');

  const [subjectDescription, setSubjectDescription] = useState('');


  const [subjectTags, setSubjectTags] = useState('');

  const [subjectUrl, setSubjectUrl] = useState('');

  const [subjectVaildDate, setSubjectVaildDate] = useState('');

  const [SubjectActive, setSubjectActive] = useState(0);

  const [subjectVideoFile, setSubjectVideoFile] = useState();
  const [subjectVideo, setSubjectVideo] = useState('');

  const [subjectThumbnailFile, setSubjectThumbnailFile] = useState();
  const [subjectThumbnail, setSubjectThumbnail] = useState('');

  const [subjectCoverFile, setSubjectCoverFile] = useState();
  const [subjectCover, setSubjectCover] = useState('');

  const [semester, setSemester] = useState('Select Semester');
  const [semesterName, setSemesterName] = useState('');
  const [openSemester, setOpenSemester] = useState(false);

  const [education, setEducation] = useState('Select Education');
  const [educationId, setEducationId] = useState();
  const [openEducation, setOpenEducation] = useState(false);


  const [category, setCategory] = useState('Select Category');
  const [categoryId, setCategoryId] = useState();
  const [openCategory, setOpenCategory] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://bdev.elmanhag.shop/admin/category', {
          headers: {
            Authorization: `Bearer ${auth.user.token}`,
          },
        });
        if (response.status === 200) {
          setCategoryData(response.data.categories);
          console.log('response:', response);
        }
      } catch (error) {
        console.error('Error fetching Categories data:', error);
      }
    };

    const fetchSubjects = async () => {
      try {
        const response = await axios.get('https://bdev.elmanhag.shop/admin/subject', {
          headers: {
            Authorization: `Bearer ${auth.user.token}`,
          },
        });
        if (response.status === 200) {
          setEducationData([...response.data.education, { id: 'null', name: 'Together' }]);
          console.log('responsesup:', response);
        }
      } catch (error) {
        console.error('Error fetching Subjects data:', error);
      }
    };
    fetchCategories()
    fetchSubjects()

  }, []);

  const handleOpenEducation = () => {
    setOpenEducation(!openEducation);
    setOpenSemester(false);
    setOpenCategory(false);
  };
  const handleOpenSemester = () => {
    setOpenSemester(!openSemester);
    setOpenEducation(false);
    setOpenCategory(false);
  };

  const handleOpenCategory = () => {
    setOpenCategory(!openCategory);
    setOpenEducation(false);
    setOpenSemester(false);
  };

  const handleClick = (e) => {
    const isChecked = e.target.checked;
    setSubjectActive(isChecked ? 1 : 0);
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
    setEducation(selectedOptionName);

    // console.log('educationId', educationId)

    setOpenEducation(false);
    console.log('selectedOptionName', selectedOptionName)
    console.log('selectedOptionValue', selectedOptionValue)
  };
  useEffect(() => {
    console.log('Updated educationId:', educationId);
  }, [educationId]);

  const handleSemester = (e) => {
    const inputElement = e.currentTarget.querySelector('.inputVal');
    const selectedOptionName = e.currentTarget.textContent.trim();
    const selectedOptionValue = inputElement ? inputElement.value.toLowerCase() : '';
    setSemester(selectedOptionName);
    setSemesterName(selectedOptionValue);
    setOpenSemester(false);
  };

  const handleCategory = (e) => {
    const inputElement = e.currentTarget.querySelector('.inputVal');
    const selectedOptionName = e.currentTarget.textContent.trim();
    const selectedOptionValue = inputElement ? inputElement.value : '';
    setCategory(selectedOptionName);
    setCategoryId(parseInt(selectedOptionValue));
    setOpenCategory(false);
  };

  const handleGoBack = () => {
    navigate(-1, { replace: true });
  };

  const handleSubmitAdd = async (event) => {
    event.preventDefault();

    if (!subjectNameEn) {
      auth.toastError('Please Enter NameEn.');
      return;
    }
    if (!subjectNameAr) {
      auth.toastError('Please Enter NameAr.');
      return;
    }
    if (!categoryId) {
      auth.toastError('Please Select category.');
      return;
    }
    if (!subjectVaildDate) {
      auth.toastError('Please Enter VaildDate.');
      return;
    }
    if (!subjectPrice) {
      auth.toastError('Please Enter Price.');
      return;
    }
    if (!subjectDescription) {
      auth.toastError('Please Enter Description.');
      return;
    }
    if (!educationId && !education) {
      auth.toastError('Please Select Education.');
      return;
    }
    if (!semesterName) {
      auth.toastError('Please Select Semester.');
      return;
    }
    if (!subjectTags) {
      auth.toastError('Please Enter Tags.');
      return;
    }
    if (!subjectUrl) {
      auth.toastError('Please Enter Url.');
      return;
    }
    if (!subjectVideo) {
      auth.toastError('Please Enter Video.');
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', subjectNameEn);
      formData.append('ar_name', subjectNameAr);
      formData.append('price', subjectPrice);
      formData.append('category_id', categoryId);
      formData.append('description', subjectDescription);
      formData.append('education_id', educationId);
      formData.append('semester', semesterName);
      formData.append('url', subjectUrl);
      formData.append('expired_date', subjectVaildDate);
      formData.append('tags', subjectTags);
      formData.append('demo_video', subjectVideoFile);
      formData.append('thumbnail', subjectThumbnailFile);
      formData.append('cover_photo', subjectCoverFile);
      formData.append('status', SubjectActive);

      const response = await axios.post('https://bdev.elmanhag.shop/admin/subject/add', formData, {
        headers: {
          Authorization: `Bearer ${auth.user.token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        console.log('formData', formData)
        console.log('responsessss', response)
        auth.toastSuccess('Subject added successfully!');
        handleGoBack();
      } else {
        auth.toastError('Failed to add Subject.');
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

  const handleClickOutside = (event) => {
    if (dropdownCategory.current && !dropdownCategory.current.contains(event.target) &&
      dropdownSemester.current && !dropdownSemester.current.contains(event.target) &&
      dropdownEducation.current && !dropdownEducation.current.contains(event.target)) {
      setOpenCategory(false);
      setOpenSemester(false);
      setOpenEducation(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleVideoClick = () => {
    if (uploadVideoRef.current) {
      uploadVideoRef.current.click(); // Trigger a click on the hidden file input
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSubjectVideoFile(file); // Set file object for upload
      setSubjectVideo(file.name); // Display file name in the text input
    }
  };
  const handleThumbnailClick = () => {
    if (uploadThumbnailRef.current) {
      uploadThumbnailRef.current.click(); // Trigger a click on the hidden file input
    }
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSubjectThumbnailFile(file); // Set file object for upload
      setSubjectThumbnail(file.name); // Display file name in the text input
    }
  };
  const handleCoverClick = () => {
    if (uploadCoverRef.current) {
      uploadCoverRef.current.click(); // Trigger a click on the hidden file input
    }
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSubjectCoverFile(file); // Set file object for upload
      setSubjectCover(file.name); // Display file name in the text input
    }
  };
  return (
    <>
      <form onSubmit={handleSubmitAdd} className="w-full flex flex-col items-center justify-center gap-y-3">
        <div className="w-full flex flex-wrap items-center justify-start gap-3">

          <div className="lg:w-[30%] sm:w-full">
            <InputCustom
              type="text"
              placeholder="Name En"
              value={subjectNameEn}
              onChange={(e) => setSubjectNameEn(e.target.value)}
            />
          </div>

          <div className="lg:w-[30%] sm:w-full">
            <InputCustom
              type="text"
              placeholder="Name Ar"
              value={subjectNameAr}
              onChange={(e) => setSubjectNameAr(e.target.value)}
            />
          </div>

          <div className="lg:w-[30%] sm:w-full">
            <DropDownMenu
              ref={dropdownEducation}
              handleOpen={handleOpenEducation}
              handleOpenOption={handleEducation}
              stateoption={education}
              openMenu={openEducation}
              options={educationData}
            />
          </div>

          <div className="lg:w-[30%] sm:w-full">
            <DropDownMenu
              ref={dropdownSemester}
              handleOpen={handleOpenSemester}
              handleOpenOption={handleSemester}
              stateoption={semester}
              openMenu={openSemester}
              options={semesterData}
            />
          </div>

          <div className="lg:w-[30%] sm:w-full">
            <DropDownMenu
              ref={dropdownCategory}
              handleOpen={handleOpenCategory}
              handleOpenOption={handleCategory}
              stateoption={category}
              openMenu={openCategory}
              options={categoryData}
            />
          </div>

          <div className="lg:w-[30%] sm:w-full">
            <InputCustom
              type="text"
              placeholder="Price"
              value={subjectPrice}
              onChange={(e) => setSubjectPrice(e.target.value)}
            />
          </div>
          <div className="lg:w-[30%] sm:w-full">
            <InputCustom
              type="date"
              placeholder="Vaild Date"
              value={subjectVaildDate}
              onChange={(e) => setSubjectVaildDate(e.target.value)}
            />
          </div>

          <div className="lg:w-[30%] sm:w-full">
            <InputCustom
              type="text"
              upload={true}
              placeholder="Demo Video"
              value={subjectVideo}
              readonly={true}
              onClick={handleVideoClick}
            />
            <input
              type="file"
              className="hidden"
              onChange={handleVideoChange}
              ref={uploadVideoRef}
            />
          </div>

          <div className="lg:w-[30%] sm:w-full">
            <InputCustom
              type="text"
              placeholder="Discription"
              value={subjectDescription}
              onChange={(e) => setSubjectDescription(e.target.value)}
            />
          </div>

          <div className="lg:w-[30%] sm:w-full">
            <InputCustom
              type="text"
              placeholder="Tags"
              value={subjectTags}
              onChange={(e) => setSubjectTags(e.target.value)}
            />
          </div>


          <div className="lg:w-[30%] sm:w-full">
            <InputCustom
              type="text"
              placeholder="URL"
              value={subjectUrl}
              onChange={(e) => setSubjectUrl(e.target.value)}
            />
          </div>



          <div className="lg:w-[30%] sm:w-full">
            <InputCustom
              type="text"
              upload={true}
              placeholder="Thumbnail Photo"
              value={subjectThumbnail}
              readonly={true}
              onClick={handleThumbnailClick}
            />
            <input
              type="file"
              className="hidden"
              onChange={handleThumbnailChange}
              ref={uploadThumbnailRef}
            />
          </div>
          <div className="lg:w-[30%] sm:w-full">
            <InputCustom
              type="text"
              upload={true}
              placeholder="Cover Photo"
              value={subjectCover}
              readonly={true}
              onClick={handleCoverClick}
            />
            <input
              type="file"
              className="hidden"
              onChange={handleCoverChange}
              ref={uploadCoverRef}
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
    </>
  );
}

export default AddSubjectPage