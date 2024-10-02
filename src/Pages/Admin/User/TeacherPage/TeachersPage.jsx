import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../../Context/Auth';
import { Link } from 'react-router-dom';
import { ButtonAdd } from '../../../../Components/Button';
import Loading from '../../../../Components/Loading';
import axios from 'axios';
import EditIcon from '../../../../Components/Icons/AdminIcons/EditIcon';
import DeleteIcon from '../../../../Components/Icons/AdminIcons/DeleteIcon';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';

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
                            <div className="w-full flex flex-col items-center justify-between mt-4 overflow-x-auto">
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
                                                               <td className="px-4 py-3 text-center text-thirdColor text-sm lg:text-base flex flex-col">
                                                                      {teacher?.teacher_subjects.map((s) => (
                                                                             <span className='flex flex-col' key={s.category.id}>{s.category.name}</span>
                                                                      )) || "-"}
                                                               </td>
                                                               <td className="px-4 py-3 text-center text-thirdColor text-sm lg:text-base">
                                                                      {teacher?.teacher_subjects.map((s) => (
                                                                             <span className='flex flex-col' key={s.id}>{s.name}</span>
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
                                                                             <Dialog open={true} onClose={handleCloseDialog}>
                                                                                    <DialogBackdrop className="fixed inset-0 bg-gray-400 bg-opacity-75" />
                                                                                    <div className="fixed inset-0 z-10 flex items-center justify-center">
                                                                                           <DialogPanel className="bg-white rounded-lg shadow-lg">
                                                                                                  <div className="p-6">
                                                                                                         <h3 className="text-lg font-semibold">Delete {teacher?.name || "-"}</h3>
                                                                                                         <p>Are you sure you want to delete {teacher?.name || "this teacher"}?</p>
                                                                                                         <div className="mt-4 flex justify-end space-x-3">
                                                                                                                <button
                                                                                                                       onClick={() => handleDelete(teacher.id, teacher.name)}
                                                                                                                       className="bg-red-500 text-white px-4 py-2 rounded-lg"
                                                                                                                >
                                                                                                                       {isDeleting ? <Loading /> : 'Delete'}
                                                                                                                </button>
                                                                                                                <button onClick={handleCloseDialog} className="bg-gray-300 px-4 py-2 rounded-lg">
                                                                                                                       Cancel
                                                                                                                </button>
                                                                                                         </div>
                                                                                                  </div>
                                                                                           </DialogPanel>
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