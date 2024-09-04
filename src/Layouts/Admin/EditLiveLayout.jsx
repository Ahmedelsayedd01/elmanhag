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
  const [liveEdit,setLiveEdit] = useState(null)
  const { liveId } = useParams();

  useEffect(() => {
    const lives = JSON.parse(localStorage.getItem('Lives')) || [];
    console.log('Lives from local storage:', lives); // Debugging log

    if (lives.length > 0) {
        const live = lives.find(c => c.id === parseInt(liveId));
        console.log('Selected Live:', live); // Debugging log

        setLiveEdit(live)
    } else {
        console.warn('No Lives available in local storage.'); // Warn if no countries are found
    }
}, [liveId]);
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
