import React, { useEffect, useRef, useState } from 'react';
import Loading from '../../../../Components/Loading';
import { useAuth } from '../../../../Context/Auth';
import CartStudent from '../../../../Components/CartStudent';
import SearchBar from '../../../../Components/SearchBar';
import { ButtonAdd } from '../../../../Components/Button';
import SettingFilter from '../../../../Components/Icons/AdminIcons/SettingFilter';
import EditIcon from '../../../../Components/Icons/AdminIcons/EditIcon';
import DeleteIcon from '../../../../Components/Icons/AdminIcons/DeleteIcon';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DropDownMenu from '../../../../Components/DropDownMenu';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';

const StudentPage = () => {
       const auth = useAuth();
       const [isLoading, setIsLoading] = useState(false);
       const [data, setData] = useState(null);
       const [allStudents, setAllStudents] = useState([]);
       const [students, setStudents] = useState([]);
       const [search, setSearch] = useState('');
       const [selectedOptionCountry, setSelectedOptionCountry] = useState('Filter By Country');
       const [countryName, setCountryName] = useState('');
       const [selectedOptionCity, setSelectedOptionCity] = useState('Filter By City');
       const [cityName, setCityName] = useState('');
       const [selectedOptionCategory, setSelectedOptionCategory] = useState('Filter By Category');
       const [categoryName, setCategoryName] = useState('');
       const [selectedOptionEducation, setSelectedOptionEducation] = useState('Filter By Education');
       const [educationName, setEducationName] = useState('');
       const [selectedOptionType, setSelectedOptionType] = useState('Filter By Free/Paid');
       const [typeName, setTypeName] = useState('');
       const [openCountry, setOpenCountry] = useState(false);
       const [openCity, setOpenCity] = useState(false);
       const [openCategory, setOpenCategory] = useState(false);
       const [openEducation, setOpenEducation] = useState(false);
       const [openType, setOpenType] = useState(false);
       const [studentsChanged, setStudentsChanged] = useState(false); // Change tracker

       const [notFound, setNotFound] = useState(true); // Change tracker

       const dropdownCountryRef = useRef(null);
       const dropdownCityRef = useRef(null);
       const dropdownCategoryRef = useRef(null);
       const dropdownEducationRef = useRef(null);
       const dropdownTypeRef = useRef(null);

       const [isDeleting, setIsDeleting] = useState(false);
       const [openDialog, setOpenDialog] = useState(null);

       const filterStudents = (country, city, education, category, pay) => {
              let filteredStudents = [...allStudents];

              // Filter by country
              if (country) {
                     filteredStudents = filteredStudents.filter((student) => student.country?.name === country);
              }

              // Filter by city
              if (city) {
                     filteredStudents = filteredStudents.filter((student) => student.city?.name === city);
              }

              // Filter by education
              if (education) {
                     filteredStudents = filteredStudents.filter((student) => student.education?.name === education);
              }

              // Filter by category
              if (category) {
                     filteredStudents = filteredStudents.filter((student) => student.category?.name === category);
              }


              // Filter by pay type (Free or Paid)
              if (pay) {
                     filteredStudents = filteredStudents.filter((student) => {
                            const isPaid = student.bundlesy === '' && student.subjects === ''; // Assuming this is how "Paid" is determined
                            return pay === 'Paid' ? isPaid : !isPaid;
                     });
              }

              // Handle not found case
              // if (filteredStudents.length === 0) {
              //        setNotFound(true);
              // } else {
              //        setNotFound(false);
              // }

              // Update students list
              setStudents(filteredStudents);

              console.log('country', country)
              console.log('city', city)
              console.log('education', education)
              console.log('category', category)
              console.log('pay', pay)
              console.log('filteredStudents', filteredStudents)
       };


       const handleOptionCountry = (e) => {
              const selectedCountry = e.target.innerText;

              setSelectedOptionCountry(selectedCountry);
              setCountryName(selectedCountry);

              // Filter students based on the selected country


              filterStudents(
                     selectedCountry,
                     cityName,
                     educationName,
                     categoryName,
                     typeName
              )
              setOpenCountry(false);
              console.log('Selected Country:', selectedCountry);
              console.log('Students:', students);
       };
       const handleOptionCity = (e) => {
              const selectedCity = e.target.innerText;

              setSelectedOptionCity(selectedCity);
              setCityName(selectedCity);

              // Filter students based on the selected country

              filterStudents(
                     countryName,
                     selectedCity,
                     educationName,
                     categoryName,
                     typeName
              )
              setOpenCity(false);
              console.log('Selected City:', selectedCity);
              console.log('Students:', students);
       };


       const handleOptionCategory = (e) => {
              const selectedCategory = e.target.innerText;

              setSelectedOptionCategory(selectedCategory);
              setCategoryName(selectedCategory);

              filterStudents(
                     countryName,
                     cityName,
                     educationName,
                     selectedCategory,
                     typeName
              )

              console.log('selected Category:', selectedCategory);
              setOpenCategory(false);
       };
       const handleOptionEducation = (e) => {
              const selectedEducation = e.target.innerText;

              setSelectedOptionEducation(selectedEducation);
              setEducationName(selectedEducation)

              filterStudents(
                     countryName,
                     cityName,
                     selectedEducation,
                     categoryName,
                     typeName
              )
              console.log('selected Education:', selectedEducation);

              setOpenEducation(false);
       };

       const handleOptionType = (e) => {
              const selectedType = e.target.innerText;

              setSelectedOptionType(selectedType);
              setTypeName(selectedType);

              filterStudents(
                     countryName,
                     cityName,
                     educationName,
                     categoryName,
                     selectedType
              )
              console.log('selected Type:', selectedType);

              setOpenType(false);
       };

       const handleOpenCountry = () => {
              setOpenCountry(!openCountry);
              setOpenCity(false);
              setOpenCategory(false);
              setOpenEducation(false);
              setOpenType(false);
       };

       const handleOpenCity = () => {
              setOpenCountry(false);
              setOpenCity(!openCity);
              setOpenCategory(false);
              setOpenEducation(false);
              setOpenType(false);
       };
       const handleOpenCategory = () => {
              setOpenCountry(false);
              setOpenCity(false);
              setOpenCategory(!openCategory);
              setOpenEducation(false);
              setOpenType(false);
       };
       const handleOpenEducation = () => {
              setOpenCountry(false);
              setOpenCity(false);
              setOpenCategory(false);
              setOpenEducation(!openEducation);
              setOpenType(false);
       };

       const handleOpenType = () => {
              setOpenCountry(false);
              setOpenCity(false);
              setOpenCategory(false);
              setOpenEducation(false);
              setOpenType(!openType);
       };

       const handleClickOutside = (event) => {
              if (
                     (dropdownCountryRef.current && !dropdownCountryRef.current.contains(event.target)) &&
                     (dropdownCityRef.current && !dropdownCityRef.current.contains(event.target)) &&
                     (dropdownCategoryRef.current && !dropdownCategoryRef.current.contains(event.target)) &&
                     (dropdownEducationRef.current && !dropdownEducationRef.current.contains(event.target)) &&
                     (dropdownTypeRef.current && !dropdownTypeRef.current.contains(event.target))
              ) {
                     setOpenCountry(false);
                     setOpenCity(false);
                     setOpenCategory(false);
                     setOpenEducation(false);
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
                            setData(response.data);
                            setAllStudents(response.data.students);
                            setStudents(response.data.students);
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

       const handleStatus = async (studentId, studentName, status) => {
              try {
                     const response = await axios.put(`https://bdev.elmanhag.shop/admin/student/status/${studentId}`, { status }, {
                            headers: {
                                   Authorization: `Bearer ${auth.user.token}`,
                            },
                     });

                     if (response.status === 200) {
                            setStudentsChanged(!studentsChanged)
                            auth.toastSuccess(`${studentName} ${response.data.success}  successfully`)
                            console.log("responsesssd", response)
                     } else {
                            auth.toastError(`${studentName} Failed To ${response.data.success}`)
                     }
              } catch (error) {
                     auth.toastError('Error', error)
                     console.error('Error change Status student:', error);
              }
       };

       const handleDelete = async (studentId, studentName) => {
              setIsDeleting(true);
              const success = await deleteStudent(studentId, auth.user.token);
              setIsDeleting(false);
              handleCloseDialog();

              if (success) {
                     auth.toastSuccess(`${studentName} deleted successfully!`);
                     setStudentsChanged(!studentsChanged)
                     console.log('studentId', studentId)
              } else {
                     console.log('studentId', studentId)
                     auth.toastError(`Failed to delete ${studentName}.`);
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

       if (!data) {
              return <div className='text-mainColor text-2xl font-bold w-full h-full flex items-center justify-center'>No student data available</div>;
       }

       // localStorage.setItem("students", JSON.stringify(student));

       const handleChange = (e) => {
              setSearch(e.target.value);
       };

       return (
              <>
                     <div className="w-full flex flex-wrap gap-y-4 items-center justify-between">
                            <CartStudent name={"Total students"} count={data.total_students} />
                            <CartStudent name={"Free students"} count={data.free_students} />
                            <CartStudent name={"Paid students"} count={data.paid_students} />
                            <CartStudent name={"Banned students"} count={data.banned_students} />
                     </div>
                     <div className="w-full">
                            <div className="w-full flex flex-wrap items-center justify-between gap-4 mt-4">
                                   <div className="sm:w-full xl:w-[30%]">
                                          <SearchBar handleChange={handleChange} value={search} bg={"white"} />
                                   </div>
                                   <div className="sm:w-full xl:w-[30%]">
                                          <DropDownMenu
                                                 ref={dropdownCountryRef}
                                                 iconMenu={<SettingFilter />}
                                                 handleOpen={handleOpenCountry}
                                                 handleOpenOption={handleOptionCountry}
                                                 stateoption={selectedOptionCountry}
                                                 openMenu={openCountry}
                                                 options={data.countries || []}
                                          />
                                   </div>
                                   <div className="sm:w-full xl:w-[30%]">
                                          <DropDownMenu
                                                 ref={dropdownCityRef}
                                                 iconMenu={<SettingFilter />}
                                                 handleOpen={handleOpenCity}
                                                 handleOpenOption={handleOptionCity}
                                                 stateoption={selectedOptionCity}
                                                 openMenu={openCity}
                                                 options={data.cities || []}
                                          />
                                   </div>
                                   <div className="sm:w-full xl:w-[30%]">
                                          <DropDownMenu
                                                 ref={dropdownEducationRef}
                                                 iconMenu={<SettingFilter />}
                                                 handleOpen={handleOpenEducation}
                                                 handleOpenOption={handleOptionEducation}
                                                 stateoption={selectedOptionEducation}
                                                 openMenu={openEducation}
                                                 options={data.education}
                                          />
                                   </div>
                                   <div className="sm:w-full xl:w-[30%]">
                                          <DropDownMenu
                                                 ref={dropdownCategoryRef}
                                                 iconMenu={<SettingFilter />}
                                                 handleOpen={handleOpenCategory}
                                                 handleOpenOption={handleOptionCategory}
                                                 stateoption={selectedOptionCategory}
                                                 openMenu={openCategory}
                                                 options={data.categories}
                                          />
                                   </div>
                                   <div className="sm:w-full xl:w-[30%]">
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
                                   <div className="sm:w-full xl:w-[10%] text-start">
                                          <Link to="add">
                                                 <ButtonAdd Text={"Add"} isWidth={true} BgColor={"white"} Color={"thirdColor"} Size={"xl"} />
                                          </Link>
                                   </div>
                            </div>
                            <div className="w-full flex flex-col items-center justify-between mt-4 overflow-x-auto">
                                   <table className="w-full min-w-full table-auto border-collapse bg-white shadow-md rounded-lg">
                                          <thead className="bg-gray-100">
                                                 <tr className="border-b">
                                                        <th className="px-4 py-2 text-mainColor text-center font-semibold text-sm lg:text-lg">#</th>
                                                        <th className="px-4 py-2 text-mainColor text-center font-semibold text-sm lg:text-lg">Name / Phone</th>
                                                        <th className="px-4 py-2 text-mainColor text-center font-semibold text-sm lg:text-lg">Country / City</th>
                                                        <th className="px-4 py-2 text-mainColor text-center font-semibold text-sm lg:text-lg">Education</th>
                                                        <th className="px-4 py-2 text-mainColor text-center font-semibold text-sm lg:text-lg">Category</th>
                                                        <th className="px-4 py-2 text-mainColor text-center font-semibold text-sm lg:text-lg">Type</th>
                                                        <th className="px-4 py-2 text-mainColor text-center font-semibold text-sm lg:text-lg">Job</th>
                                                        <th className="px-4 py-2 text-mainColor text-center font-semibold text-sm lg:text-lg">Last Login</th>
                                                        <th className="px-4 py-2 text-mainColor text-center font-semibold text-sm lg:text-lg">Free / Paid</th>
                                                        <th className="px-4 py-2 text-mainColor text-center font-semibold text-sm lg:text-lg">Status</th>
                                                        <th className="px-4 py-2 text-mainColor text-center font-semibold text-sm lg:text-lg">Action</th>
                                                 </tr>
                                          </thead>

                                          <tbody className="bg-thirdBgColor">

                                                 {students.map((student, index) => (
                                                        <tr key={student.id} className="border-b hover:bg-gray-50">
                                                               <td className="px-4 py-3 text-center text-thirdColor text-sm lg:text-base">{index + 1}</td>
                                                               <td className="px-4 py-3 text-center text-thirdColor text-sm lg:text-base">
                                                                      {student?.name || "-"} <br /> {student?.phone || "-"}
                                                               </td>
                                                               <td className="px-4 py-3 text-center text-thirdColor text-sm lg:text-base">
                                                                      {student.country?.name || "-"} <br /> {student.city?.name || "-"}
                                                               </td>
                                                               <td className="px-4 py-3 text-center text-thirdColor text-sm lg:text-base">
                                                                      {student.education?.name || "-"}
                                                               </td>
                                                               <td className="px-4 py-3 text-center text-thirdColor text-sm lg:text-base">
                                                                      {student.category?.name || "-"}
                                                               </td>
                                                               <td className="px-4 py-3 text-center text-thirdColor text-sm lg:text-base">
                                                                      {student?.gender || "-"}
                                                               </td>
                                                               <td className="px-4 py-3 text-center text-thirdColor text-sm lg:text-base">
                                                                      {student.student_job?.job || "-"}
                                                               </td>
                                                               <td className="px-4 py-3 text-center text-thirdColor text-sm lg:text-base">
                                                                      {student.logins?.updated_at || '-'}
                                                               </td>
                                                               <td className="px-4 py-3 text-center text-thirdColor text-sm lg:text-base pay">
                                                                      {student.bundlesy === '' && student.subjects === '' ? 'Paid' : 'Free'}
                                                               </td>
                                                               <td className="px-4 py-3 text-center text-thirdColor text-sm lg:text-base">
                                                                      {student.status === 1 && (
                                                                             <button
                                                                                    className="bg-green-500 text-white px-4 py-2 rounded-lg"
                                                                                    onClick={() => handleStatus(student.id, student.name, 0)}
                                                                             >
                                                                                    Active
                                                                             </button>
                                                                      )}
                                                                      {student.status === 0 && (
                                                                             <button
                                                                                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                                                                                    onClick={() => handleStatus(student.id, student.name, 1)}
                                                                             >
                                                                                    Banned
                                                                             </button>
                                                                      )}
                                                               </td>
                                                               <td className="px-4 py-3 text-center">
                                                                      <div className="flex items-center justify-center gap-2">
                                                                             <Link to={`edit/${student.id}`} className="text-blue-500 hover:underline">
                                                                                    <EditIcon />
                                                                             </Link>
                                                                             <button onClick={() => handleOpenDialog(student.id)} className="text-red-500">
                                                                                    <DeleteIcon />
                                                                             </button>
                                                                      </div>
                                                                      {openDialog === student.id && (
                                                                             <Dialog open={true} onClose={handleCloseDialog}>
                                                                                    <DialogBackdrop className="fixed inset-0 bg-gray-400 bg-opacity-75" />
                                                                                    <div className="fixed inset-0 z-10 flex items-center justify-center">
                                                                                           <DialogPanel className="bg-white rounded-lg shadow-lg">
                                                                                                  <div className="p-6">
                                                                                                         <h3 className="text-lg font-semibold">Delete {student?.name || "-"}</h3>
                                                                                                         <p>Are you sure you want to delete this student?</p>
                                                                                                         <div className="mt-4 flex justify-end space-x-3">
                                                                                                                <button
                                                                                                                       onClick={() => handleDelete(student.id, student.name)}
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

                                   {students.length === 0 && (
                                          <span className="w-full py-3 text-center text-thirdColor text-xl font-semibold">Not Found Students</span>
                                   )}
                            </div>
                     </div>
              </>
       );
};

export default StudentPage;