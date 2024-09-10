import React, { useEffect, useState } from 'react'
import Loading from '../../../Components/Loading';
import { useAuth } from '../../../Context/Auth';
import axios from 'axios';
import TextTitle from '../../../Components/TextTitle';
import { BsFillPinFill } from 'react-icons/bs';
import { FaPercentage } from 'react-icons/fa';
import CheckBox from '../../../Components/CheckBox';
import InputCustom from '../../../Components/InputCustom';

const AffiliateCommissionsPage = () => {
       const auth = useAuth();
       const [isLoading, setIsLoading] = useState(false);

       const [commissions, setCommissions] = useState(null)
       const [commissionsType, setCommissionsType] = useState(null)
       const [commissionsValue, setCommissionsValue] = useState(null)
       const [commissionsFixed, setCommissionsFixed] = useState(0); // Change tracker
       const [commissionsPrecentage, setCommissionsPrecentage] = useState(0); // Change tracker
       const [commissionsChanged, setCommissionsChanged] = useState(false); // Change tracker



       const fetchCommissions = async () => {
              setIsLoading(true);
              try {
                     const response = await axios.get('https://bdev.elmanhag.shop/admin/affilate/commession', {
                            headers: {
                                   Authorization: `Bearer ${auth.user.token}`,
                            },
                     });
                     if (response.status === 200) {
                            setCommissions(response.data.commession);
                            setCommissionsType(response.data.commession.type);
                            setCommissionsValue(response.data.commession.amount);
                            if (response.data.commession.type == 'fixed') {
                                   setCommissionsFixed(1)
                            }
                            if (response.data.commession.type == 'precentage') {
                                   setCommissionsPrecentage(1)
                            }
                            console.log('response', response)
                     }
              } catch (error) {
                     console.error('Error fetching Commissions data:', error);
              } finally {
                     setIsLoading(false);
              }
       };

       useEffect(() => {
              fetchCommissions(); // Fetch Commissions initially and whenever studentsChanged changes
       }, [commissionsChanged]);

       useEffect(() => {
              console.log('Commissions', commissions)
              console.log('CommissionsType', commissionsType)
              console.log('CommissionsValue', commissionsValue)
       }, [commissions])

       const handleClickFixed = (e) => {
              const isChecked = e.target.checked;
              setCommissionsFixed(isChecked ? 1 : 0);
              { commissionsPrecentage == 1 ? setCommissionsPrecentage(0) : null }
       }
       const handleClickPrecentage = (e) => {
              const isChecked = e.target.checked;
              setCommissionsPrecentage(isChecked ? 1 : 0);
              { commissionsFixed == 1 ? setCommissionsFixed(0) : null }
       }



       if (isLoading) {
              return (
                     <div className="w-1/4 h-full flex items-start mt-[10%] justify-center m-auto">
                            <Loading />
                     </div>
              );
       }
       if (!commissions) {
              return <div className='text-mainColor text-2xl font-bold w-full h-full flex items-center justify-center'>No Commissions available</div>;
       }
       return (
              <>
                     <div className="w-full flex flex-col items-start gap-y-8">
                            <TextTitle text={'Payment Type'} width='text-2xl' font='smell' />
                            <div className="w-full flex flex-wrap items-center justify-start gap-x-8">
                                   <div className=" w-4/12 flex items-center justify-start bg-red-500">
                                          <BsFillPinFill className='text-thirdColor text-xl' />
                                          <span className='text-thirdColor text-2xl font-normal'>Fixed</span>
                                          <div className="ml-7">
                                                 <CheckBox handleClick={handleClickFixed} checked={commissionsFixed} />
                                          </div>
                                   </div>
                                   <div className=" w-4/12 flex items-center justify-start bg-red-500">
                                          <FaPercentage className='text-thirdColor text-xl' />
                                          <span className='text-thirdColor text-2xl font-normal'>Percentage</span>
                                          <div className="ml-7">
                                                 <CheckBox handleClick={handleClickPrecentage} checked={commissionsPrecentage} />
                                          </div>
                                   </div>
                            </div>

                            {commissionsFixed ?
                                   <>
                                          <InputCustom  />
                                   </>
                                   : <></>}


                     </div>
              </>
       )
}

export default AffiliateCommissionsPage