import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../../Context/Auth";
import { ButtonAdd } from "../../../Components/Button";
import EditIcon from "../../../Components/Icons/AdminIcons/EditIcon";
import DeleteIcon from "../../../Components/Icons/AdminIcons/DeleteIcon";
import axios from "axios";
import InputCustom from "../../../Components/InputCustom";
import { Link } from "react-router-dom";
import {
       Dialog,
       DialogBackdrop,
       DialogPanel,
       DialogTitle,
} from "@headlessui/react";
import { Wroning } from "../../../Components/Icons/All_Icons";
import Loading from "../../../Components/Loading";

const RevisionPage = () => {

       const auth = useAuth();
       const [isLoading, setIsLoading] = useState(false);
       const [livesRecorded, setLivesRecorded] = useState([]);
       const [livesRecordedChanged, setLivesRecordedChanged] = useState(false); // Change tracker

       const [isDeleting, setIsDeleting] = useState(false);
       const [openDialog, setOpenDialog] = useState(null);

       const fetchLivesRecorded = async () => {
              setIsLoading(true);
              try {
                     const response = await axios.get(
                            "http://62.84.185.153/plesk-site-preview/bcknd.elmanhag.com/https/62.84.185.153/admin/revisions",
                            {
                                   headers: {
                                          Authorization: `Bearer ${auth.user.token}`,
                                   },
                            }
                     );
                     if (response.status === 200) {
                            console.log('response Recorded Live', response.data);
                            setLivesRecorded(response.data.revision);
                     }
              } catch (error) {
                     console.error("Error fetching Lives Recorded data:", error);
              } finally {
                     setIsLoading(false);
              }
       };

       useEffect(() => {
              fetchLivesRecorded(); // Fetch lives initially and whenever livesRecordedChanged changes
       }, [livesRecordedChanged]);

       const handleOpenDialog = (liveId) => {
              setOpenDialog(liveId);
       };

       const handleCloseDialog = () => {
              setOpenDialog(null);
       };

       const handleDelete = async (livesRecordedId) => {
              setIsDeleting(true);
              const success = await deleteLivesRecorded(livesRecordedId, auth.user.token);
              setIsDeleting(false);
              handleCloseDialog();

       };

       const deleteLivesRecorded = async (livesRecordedId, authToken) => {
              try {
                     const response = await axios.delete(
                            `http://62.84.185.153/plesk-site-preview/bcknd.elmanhag.com/https/62.84.185.153/admin/revisions/delete/${livesRecordedId}`,
                            {
                                   headers: {
                                          Authorization: `Bearer ${authToken}`,
                                   },
                            }
                     );

                     if (response.status === 200) {
                            auth.toastSuccess('Recorded Live deleted successfully!')
                            setLivesRecordedChanged(!livesRecordedChanged)
                            return true;
                     } else {
                            auth.toastError('Failed to delete Recorded Live.')
                            console.error(
                                   "Failed to recorded delete Live.",
                                   response.status,
                                   response.statusText
                            );
                            return false;
                     }
              } catch (error) {
                     console.error("Error deleting Recorded Lives:", error);
                     return false;
              }
       };

       return (
              <>
                     <div className="w-full flex flex-col gap-y-3">
                            <div className="w-full flex items-center">
                                   <Link to="add">
                                          <ButtonAdd
                                                 Text={"Add"}
                                                 BgColor={"white"}
                                                 Color={"thirdColor"}
                                                 iconColor="mainColor"
                                                 Size={"xl"}
                                          />
                                   </Link>
                            </div>

                            {isLoading ? <>
                                   <div className="w-1/4 h-full flex items-start mt-[10%] justify-center m-auto">
                                          <Loading />
                                   </div>
                            </> :

                                   livesRecorded.length === 0 ?
                                          <div className="text-mainColor text-2xl font-bold w-full h-full flex items-center justify-center mt-44">
                                                 No Lives data available
                                          </div>
                                          :
                                          <div className="w-full flex items-center justify-between mt-4 overflow-x-auto">
                                                 <table className="w-full sm:min-w-0">
                                                        <thead className="w-full">
                                                               <tr className="w-full border-b-2">
                                                                      <th className="min-w-[80px] sm:w-1/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">
                                                                             #
                                                                      </th>
                                                                      <th className="min-w-[150px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">
                                                                             Title
                                                                      </th>
                                                                      <th className="min-w-[150px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">
                                                                             Education
                                                                      </th>
                                                                      <th className="min-w-[150px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">
                                                                             Semester
                                                                      </th>
                                                                      <th className="min-w-[150px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">
                                                                             Category
                                                                      </th>
                                                                      <th className="min-w-[150px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">
                                                                             Subject
                                                                      </th>
                                                                      <th className="min-w-[150px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">
                                                                             Expire Date
                                                                      </th>
                                                                      <th className="min-w-[120px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">
                                                                             Price
                                                                      </th>
                                                                      <th className="min-w-[120px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">
                                                                             Type
                                                                      </th>
                                                                      <th className="min-w-[120px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">
                                                                             Month
                                                                      </th>
                                                                      <th className="min-w-[120px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">
                                                                             Status
                                                                      </th>
                                                                      <th className="min-w-[120px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">
                                                                             Action
                                                                      </th>
                                                               </tr>
                                                        </thead>
                                                        <tbody className="w-full">
                                                               {livesRecorded.map((revision, index) => (
                                                                      <tr className="w-full border-b-2" key={revision.id}>
                                                                             <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                                    {index + 1}
                                                                             </td>
                                                                             <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                                    {revision?.title || "-"}
                                                                             </td>
                                                                             <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                                    {revision?.education?.name || "-"}
                                                                             </td>

                                                                             <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                                    {revision?.semester || "-"}
                                                                             </td>
                                                                             <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                                    {revision?.category?.name || "-"}
                                                                             </td>
                                                                             <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                                    {revision.subject?.name || "-"}
                                                                             </td>
                                                                             <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                                    {revision?.expire_date || "-"}
                                                                             </td>
                                                                             <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                                    {revision.price || '-'}
                                                                             </td>
                                                                             <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                                    {revision.type || '-'}
                                                                             </td>
                                                                             <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                                    {revision.month || '-'}
                                                                             </td>
                                                                             <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-4 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                                    {revision.status === 1 && (
                                                                                           <span
                                                                                                  className="bg-green-500 text-white px-4 py-2 rounded-lg"
                                                                                           >
                                                                                                  Active
                                                                                           </span>
                                                                                    )}
                                                                                    {revision.status === 0 && (
                                                                                           <span
                                                                                                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                                                                                           >
                                                                                                  Unactive
                                                                                           </span>
                                                                                    )}
                                                                             </td>
                                                                             <td className="min-w-[100px] sm:min-w-[80px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                                                    <div className="flex items-center justify-center gap-x-3">
                                                                                           <Link to={`edit/${revision.id}`} type="button">
                                                                                                  <EditIcon />
                                                                                           </Link>
                                                                                           <button
                                                                                                  type="button"
                                                                                                  onClick={() => handleOpenDialog(revision.id)}
                                                                                           >
                                                                                                  <DeleteIcon />
                                                                                           </button>
                                                                                           {openDialog === revision.id && (
                                                                                                  <Dialog
                                                                                                         open={true}
                                                                                                         onClose={handleCloseDialog}
                                                                                                         className="relative z-10"
                                                                                                  >
                                                                                                         <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                                                                                                         <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                                                                                                                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                                                                                                       <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                                                                                                              <div className="flex flex-col items-center justify-center bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                                                                                                                     <Wroning
                                                                                                                                            Width="28"
                                                                                                                                            Height="28"
                                                                                                                                            aria-hidden="true"
                                                                                                                                     />
                                                                                                                                     <div className="flex items-center">
                                                                                                                                            <div className="mt-2 text-center">
                                                                                                                                                   <DialogTitle
                                                                                                                                                          as="h3"
                                                                                                                                                          className="text-xl font-semibold leading-10 text-gray-900"
                                                                                                                                                   >
                                                                                                                                                          You will delete revision {revision?.title || "-"}
                                                                                                                                                   </DialogTitle>
                                                                                                                                            </div>
                                                                                                                                     </div>
                                                                                                                              </div>
                                                                                                                              <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                                                                                                     <button
                                                                                                                                            type="button"
                                                                                                                                            onClick={() => handleDelete(revision.id)}
                                                                                                                                            disabled={isDeleting}
                                                                                                                                            className="inline-flex w-full justify-center rounded-md bg-mainColor px-6 py-3 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto"
                                                                                                                                     >
                                                                                                                                            {isDeleting ? (
                                                                                                                                                   <div className="flex w-10 h-5">
                                                                                                                                                          <Loading />
                                                                                                                                                   </div>
                                                                                                                                            ) : (
                                                                                                                                                   "Delete"
                                                                                                                                            )}
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
                            }

                     </div>
              </>
       );
};

export default RevisionPage;
