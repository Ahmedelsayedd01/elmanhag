import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputCustom from '../../../../Components/InputCustom';
import DropDownMenu from '../../../../Components/DropDownMenu';
import { Button } from '../../../../Components/Button';
import axios from 'axios';
import { useAuth } from '../../../../Context/Auth';
import CheckBox from '../../../../Components/CheckBox';

const AddCategoryPage = () => {
       const dropdownSelectParent = useRef();
       const uploadRef = useRef();
       const navigate = useNavigate();
       const auth = useAuth();

       const [categoryData, setCategoryData] = useState([]);
       const [categoryNameEn, setCategoryNameEn] = useState('');
       const [categoryNameAr, setCategoryNameAr] = useState('');
       const [categoryThumbnailFile, setCategoryThumbnailFile] = useState();
       const [categoryThumbnail, setCategoryThumbnail] = useState('');
       const [categoryTags, setCategoryTags] = useState('');
       const [categorySelectParent, setCategorySelectParent] = useState([]);
       const [categoryOrder, setCategoryOrder] = useState('');
       const [categoryActive, setCategoryActive] = useState(0);
       const [openSelectParent, setOpenSelectParent] = useState(false);
       const [selectParent, setSelectParent] = useState('Select Parent');
       const [selectParentId, setSelectParentId] = useState('');
       const [isLoading, setIsLoading] = useState(false);

       useEffect(() => {
              const categoryData = JSON.parse(localStorage.getItem('Categories'));
              setCategoryData(categoryData);
              setCategorySelectParent(categoryData.parent_categories);
       }, []);

       const handleOpenSelectParent = () => {
              setOpenSelectParent(!openSelectParent);
       };

       const handleClick = (e) => {
              const isChecked = e.target.checked;
              setCategoryActive(isChecked ? 1 : 0);
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

       const handleSubmitAdd = async (event) => {
              event.preventDefault();

              if (!selectParentId) {
                     setSelectParentId('')
                     // auth.toastError('Please Select Parent.');
                     // return; // Prevent form submission if no parent selected
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

                     const response = await axios.post('https://bdev.elmanhag.shop/admin/category/add', formData, {
                            headers: {
                                   Authorization: `Bearer ${auth.user.token}`,
                                   'Content-Type': 'multipart/form-data',
                            },
                     });

                     if (response.status === 200) {
                            auth.toastSuccess('Category added successfully!');
                            handleGoBack(); // Navigate after everything is done
                     } else {
                            auth.toastError('Failed to add Category.');
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
                     uploadRef.current.click(); // Trigger a click on the hidden file input
              }
       };

       const handleFileChange = (e) => {
              const file = e.target.files[0];
              if (file) {
                     setCategoryThumbnailFile(file); // Set file object for upload
                     setCategoryThumbnail(file.name); // Display file name in the text input
              }
              console.log(file)
       };

       return (
              <>
                     <form onSubmit={handleSubmitAdd} className="w-full flex flex-col items-center justify-center gap-y-3">
                            <div className="w-full flex flex-wrap items-center justify-start gap-3">
                                   <div className="lg:w-[30%] sm:w-full">
                                          <InputCustom
                                                 type="text"
                                                 placeholder="Name En"
                                                 value={categoryNameEn}
                                                 onChange={(e) => setCategoryNameEn(e.target.value)}
                                          />
                                   </div>
                                   <div className="lg:w-[30%] sm:w-full">
                                          <InputCustom
                                                 type="text"
                                                 placeholder="Name Ar"
                                                 value={categoryNameAr}
                                                 onChange={(e) => setCategoryNameAr(e.target.value)}
                                          />
                                   </div>
                                   <div className="lg:w-[30%] sm:w-full">
                                          <InputCustom
                                                 type="text"
                                                 placeholder="Thumbnail"
                                                 value={categoryThumbnail}
                                                 readonly={true} // Set to true for non-editable field
                                                 onClick={handleInputClick} // Trigger file input click
                                          />
                                          <input
                                                 type="file"
                                                 className="hidden"
                                                 onChange={handleFileChange} // Handle file selection
                                                 ref={uploadRef}
                                          />
                                   </div>
                                   <div className="lg:w-[30%] sm:w-full">
                                          <InputCustom
                                                 type="text"
                                                 placeholder="Tags"
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
                                                 options={categorySelectParent}
                                          />
                                   </div>
                                   <div className="lg:w-[30%] sm:w-full">
                                          <InputCustom
                                                 type="text"
                                                 placeholder="Order"
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
                                                 Text="Add"
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

export default AddCategoryPage;
