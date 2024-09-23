import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ButtonAdd } from '../../../../Components/Button';
import { FaPlus } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
import EditIcon from '../../../../Components/Icons/AdminIcons/EditIcon';
import DeleteIcon from '../../../../Components/Icons/AdminIcons/DeleteIcon';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { ApplayIcon, Wroning } from '../../../../Components/Icons/All_Icons';
import Loading from '../../../../Components/Loading';
import { AiOutlineDrag } from 'react-icons/ai';
import { useAuth } from '../../../../Context/Auth';
import axios from 'axios';
import CheckBox from '../../../../Components/CheckBox';

const ChapterSubjectPage = () => {
  const [chapters, setChapters] = useState([]);
  const [stateDate, setStateDate] = useState(false);
  const [openChapterId, setOpenChapterId] = useState(null);
  const [isDeletingChapter, setIsDeletingChapter] = useState(false);
  const [isDeletingLesson, setIsDeletingLesson] = useState(false);
  const [openChapterDialog, setOpenChapterDialog] = useState(null);
  const [openLessonDialog, setOpenLessonDialog] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [chaptersChanged, setChaptersChanged] = useState(false);

  const auth = useAuth();
  const location = useLocation();
  const subjectID = location.state || {};

  const fetchChapter = async () => {
    try {
      const response = await axios.get(`https://bdev.elmanhag.shop/admin/chapter/${subjectID}`, {
        headers: {
          Authorization: `Bearer ${auth.user.token}`,
        },
      });
      if (response.status === 200) {
        const fetchedChapters = response.data.chapters;
        setChapters(fetchedChapters);
        setStateDate(fetchedChapters.length === 0);
        console.log('response', response)
      }
    } catch (error) {
      console.error('Error fetching Chapters data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  const handleCheckLesson = (chapterId, lessonId, lessonName, check) => {
    const Checked = check === 1 ? 0 : 1;
    console.log('check', check);
    console.log('Checked', Checked);

    changeStatus(chapterId, lessonId, lessonName, Checked);
  };

  const changeStatus = async (chapterId, lessonId, lessonName, check) => {
    try {
      const response = await axios.put(
        `https://bdev.elmanhag.shop/admin/lesson/switch/${lessonId}`,
        { id: lessonId, switch: check },
        {
          headers: {
            Authorization: `Bearer ${auth.user.token}`,
          },
        }
      );

      if (response.status === 200) {
        // Create a shallow copy of chapters
        const updatedChapters = chapters.map((chapter) => {
          if (chapter.id === chapterId) {
            // Create a shallow copy of lessons for the specific chapter
            const updatedLessons = chapter.lessons.map((lesson) => {
              if (lesson.id === lessonId) {
                let stateSwitch = null;

                if (lesson.switch === 0) {
                  stateSwitch = 1;
                }
                if (lesson.switch === 1) {
                  stateSwitch = 0;
                }
                console.log('lessonssss', lesson)
                console.log('checkssss', check)
                console.log('stateSwitch', stateSwitch)
                console.log('switchsss', lesson.switch)
                // Return a new lesson object with updated status
                return {
                  ...lesson,
                  switch: stateSwitch, // Set status based on `check`
                };
              }
              return lesson; // Return unchanged lessons
            });
            console.log('updatedLessonsend', updatedLessons)

            // Return a new chapter object with updated lessons
            return {
              ...chapter,
              lessons: updatedLessons,
            };
          }
          return chapter; // Return unchanged chapters
        });

        // Set the new chapters array to update the state
        setChapters(updatedChapters);

        console.log('chapterId', chapterId);
        console.log('lessonId', lessonId);
        console.log('updatedChapters', updatedChapters);
        console.log('done');

        // Toast notifications based on the new status
        if (check === 0) {
          auth.toastSuccess(`Material ${lessonName} has been set to Inactive`);
        } else {
          auth.toastSuccess(`Material ${lessonName} has been set to Active`);
        }
      }

    } catch (error) {
      auth.toastError(error.message || 'Error updating lesson status');
      console.log('error', error);
    }
  };

  // }, [chaptersChanged])


  useEffect(() => {
    if (subjectID) {
      fetchChapter();
    } else {
      auth.toastError('No subjectID found in the state.');
    }
  }, [subjectID, chaptersChanged]);

  const handleOpen = (chapterId) => {
    setOpenChapterId(openChapterId === chapterId ? null : chapterId);
  };

  const handleOpenChapterDialog = (chapterId) => setOpenChapterDialog(chapterId);
  const handleCloseChapterDialog = () => setOpenChapterDialog(null);

  const handleOpenLessonDialog = (lessonId) => setOpenLessonDialog(lessonId);
  const handleCloseLessonDialog = () => setOpenLessonDialog(null);

  const handleCloseDialog = () => {
    setOpenChapterDialog(null);
    setOpenLessonDialog(null);
  };

  const handleDeleteChapter = async (chapterId) => {
    setIsDeletingChapter(true);
    const success = await deleteChapter(chapterId, auth.user.token); // Implement deleteChapter function separately
    setIsDeletingChapter(false);
    handleCloseDialog();

    if (success) {
      auth.toastSuccess('Chapter deleted successfully!');
      setChaptersChanged(!chaptersChanged);
    } else {
      auth.toastError('Failed to delete Chapter.');
    }
  };

  const handleDeleteLesson = async (lessonId) => {
    setIsDeletingLesson(true);
    const success = await deleteLesson(lessonId, auth.user.token); // Implement deleteLesson function separately
    setIsDeletingLesson(false);
    handleCloseDialog();

    if (success) {
      auth.toastSuccess('Lesson deleted successfully!');
      setChaptersChanged(!chaptersChanged);
    } else {
      auth.toastError('Failed to delete Lesson.');
    }
  };

  const deleteChapter = async (chapterId, authToken) => {
    try {
      const response = await axios.delete(`https://bdev.elmanhag.shop/admin/chapter/delete/${chapterId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.status === 200) {
        console.log('Chapter deleted successfully');
        return true;
      } else {
        console.error('Failed to delete Chapter:', response.status, response.statusText);
        return false;
      }
    } catch (error) {
      console.error('Error deleting Chapter:', error);
      return false;
    }
  };
  const deleteLesson = async (lessonId, authToken) => {
    try {
      const response = await axios.delete(`https://bdev.elmanhag.shop/admin/lesson/delete/${lessonId}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.status === 200) {
        console.log('Lesson deleted successfully');
        return true;
      } else {
        console.error('Failed to delete Lesson:', response.status, response.statusText);
        return false;
      }
    } catch (error) {
      console.error('Error deleting Lesson:', error);
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

  return (
    <>
      {stateDate ? (
        <div className='w-full mt-56 flex flex-col items-center justify-center'>
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
          <div className="mt-4 w-full flex flex-col items-center justify-center gap-4">
            {chapters.map((chapter) => (
              <div className="w-full flex flex-col rounded-3xl bg-white p-4" key={chapter.id}>
                <div className="w-full flex items-center justify-between">
                  <span className='text-mainColor text-2xl font-semibold hover:cursor-pointer'>{chapter.name}</span>
                  <div className="flex items-center justify-center gap-x-3">
                    <Link to={'add_lesson'} state={`${chapter.id}`} className='text-thirdColor text-xl'><FaPlus /></Link>
                    <Link to={`edit_chapter/${chapter.id}`}><EditIcon /></Link>
                    <button type="button" onClick={() => handleOpenChapterDialog(chapter.id)}>
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
                      chapter.lessons.map((lesson) => (
                        <div className="w-full flex items-center justify-between gap-y-5" key={lesson.id}>
                          <span className='text-xl text-thirdColor font-semibold'>{lesson.name}</span>
                          <div className="flex items-end gap-x-2">

                            <CheckBox handleClick={() => handleCheckLesson(chapter.id, lesson.id, lesson.name, lesson.switch)} checked={lesson.switch} />

                            <Link to={`edit_lesson/${lesson.id}`} state={lesson.id}><EditIcon /></Link>

                            <Link to={`material_lesson/${lesson.id}`} state={lesson.id}><ApplayIcon /></Link>
                            <button type="button" onClick={() => handleOpenLessonDialog(lesson.id)}>
                              <DeleteIcon />
                            </button>

                            {openLessonDialog === lesson.id && (
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
                                              You will delete {lesson?.name || "null"}
                                            </DialogTitle>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button
                                          type="button"
                                          onClick={() => handleDeleteLesson(lesson.id)}
                                          disabled={isDeletingLesson}
                                          className="inline-flex w-full justify-center rounded-md bg-mainColor px-6 py-3 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto"
                                        >
                                          {isDeletingLesson ? <div className="flex w-10 h-5"><Loading /></div> : 'Delete'}
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
                            <AiOutlineDrag className='text-thirdColor text-2xl hover:cursor-move' />
                          </div>
                        </div>
                      ))
                    ) : (
                      <h2 className='text-xl text-mainColor font-semibold'>Not Found</h2>
                    )}
                  </div>
                )}

                {openChapterDialog === chapter.id && (
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
                              onClick={() => handleDeleteChapter(chapter.id)}
                              disabled={isDeletingChapter}
                              className="inline-flex w-full justify-center rounded-md bg-mainColor px-6 py-3 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto"
                            >
                              {isDeletingChapter ? <div className="flex w-10 h-5"><Loading /></div> : 'Delete'}
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
};

export default ChapterSubjectPage;
