import React, { useEffect, useRef, useState, useContext } from 'react';
import axios from 'axios';
import InputCustom from '../../../../Components/InputCustom';
import { Button } from '../../../../Components/Button';
import { useAuth } from '../../../../Context/Auth';
import DropDownMenu from '../../../../Components/DropDownMenu';
import { useNavigate, useParams } from 'react-router-dom';
import { cityEditContext } from '../../../../Layouts/Admin/EditCityLayout';
import CheckBox from '../../../../Components/CheckBox';

const EditCityPage = () => {
    const cityData = useContext(cityEditContext);
    const auth = useAuth();
    const [cityContent, setCityContent] = useState();
    const { cityId } = useParams(); // Extract cityId from URL params
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Form state
    const [nameEn, setNameEn] = useState('');
    const [nameAr, setNameAr] = useState('');
    const [cityActive, setCityActive] = useState(0);
    const [countryId, setCountryId] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('Choose Country');
    const [openCountry, setOpenCountry] = useState(false);

    const dropdownCountryRef = useRef();

    useEffect(() => {
        // Set the initial values based on cityData
        if (cityData) {
            setCityContent(cityData);
            setNameEn(cityData?.name || '');
            setNameAr(cityData?.ar_name || '');
            setCityActive(cityData?.status || 0);  // Assuming `status` indicates active status
            setCountryId(cityData?.country_id || '');
            setSelectedCountry(cityData?.country?.name || 'Choose Country');
        }
    }, [cityData]);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const countriesResponse = await axios.get('https://bdev.elmanhag.shop/admin/Settings/countries', {
                    headers: {
                        Authorization: `Bearer ${auth.user.token}`,
                    },
                });

                if (countriesResponse.status === 200) {
                    setCountries(countriesResponse.data.countries || []);
                }
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };

        fetchCountries();
    }, [auth.user.token]);

    // Handle opening and closing of dropdown menu
    const handleOpenCountry = () => setOpenCountry(!openCountry);

    // Handle country selection
    const handleCountry = (e) => {
        const inputElement = e.currentTarget.querySelector('.inputVal');
        const selectedOptionName = e.currentTarget.textContent.trim();
        const selectedOptionValue = inputElement ? parseInt(inputElement.value) : '';

        setSelectedCountry(selectedOptionName);
        setCountryId(selectedOptionValue);
        setOpenCountry(false);
    };

    const handleClick = (e) => {
        const isChecked = e.target.checked;
        setCityActive(isChecked ? 1 : 0);
    };

    // Handle form submission
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
        if (!countryId) {
            auth.toastError('Please select a country.');
            return;
        }

        setLoading(true);
        try {
            const requestData = {
                name: nameEn,
                ar_name: nameAr,
                status: cityActive,
                country_id: countryId,
            };

            const response = await axios.put(`https://bdev.elmanhag.shop/admin/Settings/cities/update/${cityContent.id}`, requestData, {
                headers: {
                    Authorization: `Bearer ${auth.user.token}`,
                },
            });

            if (response.status === 200) {
                auth.toastSuccess('City updated successfully!');
                handleGoBack();
            } else {
                auth.toastError('Failed to update city.');
            }
        } catch (error) {
            console.error('Error updating city:', error?.response?.data?.errors || 'Network error');
            auth.toastError('Error updating city.');
        } finally {
            setLoading(false);
        }
    };

    // Handle back navigation
    const handleGoBack = () => {
        navigate(-1, { replace: true });
    };

    // Close dropdown when clicking outside
    const handleClickOutside = (event) => {
        if (dropdownCountryRef.current && !dropdownCountryRef.current.contains(event.target)) {
            setOpenCountry(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <>
            <form onSubmit={handleSubmitEdit} className="w-full flex flex-col items-start justify-center gap-y-3">
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
                    <div className="w-full">
                        <DropDownMenu
                            ref={dropdownCountryRef}
                            handleOpen={handleOpenCountry}
                            handleOpenOption={handleCountry}
                            stateoption={selectedCountry}
                            openMenu={openCountry}
                            options={countries}
                        />
                    </div>
                    <div className="flex items-center gap-x-4 lg:w-[30%] sm:w-ful">
                        <span className="text-2xl text-thirdColor font-medium">Active:</span>
                        <CheckBox handleClick={handleClick} checked={cityActive} />
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

export default EditCityPage;
