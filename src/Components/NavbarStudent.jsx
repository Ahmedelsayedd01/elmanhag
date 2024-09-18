import React, { useState, useEffect } from "react";
import { IoSearch } from 'react-icons/io5';
import { Button } from "./Button";
import { useAuth } from "../Context/Auth";
import { Link, useNavigate } from 'react-router-dom'

const NavbarStudent = () => {
    const auth = useAuth();
    const [userName, setUserName] = useState('');

    useEffect(() => {
        setUserName(auth.user?.name || '');
    }, [auth.user]);
    console.log('userName', userName)

    // const navigate = useNavigate();

    //    const handleLogout = () => {
    //           auth.logout();
    //           navigate("/authentication/login", { replace: true });
    //    }
    //    const handleGoBack = () => {
    //           navigate(-1, { replace: true });
    //    }
    return (
        <main className="bg-white p-4 flex flex-col items-center">
            <div className="flex items-center justify-between w-full max-w-6xl">
                <div className="flex w-full justify-between mr-8">
                    <div>
                    <h3 className="text-red-500 bg-white p-2 rounded-md mb-2 text-2xl font-bold">
                        مرحباً بك {userName}
                    </h3>
                    </div>
                    <div>
                        <button type='button' className="px-4 py-3 mx-auto text-2xl  text-secoundColor bg-mainColor rounded-2xl" onClick={handleLogout}>Log Out</button>
                    </div>
                </div>
                <div className="flex items-center">
                    <div className="ml-4">
                        {auth.user ? (
                            // Buttons can be conditionally rendered here if needed
                            <>
                            </>
                        ) : (
                            <>
                                <Button color="primary" Text='إنشاء حساب' className="mr-2" />
                                <Button color="primary" Text='تسجيل دخول' />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default NavbarStudent;
