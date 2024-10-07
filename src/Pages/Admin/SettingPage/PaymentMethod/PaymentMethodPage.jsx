// import React, { useState, useEffect } from "react";
// import Table from "../../../../Components/Table";
// import axios from "axios";
// import { useAuth } from "../../../../Context/Auth";
// import Loading from "../../../../Components/Loading";
// import { Link } from 'react-router-dom';
// import { ButtonAdd } from '../../../../Components/Button';


// const PaymentMethodPage = () => {
//   const [paymentMethod, setPaymentMethod] = useState([]); // State to hold payment method data
//   const [loading, setLoading] = useState(true); // State to handle loading status
//   const auth = useAuth();

//   const headers = ["#", "Thumbnails", "Title", "Status", "Actions"];

//   const fetchPaymentMethod = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(
//         "https://bdev.elmanhag.shop/admin/Settings/paymentMethods",
//         {
//           headers: {
//             Authorization: `Bearer ${auth.user.token}`,
//           },
//         }
//       );
//       if (response.status === 200) {
//         console.log(response.data);
//         setPaymentMethod(response.data.paymentMethods || []); // Adjust based on the API response structure
//         localStorage.setItem("PaymentMethod", JSON.stringify(response.data.paymentMethods || []));
//       }
//     } catch (error) {
//       console.error("Error fetching Payment Methods:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPaymentMethod();
//   }, []);

//   const handleDelete = async (id) => {
//     try {
//       const response = await axios.delete(
//         `https://bdev.elmanhag.shop/admin/Settings/paymentMethods/delete/${id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${auth.user.token}`,
//           },
//         }
//       );

//       if (response.status === 200) {
//         console.log("Deleted Payment Method with id:", id);
//         // Update the paymentMethod state to remove the deleted item
//         setPaymentMethod(paymentMethod.filter((PM) => PM.id !== id));
//         localStorage.setItem("PaymentMethod", JSON.stringify(paymentMethod.filter((PM) => PM.id !== id)));
//       } else {
//         console.error("Failed to delete Payment Method:", response);
//       }
//     } catch (error) {
//       console.error("Error deleting Payment Method:", error);
//     }
//   };

//   const tableData = paymentMethod.map((PM, index) => ({
//     id: PM.id, // Important for linking to edit and delete
//     number: index + 1,
//     thumbnails: PM.thumbnails,
//     title: PM.title,
//     status: PM.status,
//   }));

//   return (
//     <>
//     <div className="w-full flex flex-col gap-y-3">
//         <div className="sm:w-full xl:w-1/12">
//               <Link to="add">
//                     <ButtonAdd Text={"Add"} BgColor={"white"} Color={"thirdColor"} iconColor="mainColor" Size={"xl"} />
//               </Link>
//         </div>
//       {loading ? (
//         <div className="w-1/4 h-screen flex items-center justify-center m-auto">
//           <Loading />
//         </div>
//       ) : (
//         <Table
//           headers={headers}
//           data={tableData}
//           editPath="edit"
//           handleDelete={handleDelete}
//           pageName="Payment Method"
//         />
//       )}
//       </div>
//     </>
//   );
// };

// export default PaymentMethodPage;


import React, { useState, useEffect } from "react";
import Table from "../../../../Components/Table";
import axios from "axios";
import { useAuth } from "../../../../Context/Auth";
import Loading from "../../../../Components/Loading";
import { Link } from 'react-router-dom';
import { ButtonAdd } from '../../../../Components/Button';

const PaymentMethodPage = () => {
  const [paymentMethods, setPaymentMethods] = useState([]); // State to hold payment method data
  const [loading, setLoading] = useState(true); // State to handle loading status
  const auth = useAuth();

  const headers = ["#", "Thumbnails", "Title", "Status", "Actions"];

  const fetchPaymentMethods = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://bdev.elmanhag.shop/admin/Settings/paymentMethods",
        {
          headers: {
            Authorization: `Bearer ${auth.user.token}`,
          },
        }
      );
      if (response.status === 200) {
        setPaymentMethods(response.data.payment_methods || []);
        console.log(response.data.payment_methods)
      }
    } catch (error) {
      console.error("Error fetching Payment Methods:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `https://bdev.elmanhag.shop/admin/Settings/paymentMethods/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${auth.user.token}`,
          },
        }
      );
      if (response.status === 200) {
        setPaymentMethods(paymentMethods.filter(payment => payment.id !== id));
        auth.toastSuccess('Payment Method deleted successfully!');
      } else {
        console.error('Failed to delete country:', response);
      }
    } catch (error) {
      console.error('Error deleting country:', error);
    }
  };

  const tableData = paymentMethods.map((method, index) => ({
    id: method.id,
    number: index + 1,
    thumbnail: method.thumbnail_link,
    title: method.title,
    status: method.status === 1 ? <span className="text-green-500 px-4 py-2 rounded-lg">Active</span> : <span className="text-red-500 px-4 py-2 rounded-lg"> Disabled</span>,
  }));

  localStorage.setItem("PaymentMethods", JSON.stringify(paymentMethods));

  return (
    <div className="w-full flex flex-col gap-y-3">
      <div className="sm:w-full xl:w-1/12">
        <Link to="add">
          <ButtonAdd Text="Add" BgColor="white" Color="thirdColor" iconColor="mainColor" Size="xl" />
        </Link>
      </div>
      {loading ? (
        <div className="w-1/4 h-screen flex items-center justify-center m-auto">
          <Loading />
        </div>
      ) : (
        <Table
          headers={headers}
          data={tableData}
          editPath="edit"
          handleDelete={handleDelete}
          pageName="Payment Method"
        />
      )}
    </div>
  );
};

export default PaymentMethodPage;
