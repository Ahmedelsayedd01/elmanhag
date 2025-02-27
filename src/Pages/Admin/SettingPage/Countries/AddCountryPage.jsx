import React, { useState } from 'react';
import axios from 'axios';
import InputCustom from '../../../../Components/InputCustom';
import { Button } from '../../../../Components/Button';
import { useAuth } from '../../../../Context/Auth';
import { useNavigate } from 'react-router-dom';
import CheckBox from '../../../../Components/CheckBox';

const AddCountryPage = () => {
    const auth = useAuth();
    const [nameEn, setNameEn] = useState('');
    const [nameAr, setNameAr] = useState('');
    const [countryActive, setCountryActive] = useState(0);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1, { replace: true });
    };

    const handleClick = (e) => {
        const isChecked = e.target.checked;
        setCountryActive(isChecked ? 1 : 0);
    };

    const handleSubmitAdd = async (event) => {
        event.preventDefault();

        if (!nameEn) {
            auth.toastError('Please enter the English name.');
            return;
        }
        if (!nameAr) {
            auth.toastError('Please enter the Arabic name.');
            return;
        }

        setLoading(true);
        try {
            const requestData = {
                name: nameEn,
                ar_name: nameAr,
                status: countryActive,
            };

            console.log('Submitting data:', requestData);

            const response = await axios.post('http://62.84.185.153/plesk-site-preview/bcknd.elmanhag.com/https/62.84.185.153/admin/Settings/countries/add', requestData, {
                headers: {
                    Authorization: `Bearer ${auth.user.token}`,
                },
            });

            if (response.status === 200) {
                console.log('Country added successfully');
                auth.toastSuccess('Country added successfully!');
                handleGoBack();
            } else {
                console.error('Failed to add country:', response.status, response.statusText);
                auth.toastError('Failed to add country.');
            }
        } catch (error) {
            console.error('Error adding country:', error?.response?.data?.errors || 'Network error');

            const errorMessages = error?.response?.data?.errors;
            let errorMessageString = 'Error occurred';

            if (errorMessages) {
                errorMessageString = Object.values(errorMessages).flat().join(' ');
            }

            auth.toastError('Error', errorMessageString);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmitAdd} className='w-full flex flex-col items-start justify-center gap-y-3'>
                <div className="grid md:gap-8 grid-cols-2 lg:w-[70%] sm:w-full">
                    <div className="w-full">
                        <InputCustom
                            type="text"
                            borderColor="secoundColor"
                            placeholder="Name En"
                            value={nameEn}
                            onChange={(e) => setNameEn(e.target.value)}
                            width="w-full"
                        />
                    </div>
                    <div className="w-full">
                        <InputCustom
                            type="text"
                            borderColor="secoundColor"
                            placeholder="Name Ar"
                            value={nameAr}
                            onChange={(e) => setNameAr(e.target.value)}
                            width="w-full"
                        />
                    </div>
                    <div className="flex items-center gap-x-4 lg:w-[30%] sm:w-ful">
                        <span className="text-2xl text-thirdColor font-medium">Active:</span>
                        <div>
                            <CheckBox handleClick={handleClick} checked={countryActive} />
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

export default AddCountryPage;
