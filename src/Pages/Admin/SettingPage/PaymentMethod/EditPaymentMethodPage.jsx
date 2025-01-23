import React, { useState, useEffect, useContext, useRef } from 'react';
import axios from 'axios';
import InputCustom from '../../../../Components/InputCustom';
import { Button } from '../../../../Components/Button';
import { useAuth } from '../../../../Context/Auth';
import { useNavigate } from 'react-router-dom';
import { paymentMethodEditContext } from '../../../../Layouts/Admin/EditPaymentMethodLayout';
import CheckBox from '../../../../Components/CheckBox';

const EditPaymentMethodPage = () => {
    const paymentMethodData = useContext(paymentMethodEditContext);
    const [paymentContent, setPaymentContent] = useState(paymentMethodData || {});

    const auth = useAuth();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [thumbnails, setThumbnails] = useState('');
    const [loading, setLoading] = useState(false);
    const [thumbnailFile, setThumbnailFile] = useState(null);
    const [paymentActive, setPaymentActive] = useState(0); // Default status to 0
    const navigate = useNavigate();
    const uploadRef = useRef();

    useEffect(() => {
        if (paymentMethodData) {
            setPaymentContent(paymentMethodData);
            setTitle(paymentMethodData?.title || '');
            setDescription(paymentMethodData?.description || '');
            setThumbnails(paymentMethodData?.thumbnail_link || '');
            setPaymentActive(paymentMethodData?.status || 0); // Use nullish coalescing to ensure 0 status is respected
        }
    }, [paymentMethodData]);

    const handleClick = (e) => {
        const isChecked = e.target.checked;
        setPaymentActive(isChecked ? 1 : 0);
    };

    const handleInputClick = () => {
        if (uploadRef.current) {
            uploadRef.current.click();
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setThumbnailFile(file);
            setThumbnails(file.name);

        }
    };

    const handleGoBack = () => {
        navigate(-1, { replace: true });
    };

    const handleSubmitEdit = async (event) => {
        event.preventDefault();

        if (!thumbnails) {
            auth.toastError('Please upload the Thumbnail.');
            return;
        }
        if (!title) {
            auth.toastError('Please enter the Title.');
            return;
        }
        if (!description) {
            auth.toastError('Please enter the Description.');
            return;
        }

        console.log('Title:', title);
        console.log('Description:', description);
        console.log('Thumbnail:', thumbnails);
        console.log(' thumbnailFile', thumbnailFile);
        console.log('Status:', paymentActive);

        setLoading(true);
        try {
            // const queryParams = new URLSearchParams({
            //     title: title,
            //     description: description,
            //     thumbnail_link: thumbnailFile,
            //     status: paymentActive
            // }).toString();

            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('thumbnail_link', thumbnailFile);
            formData.append('status', paymentActive);

            const response = await axios.post(
                `http://62.84.185.153/plesk-site-preview/bcknd.elmanhag.com/https/62.84.185.153/admin/Settings/paymentMethods/update/${paymentContent.id}`,
                formData, // Empty body since we are using query params
                {
                    headers: {
                        Authorization: `Bearer ${auth.user.token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            if (response.status === 200) {
                auth.toastSuccess('Payment Method updated successfully!');
                handleGoBack();
                console.log('formData', formData)
            } else {
                auth.toastError('Failed to update Payment Method.');
            }
        } catch (error) {
            console.error('Error updating Payment Method:', error?.response?.data?.errors || 'Network error');
            auth.toastError('Error updating Payment Method.');
        } finally {
            setLoading(false);
        }
    };
    console.log('thumbnailFile', thumbnailFile)
    console.log('thumbnail', thumbnails)

    return (
        <>
            <form onSubmit={handleSubmitEdit} className="w-full flex flex-col items-start justify-center gap-y-3">
                <div className="grid md:gap-8 grid-cols-2 lg:w-[70%] sm:w-full">
                    <div className="w-full">
                        <InputCustom
                            type="text"
                            borderColor="secoundColor"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            width="w-full"
                        />
                    </div>
                    <div className="w-full">
                        <InputCustom
                            type="text"
                            borderColor="secoundColor"
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            width="w-full"
                        />
                    </div>
                    <div className="w-full">
                        <InputCustom
                            type="text"
                            placeholder="Thumbnail"
                            value={thumbnails}
                            readonly={true}
                            onClick={handleInputClick}
                        />
                        <input
                            type="file"
                            className="hidden"
                            onChange={handleFileChange}
                            ref={uploadRef}
                        />
                    </div>
                    <div className="flex items-center gap-x-4 lg:w-[30%] sm:w-full">
                        <span className="text-2xl text-thirdColor font-medium">Active:</span>
                        <div>
                            {/* <CheckBox handleClick={handleClick} checked={paymentActive === 1} /> */}
                            <CheckBox handleClick={handleClick} checked={paymentActive} />
                        </div>
                    </div>
                </div>
                <div className="flex gap-4 mt-6">
                    <Button
                        stateLoading={loading}
                        Width="64"
                        Text="Done"
                        handleClick={handleSubmitEdit}
                    />
                    <Button
                        stateLoading={false}
                        Width="64"
                        Text="Cancel"
                        Color="text-mainColor"
                        BgColor="bg-thirdBgColor"
                        handleClick={handleGoBack}
                    />
                </div>
            </form>
        </>
    );
};

export default EditPaymentMethodPage;



