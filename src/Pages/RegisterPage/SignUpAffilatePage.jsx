import { Button } from '../../Components/Button'
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import Loading from '../../Components/Loading';
import { useAuth } from '../../Context/Auth';
import TextTitle from '../../Components/TextTitle';
import InputCustom from '../../Components/InputCustom';

const SignUpAffilatePage = () => {

  const auth = useAuth();
  const [show, setShow] = useState(false)

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [country_id, setCountry] = useState('');
  const [city_id, setCity] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [conf_password, setconfirmPassword] = useState('');
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [isloading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // const handleSubmit = async (event) => {
  //   console.log(email)
  //   console.log(password)
  //   event.preventDefault();

  //   // Ensure email and password are defined
  //   if (!email || !password) {
  //     console.error("Email or Password is missing");
  //     return;
  //   }

  //   console.log('Email:', email);
  //   console.log('Password:', password);

  //   setIsLoading(true)
  //   try {
  //     const response = await axios.post('https://bdev.elmanhag.shop/affilate/auth/signup', {
  //       name, phone, country, city,
  //       email,
  //       password, conf_password
  //     });

  //     if (response.status === 200) {
  //       const userData = {
  //         ...response.data.detailes,
  //         // roles: [response.data.detailes.type] // Assuming type represents the user's role
  //       };
  //       console.log('Login response:', response); // Debugging line
  //       // setData(userData);
  //       // setType(response.data.detailes.type);
  //       console.log("response", response);

  //     } else {
  //       setError('Failed to post data');
  //       console.log("error", error);
  //     }
  //   } catch (error) {
  //     setError('There was an error posting the data!');
  //     console.error(error);
  //   }
  // };

  // if (isloading) {
  //   return (
  //     <div className="w-1/4 h-full flex items-center justify-center m-auto">
  //       <Loading />
  //     </div>
  //   )
  // }

  // if (type === "password") {
  //   return (<>
  //     <div className="relative w-full">
  //       <input type={show ? "text" : "password"} placeholder={placeholder} className=' w-full border rounded-2xl border-mainColor outline-none px-2 py-3 text-2xl font-normal text-thirdColor' required />
  //       {show ? <IoMdEye className='absolute top-4 right-2 text-2xl text-mainColor cursor-pointer' onClick={() => { setShow(!show) }} /> : <IoMdEyeOff className='absolute top-4 right-2 text-2xl text-mainColor cursor-pointer' onClick={() => setShow(!show)} />}
  //     </div>
  //   </>)
  // }
  useEffect(() => {
    if (data) {
      console.log('Calling auth.login with data:', data); // Debugging line
      auth.login(data); // Call auth.login with the updated data

      setIsLoading(false);
      navigate("/dashboard_affilate", { replace: true });
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
    const data = {
      name,
      phone,
      country_id,
      city_id,
      email,
      password,
      conf_password
    }
    try {
      const response = await axios.post('https://bdev.elmanhag.shop/affilate/auth/signup', data);

      if (response.status === 200) {
        const userData = {
          ...response.data.detailes,
          roles: [response.data.detailes.role] // Assuming type represents the user's role
        };
        auth.toastSuccess(`Welcome ${name}`);
        console.log('Login response:', response); // Debugging line
        setData(userData);
        setRole(response.data.detailes.role);
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
      <form onSubmit={handleSubmit} className="w-full flex flex-col items-start justify-center gap-4">
        <span className='text-thirdColor text-2xl font-medium'>Come on, Sign up</span>
        <div className="w-full flex flex-col gap-6 items-end">
          <InputCustom type={"name"} placeholder={"Name"} value={name} onChange={(e) => setName(e.target.value)} />
          <InputCustom type={"phone"} placeholder={"Phone"} value={phone} onChange={(e) => setPhone(e.target.value)} />
          <InputCustom type={"country"} placeholder={"Country"} value={country_id} onChange={(e) => setCountry(e.target.value)} />
          <InputCustom type={"city"} placeholder={"City"} value={city_id} onChange={(e) => setCity(e.target.value)} />
          <InputCustom type={"email"} placeholder={"Email"} value={email} onChange={(e) => setEmail(e.target.value)} />
          <InputCustom type={"password"} placeholder={"Password"} value={password} onChange={(e) => setPassword(e.target.value)} />
          <InputCustom type={"password"} placeholder={"Confirm Password"} value={conf_password} onChange={(e) => setconfirmPassword(e.target.value)} />

          {error && <div className="w-full text-mainColor text-center text-2xl mb-4 font-bold">{error}</div>}

        </div>
        <button type="submit" className="w-full text-center text-2xl font-medium text-secoundColor px-6 py-3 bg-mainColor rounded-2xl">sign up</button>
      </form>
    </>
  )
}

export default SignUpAffilatePage