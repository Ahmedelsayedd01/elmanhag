import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import EditIcon from './Icons/AdminIcons/EditIcon';
import DeleteIcon from './Icons/AdminIcons/DeleteIcon';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { Wroning } from './Icons/All_Icons';
import { useAuth } from '../Context/Auth';
import axios from 'axios';
import Loading from './Loading';

const TableStudent = ({ tableTitle, data, setStudent, editPath }) => {
       const [isDeleting, setIsDeleting] = useState(false);
       const [openDialog, setOpenDialog] = useState(null);

       const auth = useAuth();

       const handleOpenDialog = (studentId) => {
              setOpenDialog(studentId);
       };

       const handleCloseDialog = () => {
              setOpenDialog(null);
       };

       const handleDelete = async (studentId) => {
              setIsDeleting(true);
              const success = await deleteStudent(studentId, auth.user.token);
              setIsDeleting(false);
              handleCloseDialog();

              if (success) {
                     auth.toastSuccess('Student deleted successfully!');
                     setStudent((prevStudent) => ({
                            ...prevStudent,
                            students: prevStudent.students.filter((student) => student.id !== studentId),
                     }));
              } else {
                     auth.toastError('Failed to delete student.');
              }
       };

       const deleteStudent = async (studentId, authToken) => {
              try {
                     const response = await axios.delete(`https://bcknd.elmanhag.com/admin/student/delete/${studentId}`, {
                            headers: {
                                   Authorization: `Bearer ${authToken}`,
                            },
                     });

                     if (response.status === 200) {
                            console.log('Student deleted successfully');
                            return true;
                     } else {
                            console.error('Failed to delete student:', response.status, response.statusText);
                            return false;
                     }
              } catch (error) {
                     console.error('Error deleting student:', error);
                     return false;
              }
       };

       return (
              <>
                     <div className="w-full flex items-center justify-between mt-4 overflow-x-auto">
                            <table className="min-w-full sm:min-w-0">
                                   <thead className="w-full">
                                          <tr className="w-full border-b-2">
                                                 {tableTitle.map((text, index) => (
                                                        <th
                                                               key={index}
                                                               className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3"
                                                        >
                                                               {text}
                                                        </th>
                                                 ))}
                                          </tr>
                                   </thead>
                                   <tbody className="w-full">
                                          {data.students.map((student, index) => (
                                                 <tr className="w-full border-b-2" key={student.id}>
                                                        <td
                                                               className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                        >
                                                               {index + 1}
                                                        </td>
                                                        <td
                                                               className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                        >
                                                               {student?.name || "null"} <br /> {student?.phone || "null"}
                                                        </td>
                                                        <td
                                                               className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                        >
                                                               {student.country?.name || "null"} <br /> {student.city?.name || "null"}
                                                        </td>
                                                        <td
                                                               className="min-w-[120px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                        >
                                                               {student.category?.name || "null"}
                                                        </td>
                                                        <td
                                                               className="min-w-[120px] sm:min-w-[80px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                        >
                                                               {student.bundlesy === '' && student.subjects === '' ? 'Paid' : 'Free'}
                                                        </td>
                                                        <td
                                                               className="min-w-[120px] sm:min-w-[80px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                        >
                                                               {student.status === "1" ? "Active" : "Pending"}
                                                        </td>
                                                        <td
                                                               className="min-w-[100px] sm:min-w-[80px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                        >
                                                               <div className="flex items-center justify-center gap-x-3">
                                                                      <Link to={`${editPath}/${student.id}`} type="button">
                                                                             <EditIcon />
                                                                      </Link>
                                                                      <button type="button" onClick={() => handleOpenDialog(student.id)}>
                                                                             <DeleteIcon />
                                                                      </button>
                                                                      {openDialog === student.id && (
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
                                                                                                                                     You will delete {student?.name || "null"}
                                                                                                                              </DialogTitle>
                                                                                                                       </div>
                                                                                                                </div>
                                                                                                         </div>
                                                                                                         <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                                                                                <button
                                                                                                                       type="button"
                                                                                                                       onClick={() => handleDelete(student.id)}
                                                                                                                       disabled={isDeleting}
                                                                                                                       className="inline-flex w-full justify-center rounded-md bg-mainColor px-6 py-3 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto"
                                                                                                                >
                                                                                                                       {isDeleting ? <div className="flex w-10 h-5"><Loading /></div> : 'Delete'}
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

              </>
       );
};

export default TableStudent;
