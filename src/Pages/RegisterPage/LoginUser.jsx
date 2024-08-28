import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, Navigate, NavLink, useNavigate } from 'react-router-dom';
import Loading from '../../Components/Loading';
import { useAuth } from '../../Context/Auth';
import TextTitle from '../../Components/TextTitle';
import InputCustom from '../../Components/InputCustom';

const LoginPage = () => {
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
                     if (type === "student") {

                            navigate("/dashboard", { replace: true });
                     } else {

                            navigate("/dashboardUser", { replace: true });
                     }
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
                     const response = await axios.post('https://bdev.elmanhag.shop/api/user/auth/login', {
                            email,
                            password,
                     });

                     if (response.status === 200) {
                            const userData = {
                                   ...response.data.detailes,
                                   roles: [response.data.detailes.role] // Assuming type represents the user's role
                            };
                            console.log('Login response:', response); // Debugging line
                            setData(userData);
                            setType(response.data.detailes.role);
                            console.log("response", response);

                     } else {
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
                     <div className="w-1/4 h-screen flex items-center justify-center m-auto">
                            <Loading />
                     </div>
              )
       }

       if (type === "password") {
              return (<>
                     <div className="relative w-full">
                            <input type={show ? "text" : "password"} placeholder={placeholder} className=' w-full border rounded-2xl border-mainColor outline-none px-2 py-3 text-2xl font-normal text-thirdColor' required />
                            {show ? <IoMdEye className='absolute top-4 right-2 text-2xl text-mainColor cursor-pointer' onClick={() => { setShow(!show) }} /> : <IoMdEyeOff className='absolute top-4 right-2 text-2xl text-mainColor cursor-pointer' onClick={() => setShow(!show)} />}
                     </div>
              </>)
       }
       return (
              // <>

              //        <div className="flex items-center justify-center min-h-screen bg-gray-100">
              //               <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
              //                      <h2 className="text-2xl font-bold text-center">Login Page</h2>
              //                      <form onSubmit={handleSubmit} className="space-y-6">
              //                             <div>
              //                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              //                                    <input
              //                                           id="email"
              //                                           type="email"
              //                                           value={email}
              //                                           onChange={(e) => setEmail(e.target.value)}
              //                                           required
              //                                           className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              //                                    />
              //                             </div>
              //                             {/* <Loading /> */}
              //                             <div>
              //                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              //                                    <input
              //                                           id="password"
              //                                           type="password"
              //                                           value={password}
              //                                           onChange={(e) => setPassword(e.target.value)}
              //                                           required
              //                                           className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              //                                    />
              //                             </div>
              //                             <div>
              //                                    <button
              //                                           type="submit"
              //                                           className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              //                                    >
              //                                           Login
              //                                    </button>
              //                             </div>
              //                      </form>
              //                      {error && <div className="text-red-500">{error}</div>}
              //                      {data && <div>{data} sss</div>}
              //               </div>
              //        </div>
              // </>
              <>
                     <form onSubmit={handleSubmit} className="w-full flex flex-col items-start justify-center gap-4">
                            <span className='text-thirdColor text-2xl font-medium'>Come on, log in</span>
                            <div className="w-full flex flex-col gap-6 items-end">
                                   <InputCustom type={"email"} placeholder={"Email"} value={email} onChange={(e) => setEmail(e.target.value)} />
                                   <InputCustom type={"password"} placeholder={"Password"} value={password} onChange={(e) => setPassword(e.target.value)} />

                                   <Link to={'/forgetPassword'} className="border-b-2 pb-1 border-mainColor text-2xl font-medium text-mainColor mb-6">Forget password?</Link>

                                   {error && <div className="w-full text-mainColor text-center text-2xl mb-4 font-bold">{error}</div>}

                            </div>
                            <button type="submit" className="w-full text-center text-2xl font-medium text-secoundColor px-6 py-3 bg-mainColor rounded-2xl">Log in</button>
                     </form>
              </>
       );
};

export default LoginPage;
