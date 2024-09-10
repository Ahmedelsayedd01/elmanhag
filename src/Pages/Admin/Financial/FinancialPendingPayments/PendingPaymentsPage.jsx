import React, { useEffect, useState } from 'react';
import Loading from '../../../../Components/Loading';
import { useAuth } from '../../../../Context/Auth';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PendingPaymentsPage = () => {
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [pendingPayments, setPendingPayments] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedPaymentId, setSelectedPaymentId] = useState(null);
  const [rejectReason, setRejectReason] = useState("");
  const [paymentStatuses, setPaymentStatuses] = useState({});

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
            rejected_reason:rejectReason
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
                    {payment?.amount || "null"}
                  </td>
                  <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                    {payment?.service || "null"}
                  </td>
                  <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                    {payment.student?.name || "null"}
                  </td>
                  <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                    {payment.payment_method?.title || "null"}
                  </td>
                  <td className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                    {payment?.purchase_date || "null"}
                  </td>
                  <td className="min-w-[120px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden">
                    <span className="text-mainColor text-xl border-b-2 border-mainColor font-semibold cursor-pointer">
                      <Link to={payment?.receipt_link}>view</Link>
                    </span>
                  </td>
                <td className="min-w-[120px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden rounded">
                  <button
                    onClick={() => {
                      setSelectedPaymentId(payment.id);
                      setShowPopup(true);
                    }}
                    className={`w-[100px] flex justify-center py-2 px-4 rounded ${
                      paymentStatuses[payment.id] === "Approve"
                        ? "bg-green-500 text-white"
                        : paymentStatuses[payment.id] === "Reject"
                        ? "bg-red-500 text-white"
                        : "bg-thirdColor text-white"
                    }`}
                  >
                    {paymentStatuses[payment.id] || "Pending"}
                  </button>
                </td>

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
