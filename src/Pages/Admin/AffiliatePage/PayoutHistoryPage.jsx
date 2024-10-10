import React, { useEffect, useState } from 'react'
import { ButtonAdd } from '../../../Components/Button'
import SearchBar from '../../../Components/SearchBar'
import { Link } from 'react-router-dom'
import Loading from '../../../Components/Loading'
import axios from 'axios'
import { useAuth } from '../../../Context/Auth'

const PayoutHistoryPage = () => {
       const auth = useAuth();
       const [search, setSearch] = useState('')
       const [histories, setHistories] = useState(null)
       const [isLoading, setIsLoading] = useState(false)

       const fetchHistories = async () => {
              setIsLoading(true)
              try {
                     const response = await axios.get('https://bdev.elmanhag.shop/admin/affilate/payoutsHistory', {
                            headers: {
                                   Authorization: `Bearer ${auth.user.token}`,
                            },
                     });
                     if (response.status === 200) {
                            setHistories(response.data.payouts)
                            console.log('response', response)
                     } else {
                            console.error('Failed to unblock Histories:', response.status, response.statusText);
                     }
              } catch (error) {
                     console.error('Error unblocking Histories:', error);
              }
              finally {
                     setIsLoading(false)
              }
       }


       useEffect(() => {
              fetchHistories();
       }, []);  // Or include dependencies if needed


       useEffect(() => {
              console.log('Histories', histories)

       }, [histories])

       if (isLoading) {
              return (
                     <div className="w-1/4 h-full flex items-start mt-[10%] justify-center m-auto">
                            <Loading />
                     </div>
              );
       }
       if (!histories) {
              return (
                     <>
                            <div className='text-mainColor text-2xl font-bold w-full h-full flex flex-col gap-y-3 items-center mt-52'>
                                   <span>No History data available</span>
                            </div>
                     </>
              )

       }
       return (
              <>
                     <div className="w-full flex flex-col gap-y-3">
                            <div className="w-full flex items-center justify-start gap-6">
                                   <div className="sm:w-full xl:w-2/5">
                                          <SearchBar type='text' pr={'pr-4'} placeholder={'Search By Date Range'} handleChange={(e) => setSearch(e.target.value)} value={search} bg={"white"} />

                                   </div>
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
                                                 {histories.map((history, index) => (
                                                        <tr className="w-full border-b-2" key={history.id}>
                                                               <td
                                                                      className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                               >
                                                                      {index + 1}
                                                               </td>
                                                               <td
                                                                      className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                               >
                                                                      {history?.description || "-"}
                                                               </td>
                                                               <td
                                                                      className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                               >
                                                                      {history?.date || "-"}
                                                               </td>
                                                               <td
                                                                      className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                               >
                                                                      {history?.amount || "0"}
                                                               </td>
                                                               <td
                                                                      className="min-w-[120px] sm:min-w-[80px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                               >
                                                                      {history.status == 1 ? <span className='text-green-500'>Approved</span> : <span className='text-mainColor'>Rejected</span>}
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

export default PayoutHistoryPage