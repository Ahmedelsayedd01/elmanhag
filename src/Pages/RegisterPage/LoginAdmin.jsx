import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, Navigate, NavLink, useNavigate } from 'react-router-dom';
import Logo from "../../Assets/Images/logoBlack"
import Loading from '../../Components/Loading';
import { useAuth } from '../../Context/Auth';
import TextTitle from '../../Components/TextTitle';
import InputCustom from '../../Components/InputCustom';

const LoginAdmin = () => {
       const auth = useAuth();

       const [show, setShow] = useState(false)

       const [email, setEmail] = useState('');
       const [password, setPassword] = useState('');
       const [data, setData] = useState(null);
       const [type, setType] = useState('');
       const [error, setError] = useState('');
       const [isloading, setIsLoading] = useState(false);

       const navigate = useNavigate();

       useEffect(() => {
              if (data) {
                     console.log('Calling auth.login with data:', data); // Debugging line
                     auth.login(data); // Call auth.login with the updated data

                     setIsLoading(false);
                     navigate("/dashboardAdmin", { replace: true });
              }
       }, [data]);

       const handleSubmit = async (event) => {
              console.log(email)
              console.log(password)
              event.preventDefault();

              // Ensure email and password are defined
              if (!email || !password) {
                     console.error("Email or Password is missing");
                     return;
              }

              console.log('Email:', email);
              console.log('Password:', password);

              setIsLoading(true)
              try {
                     const response = await axios.post('https://bdev.elmanhag.shop/api/admin/auth/login', {
                            email,
                            password,
                     });

                     if (response.status === 200) {
                            const userData = {
                                   ...response.data.detailes,
                                   roles: [response.data.detailes.role] // Assuming type represents the user's role
                            };
                            auth.toastSuccess('Login successfully!');
                            console.log('Login response:', response); // Debugging line
                            setData(userData);
                            setType(response.data.detailes.role);
                            console.log("response", response);
                            
                     } else {
                            auth.toastError('Failed to post data');
                            setError('Failed to post data');
                            console.log("error", error);
                     }
              } catch (error) {
                     setError('There was an error posting the data!');
                     console.error(error);
              }
       };
       if (isloading) {
              return (
                     <div className="w-1/4  flex items-center h-screen justify-center m-auto">
                            <Loading />
                     </div>
              )
       }

       return (
              <>
                     <div className="flex flex-col lg:flex-row  items-center justify-center lg:justify-between w-full h-screen">

                            <div className="flex items-center justify-center w-full lg:w-6/12 h-full">
                                   <div className="flex flex-col items-center justify-start h-5/6 gap-8 w-10/12 mt-40">
                                          <TextTitle text={'Hello Admin'} color={'mainColor'} font={'medium'} />
                                          <form onSubmit={handleSubmit} className="w-full flex flex-col items-start justify-center gap-4 mt-10">
                                                 {/* <span className='text-thirdColor text-2xl font-medium'>Come on, log in</span> */}
                                                 <div className="w-full flex flex-col gap-6 items-end">
                                                        <InputCustom type={"email"} placeholder={"Email"} value={email} onChange={(e) => setEmail(e.target.value)} />
                                                        <InputCustom type={"password"} placeholder={"Password"} value={password} onChange={(e) => setPassword(e.target.value)} />

                                                        {/* <Link to={'/forgetPassword'} className="border-b-2 pb-1 border-mainColor text-2xl font-medium text-mainColor mb-6">Forget password?</Link> */}

                                                        {error && <div className="w-full text-mainColor text-center text-2xl mb-4 font-bold">{error}</div>}

                                                 </div>
                                                 <button type="submit" className="w-full text-center text-2xl font-medium text-secoundColor px-6 py-3 bg-mainColor rounded-2xl">Log in</button>
                                          </form>
                                   </div>
                            </div>
                            <div className="hidden lg:flex items-center justify-center w-6/12">
                                   {/* <img src={Logo} alt="" /> */}
                                   <Logo Height='250' />
                            </div>
                     </div >
              </>
       )
}

export default LoginAdmin