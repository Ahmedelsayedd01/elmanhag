import React, { useState, useEffect } from "react";
import { IoSearch } from 'react-icons/io5';
import { Button } from "./Button"; 
import { useAuth } from "../Context/Auth";

const NavbarStudent = () => {
    const auth = useAuth();
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const loggedInStatus = localStorage.getItem('user') === 'true';
        if (loggedInStatus) {
            setUserName(auth.user?.name || '');
        }
    }, [auth.user]);

    return (
        <main className="bg-white p-4 flex flex-col items-center">
            <div className="flex items-center justify-between w-full max-w-6xl">
                <div className="flex flex-col items-start mr-8">
                    <h3 className="text-red-500 bg-white p-2 rounded-md mb-2 text-2xl font-bold">
                        مرحباً بك {userName}
                    </h3>
                    <label htmlFor="academicYear" className="text-black mr-2">سنة دراسية</label>
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
