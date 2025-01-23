import React, { useEffect, useRef, useState } from 'react';
import Loading from '../../../../Components/Loading';
import { useAuth } from '../../../../Context/Auth';
import { ButtonAdd } from '../../../../Components/Button';
import axios from 'axios';
import { Link } from 'react-router-dom';

const FinancialPaymentsPage = () => {

      const auth = useAuth();
      const [isLoading, setIsLoading] = useState(true);
      const [payments, setPayments] = useState(null);

      const fetchPayments = async () => {
            setIsLoading(true);
            try {
                  const response = await axios.get('http://62.84.185.153/plesk-site-preview/bcknd.elmanhag.com/https/62.84.185.153/admin/payment', {
                        headers: {
                              Authorization: `Bearer ${auth.user.token}`,
                        },
                  });
                  if (response.status === 200) {
                        console.log(response.data)
                        setPayments(response.data.payments)
                  }
            } catch (error) {
                  console.error('Error fetching Payments data:', error);
            } finally {
                  setIsLoading(false);
            }
      };

      useEffect(() => {
            fetchPayments();
      }, []);

      if (isLoading) {
            return (
                  <div className="w-1/4 h-full flex items-start mt-[10%] justify-center m-auto">
                        <Loading />
                  </div>
            );
      }

      if (!payments) {
            return <div className='text-mainColor text-2xl font-bold w-full h-full flex items-center justify-center'>No Payments data available</div>;
      }

      localStorage.setItem("Payments", JSON.stringify(payments));

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
                                                <th className="min-w-[150px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Invoice</th>
                                          </tr>
                                    </thead>
                                    <tbody className="w-full">
                                          {payments.map((payment, index) => (
                                                <tr className="w-full border-b-2" key={payment.id}>
                                                      <td
                                                            className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                      >
                                                            {index + 1}
                                                      </td>
                                                      <td
                                                            className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                      >
                                                            {payment?.amount || "null"}
                                                      </td>
                                                      <td
                                                            className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                      >
                                                            {payment?.service || "null"}
                                                      </td>
                                                      <td
                                                            className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                      >
                                                            {payment.student?.name || "null"}
                                                      </td>
                                                      <td
                                                            className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                      >
                                                            {payment.payment_method?.title || "null"}
                                                      </td>
                                                      <td
                                                            className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                      >
                                                            {payment?.purchase_date || "null"}
                                                      </td>
                                                      <td
                                                            className="min-w-[120px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center  text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                      >
                                                            <span className="text-mainColor text-xl border-b-2 border-mainColor font-semibold cursor-pointer"                                                            >
                                                                  <Link to={payment?.receipt_link}>
                                                                        view
                                                                  </Link>
                                                            </span>
                                                      </td>
                                                      <td
                                                            className="min-w-[120px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center  text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                      >
                                                            <span className="text-mainColor text-xl border-b-2 border-mainColor font-semibold cursor-pointer"                                                            >
                                                                  <Link to="#">
                                                                        view
                                                                  </Link>
                                                            </span>
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

export default FinancialPaymentsPage