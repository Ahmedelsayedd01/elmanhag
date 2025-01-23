import React, { useEffect, useRef, useState } from 'react'
import Loading from '../../../Components/Loading';
import { useAuth } from '../../../Context/Auth';
import CartStudent from '../../../Components/CartStudent';
import SearchBar from '../../../Components/SearchBar';
import { ButtonAdd } from '../../../Components/Button';
import SettingFilter from '../../../Components/Icons/AdminIcons/SettingFilter';
import EditIcon from '../../../Components/Icons/AdminIcons/EditIcon';
import DeleteIcon from '../../../Components/Icons/AdminIcons/DeleteIcon';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DropDownMenu from '../../../Components/DropDownMenu';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { Wroning } from '../../../Components/Icons/All_Icons';
import { CgUnblock } from 'react-icons/cg';
import { MdBlockFlipped } from 'react-icons/md';

const AffiliateUserPage = () => {
       const auth = useAuth();
       const [isLoading, setIsLoading] = useState(false);
       const [user, setUser] = useState(null);
       const [search, setSearch] = useState('');
       const [selectedOptionCountry, setSelectedOptionCountry] = useState('Filter By Country');
       const [selectedOptionCity, setSelectedOptionCity] = useState('Filter By City');
       const [selectedOptionStatus, setSelectedOptionStatus] = useState('Filter By Status');
       const [openStatus, setOpenStatus] = useState(false);
       const [countryList, setCountryList] = useState([]);
       const [openCountry, setOpenCountry] = useState(false);
       const [cityList, setCityList] = useState([]);
       const [openCity, setOpenCity] = useState(false);
       const [userChanged, setUserChanged] = useState(false); // Change tracker

       const dropdownCountryRef = useRef(null);
       const dropdownCityRef = useRef(null);
       const dropdownStatusRef = useRef(null);

       const [isDeleting, setIsDeleting] = useState(false);
       const [openDialog, setOpenDialog] = useState(null);

       const handleOptionCountry = (e) => {
              setSelectedOptionCountry(e.target.innerText);
              setOpenCountry(false);
       };

       const handleOptionCity = (e) => {
              setSelectedOptionCity(e.target.innerText);
              setOpenCity(false);
       };

       const handleOptionStatus = (e) => {
              setSelectedOptionStatus(e.target.innerText);
              setOpenStatus(false);
       };

       const handleOpenCountry = () => {
              setOpenCountry(!openCountry);
              setOpenCity(false);
              setOpenStatus(false);
       };

       const handleOpenCity = () => {
              setOpenCountry(false);
              setOpenCity(!openCity);
              setOpenStatus(false);
       };

       const handleOpenStatus = () => {
              setOpenCountry(false);
              setOpenCity(false);
              setOpenStatus(!openStatus);
       };

       const handleClickOutside = (event) => {
              if (
                     (dropdownCountryRef.current && !dropdownCountryRef.current.contains(event.target)) &&
                     (dropdownCityRef.current && !dropdownCityRef.current.contains(event.target)) &&
                     (dropdownStatusRef.current && !dropdownStatusRef.current.contains(event.target))
              ) {
                     setOpenCountry(false);
                     setOpenCity(false);
                     setOpenStatus(false);
              }
       };

       useEffect(() => {
              document.addEventListener('mousedown', handleClickOutside);
              return () => {
                     document.removeEventListener('mousedown', handleClickOutside);
              };
       }, []);

       const fetchUser = async () => {
              setIsLoading(true);
              try {
                     const response = await axios.get('http://62.84.185.153/plesk-site-preview/bcknd.elmanhag.com/https/62.84.185.153/admin/affilate', {
                            headers: {
                                   Authorization: `Bearer ${auth.user.token}`,
                            },
                     });
                     if (response.status === 200) {
                            setUser(response.data);
                            setCountryList(response.data.countries)
                            setCityList(response.data.cities)

                            console.log('responce', response)
                     }
              } catch (error) {
                     console.error('Error fetching User data:', error);
              } finally {
                     setIsLoading(false);
              }
       };

       useEffect(() => {
              fetchUser(); // Fetch User initially and whenever studentsChanged changes
       }, [userChanged]);

       useEffect(() => {
              console.log('user', user)

       }, [user])

       const handleOpenDialog = (userId) => {
              setOpenDialog(userId);
       };

       const handleCloseDialog = () => {
              setOpenDialog(null);
       };

       const handleBlock = async (userId, userName) => {
              setIsDeleting(true);
              const success = await blockUser(userId, auth.user.token);
              setIsDeleting(false);
              handleCloseDialog();

              if (success) {
                     auth.toastSuccess(`${userName} blocked successfully!`);
                     setUserChanged(!userChanged)
              } else {
                     auth.toastError(`Failed to block ${userName}`);
              }
       };
       const blockUser = async (userId, authToken) => {
              try {
                     const response = await axios.put(`http://62.84.185.153/plesk-site-preview/bcknd.elmanhag.com/https/62.84.185.153/admin/affilate/banned/${userId}`, {}, {
                            headers: {
                                   Authorization: `Bearer ${authToken}`,
                            },
                     });

                     if (response.status === 200) {
                            console.log('User unblock successfully');
                            return true;
                     } else {
                            console.error('Failed to unblock user:', response.status, response.statusText);
                            return false;
                     }
              } catch (error) {
                     console.error('Error blocking user:', error);
                     return false;
              }
       };

       const handleUnblock = async (userId, userName) => {
              setIsDeleting(true);
              const success = await unblockUser(userId, auth.user.token);
              setIsDeleting(false);
              handleCloseDialog();

              if (success) {
                     auth.toastSuccess(`${userName} unblocked successfully!`);
                     setUserChanged(!userChanged)
              } else {
                     auth.toastError(`Failed to unblock ${userName}`);
              }
       };

       const unblockUser = async (userId, authToken) => {
              try {
                     const response = await axios.put(`http://62.84.185.153/plesk-site-preview/bcknd.elmanhag.com/https/62.84.185.153/admin/affilate/unblock/${userId}`, {}, {
                            headers: {
                                   Authorization: `Bearer ${authToken}`,
                            },
                     });

                     if (response.status === 200) {
                            console.log('User unblock successfully');
                            return true;
                     } else {
                            console.error('Failed to unblock user:', response.status, response.statusText);
                            return false;
                     }
              } catch (error) {
                     console.error('Error unblocking user:', error);
                     return false;
              }
       };

       if (isLoading) {
              return (
                     <div className="w-1/4 h-full flex items-start mt-[10%] justify-center m-auto">
                            <Loading />
                     </div>
              );
       }

       if (!user) {
              return <div className='text-mainColor text-2xl font-bold w-full h-full flex items-center justify-center'>No users data available</div>;
       }

       const handleChange = (e) => {
              setSearch(e.target.value);
       };
       return (
              <>
                     <div className="w-full flex flex-wrap gap-y-4 items-center justify-between">
                            <CartStudent width='w-56' name={"Total affiliate"} count={user.total_affilate} />
                            <CartStudent width='w-56' name={"Active users"} count={user.active_affilate} />
                            <CartStudent width='w-56' name={"Revenue"} count={user.revenue} />
                            <CartStudent width='w-56' name={"Wallets"} count={user.wallets} />
                            <CartStudent width='w-56' name={"# of signups"} count={user.sign_ups} />
                     </div>

                     <div className="w-full">
                            <div className="w-full flex flex-wrap items-center justify-between gap-4">
                                   <div className="sm:w-full xl:w-1/5 mx-auto">
                                          <SearchBar handleChange={handleChange} value={search} bg={"white"} />
                                   </div>
                                   <div className="sm:w-full xl:w-1/5">
                                          <DropDownMenu
                                                 ref={dropdownStatusRef}
                                                 iconMenu={<SettingFilter />}
                                                 handleOpen={handleOpenStatus}
                                                 handleOpenOption={handleOptionStatus}
                                                 stateoption={selectedOptionStatus}
                                                 openMenu={openStatus}
                                                 options={[{ id: 1, name: 'Active' }, { id: 2, name: 'unactive' }]}
                                          />
                                   </div>
                                   <div className="sm:w-full xl:w-1/5">
                                          <DropDownMenu
                                                 ref={dropdownCountryRef}
                                                 iconMenu={<SettingFilter />}
                                                 handleOpen={handleOpenCountry}
                                                 handleOpenOption={handleOptionCountry}
                                                 stateoption={selectedOptionCountry}
                                                 openMenu={openCountry}
                                                 options={countryList || []}
                                          />
                                   </div>
                                   <div className="sm:w-full xl:w-1/5">
                                          <DropDownMenu
                                                 ref={dropdownCityRef}
                                                 iconMenu={<SettingFilter />}
                                                 handleOpen={handleOpenCity}
                                                 handleOpenOption={handleOptionCity}
                                                 stateoption={selectedOptionCity}
                                                 openMenu={openCity}
                                                 options={cityList || []}
                                          />
                                   </div>
                                   <div className="sm:w-full xl:w-1/12 mx-auto">
                                          <Link to="add">
                                                 <ButtonAdd Text={"Add"} BgColor={"white"} Color={"thirdColor"} Size={"xl"} />
                                          </Link>
                                   </div>
                            </div>
                            <div className="w-full flex items-center justify-between mt-4 overflow-x-auto">
                                   <table className="w-full sm:min-w-0">
                                          <thead className="w-full">
                                                 <tr className="w-full border-b-2">
                                                        <th className="min-w-[80px] sm:w-1/12 lg:w-[8%] text-mainColor text-center font-medium text-xs sm:text-sm lg:text-base xl:text-lg pb-3">#</th>
                                                        <th className="min-w-[150px] sm:w-[20%] lg:w-[18%] text-mainColor text-center font-medium text-xs sm:text-sm lg:text-base xl:text-lg pb-3">Name Phone</th>
                                                        <th className="min-w-[120px] sm:w-[12%] lg:w-[10%] text-mainColor text-center font-medium text-xs sm:text-sm lg:text-base xl:text-lg pb-3">Status</th>
                                                        <th className="min-w-[150px] sm:w-[20%] lg:w-[15%] text-mainColor text-center font-medium text-xs sm:text-sm lg:text-base xl:text-lg pb-3">Register At</th>
                                                        <th className="min-w-[120px] sm:w-[18%] lg:w-[14%] text-mainColor text-center font-medium text-xs sm:text-sm lg:text-base xl:text-lg pb-3">Last Login</th>
                                                        <th className="min-w-[120px] sm:w-[18%] lg:w-[14%] text-mainColor text-center font-medium text-xs sm:text-sm lg:text-base xl:text-lg pb-3"># Of Signups</th>
                                                        <th className="min-w-[120px] sm:w-[18%] lg:w-[14%] text-mainColor text-center font-medium text-xs sm:text-sm lg:text-base xl:text-lg pb-3">Income</th>
                                                        <th className="min-w-[120px] sm:w-[18%] lg:w-[14%] text-mainColor text-center font-medium text-xs sm:text-sm lg:text-base xl:text-lg pb-3">Wallet</th>
                                                        <th className="min-w-[100px] sm:w-[8%] lg:w-[6%] text-mainColor text-center font-medium text-xs sm:text-sm lg:text-base xl:text-lg pb-3">Action</th>
                                                 </tr>
                                          </thead>
                                          <tbody className="w-full">
                                                 {user.affilates.map((user, index) => (
                                                        <tr className="w-full border-b-2" key={user.id}>
                                                               <td
                                                                      className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                               >
                                                                      {index + 1}
                                                               </td>
                                                               <td
                                                                      className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                               >
                                                                      {user?.name || "-"} <br /> {user?.phone || "-"}
                                                               </td>
                                                               <td
                                                                      className="min-w-[120px] sm:min-w-[80px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                               >
                                                                      {user.status === 1 ? <span className='text-green-500'>Active</span> : <span className='text-mainColor'>Unactive</span>}
                                                               </td>
                                                               <td
                                                                      className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                               >
                                                                      {user?.created_at || "-"}
                                                               </td>
                                                               <td
                                                                      className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                               >
                                                                      {user?.logins?.updated_at || "-"}
                                                               </td>
                                                               <td
                                                                      className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                               >
                                                                      {user?.signups_count || "0"}
                                                               </td>
                                                               <td
                                                                      className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                               >
                                                                      {user?.income?.income || "0"}
                                                               </td>
                                                               <td
                                                                      className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                               >
                                                                      {user?.income?.wallet || "0"}
                                                               </td>

                                                               <td
                                                                      className="min-w-[100px] sm:min-w-[80px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                               >
                                                                      <div className="flex items-center justify-center gap-x-3">
                                                                             <Link to={`edit/${user.id}`} type="button">
                                                                                    <EditIcon />
                                                                             </Link>
                                                                             <button type="button" className='outline-0' onClick={() => handleOpenDialog(user.id)}>
                                                                                    {user.status === 1 ? <MdBlockFlipped className='text-2xl text-mainColor' /> : <CgUnblock className='text-2xl text-green-500' />}
                                                                             </button>
                                                                             {openDialog === user.id && (
                                                                                    <Dialog open={true} onClose={handleCloseDialog} className="relative z-10">
                                                                                           <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                                                                                           <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                                                                                                  <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                                                                                         <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                                                                                                <div className="flex flex-col items-center justify-center bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                                                                                                       <Wroning Width='28' Height='28' aria-hidden="true" />
                                                                                                                       <div className="flex items-center">
                                                                                                                              <div className="mt-2 text-center">
                                                                                                                                     <DialogTitle as="h3" className="text-xl font-semibold leading-10 text-gray-900">
                                                                                                                                            You will {user.status === 1 ? 'Block' : 'Unblock'} {user?.name || "null"}
                                                                                                                                     </DialogTitle>
                                                                                                                              </div>
                                                                                                                       </div>
                                                                                                                </div>
                                                                                                                <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                                                                                       <button
                                                                                                                              type="button"
                                                                                                                              onClick={user.status === 1 ? () => handleBlock(user.id, user.name) : () => handleUnblock(user.id, user.name)}
                                                                                                                              disabled={isDeleting}
                                                                                                                              className="inline-flex w-full justify-center rounded-md bg-mainColor px-6 py-3 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto"
                                                                                                                       >
                                                                                                                              {isDeleting ? <div className="flex w-10 h-5"><Loading /></div> : (user?.status === 1 ? 'Block' : 'Unblock')}
                                                                                                                       </button>
                                                                                                                       <button
                                                                                                                              type="button"
                                                                                                                              data-autofocus
                                                                                                                              onClick={handleCloseDialog}
                                                                                                                              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-6 py-3 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:mt-0 sm:w-auto"
                                                                                                                       >
                                                                                                                              Cancel
                                                                                                                       </button>
                                                                                                                </div>
                                                                                                         </DialogPanel>
                                                                                                  </div>
                                                                                           </div>
                                                                                    </Dialog>
                                                                             )}
                                                                      </div>
                                                               </td>
                                                        </tr>
                                                 ))}
                                          </tbody>
                                   </table>
                            </div>
                     </div>
              </>
       )
}

export default AffiliateUserPage