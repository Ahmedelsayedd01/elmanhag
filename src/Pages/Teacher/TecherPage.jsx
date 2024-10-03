import React from 'react'
import { DiAndroid, DiApple } from 'react-icons/di'

const TecherPage = () => {
       return (
              <>
                     <div className="w-full  flex flex-col gap-y-5 p-3">
                            <div className="mt-12 text-center">
                                   <h1 className="text-2xl sm:text-4xl font-bold mb-8 text-mainColor">حمل التطبيق الان</h1>
                                   <div className="flex flex-wrap justify-center gap-8">
                                          {/* Android Download */}
                                          <div className="w-36 sm:w-44 h-36 sm:h-44 bg-black rounded-full shadow-lg flex flex-col items-center justify-center hover:scale-110 transform transition duration-300 ease-in-out cursor-pointer">
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
                     </div ></>
       )
}

export default TecherPage