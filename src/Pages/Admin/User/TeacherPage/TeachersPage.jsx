import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../../Context/Auth';
import { Link } from 'react-router-dom';
import { ButtonAdd } from '../../../../Components/Button';
import Loading from '../../../../Components/Loading';
import axios from 'axios';
import EditIcon from '../../../../Components/Icons/AdminIcons/EditIcon';
import DeleteIcon from '../../../../Components/Icons/AdminIcons/DeleteIcon';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { Wroning } from '../../../../Components/Icons/All_Icons';

const TeachersPage = () => {
       const auth = useAuth();
       const [isLoading, setIsLoading] = useState(false);
       const [allTeachers, setAllTeachers] = useState([]);
       const [teachers, setTeachers] = useState([]);
       const [teachersChanged, setTeachersChanged] = useState(false); // Change tracker

       const [isDeleting, setIsDeleting] = useState(false);
       const [openDialog, setOpenDialog] = useState(null);


       const fetchTeachers = async () => {
              setIsLoading(true)
              try {
                     const response = await axios.get('https://bdev.elmanhag.shop/admin/teacher', {
                            headers: {
                                   Authorization: `Bearer ${auth.user.token}`,
                            },
                     });
                     if (response.status === 200) {
                            setAllTeachers(response.data.teachers)
                            console.log(response)
                     }

              } catch (error) {

              } finally {
                     setIsLoading(false)

              }
       }

       useEffect(() => {
              fetchTeachers(); // Fetch Teachers initially and whenever TeachersChanged changes
       }, [teachersChanged]);

       const handleStatus = async (teacherId, teacherName, status) => {
              console.log('status', status)
              try {
                     const response = await axios.put(`https://bdev.elmanhag.shop/admin/teacher/status/${teacherId}`, { status }, {
                            headers: {
                                   Authorization: `Bearer ${auth.user.token}`,
                            },
                     });

                     if (response.status === 200) {
                            console.log("responsesssd", response)
                            setTeachersChanged(!teachersChanged)
                            auth.toastSuccess(`${teacherName} ${response.data.success}  successfully`)
                     } else {
                            auth.toastError(`${teacherName} Failed To ${response.data.success}`)
                     }
              } catch (error) {
                     auth.toastError('Error', error)
                     console.error('Error change Status teacher:', error);
              }
       };

       const handleOpenDialog = (teacherId) => {
              setOpenDialog(teacherId);
       };

       const handleCloseDialog = () => {
              setOpenDialog(null);
       };

       const handleDelete = async (teacherId, teacherName) => {
              setIsDeleting(true);
              const success = await deleteTeacher(teacherId, auth.user.token);
              setIsDeleting(false);
              handleCloseDialog();

              if (success) {
                     auth.toastSuccess(`${teacherName} deleted successfully!`);
                     setTeachersChanged(!teachersChanged)
                     console.log('teacherId', teacherId)
              } else {
                     console.log('teacherId', teacherId)
                     auth.toastError(`Failed to delete ${teacherName}.`);
              }
       };

       const deleteTeacher = async (teacherId, authToken) => {
              try {
                     const response = await axios.delete(`https://bdev.elmanhag.shop/admin/teacher/delete/${teacherId}`, {
                            headers: {
                                   Authorization: `Bearer ${authToken}`,
                            },
                     });

                     if (response.status === 200) {
                            console.log('Teacher deleted successfully');
                            return true;
                     } else {
                            console.error('Failed to delete teacher:', response.status, response.statusText);
                            return false;
                     }
              } catch (error) {
                     console.error('Error deleting teacher:', error);
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

       if (!allTeachers) {
              return <div className='text-mainColor text-2xl font-bold w-full h-full flex items-center justify-center'>Not Found Teachers</div>;
       }

       return (
              <>
                     <div className="w-full flex flex-col items-start gap-y-4">
                            <div className="sm:w-full xl:w-[10%] text-start">
                                   <Link to="add">
                                          <ButtonAdd Text={"Add"} isWidth={true} BgColor={"white"} Color={"thirdColor"} Size={"xl"} />
                                   </Link>
                            </div>
                            <div className="w-full flex flex-col items-center justify-between mt-4 overflow-x-auto mb-4">
                                   <table className="w-full min-w-full table-auto border-collapse bg-white shadow-md rounded-lg">
                                          <thead className="bg-gray-100">
                                                 <tr className="border-b">
                                                        <th className="px-4 py-2 text-mainColor text-center font-semibold text-sm lg:text-lg">#</th>
                                                        <th className="px-4 py-2 text-mainColor text-center font-semibold text-sm lg:text-lg">Name</th>
                                                        <th className="px-4 py-2 text-mainColor text-center font-semibold text-sm lg:text-lg">Category</th>
                                                        <th className="px-4 py-2 text-mainColor text-center font-semibold text-sm lg:text-lg">Subjects</th>
                                                        <th className="px-4 py-2 text-mainColor text-center font-semibold text-sm lg:text-lg">Status</th>
                                                        <th className="px-4 py-2 text-mainColor text-center font-semibold text-sm lg:text-lg">Action</th>
                                                 </tr>
                                          </thead>

                                          <tbody className="bg-thirdBgColor">

                                                 {allTeachers.map((teacher, index) => (
                                                        <tr key={teacher.id} className="border-b hover:bg-gray-50">
                                                               <td className="px-4 py-3 text-center text-thirdColor text-sm lg:text-base">{index + 1}</td>
                                                               <td className="px-4 py-3 text-center text-thirdColor text-sm lg:text-base">
                                                                      {teacher?.name || "-"}
                                                               </td>
                                                               <td className="px-4 py-3 text-center text-thirdColor text-sm lg:text-base">
                                                                      {teacher?.teacher_subjects.map((s, index) => (
                                                                             <span className='flex flex-col' key={`${teacher.id}-${s.category.id}-${index}`}>{`${teacher.id}-${s.category.id}-${index}`} {s.category.name}</span>
                                                                      ))}

                                                               </td>
                                                               <td className="px-4 py-3 text-center text-thirdColor text-sm lg:text-base">
                                                                      {teacher?.teacher_subjects.map((s) => (
                                                                             <span className='flex flex-col' key={s.id}>{s.id},{s.name}</span>
                                                                      )) || "-"}
                                                               </td>

                                                               <td className="px-4 py-3 text-center text-thirdColor text-sm lg:text-base">
                                                                      {teacher.status === 1 && (
                                                                             <button
                                                                                    className="bg-green-500 text-white px-4 py-2 rounded-lg"
                                                                                    onClick={() => handleStatus(teacher.id, teacher.name, 0)}
                                                                             >
                                                                                    Active
                                                                             </button>
                                                                      )}
                                                                      {teacher.status === 0 && (
                                                                             <button
                                                                                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                                                                                    onClick={() => handleStatus(teacher.id, teacher.name, 1)}
                                                                             >
                                                                                    Banned
                                                                             </button>
                                                                      )}
                                                               </td>
                                                               <td className="px-4 py-3 text-center">
                                                                      <div className="flex items-center justify-center gap-2">
                                                                             <Link to={`edit/${teacher.id}`} className="text-blue-500 hover:underline">
                                                                                    <EditIcon />
                                                                             </Link>
                                                                             <button onClick={() => handleOpenDialog(teacher.id)} className="text-red-500">
                                                                                    <DeleteIcon />
                                                                             </button>
                                                                      </div>

                                                                      {openDialog === teacher.id && (
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
                                                                                                                                     You will delete {teacher?.name || "this teacher"}
                                                                                                                              </DialogTitle>
                                                                                                                       </div>
                                                                                                                </div>
                                                                                                         </div>
                                                                                                         <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                                                                                <button
                                                                                                                       type="button"
                                                                                                                       data-autofocus
                                                                                                                       onClick={handleCloseDialog}
                                                                                                                       className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-6 py-3 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:mt-0 sm:w-auto"
                                                                                                                >
                                                                                                                       Cancel
                                                                                                                </button>
                                                                                                                <button
                                                                                                                       type="button"
                                                                                                                       onClick={() => handleDelete(teacher.id)}
                                                                                                                       disabled={isDeleting}
                                                                                                                       className="inline-flex w-full justify-center rounded-md bg-mainColor px-6 py-3 text-sm font-semibold text-white shadow-sm sm:mr-3 sm:w-auto"
                                                                                                                >
                                                                                                                       {isDeleting ? <div className="flex w-10 h-5"><Loading /></div> : 'Delete'}
                                                                                                                </button>
                                                                                                         </div>
                                                                                                  </DialogPanel>
                                                                                           </div>
                                                                                    </div>
                                                                             </Dialog>
                                                                      )}
                                                               </td>
                                                        </tr>
                                                 ))}
                                          </tbody>
                                   </table>

                                   {allTeachers.length === 0 && (
                                          <span className="w-full py-3 text-center text-thirdColor text-xl font-semibold">Not Found Teachers</span>
                                   )}
                            </div>
                     </div>
              </>
       )
}

export default TeachersPage