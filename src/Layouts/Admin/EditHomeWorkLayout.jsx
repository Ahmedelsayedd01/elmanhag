import React, { createContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { EditHomeWorkPage } from '../../Pages/AllPages';
import HeaderPageSection from '../../Components/HeaderPageSection';


export const HomeWorkDataContext = createContext()

const EditHomeWorkLayout = () => {
    const [homeWorkData,setHomeWorkData] =  useState([]);
    const [allHomeWorks,setAllHomeWorks] =  useState([]);
    const [homeWorkEdit,setHomeWorkEdit] = useState(null)
    const { homeWorkId } = useParams();

    useEffect(() => {
        const fetchHomeWorkData = () => {
          const storedhomeWorkData = JSON.parse(localStorage.getItem('AllhomeWork'))|| [];
          console.log('homeWorkData from local storage:', storedhomeWorkData); // Debugging log
          if (storedhomeWorkData) {
            setHomeWorkData(storedhomeWorkData);
            setAllHomeWorks(storedhomeWorkData.homeworks); // Corrected line
          }
        };
        fetchHomeWorkData(); // Renamed function to avoid shadowing
      }, []);

      useEffect(() => {
        if (allHomeWorks.length > 0 && homeWorkId) {
          const filteredHomeWork = allHomeWorks.find(
            (homework) => homework.id === parseInt(homeWorkId)
          );
          setHomeWorkEdit(filteredHomeWork);
        } else {
          console.warn('No HomeWork available in local storage.'); // Warn if no countries are found
        }
      }, [allHomeWorks, homeWorkId]);
    
      console.log('HomeWorkData', homeWorkData); // Logging the whole array
      console.log('allHomeWorks', allHomeWorks);
      console.log('HomeWorkeEdit', homeWorkEdit);


      const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1, { replace: true });
      };
  return (
    <>
    <HeaderPageSection handleClick={handleGoBack} name="Edit H.W" />
    <HomeWorkDataContext.Provider value={homeWorkEdit}>
        <EditHomeWorkPage/>
    </HomeWorkDataContext.Provider>

    </>  )
}

export default EditHomeWorkLayout