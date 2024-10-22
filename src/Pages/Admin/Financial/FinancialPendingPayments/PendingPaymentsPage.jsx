import React, { useEffect, useState } from 'react';
import Loading from '../../../../Components/Loading';
import { useAuth } from '../../../../Context/Auth';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';

const PendingPaymentsPage = () => {
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [pendingPayments, setPendingPayments] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedPaymentId, setSelectedPaymentId] = useState(null);
  const [rejectReason, setRejectReason] = useState("");
  const [paymentStatuses, setPaymentStatuses] = useState({});

  const [openView, setOpenView] = useState(null);
  const [openViewPhoto, setOpenViewPhoto] = useState(null);

  const handleCloseView = () => {
    setOpenView(null);
  };
  const handleOpenView = (studentId) => {
    setOpenView(studentId);
  };

  const handleCloseViewPhoto = () => {
    setOpenViewPhoto(null);
  };
  const handleOpenViewPhoto = (studentId) => {
    setOpenViewPhoto(studentId);
  };

  // Handle the option change
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    if (event.target.value !== "Reject") {
      setRejectReason(""); // Clear reject reason if not rejecting
    }
  };

  // Handle rejection reason input
  const handleRejectReasonChange = (event) => {
    setRejectReason(event.target.value);
  };

  // Close the popup
  const closePopup = () => {
    setShowPopup(false);
    setSelectedOption("");
    setSelectedPaymentId(null);
    setRejectReason(""); // Clear the reason input
  };

  const handleDone = async () => {
    if (selectedOption && selectedPaymentId) {
      console.log(selectedPaymentId)
      console.log(rejectReason || "Approved")
      try {
        let response;
        if (selectedOption === "Approve") {
          response = await axios.put(`https://bdev.elmanhag.shop/admin/payment/pendding/approve/${selectedPaymentId}`, {}, {
            headers: {
              Authorization: `Bearer ${auth.user.token}`,
            },
          });
        } else if (selectedOption === "Reject") {
          response = await axios.put(` https://bdev.elmanhag.shop/admin/payment/pendding/rejected/${selectedPaymentId}`,
            {
              rejected_reason: rejectReason
            },
            {
              headers: {
                Authorization: `Bearer ${auth.user.token}`,
              },
            });
        }

        if (response.status === 200) {
          console.log(`${selectedOption} Action sent successfully`);
          // Optionally, refresh the payments list or handle success here
          // Update the paymentStatuses state based on the selected option
          setPaymentStatuses(prevStatuses => ({
            ...prevStatuses,
            [selectedPaymentId]: selectedOption
          }));
        } else {
          console.error(`Failed to send ${selectedOption} action`);
        }
      } catch (error) {
        console.error('Error sending action:', error);
      }
    }
    closePopup();
  };


  const fetchPendingPayments = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://bdev.elmanhag.shop/admin/payment/pendding', {
        headers: {
          Authorization: `Bearer ${auth.user.token}`,
        },
      });
      if (response.status === 200) {
        console.log(response.data)
        setPendingPayments(response.data.payments);
      }
    } catch (error) {
      console.error('Error fetching Pending Payments data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingPayments();
  }, []);

  if (isLoading) {
    return (
      <div className="w-1/4 h-full flex items-start mt-[10%] justify-center m-auto">
        <Loading />
      </div>
    );
  }

  if (!pendingPayments) {
    return <div className='text-mainColor text-2xl font-bold w-full h-full flex items-center justify-center'>No Pending Payments data available</div>;
  }

  localStorage.setItem("Pending Payments", JSON.stringify(pendingPayments));

  return (
    <>
      <div className="w-full flex flex-col gap-y-3">
        <div className="w-full flex items-center justify-between mt-4 overflow-x-auto">
          <table className="w-full sm:min-w-0">
            <thead className="w-full">
              <tr className="w-full border-b-2">
                <th className="min-w-[80px] sm:w-1/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">#</th>
                <th className="min-w-[120px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Amount</th>
                <th className="min-w-[120px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Service</th>
                <th className="min-w-[120px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Student</th>
                <th className="min-w-[120px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Payment Methods</th>
                <th className="min-w-[150px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Date</th>
                <th className="min-w-[150px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Receipt</th>
                <th className="min-w-[120px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Action</th>
              </tr>
            </thead>
            <tbody className="w-full">
              {pendingPayments.map((payment, index) => (
                <tr className="w-full border-b-2" key={payment.id}>
                  <td className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                    {index + 1}
                  </td>
                  <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                    {payment?.amount || "0"}
                  </td>
                  <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                    <span className='text-mainColor text-xl border-b-2 border-mainColor font-semibold cursor-pointer'
                      onClick={() => handleOpenView(payment.id)}>
                      View
                    </span>
                  </td>
                  <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                    {payment.student?.name || "-"}
                  </td>
                  <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                    {payment.payment_method?.title || "-"}
                  </td>
                  <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                    {payment?.purchase_date || "-"}
                  </td>
                  <td className="min-w-[120px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                    <span className='text-mainColor text-xl border-b-2 border-mainColor font-semibold cursor-pointer'
                      onClick={() => handleOpenViewPhoto(payment.id)}>
                      View
                    </span>
                  </td>
                  <td className="min-w-[120px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden rounded">
                    <button
                      onClick={() => {
                        setSelectedPaymentId(payment.id);
                        setShowPopup(true);
                      }}
                      className={`w-[100px] flex justify-center py-2 px-4 rounded ${paymentStatuses[payment.id] === "Approve"
                        ? "bg-green-500 text-white"
                        : paymentStatuses[payment.id] === "Reject"
                          ? "bg-red-500 text-white"
                          : "bg-thirdColor text-white"
                        }`}
                    >
                      {paymentStatuses[payment.id] || "Pending"}
                    </button>
                  </td>

                  {openViewPhoto === payment.id && (
                    <Dialog
                      open={true}
                      onClose={handleCloseViewPhoto}
                      className="relative z-10"
                    >
                      {/* Backdrop */}
                      <div
                        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                        onClick={handleCloseViewPhoto}
                      />

                      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

                          <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl">

                            <div className="p-6">
                              <span className="ml-6 text-3xl font-semibold text-mainColor border-b-2 border-mainColor">Receipt</span>
                            </div>

                            {/* Image Container */}
                            <div className="w-full flex flex-wrap items-center justify-center gap-4 my-4 px-4 sm:p-6 sm:pb-4">
                              <img
                                src={payment.receipt_link || '-'}
                                className="w-[400px] h-[600px] object-contain object-center rounded-xl shadow-md transition-transform duration-300 hover:scale-105"
                                alt="Receipt"
                                loading="lazy"
                              />
                            </div>

                            {/* Dialog Footer */}
                            <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                              <button
                                type="button"
                                onClick={handleCloseViewPhoto}
                                className="mt-3 inline-flex w-full justify-center rounded-md bg-mainColor px-6 py-3 text-sm font-medium text-white shadow-sm sm:mt-0 sm:w-auto hover:bg-mainColor-dark transition-colors duration-300 focus:outline-none"
                              >
                                Close
                              </button>
                            </div>

                          </DialogPanel>
                        </div>
                      </div>
                    </Dialog>
                  )}


                  {openView === payment.id && (
                    <Dialog open={true} onClose={handleCloseView} className="relative z-10">
                      <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                          <DialogPanel className="pt-6 relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl">
                            <span className='ml-6 text-3xl font-semibold text-mainColor border-b-2 border-mainColor'>{payment?.service || '-'}</span>
                            {/* Permissions List */}
                            <div className="w-full flex flex-wrap items-center justify-center gap-4 my-4 px-4 sm:p-6 sm:pb-4">

                              {(payment.subject.length === 0 && payment.bundle.length !== 0) &&
                                (
                                  payment.bundle.length === 0 ? (
                                    <div className="w-full text-center text-lg font-semibold text-gray-500 my-4">
                                      No Bundle available for this payment.
                                    </div>
                                  ) : (
                                    payment.bundle.map((bundle, index) => {
                                      const displayIndex = index + 1;
                                      return (
                                        <div
                                          key={index}
                                          className="sm:w-full lg:w-5/12 xl:w-4/12 flex items-center justify-center shadow-md hover:shadow-none duration-300 py-3 px-4 rounded-xl bg-gray-50"
                                        >
                                          <span className="text-mainColor text-lg lg:text-xl font-semibold capitalize">
                                            {displayIndex}. {bundle.name}
                                          </span>
                                        </div>
                                      );
                                    })
                                  )
                                )}

                              {(payment.subject.length !== 0 && payment.bundle.length === 0) &&
                                (
                                  payment.subject.length === 0 ? (
                                    <div className="w-full text-center text-lg font-semibold text-gray-500 my-4">
                                      No Subject available for this payment.
                                    </div>
                                  ) : (
                                    payment.subject.map((subject, index) => {
                                      const displayIndex = index + 1;
                                      return (
                                        <div
                                          key={index}
                                          className="sm:w-full lg:w-5/12 xl:w-3/12 flex items-center justify-center shadow-md hover:shadow-none duration-300 py-3 px-4 rounded-xl bg-gray-50"
                                        >
                                          <span className="text-mainColor text-lg lg:text-xl font-semibold capitalize">
                                            {displayIndex}. {subject.name}
                                          </span>
                                        </div>
                                      );
                                    })
                                  )
                                )}

                              {(payment.subject.length === 0 && payment.bundle.length === 0) &&
                                (
                                  <div className="w-full text-center text-lg font-semibold text-gray-500 my-4">
                                    No Subject And Bundle available for this payment.
                                  </div>
                                )}

                            </div>

                            {/* Dialog Footer */}
                            <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                              <button
                                type="button"
                                onClick={handleCloseView}
                                className="mt-3 inline-flex w-full justify-center rounded-md bg-mainColor px-6 py-3 text-sm font-medium text-white shadow-sm sm:mt-0 sm:w-auto hover:bg-mainColor-dark focus:outline-none"
                              >
                                Close
                              </button>
                            </div>

                          </DialogPanel>
                        </div>
                      </div>
                    </Dialog>
                  )}

                </tr>
              ))}
              {/* Popup Modal */}
              {showPopup && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-800 inset-0 z-50 bg-opacity-50 flex justify-center items-center">
                  <div className="bg-white p-6 rounded-md shadow-lg w-96 text-center">
                    <h2 className="text-mainColor text-2xl font-semibold mb-6">Choose</h2>

                    {/* Radio Buttons for Approve/Reject */}
                    <div className="mb-6">
                      <label className="text-xl text-mainColor flex items-center justify-start mb-4">
                        <input
                          type="radio"
                          value="Approve"
                          checked={selectedOption === "Approve"}
                          onChange={handleOptionChange}
                          className="mr-2 accent-red-600 w-6 h-6 rounded-full border-2 border-red-600 cursor-pointer relative"
                        />
                        Approve
                      </label>
                      <label className="text-xl text-mainColor flex items-center justify-start">
                        <input
                          type="radio"
                          value="Reject"
                          checked={selectedOption === "Reject"}
                          onChange={handleOptionChange}
                          className="mr-2 accent-red-600 w-6 h-6 rounded-full border-2 border-red-600 cursor-pointer relative"
                        />
                        Reject
                      </label>
                    </div>

                    {selectedOption === "Reject" && (
                      <div className="mb-4">
                        <label htmlFor="rejectReason" className="block font-medium mb-2">Why Did I Reject?</label>
                        <input
                          id="rejectReason"
                          type="text"
                          value={rejectReason}
                          onChange={handleRejectReasonChange}
                          className="w-full p-2 border border-gray-300 rounded"
                          placeholder="Enter rejection reason..."
                        />
                      </div>
                    )}

                    {/* Done and Cancel Buttons */}
                    <div className="flex justify-around mt-4">
                      <button
                        onClick={handleDone}
                        className="bg-mainColor text-white text-xl py-2 px-6 rounded"
                      >
                        Done
                      </button>
                      <button
                        onClick={closePopup}
                        className="text-red-600 text-xl py-2 px-6"
                      >
                        Cancel
                      </button>
                    </div>

                  </div>
                </div>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default PendingPaymentsPage;
