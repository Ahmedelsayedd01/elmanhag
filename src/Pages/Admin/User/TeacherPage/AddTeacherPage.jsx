import React, { useEffect, useRef, useState } from 'react'
import { useAuth } from '../../../../Context/Auth'
import axios from 'axios';
import Loading from '../../../../Components/Loading';
import InputCustom from '../../../../Components/InputCustom';
import DropDownMenu from '../../../../Components/DropDownMenu';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../../Components/Button';
import { SiBabel } from 'react-icons/si';
import DeleteIcon from '../../../../Components/Icons/AdminIcons/DeleteIcon';
import CheckBox from '../../../../Components/CheckBox';

const AddTeacherPage = () => {

  const auth = useAuth();
  const navigate = useNavigate();

  const uploadTeacherPhotoRef = useRef();
  const dropdownCategoryRef = useRef();
  const dropdownSubjectRef = useRef();

  const [teacherName, setTeacherName] = useState('')
  const [teacherPhone, setTeacherPhone] = useState('')
  const [teacherEmail, setTeacherEmail] = useState('')
  const [teacherPassword, setTeacherPassword] = useState('')

  const [teacherStatus, setTeacherStatus] = useState(0);

  const [categoryNameSelected, setCategoryNameSelected] = useState('Select Category')
  const [subjectNameSelected, setSubjectNameSelected] = useState('Select Subject')

  const [categoryIdSelected, setCategoryIdSelected] = useState([])

  // const [tableData, setTableData] = useState([
  //   {
  //     categoryName: 'ssss',
  //     categoryId: 1,
  //     subjects: [
  //       { id: 55, name: 'asasas' },
  //       { id: 545, name: 'fsdf' },
  //     ],
  //   },
  //   {
  //     categoryName: 'sadas',
  //     categoryId: 2,
  //     subjects: [
  //       { id: 555, name: 'sdfs' },
  //       { id: 54545, name: 'sdfsd' },
  //     ],
  //   },
  // ]);
  const [tableData, setTableData] = useState([]);
  const [subjectData, setSubjectData] = useState([])

  const [allCategorySelected, setAllCategorySelected] = useState([])
  const [allSubjectSelected, setAllSubjectSelected] = useState([])

  const [openCategory, setOpenCategory] = useState(false);
  const [openSubject, setOpenSubject] = useState(false);

  const [teacherPhoto, setTeacherPhoto] = useState('');
  const [teacherPhotoFile, setTeacherPhotoFile] = useState(null);

  const [allCategory, setAllCategory] = useState([])
  const [allSubject, setAllSubject] = useState(null)


  const [isLoading, setIsLoading] = useState(false);

  const fetchSupData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get('https://bdev.elmanhag.shop/admin/teacher', {
        headers: {
          Authorization: `Bearer ${auth.user.token}`,
        },
      });
      if (response.status === 200) {
        console.log('fetchSupData', response.data);

        setAllCategory(response.data.categories);
        setAllSubject(response.data.subjects)

      }
    } catch (error) {
      console.error("Error fetching Lives data:", error);
    } finally {
      setIsLoading(false);
    }

  };

  useEffect(() => {
    fetchSupData();
    console.log('allCategory', allCategory)
  }, []);

  useEffect(() => {
    console.log('Updated subjectData:', subjectData);
  }, [subjectData]);

  const handleOpenCategory = () => {
    setOpenCategory(!openCategory);
    setOpenSubject(false);
  };
  const handleOpenSubject = () => {
    setOpenCategory(false);
    setOpenSubject(!openSubject);
  };

  const handleClick = (e) => {
    const isChecked = e.target.checked;
    setTeacherStatus(isChecked ? 1 : 0);
  };

  const handleSelectCategory = (e) => {
    const inputElement = e.currentTarget.querySelector('.inputVal');
    const selectedOptionName = e.currentTarget.textContent.trim();
    const selectedOptionValue = inputElement ? parseInt(inputElement.value) : null;

    const filterSubjects = allSubject.filter((s) => s.category_id === selectedOptionValue)
    setAllSubjectSelected(filterSubjects)

    setCategoryIdSelected(selectedOptionValue);
    setCategoryNameSelected(selectedOptionName);

    setOpenCategory(false);
    setCategoryIdSelected([...categoryIdSelected, selectedOptionValue]);

    console.log('filterSubjects', filterSubjects);
    console.log('Selected Category:', selectedOptionName);
    console.log('Category ID:', selectedOptionValue);

  };

  const handleSelectSubject = (e) => {
    const inputElement = e.currentTarget.querySelector('.inputVal');
    const selectedOptionName = e.currentTarget.textContent.trim();
    const selectedOptionValue = inputElement ? parseInt(inputElement.value) : '';

    setSubjectNameSelected(selectedOptionName);

    const obj = {
      id: tableData.length + 1,
      categoryName: categoryNameSelected,
      categoryId: categoryIdSelected,
      subjects: [
        {
          id: selectedOptionValue,
          name: selectedOptionName,
        }
      ]
    };

    // Store only the subject ID in subjectData (array of numbers)
    const subjectId = selectedOptionValue;

    // Add the new object to the tableData array
    setTableData((prevTableData) => [...prevTableData, obj]);

    // Update subjectData array to store just the subject ID (number)
    setSubjectData((prevSubjectData) => [...prevSubjectData, subjectId]);

    // Reset the dropdown selections
    setAllSubjectSelected([]);
    // setCategoryNameSelected('Selected Category');
    // setCategoryIdSelected((prevCategoryId) => [...prevCategoryId, subjectId]);
    setSubjectNameSelected('Selected Subject');

    // Optionally close the dropdown
    setOpenSubject(false);
  };


  // console.log('tableData:', tableData);
  // console.log('obj:', obj);
  // console.log('setSubjectData:', subjectData);
  // console.log('Selected Subject Name:', selectedOptionName);
  // console.log('Selected Subject ID:', selectedOptionValue);


  // setSelectSubject(prev =>
  //   prev.includes(selectedOptionName)
  //     ? prev.filter(name => name !== selectedOptionName)
  //     : [...prev, selectedOptionName]
  // );

  // setSelectSubjectId(prev =>
  //   prev.includes(selectedOptionValue)
  //     ? prev.filter(id => id !== selectedOptionValue)
  //     : [...prev, selectedOptionValue]
  // );


  const handleInputClick = (ref) => {
    if (ref.current) {
      ref.current.click();
    }
  };

  const handlePhotoFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setTeacherPhotoFile(file);
      setTeacherPhoto(file.name);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (dropdownCategoryRef.current && !dropdownCategoryRef.current.contains(event.target) &&
      dropdownSubjectRef.current && !dropdownSubjectRef.current.contains(event.target)
    ) {
      setOpenCategory(false);
      setOpenSubject(false);
    }
  };


  const handleGoBack = () => {
    navigate(-1, { replace: true });
  };

  const deleteSubject = (name) => {

    const updatedSubjects = tableData.filter(
      (table) => table.categoryName !== name
    );
    setTableData(updatedSubjects);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!teacherName) {
      auth.toastError('Please Enter Name.');
      return;
    }
    if (!teacherPhone) {
      auth.toastError('Please Enter Phone.');
      return;
    }
    if (!teacherPhotoFile) {
      auth.toastError('Please Enter Teacher Photo.');
      return;
    }
    if (!teacherEmail) {
      auth.toastError('Please Enter Email.');
      return;
    }
    if (!teacherPassword) {
      auth.toastError('Please Enter Password.');
      return;
    }
    if (categoryIdSelected.length === 0) {
      auth.toastError('Please Select Category.');
      return;
    }
    if (subjectData.length === 0) {
      auth.toastError('Please Select Subject.');
      return;
    }





    setIsLoading(true);

    const formData = new FormData();
    formData.append('name', teacherName);
    formData.append('phone', teacherPhone);
    formData.append('image', teacherPhotoFile);
    formData.append('email', teacherEmail);
    formData.append('password', teacherPassword);
    formData.append('status', teacherStatus);

    // Send the subjectData array directly, not as a JSON string
    subjectData.forEach((subjectId, index) => {
      formData.append(`subject[${index}]`, subjectId);
    });

    try {
      const response = await axios.post('https://bdev.elmanhag.shop/admin/teacher/add', formData, {
        headers: {
          Authorization: `Bearer ${auth.user.token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        handleGoBack();
        auth.toastSuccess(`${teacherName} added successfully!`);
      }
    } catch (error) {
      auth.toastError(`Error: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };


  if (isLoading) {
    return (
      <div className="w-1/4 h-full flex items-start mt-[10%] justify-center m-auto">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <form className="w-full flex flex-col items-center justify-center gap-y-4" onSubmit={handleSubmit}>
        <div className="w-full flex flex-wrap items-center justify-start gap-3">
          <div className="lg:w-[30%] sm:w-full">
            <InputCustom
              type="text"
              placeholder="Teacher Name"
              value={teacherName}
              required={false}
              onChange={(e) => setTeacherName(e.target.value)}
            />
          </div>
          <div className="lg:w-[30%] sm:w-full">
            <InputCustom
              type="text"
              placeholder="Teacher Phone"
              value={teacherPhone}
              required={false}
              onChange={(e) => {
                const value = e.target.value;
                // Only allow numbers
                if (!isNaN(value)) {
                  setTeacherPhone(value);
                }
              }}
            />
          </div>
          <div className="lg:w-[30%] sm:w-full">
            <div className="">
              <InputCustom
                type="text"
                upload={true}
                placeholder="Teacher Photo"
                value={teacherPhoto}
                readonly={true}
                onClick={() => handleInputClick(uploadTeacherPhotoRef)}
              />
              <input
                ref={uploadTeacherPhotoRef}
                type="file"
                className="hidden"
                onChange={handlePhotoFileChange}
              />
            </div>
          </div>
          <div className="lg:w-[30%] sm:w-full">
            <InputCustom
              type="email"
              placeholder="Teacher Email"
              value={teacherEmail}
              required={false}
              onChange={(e) => setTeacherEmail(e.target.value)}
            />
          </div>
          <div className="lg:w-[30%] sm:w-full">
            <InputCustom
              type="password"
              placeholder="Password"
              value={teacherPassword}
              required={false}
              onChange={(e) => setTeacherPassword(e.target.value)}
            />
          </div>

          <div className="lg:w-[30%] sm:w-full">
            <DropDownMenu
              ref={dropdownCategoryRef}
              handleOpen={handleOpenCategory}
              handleOpenOption={handleSelectCategory}
              stateoption={categoryNameSelected}
              openMenu={openCategory}
              options={allCategory}
            />
          </div>
          <div className="lg:w-[30%] sm:w-full">
            <DropDownMenu
              ref={dropdownSubjectRef}
              handleOpen={handleOpenSubject}
              handleOpenOption={handleSelectSubject}
              stateoption={allSubjectSelected.length === 0 ? 'Not Found' : subjectNameSelected}
              // stateoption={subjectData.length > 1 ? selectSubject : 'Not Found'}
              openMenu={openSubject}
              options={allSubjectSelected.length === 0 ? [{ id: 'Not Found', name: 'Not Found' }] : allSubjectSelected}
            />
          </div>
          <div className="flex items-center gap-x-4 lg:w-[30%] sm:w-full">
            <span className="text-2xl text-thirdColor font-medium">Active:</span>
            <div>
              <CheckBox checked={teacherStatus} handleClick={handleClick} />
            </div>
          </div>

        </div>
        {/* Table */}
        <div className="w-full flex flex-col items-center justify-between mt-4 overflow-x-auto">
          <table className="w-full min-w-full table-auto border-collapse bg-white shadow-md rounded-lg">
            <thead className="bg-gray-100">
              <tr className="border-b">
                <th className="px-4 py-2 text-mainColor text-center font-semibold text-sm lg:text-lg">#</th>
                <th className="px-4 py-2 text-mainColor text-center font-semibold text-sm lg:text-lg">Category</th>
                <th className="px-4 py-2 text-mainColor text-center font-semibold text-sm lg:text-lg">Subjects</th>
                <th className="px-4 py-2 text-mainColor text-center font-semibold text-sm lg:text-lg">Action</th>
              </tr>
            </thead>
            <tbody className="bg-thirdBgColor">
              {tableData.map((data, index) => (
                <tr key={data?.id} className="border-b hover:bg-gray-50 parentRow">
                  <td className="px-4 py-3 text-center text-thirdColor text-sm lg:text-base">{index + 1}</td>
                  <td className="px-4 py-3 text-center text-thirdColor text-sm lg:text-base">{data?.categoryName || '-'}</td>
                  <td className="px-4 py-3 text-center text-thirdColor text-sm lg:text-base">
                    {data?.subjects.map((sub) => (
                      <span className='flex flex-col' key={sub.id}>{sub.name || '-'}</span>
                    ))}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <button
                      type='button'
                      onClick={() => deleteSubject(data?.id)} // Wrap in arrow function
                      className="text-red-500"
                    >
                      <DeleteIcon />
                    </button>
                  </td>

                  {/* // onClick={(e) => e.currentTarget.closest(".parentRow").remove()} */}
                </tr>
              ))}

            </tbody>
          </table>
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
            // stateLoding={isLoading}
            />
          </div>
          <button type='button' onClick={handleGoBack} className="text-2xl text-mainColor">Cancel</button>
        </div>
      </form>

    </>
  )
}

export default AddTeacherPage