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
      <div className="w-full flex flex-col gap-y-6">
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-max bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-mainColor text-white">
              <tr className="text-left">
                <th className="px-4 py-3 text-center text-sm font-medium">#</th>
                <th className="px-4 py-3 text-center text-sm font-medium">Student</th>
                <th className="px-4 py-3 text-center text-sm font-medium">Category</th>
                <th className="px-4 py-3 text-center text-sm font-medium">Amount</th>
                <th className="px-4 py-3 text-center text-sm font-medium">Service</th>
                <th className="px-4 py-3 text-center text-sm font-medium">Payment Methods</th>
                <th className="px-4 py-3 text-center text-sm font-medium">Date</th>
                <th className="px-4 py-3 text-center text-sm font-medium">Receipt</th>
                <th className="px-4 py-3 text-center text-sm font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {pendingPayments.map((payment, index) => (
                <tr className="hover:bg-gray-50 transition-colors" key={payment.id}>
                  <td className="px-4 py-3 text-center text-thirdColor">{index + 1}</td>
                  <td className="px-4 py-3 text-center text-thirdColor">{payment.student?.name || "-"}</td>
                  <td className="px-4 py-3 text-center text-thirdColor">{payment.student?.category?.name || "-"}</td>
                  <td className="px-4 py-3 text-center text-thirdColor">{payment?.amount || "0"}</td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className="cursor-pointer text-mainColor font-semibold hover:underline"
                      onClick={() => handleOpenView(payment.id)}
                    >
                      View
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center text-thirdColor">{payment.payment_method?.title || "-"}</td>
                  <td className="px-4 py-3 text-center text-thirdColor">{payment?.purchase_date || "-"}</td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className="cursor-pointer text-mainColor font-semibold hover:underline"
                      onClick={() => handleOpenViewPhoto(payment.id)}
                    >
                      View
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => {
                        setSelectedPaymentId(payment.id);
                        setShowPopup(true);
                      }}
                      className={`w-full py-2 px-4 rounded text-white font-medium ${paymentStatuses[payment.id] === "Approve"
                        ? "bg-green-500"
                        : paymentStatuses[payment.id] === "Reject"
                          ? "bg-red-500"
                          : "bg-thirdColor"
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
                                className="w-[400px] h-[450px] object-contain object-center rounded-xl shadow-md transition-transform duration-300 hover:scale-105"
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
            </tbody>
          </table>
        </div>
      </div>

      {/* Popup for Action */}
      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-2xl text-mainColor font-semibold mb-6">Choose Action</h2>
            <div className="flex flex-col gap-4">
              <label className="flex items-center gap-2 text-mainColor text-xl cursor-pointer">
                <input
                  type="radio"
                  value="Approve"
                  checked={selectedOption === "Approve"}
                  onChange={handleOptionChange}
                  className="w-6 h-6 cursor-pointer"
                />
                Approve
              </label>
              <label className="flex items-center gap-2 text-mainColor text-xl cursor-pointer">
                <input
                  type="radio"
                  value="Reject"
                  checked={selectedOption === "Reject"}
                  onChange={handleOptionChange}
                  className="w-6 h-6 cursor-pointer"
                />
                Reject
              </label>

              {selectedOption === "Reject" && (
                <div className="flex flex-col">
                  <label className="text-mainColor mb-2 font-medium" htmlFor="rejectReason">
                    Reason for Rejection:
                  </label>
                  <input
                    id="rejectReason"
                    type="text"
                    value={rejectReason}
                    onChange={handleRejectReasonChange}
                    className="w-full p-2 border border-gray-300 rounded"
                    placeholder="Enter rejection reason"
                  />
                </div>
              )}
            </div>

            <div className="mt-6 flex justify-between">
              <button
                onClick={handleDone}
                className="bg-mainColor text-white py-2 px-4 rounded shadow hover:bg-mainColor-dark transition"
              >
                Done
              </button>
              <button
                onClick={closePopup}
                className="text-red-600 py-2 px-4 hover:underline"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>


  );
};

export default PendingPaymentsPage;
