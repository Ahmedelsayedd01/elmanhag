import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import InputCustom from '../../../../Components/InputCustom';
import { Button } from '../../../../Components/Button';
import CheckBox from '../../../../Components/CheckBox';
import { useAuth } from '../../../../Context/Auth';
import { useNavigate } from 'react-router-dom';
import { countryEditContext } from '../../../../Layouts/Admin/EditCountryLayout';

const EditCountryPage = () => {
    const auth = useAuth();
    const countryData = useContext(countryEditContext);
    const [nameEn, setNameEn] = useState('');
    const [nameAr, setNameAr] = useState('');
    const [countryActive, setCountryActive] = useState(0);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (countryData) {
            setNameEn(countryData.name || '');
            setNameAr(countryData.ar_name || '');
            setCountryActive(countryData.status || 0);
        }
    }, [countryData]);

    const handleGoBack = () => {
        navigate(-1, { replace: true });
    };

    const handleClick = (e) => {
        const isChecked = e.target.checked;
        setCountryActive(isChecked ? 1 : 0);
    };

    const handleSubmitEdit = async (event) => {
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

            const response = await axios.put(`http://62.84.185.153/plesk-site-preview/bcknd.elmanhag.com/https/62.84.185.153/admin/Settings/countries/update/${countryData.id}`, requestData, {
                headers: {
                    Authorization: `Bearer ${auth.user.token}`,
                },
            });

            if (response.status === 200) {
                auth.toastSuccess('Country updated successfully!');
                handleGoBack();
            } else {
                auth.toastError('Failed to update country.');
            }
        } catch (error) {
            console.error('Error updating country:', error?.response?.data?.errors || 'Network error');
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
            <form onSubmit={handleSubmitEdit} className='w-full flex flex-col items-start justify-center gap-y-3'>
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

export default EditCountryPage;







