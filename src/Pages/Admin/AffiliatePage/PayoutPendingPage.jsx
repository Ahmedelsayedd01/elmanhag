import React, { useEffect, useState } from 'react'
import { ButtonAdd } from '../../../Components/Button'
import SearchBar from '../../../Components/SearchBar'
import { Link } from 'react-router-dom'
import Loading from '../../../Components/Loading'
import axios from 'axios'
import { useAuth } from '../../../Context/Auth'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { Wroning } from '../../../Components/Icons/All_Icons'
import InputCustom from '../../../Components/InputCustom'

const PayoutPendingPage = () => {
       const auth = useAuth();
       const [search, setSearch] = useState('')
       const [pending, setPending] = useState(null)
       const [isLoading, setIsLoading] = useState(false)
       const [stateChanged, setStateChanged] = useState(false)
       const [rejecteReason, setRejecteReason] = useState('')

       const [isRejecting, setIsRejecting] = useState(false);
       const [openDialog, setOpenDialog] = useState(null);

       const fetchPending = async () => {
              setIsLoading(true)
              try {
                     const response = await axios.get('http://62.84.185.153/plesk-site-preview/bcknd.elmanhag.com/https/62.84.185.153/admin/affilate/payouts', {
                            headers: {
                                   Authorization: `Bearer ${auth.user.token}`,
                            },
                     });
                     if (response.status === 200) {
                            setPending(response.data.payouts)
                            console.log('response', response)
                     } else {
                            console.error('Failed to unblock user:', response.status, response.statusText);
                     }
              } catch (error) {
                     console.error('Error unblocking user:', error);
              }
              finally {
                     setIsLoading(false)
              }
       }

       const handleOpenDialog = (pendingId) => {
              setOpenDialog(pendingId);
       };

       const handleCloseDialog = () => {
              setOpenDialog(null);
       };

       const handleRejecte = async (pendingId) => {
              setIsRejecting(true);
              const success = await rejectedPayout(pendingId, auth.user.token);
              setIsRejecting(false);
              handleCloseDialog();

              if (success) {
                     auth.toastSuccess('Payout rejected successfully!');
                     setRejecteReason('')
                     setStateChanged(!stateChanged)
              } else {
                     auth.toastError('Failed to rejected Payout.');
              }
       };

       const rejectedPayout = async (pendingId, authToken) => {
              try {
                     const response = await axios.post(`http://62.84.185.153/plesk-site-preview/bcknd.elmanhag.com/https/62.84.185.153/admin/affilate/payout/rejected/${pendingId}`, { 'rejected_reason ': rejecteReason }, {
                            headers: {
                                   Authorization: `Bearer ${authToken}`,
                            },
                     });

                     if (response.status === 200) {
                            console.log('Payout rejected successfully');
                            return true;
                     } else {
                            console.error('Failed to reject Payout:', response.status, response.statusText);
                            return false;
                     }
              } catch (error) {
                     console.error('Error rejecting Payout:', error);
                     return false;
              }
       };

       const handleApprove = async (pendingId) => {
              // setIsLoading(true)
              setStateChanged(!stateChanged)
              try {
                     const response = await axios.post(`http://62.84.185.153/plesk-site-preview/bcknd.elmanhag.com/https/62.84.185.153/admin/affilate/payout/approve/${pendingId}`, {}, {
                            headers: {
                                   Authorization: `Bearer ${auth.user.token}`,
                            },
                     });

                     if (response.status === 200) {
                            auth.toastSuccess('Payout Approve successfully')
                     } else {
                            auth.toastError('Payout Failed to Approve')
                     }
              } catch (error) {
                     auth.toastError('Error', error)
                     console.error('Error deleting Subject:', error);
              } /* finally {

                            setIsLoading(false)
                     } */
       };


       useEffect(() => {
              fetchPending(); // Fetch Pending initially and whenever studentsChanged changes
       }, [stateChanged]);

       useEffect(() => {
              console.log('pending', pending)

       }, [pending])

       if (isLoading) {
              return (
                     <div className="w-1/4 h-full flex items-start mt-[10%] justify-center m-auto">
                            <Loading />
                     </div>
              );
       }

       if (!pending) {
              return (
                     <>
                            <div className='text-mainColor text-2xl font-bold w-full h-full flex flex-col gap-y-3 items-center mt-52'>
                                   <span>No Pending data available</span>
                            </div>
                     </>
              )

       }
       return (
              <>
                     <div className="w-full flex flex-col gap-y-3">
                            <div className="w-full flex items-center justify-start gap-6">
                                   <div className="sm:w-full xl:w-2/5">
                                          <SearchBar type='text' pr={'pr-4'} placeholder={'Search By Date Range'} handleChange={(e) => setSearch(search)} value={search} bg={"white"} />
                                   </div>
                                   {/* <Link to="add">
                                          <ButtonAdd Text={"Add"} BgColor={"white"} Color={"thirdColor"} iconColor="mainColor" Size={"xl"} />
                                   </Link> */}
                            </div>
                            <div className="w-full flex items-center justify-between mt-4 overflow-x-auto">
                                   <table className="w-full sm:min-w-0">

                                          <thead className="w-full">
                                                 <tr className="w-full border-b-2">
                                                        <th className="min-w-[80px] sm:w-1/12 lg:w-[8%] text-mainColor text-center font-medium text-xs sm:text-sm lg:text-base xl:text-lg pb-3">#</th>
                                                        <th className="min-w-[150px] sm:w-[20%] lg:w-[18%] text-mainColor text-center font-medium text-xs sm:text-sm lg:text-base xl:text-lg pb-3">Description</th>
                                                        <th className="min-w-[150px] sm:w-[20%] lg:w-[15%] text-mainColor text-center font-medium text-xs sm:text-sm lg:text-base xl:text-lg pb-3">Date</th>
                                                        <th className="min-w-[120px] sm:w-[18%] lg:w-[14%] text-mainColor text-center font-medium text-xs sm:text-sm lg:text-base xl:text-lg pb-3">Amount</th>
                                                        <th className="min-w-[120px] sm:w-[12%] lg:w-[10%] text-mainColor text-center font-medium text-xs sm:text-sm lg:text-base xl:text-lg pb-3">Status</th>
                                                 </tr>
                                          </thead>
                                          <tbody className="w-full">
                                                 {pending.map((pending, index) => (
                                                        <tr className="w-full border-b-2" key={pending.id}>
                                                               <td
                                                                      className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                               >
                                                                      {index + 1}
                                                               </td>
                                                               <td
                                                                      className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                               >
                                                                      {pending?.description || "-"}
                                                               </td>
                                                               <td
                                                                      className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                               >
                                                                      {pending?.date || "-"}
                                                               </td>
                                                               <td
                                                                      className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                               >
                                                                      {pending?.amount || "-"}
                                                               </td>
                                                               <td
                                                                      className="min-w-[120px] sm:min-w-[80px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                               >
                                                                      {/* {pending.status == null ? <span className='text-green-500'>Aprrove</span>
                                                                             : <span className='text-mainColor'>Rejected</span>
                                                                      } */}
                                                                      <div className="flex items-center justify-center gap-x-3">
                                                                             <button type="button" className='bg-green-500 text-center px-4 py-2 rounded-xl text-white' onClick={() => handleApprove(pending.id)}>
                                                                                    {/* {isLoading ? <div className='w-9'><Loading /></div> : 'Approve'} */}
                                                                                    Approve
                                                                             </button>
                                                                             <button type="button" className='bg-mainColor text-center px-4 py-2 rounded-xl text-white' onClick={() => handleOpenDialog(pending.id)}>
                                                                                    Rejected
                                                                             </button>
                                                                             {openDialog === pending.id && (
                                                                                    <Dialog
                                                                                           open={true} onClose={handleCloseDialog} className="relative z-10">
                                                                                           <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                                                                                           <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                                                                                                  <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                                                                                         <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                                                                                                <div className="flex flex-col items-center justify-center bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                                                                                                       <Wroning Width='28' Height='28' aria-hidden="true" />
                                                                                                                       <div className="w-full flex items-center">
                                                                                                                              <div className="w-full mt-2 text-center">
                                                                                                                                     <DialogTitle as="h3" className="text-xl font-semibold leading-10 text-gray-900">
                                                                                                                                            <div className="w-full">
                                                                                                                                                   <InputCustom
                                                                                                                                                          type="text"
                                                                                                                                                          placeholder="Why you will rejecte this payout ..."
                                                                                                                                                          value={rejecteReason}
                                                                                                                                                          onChange={(e) => setRejecteReason(e.target.value)}
                                                                                                                                                   />
                                                                                                                                            </div>
                                                                                                                                     </DialogTitle>
                                                                                                                              </div>
                                                                                                                       </div>
                                                                                                                </div>
                                                                                                                <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                                                                                       <button
                                                                                                                              type="button"
                                                                                                                              onClick={() => handleRejecte(pending.id)}
                                                                                                                              disabled={isRejecting}
                                                                                                                              className="inline-flex w-full justify-center rounded-md bg-mainColor px-6 py-3 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto"
                                                                                                                       >
                                                                                                                              {isRejecting ? <div className="flex w-10 h-5"><Loading /></div> : 'Rejecte'}
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

export default PayoutPendingPage