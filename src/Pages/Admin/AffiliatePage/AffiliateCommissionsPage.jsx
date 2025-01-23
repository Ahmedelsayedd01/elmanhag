import React, { useEffect, useState } from 'react'
import Loading from '../../../Components/Loading';
import { useAuth } from '../../../Context/Auth';
import axios from 'axios';
import TextTitle from '../../../Components/TextTitle';
import { BsFillPinFill } from 'react-icons/bs';
import { FaPercentage } from 'react-icons/fa';
import CheckBox from '../../../Components/CheckBox';
import InputCustom from '../../../Components/InputCustom';
import { LuDollarSign } from 'react-icons/lu';
import { Button } from '../../../Components/Button';

const AffiliateCommissionsPage = () => {
       const auth = useAuth();
       const [isLoading, setIsLoading] = useState(false);

       const [commissions, setCommissions] = useState(null)
       const [commissionsType, setCommissionsType] = useState(null)
       const [commissionsValue, setCommissionsValue] = useState(null)
       const [commissionsFixed, setCommissionsFixed] = useState(0); // Change tracker
       const [commissionsPercentage, setCommissionsPercentage] = useState(0); // Change tracker
       const [commissionsChanged, setCommissionsChanged] = useState(false); // Change tracker



       const fetchCommissions = async () => {
              setIsLoading(true);
              try {
                     const response = await axios.get('http://62.84.185.153/plesk-site-preview/bcknd.elmanhag.com/https/62.84.185.153/admin/affilate/commession', {
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
                            if (response.data.commession.type == 'percentage') {
                                   setCommissionsPercentage(1)
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
              setCommissionsType('fixed')
              setCommissionsFixed(isChecked ? 1 : 0);
              { commissionsPercentage == 1 ? setCommissionsPercentage(0) : null }
       }
       const handleClickPercentage = (e) => {
              const isChecked = e.target.checked;
              setCommissionsType('percentage')
              setCommissionsPercentage(isChecked ? 1 : 0);
              { commissionsFixed == 1 ? setCommissionsFixed(0) : null }
       }


       const handleSave = async () => {
              try {
                     const responce = await axios.put('http://62.84.185.153/plesk-site-preview/bcknd.elmanhag.com/https/62.84.185.153/admin/affilate/addCommession',
                            {
                                   type: commissionsType,
                                   amount: commissionsValue,
                            }, {
                            headers: {
                                   Authorization: `Bearer ${auth.user.token}`,
                            }
                     });
                     if (responce.status === 200) {
                            auth.toastSuccess('Commissions Save Successfully!');
                            setCommissionsChanged(!commissionsChanged)
                     }
              } catch (error) {
                     console.error('Error fetching Commissions data:', error);
              }
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
                                   <div className=" w-4/12 flex items-center justify-start">
                                          <BsFillPinFill className='text-thirdColor text-xl' />
                                          <span className='text-thirdColor text-2xl font-normal'>Fixed</span>
                                          <div className="ml-7">
                                                 <CheckBox handleClick={handleClickFixed} checked={commissionsFixed} />
                                          </div>
                                   </div>
                                   <div className=" w-4/12 flex items-center justify-start">
                                          <FaPercentage className='text-thirdColor text-xl' />
                                          <span className='text-thirdColor text-2xl font-normal'>Percentage</span>
                                          <div className="ml-7">
                                                 <CheckBox handleClick={handleClickPercentage} checked={commissionsPercentage} />
                                          </div>
                                   </div>
                            </div>

                            {commissionsFixed ?
                                   <>
                                          <div className="w-full flex flex-wrap items-center gap-4">

                                                 <div className="w-6/12 flex items-center">
                                                        <LuDollarSign className='text-thirdColor text-5xl' />
                                                        <InputCustom
                                                               type={'number'}
                                                               paddinRight='pr-1'
                                                               placeholder={'Enter The Fixed Commission'}
                                                               value={commissionsValue}
                                                               onChange={(e) => setCommissionsValue(e.target.value)} />
                                                 </div>
                                                 <div className="flex items-center justify-center w-72">
                                                        <Button type='Save' Text={"Save"} BgColor="bg-mainColor" Color="text-white" Width='full' Size='text-2xl' px='px-28' rounded='rounded-2xl' handleClick={handleSave} />
                                                 </div>
                                          </div>
                                   </> :
                                   <>
                                          <div className="w-full flex flex-wrap items-center gap-4">

                                                 <div className="w-6/12 flex items-center">
                                                        <FaPercentage className='text-thirdColor text-4xl' />
                                                        <InputCustom
                                                               type={'number'}
                                                               paddinRight='pr-1'
                                                               placeholder={'Enter The Percentage Commission'}
                                                               value={commissionsValue}
                                                               onChange={(e) => setCommissionsValue(e.target.value)} />
                                                 </div>
                                                 <div className="flex items-center justify-center w-72">
                                                        <Button type='Save' Text={"Save"} BgColor="bg-mainColor" Color="text-white" Width='full' Size='text-2xl' px='px-28' rounded='rounded-2xl' handleClick={handleSave} />
                                                 </div>
                                          </div>
                                   </>}


                     </div>
              </>
       )
}

export default AffiliateCommissionsPage