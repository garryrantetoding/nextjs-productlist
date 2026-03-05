// // // // // // 'use client';

// // // // // // import React from 'react';
// // // // // // import Link from 'next/link';
// // // // // // import { usePathname } from 'next/navigation';
// // // // // // import { menuItems, sidebarSections } from './constantSidebar';

// // // // // // import clsx from 'clsx';


// // // // // // export default function Sidebar() {
// // // // // //   const pathname = usePathname();

// // // // // //   return (
// // // // // //     <aside className="w-[250px] bg-white text-black p-4">
// // // // // //       <nav className="space-y-6">
// // // // // //         {sidebarSections.map((section) => {
// // // // // //           const itemsInSection = menuItems.filter((item) => item.section === section.id);

// // // // // //           return (
// // // // // //             <div key={section.id}>
// // // // // //               <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
// // // // // //                 {section.name}
// // // // // //               </h4>
// // // // // //               <ul className="space-y-1">
// // // // // //                 {itemsInSection.map((item) => {
// // // // // //                   const isActive = pathname === item.path;

// // // // // //                   return (
// // // // // //                     <li key={item.id}>
// // // // // //                       <Link
// // // // // //                         href={item.path}
// // // // // //                         className={clsx(
// // // // // //                           'flex items-center gap-3 px-3 py-2 rounded-md transition-colors',
// // // // // //                           isActive ? 'bg-gray-700 text-white font-semibold' : 'hover:bg-gray-800 text-gray-300'
// // // // // //                         )}
// // // // // //                       >
// // // // // //                         {item.icon}
// // // // // //                         <span>{item.name}</span>
// // // // // //                       </Link>
// // // // // //                     </li>
// // // // // //                   );
// // // // // //                 })}
// // // // // //               </ul>
// // // // // //             </div>
// // // // // //           );
// // // // // //         })}
// // // // // //       </nav>
// // // // // //     </aside>
// // // // // //   );
// // // // // // }

// // // // // 'use client';

// // // // // import React, { useState } from 'react';
// // // // // import Link from 'next/link';
// // // // // import { usePathname } from 'next/navigation';
// // // // // import { menuItems, sidebarSections } from './constantSidebar';
// // // // // import clsx from 'clsx';

// // // // // export default function Sidebar() {
// // // // //   const pathname = usePathname();
// // // // //   const [isOpen, setIsOpen] = useState(true); // State to handle sidebar toggle

// // // // //   const toggleSidebar = () => {
// // // // //     setIsOpen((prev) => !prev);
// // // // //   };

// // // // //   return (
// // // // //     <aside
// // // // //       className={clsx(
// // // // //         'bg-white text-red-900 p-4 h-screen transition-all duration-300 ease-in-out flex flex-col z-50',
// // // // //         isOpen ? 'w-[250px]' : 'w-[100px]'
// // // // //       )}
// // // // //     >
// // // // //       {/* Toggle Button */}
// // // // //       <div className="mb-6">
// // // // //         <button
// // // // //           onClick={toggleSidebar}
// // // // //           className="text-black bg-gray-200 px-2 py-1 rounded hover:bg-gray-300 transition"
// // // // //         >
// // // // //           {isOpen ? '<' : '>'}
// // // // //         </button>
// // // // //       </div>

// // // // //       {/* Navigation */}
// // // // //       <nav className="space-y-6 flex-1 overflow-auto">
// // // // //         {sidebarSections.map((section) => {
// // // // //           const itemsInSection = menuItems.filter((item) => item.section === section.id);

// // // // //           return (
// // // // //             <div key={section.id}>
// // // // //               {/* Section Title */}
// // // // //               {isOpen && (
// // // // //                 <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
// // // // //                   {section.name}
// // // // //                 </h4>
// // // // //               )}

// // // // //               <ul className="space-y-1  !list-none !m-0 !p-0">
// // // // //                 {itemsInSection.map((item) => {
// // // // //                   const isActive = pathname === item.path;

// // // // //                   return (
// // // // //                     <li key={item.id}>
// // // // //                       <Link
// // // // //                         href={item.path}
// // // // //                         className={clsx(
// // // // //                           'flex items-center gap-3 px-3 py-2 rounded-md transition-colors',
// // // // //                           isActive ? 'bg-gray-700 text-white font-semibold' : 'hover:bg-gray-800 text-gray-300'
// // // // //                         )}
// // // // //                       >
// // // // //                         {/* Icon always visible */}
// // // // //                         <div className="w-6 h-6 flex items-center justify-center">{item.icon}</div>

// // // // //                         {/* Name only visible when open */}
// // // // //                         {isOpen && <span className="whitespace-nowrap">{item.name}</span>}
// // // // //                       </Link>
// // // // //                     </li>
// // // // //                   );
// // // // //                 })}
// // // // //               </ul>
// // // // //             </div>
// // // // //           );
// // // // //         })}
// // // // //       </nav>
// // // // //     </aside>
// // // // //   );
// // // // // }

