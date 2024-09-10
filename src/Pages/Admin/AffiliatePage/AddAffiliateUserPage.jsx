import React, { useEffect, useRef, useState } from 'react'
import InputCustom from '../../../Components/InputCustom';
import DropDownMenu from '../../../Components/DropDownMenu';
import CheckBox from '../../../Components/CheckBox';
import { useAuth } from '../../../Context/Auth';
import { Button } from '../../../Components/Button'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddAffiliateUserPage = () => {
       const dropdownCountryAffiliateRef = useRef();
       const dropdownCityAffiliateRef = useRef();

       const [affiliateName, setAffiliateName] = useState('')
       const [affiliateNumber, setAffiliateNumber] = useState('')
       const [affiliateEmail, setAffiliateEmail] = useState('')
       const [affiliatePassword, setAffiliatePassword] = useState('')
       const [affiliateCountry, setAffiliateCountry] = useState('Choose Country')
       const [countryId, setCountryId] = useState('')
       const [countries, setCountries] = useState([])
       const [openCountry, setOpenCountry] = useState(false);
       const [affiliateCityState, setAffiliateCityState] = useState('City')
       const [cityId, setCityId] = useState('')
       const [cities, setCities] = useState([])
       const [openCity, setOpenCity] = useState(false);
       const [affiliateActive, setAffiliateActive] = useState(0);

       const [isLoading, setIsLoading] = useState(false);
       const navigate = useNavigate();
       const auth = useAuth();

       useEffect(() => {
              const fetchCities = async () => {
                     try {
                            const response = await axios.get('https://bdev.elmanhag.shop/admin/Settings/cities', {
                                   headers: {
                                          Authorization: `Bearer ${auth.user.token}`
                                   }
                            });
                            if (response.status === 200) {
                                   console.log('Cities Data:', response.data.cities);
                                   setCities(response.data.cities || []);
                            }
                     } catch (error) {
                            console.error('Error fetching cities:', error);
                     }
              };
              const fetchCountries = async () => {
                     try {
                            const response = await axios.get('https://bdev.elmanhag.shop/admin/Settings/countries', {
                                   headers: {
                                          Authorization: `Bearer ${auth.user.token}`
                                   }
                            });
                            if (response.status === 200) {
                                   console.log('countries Data:', response.data.countries);
                                   setCountries(response.data.countries || []);
                            }
                     } catch (error) {
                            console.error('Error fetching countries:', error);
                     }
              };
              fetchCities();
              fetchCountries()
       }, [])

       const handleOpenCountryAffiliate = () => {
              setOpenCountry(!openCountry);
              setOpenCity(false);
       }
       const handleOpenCityAffiliate = () => {
              setOpenCountry(false);
              setOpenCity(!openCity);
       }

       const handleCountryAffiliate = (e) => {
              const inputElement = e.currentTarget.querySelector('.inputVal');
              const selectedOptionName = e.currentTarget.textContent.trim();
              const selectedOptionValue = inputElement ? parseInt(inputElement.value) : '';
              const city = cities.filter((city) => city.country_id === selectedOptionValue)
              setAffiliateCountry(selectedOptionName);
              setCountryId(selectedOptionValue)
              setOpenCountry(false);
              setAffiliateCityState(cities.length > 0 ? 'City' : "No cities available")
              setCities(city)

              console.log('Selected NameL:', selectedOptionName);
              console.log('Selected ValueL:', selectedOptionValue);
       }
       const handleCityAffiliate = (e) => {
              const inputElement = e.currentTarget.querySelector('.inputVal');
              const selectedOptionName = e.currentTarget.textContent.trim();
              const selectedOptionValue = inputElement ? inputElement.value : '';
              setAffiliateCityState(selectedOptionName);
              setCityId(parseInt(selectedOptionValue))
              setOpenCity(false);
              console.log('Selected NameL:', selectedOptionName);
              console.log('Selected ValueL:', selectedOptionValue);
       }
       const handleClick = (e) => {
              const isChecked = e.target.checked;
              setAffiliateActive(isChecked ? 1 : 0);
       };

       const handleClickOutside = (event) => {
              if (
                     (dropdownCountryAffiliateRef.current && !dropdownCountryAffiliateRef.current.contains(event.target)) &&
                     (dropdownCityAffiliateRef.current && !dropdownCityAffiliateRef.current.contains(event.target))
              ) {
                     setOpenCountry(false);
                     setOpenCity(false);
              }
       };
       useEffect(() => {
              document.addEventListener('mousedown', handleClickOutside);
              return () => {
                     document.removeEventListener('mousedown', handleClickOutside);
              };
       }, []);
       const handleGoBack = () => {
              navigate(-1, { replace: true });
       };
       const handleSubmitAdd = async (event) => {
              event.preventDefault();
              if (!affiliateName) {
                     auth.toastError('Please Enter Affiliate Name.');
                     return;
              }
              if (!affiliateEmail) {
                     auth.toastError('Please Enter Affiliate Email.');
                     return;
              }
              if (!affiliatePassword) {
                     auth.toastError('Please Enter Affiliate Passwoard.');
                     return;
              }
              if (!affiliateNumber) {
                     auth.toastError('Please Enter Affiliate Phone.');
                     return;
              }
              if (!countryId) {
                     auth.toastError('Please Choose Country.');
                     return;
              }
              if (!cityId) {
                     auth.toastError('Please Choose City.');
                     return;
              }

              setIsLoading(true)
              try {
                     const requestData = {
                            name: affiliateName,
                            phone: affiliateNumber,
                            country_id: countryId,
                            city_id: cityId,
                            email: affiliateEmail,
                            password: affiliatePassword,
                            status: affiliateActive,
                     };

                     console.log('Submitting data:', requestData);

                     const response = await axios.post('https://bdev.elmanhag.shop/admin/affilate/add', requestData, {
                            headers: {
                                   Authorization: `Bearer ${auth.user.token}`,
                            },
                     });

                     if (response.status === 200) {
                            // setIsLoading(false)
                            console.log('Affiliate added successfully');
                            handleGoBack();
                            setIsLoading(false)
                            auth.toastSuccess('Affiliate added successfully!');
                            console.log('Submitting success data:', requestData);

                     } else {
                            setIsLoading(false)
                            console.log('Submitting Error data:', requestData);
                            console.error('Failed to add Affiliate:', response.status, response.statusText);
                            auth.toastError('Failed to add Affiliate.');
                     }
              } catch (error) {
                     setIsLoading(false);

                     // Log the full error for better debugging
                     console.log('Full error object:', error);

                     // Extract error messages if available
                     const errorMessages = error?.response?.data?.errors;
                     let theError = errorMessages ? Object.values(errorMessages)[0][0] : 'Network error';

                     // Log what theError is set to
                     console.log('Extracted error message:', theError);

                     // Show the error in a toast notification
                     auth.toastError(theError);
              }



       };
       return (
              <>
                     <form onSubmit={handleSubmitAdd} className='w-full flex flex-col items-center justify-center gap-y-3'>
                            <div className="w-full flex flex-wrap items-center justify-start gap-3">
                                   <div className="lg:w-[30%] sm:w-full">
                                          <InputCustom type={"text"} placeholder={"Affiliate Name"} value={affiliateName} onChange={(e => setAffiliateName(e.target.value))} />
                                   </div>
                                   <div className="lg:w-[30%] sm:w-full">
                                          <DropDownMenu
                                                 ref={dropdownCountryAffiliateRef}
                                                 handleOpen={handleOpenCountryAffiliate}
                                                 handleOpenOption={handleCountryAffiliate}
                                                 stateoption={affiliateCountry}
                                                 openMenu={openCountry}
                                                 options={countries}
                                          />
                                   </div>
                                   <div className="lg:w-[30%] sm:w-full">
                                          <DropDownMenu
                                                 ref={dropdownCityAffiliateRef}
                                                 handleOpen={handleOpenCityAffiliate}
                                                 handleOpenOption={handleCityAffiliate}
                                                 stateoption={affiliateCityState}
                                                 openMenu={openCity}
                                                 options={cities}
                                          />
                                   </div>
                                   <div className="lg:w-[30%] sm:w-full">
                                          <InputCustom type={"email"} placeholder={"email"} value={affiliateEmail} onChange={(e => setAffiliateEmail(e.target.value))} />
                                   </div>
                                   <div className="lg:w-[30%] sm:w-full">
                                          <InputCustom type={"password"} placeholder={"Password"} value={affiliatePassword} onChange={(e => setAffiliatePassword(e.target.value))} />
                                   </div>
                                   <div className="lg:w-[30%] sm:w-full">
                                          <InputCustom type={"number"} placeholder={"Phone"} value={affiliateNumber} onChange={(e => setAffiliateNumber(e.target.value))} />
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
                                          <Button type='submit' Text={"Done"} BgColor="bg-mainColor" Color="text-white" Width='full' Size='text-2xl' px='px-28' rounded='rounded-2xl' stateLoding={isLoading} />
                                   </div>

                                   <button onClick={handleGoBack} className='text-2xl text-mainColor'>Cancel</button>
                            </div>
                     </form>
              </>
       )
}

export default AddAffiliateUserPage