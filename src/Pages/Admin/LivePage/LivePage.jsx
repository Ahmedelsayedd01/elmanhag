import React, { useEffect, useRef, useState } from 'react';
import Loading from '../../../Components/Loading';
import { useAuth } from '../../../Context/Auth';
import { ButtonAdd } from '../../../Components/Button';
import EditIcon from '../../../Components/Icons/AdminIcons/EditIcon';
import DeleteIcon from '../../../Components/Icons/AdminIcons/DeleteIcon';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { Wroning } from '../../../Components/Icons/All_Icons';

const LivePage = () => {

    const auth = useAuth();
    const [isLoading, setIsLoading] = useState(true);
    const [allLivesData, setAllLivesData] = useState(null);
    const [lives, setLives] = useState(null);
    const [liveTeacher, setLiveTeacher] = useState(null);
    const [liveSubject, setLiveSubject] = useState(null);
    const [livesChanged, setLivesChanged] = useState(false); // Change tracker

    const [isDeleting, setIsDeleting] = useState(false);
    const [openDialog, setOpenDialog] = useState(null);

    const fetchLives = async () => {
          setIsLoading(true);
          try {
                  const response = await axios.get('https://bdev.elmanhag.shop/admin/live', {
                        headers: {
                                Authorization: `Bearer ${auth.user.token}`,
                        },
                  });
                  if (response.status === 200) {
                      console.log(response.data)
                      setAllLivesData(response.data);
                      setLives(response.data.live);
                      setLiveTeacher(response.data.teachers);
                      setLiveSubject(response.data.subjects);
                  }
          } catch (error) {
                  console.error('Error fetching Lives data:', error);
          } finally {
                  setIsLoading(false);
          }
    };

    useEffect(() => {
          fetchLives(); // Fetch lives initially and whenever livesChanged changes
    }, [livesChanged]);

    const handleOpenDialog = (liveId) => {
          setOpenDialog(liveId);
    };

    const handleCloseDialog = () => {
          setOpenDialog(null);
    };

    const handleDelete = async (livesId) => {
          setIsDeleting(true);
          const success = await deleteLives(livesId, auth.user.token);
          setIsDeleting(false);
          handleCloseDialog();

          if (success) {
                  auth.toastSuccess('Live deleted successfully!');
                  setLivesChanged(!livesChanged)
          } else {
                  auth.toastError('Failed to Delete Live.');
          }
    };

    const deleteLives = async (livesId, authToken) => {
          try {
                  const response = await axios.delete(`https://bdev.elmanhag.shop/admin/live/delete/${livesId}`, {
                        headers: {
                                Authorization: `Bearer ${authToken}`,
                        },
                  });

                  if (response.status === 200) {
                        console.log('Lives deleted successfully');
                        return true;
                  } else {
                        console.error('Failed to delete Lives:', response.status, response.statusText);
                        return false;
                  }
          } catch (error) {
                  console.error('Error deleting Lives:', error);
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

    if (!lives) {
          return <div className='text-mainColor text-2xl font-bold w-full h-full flex items-center justify-center'>No Lives data available</div>;
    }

    localStorage.setItem("LivesData", JSON.stringify(allLivesData));
    localStorage.setItem("Lives", JSON.stringify(lives));

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
                                            <th className="min-w-[150px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Subject</th>
                                            <th className="min-w-[120px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Teacher</th>
                                            <th className="min-w-[120px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Date</th>
                                            <th className="min-w-[120px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Day</th>
                                            <th className="min-w-[150px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Time From</th>
                                            <th className="min-w-[150px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Time To</th>
                                            <th className="min-w-[120px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Price</th>
                                            <th className="min-w-[120px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Status</th>
                                            <th className="min-w-[120px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Action</th>

                                      </tr>
                              </thead>
                              <tbody className="w-full">
                                      {lives.map((live, index) => (
                                            <tr className="w-full border-b-2" key={live.id}>
                                                    <td
                                                          className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                    >
                                                          {index + 1}
                                                    </td>
                                                    <td
                                                          className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                    >
                                                          {live?.name || "null"}
                                                    </td>
                                                    <td
                                                          className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                    >
                                                          {live.subject?.name || "null"}
                                                    </td>
                                                    <td
                                                          className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                    >
                                                          {live.teacher?.name || "null"}
                                                    </td>
                                                    <td
                                                          className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                    >
                                                          {live?.date || "null"}
                                                    </td>
                                                    <td
                                                          className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                    >
                                                          {live?.day || "null"}
                                                    </td>
                                                    <td
                                                          className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                    >
                                                          {live?.from || "null"}
                                                    </td>
                                                    <td
                                                          className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                    >
                                                          {live?.to || "null"}
                                                    </td>
                                                    <td
                                                          className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                    >
                                                          {live?.price || "null"}
                                                    </td>
                                                    <td
                                                          className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                    >
                                                          {live.paid === 1 ? "paid" : "free"}
                                                    </td>
                                                    <td
                                                          className="min-w-[100px] sm:min-w-[80px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                    >
                                                          <div className="flex items-center justify-center gap-x-3">
                                                                  <Link to={`edit/${live.id}`} type="button">
                                                                        <EditIcon />
                                                                  </Link>
                                                                  <button type="button" onClick={() => handleOpenDialog(live.id)}>
                                                                        <DeleteIcon />
                                                                  </button>
                                                                  {openDialog === live.id && (
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
                                                                                                                                You will delete {live?.name || "null"}
                                                                                                                          </DialogTitle>
                                                                                                                  </div>
                                                                                                            </div>
                                                                                                    </div>
                                                                                                    <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                                                                            <button
                                                                                                                  type="button"
                                                                                                                  onClick={() => handleDelete(live.id)}
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
}

export default LivePage