// // // // 'use client';

// // // // import React, { useState, useEffect } from 'react';
// // // // import Link from 'next/link';
// // // // import { usePathname } from 'next/navigation';
// // // // import { menuItems, sidebarSections } from './constantSidebar';
// // // // import clsx from 'clsx';

// // // // export default function Sidebar() {
// // // //   const pathname = usePathname();

// // // //   // Get the initial sidebar state from localStorage (if available)
// // // //   const [isOpen, setIsOpen] = useState<boolean>(() => {
// // // //     if (typeof window !== 'undefined') {
// // // //       return JSON.parse(localStorage.getItem('sidebarOpen') || 'true');
// // // //     }
// // // //     return true; // default to open
// // // //   });

// // // //   const toggleSidebar = () => {
// // // //     setIsOpen((prev) => {
// // // //       const newState = !prev;
// // // //       // Store the sidebar state in localStorage
// // // //       localStorage.setItem('sidebarOpen', JSON.stringify(newState));
// // // //       return newState;
// // // //     });
// // // //   };

// // // //   return (
// // // //     <aside
// // // //       className={clsx(
// // // //         'bg-white text-red-900 p-4 h-screen transition-all duration-300 ease-in-out flex flex-col z-50',
// // // //         isOpen ? 'w-[250px]' : 'w-[100px]'
// // // //       )}
// // // //     >
// // // //       {/* Toggle Button with animated icon */}
// // // //       <div className="mb-6">
// // // //         <button
// // // //           onClick={toggleSidebar}
// // // //           className={clsx(
// // // //             "text-black bg-gray-200 px-2 py-1 rounded hover:bg-gray-300 transition",
// // // //             isOpen ? "rotate-180" : "rotate-0"
// // // //           )}
// // // //         >
// // // //           {isOpen ? '←' : '→'} {/* Arrow that rotates on toggle */}
// // // //         </button>
// // // //       </div>

// // // //       {/* Navigation */}
// // // //       <nav className="space-y-6 flex-1 overflow-auto">
// // // //         {sidebarSections.map((section) => {
// // // //           const itemsInSection = menuItems.filter((item) => item.section === section.id);

// // // //           return (
// // // //             <div key={section.id}>
// // // //               {/* Section Title */}
// // // //               {isOpen && (
// // // //                 <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
// // // //                   {section.name}
// // // //                 </h4>
// // // //               )}

// // // //               <ul className="space-y-1 list-none p-0 m-0">
// // // //                 {itemsInSection.map((item) => {
// // // //                   const isActive = pathname === item.path;

// // // //                   return (
// // // //                     <li key={item.id}>
// // // //                       <Link
// // // //                         href={item.path}
// // // //                         className={clsx(
// // // //                           'flex items-center gap-3 px-3 py-2 rounded-md transition-colors',
// // // //                           isActive ? 'bg-gray-700 text-white font-semibold' : 'hover:bg-gray-800 text-gray-300'
// // // //                         )}
// // // //                         title={isOpen ? '' : item.name} // Tooltip when collapsed
// // // //                       >
// // // //                         {/* Icon always visible */}
// // // //                         <div className="w-6 h-6 flex items-center justify-center">{item.icon}</div>

// // // //                         {/* Name only visible when open */}
// // // //                         {isOpen && <span className="whitespace-nowrap">{item.name}</span>}
// // // //                       </Link>
// // // //                     </li>
// // // //                   );
// // // //                 })}
// // // //               </ul>
// // // //             </div>
// // // //           );
// // // //         })}
// // // //       </nav>
// // // //     </aside>
// // // //   );
// // // // }
// // // 'use client';

// // // import React, { useState, useEffect } from 'react';
// // // import Link from 'next/link';
// // // import { usePathname } from 'next/navigation';
// // // import { menuItems, sidebarSections } from './constantSidebar';
// // // import clsx from 'clsx';

// // // export default function Sidebar() {
// // //   const pathname = usePathname();

// // //   // Get the initial sidebar state from localStorage (if available)
// // //   const [isOpen, setIsOpen] = useState<boolean>(() => {
// // //     if (typeof window !== 'undefined') {
// // //       return JSON.parse(localStorage.getItem('sidebarOpen') || 'true');
// // //     }
// // //     return true; // default to open
// // //   });

// // //   const toggleSidebar = () => {
// // //     setIsOpen((prev) => {
// // //       const newState = !prev;
// // //       // Store the sidebar state in localStorage
// // //       localStorage.setItem('sidebarOpen', JSON.stringify(newState));
// // //       return newState;
// // //     });
// // //   };

// // //   return (
// // //     <aside
// // //       className={clsx(
// // //         'bg-white text-red-900 p-4 h-screen transition-all duration-300 ease-in-out flex flex-col z-50',
// // //         isOpen ? 'w-[250px]' : 'w-[100px]'
// // //       )}
// // //     >
// // //       {/* Toggle Button with animated icon */}
// // //       <div className="mb-6">
// // //         <button
// // //           onClick={toggleSidebar}
// // //           className="text-black bg-gray-200 px-2 py-1 rounded hover:bg-gray-300 transition"
// // //         >

