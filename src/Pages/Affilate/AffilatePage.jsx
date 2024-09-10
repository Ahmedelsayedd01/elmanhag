import React from 'react'
import { useAuth } from '../../Context/Auth'
import { Button } from '../../Components/Button';

const AffilatePage = () => {
       const auth = useAuth();
       const handleLogOut = () => {
              auth.logout()
       }
       return (
              <>
                     <div className="w-full flex flex-col gap-y-5 p-3">
                            <div className='flex items-center gap-5'>
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
                            </div>

                     {/* <Button handleClick={handleLogOut} Text={'LogOut'} /> */}
                     </div>
              </>
       )
}

export default AffilatePage