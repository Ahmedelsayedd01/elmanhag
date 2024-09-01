import React from "react";
import TitleHeader from "../../Components/TitleHeader";
import { CitiesPage } from "../../Pages/AllPages";
import { useNavigate } from "react-router-dom";

const CitiesLayout = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // This navigates back to the previous page
  };
  return (
    <>
    <div className="flex flex-col items-center gap-y-4">
          <TitleHeader text={"Cities"} spaceBottom={3} />
          <CitiesPage />
    </div>
    </>
  );
};

export default CitiesLayout;
