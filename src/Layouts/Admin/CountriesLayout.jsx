import React from 'react'
import TitleHeader from '../../Components/TitleHeader'
import { CountriesPage } from '../../Pages/AllPages'
import { ButtonAdd } from '../../Components/Button'
import { useNavigate } from 'react-router-dom';
import { FaAngleLeft } from "react-icons/fa";
import { Link} from "react-router-dom";
import HeaderPageSection from "../../Components/HeaderPageSection";




const CountriesAD = () => {
       const handleButtonClick = () => {
              alert('Button clicked!');
            };

            const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // This navigates back to the previous page
  };
       return (
              <>

       <div className="w-full flex items-center flex-col gap-y-3">
              <HeaderPageSection handleClick={handleGoBack} name={'Countries'} />

              <div className="flex justify-start">
                     <Link to={"add"}>
                     <ButtonAdd 
                            Text="Add"
                            BgColor="bg-AddButton"
                            Color="text-AddText"
                            handleClick={handleButtonClick}
                            iconColor="mainColor"
                            />
                     </Link>
              </div>

              <CountriesPage />
       </div>
              </>
       )
}

export default CountriesAD