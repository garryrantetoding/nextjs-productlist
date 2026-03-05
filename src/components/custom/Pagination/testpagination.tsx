// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';

// interface PaginationProps {
//   currentPage: number;
//   totalPages: number;
//   onPageChange: (page: number) => void;
//   scale: number;
//   routePrefix: string; // To differentiate between /master/product and /master/report

// }

// const Pagination: React.FC<PaginationProps> = ({
//   currentPage,
//   totalPages,
//   onPageChange,
//   scale,
//   routePrefix,
// }) => {
//   const [inputPage, setInputPage] = useState<number>(currentPage);

//   //  // Sync the inputPage with the currentPage whenever currentPage changes
//   //  useEffect(() => {
//   //   setInputPage(currentPage);
//   // }, [currentPage]);
//    // Sync the inputPage with the currentPage whenever currentPage changes
//    useEffect(() => {
//     // Ensure currentPage doesn't exceed totalPages
//     if (currentPage < 1) {
//       onPageChange(totalPages); // Reset to the last page
//     } else if (currentPage > totalPages) {
//       onPageChange(totalPages); // Reset to the last page
//     }  else {
//       setInputPage(currentPage); // Sync inputPage with currentPage
//     }
//   }, [currentPage, totalPages, onPageChange]);

//   // Handle page change from input modal
//   const handlePageSubmit = (page: number) => {
//     // Validate page
//     if (page > totalPages || page < 1 || isNaN(page)) {
//       setInputPage(1); // Reset to 1 if invalid
//       onPageChange(1);  // Optionally, you can also navigate to page 1
//     } else if (page !== currentPage) {
//       onPageChange(page);
//     }
//   };

//   // Handle the Enter key press to submit the page number
//   const handleKeyDown = (event: React.KeyboardEvent) => {
//     if (event.key === 'Enter') {
//       handlePageSubmit(inputPage);
//     }
//   };

//   // Handle the change in the input value
//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value;

//     // Allow only numbers, and update inputPage
//     if (value === '' || /^[0-9]+$/.test(value)) {
//       setInputPage(Number(value));
//     }
//   };

//   const generatePageNumbers = () => {
//     const pageNumbers: (number | string)[] = [];

//     // if (totalPages <= 0) {
//     //   pageNumbers.push(1); // Show only page 1 if there are no pages
//     // } else if
    
//     if (totalPages <= 4) {
//       for (let i = 1; i <= totalPages; i++) {
//         pageNumbers.push(i);
//       }
//     } else {
//       if (currentPage < 3) {
//         pageNumbers.push(1, 2);
//       } else if (currentPage === 3) {
//         pageNumbers.push(1, 2);
//       } else {
//         pageNumbers.push(1, 2);
//       }

//       if (totalPages >= 8 && currentPage > 4) {
//         pageNumbers.push('...');
//       } else if (currentPage - 2 >= 2 && currentPage > 4) {
//         pageNumbers.push('...');
//       }

//       const start = Math.max(3, currentPage - 1);
//       const end = Math.min(totalPages - 2, currentPage + 1);

//       for (let i = start; i <= end; i++) {
//         pageNumbers.push(i);
//       }

//       if (currentPage < totalPages - 3) {
//         pageNumbers.push('...');
//       }

//       if (totalPages > 5) {
//         pageNumbers.push(totalPages - 1);
//       }
    


//       pageNumbers.push(totalPages);
//     }

//     return pageNumbers;
//   };

//   if (totalPages===0){
//     return null
//   }
  

//   return (
//     <div className="flex flex-col justify-center items-center mt-4 border-0" style={{ transform: `scale(${scale})`, transformOrigin: 'center' }}>
//       <div className="flex justify-center items-center space-x-2 mb-4">
//                 {/* Previous Button */}

//       <Link href={`${routePrefix}/page/${Math.max(currentPage - 1, 1)}`}>

//         <button
//           onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
//           disabled={currentPage <= 1}
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           Prev
//         </button>
//         </Link>

//         {/* Page Numbers */}

//         {generatePageNumbers().map((pageNumber, index) => {
//           if (pageNumber === '...') {
//             return (
//               <span key={`ellipsis-${index}`} className="px-4 py-2 cursor-pointer">
//                 ...
//               </span>
//             );
//           }

//           return (
//             <Link key={`page-${pageNumber}-${index}`} href={`${routePrefix}/page/${pageNumber}`}>
//               <button
//                 className={`px-4 py-2 rounded ${
//                   pageNumber === currentPage
//                     ? 'bg-blue-500 text-white'
//                     : 'bg-white border border-gray-300'
//                 }`}
//               >
//                 {pageNumber}
//               </button>
//             </Link>
//           );
//         })}

//                 {/* Next Button */}


// <Link href={`${routePrefix}/page/${Math.min(currentPage + 1, totalPages)}`}>
//         <button
//           onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
//           disabled={currentPage >= totalPages}
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           Next
//         </button>
//         </Link>

//       </div>

//       {/* Input Box for Page Number */}
//       <div className="flex items-center mt-2 ">
//         <input
//           type="text"
//           value={isNaN(inputPage) ? '' : inputPage}
//           onChange={handleInputChange}
//           onKeyDown={handleKeyDown}
//           className="text-right"
//           placeholder="Enter page"
//         />
//         <button
//           onClick={() => handlePageSubmit(inputPage)}
//           className="border-2 border-blue-500 bg-blue-500 text-white px-4 py-2 ml-2 rounded-md"
//         >
//           Go
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Pagination;
