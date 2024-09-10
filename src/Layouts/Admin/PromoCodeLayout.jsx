import React from 'react'
import TitleHeader from "../../Components/TitleHeader";
import {PromoCodePage} from '../../Pages/AllPages';

const PromoCodeLayout = () => {
       return (
              <>
                     <div className="flex flex-col items-center gap-y-4">
                            <TitleHeader text={"PromoCode"} spaceBottom={3} />
                            <PromoCodePage />
                     </div>
              </>
       )
}

export default PromoCodeLayout

