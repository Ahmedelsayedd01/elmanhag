import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../../Context/Auth';
import { ButtonAdd } from '../../../Components/Button';
import { Button } from '../../../Components/Button';
import SettingFilter from '../../../Components/Icons/AdminIcons/SettingFilter';
import EditIcon from '../../../Components/Icons/AdminIcons/EditIcon';
import DeleteIcon from '../../../Components/Icons/AdminIcons/DeleteIcon';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DropDownMenu from '../../../Components/DropDownMenu';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { Wroning } from '../../../Components/Icons/All_Icons';
import Loading from '../../../Components/Loading';

const HomeWorkPage = () => {
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [homeWorkData, setHomeWorkData] = useState(null);
  const [homeWorks, setHomeWorks] = useState(null);
  const [homeWorksChanged, setHomeWorksChanged] = useState(false); // Change tracker

  const [semesterData, setSemesterData] = useState([{ name: 'First' }, { name: 'Second' }]);
  const [lessonData, setLessonData] = useState([]);
  const [homeWorkLevel, setHomeWorkLevel] = useState([{ name: 'A' }, { name: 'B' },{ name: 'C' }]);
  const [chapterData, setChapterData] = useState([]);
  const [subjectData, setSubjectData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [homeWorkActive, setHomeWorkActive] = useState(false);

  const [selectSemester, setSelectSemester] = useState('Filter By Semester');
  const [selectSemesterId, setSelectSemesterId] = useState(null);
  const [openSelectSemester, setOpenSelectSemester] = useState(false);

  const [selectLesson, setSelectLesson] = useState('Filter By Lesson');
  const [selectLessonId, setSelectLessonId] = useState(null);
  const [openSelectLesson, setOpenSelectLesson] = useState(false);

  const [selectHWLevel, setSelectHWLevel] = useState('Filter By Difficulty');
  const [selectHWLevelId, setSelectHWLevelId] = useState(null);
  const [openSelectHWLevel, setOpenSelectHWLevel] = useState(false);

  const [selectChapter, setSelectChapter] = useState('Filter By Chapter');
  const [selectChapterId, setSelectChapterId] = useState(null);
  const [openSelectChapter, setOpenSelectChapter] = useState(false);

  const [selectSubject, setSelectSubject] = useState('Filter By Subject');
  const [selectSubjectId, setSelectSubjectId] = useState(null);
  const [openSelectSubject, setOpenSelectSubject] = useState(false);

  const [selectCategory, setSelectCategory] = useState('Filter By Category');
  const [selectCategoryId, setSelectCategoryId] = useState(null);
  const [openSelectCategory, setOpenSelectCategory] = useState(false);

  const [selectStatus, setSelectStatus] = useState('Filter By Status');
  const [openSelectStatus, setOpenSelectStatus] = useState(false);

  const dropdownSemesterRef = useRef(null);
  const dropdownLessonRef = useRef(null);
  const dropdownHWLevelRef = useRef(null);
  const dropdownChapterRef = useRef(null);
  const dropdownSubjectRef = useRef(null);
  const dropdownCategoryRef = useRef(null);
  const dropdownStatusRef = useRef(null);

  const handleOpenSelectSemester = () => {
    setOpenSelectSemester(!openSelectSemester);
    setOpenSelectLesson(false);
    setOpenSelectHWLevel(false);
    setOpenSelectChapter(false);
    setOpenSelectSubject(false);
    setOpenSelectCategory(false);
    setOpenSelectStatus(false);
  };

  const handleOpenSelectLesson = () => {
    setOpenSelectSemester(false);
    setOpenSelectLesson(!openSelectLesson);
    setOpenSelectHWLevel(false);
    setOpenSelectChapter(false);
    setOpenSelectSubject(false);
    setOpenSelectCategory(false);
    setOpenSelectStatus(false);
  };

  const handleOpenSelectHWLevel = () => {
    setOpenSelectSemester(false);
    setOpenSelectLesson(false);
    setOpenSelectHWLevel(!openSelectHWLevel);
    setOpenSelectChapter(false);
    setOpenSelectSubject(false);
    setOpenSelectCategory(false);
    setOpenSelectStatus(false);
  };

  const handleOpenSelectChapter = () => {
    setOpenSelectSemester(false);
    setOpenSelectLesson(false);
    setOpenSelectHWLevel(false);
    setOpenSelectChapter(!openSelectChapter);
    setOpenSelectSubject(false);
    setOpenSelectCategory(false);
    setOpenSelectStatus(false);
  };

  const handleOpenSelectSubject= () => {
    setOpenSelectSemester(false);
    setOpenSelectLesson(false);
    setOpenSelectHWLevel(false);
    setOpenSelectChapter(false);
    setOpenSelectSubject(!openSelectSubject);
    setOpenSelectCategory(false);
    setOpenSelectStatus(false);
  };

  const handleOpenSelectCategory = () => {
    setOpenSelectSemester(false);
    setOpenSelectLesson(false);
    setOpenSelectHWLevel(false);
    setOpenSelectChapter(false);
    setOpenSelectSubject(false);
    setOpenSelectCategory(!openSelectCategory);
    setOpenSelectStatus(false);
  };

  const handleOpenSelectStatus = () => {
    setOpenSelectSemester(false);
    setOpenSelectLesson(false);
    setOpenSelectHWLevel(false);
    setOpenSelectChapter(false);
    setOpenSelectSubject(false);
    setOpenSelectCategory(false);
    setOpenSelectStatus(!openSelectStatus);
  };

  const handleOptionSemester = (e) => {
    setSelectSemester(e.target.innerText);
    setOpenSelectSemester(false);
  };

  const handleOptionLesson = (e) => {
    setSelectLesson(e.target.innerText);
    setOpenSelectLesson(false);
  };

  const handleOptionHWLevel = (e) => {
    setSelectHWLevel(e.target.innerText);
    setOpenSelectHWLevel(false);
  };

  const handleOptionChapter = (e) => {
    setSelectChapter(e.target.innerText);
    setOpenSelectChapter(false);
  };

  const handleOptionSubject = (e) => {
    setSelectSubject(e.target.innerText);
    setOpenSelectSubject(false);
  };

  const handleOptionCategory = (e) => {
    setSelectCategory(e.target.innerText);
    setOpenSelectCategory(false);
  };

  const handleOptionStatus = (e) => {
    setSelectStatus(e.target.innerText);
    setOpenSelectStatus(false);
  };

  const [isDeleting, setIsDeleting] = useState(false);
  const [openDialog, setOpenDialog] = useState(null);

  const handleClickOutside = (event) => {
    if (
      (dropdownSemesterRef.current && !dropdownSemesterRef.current.contains(event.target))&&
      (dropdownLessonRef.current && !dropdownLessonRef.current.contains(event.target))&&
      (dropdownHWLevelRef.current && !dropdownHWLevelRef.current.contains(event.target))&&
      (dropdownChapterRef.current && !dropdownChapterRef.current.contains(event.target))&&
      (dropdownSubjectRef.current && !dropdownSubjectRef.current.contains(event.target)) &&
      (dropdownCategoryRef.current && !dropdownCategoryRef.current.contains(event.target)) &&
      (dropdownStatusRef.current && !dropdownStatusRef.current.contains(event.target))
    ) {
      setOpenSelectSemester(false);
      setOpenSelectLesson(false);
      setOpenSelectHWLevel(false);
      setOpenSelectChapter(false);
      setOpenSelectSubject(false);
      setOpenSelectCategory(false);
      setOpenSelectStatus(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [homeWorksChanged]);

  const fetchHomeWork = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(' https://bdev.elmanhag.shop/admin/homework', {
        headers: {
          Authorization: `Bearer ${auth.user.token}`,
        },
      });
      if (response.status === 200) {
        console.log(response.data)
        // setSubjects(response.data.subjects);
        setHomeWorks(response.data.homeworks);
        setLessonData(response.data.lessons);
        setChapterData(response.data.chapters);
        setSubjectData(response.data.subjects);
        setCategoryData(response.data.categories);
      }
    } catch (error) {
      console.error('Error fetching Subjects data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHomeWork(); // Fetch Subject initially and whenever Subjects Changed changes
  }, []);

  const handleOpenDialog = (homeWorkId) => {
    setOpenDialog(homeWorkId);
  };

  const handleCloseDialog = () => {
    setOpenDialog(null);
  };

  const handleDelete = async (homeWorkId) => {
    setIsDeleting(true);
    const success = await deleteHomeWork(homeWorkId, auth.user.token);
    setIsDeleting(false);
    handleCloseDialog();

    if (success) {
      auth.toastSuccess('HomeWork deleted successfully!');
      setHomeWorksChanged(!homeWorksChanged)
    } else {
      auth.toastError('Failed to delete HomeWork.');
    }
  };

  const deleteHomeWork = async (homeWorkId, authToken) => {
    try {
      const response = await axios.delete(`https://bdev.elmanhag.shop/admin/homework/delete/${homeWorkId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.status === 200) {
        console.log('HomeWork deleted successfully');
        return true;
      } else {
        console.error('Failed to delete HomeWork:', response.status, response.statusText);
        return false;
      }
    } catch (error) {
      console.error('Error deleting HomeWork:', error);
      return false;
    }
  };

  if (isLoading) {
    return (
      <div className="w-1/4 flex items-start mt-[10%] justify-center h-full m-auto">
        <Loading />
      </div>
    );
  }

  if (!homeWorks) {
    return <div className='text-mainColor text-2xl font-bold w-full h-full flex items-center justify-center'>No Home Work data available</div>;
  }

  // localStorage.setItem("homeWork", JSON.stringify(homeWorks));

  return (
    <>
      <div className="w-full">
          <div className="w-full flex flex-wrap items-center justify-start gap-4">
                    <div className="sm:w-full xl:w-1/5">
                          <DropDownMenu
                                  ref={dropdownSemesterRef}
                                  iconMenu={<SettingFilter />}
                                  handleOpen={handleOpenSelectSemester}
                                  handleOpenOption={handleOptionSemester}
                                  stateoption={selectSemester}
                                  openMenu={openSelectSemester}
                                  options={semesterData}
                          />
                    </div>
                    <div className="sm:w-full xl:w-1/5">
                          <DropDownMenu
                                  ref={dropdownLessonRef}
                                  iconMenu={<SettingFilter />}
                                  handleOpen={handleOpenSelectLesson}
                                  handleOpenOption={handleOptionLesson}
                                  stateoption={selectLesson}
                                  openMenu={openSelectLesson}
                                  options={lessonData}
                          />
                    </div>
                    <div className="sm:w-full xl:w-1/5">
                          <DropDownMenu
                                  ref={dropdownHWLevelRef}
                                  iconMenu={<SettingFilter />}
                                  handleOpen={handleOpenSelectHWLevel}
                                  handleOpenOption={handleOptionHWLevel}
                                  stateoption={selectHWLevel}
                                  openMenu={openSelectHWLevel}
                                  options={homeWorkLevel}
                          />
                    </div>
                    <div className="sm:w-full xl:w-1/5">
                          <DropDownMenu
                                  ref={dropdownChapterRef}
                                  iconMenu={<SettingFilter />}
                                  handleOpen={handleOpenSelectChapter}
                                  handleOpenOption={handleOptionChapter}
                                  stateoption={selectChapter}
                                  openMenu={openSelectChapter}
                                  options={chapterData}
                          />
                    </div>
                    <div className="sm:w-full xl:w-1/5">
                          <DropDownMenu
                                  ref={dropdownSubjectRef}
                                  iconMenu={<SettingFilter />}
                                  handleOpen={handleOpenSelectSubject}
                                  handleOpenOption={handleOptionSubject}
                                  stateoption={selectSubject}
                                  openMenu={openSelectSubject}
                                  options={subjectData}
                          />
                    </div>
                    <div className="sm:w-full xl:w-1/5">
                          <DropDownMenu
                                  ref={dropdownCategoryRef}
                                  iconMenu={<SettingFilter />}
                                  handleOpen={handleOpenSelectCategory}
                                  handleOpenOption={handleOptionCategory}
                                  stateoption={selectCategory}
                                  openMenu={openSelectCategory}
                                  options={categoryData}
                          />
                    </div>
                    <div className="sm:w-full xl:w-1/5">
                          <DropDownMenu
                                  ref={dropdownStatusRef}
                                  iconMenu={<SettingFilter />}
                                  handleOpen={handleOpenSelectStatus}
                                  handleOpenOption={handleOptionStatus}
                                  stateoption={selectStatus}
                                  openMenu={openSelectStatus}
                                  options={[{ id: 1, name: 'Active' }, { id: 2, name: 'Disable' }]}
                              //     options={homeWorkActive}
                          />
                    </div>

                    <div className="w-full flex sm:flex-col lg:flex-row items-center justify-start sm:gap-y-5 lg:gap-x-28 sm:my-8 lg:my-0">
                      <div className="flex items-center justify-center w-72">
                            <Button
                                    type="submit"
                                    Text="Submit"
                                    BgColor="bg-mainColor"
                                    Color="text-white"
                                    Width="full"
                                    Size="text-2xl"
                                    px="px-28"
                                    rounded="rounded-2xl"
                            />
                      </div>
                      <div className="flex items-center justify-center w-72 xl:text-left border border-red-600 rounded-2xl">
                            <Link to="add">
                                  <ButtonAdd Text={"Add"} BgColor={"bg-mainColor"} Color={"thirdColor"} Size={"xl"} />
                            </Link>
                      </div>                                 
                  </div>
      </div>

      <div className="w-full flex items-center justify-between mt-4 overflow-x-auto">
          <table className="w-full sm:min-w-0">
                <thead className="w-full">
                        <tr className="w-full border-b-2">
                              <th className="min-w-[80px] sm:w-1/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">#</th>
                              <th className="min-w-[150px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Title</th>
                              <th className="min-w-[150px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Semester</th>
                              <th className="min-w-[150px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Category</th>
                              <th className="min-w-[150px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Subject</th>
                              <th className="min-w-[150px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Chapter</th>
                              <th className="min-w-[150px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Lesson</th>
                              <th className="min-w-[150px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Difficulty</th>
                              <th className="min-w-[100px] sm:w-1/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Status</th>
                              <th className="min-w-[100px] sm:w-1/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Action</th>
                        </tr>
                </thead>
                <tbody className="w-full">
                        {homeWorks.map((homeWork, index) => (

                              <tr className="w-full border-b-2" key={homeWork.id}>
                                          <td
                                                className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                          >
                                                {index + 1}
                                          </td>
                                          <td
                                                className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                          >
                                                {homeWork?.title || 'Null'}
                                          </td>
                                          <td
                                                className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                          >
                                                {homeWork.semester || 'Null'}
                                          </td>
                                          <td
                                                className="min-w-[150px] px-2 sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                          >
                                                {homeWork.category?.name || 'Null'}

                                          </td>
                                          <td
                                                className="min-w-[120px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                          >
                                                {homeWork.subject?.name || 'Null'}
                                          </td>
                                          <td
                                                className="min-w-[120px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center  text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                          >
                                                {homeWork.chapter?.name || 'Null'}
                                          </td>
                                          <td
                                                className="min-w-[120px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center  text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                          >
                                                {homeWork.lesson?.name || 'Null'}
                                          </td>
                                          <td
                                                className="min-w-[120px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center  text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                          >
                                                {homeWork.difficulty || 'Null'}
                                          </td>
                                          <td
                                                className="min-w-[120px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                          >
                                                {homeWork?.status === 1 ? "Active" : "Disable" || 'Null'}
                                          </td>

                                          <td
                                                className="min-w-[100px] sm:min-w-[80px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                          >
                                                <div className="flex items-center justify-center gap-x-3">
                                                      <Link to={`edit/${homeWork.id}`} type="button">
                                                            <EditIcon />
                                                      </Link>
                                                      <button type="button" onClick={() => handleOpenDialog(homeWork.id)}>
                                                            <DeleteIcon />
                                                      </button>
                                                      {openDialog === homeWork.id && (
                                                            <Dialog open={true} onClose={handleCloseDialog} className="relative z-10">
                                                                  <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                                                                  <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                                                                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                                                                    <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                                                                          <div className="flex flex-col items-center justify-center bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                                                                                <Wroning Width='28' Height='28' aria-hidden="true" />
                                                                                                <div className="flex items-center">
                                                                                                      <div className="mt-2 text-center">
                                                                                                            <DialogTitle as="h3" className="text-xl font-semibold leading-10 text-gray-900">
                                                                                                                  You will delete {homeWork?.title || "null"}
                                                                                                            </DialogTitle>
                                                                                                      </div>
                                                                                                </div>
                                                                                          </div>
                                                                                          <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                                                                <button
                                                                                                      type="button"
                                                                                                      onClick={() => handleDelete(homeWork.id)}
                                                                                                      disabled={isDeleting}
                                                                                                      className="inline-flex w-full justify-center rounded-md bg-mainColor px-6 py-3 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto"
                                                                                                >
                                                                                                      {isDeleting ? <div className="flex w-10 h-5"><Loading /></div> : 'Delete'}
                                                                                                </button>
                                                                                                <button
                                                                                                      type="button"
                                                                                                      data-autofocus
                                                                                                      onClick={handleCloseDialog}
                                                                                                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-6 py-3 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:mt-0 sm:w-auto"
                                                                                                >
                                                                                                      Cancel
                                                                                                </button>
                                                                                          </div>
                                                                                    </DialogPanel>
                                                                        </div>
                                                                  </div>
                                                            </Dialog>
                                                      )}
                                                </div>
                                          </td>
                              </tr>
                        ))}
                </tbody>
          </table>
      </div>


      </div>
    </>
  )
}

export default HomeWorkPage