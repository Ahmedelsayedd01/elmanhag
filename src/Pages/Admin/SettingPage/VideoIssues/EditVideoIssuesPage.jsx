import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../../Context/Auth';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import InputCustom from '../../../../Components/InputCustom';
import { Button } from '../../../../Components/Button';
import CheckBox from '../../../../Components/CheckBox';
import Loading from '../../../../Components/Loading';

const EditVideoIssuesPage = () => {
  const { videoIssuesId } = useParams();

  const auth = useAuth();
  const navigate = useNavigate();

  const [titleIssues, setTitleIssues] = useState(null);
  const [descriptionIssues, setDescriptionIssues] = useState(null);
  const [thumbnailIssues, setThumbnailIssues] = useState(null);
  const [thumbnailIssuesFile, setThumbnailIssuesFile] = useState(null);
  const [statusIssues, setStatusIssues] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchVideoIssues = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`https://bcknd.elmanhag.com/admin/Settings/videoIssues/issue/${videoIssuesId}`, {
          headers: {
            Authorization: `Bearer ${auth.user.token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        if (response.status === 200) {
          const dataEdit = response.data.video_issue;
          console.log('response', response)
          setTitleIssues(dataEdit.title)
          setStatusIssues(dataEdit.status)
        }

      } catch (error) {
        auth.toastError(`Error: ${error}`);
      } finally {
        setIsLoading(false);
      }
    };
    fetchVideoIssues();
  }, [])

  const handleClick = (e) => {
    const isChecked = e.target.checked;
    setStatusIssues(isChecked ? 1 : 0);
  };

  const handleGoBack = () => {
    navigate(-1, { replace: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!titleIssues) {
      auth.toastError('Please Enter Video Issues.');
      return;
    }
    setIsLoading(true);

    try {
      const payload =
      {
        'title': titleIssues,
        'status': statusIssues,
      }

      const response = await axios.put(`https://bcknd.elmanhag.com/admin/Settings/videoIssues/update/${videoIssuesId}`, payload, {
        headers: {
          Authorization: `Bearer ${auth.user.token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        handleGoBack();
        auth.toastSuccess("Video Issues Edited Successfully!");
      }
    } catch (error) {
      auth.toastError(`Error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };
  if (isLoading) {
    return (<div className="w-1/4 h-full flex items-start mt-[10%] justify-center m-auto">
      <Loading />
    </div>)
  }

  return (
    <>
      <form className="w-full flex flex-col items-center justify-center gap-y-8 mt-4" onSubmit={handleSubmit}>
        <div className="w-full flex flex-wrap items-center justify-start gap-3">
          <div className="lg:w-[30%] sm:w-full">
            <InputCustom
              type="text"
              placeholder="Admin Name"
              value={titleIssues}
              required={false}
              onChange={(e) => setTitleIssues(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-x-4 lg:w-[30%] sm:w-full">
            <span className="text-2xl text-thirdColor font-medium">Active:</span>
            <div>
              <CheckBox checked={statusIssues} handleClick={handleClick} />
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
            />
          </div>
          <button type='button' onClick={handleGoBack} className="text-2xl text-mainColor">Cancel</button>
        </div>
      </form>
    </>
  )
}

export default EditVideoIssuesPage