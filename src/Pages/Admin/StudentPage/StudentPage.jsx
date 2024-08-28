import React, { useEffect, useRef, useState } from 'react';
import Loading from '../../../Components/Loading';
import { useAuth } from '../../../Context/Auth';
import CartStudent from '../../../Components/CartStudent';
import TitleHeader from '../../../Components/TitleHeader';
import SearchBar from '../../../Components/SearchBar';
import { ButtonAdd } from '../../../Components/Button';
import { IoIosArrowDown } from 'react-icons/io';
import SettingFilter from '../../../Components/Icons/AdminIcons/SettingFilter';
import EditIcon from '../../../Components/Icons/AdminIcons/EditIcon';
import DeleteIcon from '../../../Components/Icons/AdminIcons/DeleteIcon';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DropDownMenu from '../../../Components/DropDownMenu';
import TableStudent from '../../../Components/TableStudent';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { Wroning } from '../../../Components/Icons/All_Icons';

const StudentPage = () => {
       const auth = useAuth();
       const [isLoading, setIsLoading] = useState(true);
       const [student, setStudent] = useState(null);
       const [search, setSearch] = useState('');
       const [selectedOptionCountry, setSelectedOptionCountry] = useState('Filter By Country');
       const [selectedOptionCity, setSelectedOptionCity] = useState('Filter By City');
       const [selectedOptionType, setSelectedOptionType] = useState('Filter By Free/Paid');
       const [openCountry, setOpenCountry] = useState(false);
       const [openCity, setOpenCity] = useState(false);
       const [openType, setOpenType] = useState(false);
       const [studentsChanged, setStudentsChanged] = useState(false); // Change tracker

       const dropdownCountryRef = useRef(null);
       const dropdownCityRef = useRef(null);
       const dropdownTypeRef = useRef(null);

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

       const handleOptionType = (e) => {
              setSelectedOptionType(e.target.innerText);
              setOpenType(false);
       };

       const handleOpenCountry = () => {
              setOpenCountry(!openCountry);
              setOpenCity(false);
              setOpenType(false);
       };

       const handleOpenCity = () => {
              setOpenCountry(false);
              setOpenCity(!openCity);
              setOpenType(false);
       };

       const handleOpenType = () => {
              setOpenCountry(false);
              setOpenCity(false);
              setOpenType(!openType);
       };

       const handleClickOutside = (event) => {
              if (
                     (dropdownCountryRef.current && !dropdownCountryRef.current.contains(event.target)) &&
                     (dropdownCityRef.current && !dropdownCityRef.current.contains(event.target)) &&
                     (dropdownTypeRef.current && !dropdownTypeRef.current.contains(event.target))
              ) {
                     setOpenCountry(false);
                     setOpenCity(false);
                     setOpenType(false);
              }
       };

       useEffect(() => {
              document.addEventListener('mousedown', handleClickOutside);
              return () => {
                     document.removeEventListener('mousedown', handleClickOutside);
              };
       }, []);

       const fetchStudents = async () => {
              setIsLoading(true);
              try {
                     const response = await axios.get('https://bdev.elmanhag.shop/admin/student', {
                            headers: {
                                   Authorization: `Bearer ${auth.user.token}`,
                            },
                     });
                     if (response.status === 200) {
                            setStudent(response.data);
                     }
              } catch (error) {
                     console.error('Error fetching student data:', error);
              } finally {
                     setIsLoading(false);
              }
       };

       useEffect(() => {
              fetchStudents(); // Fetch students initially and whenever studentsChanged changes
       }, [studentsChanged]);

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
                     setStudentsChanged(!studentsChanged)
              } else {
                     auth.toastError('Failed to delete student.');
              }
       };

       const deleteStudent = async (studentId, authToken) => {
              try {
                     const response = await axios.delete(`https://bdev.elmanhag.shop/admin/student/delete/${studentId}`, {
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

       if (isLoading) {
              return (
                     <div className="w-1/4 h-full flex items-start mt-[10%] justify-center m-auto">
                            <Loading />
                     </div>
              );
       }

       if (!student) {
              return <div className='text-mainColor text-2xl font-bold w-full h-full flex items-center justify-center'>No student data available</div>;
       }

       localStorage.setItem("students", JSON.stringify(student));

       const handleChange = (e) => {
              setSearch(e.target.value);
       };

       return (
              <>
                     <div className="w-full flex flex-wrap gap-y-4 items-center justify-between">
                            <CartStudent name={"Total students"} count={student.total_students} />
                            <CartStudent name={"Free students"} count={student.free_students} />
                            <CartStudent name={"Paid students"} count={student.paid_students} />
                            <CartStudent name={"Banned students"} count={student.banned_students} />
                     </div>
                     <div className="w-full">
                            <div className="w-full flex flex-wrap items-center justify-between gap-4">
                                   <div className="sm:w-full xl:w-1/5 mx-auto">
                                          <SearchBar handleChange={handleChange} value={search} bg={"white"} />
                                   </div>
                                   <div className="sm:w-full xl:w-1/5">
                                          <DropDownMenu
                                                 ref={dropdownCountryRef}
                                                 iconMenu={<SettingFilter />}
                                                 handleOpen={handleOpenCountry}
                                                 handleOpenOption={handleOptionCountry}
                                                 stateoption={selectedOptionCountry}
                                                 openMenu={openCountry}
                                                 options={student.countries || []}
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
                                                 options={student.cities || []}
                                          />
                                   </div>
                                   <div className="sm:w-full xl:w-1/5">
                                          <DropDownMenu
                                                 ref={dropdownTypeRef}
                                                 iconMenu={<SettingFilter />}
                                                 handleOpen={handleOpenType}
                                                 handleOpenOption={handleOptionType}
                                                 stateoption={selectedOptionType}
                                                 openMenu={openType}
                                                 options={[{ id: 1, name: 'Free' }, { id: 2, name: 'Paid' }]}
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
                                                        <th className="min-w-[80px] sm:w-1/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">#</th>
                                                        <th className="min-w-[150px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Name Phone</th>
                                                        <th className="min-w-[150px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Country City</th>
                                                        <th className="min-w-[120px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Category</th>
                                                        <th className="min-w-[120px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Free / Paid</th>
                                                        <th className="min-w-[120px] sm:w-1/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Status</th>
                                                        <th className="min-w-[100px] sm:w-1/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Action</th>
                                                 </tr>
                                          </thead>
                                          <tbody className="w-full">
                                                 {student.students.map((student, index) => (
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
                                                                             <Link to={`edit/${student.id}`} type="button">
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
                     </div>
              </>
       );
};

export default StudentPage;