// // //            {/* Rotate the arrow icon */}
// // //            <div
// // //             className={clsx(
// // //               "transition-transform duration-300 px-2 py-2",
// // //               isOpen ? "rotate-180" : "rotate-90"
// // //             )}
// // //             style={{ transformOrigin: 'center'}} // Make sure it rotates around the center
// // //           >
// // //             {/* Arrow as a simple div */}
// // //             <div
// // //               className={clsx(
// // //                 "w-4 h-4 border-t-2 border-r-2 transform",
// // //                 isOpen ? "rotate-45" : "-rotate-45",
// // //                 "border-black" // Change the border color here (for example, to gray)
// // //               )}
// // //             />
// // //           </div>
// // //         </button>
// // //       </div>

// // //       {/* Navigation */}
// // //       <nav className="space-y-6 flex-1 overflow-auto">
// // //         {sidebarSections.map((section) => {
// // //           const itemsInSection = menuItems.filter((item) => item.section === section.id);

// // //           return (
// // //             <div key={section.id}>
// // //               {/* Section Title */}
// // //               {isOpen && (
// // //                 <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
// // //                   {section.name}
// // //                 </h4>
// // //               )}

// // //               <ul className="space-y-1 list-none p-0 m-0">
// // //                 {itemsInSection.map((item) => {
// // //                   const isActive = pathname === item.path;

// // //                   return (
// // //                     <li key={item.id}>
// // //                       <Link
// // //                         href={item.path}
// // //                         className={clsx(
// // //                           'flex items-center gap-3 px-3 py-2 rounded-md transition-colors',
// // //                           isActive ? 'bg-gray-700 text-white font-semibold' : 'hover:bg-gray-800 text-gray-300'
// // //                         )}
// // //                         title={isOpen ? '' : item.name} // Tooltip when collapsed
// // //                       >
// // //                         {/* Icon always visible */}
// // //                         <div className="w-6 h-6 flex items-center justify-center">{item.icon}</div>

// // //                         {/* Name only visible when open */}
// // //                         {isOpen && <span className="whitespace-nowrap">{item.name}</span>}
// // //                       </Link>
// // //                     </li>
// // //                   );
// // //                 })}
// // //               </ul>
// // //             </div>
// // //           );
// // //         })}
// // //       </nav>
// // //     </aside>
// // //   );
// // // }

// // 'use client';

// // import React, { useState, useEffect } from 'react';
// // import Link from 'next/link';
// // import { usePathname } from 'next/navigation';
// // import { menuItems, sidebarSections } from './constantSidebar';
// // import clsx from 'clsx';

// // export default function Sidebar() {
// //   const pathname = usePathname();

// //   // Get the initial sidebar state from localStorage (if available)
// //   const [isOpen, setIsOpen] = useState<boolean>(() => {
// //     if (typeof window !== 'undefined') {
// //       return JSON.parse(localStorage.getItem('sidebarOpen') || 'true');
// //     }
// //     return true; // default to open
// //   });

// //   const toggleSidebar = () => {
// //     setIsOpen((prev) => {
// //       const newState = !prev;
// //       // Store the sidebar state in localStorage
// //       localStorage.setItem('sidebarOpen', JSON.stringify(newState));
// //       return newState;
// //     });
// //   };

// //   return (
// //     <aside
// //       className={clsx(
// //         'bg-white text-red-900 p-4 h-screen transition-all duration-300 ease-in-out flex flex-col z-50',
// //         isOpen ? 'w-[250px]' : 'w-[100px]',
// //         // Add a wrapper div to control the content spacing when collapsed
// //         'overflow-hidden'
// //       )}
// //     >
// //       {/* Toggle Button with animated icon */}
// //       <div className="mb-6">
// //         <button
// //           onClick={toggleSidebar}
// //           className="text-black bg-gray-200 px-2 py-1 rounded hover:bg-gray-300 transition"
// //         >
// //           {/* Rotate the arrow icon */}
// //           <div
// //             className={clsx(
// //               "transition-transform duration-300 px-2 py-2",
// //               isOpen ? "rotate-180" : "rotate-90"
// //             )}
// //             style={{ transformOrigin: 'center'}} // Make sure it rotates around the center
// //           >
// //             {/* Arrow as a simple div with a customizable border color */}
// //             <div
// //               className={clsx(
// //                 "w-4 h-4 border-t-2 border-r-2 transform",
// //                 isOpen ? "rotate-45" : "-rotate-45",
// //                 "border-black" // Change the border color here (for example, to gray)
// //               )}
// //             />
// //           </div>
// //         </button>
// //       </div>

