import React, { useEffect, useRef, useState } from 'react'
import InputCustom from '../../../../Components/InputCustom'
import DropDownMenu from '../../../../Components/DropDownMenu'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../Context/Auth';
import Loading from '../../../../Components/Loading';
import axios from 'axios';
import { Button } from '../../../../Components/Button';
import DeleteIcon from '../../../../Components/Icons/AdminIcons/DeleteIcon';

const AddAdminRolesPage = () => {
       const premissionRoleRef = useRef();

       const auth = useAuth();
       const navigate = useNavigate();
       const [isLoading, setIsLoading] = useState(false);

       const [roleName, setRoleName] = useState('');

       const [premissionRoleData, setPremissionRoleData] = useState([]);
       const [premissionRoleState, setPremissionRoleState] = useState('Select Premission');
       const [premissionRole, setPremissionRole] = useState([]);

       const [openPremissionRole, setOpenPremissionRole] = useState(false);

       useEffect(() => {
              const fetchPremissionRole = async () => {
                     setIsLoading(true);
                     try {
                            const response = await axios.get(
                                   "http://62.84.185.153/plesk-site-preview/bcknd.elmanhag.com/https/62.84.185.153/admin/adminRole",
                                   {
                                          headers: {
                                                 Authorization: `Bearer ${auth.user.token}`,
                                          },
                                   }
                            );
                            if (response.status === 200) {
                                   console.log('response Role', response.data.premissions);
                                   const premissiones = response.data.premissions;
                                   setPremissionRoleData(premissiones.map((name) => ({ name })));
                            }
                     } catch (error) {
                            console.error("Error fetching Lives data:", error);
                     } finally {
                            setIsLoading(false);
                     }
              };
              fetchPremissionRole(); // Fetch lives initially and whenever livesChanged changes
       }, []);

       const handleOpenPremissionRole = () => {
              setOpenPremissionRole(!openPremissionRole)
       };

       const handlePremissionRole = (e) => {
              const inputElement = e.currentTarget.querySelector('.inputVal');
              const selectedOptionName = e.currentTarget.textContent.trim();
              const selectedOptionValue = inputElement ? inputElement.value.toLowerCase() : '';

              const Premission = selectedOptionValue;
              if (premissionRole.includes(Premission)) {
                     auth.toastError('This Premission Already Selected')
                     return [...premissionRole];
              } else {
                     setPremissionRoleState('Select Premission');
                     setPremissionRole((prev) => [...prev, Premission]);
              }

              console.log('premissionRole sss', premissionRole)
              setOpenPremissionRole(false);
       };

       useEffect(() => {
              console.log('premissionRole', premissionRole)
              document.addEventListener('mousedown', handleClickOutside);
              return () => {
                     document.removeEventListener('mousedown', handleClickOutside);
              };
       }, [premissionRole]);

       const handleClickOutside = (event) => {

              if (premissionRoleRef.current && !premissionRoleRef.current.contains(event.target)
              ) {
                     setOpenPremissionRole(false);
              }
       };



       const handleDelete = (indexToDelete) => {
              const updatedPremissionRole = premissionRole.filter((_, index) => index !== indexToDelete);
              setPremissionRole(updatedPremissionRole);
       };

       const handleGoBack = () => {
              navigate(-1, { replace: true });
       };


       const handleSubmit = async (e) => {
              e.preventDefault();

              if (!roleName) {
                     auth.toastError('Please Enter Role Name.');
                     return;
              }

              if (!premissionRole || premissionRole.length === 0) {
                     auth.toastError('Please Select Permission Role.');
                     return;
              }

              setIsLoading(true);

              try {
                     const formData = new FormData();
                     formData.append('name', roleName);

                     // Append each permission role individually as roles[]
                     premissionRole.forEach((role, index) => {
                            formData.append(`roles[${index}]`, role);
                     });

                     const response = await axios.post('http://62.84.185.153/plesk-site-preview/bcknd.elmanhag.com/https/62.84.185.153/admin/adminRole/add', formData, {
                            headers: {
                                   Authorization: `Bearer ${auth.user.token}`,
                                   'Content-Type': 'multipart/form-data',
                                   'Cache-Control': 'no-cache',           // Disable cache
                                   'Pragma': 'no-cache',                 // Disable cache
                                   'Expires': '0',                       // Disable cache
                            },
                     });

                     if (response.status === 200) {
                            handleGoBack();
                            auth.toastSuccess("Role added successfully!");
                     }
              } catch (error) {
                     auth.toastError(`Error: ${error}`);
              } finally {
                     setIsLoading(false);
              }
       };




       return (
              <>
                     {isLoading ? <>
                            <div className="w-1/4 h-full flex items-start mt-[10%] justify-center m-auto">
                                   <Loading />
                            </div>
                     </> :
                            <form className="w-full flex flex-col items-center justify-center gap-y-8 mt-4" onSubmit={handleSubmit}>
                                   <div className="w-full flex flex-wrap items-center justify-start gap-3">
                                          <div className="lg:w-[30%] sm:w-full">
                                                 <InputCustom
                                                        type="text"
                                                        placeholder="Name"
                                                        value={roleName}
                                                        required={false}
                                                        onChange={(e) => setRoleName(e.target.value)}
                                                 />
                                          </div>
                                          <div className="lg:w-[30%] sm:w-full">
                                                 <DropDownMenu
                                                        ref={premissionRoleRef}
                                                        handleOpen={handleOpenPremissionRole}
                                                        handleOpenOption={handlePremissionRole}
                                                        stateoption={premissionRoleState}
                                                        openMenu={openPremissionRole}
                                                        options={premissionRoleData}
                                                 />
                                          </div>
                                   </div>
                                   <div className="w-full flex flex-wrap items-center justify-start gap-4">
                                          {premissionRole.map((premission, index) => {
                                                 const displayIndex = index + 1; // Create a separate variable for the display index
                                                 return (
                                                        <div className="sm:w-full lg:w-5/12 xl:w-2/12 flex items-center justify-between shadow-md hover:shadow-none duration-300 py-3 px-4 rounded-xl" key={index}>
                                                               <span className='text-mainColor text-xl font-semibold capitalize'>{displayIndex}. {premission}</span>

                                                               <span className='hover:cursor-pointer' onClick={() => handleDelete(index)}>
                                                                      <DeleteIcon />
                                                               </span>
                                                        </div>
                                                 );
                                          })}
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
                                                 />
                                          </div>
                                          <button type='button' onClick={handleGoBack} className="text-2xl text-mainColor">Cancel</button>
                                   </div>
                            </form>
                     }
              </>
       )
}

export default AddAdminRolesPage