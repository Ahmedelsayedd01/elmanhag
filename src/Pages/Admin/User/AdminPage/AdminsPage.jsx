import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ButtonAdd } from '../../../../Components/Button'
import { useAuth } from '../../../../Context/Auth';
import axios from 'axios';
import Loading from '../../../../Components/Loading';
import EditIcon from '../../../../Components/Icons/AdminIcons/EditIcon';
import DeleteIcon from '../../../../Components/Icons/AdminIcons/DeleteIcon';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { Wroning } from '../../../../Components/Icons/All_Icons';

const AdminsPage = () => {
       const auth = useAuth();
       const [isLoading, setIsLoading] = useState(false);

       const [adminsData, setAdminsData] = useState(null)
       const [adminsChanged, setAdminsChanged] = useState(false); // Change tracker

       const [isDeleting, setIsDeleting] = useState(false);
       const [openDialog, setOpenDialog] = useState(null);

       // const [openView, setOpenView] = useState(null);

       const handleCloseDialog = () => {
              setOpenDialog(null);
       };
       // const handleCloseView = () => {
       //        setOpenView(null);
       // };

       const fetchAdmins = async () => {
              setIsLoading(true);
              try {
                     const response = await axios.get("http://62.84.185.153/plesk-site-preview/bcknd.elmanhag.com/https/62.84.185.153/admin/admins", {
                            headers: {
                                   Authorization: `Bearer ${auth.user.token}`,
                            },
                     });
                     if (response.status === 200) {
                            console.log('response Admins', response.data);
                            const admins = response.data.admins;
                            setAdminsData(admins);
                     }
              } catch (error) {
                     console.error('Error fetching Admins data:', error);
              } finally {
                     setIsLoading(false);
              }
       };

       useEffect(() => {
              fetchAdmins();
       }, [])

       const handleOpenDialog = (adminId) => {
              setOpenDialog(adminId);
       };

       // const handleOpenView = (roleId) => {
       //        setOpenView(roleId);
       // };

       const handleStatus = async (adminId, adminName, status) => {
              try {
                     const response = await axios.put(`http://62.84.185.153/plesk-site-preview/bcknd.elmanhag.com/https/62.84.185.153/admin/admins/status/${adminId}`, { status }, {
                            headers: {
                                   Authorization: `Bearer ${auth.user.token}`,
                            },
                     });

                     if (response.status === 200) {
                            setAdminsChanged(!adminsChanged)
                            auth.toastSuccess(`${adminName} ${response.data.success}  successfully`)
                            console.log("responsesssd admin status", response)
                     } else {
                            auth.toastError(`${adminName} Failed To ${response.data.success}`)
                     }
              } catch (error) {
                     auth.toastError('Error', error)
                     console.error('Error change Status Admin:', error);
              }
       };

       const handleDelete = async (adminId, adminName) => {
              setIsDeleting(true);
              const success = await deleteAdmin(adminId, auth.user.token);
              setIsDeleting(false);
              handleCloseDialog();

              if (success) {
                     auth.toastSuccess(`${adminName} Deleted successfully!`);
                     setAdminsChanged(!adminsChanged)
              } else {
                     auth.toastError(`Failed to delete ${adminName}`);
              }
       };
       const deleteAdmin = async (adminId, authToken) => {
              try {
                     const response = await axios.delete(`http://62.84.185.153/plesk-site-preview/bcknd.elmanhag.com/https/62.84.185.153/admin/admins/delete/${adminId}`, {
                            headers: {
                                   Authorization: `Bearer ${authToken}`,
                            },
                     });

                     if (response.status === 200) {
                            console.log('Admin deleted successfully');
                            return true;
                     } else {
                            console.error('Failed to Deleted Admin:', response.status, response.statusText);
                            return false;
                     }
              } catch (error) {
                     console.error('Error deleting Admin:', error);
                     return false;
              }
       };



       useEffect(() => {
              fetchAdmins(); // Fetch Admin initially and whenever AdminsChanged changes
       }, [adminsChanged]);

       useEffect(() => {
              console.log('adminsData', adminsData)
       }, [adminsData]);



       if (isLoading) {
              return (
                     <div className="w-1/4 h-full flex items-start mt-[10%] justify-center m-auto">
                            <Loading />
                     </div>
              );
       }
       // if (!adminsData || adminsData.length === 0) {
       //        return <div className='text-mainColor text-2xl font-bold w-full h-full flex items-start justify-center mt-52'>No Admins Available</div>;
       // }
       const headers = ['#', 'Name', 'Phone', 'Email', 'Role', 'status', 'Action'];

       return (
              <>
                     <div className="w-full">
                            <div className="sm:w-full xl:w-1/12 text-start">
                                   <Link to="add">
                                          <ButtonAdd Text={"Add"} BgColor={"white"} Color={"thirdColor"} Size={"xl"} />
                                   </Link>
                            </div>

                            <div className="w-full flex items-center justify-between mt-4 overflow-x-auto">
                                   <table className="w-full sm:min-w-0 border-collapse">
                                          <thead className="w-full">
                                                 <tr className="w-full border-b-2">
                                                        {headers.map((header, index) => (

                                                               <th className="min-w-[80px] sm:w-1/12 lg:w-[8%] text-mainColor text-center font-medium text-xs sm:text-sm lg:text-base xl:text-lg pb-3" key={index}>
                                                                      {header}
                                                               </th>
                                                        ))}
                                                 </tr>
                                          </thead>
                                          <tbody className="w-full">
                                                 {!adminsData || adminsData.length === 0 ?
                                                        <tr className="w-full text-mainColor text-2xl font-bold text-center">
                                                               <td colSpan="12" className='py-2'>No Admins Available</td>
                                                        </tr>
                                                        : (adminsData.map((admin, index) => (
                                                               <tr className="w-full border-b-2" key={admin.id}>
                                                                      <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                             {index + 1}
                                                                      </td>
                                                                      <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                             {admin?.name || "-"}
                                                                      </td>
                                                                      <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                             {admin?.phone || "-"}
                                                                      </td>
                                                                      <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                             {admin?.email || "-"}
                                                                      </td>
                                                                      <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                             {admin?.admin_position?.name || "-"}
                                                                      </td>
                                                                      <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                             {admin.status === 1 && (
                                                                                    <button
                                                                                           className="bg-green-500 text-white px-4 py-2 rounded-lg"
                                                                                           onClick={() => handleStatus(admin.id, admin.name, 0)}
                                                                                    >
                                                                                           Active
                                                                                    </button>
                                                                             )}
                                                                             {admin.status === 0 && (
                                                                                    <button
                                                                                           className="bg-red-500 text-white px-4 py-2 rounded-lg"
                                                                                           onClick={() => handleStatus(admin.id, admin.name, 1)}
                                                                                    >
                                                                                           Banned
                                                                                    </button>
                                                                             )}
                                                                      </td>
                                                                      {/* <td className="min-w-[120px] sm:min-w-[80px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                      <span className='text-mainColor text-xl border-b-2 border-mainColor font-semibold cursor-pointer'
                                                                             onClick={() => handleOpenView(admin.id)}>
                                                                             View
                                                                      </span>
                                                               </td> */}
                                                                      <td className="min-w-[100px] sm:min-w-[80px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                             <div className="flex items-center justify-center gap-x-3">
                                                                                    <Link to={`edit/${admin.id}`} state={admin.id} type="button">
                                                                                           <EditIcon className="hover:cursor-pointer hover:text-mainColor" />
                                                                                    </Link>
                                                                                    <button type="button" className="outline-0" onClick={() => handleOpenDialog(admin.id)}>
                                                                                           <DeleteIcon className="hover:cursor-pointer hover:text-mainColor" />
                                                                                    </button>
                                                                                    {openDialog === admin.id && (
                                                                                           <Dialog open={true} onClose={handleCloseDialog} className="relative z-10">
                                                                                                  <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                                                                                                  <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                                                                                                         <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                                                                                                <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                                                                                                       <div className="flex flex-col items-center justify-center bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                                                                                                              <Wroning Width="28" Height="28" aria-hidden="true" />
                                                                                                                              <div className="flex items-center">
                                                                                                                                     <div className="mt-2 text-center">
                                                                                                                                            <DialogTitle as="h3" className="text-xl font-semibold leading-10 text-gray-900">
                                                                                                                                                   You will delete {admin?.name || "-"}
                                                                                                                                            </DialogTitle>
                                                                                                                                     </div>
                                                                                                                              </div>
                                                                                                                       </div>
                                                                                                                       <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                                                                                              <button
                                                                                                                                     type="button"
                                                                                                                                     onClick={() => handleDelete(admin.id, admin.name)}
                                                                                                                                     disabled={isDeleting}
                                                                                                                                     className="inline-flex w-full justify-center rounded-md bg-mainColor px-6 py-3 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto"
                                                                                                                              >
                                                                                                                                     {isDeleting ? <div className="flex w-10 h-5"><Loading /></div> : "Delete"}
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
                                                        )))}
                                          </tbody>
                                   </table>
                            </div>

                     </div>
              </>
       )
}

export default AdminsPage