import React, { useEffect, useRef, useState } from 'react';
import { useAuth } from '../../../../Context/Auth';
import { ButtonAdd } from '../../../../Components/Button';
import SettingFilter from '../../../../Components/Icons/AdminIcons/SettingFilter';
import EditIcon from '../../../../Components/Icons/AdminIcons/EditIcon';
import DeleteIcon from '../../../../Components/Icons/AdminIcons/DeleteIcon';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DropDownMenu from '../../../../Components/DropDownMenu';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { Wroning } from '../../../../Components/Icons/All_Icons';
import Loading from '../../../../Components/Loading';

const SubjextPage = () => {
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [subjects, setSubjects] = useState(null);
  const [subject, setSubject] = useState(null);
  const [selectedOptionStatus, setSelectedOptionStatus] = useState('Filter By Status');
  const [selectedOptionCategory, setSelectedOptionCategory] = useState('Filter By Category');
  const [selectedOptionSemester, setSelectedOptionSemester] = useState('Filter By Semester');
  const [openStatus, setOpenStatus] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [openSemester, setOpenSemester] = useState(false);
  const [subjectsChanged, setSubjectsChanged] = useState(false); // Change tracker

  const dropdownStatusRef = useRef(null);
  const dropdownCategoryRef = useRef(null);
  const dropdownSemesterRef = useRef(null);

  const [isDeleting, setIsDeleting] = useState(false);
  const [openDialog, setOpenDialog] = useState(null);

  const handleOptionStatus = (e) => {
    setSelectedOptionStatus(e.target.innerText);
    setOpenStatus(false);
  };

  const handleOptionCategory = (e) => {
    setSelectedOptionCategory(e.target.innerText);
    setOpenCategory(false);
  };

  const handleOptionSemester = (e) => {
    setSelectedOptionSemester(e.target.innerText);
    setOpenSemester(false);
  };

  const handleOpenStatus = () => {
    setOpenStatus(!openStatus);
    setOpenCategory(false);
    setOpenSemester(false);
  };

  const handleOpenCategory = () => {
    setOpenStatus(false);
    setOpenCategory(!openCategory);
    setOpenSemester(false);
  };

  const handleOpenSemester = () => {
    setOpenStatus(false);
    setOpenCategory(false);
    setOpenSemester(!openSemester);
  };

  const handleClickOutside = (event) => {
    if (
      (dropdownStatusRef.current && !dropdownStatusRef.current.contains(event.target)) &&
      (dropdownCategoryRef.current && !dropdownCategoryRef.current.contains(event.target)) &&
      (dropdownSemesterRef.current && !dropdownSemesterRef.current.contains(event.target))
    ) {
      setOpenStatus(false);
      setOpenCategory(false);
      setOpenSemester(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const fetchSubjects = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://bdev.elmanhag.shop/admin/subject', {
        headers: {
          Authorization: `Bearer ${auth.user.token}`,
        },
      });
      if (response.status === 200) {
        setSubjects(response.data.subjects);
        setSubject(response.data);
      }
    } catch (error) {
      console.error('Error fetching Subjects data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSubjects(); // Fetch Subject initially and whenever Subjects Changed changes
  }, [subjectsChanged]);

  const handleOpenDialog = (subjectId) => {
    setOpenDialog(subjectId);
  };

  const handleCloseDialog = () => {
    setOpenDialog(null);
  };

  const handleDelete = async (subjectId) => {
    setIsDeleting(true);
    const success = await deleteSubject(subjectId, auth.user.token);
    setIsDeleting(false);
    handleCloseDialog();

    if (success) {
      auth.toastSuccess('Subject deleted successfully!');
      setSubjectsChanged(!subjectsChanged)
    } else {
      auth.toastError('Failed to delete Subject.');
    }
  };

  const deleteSubject = async (subjectId, authToken) => {
    try {
      const response = await axios.delete(`https://bdev.elmanhag.shop/admin/subject/delete/${subjectId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.status === 200) {
        console.log('Subject deleted successfully');
        return true;
      } else {
        console.error('Failed to delete Subject:', response.status, response.statusText);
        return false;
      }
    } catch (error) {
      console.error('Error deleting Subject:', error);
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

  if (!subjects) {
    return <div className='text-mainColor text-2xl font-bold w-full h-full flex items-center justify-center'>No Subject data available</div>;
  }

  localStorage.setItem("subjects", JSON.stringify(subject));


  return (
    <>
      <div className="w-full">
        <div className="w-full flex flex-wrap items-center justify-start gap-4">
          <div className="sm:w-full xl:w-1/5">
            <DropDownMenu
              ref={dropdownSemesterRef}
              iconMenu={<SettingFilter />}
              handleOpen={handleOpenSemester}
              handleOpenOption={handleOptionSemester}
              stateoption={selectedOptionSemester}
              openMenu={openSemester}
              options={subject.semester || []}
            />
          </div>
          <div className="sm:w-full xl:w-1/5">
            <DropDownMenu
              ref={dropdownCategoryRef}
              iconMenu={<SettingFilter />}
              handleOpen={handleOpenCategory}
              handleOpenOption={handleOptionCategory}
              stateoption={selectedOptionCategory}
              openMenu={openCategory}
              options={subject.category || []}
            />
          </div>
          <div className="sm:w-full xl:w-1/5">
            <DropDownMenu
              ref={dropdownStatusRef}
              iconMenu={<SettingFilter />}
              handleOpen={handleOpenStatus}
              handleOpenOption={handleOptionStatus}
              stateoption={selectedOptionStatus}
              openMenu={openStatus}
              options={subject.status || []}
            />
          </div>

          <div className="sm:w-full xl:w-1/12 xl:text-left">
            <Link to="add">
              <ButtonAdd Text={"Add"} BgColor={"white"} Color={"thirdColor"} Size={"xl"} />
            </Link>
          </div>
        </div>
        <div className="w-full flex items-center justify-between mt-4 overflow-x-auto">
          <table className="w-full sm:min-w-0">
            <thead className="w-full">
              <tr className="w-full border-b-2">
                <th className="min-w-[80px] sm:w-1/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">#</th>
                <th className="min-w-[150px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Name</th>
                <th className="min-w-[150px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Semester</th>
                <th className="min-w-[120px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Category</th>
                <th className="min-w-[120px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Price</th>
                <th className="min-w-[120px] sm:w-1/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Includes</th>
                <th className="min-w-[100px] sm:w-1/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Syllabus</th>
                <th className="min-w-[100px] sm:w-1/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Students</th>
                <th className="min-w-[100px] sm:w-1/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Status</th>
                <th className="min-w-[100px] sm:w-1/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Action</th>
              </tr>
            </thead>
            <tbody className="w-full">
              {subjects.map((subject, index) => (

                <tr className="w-full border-b-2" key={subject.id}>
                  <td
                    className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                  >
                    {index + 1}
                  </td>
                  <td
                    className="min-w-[120px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                  >
                    {subject?.name || 'Null'}
                  </td>
                  <td
                    className="min-w-[120px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                  >
                    {subject?.semester || 'Null'}
                  </td>
                  <td
                    className="min-w-[120px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                  >
                    {subject.category?.name || 'Null'}
                  </td>
                  <td
                    className="min-w-[150px] px-2 sm:min-w-[100px] sm:w-2/12 lg:w-3/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                  >
                    {subject.price_discount == undefined ? `${subject?.price || 'null'}` :
                      <>
                        <del className='text-mainColor'>{subject?.price || 'Null'}</del>  / {subject?.price_discount || 'Null'} EGP
                      </>
                    }
                    {/* <del className='text-mainColor'>{subject?.price || 'Null'}</del>
                    / {subject?.price_discount || 'Null'} EGP */}
                  </td>
                  <td
                    className="min-w-[150px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                  >
                    {subject?.chapters_count || 'Null'} chapters <br />
                    {subject?.lesson_count || 'Null'} lessons
                  </td>
                  <td
                    className="min-w-[120px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center  text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                  >
                    <span className='text-mainColor text-xl border-b-2 border-mainColor font-semibold'>
                      <Link to={`chapter/${subject.id}`} state={`${subject.id}`}>View</Link>
                    </span>
                  </td>
                  <td
                    className="min-w-[120px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center  text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                  >
                    <span className='text-thirdColor text-xl border-b-2 border-thirdColor'>
                      <Link to={`students/${subject.id}`}>
                        {subject?.students_count || 'Null'}
                      </Link>
                    </span>
                  </td>
                  <td
                    className="min-w-[120px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                  >
                    Active
                  </td>

                  <td
                    className="min-w-[100px] sm:min-w-[80px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                  >
                    <div className="flex items-center justify-center gap-x-3">
                      <Link to={`edit/${subject.id}`} type="button">
                        <EditIcon />
                      </Link>
                      <button type="button" onClick={() => handleOpenDialog(subject.id)}>
                        <DeleteIcon />
                      </button>
                      {openDialog === subject.id && (
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
                                        You will delete {subject?.name || "null"}
                                      </DialogTitle>
                                    </div>
                                  </div>
                                </div>
                                <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                  <button
                                    type="button"
                                    onClick={() => handleDelete(subject.id)}
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
      </div >
    </>
  );
};

export default SubjextPage;
