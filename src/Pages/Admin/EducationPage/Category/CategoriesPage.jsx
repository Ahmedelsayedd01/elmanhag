import React, { useEffect, useRef, useState } from 'react';
import Loading from '../../../../Components/Loading';
import { useAuth } from '../../../../Context/Auth';
import { ButtonAdd } from '../../../../Components/Button';
import EditIcon from '../../../../Components/Icons/AdminIcons/EditIcon';
import DeleteIcon from '../../../../Components/Icons/AdminIcons/DeleteIcon';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { Wroning } from '../../../../Components/Icons/All_Icons';

const CategoriesPage = () => {
       const auth = useAuth();
       const [isLoading, setIsLoading] = useState(true);
       const [allCategories, setAllCategories] = useState(null);
       const [categories, setCategories] = useState(null);
       const [categoriesChanged, setCategoriesChanged] = useState(false); // Change tracker
       const [parentCategories, setParentCategories] = useState(); // Change tracker

       const [isDeleting, setIsDeleting] = useState(false);
       const [openDialog, setOpenDialog] = useState(null);

       const fetchCategories = async () => {
              setIsLoading(true);
              try {
                     const response = await axios.get('https://bdev.elmanhag.shop/admin/category', {
                            headers: {
                                   Authorization: `Bearer ${auth.user.token}`,
                            },
                     });
                     if (response.status === 200) {
                            // setCategories(response.data);
                            setAllCategories(response.data);
                            setCategories(response.data.categories);
                            // setParentCategories(response.data.parent_categories);
                     }
              } catch (error) {
                     console.error('Error fetching Categories data:', error);
              } finally {
                     setIsLoading(false);
              }
       };

       useEffect(() => {
              fetchCategories(); // Fetch Categories initially and whenever categoriesChanged changes
       }, [categoriesChanged]);

       const handleOpenDialog = (categoriesId) => {
              setOpenDialog(categoriesId);
       };

       const handleCloseDialog = () => {
              setOpenDialog(null);
       };

       const handleDelete = async (categoriesId) => {
              setIsDeleting(true);
              const success = await deleteCategories(categoriesId, auth.user.token);
              setIsDeleting(false);
              handleCloseDialog();

              if (success) {
                     auth.toastSuccess('Category deleted successfully!');
                     setCategoriesChanged(!categoriesChanged)
              } else {
                     auth.toastError('Failed to delete category.');
              }
       };

       const deleteCategories = async (categoriesId, authToken) => {
              try {
                     const response = await axios.delete(`https://bdev.elmanhag.shop/admin/category/delete/${categoriesId}`, {
                            headers: {
                                   Authorization: `Bearer ${authToken}`,
                            },
                     });

                     if (response.status === 200) {
                            console.log('Categories deleted successfully');
                            return true;
                     } else {
                            console.error('Failed to delete Categories:', response.status, response.statusText);
                            return false;
                     }
              } catch (error) {
                     console.error('Error deleting categories:', error);
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

       if (!categories) {
              return <div className='text-mainColor text-2xl font-bold w-full h-full flex items-center justify-center'>No Categories data available</div>;
       }

       localStorage.setItem("Categories", JSON.stringify(allCategories));


       return (
              <>
                     <div className="w-full flex flex-col gap-y-3">
                            <div className="sm:w-full xl:w-1/12">
                                   <Link to="add">
                                          <ButtonAdd Text={"Add"} BgColor={"white"} Color={"thirdColor"} iconColor="mainColor" Size={"xl"} />
                                   </Link>
                            </div>
                            <div className="w-full flex items-center justify-between mt-4 overflow-x-auto">
                                   <table className="w-full sm:min-w-0">
                                          <thead className="w-full">
                                                 <tr className="w-full border-b-2">
                                                        <th className="min-w-[80px] sm:w-1/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">#</th>
                                                        <th className="min-w-[150px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Name</th>
                                                        <th className="min-w-[150px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Parent Category</th>
                                                        <th className="min-w-[120px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Status</th>
                                                        <th className="min-w-[120px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Action</th>
                                                 </tr>
                                          </thead>
                                          <tbody className="w-full">
                                                 {categories.map((category, index) => (
                                                        <tr className="w-full border-b-2" key={category.id}>
                                                               <td
                                                                      className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                               >
                                                                      {index + 1}
                                                               </td>
                                                               <td
                                                                      className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                               >
                                                                      {category?.name || "null"}
                                                               </td>
                                                               <td
                                                                      className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                               >
                                                                      {category.parent_category?.name || "null"}
                                                               </td>
                                                               <td
                                                                      className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                               >
                                                                      {category.status === 1 ? "Active" : "Disabled"}
                                                               </td>
                                                               <td
                                                                      className="min-w-[100px] sm:min-w-[80px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                               >
                                                                      <div className="flex items-center justify-center gap-x-3">
                                                                             <Link to={`edit/${category.id}`} type="button">
                                                                                    <EditIcon />
                                                                             </Link>
                                                                             <button type="button" onClick={() => handleOpenDialog(category.id)}>
                                                                                    <DeleteIcon />
                                                                             </button>
                                                                             {openDialog === category.id && (
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
                                                                                                                                            You will delete {category?.name || "null"}
                                                                                                                                     </DialogTitle>
                                                                                                                              </div>
                                                                                                                       </div>
                                                                                                                </div>
                                                                                                                <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                                                                                       <button
                                                                                                                              type="button"
                                                                                                                              onClick={() => handleDelete(category.id)}
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



export default CategoriesPage