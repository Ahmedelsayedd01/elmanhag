import React, { useEffect, useRef, useState } from 'react'
import InputCustom from '../../../../Components/InputCustom'
import DropDownMenu from '../../../../Components/DropDownMenu'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../Context/Auth';
import Loading from '../../../../Components/Loading';
import axios from 'axios';
import { Button } from '../../../../Components/Button';
import CheckBox from '../../../../Components/CheckBox';

const AddAdminPage = () => {
       const roleRef = useRef();

       const auth = useAuth();
       const navigate = useNavigate();
       const [isLoading, setIsLoading] = useState(false);

       const [adminName, setAdminName] = useState('');
       const [adminPhone, setAdminPhone] = useState('');
       const [adminEmail, setAdminEmail] = useState('');
       const [adminPassword, setAdminPassword] = useState('');
       const [roleId, setRoleId] = useState('');
       const [adminStatus, setAdminStatus] = useState(0);

       const [roleData, setRoleData] = useState([]);
       const [roleState, setRoleState] = useState('Select Role');

       const [openRole, setOpenRole] = useState(false);

       useEffect(() => {
              const fetchRole = async () => {
                     setIsLoading(true);
                     try {
                            const response = await axios.get(
                                   "http://62.84.185.153/plesk-site-preview/bcknd.elmanhag.com/https/62.84.185.153/admin/admins",
                                   {
                                          headers: {
                                                 Authorization: `Bearer ${auth.user.token}`,
                                          },
                                   }
                            );
                            if (response.status === 200) {
                                   console.log('response Role', response.data.roles);
                                   const roles = response.data.roles;
                                   setRoleData(roles);
                            }
                     } catch (error) {
                            console.error("Error fetching Roles data:", error);
                     } finally {
                            setIsLoading(false);
                     }
              };
              fetchRole(); // Fetch role initially and whenever roleChanged changes
       }, []);

       const handleOpenRole = () => {
              setOpenRole(!openRole)
       };

       const handleRole = (e) => {
              const inputElement = e.currentTarget.querySelector('.inputVal');
              const selectedOptionName = e.currentTarget.textContent.trim();
              const selectedOptionValue = inputElement ? inputElement.value.toLowerCase() : '';

              const roleId = selectedOptionValue;

              setRoleState(selectedOptionName);
              setRoleId(roleId);

              console.log('Role sss', roleId)
              setOpenRole(false);
       };

       const handleClick = (e) => {
              const isChecked = e.target.checked;
              setAdminStatus(isChecked ? 1 : 0);
       };

       useEffect(() => {
              console.log('roleId', roleId)
              document.addEventListener('mousedown', handleClickOutside);
              return () => {
                     document.removeEventListener('mousedown', handleClickOutside);
              };
       }, [roleId]);

       const handleClickOutside = (event) => {

              if (roleRef.current && !roleRef.current.contains(event.target)
              ) {
                     setOpenRole(false);
              }
       };

       const handleGoBack = () => {
              navigate(-1, { replace: true });
       };


       const handleSubmit = async (e) => {
              e.preventDefault();

              if (!adminName) {
                     auth.toastError('Please Enter Admin Name.');
                     return;
              }
              if (!adminPhone) {
                     auth.toastError('Please Enter Admin Phone.');
                     return;
              }
              if (adminPhone.length < 11) {
                     auth.toastError('Please Enter Right Admin Phone.');
                     return;
              }
              if (!roleId) {
                     auth.toastError('Please Enter Admin Role.');
                     return;
              }
              if (!adminEmail) {
                     auth.toastError('Please Enter Admin Email.');
                     return;
              }
              if (!adminPassword) {
                     auth.toastError('Please Enter Admin Password.');
                     return;
              }
              setIsLoading(true);

              try {
                     const formData = new FormData();
                     formData.append('name', adminName);
                     formData.append('phone', adminPhone);
                     formData.append('admin_position_id', roleId);
                     formData.append('email', adminEmail);
                     formData.append('password', adminPassword);
                     formData.append('status', adminStatus);

                     const response = await axios.post('http://62.84.185.153/plesk-site-preview/bcknd.elmanhag.com/https/62.84.185.153/admin/admins/add', formData, {
                            headers: {
                                   Authorization: `Bearer ${auth.user.token}`,
                                   'Content-Type': 'multipart/form-data',
                            },
                     });

                     if (response.status === 200) {
                            handleGoBack();
                            auth.toastSuccess("Admin added successfully!");
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
                                                        placeholder="Admin Name"
                                                        value={adminName}
                                                        required={false}
                                                        onChange={(e) => setAdminName(e.target.value)}
                                                 />
                                          </div>
                                          <div className="lg:w-[30%] sm:w-full">
                                                 <InputCustom
                                                        type="text"
                                                        placeholder="Admin Phone"
                                                        value={adminPhone}
                                                        required={false}
                                                        onChange={
                                                               (e) => {
                                                                      const value = e.target.value;
                                                                      // Only allow numbers
                                                                      if (!isNaN(value)) {
                                                                             setAdminPhone(value)
                                                                      }

                                                               }
                                                        }
                                                 />
                                          </div>
                                          <div className="lg:w-[30%] sm:w-full">
                                                 <DropDownMenu
                                                        ref={roleRef}
                                                        handleOpen={handleOpenRole}
                                                        handleOpenOption={handleRole}
                                                        stateoption={roleState}
                                                        openMenu={openRole}
                                                        options={roleData}
                                                 />
                                          </div>
                                          <div className="lg:w-[30%] sm:w-full">
                                                 <InputCustom
                                                        type="email"
                                                        placeholder="Admin Email"
                                                        value={adminEmail}
                                                        required={false}
                                                        onChange={(e) => setAdminEmail(e.target.value)}
                                                 />
                                          </div>
                                          <div className="lg:w-[30%] sm:w-full">
                                                 <InputCustom
                                                        type="password"
                                                        placeholder="Admin password"
                                                        value={adminPassword}
                                                        required={false}
                                                        onChange={(e) => setAdminPassword(e.target.value)}
                                                 />
                                          </div>

                                          <div className="flex items-center gap-x-4 lg:w-[30%] sm:w-full">
                                                 <span className="text-2xl text-thirdColor font-medium">Active:</span>
                                                 <div>
                                                        <CheckBox checked={adminStatus} handleClick={handleClick} />
                                                 </div>
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
                                                 />
                                          </div>
                                          <button type='button' onClick={handleGoBack} className="text-2xl text-mainColor">Cancel</button>
                                   </div>
                            </form>
                     }
              </>
       )
}

export default AddAdminPage