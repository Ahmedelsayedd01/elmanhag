// import React, { useState } from 'react';
// import { useAuth } from '../../Context/Auth';
// import AndroidIcon from "../../Components/AndroidIcon";
// import AppleIcon from "../../Components/AppleIcon";
// import { Link } from "react-router-dom";
// import { Button } from '../../Components/Button';
// import apkFile from '../../../public/assets/AppApk'; // Ensure this path is correct
import React, { useState } from 'react';
import { useAuth } from '../../Context/Auth';
import AndroidIcon from "../../Components/AndroidIcon";
import AppleIcon from "../../Components/AppleIcon";
import { Button } from '../../Components/Button';

// Correctly reference the APK file from the public folder
const apkFile = '/assets/AppApk/app-release.apk'; // Adjust this path if necessary

const AffilatePage = () => {
    const auth = useAuth();
    const [isWarningOpen, setIsWarningOpen] = useState(false);
    const warningMessage = "Coming Soon on App Store!";

    const handleLogOut = () => {
        auth.logout();
        navigate("/authentication/login", { replace: true });
    };

    const showWarning = () => {
        setIsWarningOpen(true);
    };

    const handleCloseWarning = () => {
        setIsWarningOpen(false);
    };

    const triggerDownload = () => {
        const link = document.createElement('a');
        link.href = apkFile; // This directly references the file path in the public folder
        link.setAttribute('download', 'app-release.apk'); // Specify the file name
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <>
            <div className="w-full flex flex-col gap-y-5 p-3">
                <div className="mt-12 text-center">
                    <h1 className="text-2xl sm:text-4xl font-bold mb-8 text-mainColor">حمل التطبيق الان</h1>
                    <div className="flex flex-wrap justify-center gap-8">
                        {/* Google Store link for downloading the APK */}
                        <div onClick={triggerDownload} style={{ cursor: "pointer" }}>
                            <div className="flex gap-5 bg-[#F6F6F6] px-7 py-4 justify-center items-center">
                                <h1 className="text-mainColor font-semibold">Google Store</h1>
                                <div>
                                    <AndroidIcon />
                                </div>
                            </div>
                        </div>

                        {/* iOS "Coming Soon" Button */}
                        <button onClick={showWarning}>
                            <div className="flex gap-5 bg-[#F6F6F6] px-7 py-4 justify-center items-center cursor-pointer">
                                <h1 className="text-mainColor font-semibold">App Store</h1>
                                <div>
                                    <AppleIcon />
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Warning Modal */}
            {isWarningOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 lg:mr-10">
                    <div className="bg-white p-6 md:p-12 rounded-lg w-11/12 md:w-1/2 lg:w-1/3">
                        <h2 className="text-[#6B6B6B] text-xl md:text-2xl font-bold mb-4">{warningMessage}</h2>
                        <div className="flex justify-end gap-4 sm:gap-2">
                            <Button
                                Text="حسنا"
                                Width="auto"
                                BgColor="bg-gray-300"
                                Color="text-black"
                                handleClick={handleCloseWarning} // Close modal when clicked
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AffilatePage;
