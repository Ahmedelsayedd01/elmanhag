import React from "react";
import TitleHeader from "../../Components/TitleHeader";
import { HomeWorkPage } from "../../Pages/AllPages";
import { useNavigate } from "react-router-dom";

const HomeWorkLayout = () => {
       const navigate = useNavigate();
       return (
              <>
                     <div className="flex flex-col items-center gap-y-4">
                            <TitleHeader text={"H.W"} spaceBottom={3} />
                            <HomeWorkPage />
                     </div>
              </>
       )
}

export default HomeWorkLayout
