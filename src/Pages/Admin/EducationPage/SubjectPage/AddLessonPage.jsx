import React, { useEffect, useRef, useState } from 'react';
import InputCustom from '../../../../Components/InputCustom';
import { ButtonAdd } from '../../../../Components/Button';
import CheckBox from '../../../../Components/CheckBox';
import DropDownMenu from '../../../../Components/DropDownMenu';

const AddLessonPage = () => {
  const dropdownMaterial = useRef();
  const dropdownMaterialType = useRef();
  const uploadRef = useRef();

  /* Material */
  const [materialData, setMaterialData] = useState([{ name: 'Voice' }, { name: 'Video' }, { name: 'Pdf' }]);
  const [materialTypeData, setMaterialTypeData] = useState([{ name: 'External' }, { name: 'Embedded' }, { name: 'Upload' }]);
  const [materialList, setMaterialList] = useState([]);
  /* ///Material */

  /* Material Source */
  const [material, setMaterial] = useState('Select Material');
  const [materialName, setMaterialName] = useState();
  const [openMaterial, setOpenMaterial] = useState(false);

  const [materialType, setMaterialType] = useState('Select Source');
  const [materialTypeName, setMaterialTypeName] = useState();
  const [openMaterialType, setOpenMaterialType] = useState(false);
  /* //Material Source */

  /* Material File */
  const [lessonExternal, setLessonExternal] = useState('');
  const [lessonEmbedded, setLessonEmbedded] = useState('');
  const [lessonVideoFile, setLessonVideoFile] = useState();
  const [lessonVideo, setLessonVideo] = useState('');
  /* ///Material File */

  const [lessonNameEn, setLessonNameEn] = useState('');
  const [lessonNameAr, setLessonNameAr] = useState('');
  const [lessonOrder, setLessonOrder] = useState('');
  const [lessonDescription, setLessonDescription] = useState('');

  const [lessonDripContent, setLessonDripContent] = useState(0);
  const [lessonFree, setLessonFree] = useState(0);
  const [lessonPaid, setLessonPaid] = useState(0);
  const [lessonActive, setLessonActive] = useState(0);

  const handleDripContentClick = (e) => {
    const isChecked = e.target.checked;
    setLessonDripContent(isChecked ? 1 : 0);
  };

  const handleFreeClick = (e) => {
    const isChecked = e.target.checked;
    setLessonFree(isChecked ? 1 : 0);
  };

  const handlePaidClick = (e) => {
    const isChecked = e.target.checked;
    setLessonPaid(isChecked ? 1 : 0);
  };

  const handleActiveClick = (e) => {
    const isChecked = e.target.checked;
    setLessonActive(isChecked ? 1 : 0);
  };

  const handleSubmitAdd = () => { };

  /* Material Source */
  const handleOpenMaterial = () => {
    console.log("Toggling Material Dropdown:", !openMaterial);
    setOpenMaterial(!openMaterial);
    setOpenMaterialType(false);
  };

  const handleOpenMaterialType = (count) => {
    console.log("count:", count);
    console.log("Toggling openMaterialType:", !openMaterialType);
    setOpenMaterialType(!openMaterialType);
    setOpenMaterial(false);
  };

  const handleMaterial = (e) => {
    const inputElement = e.currentTarget.querySelector('.inputVal');
    const selectedOptionName = e.currentTarget.textContent.trim();
    const selectedOptionValue = inputElement ? inputElement.value.toLowerCase() : '';
    setMaterial(selectedOptionName);
    setMaterialName(parseInt(selectedOptionValue));
    setOpenMaterial(false);
  };

  const handleMaterialType = (e) => {
    const inputElement = e.currentTarget.querySelector('.inputVal');
    const selectedOptionName = e.currentTarget.textContent.trim();
    const selectedOptionValue = inputElement ? inputElement.value.toLowerCase() : '';
    setMaterialType(selectedOptionName);
    setMaterialTypeName(selectedOptionValue);
    setOpenMaterialType(false);
  };
  /* ///Material Source */

  /* Material File */
  const handleVideoClick = () => {
    if (uploadRef.current) {
      uploadRef.current.click(); // Trigger a click on the hidden file input
    }
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLessonVideoFile(file); // Set file object for upload
      setLessonVideo(file.name); // Display file name in the text input
    }
  };
  /* ///Material File */
  /* Add Material */
  const handleAdd = () => {
    // setMaterialList([
    //   ...materialList,
    //   <div key={materialList.length} className="w-full flex flex-wrap items-center justify-start gap-3 material">
    //     <div className="lg:w-[30%] sm:w-full">
    //       <DropDownMenu
    //         ref={dropdownMaterial}
    //         handleOpen={handleOpenMaterial}
    //         handleOpenOption={handleMaterial}
    //         stateoption={material}
    //         openMenu={openMaterial}
    //         options={materialData}
    //       />
    //     </div>
    //     <div className="lg:w-[30%] sm:w-full">
    //       <DropDownMenu
    //         ref={dropdownMaterialType}
    //         handleOpen={()=>handleOpenMaterialType(materialList.length)}
    //         handleOpenOption={handleMaterialType}
    //         stateoption={materialType}
    //         openMenu={openMaterialType}
    //         options={materialTypeData}
    //       />
    //     </div>
    //     {materialTypeName === 'external' && (
    //       <div className="lg:w-[30%] sm:w-full">
    //         <InputCustom
    //           type="text"
    //           source='external'
    //           placeholder="Paste The External Link"
    //           value={lessonExternal}
    //           readonly={false}
    //           onChange={(e) => setLessonExternal(e.target.value)}
    //         />
    //       </div>
    //     )}
    //     {materialTypeName === 'embedded' && (
    //       <div className="lg:w-[30%] sm:w-full">
    //         <InputCustom
    //           type="text"
    //           source='embedded'
    //           placeholder="Paste Whole Of The Iframe Code"
    //           value={lessonEmbedded}
    //           readonly={false}
    //           onChange={(e) => setLessonEmbedded(e.target.value)}
    //         />
    //       </div>
    //     )}
    //     {materialTypeName === 'upload' && (
    //       <div className="lg:w-[30%] sm:w-full">
    //         <InputCustom
    //           type="text"
    //           source='upload'
    //           placeholder="Upload Video"
    //           value={lessonVideo}
    //           readonly={true}
    //           onClick={handleVideoClick}
    //         />
    //         <input
    //           ref={uploadRef}
    //           type="file"
    //           className="hidden"
    //           onChange={handleVideoChange}
    //         />
    //       </div>
    //     )}
    //   </div>,
    // ]);
  };
  /* ///Add Material */

  const handleClickOutside = (event) => {
    if (
      dropdownMaterial.current &&
      !dropdownMaterial.current.contains(event.target) &&
      dropdownMaterialType.current &&
      !dropdownMaterialType.current.contains(event.target)
    ) {
      setOpenMaterial(false);
      setOpenMaterialType(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <form onSubmit={handleSubmitAdd} className="w-full flex flex-col items-center justify-center gap-y-3">
        <div className="w-full flex flex-col items-center justify-center gap-10">
          <div className="w-full flex flex-wrap items-center justify-start gap-3">
            <div className="lg:w-[30%] sm:w-full">
              <InputCustom
                type="text"
                placeholder="Name En"
                value={lessonNameEn}
                onChange={(e) => setLessonNameEn(e.target.value)}
              />
            </div>
            <div className="lg:w-[30%] sm:w-full">
              <InputCustom
                type="text"
                placeholder="Name Ar"
                value={lessonNameAr}
                onChange={(e) => setLessonNameAr(e.target.value)}
              />
            </div>
            <div className="lg:w-[30%] sm:w-full">
              <InputCustom
                type="number"
                placeholder="Lesson Order"
                value={lessonOrder}
                onChange={(e) => setLessonOrder(e.target.value)}
              />
            </div>
            <div className="lg:w-[30%] sm:w-full">
              <InputCustom
                type="text"
                placeholder="Lesson Description"
                value={lessonDescription}
                onChange={(e) => setLessonDescription(e.target.value)}
              />
            </div>
          </div>

          <div className="w-full">
            <div className="w-full flex flex-col gap-y-3 materialList">
              {/* {materialList} */}
              <div className="w-full flex flex-wrap items-center justify-start gap-3 material">
                <div className="lg:w-[30%] sm:w-full">
                  <DropDownMenu
                    ref={dropdownMaterial}
                    handleOpen={handleOpenMaterial}
                    handleOpenOption={handleMaterial}
                    stateoption={material}
                    openMenu={openMaterial}
                    options={materialData}
                  />
                </div>
                <div className="lg:w-[30%] sm:w-full">
                  <DropDownMenu
                    ref={dropdownMaterialType}
                    handleOpen={handleOpenMaterialType}
                    handleOpenOption={handleMaterialType}
                    stateoption={materialType}
                    openMenu={openMaterialType}
                    options={materialTypeData}
                  />
                </div>
                {materialTypeName === 'external' && (
                  <div className="lg:w-[30%] sm:w-full">
                    <InputCustom
                      type="text"
                      source='external'
                      placeholder="Paste The External Link"
                      value={lessonExternal}
                      readonly={false}
                      onChange={(e) => setLessonExternal(e.target.value)}
                    />
                  </div>
                )}
                {materialTypeName === 'embedded' && (
                  <div className="lg:w-[30%] sm:w-full">
                    <InputCustom
                      type="text"
                      source='embedded'
                      placeholder="Paste Whole Of The Iframe Code"
                      value={lessonEmbedded}
                      readonly={false}
                      onChange={(e) => setLessonEmbedded(e.target.value)}
                    />
                  </div>
                )}
                {materialTypeName === 'upload' && (
                  <div className="lg:w-[30%] sm:w-full">
                    <InputCustom
                      type="text"
                      source='upload'
                      placeholder="Upload Video"
                      value={lessonVideo}
                      readonly={true}
                      onClick={handleVideoClick}
                    />
                    <input
                      ref={uploadRef}
                      type="file"
                      className="hidden"
                      onChange={handleVideoChange}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="w-full mt-3">
              <ButtonAdd
                isWidth="true"
                BgColor="mainColor"
                Color="white"
                handleClick={handleAdd}
                iconColor="white"
              />
            </div>
          </div>

          <div className="w-full">
            <div className="w-full flex flex-wrap items-center justify-start gap-3">
              <div className="flex items-center gap-x-4 lg:w-[30%] sm:w-full">
                <span className="text-2xl text-thirdColor font-medium">Drip Content:</span>
                <div>
                  <CheckBox
                    id="drip-content"
                    title=""
                    active={lessonDripContent === 1}
                    onClick={handleDripContentClick}
                  />
                </div>
              </div>
              <div className="flex items-center gap-x-4 lg:w-[30%] sm:w-full">
                <span className="text-2xl text-thirdColor font-medium">Free:</span>
                <div>
                  <CheckBox
                    id="free"
                    title=""
                    active={lessonFree === 1}
                    onClick={handleFreeClick}
                  />
                </div>
              </div>
              <div className="flex items-center gap-x-4 lg:w-[30%] sm:w-full">
                <span className="text-2xl text-thirdColor font-medium">Paid:</span>
                <div>
                  <CheckBox
                    id="paid"
                    title=""
                    active={lessonPaid === 1}
                    onClick={handlePaidClick}
                  />
                </div>
              </div>
              <div className="flex items-center gap-x-4 lg:w-[30%] sm:w-full">
                <span className="text-2xl text-thirdColor font-medium">Active:</span>
                <div>
                  <CheckBox
                    id="active"
                    title=""
                    active={lessonActive === 1}
                    onClick={handleActiveClick}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddLessonPage;
