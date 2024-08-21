import React from 'react'
import TitleHeader from "../../Components/TitleHeader";
import { ButtonAdd } from "../../Components/Button";
import { useNavigate } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa";
import { ParentRelationPage } from '../../Pages/AllPages'

const ParentRelationAD = () => {
       const handleButtonClick = () => {
              alert("Button clicked!");
              };
       
              const navigate = useNavigate();
       
              const handleGoBack = () => {
              navigate(-1); // This navigates back to the previous page
              };
       return (
              <>
       <div className="flex flex-col gap-y-4">
              <div className="flex items-center justify-between w-full">
              <button className="flex-none" onClick={handleGoBack}>
              <FaAngleLeft
                     style={{ width: "24px", height: "24px", color: "#D01025" }}
              />
              </button>
              <div className="flex-1 text-center">
              <TitleHeader text={"Parent relation"} spaceBottom={3} />
              </div>
              </div>
              <div className="flex justify-start">
              <ButtonAdd
              Text="Add"
              BgColor="bg-AddButton"
              Color="text-AddText"
              handleClick={handleButtonClick}
              iconColor="#D01025"
              />
              </div>
              <ParentRelationPage />
              </div>
              </>
       )
}

export default ParentRelationAD