import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../../Context/Auth';
import Loading from '../../../../Components/Loading';
import axios from 'axios';

const ComplaintsPage = () => {

       const auth = useAuth();
       const [complaints, setComplaints] = useState(null)
       const [isLoading, setIsLoading] = useState(false)
       const [stateChanged, setStateChanged] = useState(false)


       const fetchComplaints = async () => {
              setIsLoading(true)
              try {
                     const response = await axios.get('https://bcknd.elmanhag.com/admin/complaint', {
                            headers: {
                                   Authorization: `Bearer ${auth.user.token}`,
                            },
                     });
                     if (response.status === 200) {
                            setComplaints(response.data.complaints)
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

       const handleStatus = async (complaintId, studentName, status) => {
              try {
                     const response = await axios.put(`https://bcknd.elmanhag.com/admin/complaint/active/${complaintId}`, { status }, {
                            headers: {
                                   Authorization: `Bearer ${auth.user.token}`,
                            },
                     });

                     if (response.status === 200) {
                            setStateChanged(!stateChanged)
                            auth.toastSuccess(`${studentName}'s complaint activated successfully`)
                            console.log("responsesssd", response)
                     } else {
                            auth.toastError(`Failed to ${response.data?.success || "activate complaint"}`);
                     }
              } catch (error) {
                     auth.toastError('Error', error)
                     console.error('Error change Status student:', error);
              }
       };



       useEffect(() => {
              fetchComplaints(); // Fetch complaints initially and whenever studentsChanged changes
       }, [stateChanged]);

       useEffect(() => {
              console.log('complaints', complaints)

       }, [complaints])

       if (isLoading) {
              return (
                     <div className="w-1/4 h-full flex items-start mt-[10%] justify-center m-auto">
                            <Loading />
                     </div>
              );
       }

       if (!complaints) {
              return (
                     <>
                            <div className='text-mainColor text-2xl font-bold w-full h-full flex flex-col gap-y-3 items-center mt-52'>
                                   <span>No Complaints available</span>
                            </div>
                     </>
              )

       }
       return (
              <>
                     <div className="w-full flex items-center justify-between mt-4 overflow-x-auto">
                            <table className="w-full sm:min-w-0">

                                   <thead className="w-full">
                                          <tr className="w-full border-b-2">
                                                 <th className="min-w-[80px] sm:w-1/12 lg:w-[8%] text-mainColor text-center font-medium text-xs sm:text-sm lg:text-base xl:text-lg pb-3">#</th>
                                                 <th className="min-w-[150px] sm:w-[20%] lg:w-[15%] text-mainColor text-center font-medium text-xs sm:text-sm lg:text-base xl:text-lg pb-3">student</th>
                                                 <th className="min-w-[150px] sm:w-[20%] lg:w-[18%] text-mainColor text-center font-medium text-xs sm:text-sm lg:text-base xl:text-lg pb-3">complaint</th>
                                                 <th className="min-w-[120px] sm:w-[12%] lg:w-[10%] text-mainColor text-center font-medium text-xs sm:text-sm lg:text-base xl:text-lg pb-3">Status</th>
                                          </tr>
                                   </thead>
                                   <tbody className="w-full">
                                          {complaints.map((complaint, index) => (
                                                 <tr className="w-full border-b-2" key={complaint.id}>
                                                        <td
                                                               className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                        >
                                                               {index + 1}
                                                        </td>
                                                        <td
                                                               className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                        >
                                                               {complaint?.student?.name || "-"}
                                                        </td>
                                                        <td
                                                               className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                        >
                                                               {complaint?.complaint || "-"}
                                                        </td>
                                                        <td
                                                               className="min-w-[120px] sm:min-w-[80px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                        >
                                                               <div className="flex items-center justify-center gap-x-3">

                                                                      {complaint.status === 0 && (
                                                                             <button
                                                                                    className="bg-green-500 text-white px-4 py-2 rounded-lg"
                                                                                    onClick={() => handleStatus(complaint.id, complaint?.student?.name, 1)}
                                                                             >
                                                                                    Active
                                                                             </button>
                                                                      )}

                                                               </div>
                                                        </td>
                                                 </tr>
                                          ))}
                                   </tbody>
                            </table>
                     </div>
              </>
       )
}

export default ComplaintsPage