// //       {/* Navigation */}
// //       <nav className="space-y-6 flex-1 overflow-auto">
// //         {sidebarSections.map((section) => {
// //           const itemsInSection = menuItems.filter((item) => item.section === section.id);

// //           return (
// //             <div key={section.id}>
// //               {/* Section Title */}
// //               {isOpen && (
// //                 <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2">
// //                   {section.name}
// //                 </h4>
// //               )}

// //               <ul className="space-y-1 list-none p-0 m-0">
// //                 {itemsInSection.map((item) => {
// //                   const isActive = pathname === item.path;

// //                   return (
// //                     <li key={item.id}>
// //                       <Link
// //                         href={item.path}
// //                         className={clsx(
// //                           'flex items-center gap-3 px-3 py-2 rounded-md transition-colors',
// //                           isActive ? 'bg-gray-700 text-white font-semibold' : 'hover:bg-gray-800 text-gray-300'
// //                         )}
// //                         title={isOpen ? '' : item.name} // Tooltip when collapsed
// //                       >
// //                         {/* Icon always visible */}
// //                         <div className="w-6 h-6 flex items-center justify-center">{item.icon}</div>

// //                         {/* Name only visible when open */}
// //                         {isOpen && <span className="whitespace-nowrap">{item.name}</span>}
// //                       </Link>
// //                     </li>
// //                   );
// //                 })}
// //               </ul>
// //             </div>
// //           );
// //         })}
// //       </nav>
// //     </aside>
// //   );
// // }
// 'use client';

// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { usePathname } from 'next/navigation';
// import { menuItems, sidebarSections } from './constantSidebar';
// import clsx from 'clsx';

// export default function Sidebar() {
//   const pathname = usePathname();

//   // Get the initial sidebar state from localStorage (if available)
//   const [isOpen, setIsOpen] = useState<boolean>(() => {
//     if (typeof window !== 'undefined') {
//       return JSON.parse(localStorage.getItem('sidebarOpen') || 'true');
//     }
//     return true; // default to open
//   });

//   const toggleSidebar = () => {
//     setIsOpen((prev) => {
//       const newState = !prev;
//       // Store the sidebar state in localStorage
//       localStorage.setItem('sidebarOpen', JSON.stringify(newState));
//       return newState;
//     });
//   };

//   return (
//     <aside
//       className={clsx(
//         'bg-white text-red-900 p-4 h-screen transition-all duration-300 ease-in-out flex flex-col z-50',
//         isOpen ? 'w-[250px]' : 'w-[100px]',
//         'overflow-hidden' // Ensure no overflow
//       )}
//     >
//       {/* Toggle Button with animated icon */}
//       <div className="mb-6">
//         <button
//           onClick={toggleSidebar}
//           className="text-black bg-gray-200 px-2 py-1 rounded hover:bg-gray-300 transition"
//         >
//           {/* Rotate the arrow icon */}
//           <div
//             className={clsx(
//               "transition-transform duration-300 px-1 py-2",
//               isOpen ? "rotate-180" : "rotate-90"
//             )}
//             style={{ transformOrigin: 'center'}} // Make sure it rotates around the center
//           >
//             {/* Arrow as a simple div with a customizable border color */}
//             <div
//               className={clsx(
//                 "w-4 h-4 border-t-2 border-r-2 transform",
//                 isOpen ? "rotate-45" : "-rotate-45",
//                 "border-gray-800" // Change the border color here (for example, to gray)
//               )}
//             />
//           </div>
//         </button>
//       </div>

//       {/* Navigation */}
//       <nav className="space-y-6 flex-1 overflow-auto">
//         {sidebarSections.map((section) => {
//           const itemsInSection = menuItems.filter((item) => item.section === section.id);

//           return (
//             <div key={section.id}>
//               {/* Section Title always visible but hidden when collapsed */}
//               <h4
//                 className={clsx(
//                   'text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2',
//                   isOpen ? 'block' : 'hidden'
//                 )}
//               >
//                 {section.name}
//               </h4>

//               <ul className="space-y-1 list-none p-0 m-0">
//                 {itemsInSection.map((item) => {
//                   const isActive = pathname === item.path;

//                   return (
//                     <li key={item.id}>
//                       <Link
//                         href={item.path}
//                         className={clsx(
//                           'flex items-center gap-3 px-3 py-2 rounded-md transition-colors',
//                           isActive ? 'bg-gray-700 text-white font-semibold' : 'hover:bg-gray-800 text-gray-300'
//                         )}
//                         title={isOpen ? '' : item.name} // Tooltip when collapsed
//                       >
//                         {/* Icon always visible */}
//                         <div className="w-6 h-6 flex items-center justify-center">{item.icon}</div>

