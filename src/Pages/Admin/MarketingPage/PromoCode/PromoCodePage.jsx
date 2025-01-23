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

const PromoCodePage = () => {

      const auth = useAuth();
      const [isLoading, setIsLoading] = useState(true);
      //  const [bundleData, setBundleData] = useState(null);
      //  const [subjectData, setSubjectData] = useState(null);
      //  const [categoryData, setCategoryData] = useState(null);

      const [allPromoCodeData, setAllPromoCodeData] = useState(null);
      const [promoCodes, setPromoCodes] = useState(null);
      const [promoCodesChanged, setPromoCodesChanged] = useState(false); // Change tracker

      const [isDeleting, setIsDeleting] = useState(false);
      const [openDialog, setOpenDialog] = useState(null);

      const [selectedPromoCodeId, setSelectedPromoCodeId] = useState(null);

      // Function to open modal and set the selected promo code ID
      const handleOpenModal = (id) => {
            setSelectedPromoCodeId(id);
      };

      // Function to close modal
      const handleCloseModal = () => {
            setSelectedPromoCodeId(null); // Set to null to close the modal
      };

      const fetchPromoCodes = async () => {
            setIsLoading(true);
            try {
                  const response = await axios.get('http://62.84.185.153/plesk-site-preview/bcknd.elmanhag.com/https/62.84.185.153/admin/promoCode', {
                        headers: {
                              Authorization: `Bearer ${auth.user.token}`,
                        },
                  });
                  if (response.status === 200) {
                        console.log(response.data)
                        setAllPromoCodeData(response.data)
                        setPromoCodes(response.data.promo_codes);
                        // setBundleData(response.data.bundles);
                        // setSubjectData(response.data.subjects);
                        // setCategoryData(response.data.categories);
                  }
            } catch (error) {
                  console.error('Error fetching PromoCode data:', error);
            } finally {
                  setIsLoading(false);
            }
      };

      useEffect(() => {
            fetchPromoCodes(); // Fetch Categories initially and whenever categoriesChanged changes
      }, [promoCodesChanged]);

      const handleOpenDialog = (categoriesId) => {
            setOpenDialog(categoriesId);
      };

      const handleCloseDialog = () => {
            setOpenDialog(null);
      };

      const handleDelete = async (promoCodeId) => {
            setIsDeleting(true);
            const success = await deletePromoCode(promoCodeId, auth.user.token);
            setIsDeleting(false);
            handleCloseDialog();

            if (success) {
                  auth.toastSuccess('PromoCode deleted successfully!');
                  setPromoCodesChanged(!promoCodesChanged)
            } else {
                  auth.toastError('Failed to delete PromoCode.');
            }
      };

      const deletePromoCode = async (promoCodeId, authToken) => {
            try {
                  const response = await axios.delete(`http://62.84.185.153/plesk-site-preview/bcknd.elmanhag.com/https/62.84.185.153/admin/promoCode/delete/${promoCodeId}`, {
                        headers: {
                              Authorization: `Bearer ${authToken}`,
                        },
                  });

                  if (response.status === 200) {
                        console.log('PromoCode deleted successfully');
                        return true;
                  } else {
                        console.error('Failed to delete PromoCode:', response.status, response.statusText);
                        return false;
                  }
            } catch (error) {
                  console.error('Error deleting PromoCode:', error);
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

      if (!promoCodes) {
            return <div className='text-mainColor text-2xl font-bold w-full h-full flex items-center justify-center'>No Categories data available</div>;
      }

      // localStorage.setItem("PromoCodeData", JSON.stringify(promoCodes));
      localStorage.setItem("AllPromoCodeData", JSON.stringify(allPromoCodeData));



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
                                                <th className="min-w-[120px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Title</th>
                                                <th className="min-w-[120px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Code</th>
                                                <th className="min-w-[120px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Services</th>
                                                <th className="min-w-[120px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Discount</th>
                                                <th className="min-w-[150px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Limited Usage</th>
                                                <th className="min-w-[150px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Live Included</th>
                                                <th className="min-w-[120px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Action</th>
                                          </tr>
                                    </thead>
                                    <tbody className="w-full">
                                          {promoCodes.map((promoCode, index) => (
                                                <tr className="w-full border-b-2" key={promoCode.id}>
                                                      <td
                                                            className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                      >
                                                            {index + 1}
                                                      </td>
                                                      <td
                                                            className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                      >
                                                            {promoCode?.title || "null"}
                                                      </td>
                                                      <td
                                                            className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                      >
                                                            {promoCode?.code || "null"}
                                                      </td>
                                                      {/* <td
                                                            className="min-w-[120px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center  text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                      >
                                                            <span className='text-mainColor text-xl border-b-2 border-mainColor font-semibold'>
                                                            <Link to={`view/${promoCode.id}`}>View</Link>
                                                            </span>
                                                      </td> */}
                                                      <td className="min-w-[120px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                            <span
                                                                  className="text-mainColor text-xl border-b-2 border-mainColor font-semibold cursor-pointer"
                                                                  onClick={() => handleOpenModal(promoCode.id)} // Open modal for specific ID
                                                            >
                                                                  View
                                                            </span>
                                                      </td>
                                                      <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                                                            {promoCode?.precentage === null || promoCode?.precentage === 0
                                                                  ? promoCode?.value
                                                                  : `${promoCode?.precentage}%`}
                                                      </td>

                                                      <td
                                                            className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                      >
                                                            {promoCode?.usage_type === "unlimited"
                                                                  ? "UnLimited"
                                                                  : promoCode?.usage_type === "fixed" ? promoCode?.usage : "null"}
                                                      </td>
                                                      <td
                                                            className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                      >
                                                            {promoCode?.live === 1 ? "True" : "False"}
                                                      </td>
                                                      <td
                                                            className="min-w-[100px] sm:min-w-[80px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                      >
                                                            <div className="flex items-center justify-center gap-x-3">
                                                                  <Link to={`edit/${promoCode.id}`} type="button">
                                                                        <EditIcon />
                                                                  </Link>
                                                                  <button type="button" onClick={() => handleOpenDialog(promoCode.id)}>
                                                                        <DeleteIcon />
                                                                  </button>
                                                                  {openDialog === promoCode.id && (
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
                                                                                                                        You will delete {promoCode?.title || "null"}
                                                                                                                  </DialogTitle>
                                                                                                            </div>
                                                                                                      </div>
                                                                                                </div>
                                                                                                <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                                                                      <button
                                                                                                            type="button"
                                                                                                            onClick={() => handleDelete(promoCode.id)}
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
                                                      {selectedPromoCodeId === promoCode.id && (
                                                            <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
                                                                  <div className="bg-white rounded-lg p-8 max-w-lg w-full shadow-lg">
                                                                        <h2 className="text-2xl font-bold mb-4">Promo Code Details</h2>
                                                                        <p className="text-2xl"><span className='text-mainColor'>ID: </span> {promoCode.id}</p>
                                                                        <p className="text-2xl"><span className='text-mainColor'>Title:</span> {promoCode?.title}</p>
                                                                        <p className="text-2xl"><span className='text-mainColor'>Bundles included:</span> {promoCode.bundles?.map(bundle => bundle.name).join(', ') || 'No bundles'}</p>
                                                                        <p className="text-2xl"><span className='text-mainColor'>Subjects included:</span> {promoCode.subjects?.map(subject => subject.name).join(', ') || 'No subjects'}</p>
                                                                        <button
                                                                              className="mt-4 px-4 py-2 bg-mainColor text-white text-xl rounded hover:bg-opacity-90"
                                                                              onClick={handleCloseModal} // Close modal
                                                                        >
                                                                              Close
                                                                        </button>
                                                                  </div>
                                                            </div>
                                                      )}

                                                </tr>

                                          ))}
                                    </tbody>
                              </table>
                        </div>

                        {/* Modal for the specific promo code */}

                  </div>
            </>
      )
}

export default PromoCodePage