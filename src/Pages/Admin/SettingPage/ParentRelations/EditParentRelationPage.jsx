import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import InputCustom from '../../../../Components/InputCustom';
import { Button } from '../../../../Components/Button';
import { useAuth } from '../../../../Context/Auth';
import { useNavigate, useParams } from 'react-router-dom';
import { parentRelationEditContext } from '../../../../Layouts/Admin/EditParentRelationLayout';

const EditParentRelationPage = () => {
    const parentRelationData = useContext(parentRelationEditContext);

    const auth = useAuth();
    const [relationContent, setRelationContent] = useState({});
    const [nameEn, setNameEn] = useState('');
    const [nameAr, setNameAr] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setRelationContent(parentRelationData);
        setNameEn(parentRelationData?.name || '');
        setNameAr(parentRelationData?.ar_name || '');
    }, [parentRelationData]);

    const handleGoBack = () => {
        navigate(-1, { replace: true });
    };

    const handleSubmitEdit = async (event) => {
        event.preventDefault();

        if (!nameEn) {
            auth.toastError('Please enter the English name.');
            return;
        }
        if (!nameAr) {
            auth.toastError('Please enter the Arabic name.');
            return;
        }

        setLoading(true);
        try {
            const requestData = {
                name: nameEn,
                ar_name: nameAr,
            };

            const response = await axios.put(`https://bcknd.elmanhag.com/admin/Settings/relation/update/${relationContent.id}`, requestData, {
                headers: {
                    Authorization: `Bearer ${auth.user.token}`,
                },
            });

            if (response.status === 200) {
                auth.toastSuccess('Parent Relation updated successfully!');
                handleGoBack();
            } else {
                auth.toastError('Failed to update Parent Relation.');
            }
        } catch (error) {
            console.error('Error updating Parent Relation:', error?.response?.data?.errors || 'Network error');
            auth.toastError('Error updating Parent Relation.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmitEdit} className='w-full flex flex-col items-start justify-center gap-y-3'>
                <div className="grid md:gap-8 grid-cols-2 lg:w-[70%] sm:w-full">
                    <div className="w-full">
                        <InputCustom
                            type="text"
                            borderColor="secoundColor"
                            placeholder="Name En"
                            value={nameEn}
                            onChange={(e) => setNameEn(e.target.value)}
                            width="w-full"
                        />
                    </div>
                    <div className="w-full">
                        <InputCustom
                            type="text"
                            borderColor="secoundColor"
                            placeholder="Name Ar"
                            value={nameAr}
                            onChange={(e) => setNameAr(e.target.value)}
                            width="w-full"
                        />
                    </div>
                </div>
                <div className="flex gap-4 mt-6">
                    <Button
                        stateLoading={loading}
                        Width="64"
                        Text="Done"
                        handleClick={handleSubmitEdit}
                    />
                    <Button
                        stateLoading={false}
                        Width="64"
                        Text="Cancel"
                        Color="text-mainColor"
                        BgColor="bg-thirdBgColor"
                        handleClick={handleGoBack}
                    />
                </div>
            </form>
        </>
    );
}

export default EditParentRelationPage