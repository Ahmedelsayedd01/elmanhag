import React, { useRef, useState, useEffect } from 'react';
import InputCustom from '../../../../Components/InputCustom';
import { Button } from '../../../../Components/Button';
import { useAuth } from '../../../../Context/Auth';
import DropDownMenu from '../../../../Components/DropDownMenu';
import MultipleChoiceMenu from '../../../../Components/MultipleChoiceMenu';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CheckBox from '../../../../Components/CheckBox';

const AddDiscountPage = () => {

  const auth = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [semesterData, setSemesterData] = useState([{ name: 'First' }, { name: 'Second' }]);
  const [categoryData, setCategoryData] = useState([]);
  const [subjectData, setSubjectData] = useState([]);
  const [allSubjects, setAllSubjects] = useState([]); // Store all subjects initially
  const [bundleData, setBundleData] = useState([]);
  const [allBundles, setAllBundles] = useState([]); // Store all subjects initially
  const [discountData, setDiscountData] = useState([]);

  const [valueType, setValueType] = useState([{ name: 'percentage' }, { name: 'value' }]);
  const [value, setValue] = useState('')
  // const [percentage, setPercentage] = useState('');
  // const [activeDiscount,setActiveDiscount]=useState(0)
  const [description, setDescription] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [activeDiscount, setActiveDiscount] = useState(0)

  const [selectValueType, setSelectValueType] = useState('Select ValueType');
  const [selectValueTypeName, setSelectValueTypeName] = useState(null);
  const [openSelectValueType, setOpenSelectValueType] = useState(false);

  const [selectSemester, setSelectSemester] = useState('Select Semester');
  const [selectSemesterName, setSelectSemesterName] = useState(null);
  const [openSelectSemester, setOpenSelectSemester] = useState(false);

  const [selectCategory, setSelectCategory] = useState('Select Category');
  const [selectCategoryId, setSelectCategoryId] = useState(null);
  const [openSelectCategory, setOpenSelectCategory] = useState(false);

  const [selectSubject, setSelectSubject] = useState([]);
  const [selectSubjectId, setSelectSubjectId] = useState([]);
  const [openSelectSubject, setOpenSelectSubject] = useState(false);

  const [selectBundle, setSelectBundle] = useState([]);
  const [selectBundleId, setSelectBundleId] = useState([]);
  const [openSelectBundle, setOpenSelectBundle] = useState(false);

  const dropdownValueTypeRef = useRef();
  const dropdownSemesterRef = useRef();
  const dropdownCategoryRef = useRef();
  const dropdownBundleRef = useRef();
  const dropdownSubjectRef = useRef();

  useEffect(() => {
    const StorageDiscountData = JSON.parse(localStorage.getItem('AllDiscountData'));
    if (StorageDiscountData) {
      setDiscountData(StorageDiscountData);
      setCategoryData(StorageDiscountData.categories || []);
      setAllSubjects(StorageDiscountData.subjects || []);
      setSubjectData(StorageDiscountData.subjects || []);
      setAllBundles(StorageDiscountData.bundles || []);
      setBundleData(StorageDiscountData.bundles || []);
    }
  }, []);

  // Function to filter subjects by semester, category, or both
  const filterSubjects = (semesterName, categoryId) => {
    let filteredSubjects = allSubjects; // Start with all subjects

    // If both semester and category are selected, filter by both
    if (semesterName && categoryId) {
      filteredSubjects = filteredSubjects.filter(subject =>
        subject.semester.toLowerCase() === semesterName.toLowerCase() &&
        subject.category_id === categoryId
      );
    }
    // If only the semester is selected, filter by semester
    else if (semesterName) {
      filteredSubjects = filteredSubjects.filter(subject =>
        subject.semester.toLowerCase() === semesterName.toLowerCase()
      );
    }
    // If only the category is selected, filter by category
    else if (categoryId) {
      filteredSubjects = filteredSubjects.filter(subject =>
        subject.category_id === categoryId
      );
    }

    setSubjectData(filteredSubjects);
    console.log(filteredSubjects)
  };

  const filterBundles = (semesterName, categoryId) => {
    let filteredBundles = allBundles;

    if (semesterName && categoryId) {
      filteredBundles = filteredBundles.filter(bundle =>
        bundle.semester.toLowerCase() === semesterName.toLowerCase() &&
        bundle.category_id === categoryId
      );
    } else if (semesterName) {
      filteredBundles = filteredBundles.filter(bundle =>
        bundle.semester.toLowerCase() === semesterName.toLowerCase()
      );
    } else if (categoryId) {
      filteredBundles = filteredBundles.filter(bundle =>
        bundle.category_id === categoryId
      );
    }

    setBundleData(filteredBundles);
    console.log(filteredBundles);
  };

  const handleOpenValueType = () => {
    setOpenSelectValueType(!openSelectValueType);
    setOpenSelectSemester(false);
    setOpenSelectSubject(false);
    setOpenSelectBundle(false);
    setOpenSelectCategory(false)
  };

  const handleOpenSemester = () => {
    setOpenSelectValueType(false);
    setOpenSelectSemester(!openSelectSemester);
    setOpenSelectSubject(false);
    setOpenSelectBundle(false);
    setOpenSelectCategory(false)
  };

  const handleOpenCategory = () => {
    setOpenSelectValueType(false);
    setOpenSelectSemester(false);
    setOpenSelectSubject(false);
    setOpenSelectBundle(false);
    setOpenSelectCategory(!openSelectCategory)
  };

  const handleOpenSubject = () => {
    setOpenSelectValueType(false);
    setOpenSelectSemester(false);
    setOpenSelectSubject(prev => !prev);
    setOpenSelectBundle(false);
    setOpenSelectCategory(false)
  };

  const handleOpenBundle = () => {
    setOpenSelectValueType(false);
    setOpenSelectSemester(false);
    setOpenSelectSubject(false);
    setOpenSelectBundle(prev => !prev);
    setOpenSelectCategory(false)
  };

  const handleSelectValueType = (e) => {
    const inputElement = e.currentTarget.querySelector('.inputVal');
    const selectedOptionName = e.currentTarget.textContent.trim();
    const selectedOptionValue = inputElement ? inputElement.value : null;
    setSelectValueType(selectedOptionName);
    setSelectValueTypeName(selectedOptionValue)
    setOpenSelectValueType(false);
    console.log('Selected ValueType:', selectedOptionName);
  };

  const handleSelectSemester = (e) => {
    const inputElement = e.currentTarget.querySelector('.inputVal');
    const selectedOptionName = e.currentTarget.textContent.trim();
    const selectedOptionValue = inputElement ? inputElement.value.toLowerCase() : '';
    setSelectSemester(selectedOptionName);
    setSelectSemesterName(selectedOptionValue);
    setOpenSelectSemester(false);
    console.log('Selected Semester:', selectedOptionName);
    // console.log('Semester ID:', selectedOptionValue)

    // Filter subjects based on the new semester and existing category
    filterSubjects(selectedOptionName, selectCategoryId);
    filterBundles(selectedOptionName, selectCategoryId);
  };

  const handleSelectCategory = (e) => {
    const inputElement = e.currentTarget.querySelector('.inputVal');
    const selectedOptionName = e.currentTarget.textContent.trim();
    const selectedOptionValue = inputElement ? inputElement.value : null;
    setSelectCategory(selectedOptionName);
    setSelectCategoryId(parseInt(selectedOptionValue));
    setOpenSelectCategory(false);
    console.log('Selected Category:', selectedOptionName);
    console.log('Category ID:', selectedOptionValue);

    // Filter subjects based on the new semester and existing category
    filterSubjects(selectSemesterName, parseInt(selectedOptionValue));
    filterBundles(selectSemesterName, parseInt(selectedOptionValue));
  };

  const handleSelectSubject = (e) => {
    const inputElement = e.currentTarget.querySelector('.inputVal');
    const selectedOptionName = e.currentTarget.textContent.trim();
    const selectedOptionValue = inputElement ? parseInt(inputElement.value) : '';

    setSelectSubject(prev =>
      prev.includes(selectedOptionName)
        ? prev.filter(name => name !== selectedOptionName)
        : [...prev, selectedOptionName]
    );

    setSelectSubjectId(prev =>
      prev.includes(selectedOptionValue)
        ? prev.filter(id => id !== selectedOptionValue)
        : [...prev, selectedOptionValue]
    );

    // Optionally close the dropdown
    setOpenSelectSubject(false);

    console.log('Selected Subject Name:', selectedOptionName);
    console.log('Selected Subject ID:', selectedOptionValue);
  };

  const handleRemoveSubject = (subjectName) => {
    setSelectSubject(selectSubject.filter(subject => subject !== subjectName));
  };

  const handleSelectBundle = (e) => {
    const inputElement = e.currentTarget.querySelector('.inputVal');
    const selectedOptionName = e.currentTarget.textContent.trim();
    const selectedOptionValue = inputElement ? parseInt(inputElement.value) : '';

    setSelectBundle(prev =>
      prev.includes(selectedOptionName)
        ? prev.filter(name => name !== selectedOptionName)
        : [...prev, selectedOptionName]
    );

    setSelectBundleId(prev =>
      prev.includes(selectedOptionValue)
        ? prev.filter(id => id !== selectedOptionValue)
        : [...prev, selectedOptionValue]
    );

    // Optionally close the dropdown
    setOpenSelectBundle(false);

    console.log('Selected Bundle Name:', selectedOptionName);
    console.log('Selected Bundle ID:', selectedOptionValue);
  };

  const handleRemoveBundle = (bundleName) => {
    setSelectBundle(selectBundle.filter(bundle => bundle !== bundleName));
  };

  const handleClick = (e) => {
    const isChecked = e.target.checked;
    setActiveDiscount(isChecked ? 1 : 0);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (dropdownValueTypeRef.current && !dropdownValueTypeRef.current.contains(event.target) &&
      dropdownSemesterRef.current && !dropdownSemesterRef.current.contains(event.target) &&
      dropdownCategoryRef.current && !dropdownCategoryRef.current.contains(event.target) &&
      dropdownBundleRef.current && !dropdownBundleRef.current.contains(event.target) &&
      dropdownSubjectRef.current && !dropdownSubjectRef.current.contains(event.target)
    ) {
      setOpenSelectValueType(false);
      setOpenSelectSemester(false);
      setOpenSelectSubject(false);
      setOpenSelectBundle(false);
      setOpenSelectCategory(false)
    }
  };

  const handleGoBack = () => {
    navigate(-1, { replace: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectCategoryId) {
      auth.toastError('Please Select Category.');
      return;
    }

    if (!selectSubjectId) {
      auth.toastError('Please Select Subject.');
      return;
    }
    if (!selectBundleId) {
      auth.toastError('Please Select Bundle.');
      return;
    }

    if (!selectValueTypeName) {
      auth.toastError('Please Select ValueType.');
      return;
    }

    if (!value) {
      auth.toastError('Please Enter Value.');
      return;
    }

    if (!description) {
      auth.toastError('Please Enter Description.');
      return;
    }

    if (!startDate) {
      auth.toastError('Please Enter StartDate.');
      return;
    }

    if (!endDate) {
      auth.toastError('Please Enter EndDate.');
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      // Append the subjects array
      selectSubjectId.forEach((subjectId, index) => {
        formData.append(`subject_id[${index}]`, subjectId);
      });
      // Append the bundles array
      selectBundleId.forEach((bundleId, index) => {
        formData.append(`bundle_id[${index}]`, bundleId);
      });
      formData.append('category_id', selectCategoryId);
      formData.append('description', description);
      formData.append('start_date', startDate);
      formData.append('end_date', endDate);
      formData.append('type', selectValueTypeName);
      formData.append('amount', value || 0);
      // formData.append('precentage', percentage || 0);
      formData.append('statue', activeDiscount);

      for (let pair of formData.entries()) {
        console.log(pair[0] + ', ' + pair[1]);
      }

      // try {
      const response = await axios.post('http://62.84.185.153/plesk-site-preview/bcknd.elmanhag.com/https/62.84.185.153/admin/discount/add', formData, {
        headers: {
          Authorization: `Bearer ${auth.user.token}`,
        },
      });
      if (response.status === 200) {
        auth.toastSuccess('Dicount added successfully!');
        handleGoBack();
      } else {
        auth.toastError('Failed to add Dicount.');
      }
    } catch (error) {
      console.log(error.response); // Log the full response for debugging
      console.log(error.response.data.errors);
      const errorMessages = error?.response?.data?.errors;
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
    <form className="w-full flex flex-col items-center justify-center gap-y-3" onSubmit={handleSubmit}>
      <div className="w-full flex flex-wrap items-center justify-start gap-3">
        <div className="lg:w-[30%] sm:w-full">
          <DropDownMenu
            ref={dropdownSemesterRef}
            handleOpen={handleOpenSemester}
            handleOpenOption={handleSelectSemester}
            stateoption={selectSemester}
            openMenu={openSelectSemester}
            options={semesterData}
          />
        </div>
        <div className="lg:w-[30%] sm:w-full">
          <DropDownMenu
            ref={dropdownCategoryRef}
            handleOpen={handleOpenCategory}
            handleOpenOption={handleSelectCategory}
            stateoption={selectCategory}
            openMenu={openSelectCategory}
            options={categoryData}
          />
        </div>
        <div className="lg:w-[30%] sm:w-full">
          <MultipleChoiceMenu
            ref={dropdownSubjectRef}
            handleOpen={handleOpenSubject}
            selectedOptions={selectSubject}
            openMenu={openSelectSubject}
            handleSelectOption={handleSelectSubject}
            handleRemoveOption={handleRemoveSubject}
            options={subjectData}
            name="Subjects"
          />
        </div>
        <div className="lg:w-[30%] sm:w-full">
          <MultipleChoiceMenu
            ref={dropdownBundleRef}
            handleOpen={handleOpenBundle}
            selectedOptions={selectBundle}
            openMenu={openSelectBundle}
            handleSelectOption={handleSelectBundle}
            handleRemoveOption={handleRemoveBundle}
            options={bundleData}
            name="Bundles"
          />
        </div>
        <div className="lg:w-[30%] sm:w-full">
          <InputCustom
            type="date"
            placeholder="Start Date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div className="lg:w-[30%] sm:w-full">
          <InputCustom
            type="date"
            placeholder="End Date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div className="lg:w-[30%] sm:w-full">
          <InputCustom
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="lg:w-[30%] sm:w-full">
          <DropDownMenu
            ref={dropdownValueTypeRef}
            handleOpen={handleOpenValueType}
            handleOpenOption={handleSelectValueType}
            stateoption={selectValueType}
            openMenu={openSelectValueType}
            options={valueType}
          />
        </div>
        {selectValueType === 'value' && (
          <div className="lg:w-[30%] sm:w-full">
            <InputCustom
              placeholder="Value"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
        )}

        {selectValueType === 'percentage' && (
          <div className="lg:w-[30%] sm:w-full">
            <InputCustom
              placeholder="Percentage"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
        )}

        <div className="flex items-center gap-x-4 lg:w-[30%] sm:w-full">
          <span className="text-2xl text-thirdColor font-medium">Active Discount:</span>
          <div>
            <CheckBox checked={activeDiscount} handleClick={handleClick} />
          </div>
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
          // stateLoding={isLoading}
          />
        </div>
        <button onClick={handleGoBack} className="text-2xl text-mainColor">Cancel</button>
      </div>
    </form>
  )
}

export default AddDiscountPage