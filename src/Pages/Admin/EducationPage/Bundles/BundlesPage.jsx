import React, { useEffect, useRef, useState } from 'react';
import Loading from '../../../../Components/Loading';
import { useAuth } from '../../../../Context/Auth';
import TitleHeader from '../../../../Components/TitleHeader';
import { ButtonAdd } from '../../../../Components/Button';
// import { IoIosArrowDown } from 'react-icons/io';
import SettingFilter from '../../../../Components/Icons/AdminIcons/SettingFilter';
import EditIcon from '../../../../Components/Icons/AdminIcons/EditIcon';
import DeleteIcon from '../../../../Components/Icons/AdminIcons/DeleteIcon';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DropDownMenu from '../../../../Components/DropDownMenu';
// import TableStudent from '../../../../Components/TableStudent';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { Wroning } from '../../../../Components/Icons/All_Icons';

const BundlesPage = () => {

       const auth = useAuth();
       const [isLoading, setIsLoading] = useState(true);
       const [bundlesData, setBundlesData] = useState(null);
       const [bundles, setBundles] = useState(null);
       const [education , SetEducation]=useState(null)
       const [selectedOptionCategory, setSelectedOptionCategory] = useState('Filter By Category');
       const [selectedOptionStatus, setSelectedOptionStatus] = useState('Filter By Status');
       const [selectedOptionSemester, setSelectedOptionSemester] = useState('Filter By Semester');
       const [openCategory, setOpenCategory] = useState(false);
       const [openStatus, setOpenStatus] = useState(false);
       const [openSemester, setOpenSemester] = useState(false);
       const [bundlesChanged, setBundlesChanged] = useState(false);

       const [semester, setSemester] = useState();
       const [subjects, setSubject] = useState();


       const dropdownCategoryRef = useRef(null);
       const dropdownStatusRef = useRef(null);
       const dropdownSemesterRef = useRef(null);

       const [isDeleting, setIsDeleting] = useState(false);
       const [openDialog, setOpenDialog] = useState(null);

       const handleOptionCategory = (e) => {
              setSelectedOptionCategory(e.target.innerText);
              setOpenCategory(false);
       };

       const handleOptionStatus = (e) => {
              setSelectedOptionStatus(e.target.innerText);
              setOpenStatus(false);
       };

       const handleOptionSemester = (e) => {
              setSelectedOptionSemester(e.target.innerText);
              setOpenSemester(false);
       };

       const handleOpenCategory = () => {
              setOpenCategory(!openCategory);
              setOpenStatus(false);
              setOpenSemester(false);
       };

       const handleOpenStatus = () => {
              setOpenCategory(false);
              setOpenStatus(!openStatus);
              setOpenSemester(false);
       };

       const handleOpenSemester = () => {
              setOpenCategory(false);
              setOpenStatus(false);
              setOpenSemester(!openSemester);
       }


       const handleClickOutside = (event) => {
              if (
                     (dropdownCategoryRef.current && !dropdownCategoryRef.current.contains(event.target)) &&
                     (dropdownStatusRef.current && !dropdownStatusRef.current.contains(event.target)) &&
                     (dropdownSemesterRef.current && !dropdownSemesterRef.current.contains(event.target))
              ) {
                     setOpenCategory(false);
                     setOpenStatus(false);
                     setOpenSemester(false);
              }
       };

       useEffect(() => {
              document.addEventListener('mousedown', handleClickOutside);
              return () => {
                     document.removeEventListener('mousedown', handleClickOutside);
              };
       }, []);

       const fetchBundles = async () => {
              setIsLoading(true);
              try {
                     const response = await axios.get('https://bdev.elmanhag.shop/admin/bundle', {
                            headers: {
                                   Authorization: `Bearer ${auth.user.token}`,
                            },
                     });
                     if (response.status === 200) {
                            setBundlesData(response.data);
                            setBundles(response.data.bundles);
                            SetEducation(response.data.education)
                            setSubject(response.data.subjects)
                            console.log(response.data)

                            // Extract unique semesters
                            const uniqueSemesters = [...new Set(response.data.bundles.map(bundle => bundle.semester))];
                            setSemester(uniqueSemesters);
                     }
              } catch (error) {
                     console.error('Error fetching bundles data:', error);
              } finally {
                     setIsLoading(false);
              }
       };

       useEffect(() => {
              fetchBundles();
       }, [bundlesChanged]);

       const handleOpenDialog = (bundleId) => {
              setOpenDialog(bundleId);
       };

       const handleCloseDialog = () => {
              setOpenDialog(null);
       };

       const handleDelete = async (bundleId) => {
              setIsDeleting(true);
              const success = await deleteBundle(bundleId, auth.user.token);
              setIsDeleting(false);
              handleCloseDialog();

              if (success) {
                     auth.toastSuccess('Bundle deleted successfully!');
                     setBundles((prevBundle) =>
                            prevBundle.filter((bundle) => bundle.id !== bundleId)
                     );
              } else {
                     auth.toastError('Failed to delete Bundle.');
              }
       };

       const deleteBundle = async (bundleId, authToken) => {
              try {
                     const response = await axios.delete(`https://bdev.elmanhag.shop/admin/bundle/delete/${bundleId}`, {
                            headers: {
                                   Authorization: `Bearer ${authToken}`,
                            },
                     });

                     if (response.status === 200) {
                            console.log('bundle deleted successfully');
                            return true;
                     } else {
                            console.error('Failed to delete bundle:', response.status, response.statusText);
                            return false;
                     }
              } catch (error) {
                     console.error('Error deleting bundle:', error);
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

       if (!bundles) {
              return <div className='text-mainColor text-2xl font-bold w-full h-full flex items-center justify-center'>No Bundles data available</div>;
       }

       localStorage.setItem("BundlesData", JSON.stringify(bundlesData));
       // localStorage.setItem("Education", JSON.stringify(education));
       // localStorage.setItem("subjects", JSON.stringify(subjects));

       return (
              <>
                     <div className="w-full">
                            <div className="w-full flex flex-wrap items-center justify-start gap-4">
                                   <div className="sm:w-full xl:w-1/5">
                                          <DropDownMenu
                                                 ref={dropdownSemesterRef}
                                                 iconMenu={<SettingFilter />}
                                                 handleOpen={handleOpenSemester}
                                                 handleOpenOption={handleOptionSemester}
                                                 stateoption={selectedOptionSemester}
                                                 openMenu={openSemester}
                                                 options={bundles.map(bundle => ({ name: bundle?.semester || 'N/A' }))}
                                          />
                                   </div>
                                   <div className="sm:w-full xl:w-1/5">
                                          <DropDownMenu
                                                 ref={dropdownCategoryRef}
                                                 iconMenu={<SettingFilter />}
                                                 handleOpen={handleOpenCategory}
                                                 handleOpenOption={handleOptionCategory}
                                                 stateoption={selectedOptionCategory}
                                                 openMenu={openCategory}
                                                 options={bundles.map(bundle => ({ name: bundle.category?.name || 'N/A' }))}
                                          />
                                   </div>
                                   <div className="sm:w-full xl:w-1/5">
                                          <DropDownMenu
                                                 ref={dropdownStatusRef}
                                                 iconMenu={<SettingFilter />}
                                                 handleOpen={handleOpenStatus}
                                                 handleOpenOption={handleOptionStatus}
                                                 stateoption={selectedOptionStatus}
                                                 openMenu={openStatus}
                                                 // options={bundles.map(bundle => ({ name: bundle.status===1?"Active" :"Disable" || 'N/A' }))}
                                                 options={bundles.status || []}

                                          />
                                   </div>
                                   <div className="sm:w-full xl:w-1/12 xl:text-left">
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
                                                        <th className="min-w-[150px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Title</th>
                                                        <th className="min-w-[150px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Category</th>
                                                        <th className="min-w-[150px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Price</th>
                                                        <th className="min-w-[150px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Subjects</th>
                                                        <th className="min-w-[120px] sm:w-1/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Students</th>
                                                        <th className="min-w-[100px] sm:w-1/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Status</th>
                                                        <th className="min-w-[100px] sm:w-1/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Action</th>
                                                 </tr>
                                          </thead>
                                          <tbody className="w-full">
                                                 {bundles.map((bundle, index) => (

                                                        <tr className="w-full border-b-2" key={bundle.id}>
                                                               <td
                                                                      className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                               >
                                                                      {index + 1}
                                                               </td>
                                                               <td
                                                                      className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                               >
                                                                      {bundle?.name || 'Null'}
                                                               </td>
                                                               <td
                                                                      className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                               >
                                                                      {bundle.category?.name || 'Null'}
                                                               </td>
                                                               <td
                                                                      className="min-w-[150px] px-2 sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                               >
                                                                      {bundle.price_discount == undefined ? `${bundle?.price || 'null'}` :
                                                                             <>
                                                                                    <del className='text-mainColor'>{bundle?.price || 'Null'}</del>  / {bundle?.price_discount || 'Null'} EGP
                                                                             </>
                                                                      }
                                                               </td>
                                                               <td
                                                                      className="min-w-[120px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                               >
                                                                      {bundle?.subjects_count || 'Null'}
                                                               </td>
                                                               <td
                                                                      className="min-w-[120px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center  text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                               >
                                                                      <span className='text-thirdColor text-xl border-b-2 border-thirdColor'>
                                                                             <Link to={`students/${bundle.id}`}>
                                                                                    {bundle?.users_count || 'Null'}
                                                                             </Link>
                                                                      </span>
                                                               </td>
                                                               <td
                                                                      className="min-w-[120px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                               >
                                                                      {bundle?.status === 1 ? "Active" : "Disable" || 'Null'}
                                                               </td>

                                                               <td
                                                                      className="min-w-[100px] sm:min-w-[80px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                               >
                                                                      <div className="flex items-center justify-center gap-x-3">
                                                                             <Link to={`edit/${bundle.id}`} type="button">
                                                                                    <EditIcon />
                                                                             </Link>
                                                                             <button type="button" onClick={() => handleOpenDialog(bundle.id)}>
                                                                                    <DeleteIcon />
                                                                             </button>
                                                                             {openDialog === bundle.id && (
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
                                                                                                                                            You will delete {bundle?.name || "null"}
                                                                                                                                     </DialogTitle>
                                                                                                                              </div>
                                                                                                                       </div>
                                                                                                                </div>
                                                                                                                <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                                                                                       <button
                                                                                                                              type="button"
                                                                                                                              onClick={() => handleDelete(bundle.id)}
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
       )
}

export default BundlesPage