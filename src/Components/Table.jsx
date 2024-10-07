// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
// import { Wroning } from './Icons/All_Icons'; // Assuming you have a warning icon
// import Loading from './Loading'; // Assuming you have a loading component
// import EditIcon from './Icons/AdminIcons/EditIcon'; // Assuming you have an edit icon
// import DeleteIcon from './Icons/AdminIcons/DeleteIcon'; // Assuming you have a delete icon

// const Table = ({ headers, data, editPath, handleDelete, pageName = '' }) => {
//     const [isDeleting, setIsDeleting] = useState(false);
//     const [openDialog, setOpenDialog] = useState(null);
//     const [selectedItem, setSelectedItem] = useState(null);

//     const handleOpenDialog = (itemId, item) => {
//         setOpenDialog(itemId);
//         setSelectedItem(item);
//     };

//     const handleCloseDialog = () => {
//         setOpenDialog(null);
//         setSelectedItem(null);
//     };

//     const handleDeleteItem = async (itemId) => {
//         setIsDeleting(true);
//         try {
//             await handleDelete(itemId);
//         } catch (error) {
//             console.error("Failed to delete item", error);
//         } finally {
//             setIsDeleting(false);
//             handleCloseDialog();
//         }
//     };

//     const renderActions = (row) => (
//         <td
//             key="actions"
//             className="min-w-[100px] sm:min-w-[80px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
//         >
//             <div className="flex items-center justify-center gap-x-3">
//                 <Link to={`${editPath}/${row.id}`} type="button">
//                     <EditIcon />
//                 </Link>
//                 <button type="button" onClick={() => handleOpenDialog(row.id, row)}>
//                     <DeleteIcon />
//                 </button>
//                 {openDialog === row.id && (
//                     <Dialog open={true} onClose={handleCloseDialog} className="relative z-10">
//                         <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
//                         <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
//                             <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
//                                 <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
//                                     <div className="flex flex-col items-center justify-center bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
//                                         <Wroning Width='28' Height='28' aria-hidden="true" />
//                                         <div className="mt-2 text-center">
//                                             <DialogTitle as="h3" className="text-xl font-semibold leading-10 text-gray-900">
//                                                 You will delete {selectedItem?.name || "this item"}
//                                             </DialogTitle>
//                                         </div>
//                                     </div>
//                                     <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
//                                         <button
//                                             type="button"
//                                             onClick={() => handleDeleteItem(selectedItem.id)}
//                                             disabled={isDeleting}
//                                             className="inline-flex w-full justify-center rounded-md bg-mainColor px-6 py-3 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto"
//                                         >
//                                             {isDeleting ? <div className="flex w-10 h-5"><Loading /></div> : 'Delete'}
//                                         </button>
//                                         <button
//                                             type="button"
//                                             onClick={handleCloseDialog}
//                                             className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-6 py-3 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 sm:mt-0 sm:w-auto"
//                                         >
//                                             Cancel
//                                         </button>
//                                     </div>
//                                 </DialogPanel>
//                             </div>
//                         </div>
//                     </Dialog>
//                 )}
//             </div>
//         </td>
//     );

//     // Check if there's no data and display a default message or a customized one based on pageName
//     if (!data || data.length === 0) {
//         return (
//             <div className="text-mainColor text-2xl font-bold w-full h-full flex items-center justify-center">
//                 No {pageName} data available
//             </div>
//         );
//     }

//     return (
//         <div className="w-full flex items-center mt-4 overflow-x-auto">
//             <table className="min-w-full">
//                 <thead className="w-full">
//                     <tr className="w-full border-b-2">
//                         {headers.map((header, index) => (
//                             <th
//                                 key={index}
//                                 className="min-w-[150px] sm:min-w-[100px] sm:w-1/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3"
//                             >
//                                 {header}
//                             </th>
//                         ))}
//                     </tr>
//                 </thead>
//                 <tbody className="w-full">
//                     {data.map((row, rowIndex) => (
//                         <tr className="w-full border-b-2" style={{ height: '56px' }} key={row.id || rowIndex}>
//                             {/* Render the row index */}
//                             {headers.includes('#') && (
//                                 <td
//                                     key={rowIndex}
//                                     className="py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
//                                 >
//                                     {rowIndex + 1}
//                                 </td>
//                             )}
//                             {headers.map((header) => (
//                                 header === 'Actions'
//                                     ? renderActions(row)
//                                     : header === '#'
//                                         ? null
//                                         : (
//                                             <td
//                                                 key={`${header}-${row.id}`}
//                                                 className="py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
//                                             >
//                                                 {header.toLowerCase() === 'thumbnails' ? (
//                                                     <img src={row[header.toLowerCase()]} alt={row.title} className="thumbnail" />
//                                                 ) : (
//                                                     row[header.toLowerCase()]
//                                                 )}
//                                             </td>
//                                         )
//                             ))}
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default Table;



