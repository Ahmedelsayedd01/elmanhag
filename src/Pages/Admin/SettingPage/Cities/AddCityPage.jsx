import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import InputCustom from '../../../../Components/InputCustom';
import { Button } from '../../../../Components/Button';
import { useAuth } from '../../../../Context/Auth';
import DropDownMenu from '../../../../Components/DropDownMenu';
// import Loading from '../../../../Components/Loading';
import { useNavigate } from 'react-router-dom'
import CheckBox from '../../../../Components/CheckBox';



const AddCityPage = () => {
    const auth = useAuth();
    const [adminData, setAdminData] = useState([]);
    const [AddCountry, setCountry] = useState('Choose Country');
    const [countryId, setCountryId] = useState('');
    const [countries, setCountries] = useState([]);
    const [openCountry, setOpenCountry] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    // Form state
    const [nameEn, setNameEn] = useState('');
    const [nameAr, setNameAr] = useState('');
    // const [status, setStatus] = useState('');
    const [cityActive, setCityActive] = useState(0);


    const dropdownCountryRef = useRef();

    // Fetch admin data and countries from localStorage
    useEffect(() => {
        const storedAdminData = JSON.parse(localStorage.getItem('Countries'));
        if (storedAdminData) {
            setAdminData(storedAdminData);
            setCountries(storedAdminData || []);
        }
    }, []);

    const handleGoBack = () => {
      navigate(-1, { replace: true });
    };

    // Handle opening and closing of dropdown menu
    const handleOpenCountry = () => setOpenCountry(!openCountry);

    // Handle country selection
    const handleCountry = (e) => {
        const inputElement = e.currentTarget.querySelector('.inputVal');
        const selectedOptionName = e.currentTarget.textContent.trim();
        const selectedOptionValue = inputElement ? parseInt(inputElement.value) : '';

        setCountry(selectedOptionName);
        setCountryId(selectedOptionValue);
        setOpenCountry(false);

        console.log('Selected Country:', selectedOptionName);
        console.log('Country ID:', selectedOptionValue);
    };

    const handleClick = (e) => {
        const isChecked = e.target.checked;
        setCityActive(isChecked ? 1 : 0);
    };

    // Handle form submission
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
        // if (!status) {
        //     auth.toastError('Please enter the status.');
        //     return;
        // }
        if (!countryId) {
            auth.toastError('Please choose a country.');
            return;
        }

        setLoading(true);
        try {
            const requestData = {
                name: nameEn,
                ar_name: nameAr,
                status:cityActive,
                country_id: countryId,
            };

            console.log('Submitting data:', requestData);

            const response = await axios.post('https://bdev.elmanhag.shop/admin/Settings/cities/add', requestData, {
                headers: {
                    Authorization: `Bearer ${auth.user.token}`,
                },
            });

            if (response.status === 200) {
                console.log('City added successfully');
                auth.toastSuccess('City added successfully!');
                handleGoBack()
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
                    {/* <div className="w-full">
                        <InputCustom
                            type="text"
                            borderColor="secoundColor"
                            placeholder="Status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            width="w-full"
                        />
                    </div> */}
                    <div className="w-full">
                        <DropDownMenu
                            ref={dropdownCountryRef}
                            handleOpen={handleOpenCountry}
                            handleOpenOption={handleCountry}
                            stateoption={AddCountry}
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

export default AddCityPage;