//                         {/* Name only visible when open */}
//                         {isOpen && <span className="whitespace-nowrap">{item.name}</span>}
//                       </Link>
//                     </li>
//                   );
//                 })}
//               </ul>
//             </div>
//           );
//         })}
//       </nav>
//     </aside>
//   );
// }
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { menuItems, sidebarSections } from './constantSidebar';
import clsx from 'clsx';
import { Loader2 } from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  // Get the initial sidebar state from localStorage (if available)
  const [isOpen, setIsOpen] = useState(true); // Default value during SSR
  const [loading, setLoading] = useState(true) // Loading state

  // Sync with localStorage on client
  useEffect(() => {
    const stored = localStorage.getItem('sidebarOpen');
    if (stored !== null) {
      setIsOpen(JSON.parse(stored));
    }
     setLoading(false)

  }, []);

  const toggleSidebar = () => {
    const newState = !isOpen;
    setIsOpen(newState);
    localStorage.setItem('sidebarOpen', JSON.stringify(newState));
  };


  if (loading) {
    return (

      <div className={` w-[100px] flex justify-center items-center bg-neutral-100 `}>
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />

        <div className="text-sm text-gray-500">Loading...</div>
      </div>
    )
  }


  return (
    <aside
      className={clsx(
        'bg-white  py-4 pl-4 h-screen border-r-2 border-neutral-200 transition-all duration-300 ease-in-out flex flex-col z-50',
        isOpen ? 'w-[250px]' : 'w-[100px]',
        'overflow-hidden' // Ensure no overflow
      )}
    >
      {/* Toggle Button with animated icon */}
      {/* <div className="mb-6 bg-blue-900">
        <button
          onClick={toggleSidebar}
          className="text-black bg-gray-200 px-2 py-1 rounded hover:bg-gray-300 transition"
        >
          {/* Rotate the arrow icon */}
         {/*  <div
            className={clsx(
              "transition-transform duration-300 px-1 py-2",
              isOpen ? "rotate-180" : "rotate-90"
            )}
            style={{ transformOrigin: 'center' }} // Make sure it rotates around the center
          >
            {/* Arrow as a simple div with a customizable border color */}
            {/* <div
              className={clsx(
                "w-3 h-3 border-t-2 border-r-2 transform",
                isOpen ? "rotate-45" : "-rotate-45",
                "border-gray-600" // Change the border color here (for example, to gray)
              )}
            />
          </div>
        </button>
      </div> */}

      <div className="mb-6">
  <button
    onClick={toggleSidebar}
    className="text-black bg-white p-1 rounded  transition flex items-center justify-center"
  >
    {isOpen ? (
      // Close Icon (← or custom)
      <div className="w-[190px] h-[80px] flex items-center justify-center rounded hover:border-2 hover:border-gray-300">

      <svg width="194" height="80" viewBox="0 0 194 80" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
      <rect x="0.959373" y="0.662451" width="192.806" height="78.3938" fill="url(#pattern0_5_13669)"/>
      <defs>
      <pattern id="pattern0_5_13669" patternContentUnits="objectBoundingBox" width="1" height="1">
      <use xlinkHref="#image0_5_13669" transform="matrix(0.00168357 0 0 0.00415519 -2.0284e-05 -0.414894)"/>
      </pattern>
      <image id="image0_5_13669" width="594" height="425" preserveAspectRatio="none" xlinkHref="data:image/png;base64,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tcd3gARIgARIwEUEqPZc1NisKgmQAAmQANUe3wESIAESIAEXEaDac1Fjs6okQAIkQAJUe3wHSIAESIAEXESAas9Fjc2qkgAJkAAJUO3xHSABEiABEnARAao9FzU2q0oCJEACJEC1x3eABEiABEjARQSo9lzU2KwqCZAACZAA1R7fARIgARIgARcRoNpzUWOzqiRAAiRAAlR7fAdIgARIgARcRIBqz0WNzaqSAAmQAAlQ7fEdIAESIAEScBEBqj0XNTarSgIkQAIkQLXHd4AESIAESMBFBKj2XNTYrCoJkAAJkADVHt8BEiABEiABFxGg2nNRY7OqJEACJEACVHt8B0iABEiABFxEgGrPRY3NqpIACZAACVDt8R0gARIgARJwEQGqPRc1NqtKAiRAAiRAtcd3gARIgARIwEUEqPZc1NisKgmQAAmQANUe3wESIAESIAEXEaDac1Fjs6okQAIkQAJUe3wHSIAESIAEXESAas9Fjc2qkgAJkAAJUO3xHSABEiABEnARAao9FzU2q0oCJEACJEC1x3eABEiABEjARQSo9lzU2KwqCZAACZAA1R7fARIgARIgARcRoNpzUWOzqiRAAiRAAlR7fAdIgARIgARcRIBqz0WNzaqSAAmQAAlQ7fEdIAESIAEScBEBqj0XNTarSgIkQAIkQLXHd4AESIAESMBFBKj2XNTYrCoJkAAJkADVHt8BEiABEiABFxGg2nNRY7OqJEACJEACVHt8B0iABEiABFxEgGrPRY3NqpIACZAACVDt8R0gARIgARJwEQGqPRc1NqtKAiRAAiRAtcd3gARIgARIwEUEqPZc1NisKgmQAAmQANUe3wESIAESIAEXEaDac1Fjs6okQAIkQAJUe3wHSIAESIAEXESAas9Fjc2qkgAJkAAJUO3xHSABEiABEnARAao9FzU2q0oCJEACJEC1x3eABEiABEjARQSo9lzU2KwqCZAACZAA1R7fARIgARIgARcRoNpzUWOzqiRAAiRAAlR7fAdIgARIgARcRIBqz0WNzaqSAAmQAAlQ7fEdIAESIAEScBEBqj0XNTarSgIkQAIkQLXHd4AESIAESMBFBKj2XNTYrCoJkAAJkADVHt8BEiABEiABFxGg2nNRY7OqJEACJEACVHt8B0iABEiABFxEgGrPRY3NqpIACZAACVDt8R0gARIgARJwEQGqPRc1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gASMEqDaM0qO6UiABEiABBxIgGrPgY1GkUmABEiABIwSoNozSo7pSIAESIAEHEiAas+BjUaRSYAESIAEjBKg2jNKjulIgARIgAQcSIBqz4GNRpFJgARIgASMEqDaM0qO6UiABEiABBxIgGrPgY1GkUmABEiABIwSoNozSo7pSIAESIAEHEiAas+BjUaRSYAESIAEjBKg2jNKjulIgARIgAQcSIBqz4GNRpFJgARIgASMEqDaM0qO6UiABEiABBxIgGrPgY1GkUmABEiABIwSoNozSo7pSIAESIAEHEiAas+BjUaRSYAESIAEjBKg2jNKjulIgARIgAQcSIBqz4GNRpFJgARIgASMEqDaM0qO6UiABEiABBxIgGrPgY1GkUmABEiABIwSoNozSo7pSIAESIAEHEiAas+BjUaRSYAESIAEjBKg2jNKjulIgARIgAQcSIBqz4GNRpFJgARIgASMEqDaM0qO6UiABEiABBxIgGrPgY1GkUmABEiABIwSoNozSo7pSIAESIAEHEiAas+BjUaRSYAESIAEjBKg2jNKjulIgARIgAQcSIBqz4GNRpFJgARIgASMEqDaM0qO6UiABEiABBxIgGrPgY1GkUmABEiABIwSoNozSo7pSIAESIAEHEiAas+BjUaRSYAESIAEjBKg2jNKjulIgARIgAQcSIBqz4GNRpFJgARIgASMEqDaM0qO6UiABEiABBxIgGrPgY1GkUmABEiABIwSoNozSo7pSIAESIAEHEiAas+BjUaRSYAESIAEjBKg2jNKjulIgARIgAQcSIBqz4GNRpFJgARIgASMEqDaM0qO6UiABEiABBxIgGrPgY1GkUmABEiABIwSoNozSo7pSIAESIAEHEiAas+BjUaRSYAESIAEjBKg2jNKjulIgARIgAQcSIBqz4GNRpFJgARIgASMEqDaM0qO6UiABEiABBxIgGrPgY1GkUmABEiABIwSoNozSo7pSIAESIAEHEiAas+BjUaRSYAESIAEjBKg2jNKjulIgARIgAQcSIBqz4GNRpFJgARIgASMEqDaM0qO6UiABEiABBxIgGrPgY1GkUmABEiABIwSoNozSo7pSIAESIAEHEiAas+BjUaRSYAESIAEjBKg2jNKjulIgARIgAQcSIBqz4GNRpFJgARIgASMEqDaM0qO6UiABEiABBxIgGrPgY1GkUmABEiABIwSoNozSo7pSIAESIAEHEiAas+BjUaRSYAESIAEjBKg2jNKjulIgARIgAQcSIBqz4GNRpFJgARIgASMEqDaM0qO6UiABEiABBxIgGrPgY1GkUmABEiABIwSoNozSo7pSIAESIAEHEiAas+BjUaRSYAESIAEjBKg2jNKjulIgARIgAQcSIBqz4GNRpFJgARIgASMEqDaM0qO6UiABEiABBxIgGrPgY1GkUmABEiABIwSoNozSo7pSIAESIAEHEiAas+BjUaRSYAESIAEjBKg2jNKjulIgARIgAQcSIBqz4GNRpFJgARIgASMEqDaM0qO6UiABEiABBxIgGrPgY1GkUmABEiABIwSoNozSo7pSIAESIAEHEiAas+BjUaRSYAESIAEjBKg2jNKjulIgARIgAQcSIBqz4GNRpFJgARIgASMEqDaM0qO6UiABEiABBxIgGrPgY1GkUmABEiABIwSoNozSo7pSIAESIAEHEiAas+BjUaRSYAESIAEjBKg2jNKjulIgARIgAQcSIBqz4GNRpFJgARIgASMEqDaM0qO6UiABEiABBxIgGrPgY1GkUmABEiABIwSoNozSo7pSIAESIAEHEiAas+BjUaRSYAESIAEjBL4P8eUoh6abuZyAAAAAElFTkSuQmCC"/>
      </defs>
      </svg>
      </div>
      

    ) : (
      // Open Icon (→ or custom)
      <div className="w-[70px] h-[80px] flex items-center pl-[20px] rounded hover:border-2 hover:border-gray-300">

      <svg width="31" height="47" viewBox="0 0 31 47" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
      <rect x="0.5" width="30" height="47" fill="url(#pattern0_5_14199)"/>
      <defs>
      <pattern id="pattern0_5_14199" patternContentUnits="objectBoundingBox" width="1" height="1">
      <use xlinkHref="#image0_5_14199" transform="matrix(0.0108201 0 0 0.00693066 -0.534819 -0.805587)"/>
      </pattern>
      <image id="image0_5_14199" width="594" height="425" preserveAspectRatio="none" xlinkHref="data:image/png;base64,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tcd3gARIgARIwEUEqPZc1NisKgmQAAmQANUe3wESIAESIAEXEaDac1Fjs6okQAIkQAJUe3wHSIAESIAEXESAas9Fjc2qkgAJkAAJUO3xHSABEiABEnARAao9FzU2q0oCJEACJEC1x3eABEiABEjARQSo9lzU2KwqCZAACZAA1R7fARIgARIgARcRoNpzUWOzqiRAAiRAAlR7fAdIgARIgARcRIBqz0WNzaqSAAmQAAlQ7fEdIAESIAEScBEBqj0XNTarSgIkQAIkQLXHd4AESIAESMBFBKj2XNTYrCoJkAAJkADVHt8BEiABEiABFxGg2nNRY7OqJEACJEACVHt8B0iABEiABFxEgGrPRY3NqpIACZAACVDt8R0gARIgARJwEQGqPRc1NqtKAiRAAiRAtcd3gARIgARIwEUEqPZc1NisKgmQAAmQANUe3wESIAESIAEXEaDac1Fjs6okQAIkQAJUe3wHSIAESIAEXESAas9Fjc2qkgAJkAAJUO3xHSABEiABEnARAao9FzU2q0oCJEACJEC1x3eABEiABEjARQSo9lzU2KwqCZAACZAA1R7fARIgARIgARcRoNpzUWOzqiRAAiRAAlR7fAdIgARIgARcRIBqz0WNzaqSAAmQAAlQ7fEdIAESIAEScBEBqj0XNTarSgIkQAIkQLXHd4AESIAESMBFBKj2XNTYrCoJkAAJkADVHt8BEiABEiABFxGg2nNRY7OqJEACJEACVHt8B0iABEiABFxEgGrPRY3NqpIACZAACVDt8R0gARIgARJwEQGqPRc1NqtKAiRAAiRAtcd3gARIgARIwEUEqPZc1NisKgmQAAmQANUe3wESIAESIAEXEaDac1Fjs6okQAIkQAJUe3wHSIAESIAEXESAas9Fjc2qkgAJkAAJUO3xHSABEiABEnARAao9FzU2q0oCJEACJEC1x3eABEiABEjARQSo9lzU2KwqCZAACZAA1R7fARIgARIgARcRoNpzUWOzqiRAAiRAAlR7fAdIgARIgARcRIBqz0WNzaqSAAmQAAlQ7fEdIAESIAEScBEBqj0XNTarSgIkQAIkQLXHd4AESIAESMBFBKj2XNTYrCoJkAAJkADVHt8BEiABEiABFxGg2nNRY7OqJEACJEACVHt8B0iABEiABFxEgGrPRY3NqpIACZAACVDt8R0gARIgARJwEQGqPRc1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gASMEqDaM0qO6UiABEiABBxIgGrPgY1GkUmABEiABIwSoNozSo7pSIAESIAEHEiAas+BjUaRSYAESIAEjBKg2jNKjulIgARIgAQcSIBqz4GNRpFJgARIgASMEqDaM0qO6UiABEiABBxIgGrPgY1GkUmABEiABIwSoNozSo7pSIAESIAEHEiAas+BjUaRSYAESIAEjBKg2jNKjulIgARIgAQcSIBqz4GNRpFJgARIgASMEqDaM0qO6UiABEiABBxIgGrPgY1GkUmABEiABIwSoNozSo7pSIAESIAEHEiAas+BjUaRSYAESIAEjBKg2jNKjulIgARIgAQcSIBqz4GNRpFJgARIgASMEqDaM0qO6UiABEiABBxIgGrPgY1GkUmABEiABIwSoNozSo7pSIAESIAEHEiAas+BjUaRSYAESIAEjBKg2jNKjulIgARIgAQcSIBqz4GNRpFJgARIgASMEqDaM0qO6UiABEiABBxIgGrPgY1GkUmABEiABIwSoNozSo7pSIAESIAEHEiAas+BjUaRSYAESIAEjBKg2jNKjulIgARIgAQcSIBqz4GNRpFJgARIgASMEqDaM0qO6UiABEiABBxIgGrPgY1GkUmABEiABIwSoNozSo7pSIAESIAEHEiAas+BjUaRSYAESIAEjBKg2jNKjulIgARIgAQcSIBqz4GNRpFJgARIgASMEqDaM0qO6UiABEiABBxIgGrPgY1GkUmABEiABIwSoNozSo7pSIAESIAEHEiAas+BjUaRSYAESIAEjBKg2jNKjulIgARIgAQcSIBqz4GNRpFJgARIgASMEqDaM0qO6UiABEiABBxIgGrPgY1GkUmABEiABIwSoNozSo7pSIAESIAEHEiAas+BjUaRSYAESIAEjBKg2jNKjulIgARIgAQcSIBqz4GNRpFJgARIgASMEqDaM0qO6UiABEiABBxIgGrPgY1GkUmABEiABIwSoNozSo7pSIAESIAEHEiAas+BjUaRSYAESIAEjBKg2jNKjulIgARIgAQcSIBqz4GNRpFJgARIgASMEqDaM0qO6UiABEiABBxIgGrPgY1GkUmABEiABIwSoNozSo7pSIAESIAEHEiAas+BjUaRSYAESIAEjBKg2jNKjulIgARIgAQcSIBqz4GNRpFJgARIgASMEqDaM0qO6UiABEiABBxIgGrPgY1GkUmABEiABIwSoNozSo7pSIAESIAEHEiAas+BjUaRSYAESIAEjBKg2jNKjulIgARIgAQcSIBqz4GNRpFJgARIgASMEqDaM0qO6UiABEiABBxIgGrPgY1GkUmABEiABIwSoNozSo7pSIAESIAEHEiAas+BjUaRSYAESIAEjBKg2jNKjulIgARIgAQcSIBqz4GNRpFJgARIgASMEqDaM0qO6UiABEiABBxIgGrPgY1GkUmABEiABIwSoNozSo7pSIAESIAEHEiAas+BjUaRSYAESIAEjBKg2jNKjulIgARIgAQcSIBqz4GNRpFJgARIgASMEqDaM0qO6UiABEiABBxIgGrPgY1GkUmABEiABIwSoNozSo7pSIAESIAEHEiAas+BjUaRSYAESIAEjBKg2jNKjulIgARIgAQcSIBqz4GNRpFJgARIgASMEqDaM0qO6UiABEiABBxIgGrPgY1GkUmABEiABIwSoNozSo7pSIAESIAEHEiAas+BjUaRSYAESIAEjBKg2jNKjulIgARIgAQcSIBqz4GNRpFJgARIgASMEqDaM0qO6UiABEiABBxIgGrPgY1GkUmABEiABIwSoNozSo7pSIAESIAEHEiAas+BjUaRSYAESIAEjBL4P8eUoh6abuZyAAAAAElFTkSuQmCC"/>
      </defs>
      </svg>
      </div>
    )}
    
  </button>
  
</div>


      {/* Navigation */}
      <nav className="space-y-6 flex-1 overflow-auto">
        {sidebarSections.map((section) => {
          const itemsInSection = menuItems.filter((item) => item.section === section.id);

          return (
            <div key={section.id}>
              {/* Section Title always present but hidden using opacity */}
              <h4
                className={clsx(
                  'text-sm font-semibold text-gray-400 uppercase tracking-wide mb-2',
                  isOpen ? 'opacity-100' : 'opacity-0', // Change opacity based on sidebar state
                  'transition-opacity duration-300'
                )}
              >
                {section.name}
              </h4>

              <ul className="space-y-1 !list-none  !pl-2 !m-0">
                {itemsInSection.map((item) => {
                  const isActive = pathname === item.path;

                  return (
                    <li key={item.id}>
                      <Link
                        href={item.path}
                        className={clsx(
                          '!no-underline flex items-center gap-3 h-[50px] pr-3 pl-8 py-3 rounded-l-full transition-colors font-bold',
                          isActive
                            ? 'bg-[rgba(13,46,160,1)] text-white font-bold'
                            : 'hover:bg-[rgba(10,35,125,1)] text-gray-300'
                        )}
                        title={isOpen ? '' : item.name}
                      >


                        {/* Icon always visible */}
                        <div className="w-6 h-6 flex items-center justify-center">
                          {isActive ? item.icon("#E7F4FF") : item.icon("#B1D9FF")}
                        </div>

                        {/* Name only visible when open */}
                        {isOpen && (
                          <span
                            className={clsx(
                              'flex whitespace-nowrap transition-colors font-bold text-[18px]',
                              isActive
                                ? 'text-[rgba(231,244,255,1)] font-bold'
                                : 'text-[rgba(177,217,255,1)] font-bold'
                            )}
                          >
                            {item.name}
                          </span>
                        )}

                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
