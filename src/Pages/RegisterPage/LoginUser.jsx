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
       const [isloading, setIsLoading] = useState(false);

       const navigate = useNavigate();

       useEffect(() => {
              if (data) {
                     console.log('Calling auth.login with data:', data); // Debugging line
                     auth.login(data); // Call auth.login with the updated data

                     setIsLoading(false);
                     if (type === "student") {

                            navigate("/dashboard", { replace: true });
                     }
                     else if (type === "affilate") {

                            navigate("/dashboard_affilate", { replace: true });
                     }
              }
       }, [data]);

       const handleSubmit = async (event) => {
              event.preventDefault();

              console.log(email);
              console.log(password);

              // Ensure email and password are provided
              if (!email) {
                     auth.toastError("ادخل البريد الالكترونى");
                     return;
              }
              if (!email.includes('@')) {
                     auth.toastError("ادخل علامة '@' بعد اسم البريد الالكترونى")
                     return;
              }
              if (!password) {
                     auth.toastError("ادخل كلمة المرور");
                     return;
              }

              setIsLoading(true);
              try {
                     const response = await axios.post('https://bdev.elmanhag.shop/student/auth/login', {
                            email,
                            password,
                     });

                     if (response.status === 200) {
                            const userData = {
                                   ...response.data.user,
                                   roles: [response.data.role], // Assuming type represents the user's role
                            };

                            console.log('Login response:', response); // Debugging line
                            auth.toastSuccess('Login successfully!');
                            setData(userData);
                            setType(response.data.role);
                     }
              } catch (error) {
                     // Handle known error status codes or generic errors
                     if (error.response && error.response.status === 400) {
                            auth.toastError('Please Check Your Email Or Password');
                            console.log('Login failed:', error.response.data);
                     } else {
                            auth.toastError('You are not signed up. Please sign up to continue');
                            console.error('An error occurred:', error);
                     }
              } finally {
                     setIsLoading(false);
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
              <>
                     <form onSubmit={handleSubmit} className="w-full flex flex-col items-center justify-center gap-2 xl:mt-20">
                            <div className="w-full flex flex-col gap-6 items-end">
                                   <InputCustom
                                          type={"email"}
                                          textDirection={true}
                                          paddinRight='pr-2'
                                          placeholder={"البريد الالكترونى"}
                                          value={email}
                                          onChange={(e) => setEmail(e.target.value)}
                                          required={false}
                                   />
                                   <InputCustom
                                          type={"password"}
                                          iconDirection={true}
                                          textDirection={true}
                                          placeholder={"كلمة المرور"}
                                          value={password}
                                          onChange={(e) => setPassword(e.target.value)}
                                          required={false}
                                   />
                                   <Link to={'/forget_password'} className="border-b-2 pb-1 border-mainColor text-2xl font-medium text-mainColor mb-6">هل نسيت كلمة المرور؟</Link>
                            </div>
                            <div className="w-full flex flex-col gap-y-4">
                                   <button type="submit" className="w-full text-center text-2xl font-medium text-secoundColor hover:text-mainColor px-6 py-3 bg-mainColor hover:bg-secoundColor ease-in-out duration-300 rounded-2xl">تسجيل دخول</button>
                                   <div className="w-full flex items-baseline justify-between">
                                          <span className='w-6/12 h-[2px] rounded-2xl bg-thirdColor'></span>
                                          <span className='px-2 text-center text-xl text-thirdColor font-semibold'>أو</span>
                                          <span className='w-6/12 h-[2px] rounded-2xl bg-thirdColor'></span>
                                   </div>
                                   <Link to={'/authentication/signup'} className='w-full text-center text-2xl font-medium text-mainColor hover:text-secoundColor px-6 py-3 bg-secoundColor hover:bg-mainColor ease-in-out duration-300 border-2 border-mainColor rounded-2xl'>
                                          انشاء حساب
                                   </Link>
                            </div>
                     </form>
              </>
       );
};

export default LoginPage;
