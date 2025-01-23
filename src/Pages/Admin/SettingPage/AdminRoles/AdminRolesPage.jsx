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

const AdminRolesPage = () => {
       const auth = useAuth();
       const [isLoading, setIsLoading] = useState(false);

       const [rolesData, setRolesData] = useState(null)
       const [rolesChanged, setRolesChanged] = useState(false); // Change tracker

       const [isDeleting, setIsDeleting] = useState(false);
       const [openDialog, setOpenDialog] = useState(null);

       const [openView, setOpenView] = useState(null);

       const handleCloseDialog = () => {
              setOpenDialog(null);
       };
       const handleCloseView = () => {
              setOpenView(null);
       };

       const fetchRoles = async () => {
              setIsLoading(true);
              try {
                     const response = await axios.get("http://62.84.185.153/plesk-site-preview/bcknd.elmanhag.com/https/62.84.185.153/admin/adminRole", {
                            headers: {
                                   Authorization: `Bearer ${auth.user.token}`,
                            },
                     });
                     if (response.status === 200) {
                            console.log('response Role', response.data);
                            const roles = response.data.admin_position;
                            setRolesData(roles);
                     }
              } catch (error) {
                     console.error('Error fetching Roles data:', error);
              } finally {
                     setIsLoading(false);
              }
       };

       useEffect(() => {
              fetchRoles();
       }, [])

       const handleOpenDialog = (roleId) => {
              setOpenDialog(roleId);
       };

       const handleOpenView = (roleId) => {
              setOpenView(roleId);
       };

       const handleDelete = async (roleId, roleName) => {
              setIsDeleting(true);
              const success = await deleteRole(roleId, auth.user.token);
              setIsDeleting(false);
              handleCloseDialog();

              if (success) {
                     auth.toastSuccess(`${roleName} Deleted successfully!`);
                     setRolesChanged(!rolesChanged)
              } else {
                     auth.toastError(`Failed to delete ${roleName}`);
              }
       };
       const deleteRole = async (roleId, authToken) => {
              try {
                     const response = await axios.delete(`http://62.84.185.153/plesk-site-preview/bcknd.elmanhag.com/https/62.84.185.153/admin/adminRole/delete/${roleId}`, {
                            headers: {
                                   Authorization: `Bearer ${authToken}`,
                            },
                     });

                     if (response.status === 200) {
                            console.log('Role deleted successfully');
                            return true;
                     } else {
                            console.error('Failed to Deleted Role:', response.status, response.statusText);
                            return false;
                     }
              } catch (error) {
                     console.error('Error deleting Role:', error);
                     return false;
              }
       };



       useEffect(() => {
              fetchRoles(); // Fetch Roles initially and whenever rolesChanged changes
       }, [rolesChanged]);

       useEffect(() => {
              console.log('rolesData', rolesData)
       }, [rolesData]);



       const headers = ['#', 'Role Name', 'Role Premissions', 'Action']
       return (
              <>
                     <div className="w-full">
                            <div className="sm:w-full xl:w-1/12 text-start">
                                   <Link to="add">
                                          <ButtonAdd Text={"Add"} BgColor={"white"} Color={"thirdColor"} Size={"xl"} />
                                   </Link>
                            </div>
                            {isLoading ? (<div className="w-1/4 h-full flex items-start mt-[10%] justify-center m-auto">
                                   <Loading />
                            </div>) : !rolesData ? (<div className='text-mainColor text-2xl font-bold w-full h-full flex items-center justify-center'>No Roles available</div>
                            ) : (
                                   <div className="w-full flex items-center justify-between mt-4 overflow-x-auto">
                                          <table className="w-full sm:min-w-0 border-collapse">
                                                 <thead className="w-full">
                                                        <tr className="w-full border-b-2">
                                                               {headers.map((name, index) => (
                                                                      <th className="min-w-[120px] sm:w-[8%] lg:w-[6%] text-mainColor text-center font-medium text-xs sm:text-sm lg:text-base xl:text-lg pb-3" key={index}>
                                                                             {name}
                                                                      </th>

                                                               ))}
                                                        </tr>
                                                 </thead>
                                                 <tbody className="w-full">
                                                        {rolesData.map((role, index) => (
                                                               <tr className="w-full border-b-2" key={role.id}>
                                                                      <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                             {index + 1}
                                                                      </td>
                                                                      <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                             {role?.name || "-"}
                                                                      </td>
                                                                      <td className="min-w-[120px] sm:min-w-[80px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                             <span className='text-mainColor text-xl border-b-2 border-mainColor font-semibold cursor-pointer'
                                                                                    onClick={() => handleOpenView(role.id)}>
                                                                                    View
                                                                             </span>
                                                                      </td>
                                                                      <td className="min-w-[100px] sm:min-w-[80px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                             <div className="flex items-center justify-center gap-x-3">
                                                                                    <Link to={`edit/${role.id}`} state={role.id} type="button">
                                                                                           <EditIcon className="hover:cursor-pointer hover:text-mainColor" />
                                                                                    </Link>
                                                                                    <button type="button" className="outline-0" onClick={() => handleOpenDialog(role.id)}>
                                                                                           <DeleteIcon className="hover:cursor-pointer hover:text-mainColor" />
                                                                                    </button>
                                                                                    {openDialog === role.id && (
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
                                                                                                                                                   You will delete {role?.name || "-"}
                                                                                                                                            </DialogTitle>
                                                                                                                                     </div>
                                                                                                                              </div>
                                                                                                                       </div>
                                                                                                                       <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                                                                                              <button
                                                                                                                                     type="button"
                                                                                                                                     onClick={() => handleDelete(role.id, role.name)}
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

                                                                                    {openView === role.id && (
                                                                                           <Dialog open={true} onClose={handleCloseView} className="relative z-10">
                                                                                                  <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                                                                                                  <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                                                                                                         <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                                                                                                <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl">

                                                                                                                       {/* Permissions List */}
                                                                                                                       <div className="w-full flex flex-wrap items-center justify-center gap-4 my-4 px-4 sm:p-6 sm:pb-4">
                                                                                                                              {role.roles.length === 0 ? (
                                                                                                                                     <div className="w-full text-center text-lg font-semibold text-gray-500 my-4">
                                                                                                                                            No permissions available for this role.
                                                                                                                                     </div>
                                                                                                                              ) : (
                                                                                                                                     role.roles.map((permission, index) => {
                                                                                                                                            const displayIndex = index + 1;
                                                                                                                                            return (
                                                                                                                                                   <div
                                                                                                                                                          key={index}
                                                                                                                                                          className="sm:w-full lg:w-5/12 xl:w-3/12 flex items-center justify-center shadow-md hover:shadow-none duration-300 py-3 px-4 rounded-xl bg-gray-50"
                                                                                                                                                   >
                                                                                                                                                          <span className="text-mainColor text-lg lg:text-xl font-semibold capitalize">
                                                                                                                                                                 {displayIndex}. {permission.role}
                                                                                                                                                          </span>
                                                                                                                                                   </div>
                                                                                                                                            );
                                                                                                                                     })
                                                                                                                              )}

                                                                                                                       </div>

                                                                                                                       {/* Dialog Footer */}
                                                                                                                       <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                                                                                              <button
                                                                                                                                     type="button"
                                                                                                                                     onClick={handleCloseView}
                                                                                                                                     className="mt-3 inline-flex w-full justify-center rounded-md bg-mainColor px-6 py-3 text-sm font-medium text-white shadow-sm sm:mt-0 sm:w-auto hover:bg-mainColor-dark focus:outline-none"
                                                                                                                              >
                                                                                                                                     Close
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
                            )}

                     </div>
              </>
       )
}

export default AdminRolesPage