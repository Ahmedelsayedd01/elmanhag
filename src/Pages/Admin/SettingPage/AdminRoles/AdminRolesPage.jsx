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

       // const [paymentMethod, setPaymentMethod] = useState(null)
       // const [paymentMethodChanged, setPaymentMethodChanged] = useState(false); // Change tracker

       // const [isDeleting, setIsDeleting] = useState(false);
       // const [openDialog, setOpenDialog] = useState(null);

       // const handleCloseDialog = () => {
       //        setOpenDialog(null);
       // };

       // const fetchPaymentMethod = async () => {
       //        setIsLoading(true);
       //        try {
       //               const response = await axios.get('https://bdev.elmanhag.shop/admin/affilate/affilateMethod', {
       //                      headers: {
       //                             Authorization: `Bearer ${auth.user.token}`,
       //                      },
       //               });
       //               if (response.status === 200) {
       //                      setPaymentMethod(response.data.payment_methods);
       //                      console.log('responce', response)
       //               }
       //        } catch (error) {
       //               console.error('Error fetching Payment Method data:', error);
       //        } finally {
       //               setIsLoading(false);
       //        }
       // };

       // const handleOpenDialog = (paymentMethodId) => {
       //        setOpenDialog(paymentMethodId);
       // };

       // const handleDelete = async (paymentMethodId, methodName) => {
       //        setIsDeleting(true);
       //        const success = await deletePaymentMethod(paymentMethodId, auth.user.token);
       //        setIsDeleting(false);
       //        handleCloseDialog();

       //        if (success) {
       //               auth.toastSuccess(`${methodName} Deleted successfully!`);
       //               setPaymentMethodChanged(!paymentMethodChanged)
       //        } else {
       //               auth.toastError(`Failed to delete ${methodName}`);
       //        }
       // };
       // const deletePaymentMethod = async (paymentMethodId, authToken) => {
       //        try {
       //               const response = await axios.delete(`https://bdev.elmanhag.shop/admin/affilate/affilateMethodDelete/${paymentMethodId}`, {
       //                      headers: {
       //                             Authorization: `Bearer ${authToken}`,
       //                      },
       //               });

       //               if (response.status === 200) {
       //                      console.log('Payment Method deleted successfully');
       //                      return true;
       //               } else {
       //                      console.error('Failed to Deleted Payment Method:', response.status, response.statusText);
       //                      return false;
       //               }
       //        } catch (error) {
       //               console.error('Error deleting Payment Method:', error);
       //               return false;
       //        }
       // };



       // useEffect(() => {
       //        fetchPaymentMethod(); // Fetch PaymentMethod initially and whenever studentsChanged changes
       // }, [paymentMethodChanged]);

       // useEffect(() => {
       //        console.log('PaymentMethod', paymentMethod)

       // }, [paymentMethod])



       if (isLoading) {
              return (
                     <div className="w-1/4 h-full flex items-start mt-[10%] justify-center m-auto">
                            <Loading />
                     </div>
              );
       }
       // if (!paymentMethod) {
       //        return <div className='text-mainColor text-2xl font-bold w-full h-full flex items-center justify-center'>No Payment Method data available</div>;
       // }
       return (
              <>
                     <div className="w-full">
                            <div className="sm:w-full xl:w-1/12 text-start">
                                   <Link to="add">
                                          <ButtonAdd Text={"Add"} BgColor={"white"} Color={"thirdColor"} Size={"xl"} />
                                   </Link>
                            </div>
                            {/* <div className="w-full flex items-center justify-between mt-4 overflow-x-auto">
                                   <table className="w-full sm:min-w-0  border-collapse">
                                          <thead className="w-full">
                                                 <tr className="w-full border-b-2">
                                                        <th className="min-w-[80px] sm:w-1/12 lg:w-[8%] text-mainColor text-center font-medium text-xs sm:text-sm lg:text-base xl:text-lg pb-3">#</th>
                                                        <th className="min-w-[120px] sm:w-[18%] lg:w-[14%] text-mainColor text-center font-medium text-xs sm:text-sm lg:text-base xl:text-lg pb-3">Method</th>
                                                        <th className="min-w-[150px] sm:w-[20%] lg:w-[18%] text-mainColor text-center font-medium text-xs sm:text-sm lg:text-base xl:text-lg pb-3">Thumbnail</th>
                                                        <th className="min-w-[120px] sm:w-[12%] lg:w-[10%] text-mainColor text-center font-medium text-xs sm:text-sm lg:text-base xl:text-lg pb-3">Min Payout</th>
                                                        <th className="min-w-[150px] sm:w-[20%] lg:w-[15%] text-mainColor text-center font-medium text-xs sm:text-sm lg:text-base xl:text-lg pb-3">Status</th>
                                                        <th className="min-w-[100px] sm:w-[8%] lg:w-[6%] text-mainColor text-center font-medium text-xs sm:text-sm lg:text-base xl:text-lg pb-3">Action</th>
                                                 </tr>
                                          </thead>
                                          <tbody className="w-full">
                                                 {paymentMethod.map((paymentMethod, index) => (
                                                        <tr className="w-full border-b-2" key={paymentMethod.id}>
                                                               <td
                                                                      className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                               >
                                                                      {index + 1}
                                                               </td>
                                                               <td
                                                                      className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                               >
                                                                      {paymentMethod?.method || "-"}
                                                               </td>
                                                               <td
                                                                      className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 p-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                               >
                                                                      <img src={paymentMethod?.thumbnail || "-"} className='imgTable' alt="Photo" />
                                                               </td>
                                                               <td
                                                                      className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                               >
                                                                      {paymentMethod?.min_payout || "0"}
                                                               </td>
                                                               <td
                                                                      className="min-w-[120px] sm:min-w-[80px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                               >
                                                                      {paymentMethod.status === 1 ? <span className='text-green-500'>Active</span> : <span className='text-mainColor'>Disabled</span>}
                                                               </td>

                                                               <td
                                                                      className="min-w-[100px] sm:min-w-[80px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                               >
                                                                      <div className="flex items-center justify-center gap-x-3">
                                                                             <Link to={`edit/${paymentMethod.id}`} state={paymentMethod.id} type="button">
                                                                                    <EditIcon />
                                                                             </Link>
                                                                             <button type="button" className='outline-0' onClick={() => handleOpenDialog(paymentMethod.id)}>
                                                                                    <DeleteIcon />
                                                                             </button>
                                                                             {openDialog === paymentMethod.id && (
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
                                                                                                                                            You will delete {paymentMethod?.method || "-"}
                                                                                                                                     </DialogTitle>
                                                                                                                              </div>
                                                                                                                       </div>
                                                                                                                </div>
                                                                                                                <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                                                                                       <button
                                                                                                                              type="button"
                                                                                                                              onClick={() => handleDelete(paymentMethod.id, paymentMethod.method)}
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

                            </div> */}
                     </div>
              </>
       )
}

export default AdminRolesPage