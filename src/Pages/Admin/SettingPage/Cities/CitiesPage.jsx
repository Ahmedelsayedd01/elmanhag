import React, { useState, useEffect } from 'react';
import Table from '../../../../Components/Table';
import axios from 'axios';
import { useAuth } from '../../../../Context/Auth';
import Loading from '../../../../Components/Loading';
import { Link } from 'react-router-dom';
import { ButtonAdd } from '../../../../Components/Button';

const CitiesPage = () => {
  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = useAuth();

  const headers = ["#", "City", "Country", "Status", "Actions"];

  const fetchCities = async () => {
    try {
      const response = await axios.get('http://62.84.185.153/plesk-site-preview/bcknd.elmanhag.com/https/62.84.185.153/admin/Settings/cities', {
        headers: {
          Authorization: `Bearer ${auth.user.token}`
        }
      });
      if (response.status === 200) {
        console.log('Cities Data:', response.data.cities);
        setCities(response.data.cities || []);
      }
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  const fetchCountries = async () => {
    try {
      const response = await axios.get('http://62.84.185.153/plesk-site-preview/bcknd.elmanhag.com/https/62.84.185.153/admin/Settings/countries', {
        headers: {
          Authorization: `Bearer ${auth.user.token}`
        }
      });
      if (response.status === 200) {
        console.log('Countries Data:', response.data.countries);
        setCountries(response.data.countries || []);
      }
    } catch (error) {
      console.error('Error fetching countries:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await Promise.all([fetchCities(), fetchCountries()]);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getCountryNameById = (countryId) => {
    const id = Number(countryId);
    const country = countries.find(c => Number(c.id) === id);
    return country ? country.name : 'Unknown';
  };

  const tableData = cities.map((city, index) => ({
    id: city.id,
    number: index + 1,
    city: city.name,
    country: getCountryNameById(city.country_id), // Use country_id from the city data
    status: city.status === 1 ? 'Active' : 'Disabled'
  }));

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://62.84.185.153/plesk-site-preview/bcknd.elmanhag.com/https/62.84.185.153/admin/Settings/cities/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${auth.user.token}`
        }
      });

      if (response.status === 200) {
        console.log("Deleted item with id:", id);
        // Update the cities state to remove the deleted city
        setCities(cities.filter(city => city.id !== id));
        auth.toastSuccess('City deleted successfully!');
      } else {
        console.error('Failed to delete city:', response);
      }
    } catch (error) {
      console.error('Error deleting city:', error);
    }
  };

  localStorage.setItem("Cities", JSON.stringify(cities));


  return (
    <>
      <div className="w-full flex flex-col gap-y-3">
        <div className="sm:w-full xl:w-1/12">
          <Link to="add">
            <ButtonAdd Text={"Add"} BgColor={"white"} Color={"thirdColor"} iconColor="mainColor" Size={"xl"} />
          </Link>
        </div>
        {loading ? (
          // <div>Loading...</div>
          <div className="w-1/4 flex items-start mt-[10%] justify-center h-full m-auto">
            <Loading />
          </div>
        ) : (
          <Table
            headers={headers}
            data={tableData}
            editPath="edit"
            handleDelete={handleDelete}
            pageName="Cities"
          />
        )}
      </div>
    </>
  );
};

export default CitiesPage;
