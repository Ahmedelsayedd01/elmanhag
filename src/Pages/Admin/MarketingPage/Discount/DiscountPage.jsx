import React, { useEffect, useRef, useState } from 'react';
import Loading from '../../../../Components/Loading';
import { useAuth } from '../../../../Context/Auth';
import TitleHeader from '../../../../Components/TitleHeader';
import { ButtonAdd } from '../../../../Components/Button';
import SettingFilter from '../../../../Components/Icons/AdminIcons/SettingFilter';
import EditIcon from '../../../../Components/Icons/AdminIcons/EditIcon';
import DeleteIcon from '../../../../Components/Icons/AdminIcons/DeleteIcon';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DropDownMenu from '../../../../Components/DropDownMenu';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { Wroning } from '../../../../Components/Icons/All_Icons';

const DiscountPage = () => {

  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [discountData, setDiscountData] = useState(null);
  const [discounts, setDiscounts] = useState(null);
  const [discountCategory ,setDiscountCategory]=useState([])
//   const [subjectCategory ,setSubjectCategory]=useState([])
  const [selectedOptionCategory, setSelectedOptionCategory] = useState('Filter By Category');
  const [selectedOptionStatus, setSelectedOptionStatus] = useState('Filter By Status');
  const [openCategory, setOpenCategory] = useState(false);
  const [discountStatus, setDiscountStatus] =  useState([{ name: 'Active' }, { name: 'Disable' }]);
  const [openStatus, setOpenStatus] = useState(false);
  const [discountChanged, setDiscountChanged] = useState(false);

  const dropdownCategoryRef = useRef(null);
  const dropdownStatusRef = useRef(null);

  const [isDeleting, setIsDeleting] = useState(false);
  const [openDialog, setOpenDialog] = useState(null);

  const handleOpenCategory = () => {
    setOpenCategory(!openCategory);
    setOpenStatus(false);
    setOpenSemester(false);
};

  const handleOpenStatus = () => {
      setOpenCategory(false);
      setOpenStatus(!openStatus);
      setOpenSemester(false);
  };

  const handleOptionCategory = (e) => {
    setSelectedOptionCategory(e.target.innerText);
    setOpenCategory(false);
  };

  const handleOptionStatus = (e) => {
    setSelectedOptionStatus(e.target.innerText);
    setOpenStatus(false);
  };

  const handleClickOutside = (event) => {
  if (
          (dropdownCategoryRef.current && !dropdownCategoryRef.current.contains(event.target)) &&
          (dropdownStatusRef.current && !dropdownStatusRef.current.contains(event.target)) 
    ) {
          setOpenCategory(false);
          setOpenStatus(false);
    }
};

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

      const fetchDiscount = async () => {
        setIsLoading(true);
        try {
              const response = await axios.get('https://bdev.elmanhag.shop/admin/discount', {
                      headers: {
                            Authorization: `Bearer ${auth.user.token}`,
                      },
              });
              if (response.status === 200) {
                      console.log(response.data)
                      setDiscountData(response.data)
                      setDiscounts(response.data.discounts)
                      setDiscountCategory(response.data.categories)
              }
        } catch (error) {
              console.error('Error fetching discount data:', error);
        } finally {
              setIsLoading(false);
        }
  };

    useEffect(() => {
      fetchDiscount();
    }, [discountChanged]);

    const handleOpenDialog = (discountId) => {
          setOpenDialog(discountId);
    };

    const handleCloseDialog = () => {
          setOpenDialog(null);
    };

const handleDelete = async (discountId) => {
      setIsDeleting(true);
      const success = await deleteDiscount(discountId, auth.user.token);
      setIsDeleting(false);
      handleCloseDialog();

      if (success) {
            auth.toastSuccess('Discount deleted successfully!');
            setDiscountChanged(!discountChanged)

      } else {
                  auth.toastError('Failed to delete Discount.');
            }
      };

      const deleteDiscount = async (discountId, authToken) => {
      try {
                  const response = await axios.delete(`https://bdev.elmanhag.shop/admin/discount/delete/${discountId}`, {
                        headers: {
                              Authorization: `Bearer ${authToken}`,
                        },
                  });

                  if (response.status === 200) {
                        console.log('discount deleted successfully');
                        return true;
                  } else {
                        console.error('Failed to delete discount:', response.status, response.statusText);
                        return false;
                  }
      } catch (error) {
                  console.error('Error deleting discount:', error);
                  return false;
      }
      };

      if (isLoading) {
            return (
                  <div className="w-1/4 h-full flex items-start mt-[10%] justify-center m-auto">
                        <Loading />
                  </div>
            );
      }

      if (!discounts) {
            return <div className='text-mainColor text-2xl font-bold w-full h-full flex items-center justify-center'>No Bundles data available</div>;
      }

      localStorage.setItem("AllDiscountData", JSON.stringify(discountData));
      // localStorage.setItem("Discounts", JSON.stringify(discounts));

  return (
    <>
      <div className="w-full">
            <div className="w-full flex flex-wrap items-center justify-start gap-4">
                    <div className="sm:w-full xl:w-1/5">
                          <DropDownMenu
                                  ref={dropdownCategoryRef}
                                  iconMenu={<SettingFilter />}
                                  handleOpen={handleOpenCategory}
                                  handleOpenOption={handleOptionCategory}
                                  stateoption={selectedOptionCategory}
                                  openMenu={openCategory}
                                  options={discountCategory}
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
                                  options={discountStatus}

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
                                    <th className="min-w-[120px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Category</th>
                                    <th className="min-w-[120px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Service</th>
                                    <th className="min-w-[120px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Discount</th>
                                    <th className="min-w-[120px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">From_To</th>
                                    <th className="min-w-[120px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Status</th>
                                    <th className="min-w-[120px] sm:w-2/12 lg:w-2/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3">Action</th>
                              </tr>
                        </thead>
                        <tbody className="w-full">
                                    {discounts.map((discount, index) => (
                                          <tr className="w-full border-b-2" key={discount.id}> 
                                                <td
                                                      className="min-w-[80px] sm:min-w-[50px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                >
                                                      {index + 1}
                                                </td>
                                                <td
                                                      className="min-w-[120px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                >
                                                      {discount.category?.name|| 'Null'}
                                                </td>
                                                <td
                                                      className="min-w-[120px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center  text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                      >
                                                      <span className='text-mainColor text-xl border-b-2 border-mainColor font-semibold'>
                                                      <Link to={`view/${discount.id}`}>View</Link>
                                                      </span>
                                                </td>
                                                <td
                                                      className="min-w-[120px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                      >
                                                      {discount?.amount 
                                                      ? discount?.type === 'percentage' 
                                                            ? `${discount.amount}%` 
                                                            : discount.amount 
                                                      : 'Null'}
                                                      </td>
                                                <td
                                                      className="min-w-[120px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                      >
                                                      {discount?.start_date ? new Date(discount.start_date).toLocaleDateString('en-GB') : 'Null' || 'Null'}<br />
                                                      {discount?.end_date ? new Date(discount.end_date).toLocaleDateString('en-GB') : 'Null' || 'Null'}
                                                </td>
                                                <td
                                                      className="min-w-[120px] sm:min-w-[100px] sm:w-2/12 lg:w-2/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                >
                                                      {discount?.statue === 1 ? "Active" : "Disable" || 'Null'}
                                                </td>

                                                <td
                                                      className="min-w-[100px] sm:min-w-[80px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                >
                                                      <div className="flex items-center justify-center gap-x-3">
                                                              <Link to={`edit/${discount.id}`} type="button">
                                                                    <EditIcon />
                                                              </Link>
                                                              <button type="button" onClick={() => handleOpenDialog(discount.id)}>
                                                                    <DeleteIcon />
                                                              </button>
                                                              {openDialog === discount.id && (
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
                                                                                                                            You will delete Discount ID : {discount?.id || "null"}
                                                                                                                      </DialogTitle>
                                                                                                              </div>
                                                                                                        </div>
                                                                                                </div>
                                                                                                <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                                                                                        <button
                                                                                                              type="button"
                                                                                                              onClick={() => handleDelete(discount.id)}
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

export default DiscountPage