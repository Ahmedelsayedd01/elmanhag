import React, { useState, useEffect } from "react";
import Table from "../../../../Components/Table";
import axios from "axios";
import { useAuth } from "../../../../Context/Auth";
import Loading from "../../../../Components/Loading";
import { Link } from 'react-router-dom';
import { ButtonAdd } from '../../../../Components/Button';

const ParentRelationPage = () => {
  const [parentRelation, setParentRelation] = useState([]); // State to hold the parent relation data
  const [loading, setLoading] = useState(true); // State to handle loading status
  const auth = useAuth();

  const headers = ["#", "En", "Actions"];

  const fetchParentRelation = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://62.84.185.153/plesk-site-preview/bcknd.elmanhag.com/https/62.84.185.153/admin/Settings/relation",
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
      const response = await axios.delete(`http://62.84.185.153/plesk-site-preview/bcknd.elmanhag.com/https/62.84.185.153/admin/Settings/relation/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${auth.user.token}`
        }
      });

      if (response.status === 200) {
        console.log("Deleted parent relation with id:", id);
        // Update the parentRelation state to remove the deleted item
        setParentRelation(parentRelation.filter(PR => PR.id !== id));
        auth.toastSuccess('Parent relation deleted successfully!');
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

  localStorage.setItem("ParentRelation", JSON.stringify(parentRelation));


  return (
    <>
      <div className="w-full flex flex-col gap-y-3">
        <div className="sm:w-full xl:w-1/12">
          <Link to="add">
            <ButtonAdd Text={"Add"} BgColor={"white"} Color={"thirdColor"} iconColor="mainColor" Size={"xl"} />
          </Link>
        </div>
        {loading ? (
          <div className="w-1/4 h-full flex items-start mt-[10%] justify-center m-auto">
            <Loading />
          </div>) : (
          <Table
            headers={headers}
            data={tableData}
            editPath="edit"
            handleDelete={handleDelete}
            pageName="Parent Relation"
          />
        )}
      </div>
    </>
  );
};

export default ParentRelationPage;

