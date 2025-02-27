import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import InputCustom from '../../../../Components/InputCustom';
import { Button } from '../../../../Components/Button';
import { useAuth } from '../../../../Context/Auth';
import { useNavigate } from 'react-router-dom';
import CheckBox from '../../../../Components/CheckBox';

const AddPaymentMethodPage = () => {
    const auth = useAuth();
    const [thumbnails, setThumbnails] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const uploadRef = useRef();
    const [thumbnailFile, setThumbnailFile] = useState(null); // Store the file object
    const [paymentActive, setPaymentActive] = useState(0); // Default status to 0
    const [paymentData, setPaymentData] = useState([]);


    const handleClick = (e) => {
        const isChecked = e.target.checked; // Checked status
        setPaymentActive(isChecked ? 1 : 0); // Set paymentActive as 1 (true) or 0 (false)
    };

    const handleInputClick = () => {
        if (uploadRef.current) {
            uploadRef.current.click(); // Trigger a click on the hidden file input
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setThumbnailFile(file); // Set file object for upload
            setThumbnails(file.name); // Display file name in the text input
        }
    };

    // useEffect(() => {
    //     const paymentData = JSON.parse(localStorage.getItem('PaymentMethods'));
    //     setPaymentData(paymentData);
    //     }, []);

    const handleGoBack = () => {
        navigate(-1, { replace: true });
    };

    const handleSubmitAdd = async (event) => {
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

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('thumbnail', thumbnailFile); // Append the file
            formData.append('status', paymentActive); // Append the status (1 or 0)

            console.log('Submitting data:', {
                title,
                description,
                thumbnail_link: thumbnails,
                status: paymentActive,
            });

            const response = await axios.post(
                'http://62.84.185.153/plesk-site-preview/bcknd.elmanhag.com/https/62.84.185.153/admin/Settings/paymentMethods/add',
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${auth.user.token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            if (response.status === 200) {
                console.log('Payment Method added successfully');
                auth.toastSuccess('Payment Method added successfully!');
                handleGoBack();
            } else {
                console.error('Failed to add Payment Method:', response.status, response.statusText);
                auth.toastError('Failed to add Payment Method.');
            }
        } catch (error) {
            console.error('Error adding Payment Method:', error?.response?.data?.errors || 'Network error');
            const errorMessages = error?.response?.data?.errors;
            let errorMessageString = 'Error occurred';

            if (errorMessages) {
                errorMessageString = Object.values(errorMessages).flat().join(' ');
            }

            auth.toastError(errorMessageString);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmitAdd} className="w-full flex flex-col items-start justify-center gap-y-3">
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
                            readOnly={true}
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
                            <CheckBox handleClick={handleClick} checked={paymentActive} />
                        </div>
                    </div>
                </div>
                <div className="flex gap-4 mt-6">
                    <Button
                        stateLoading={loading}
                        Width="64"
                        Text="Done"
                        handleClick={handleSubmitAdd}
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

export default AddPaymentMethodPage;
