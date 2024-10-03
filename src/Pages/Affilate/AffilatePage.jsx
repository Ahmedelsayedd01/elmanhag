import React from 'react'
import { useAuth } from '../../Context/Auth'
import { Button } from '../../Components/Button';
import { DiAndroid, DiApple } from "react-icons/di";

const AffilatePage = () => {
       const auth = useAuth();
       const handleLogOut = () => {
              auth.logout()
              navigate("/authentication/login", { replace: true });
       }
       return (
              <>
                     <div className="w-full flex flex-col gap-y-5 p-3">
                            {/* <div className='flex items-center gap-5'>
                                   <h1 className='w-52'>Download Android App : </h1>
                                   <div className="flex items-center justify-center w-100">
                                          <Button
                                                 type="submit"
                                                 Text="Download App"
                                                 BgColor="bg-mainColor"
                                                 Color="text-white"
                                                 Width="full"
                                                 Size="text-2xl"
                                                 px="px-28"
                                                 rounded="rounded-2xl"
                                          // stateLoding={isLoading}
                                          />
                                   </div>
                            </div>

                            <div className='flex items-center gap-5'>
                                   <h1 className='w-52'>Download IOS App :</h1>
                                   <div className="flex items-center justify-center w-100">
                                          <Button
                                                 type="submit"
                                                 Text="Download App"
                                                 BgColor="bg-mainColor"
                                                 Color="text-white"
                                                 Width="full"
                                                 Size="text-2xl"
                                                 px="px-28"
                                                 rounded="rounded-2xl"
                                          // stateLoding={isLoading}
                                          />
                                   </div>
                            </div> */}
                            <div className="mt-12 text-center">
                                   <h1 className="text-2xl sm:text-4xl font-bold mb-8 text-mainColor">حمل التطبيق الان</h1>
                                   <div className="flex flex-wrap justify-center gap-8">
                                          {/* Android Download */}
                                          <div
                                                 onClick={() => window.open('https://play.google.com/store/apps/details?id=com.elmanhag.aff', '_blank', 'noopener,noreferrer')}
                                                 className="w-36 sm:w-44 h-36 sm:h-44 bg-black rounded-full shadow-lg flex flex-col items-center justify-center hover:scale-110 transform transition duration-300 ease-in-out cursor-pointer"
                                          >
                                                 <DiAndroid className="text-5xl sm:text-6xl text-white" />
                                                 <span className="block mt-3 text-white text-lg sm:text-xl">Android</span>
                                          </div>

                                          {/* iOS Download */}
                                          <div className="w-36 sm:w-44 h-36 sm:h-44 bg-black rounded-full shadow-lg flex flex-col items-center justify-center hover:scale-110 transform transition duration-300 ease-in-out cursor-pointer">
                                                 <DiApple className="text-5xl sm:text-6xl text-white" />
                                                 <span className="block mt-3 text-white text-lg sm:text-xl">iOS</span>
                                          </div>
                                   </div>
                            </div>
                     </div>
              </>
       )
}

export default AffilatePage