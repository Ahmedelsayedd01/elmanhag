import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputCustom from '../../../../Components/InputCustom';
import DropDownMenu from '../../../../Components/DropDownMenu';
import MultipleChoiceMenu from '../../../../Components/MultipleChoiceMenu';
import { Button } from '../../../../Components/Button';
import CheckBox from '../../../../Components/CheckBox';
import { BundleDataContext } from '../../../../Layouts/Admin/EditBundlesLayout'; // Adjust import as necessary

const EditBundlesPage = () => {
    const bundleData = useContext(BundleDataContext);
    const navigate = useNavigate();

    const dropdownSemesterRef = useRef();
    const uploadCoverPhotoRef = useRef();
    const uploadDemoVideoRef = useRef();

    const [coverPhoto, setCoverPhoto] = useState('');
    const [url, setUrl] = useState('');
    const [price, setPrice] = useState('');
    const [demoVideo, setDemoVideo] = useState('');
    const [description, setDescription] = useState('');
    const [selectSemester, setSelectSemester] = useState('Select Semester');
    const [openSelectSemester, setOpenSelectSemester] = useState(false);
    const [selectSubject, setSelectSubject] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (bundleData) {
            setCoverPhoto(bundleData.coverPhoto || '');
            setUrl(bundleData.url || '');
            setPrice(bundleData.price || '');
            setDemoVideo(bundleData.demoVideo || '');
            setDescription(bundleData.description || '');
            setSelectSemester(bundleData.semester || 'Select Semester');
            setSelectSubject(bundleData.subjects || []);
        }
    }, [bundleData]);

    const handleOpenSelectSemester = () => {
        setOpenSelectSemester(!openSelectSemester);
    };

    const handleSelectSemester = (e) => {
        setSelectSemester(e.currentTarget.textContent.trim());
        setOpenSelectSemester(false);
    };

    const handleGoBack = () => {
        navigate(-1, { replace: true });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append('coverPhoto', coverPhoto);
            formData.append('url', url);
            formData.append('price', price);
            formData.append('demoVideo', demoVideo);
            formData.append('description', description);
            formData.append('semester', selectSemester);
            formData.append('subjects', JSON.stringify(selectSubject));

            const response = await axios.put(`https://bdev.elmanhag.shop/admin/bundles/update/${bundleData.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.status === 200) {
                auth.toastSuccess('Bundle updated successfully!');
                handleGoBack();
            } else {
                auth.toastError('Failed to update Bundle.');
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

    const handleInputClick = (ref) => {
        if (ref.current) {
            ref.current.click();
        }
    };

    const handleFileChange = (e, setter, setName) => {
        const file = e.target.files[0];
        if (file) {
            setter(file.name);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="w-full flex flex-col items-center justify-center gap-y-3">
                <div className="w-full flex flex-wrap items-center justify-start gap-3">
                    <div className="lg:w-[30%] sm:w-full">
                        <InputCustom
                            type="text"
                            placeholder="Enter Cover Photo"
                            value={coverPhoto}
                            onClick={() => handleInputClick(uploadCoverPhotoRef)}
                            readonly={true}
                        />
                        <input
                            type="file"
                            className="hidden"
                            onChange={(e) => handleFileChange(e, setCoverPhoto)}
                            ref={uploadCoverPhotoRef}
                        />
                    </div>
                    <div className="lg:w-[30%] sm:w-full">
                        <InputCustom
                            type="text"
                            placeholder="Enter URL"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                        />
                    </div>
                    <div className="lg:w-[30%] sm:w-full">
                        <InputCustom
                            type="text"
                            placeholder="Enter Price"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                    <div className="lg:w-[30%] sm:w-full">
                        <InputCustom
                            type="text"
                            placeholder="Enter Demo Video"
                            value={demoVideo}
                            onClick={() => handleInputClick(uploadDemoVideoRef)}
                            readonly={true}
                        />
                        <input
                            type="file"
                            className="hidden"
                            onChange={(e) => handleFileChange(e, setDemoVideo)}
                            ref={uploadDemoVideoRef}
                        />
                    </div>
                    <div className="lg:w-[30%] sm:w-full">
                        <InputCustom
                            type="text"
                            placeholder="Enter Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    <div className="lg:w-[30%] sm:w-full">
                        <DropDownMenu
                            ref={dropdownSemesterRef}
                            handleOpen={handleOpenSelectSemester}
                            handleOpenOption={handleSelectSemester}
                            stateoption={selectSemester}
                            openMenu={openSelectSemester}
                            options={['Semester 1', 'Semester 2', 'Semester 3']} // Adjust options as necessary
                        />
                    </div>
                    <div className="lg:w-[30%] sm:w-full">
                        <MultipleChoiceMenu
                            options={['Subject 1', 'Subject 2', 'Subject 3']} // Adjust options as necessary
                            selectedOptions={selectSubject}
                            onChange={(selected) => setSelectSubject(selected)}
                        />
                    </div>
                </div>
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
};

export default EditBundlesPage;


