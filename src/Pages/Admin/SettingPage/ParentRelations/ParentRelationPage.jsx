import React, { useState, useEffect } from "react";
import Table from "../../../../Components/Table";
import axios from "axios";
import { useAuth } from "../../../../Context/Auth";
import Loading from "../../../../Components/Loading";

const ParentRelationPage = () => {
  const [parentRelation, setParentRelation] = useState([]); // State to hold the parent relation data
  const [loading, setLoading] = useState(true); // State to handle loading status
  const auth = useAuth();

  const headers = ["#", "En", "Actions"];

  const fetchParentRelation = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://bdev.elmanhag.shop/admin/Settings/relation",
        {
          headers: {
            Authorization: `Bearer ${auth.user.token}`,
          },
        }
      );
      if (response.status === 200) {
        console.log(response.data);
        setParentRelation(response.data.relations || []); // Adjust this based on the API's response structure
      }
    } catch (error) {
      console.error("Error fetching parent relation:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchParentRelation();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`https://bdev.elmanhag.shop/admin/Settings/relation/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${auth.user.token}`
        }
      });

      if (response.status === 200) {
        console.log("Deleted parent relation with id:", id);
        // Update the parentRelation state to remove the deleted item
        setParentRelation(parentRelation.filter(PR => PR.id !== id));
      } else {
        console.error('Failed to delete parent relation:', response);
      }
    } catch (error) {
      console.error('Error deleting parent relation:', error);
    }
  };

  const tableData = parentRelation.map((PR, index) => ({
    id: PR.id, // This is important for linking to edit and delete
    number: index + 1,
    en: PR.name,
  }));

  return (
    <>
      {loading ? (
        <div className="w-1/4 h-screen flex items-center justify-center m-auto">
       <Loading />
      </div>      ) : (
        <Table
          headers={headers}
          data={tableData}
          editPath="/dashboardAdmin/"
          handleDelete={handleDelete}
          pageName = "Parent Relation"
        />
      )}
    </>
  );
};

export default ParentRelationPage;
