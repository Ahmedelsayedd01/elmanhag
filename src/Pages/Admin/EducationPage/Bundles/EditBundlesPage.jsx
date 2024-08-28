import React, { useRef, useState ,useEffect ,useContext} from 'react';
import InputCustom from '../../../../Components/InputCustom';
import { Button } from '../../../../Components/Button';
import { useAuth } from '../../../../Context/Auth';
import DropDownMenu from '../../../../Components/DropDownMenu';
import MultipleChoiceMenu from '../../../../Components/MultipleChoiceMenu';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BundleDataContext } from '../../../../Layouts/Admin/EditBundlesLayout';

const EditBundlesPage = () => {
    const bundleEdit = useContext(BundleDataContext);

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
    const [expiredDate, setExpiredDate] = useState('');
    const [bundleTags, setBundleTags] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

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
    const dropdownSubjectRef = useRef();

    useEffect(() => {
        if (bundleEdit) {
            setNameEn(bundleEdit.name || '');
            setSelectCategory(bundleEdit.selectCategory?.name || 'Select Category');
            setThumbnail(bundleEdit.thumbnail || '');
            setNameAr(bundleEdit.nameAr || '');
            // setSelectSemester(bundleEdit.semester || 'Select Semester');
            setCoverPhoto(bundleEdit.coverPhoto || '');
            setUrl(bundleEdit.url || '');
            setPrice(bundleEdit.price || '');
            setDemoVideo(bundleEdit.demoVideo || '');
            setDescription(bundleEdit.description || '');
            setSelectSubject(bundleEdit.subjects || []);
        }
    }, [bundleEdit]);

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
            dropdownSubjectRef.current &&  !dropdownSubjectRef.current.contains(event.target)
        ) {
            setOpenSelectCategory(false);
            setOpenSelectSemester(false);
            setOpenSelectSubject(false);
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
    
      const handleGoBack = () => {
        navigate(-1, { replace: true });
      };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Submit logic here
  };

  return (
    <form className="w-full flex flex-col items-center justify-center gap-y-3" onSubmit={handleFormSubmit}>
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
                options={[{ id: 1, name: 'Category 1' }, { id: 2, name: 'Category 2' }]}
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
            <MultipleChoiceMenu
                ref={dropdownSubjectRef}
                handleOpen={handleOpenSelectSubject}
                selectedOptions={selectSubject}
                openMenu={openSelectSubject}
                handleSelectOption={handleSelectSubject}
                handleRemoveOption={handleRemoveSubject}
                options={options}
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
                accept="video/mp4,video/x-m4v,video/*"
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

export default EditBundlesPage;


