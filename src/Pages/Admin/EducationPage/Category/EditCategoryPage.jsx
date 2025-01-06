import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputCustom from '../../../../Components/InputCustom';
import DropDownMenu from '../../../../Components/DropDownMenu';
import { Button } from '../../../../Components/Button';
import axios from 'axios';
import { useAuth } from '../../../../Context/Auth';
import CheckBox from '../../../../Components/CheckBox';
import { CategoryDataContext } from '../../../../Layouts/Admin/EditCategoryLayout';

const EditCategoryPage = () => {
       const categoryContent = useContext(CategoryDataContext);

       const dropdownSelectParent = useRef();
       const uploadRef = useRef();
       const navigate = useNavigate();
       const auth = useAuth();

       const [categoryNameEn, setCategoryNameEn] = useState('');
       const [categoryNameAr, setCategoryNameAr] = useState('');
       const [categoryThumbnailFile, setCategoryThumbnailFile] = useState(null);
       const [categoryThumbnail, setCategoryThumbnail] = useState('');
       const [categoryTags, setCategoryTags] = useState('');

       const [categorySelectParent, setCategorySelectParent] = useState([]);
       const [categoryOrder, setCategoryOrder] = useState('');
       const [categoryActive, setCategoryActive] = useState(false);
       const [openSelectParent, setOpenSelectParent] = useState(false);
       const [selectParent, setSelectParent] = useState('Select Parent');
       const [selectParentId, setSelectParentId] = useState(null);
       const [isLoading, setIsLoading] = useState(false);

       useEffect(() => {
              if (categoryContent) {
                     setCategoryNameEn(categoryContent.name || '');
                     setCategoryNameAr(categoryContent.name_Ar || '');
                     setCategoryThumbnail(categoryContent.thumbnail || '');
                     setCategoryTags(categoryContent.tags || '');

                     if (categoryContent.parent_category) {
                            setSelectParent(categoryContent.parent_category.name);
                            setSelectParentId(categoryContent.parent_category.id);
                     } else {
                            setSelectParent('Select Parent');
                            setSelectParentId(null);
                     }

                     setCategoryOrder(categoryContent.order || '');
                     setCategoryActive(categoryContent.status || false);
              }
       }, [categoryContent]);

       useEffect(() => {
              if (selectParentId !== null) {
                     const filteredParentCategory = categorySelectParent.find(
                            (category) => category.id === selectParentId
                     );
                     if (filteredParentCategory) {
                            setSelectParent(filteredParentCategory.name);
                     }
              }
       }, [selectParentId, categorySelectParent]);

       useEffect(() => {
              const categoryData = JSON.parse(localStorage.getItem('Categories'));
              if (categoryData) {
                     setCategorySelectParent(categoryData.parent_categories || []);
              }
       }, []);

       const handleOpenSelectParent = () => {
              setOpenSelectParent(!openSelectParent);
       };

       const handleClick = (e) => {
              setCategoryActive(e.target.checked);
       };

       const handleSelectParent = (e) => {
              const inputElement = e.currentTarget.querySelector('.inputVal');
              const selectedOptionName = e.currentTarget.textContent.trim();
              const selectedOptionValue = inputElement ? inputElement.value : '';
              setSelectParent(selectedOptionName);
              setSelectParentId(parseInt(selectedOptionValue));
              setOpenSelectParent(false);
       };

       const handleGoBack = () => {
              navigate(-1, { replace: true });
       };

       const handleSubmitEdit = async (categoryID, event) => {
              event.preventDefault();

              if (!selectParentId) {
                     auth.toastError('Please Select Parent.');
                     return;
              }

              setIsLoading(true);
              try {
                     const formData = new FormData();
                     formData.append('name', categoryNameEn);
                     formData.append('ar_name', categoryNameAr);
                     formData.append('status', categoryActive);
                     formData.append('tags', categoryTags);
                     formData.append('thumbnail', categoryThumbnailFile);
                     formData.append('category_id', selectParentId);
                     formData.append('order', parseInt(categoryOrder));

                     // Convert FormData to a readable format
                     const formDataEntries = Array.from(formData.entries());
                     console.log('FormData Entries:', formDataEntries);

                     const response = await axios.put(`https://bcknd.elmanhag.com/admin/category/update/${categoryID}`, formData, {
                            headers: {
                                   Authorization: `Bearer ${auth.user.token}`,
                                   'Content-Type': 'multipart/form-data',
                            },
                     });

                     if (response.status === 200) {
                            auth.toastSuccess('Category updated successfully!');
                            handleGoBack();
                     } else {
                            auth.toastError('Failed to update Category.');
                     }
              } catch (error) {
                     const errorMessages = error?.response?.data.errors;
                     let errorMessageString = 'Error occurred';

                     if (errorMessages) {
                            errorMessageString = Object.values(errorMessages).flat().join(' ');
                     }

                     auth.toastError('Error', errorMessageString);
              } finally {
                     setIsLoading(false);
              }
       };

       const handleClickOutside = (event) => {
              if (dropdownSelectParent.current && !dropdownSelectParent.current.contains(event.target)) {
                     setOpenSelectParent(false);
              }
       };

       useEffect(() => {
              document.addEventListener('mousedown', handleClickOutside);
              return () => {
                     document.removeEventListener('mousedown', handleClickOutside);
              };
       }, []);

       const handleInputClick = () => {
              if (uploadRef.current) {
                     uploadRef.current.click();
              }
       };

       const handleFileChange = (e) => {
              const file = e.target.files[0];
              if (file) {
                     setCategoryThumbnailFile(file);
                     setCategoryThumbnail(file.name);
              }
       };

       return (
              <>
                     <form onSubmit={(event) => handleSubmitEdit(categoryContent.id, event)} className="w-full flex flex-col items-center justify-center gap-y-3">
                            <div className="w-full flex flex-wrap items-center justify-start gap-3">
                                   <div className="lg:w-[30%] sm:w-full">
                                          <InputCustom
                                                 type="text"
                                                 placeholder="Enter Name En"
                                                 value={categoryNameEn}
                                                 onChange={(e) => setCategoryNameEn(e.target.value)}
                                          />
                                   </div>
                                   <div className="lg:w-[30%] sm:w-full">
                                          <InputCustom
                                                 type="text"
                                                 placeholder="Enter Name Ar"
                                                 value={categoryNameAr}
                                                 onChange={(e) => setCategoryNameAr(e.target.value)}
                                          />
                                   </div>
                                   <div className="lg:w-[30%] sm:w-full">
                                          <InputCustom
                                                 type="text"
                                                 placeholder="Thumbnail"
                                                 value={categoryThumbnail}
                                                 readonly={true}
                                                 onClick={handleInputClick}
                                          />
                                          <input
                                                 type="file"
                                                 className="hidden"
                                                 onChange={handleFileChange}
                                                 ref={uploadRef}
                                          />
                                   </div>
                                   <div className="lg:w-[30%] sm:w-full">
                                          <InputCustom
                                                 type="text"
                                                 placeholder="Enter Tags"
                                                 value={categoryTags}
                                                 onChange={(e) => setCategoryTags(e.target.value)}
                                          />
                                   </div>
                                   <div className="lg:w-[30%] sm:w-full">
                                          <DropDownMenu
                                                 ref={dropdownSelectParent}
                                                 handleOpen={handleOpenSelectParent}
                                                 handleOpenOption={handleSelectParent}
                                                 stateoption={selectParent}
                                                 openMenu={openSelectParent}
                                                 options={categorySelectParent || []}
                                          />
                                   </div>
                                   <div className="lg:w-[30%] sm:w-full">
                                          <InputCustom
                                                 type="number"
                                                 placeholder="Enter Order"
                                                 value={categoryOrder}
                                                 onChange={(e) => setCategoryOrder(e.target.value)}
                                          />
                                   </div>
                                   <div className="flex items-center gap-x-4 lg:w-[30%] sm:w-full">
                                          <span className="text-2xl text-thirdColor font-medium">Active:</span>
                                          <div>
                                                 <CheckBox checked={categoryActive} handleClick={handleClick} />
                                          </div>
                                   </div>
                            </div>
                            {/* Buttons */}
                            <div className="w-full flex sm:flex-col lg:flex-row items-center justify-start sm:gap-y-5 lg:gap-x-28 sm:my-8 lg:my-0">
                                   <div className="flex items-center justify-center w-72">
                                          <Button
                                                 type="submit"
                                                 Text="Edit"
                                                 BgColor="bg-mainColor"
                                                 Color="text-white"
                                                 Width="full"
                                                 Size="text-2xl"
                                                 px="px-28"
                                                 rounded="rounded-2xl"
                                                 stateLoding={isLoading}
                                          />
                                   </div>
                                   <button onClick={handleGoBack} className="text-2xl text-mainColor">Cancel</button>
                            </div>
                     </form>
              </>
       );
};

export default EditCategoryPage;
