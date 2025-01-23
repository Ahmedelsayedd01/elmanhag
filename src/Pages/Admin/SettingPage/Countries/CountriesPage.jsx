import React, { useState, useEffect } from 'react';
import Table from '../../../../Components/Table';
import axios from 'axios';
import { useAuth } from '../../../../Context/Auth';
import Loading from '../../../../Components/Loading';
import { Link } from 'react-router-dom';
import { ButtonAdd } from '../../../../Components/Button';


const CountriesPage = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = useAuth();

  const headers = ["#", "Country", "Status", "Actions"];

  const fetchCountries = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://62.84.185.153/plesk-site-preview/bcknd.elmanhag.com/https/62.84.185.153/admin/Settings/countries', {
        headers: {
          Authorization: `Bearer ${auth.user.token}`
        }
      });
      if (response.status === 200) {
        setCountries(response.data.countries || []);
      }
    } catch (error) {
      console.error('Error fetching countries:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://62.84.185.153/plesk-site-preview/bcknd.elmanhag.com/https/62.84.185.153/admin/Settings/countries/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${auth.user.token}`
        }
      });

      if (response.status === 200) {
        setCountries(countries.filter(country => country.id !== id));
        auth.toastSuccess('Country deleted successfully!');
      } else {
        console.error('Failed to delete country:', response);
      }
    } catch (error) {
      console.error('Error deleting country:', error);
    }
  };

  if (!countries) {
    return (
      <div className='text-mainColor text-2xl font-bold w-full h-full flex items-center justify-center'>No countries data available</div>
    )
  }

  const tableData = countries.map((country, index) => ({
    id: country.id,
    number: index + 1,
    country: country.name,
    status: country.status === 1 ? 'Active' : 'Disabled'
  }));

  localStorage.setItem("Countries", JSON.stringify(countries));


  return (
    <>
      <div className="w-full flex flex-col gap-y-3">
        <div className="sm:w-full xl:w-1/12">
          <Link to="add">
            <ButtonAdd Text={"Add"} BgColor={"white"} Color={"thirdColor"} iconColor="mainColor" Size={"xl"} />
          </Link>
        </div>
        {loading ? (
          <div className="w-1/4 flex items-start mt-[10%] justify-center h-full m-auto">
            <Loading />
          </div>
        ) : (
          <Table
            headers={headers}
            data={tableData}
            editPath="edit"
            handleDelete={handleDelete}
            pageName="Countries"
          />
        )}
      </div>
    </>
  );
}

export default CountriesPage;


