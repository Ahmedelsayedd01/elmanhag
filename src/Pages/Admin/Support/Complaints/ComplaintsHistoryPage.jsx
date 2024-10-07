import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../../Context/Auth';
import Loading from '../../../../Components/Loading';
import axios from 'axios';

const ComplaintsHistoryPage = () => {

       const auth = useAuth();
       const [complaintsHistory, setComplaintsHistory] = useState(null)
       const [isLoading, setIsLoading] = useState(false)
       const [stateChanged, setStateChanged] = useState(false)


       const fetchComplaintsHistory = async () => {
              setIsLoading(true)
              try {
                     const response = await axios.get('https://bdev.elmanhag.shop/admin/complaint/history', {
                            headers: {
                                   Authorization: `Bearer ${auth.user.token}`,
                            },
                     });
                     if (response.status === 200) {
                            setComplaintsHistory(response.data.complaints)
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

       useEffect(() => {
              fetchComplaintsHistory(); // Fetch complaints initially and whenever studentsChanged changes
       }, [stateChanged]);

       useEffect(() => {
              console.log('complaintsHistory', complaintsHistory)

       }, [complaintsHistory])

       if (isLoading) {
              return (
                     <div className="w-1/4 h-full flex items-start mt-[10%] justify-center m-auto">
                            <Loading />
                     </div>
              );
       }

       if (!complaintsHistory) {
              return (
                     <>
                            <div className='text-mainColor text-2xl font-bold w-full h-full flex flex-col gap-y-3 items-center mt-52'>
                                   <span>No Complaints History available</span>
                            </div>
                     </>
              )

       }
       return (
              <>
                     <div className="w-full flex items-center justify-between mt-4 overflow-x-auto">
                            <table className="w-full sm:min-w-0 border-separate border-spacing-0">
                                   <thead className="w-full">
                                          <tr className="w-full border-b-2 border-gray-300">
                                                 <th className="min-w-[80px] sm:w-1/12 lg:w-[8%] text-mainColor text-center font-medium text-xs sm:text-sm lg:text-base xl:text-lg py-3">
                                                        #
                                                 </th>
                                                 <th className="min-w-[150px] sm:w-[20%] lg:w-[15%] text-mainColor text-center font-medium text-xs sm:text-sm lg:text-base xl:text-lg py-3">
                                                        Student
                                                 </th>
                                                 <th className="min-w-[150px] sm:w-[20%] lg:w-[18%] text-mainColor text-center font-medium text-xs sm:text-sm lg:text-base xl:text-lg py-3">
                                                        Complaint
                                                 </th>
                                          </tr>
                                   </thead>
                                   <tbody className="w-full">
                                          {complaintsHistory.map((complaint, index) => (
                                                 <tr className="w-full border-b hover:bg-gray-50" key={complaint.id}>
                                                        <td
                                                               className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                        >
                                                               {index + 1}
                                                        </td>
                                                        <td
                                                               className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 px-3 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden truncate"
                                                        >
                                                               {complaint?.student?.name || "-"}
                                                        </td>
                                                        <td
                                                               className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 px-3 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden truncate"
                                                        >
                                                               {complaint?.complaint || "-"}
                                                        </td>
                                                 </tr>
                                          ))}
                                   </tbody>
                            </table>
                     </div>

              </>
       )
}

export default ComplaintsHistoryPage