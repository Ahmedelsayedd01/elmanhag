import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../Context/Auth';
import Loading from '../../../Components/Loading';
import axios from 'axios';
import { Button } from '../../../Components/Button';
import { useNavigate, Link } from 'react-router-dom';
import InputCustom from '../../../Components/InputCustom';
import { CiEdit } from "react-icons/ci";


const ProfileStudentPage = () => {

  const [activeTab, setActiveTab] = useState("student");
  const auth = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [student , setStudent] =useState('')

  const fetchStudentData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://bdev.elmanhag.shop/student/profile/view', {
        headers: {
          Authorization: `Bearer ${auth.user.token}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });

      if (response.status === 200) {
        console.log(response.data);
        setStudent(response.data.user)
        // setLiveData(response.data.live); // Store live data
      }
    } catch (error) {
      const errorMessages = error?.response?.data?.errors;
      let errorMessageString = 'Error occurred';
      if (errorMessages) {
        errorMessageString = Object.values(errorMessages).flat().join(' ');
      }
      auth.toastError('Error', errorMessageString);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentData();
  }, [auth.user.token]);

  if (isLoading) {
    return (
      <div className="w-1/4 h-full flex items-start mt-[10%] justify-center m-auto">
        <Loading />
      </div>
    );
  }

       return (
              <>
                <div>
                   <div className="flex w-full gap-5 mb-5 p-6">
                        {/* Tab buttons */}
                        <div className='w-2/5'> 
                            <Button
                            Text="الطالب"
                            Width="full"
                            px="px-1"
                            Size='text-2xl'
                            BgColor={activeTab === "student" ? "bg-mainColor" : "bg-white"}
                            Color={activeTab === "student" ? "text-white" : "text-mainColor"}
                            handleClick={() => setActiveTab("student")}
                            />
                        </div>
                        <div className='w-2/5'> 
                            <Button
                            Text="ولي الامر"
                            Width="full"
                            px="px-1"
                            Size='text-2xl'
                            BgColor={activeTab === "parent" ? "bg-red-600" : "bg-white"}
                            Color={activeTab === "parent" ? "text-white" : "text-red-600"}
                            handleClick={() => setActiveTab("parent")}
                            />
                        </div>
                    </div>

                {activeTab === "student" && (
                  <>
                    <div className="w-full flex flex-wrap items-center justify-start gap-3 p-6">
                        <div className="lg:w-[30%] sm:w-full">
                        <InputCustom
                            type="text"
                            value={student.name}
                            textDirection="true"
                            readonly = {true}
                        />
                        </div>
                        <div className="lg:w-[30%] sm:w-full">
                        <InputCustom
                            type="text"
                            value={student.category?.name}
                            textDirection="true"
                            readonly = {true}
                        />
                        </div>
                        <div className="lg:w-[30%] sm:w-full">
                        <InputCustom
                            type="text"
                            value={student.student_jobs?.job}
                            textDirection="true"
                            readonly = {true}
                        />
                        </div>
                        <div className="lg:w-[30%] sm:w-full">
                        <InputCustom
                            type="text"
                            value={student.edu}
                            textDirection="true"
                            readonly = {true}
                        />
                        </div>
                        <div className="lg:w-[30%] sm:w-full">
                        <InputCustom
                            type="text"
                            value={student.country_name}
                            textDirection="true"
                            readonly = {true}
                        />
                        </div>
                        <div className="lg:w-[30%] sm:w-full">
                        <InputCustom
                            type="text"
                            value={student.city_name}
                            textDirection="true"
                            readonly = {true}
                        />
                        </div> 
                        <div className="lg:w-[30%] sm:w-full">
                        <InputCustom
                            type="text"
                            value={student.phone}
                            textDirection="true"
                            readonly = {true}
                        />
                        </div> 
                    </div>


                    <div className="w-full flex justify-center mt-10">
                    <Link to="/dashboard/edit_profile" >
                    <div className='flex items-center justify-center bg-mainColor rounded-2xl p-1 w-64'>
                        <CiEdit size={36} color='white'/>
                        <div className="flex items-center justify-center">
                        <Button
                            Text="تعديل"
                            BgColor="bg-mainColor"
                            Color="text-white"
                            Width="full"
                            Size="text-2xl"
                            px="px-3"
                            rounded="rounded-2xl"
                        // stateLoding={isLoading}
                        />
                        </div>
                    </div>
                    </Link>
                </div>
                    </>
                )}


                {activeTab === "parent" && (
                    <div className="w-full flex flex-wrap items-center justify-start gap-3 p-6">
                        <div className="lg:w-[30%] sm:w-full">
                        <InputCustom
                            type="text"
                            value={student.parents?.name}
                            textDirection="true"
                            readonly = {true}
                        />
                        </div>
                        <div className="lg:w-[30%] sm:w-full">
                        <InputCustom
                            type="text"
                            value={student.parents?.phone}
                            textDirection="true"
                            readonly = {true}
                        />
                        </div> 
                    </div>
                )}

                {/* <div className="w-full flex justify-center mt-10">
                    <Link to="/dashboard/edit_profile" >
                    <div className='flex items-center justify-center bg-mainColor rounded-2xl p-1 w-64'>
                        <CiEdit size={36} color='white'/>
                        <div className="flex items-center justify-center">
                        <Button
                            Text="تعديل"
                            BgColor="bg-mainColor"
                            Color="text-white"
                            Width="full"
                            Size="text-2xl"
                            px="px-3"
                            rounded="rounded-2xl"
                        // stateLoding={isLoading}
                        />
                        </div>
                    </div>
                    </Link>
                </div>
         */}
                </div>
              </>
       )
}

export default ProfileStudentPage