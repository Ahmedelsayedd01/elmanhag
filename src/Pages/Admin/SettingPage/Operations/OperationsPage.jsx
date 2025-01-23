import React, { useState, useEffect } from 'react';
import Table from '../../../../Components/Table';
import axios from 'axios';
import { useAuth } from '../../../../Context/Auth';


const OperationsPage = () => {
  const [operations, setOperations] = useState([]); // State to hold the countries data
  const [loading, setLoading] = useState(true);   // State to handle loading status
  const auth = useAuth();


  const headers = ["En", "Ar", "Status"];

  const fetchOperations = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://62.84.185.153/plesk-site-preview/bcknd.elmanhag.com/https/62.84.185.153/admin/Settings/operations', {
        headers: {
          Authorization: `Bearer ${auth.user.token}`
        }
      });
      if (response.status === 200) {
        console.log(response.data)
        setOperations(response.data.operations || []); // Adjust this based on the API's response structure
      }
    } catch (error) {
      console.error('Error fetching operations:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchOperations();
  }, []);

  const handleDelete = async (id) => {
    // Add your delete logic here, e.g., API call
    console.log("Deleted item with id:", id);
  };

  const tableData = operations.map((operation, index) => ({
    id: operation.id, // this is important for linking to edit and delete
    number: index + 1,
    en: operation.name,
    ar: operation.name,
    status: operation.status, // Ensure this matches the exact key in your API response
  }));

  return (
    <>
      {loading ? (
        <div>Loading...</div> // Display a loading indicator while data is being fetched
      ) : (
        <Table
          headers={headers}
          data={tableData}
          editPath="edit"
          handleDelete={handleDelete}
        />
      )}
    </>
  )
}

export default OperationsPage