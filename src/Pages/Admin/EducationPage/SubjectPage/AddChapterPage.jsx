import React, { useRef, useState } from 'react';
import InputCustom from '../../../../Components/InputCustom';
import { Button } from '../../../../Components/Button';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../../Context/Auth';
import axios from 'axios'; // Added axios import

const AddChapterPage = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { subjectID } = location.state || {}; // Destructuring with a fallback

  // If subjectID is not available, handle the case (optional)
  if (!subjectID) {
    console.error('No subjectID found in the state.');
  }

  const uploadThumbnailRef = useRef();
  const uploadCoverRef = useRef();
  const [chapterNameEn, setChapterNameEn] = useState('');
  const [chapterNameAr, setChapterNameAr] = useState('');
  const [chapterThumbnailFile, setChapterThumbnailFile] = useState();
  const [chapterThumbnail, setChapterThumbnail] = useState('');
  const [chapterCoverFile, setChapterCoverFile] = useState();
  const [chapterCover, setChapterCover] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGoBack = () => {
    navigate(-1, { replace: true });
  };

  const handleThumbnailClick = () => {
    if (uploadThumbnailRef.current) {
      uploadThumbnailRef.current.click();
    }
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setChapterThumbnailFile(file);
      setChapterThumbnail(file.name);
    }
  };

  const handleCoverClick = () => {
    if (uploadCoverRef.current) {
      uploadCoverRef.current.click();
    }
  };

  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setChapterCoverFile(file);
      setChapterCover(file.name);
    }
  };

  const handleSubmitAdd = async (event) => {
    event.preventDefault();

    if (!chapterNameEn) {
      auth.toastError('Please Enter NameEn.');
      return;
    }
    if (!chapterNameAr) {
      auth.toastError('Please Enter NameAr.');
      return;
    }
    if (!chapterThumbnail) {
      auth.toastError('Please Enter Thumbnail Photo.');
      return;
    }
    if (!chapterCover) {
      auth.toastError('Please Enter Cover Photo.');
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', chapterNameEn);
      formData.append('ar_name', chapterNameAr);
      formData.append('thumbnail', chapterThumbnailFile);
      formData.append('cover_photo', chapterCoverFile);

      const response = await axios.post(`http://62.84.185.153/plesk-site-preview/bcknd.elmanhag.com/https/62.84.185.153/admin/chapter/add/${subjectID}`, formData, {
        headers: {
          Authorization: `Bearer ${auth.user.token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        auth.toastSuccess('Chapter added successfully!');
        navigate(-1, { replace: true });
      } else {
        auth.toastError('Failed to add Chapter.');
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

  return (
    <>
      <form onSubmit={handleSubmitAdd} className="w-full flex flex-col items-center justify-center gap-y-3">
        <div className="w-full flex flex-wrap items-center justify-start gap-3">
          <div className="lg:w-[30%] sm:w-full">
            <InputCustom
              type="text"
              placeholder="Name En"
              value={chapterNameEn}
              onChange={(e) => setChapterNameEn(e.target.value)}
            />
          </div>

          <div className="lg:w-[30%] sm:w-full">
            <InputCustom
              type="text"
              placeholder="Name Ar"
              value={chapterNameAr}
              onChange={(e) => setChapterNameAr(e.target.value)}
            />
          </div>

          <div className="lg:w-[30%] sm:w-full">
            <InputCustom
              type="text"
              upload={true}
              placeholder="Thumbnail Photo"
              value={chapterThumbnail}
              readonly={true} // Fixed to readOnly
              onClick={handleThumbnailClick}
            />
            <input
              type="file"
              className="hidden"
              onChange={handleThumbnailChange}
              ref={uploadThumbnailRef}
            />
          </div>

          <div className="lg:w-[30%] sm:w-full">
            <InputCustom
              type="text"
              upload={true}
              placeholder="Cover Photo"
              value={chapterCover}
              readonly={true} // Fixed to readOnly
              onClick={handleCoverClick}
            />
            <input
              type="file"
              className="hidden"
              onChange={handleCoverChange}
              ref={uploadCoverRef}
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="w-full flex sm:flex-col lg:flex-row items-center justify-start sm:gap-y-5 lg:gap-x-28 sm:my-8 lg:my-0">
          <div className="flex items-center justify-center w-72">
            <Button
              type="submit"
              Text="Done"
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
}

export default AddChapterPage;