import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { Wroning } from './Icons/All_Icons';
import Loading from './Loading';
import EditIcon from './Icons/AdminIcons/EditIcon';
import DeleteIcon from './Icons/AdminIcons/DeleteIcon';

const Table = ({ headers, data, editPath, handleDelete, pageName = '' }) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const [openDialog, setOpenDialog] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleOpenDialog = (itemId, item) => {
        setOpenDialog(itemId);
        setSelectedItem(item);
    };

    const handleCloseDialog = () => {
        setOpenDialog(null);
        setSelectedItem(null);
    };

    const handleDeleteItem = async (itemId) => {
        setIsDeleting(true);
        try {
            await handleDelete(itemId);
        } catch (error) {
            console.error("Failed to delete item", error);
        } finally {
            setIsDeleting(false);
            handleCloseDialog();
        }
    };

    const renderActions = (row) => (
        <td
            key="actions"
            className="min-w-[100px] sm:min-w-[80px] sm:w-1/12 lg:w-1/12 py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
        >
            <div className="flex items-center justify-center gap-x-3">
                {row.title !== "fawry" &&
                    <Link to={`${editPath}/${row.id}`} type="button">
                        <EditIcon />
                    </Link>
                }
                <button type="button" onClick={() => handleOpenDialog(row.id, row)}>
                    <DeleteIcon />
                </button>
                {openDialog === row.id && (
                    <Dialog open={true} onClose={handleCloseDialog} className="relative z-10">
                        <DialogBackdrop className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                                <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <div className="flex flex-col items-center justify-center bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                        <Wroning Width='28' Height='28' aria-hidden="true" />
                                        <div className="mt-2 text-center">
                                            <DialogTitle as="h3" className="text-xl font-semibold leading-10 text-gray-900">
                                                You will delete {selectedItem?.name || "this item"}
                                            </DialogTitle>
                                        </div>
                                    </div>
                                    <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button
                                            type="button"
                                            onClick={() => handleDeleteItem(selectedItem.id)}
                                            disabled={isDeleting}
                                            className="inline-flex w-full justify-center rounded-md bg-mainColor px-6 py-3 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto"
                                        >
                                            {isDeleting ? <div className="flex w-10 h-5"><Loading /></div> : 'Delete'}
                                        </button>
                                        <button
                                            type="button"
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
    );

    if (!data || data.length === 0) {
        return (
            <div className="text-mainColor text-2xl font-bold w-full h-full flex items-center justify-center">
                No {pageName} data available
            </div>
        );
    }

    return (
        <div className="w-full flex items-center mt-4 overflow-x-auto">
            <table className="min-w-full">
                <thead className="w-full">
                    <tr className="w-full border-b-2">
                        {headers.map((header, index) => (
                            <th
                                key={index}
                                className="min-w-[150px] sm:min-w-[100px] sm:w-1/12 lg:w-1/12 text-mainColor text-center font-medium text-sm sm:text-base lg:text-lg xl:text-xl pb-3"
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="w-full">
                    {data.map((row, rowIndex) => (
                        <tr className="w-full border-b-2" style={{ height: '56px' }} key={row.id || rowIndex}>
                            {headers.includes('#') && (
                                <td
                                    key={rowIndex}
                                    className="py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                >
                                    {rowIndex + 1}
                                </td>
                            )}
                            {headers.map((header) => (
                                header === 'Actions'
                                    ? renderActions(row)
                                    : header === '#'
                                        ? null
                                        : header === 'Thumbnails'
                                            ? (
                                                <td
                                                    key={`${header}-${row.id}`}
                                                    className="py-2 flex justify-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                >
                                                    <img
                                                        src={`${row.thumbnail}`}
                                                        alt='img'
                                                        className="max-w-full h-20 object-cover"
                                                    />
                                                </td>
                                            )
                                            : (
                                                <td
                                                    key={`${header}-${row.id}`}
                                                    className="py-2 text-center text-thirdColor text-sm sm:text-base lg:text-lg xl:text-xl overflow-hidden"
                                                >
                                                    {row[header.toLowerCase()]}
                                                </td>
                                            )
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;


