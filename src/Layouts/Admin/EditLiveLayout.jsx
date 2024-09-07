import React, { createContext, useEffect, useState } from 'react'
import HeaderPageSection from '../../Components/HeaderPageSection'
import { EditLivePage } from '../../Pages/AllPages'
import { useNavigate, useParams } from 'react-router-dom';
export const LiveEditContext = createContext()

const EditLiveLayout = () => {

  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1, { replace: true });
  };
  const [liveData, setLiveData] = useState([])
  const [allLives, setAllLives] = useState([])
  const [liveEdit,setLiveEdit] = useState(null)
  const { liveId } = useParams();

  useEffect(() => {
    const fetchLiveData = () => {
      const storedLiveData = JSON.parse(localStorage.getItem('LivesData')) || [];
      console.log('Live Data from local storage:', storedLiveData); // Debugging log
      if (storedLiveData) {
        setLiveData(storedLiveData);
        setAllLives(storedLiveData.live); // Corrected line
      }
    };
    fetchLiveData(); // Renamed function to avoid shadowing
  }, []);

  useEffect(() => {
    if (allLives.length > 0 && liveId) {
              const filteredLive = allLives.find(live => live.id === parseInt(liveId));
              console.log('Selected Live:', filteredLive); // Debugging log   
              setLiveEdit(filteredLive)
          } else {
              console.warn('No Lives available in local storage.'); // Warn if no countries are found
          }
    }, [allLives, liveId]);

    console.log('LiveData', liveData); // Logging the whole array
    console.log('all Lives', allLives);
    // console.log('Live Edit', liveEdit)
  return (
    <>
      <HeaderPageSection handleClick={handleGoBack} name="Edit Lives" />
      <LiveEditContext.Provider value={liveEdit}>
        <EditLivePage />
      </LiveEditContext.Provider>
    </>
  )
}

export default EditLiveLayout
