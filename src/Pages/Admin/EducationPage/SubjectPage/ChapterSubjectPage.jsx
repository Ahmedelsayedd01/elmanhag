import React, { useContext, useEffect, useState } from 'react'
import { ChapterContext } from '../../../../Layouts/Admin/ChapterSubjectLayout'
import { Link, useLocation } from 'react-router-dom'
import { ButtonAdd } from '../../../../Components/Button'
import { FaPlus } from 'react-icons/fa'
import { IoIosArrowDown } from 'react-icons/io'
import EditIcon from '../../../../Components/Icons/AdminIcons/EditIcon'
import DeleteIcon from '../../../../Components/Icons/AdminIcons/DeleteIcon'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { Wroning } from '../../../../Components/Icons/All_Icons'
import Loading from '../../../../Components/Loading'
import { AiOutlineDrag } from 'react-icons/ai'
import { useAuth } from '../../../../Context/Auth'
import axios from 'axios'

const ChapterSubjectPage = () => {
  const [chapterContent, setChapterContent] = useState([])
  const [subjectID, setSubjectID] = useState(null)
  const [stateDate, setStateDate] = useState(false)
  const [openChapterId, setOpenChapterId] = useState(null) // Changed to track open chapter ID

  const [isDeleting, setIsDeleting] = useState(false);
  const [openDialog, setOpenDialog] = useState(null);

  const ChapterData = useContext(ChapterContext)
  const auth = useAuth();
  const location = useLocation();

  console.log('location', location)

  useEffect(() => {
    if (ChapterData.subjectChapter && ChapterData.subjectChapter.length > 0) {
      setChapterContent(ChapterData.subjectChapter);
      setSubjectID(ChapterData.subjectId || '');
      setStateDate(false);
    } else {
      setSubjectID(ChapterData.subjectId || '');
      setStateDate(true);
    }
  }, [ChapterData, stateDate]);

  const handleOpen = (chapterId) => {
    if (openChapterId === chapterId) {
      setOpenChapterId(null); // Close the currently open menu
    } else {
      setOpenChapterId(chapterId); // Open the clicked chapter's menu
    }
  }

  const handleOpenDialog = (chapterId) => {
    setOpenDialog(chapterId);
  };

  const handleCloseDialog = () => {
    setOpenDialog(null);
  };

  const handleDelete = async (chapterId) => {
    setIsDeleting(true);
    const success = await deleteChapter(chapterId, auth.user.token);
    setIsDeleting(false);
    handleCloseDialog();

    if (success) {
      auth.toastSuccess('Chapter deleted successfully!');
    } else {
      auth.toastError('Failed to delete Chapter.');
    }
  };

  const deleteChapter = async (chapterId, authToken) => {
    try {
      const response = await axios.delete(`https://bdev.elmanhag.shop/admin/category/delete/${chapterId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.status === 200) {
        return true;
      } else {
        console.error('Failed to delete Chapter:', response.status, response.statusText);
        return false;
      }
    } catch (error) {
      console.error('Error deleting categories:', error);
      return false;
    }
  };

  return (
    <>
      {stateDate ? (
        <div className='w-full mt-56 flex flex-col items-center justify-center '>
          <span className='text-2xl text-thirdColor font-semibold'>No Chapters Available Yet</span>
          <Link className='mt-4' to={'add_chapter'} state={{ subjectID }}>
            <ButtonAdd />
          </Link>
        </div>
      ) : (
        <>
          <div className="w-full flex items-start">
            <Link to={'add_chapter'} state={{ subjectID }}>
              <ButtonAdd />
            </Link>
          </div>
          <div className="mt-4 w-full flex flex-col items-center justify-center gap-4 ">
            {chapterContent.map((chapter, index) => (
              <div className="w-full flex flex-col rounded-3xl bg-white p-4" key={index}>
                <div className="w-full flex items-center justify-between">
                  <span className='text-mainColor text-2xl font-semibold hover:cursor-pointer'>{chapter.name}</span>
                  <div className="flex items-center justify-center gap-x-3">
                    <Link to={`add_lesson/${chapter.id}`} className='text-thirdColor text-xl'><FaPlus /></Link>
                    <Link to={`edit_chapter/${chapter.id}`}><EditIcon /></Link>
                    <button type="button" onClick={() => handleOpenDialog(chapter.id)}>
                      <DeleteIcon />
                    </button>
                    <AiOutlineDrag className='text-thirdColor text-2xl hover:cursor-move' />
                    <IoIosArrowDown
                      className={`${openChapterId === chapter.id ? "rotate-180" : "rotate-0"} text-thirdColor text-2xl transition-all duration-300 hover:cursor-pointer`}
                      onClick={() => handleOpen(chapter.id)}
                    />
                  </div>
                </div>
                {openChapterId === chapter.id && (
                  <div className="w-full mt-4 flex flex-col items-start gap-4">
                    {chapter.lessons && chapter.lessons.length > 0 ? (
                      chapter.lessons.map((lesson, index) => (
                        <span className='text-xl text-thirdColor font-semibold' key={index}>{lesson.name}</span>
                      ))
                    ) : (
                      <h2 className='text-xl text-mainColor font-semibold'>Not Found</h2>
                    )}
                  </div>
                )}

                {openDialog === chapter.id && (
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
                                  You will delete {chapter?.name || "null"}
                                </DialogTitle>
                              </div>
                            </div>
                          </div>
                          <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button
                              type="button"
                              onClick={() => handleDelete(chapter.id)}
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
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default ChapterSubjectPage;
