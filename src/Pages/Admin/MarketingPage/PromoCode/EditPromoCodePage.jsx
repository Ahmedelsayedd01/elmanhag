import React, { useRef, useState, useEffect, useContext } from 'react';
import InputCustom from '../../../../Components/InputCustom';
import { Button } from '../../../../Components/Button';
import { useAuth } from '../../../../Context/Auth';
import DropDownMenu from '../../../../Components/DropDownMenu';
import MultipleChoiceMenu from '../../../../Components/MultipleChoiceMenu';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CheckBox from '../../../../Components/CheckBox';
import { PromoCodeEditContext } from '../../../../Layouts/Admin/EditPromoCodeLayout';

const EditPromoCodePage = () => {

  const auth = useAuth();
  const navigate = useNavigate();
  const promoCodeEdit = useContext(PromoCodeEditContext);

  const [isLoading, setIsLoading] = useState(false);
  const [semesterData, setSemesterData] = useState([{ name: 'First' }, { name: 'Second' }]);
  const [categoryData, setCategoryData] = useState([]);
  const [subjectData, setSubjectData] = useState([]);
  const [allSubjects, setAllSubjects] = useState([]); // Store all subjects initially
  const [bundleData, setBundleData] = useState([]);
  const [allBundles, setAllBundles] = useState([]); // Store all subjects initially
  const [promoCodeData, setPromoCodeData] = useState([]);

  const [title, setTitle] = useState('')
  const [valueType, setValueType] = useState([{ name: 'percentage' }, { name: 'value' }]);
  const [value, setValue] = useState('')
  const [percentage, setPercentage] = useState('');
  const [code, setCode] = useState('')
  const [usage, setUsage] = useState('')
  const [usageTypeData, setUsageTypeData] = useState([{ name: 'unlimited' }, { name: 'fixed' }]);
  const [userNumber, setUserNumber] = useState('')
  const [activePromoCode, setActivePromoCode] = useState(0)
  const [includeLive, setIncludeLive] = useState(0)

  const [selectUsageType, setSelectUsageType] = useState('Select UsageType');
  const [selectUsageTypeName, setSelectUsageTypeName] = useState(null);
  const [openSelectUsageType, setOpenSelectUsageType] = useState(false);

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
  const dropdownUsageTypeRef = useRef();
  const dropdownSemesterRef = useRef();
  const dropdownCategoryRef = useRef();
  const dropdownBundleRef = useRef();
  const dropdownSubjectRef = useRef();

  useEffect(() => {
    const StoragePromoCodeData = JSON.parse(localStorage.getItem('AllPromoCodeData'));

    setPromoCodeData(StoragePromoCodeData);
    setCategoryData(StoragePromoCodeData.categories);
    // Set both all subjects and initial subject data
    setAllSubjects(StoragePromoCodeData.subjects);
    setSubjectData(StoragePromoCodeData.subjects); // Show all subjects initially

    setBundleData(StoragePromoCodeData.bundles);
    setAllBundles(StoragePromoCodeData.bundles);
  }, []);

  useEffect(() => {
    if (promoCodeEdit) {

      if (promoCodeEdit.subjects && promoCodeEdit.subjects.length > 0) {
        setSelectSubject(promoCodeEdit.subjects.map(subject => subject.name));
        setSelectSubjectId(promoCodeEdit.subjects.map(subject => subject.id));
      } else {
        setSelectSubject('Select Subject');
        setSelectSubjectId([null]);
      }

      if (promoCodeEdit.bundles && promoCodeEdit.bundles.length > 0) {
        setSelectBundle(promoCodeEdit.bundles.map(bundle => bundle.name));
        setSelectBundleId(promoCodeEdit.bundles.map(bundle => bundle.id));
      } else {
        setSelectSubject('Select Bundle');
        setSelectSubjectId([null]);
      }

      // Determine value type
      if (promoCodeEdit.precentage !== 0) {
        setSelectValueType("percentage");
        setPercentage(promoCodeEdit.precentage || '');
      } else {
        setSelectValueType("value");
        setValue(promoCodeEdit.value || '');
      }

      setTitle(promoCodeEdit.title || '');
      setCode(promoCodeEdit.code || '');
      setSelectUsageType(promoCodeEdit.usage_type || '');
      setUsage(promoCodeEdit.usage || '')
      setUserNumber(promoCodeEdit.number_users || '')
      setValue(promoCodeEdit.value || '');
      setPercentage(promoCodeEdit.precentage || '');
      setActivePromoCode(promoCodeEdit.status || 0)
      setIncludeLive(promoCodeEdit.live || 0)
    }
  }, [promoCodeEdit]);

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
    setOpenSelectUsageType(false);
    setOpenSelectSemester(false);
    setOpenSelectSubject(false);
    setOpenSelectBundle(false);
    setOpenSelectCategory(false)
  };

  const handleOpenUsageType = () => {
    setOpenSelectValueType(false);
    setOpenSelectUsageType(!openSelectUsageType);
    setOpenSelectSemester(false);
    setOpenSelectSubject(false);
    setOpenSelectBundle(false);
    setOpenSelectCategory(false)
  };

  const handleOpenSemester = () => {
    setOpenSelectValueType(false);
    setOpenSelectUsageType(false);
    setOpenSelectSemester(!openSelectSemester);
    setOpenSelectSubject(false);
    setOpenSelectBundle(false);
    setOpenSelectCategory(false)
  };

  const handleOpenCategory = () => {
    setOpenSelectValueType(false);
    setOpenSelectUsageType(false);
    setOpenSelectSemester(false);
    setOpenSelectSubject(false);
    setOpenSelectBundle(false);
    setOpenSelectCategory(!openSelectCategory)
  };

  const handleOpenSubject = () => {
    setOpenSelectValueType(false);
    setOpenSelectUsageType(false);
    setOpenSelectSemester(false);
    setOpenSelectSubject(prev => !prev);
    setOpenSelectBundle(false);
    setOpenSelectCategory(false)
  };

  const handleOpenBundle = () => {
    setOpenSelectValueType(false);
    setOpenSelectUsageType(false);
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

  const handleSelectUsageType = (e) => {
    const inputElement = e.currentTarget.querySelector('.inputVal');
    const selectedOptionName = e.currentTarget.textContent.trim();
    const selectedOptionValue = inputElement ? inputElement.value : null;
    setSelectUsageType(selectedOptionName);
    setSelectUsageTypeName(selectedOptionValue)
    setOpenSelectUsageType(false);
    console.log('Selected UsageType:', selectedOptionName);
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

  const handleActiveLive = (e) => {
    const isChecked = e.target.checked;
    setIncludeLive(isChecked ? 1 : 0);
  };

  const handleClick = (e) => {
    const isChecked = e.target.checked;
    setActivePromoCode(isChecked ? 1 : 0);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (dropdownValueTypeRef.current && !dropdownValueTypeRef.current.contains(event.target) &&
      dropdownUsageTypeRef.current && !dropdownUsageTypeRef.current.contains(event.target) &&
      dropdownSemesterRef.current && !dropdownSemesterRef.current.contains(event.target) &&
      dropdownCategoryRef.current && !dropdownCategoryRef.current.contains(event.target) &&
      dropdownBundleRef.current && !dropdownBundleRef.current.contains(event.target) &&
      dropdownSubjectRef.current && !dropdownSubjectRef.current.contains(event.target)
    ) {
      setOpenSelectValueType(false);
      setOpenSelectUsageType(false);
      setOpenSelectSemester(false);
      setOpenSelectSubject(false);
      setOpenSelectBundle(false);
      setOpenSelectCategory(false)
    }
  };

  const handleGoBack = () => {
    navigate(-1, { replace: true });
  };

  const handleSubmitEdit = async (promoCodeID, event) => {
    event.preventDefault();

    if (!selectSubjectId) {
      auth.toastError('Please Select Subject.');
      return;
    }
    if (!selectBundleId) {
      auth.toastError('Please Select Bundle.');
      return;
    }
    if (!title) {
      auth.toastError('Please Enter Title.');
      return;
    }
    if (!code) {
      auth.toastError('Please Enter Code.');
      return;
    }
    if (!usageTypeData) {
      auth.toastError('Please Select Usage Type.');
      return;
    }
    // ;if (!userNumber) {
    //   auth.toastError('Please Enter User Number.');
    //   return
    // }

    if (valueType === 'value') {
      if (!value) {
        auth.toastError('Please Enter Value.');
        return;
      }
    } else if (valueType === 'percentage') {
      if (!percentage) {
        auth.toastError('Please Enter Percentage.');
        return;
      }
    }

    setIsLoading(true);
    try {

      const params = new URLSearchParams();

      // Append the subjects array
      selectSubjectId.forEach((subjectId, index) => {
        params.append(`subjects[${index}]`, subjectId);
      });

      // Append the bundles array
      selectBundleId.forEach((bundleId, index) => {
        params.append(`bundles[${index}]`, bundleId);
      });

      // Append other fields
      params.append('title', title);
      params.append('code', code);
      params.append('usage_type', selectUsageType);
      params.append('usage', usage || 0);
      // params.append('number_users', userNumber);
      params.append('value', value || 0);
      params.append('precentage', percentage || 0);

      // Conditional appending of percentage or value
      if (selectValueType === 'percentage') {
        params.append('precentage', percentage || 0); // Append percentage
        params.append('value', 0); // Set value to 0
      } else if (selectValueType === 'value') {
        params.append('value', value || 0); // Append value
        params.append('precentage', 0); // Set percentage to 0
      }

      params.append('live', includeLive);
      params.append('status', activePromoCode);

      // To print params in a readable format
      console.log('Submitted Parameters:');
      params.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });

      // Convert params to query string
      // const queryString = params.toString();

      // try {
      const response = await axios.put(`http://62.84.185.153/plesk-site-preview/bcknd.elmanhag.com/https/62.84.185.153/admin/promoCode/update/${promoCodeID}?${params.toString()}`, {}, {
        headers: {
          Authorization: `Bearer ${auth.user.token}`,
        },
      });
      if (response.status === 200) {
        auth.toastSuccess('PromoCode Updated successfully!');
        handleGoBack();
      } else {
        auth.toastError('Failed to Update PromoCode.');
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
    <form className="w-full flex flex-col items-center justify-center gap-y-3" onSubmit={(event) => handleSubmitEdit(promoCodeEdit.id, event)}>
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
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="lg:w-[30%] sm:w-full">
          <InputCustom
            type="text"
            placeholder="Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>
        <div className="lg:w-[30%] sm:w-full">
          <DropDownMenu
            ref={dropdownUsageTypeRef}
            handleOpen={handleOpenUsageType}
            handleOpenOption={handleSelectUsageType}
            stateoption={selectUsageType}
            openMenu={openSelectUsageType}
            options={usageTypeData}
          />
        </div>
        {/* Conditionally Render Usage Input */}
        {selectUsageType === 'fixed' && (
          <div className="lg:w-[30%] sm:w-full">
            <InputCustom
              type="text"
              placeholder="Usage Number"
              value={usage}
              onChange={(e) => setUsage(e.target.value)}
            />
          </div>
        )}
        {/* <div className="lg:w-[30%] sm:w-full">
        <InputCustom
          type="text"
          placeholder="Number Of Users"
          value={userNumber}
          onChange={(e) => setUserNumber(e.target.value)}
        />
      </div> */}
        {/* <div className="lg:w-[30%] sm:w-full">
        <InputCustom
          type="text"
          placeholder="Value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div> */}
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
              value={percentage}
              onChange={(e) => setPercentage(e.target.value)}
            />
          </div>
        )}

        <div className="flex items-center gap-x-4 lg:w-[30%] sm:w-full">
          <span className="text-2xl text-thirdColor font-medium">Include Live:</span>
          <div>
            <CheckBox checked={includeLive} handleClick={handleActiveLive} />
          </div>
        </div>

        <div className="flex items-center gap-x-4 lg:w-[30%] sm:w-full">
          <span className="text-2xl text-thirdColor font-medium">Active Promo Code:</span>
          <div>
            <CheckBox checked={activePromoCode} handleClick={handleClick} />
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

export default EditPromoCodePage