// "use client";
// import React, { useState, useEffect } from 'react';
// import Sidebar from '../brotherPage/sidebar';
// import TopBar from '../brotherPage/topbar';
// import TabContent from '../brotherPage/tabcontent';
// import ProductListDashboard from './ProductListForm';
// import UserRolesDashboard from './UserRolesForm';
// import { Toaster } from 'sonner';
// import { LoadDetail } from '@/data/services/brother/productlist-service';
// import ToDoDashboard from './ToDoForm';
// import { Loader2 } from 'lucide-react';
// import TrialDashboard from './TrialForm';
// import ResellerDashboard from './ResellerForm';
// import ReportOrderDashboard from './ReportOrderForm';
// import DashboardForm from './DashboardForm';


// const tabList = [
//   { id: 'tab1', name: 'Product List', section: 'Section 2', component: <ProductListDashboard  /> },
//   { id: 'tab2', name: 'Dashboard', section: 'Section 2', component: <DashboardForm  /> },

//   // { id: 'tab2', name: 'To Do List', section: 'Section 1', component: <ToDoDashboard /> },
//   { id: 'tab3', name: 'Reseller', section: 'Section 2', component: <ResellerDashboard /> },
//   { id: 'tab4', name: 'ReportOrder', section: 'Section 2', component: <ReportOrderDashboard /> },

//   // { id: 'tab4', name: 'Trial', section: 'Section 1', component: <TrialDashboard /> },

// ];

// const sections = [
//   { id: 'Section 1', name: 'Features' },
//   { id: 'Section 2', name: 'Systems' },
// ];

// export const HeightTopbar=100; //sync with below
// export const WidthSidebar=250; //sync with below

// const BrotherPage: React.FC = () => {
//   const [activeTab, setActiveTab] = useState<string>('tab1'); // Default to tab1
//   const [userroles, setuserroles] = useState<string>("");
//   const [dropdownVisible, setDropdownVisible] = useState(false);
//   const [loading, setLoading] = useState<boolean>(true); // Loading state to track fetching
// // State for managing sidebar width and topbar height
// const [sidebarWidth, setSidebarWidth] = useState<number>(250);  // Default 250px
// const [topbarHeight, setTopbarHeight] = useState<number>(100);  // Default 100px 


//   // Fetch data from backend on component mount
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const fetchedData = await LoadDetail();
//         setuserroles(fetchedData.roles); // Set the fetched data to state
//         console.log("testrolesuser", userroles)
//         if (userroles === "Staff") {
//           setActiveTab('tab2'); // Staff users should default to tab2
//         }
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       } finally {
//         // Keep loading for an additional second for smooth transition
//         setTimeout(() => {
//           setLoading(false); // After a short delay, set loading to false
//         }, 500); // 500 ms delay before hiding the loading state
//       }
//     };

//     fetchData();
//   }, [userroles]);

//   // useEffect(() => {
//   //   // Try to get the saved state from localStorage
//   //   const validTab = localStorage.getItem('activeTab');
//   //   console.log("testtab",validTab)
//   //   // Check if validTab exists and is in tabList
//   //   if (validTab && tabList.some(tab => tab.id === validTab)) {
//   //     // If validTab exists in tabList, set it as active
//   //     setActiveTab(validTab);
//   //     console.log("testtab 2",activeTab)

//   //   } else {
//   //     // If validTab doesn't exist or is not in tabList, set default tab
//   //     setActiveTab('tab2');

//   //     console.log("testtab 3",activeTab)

//   //   }
//   // }, [activeTab]); // Effect runs once on mount



//   // Handle tab click, dynamically set active tab
//   const handleTabClick = (tabId: string) => {
//     setActiveTab(tabId);
//     if (typeof window !== 'undefined') {
//       localStorage.setItem('activeTab', tabId);
//     }
//   };

//   // Ensure we only read from localStorage after the component is mounted (client-side)
//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       const savedTab = localStorage.getItem('activeTab');
//       if (savedTab) {
//         setActiveTab(savedTab); // Set the active tab if found in localStorage
//       }
//     }
//   }, []);


//   // // Create an array of allowed tab IDs for staff
//   // const allowedTabsForStaff = ['tab2', 'tab3', 'tab5'];

//   // // Conditionally filter tabList based on user role using allowedTabsForStaff
//   // const filteredTabList = userroles === 'Staff'
//   //   ? tabList.filter(tab => allowedTabsForStaff.includes(tab.id))  // Show only allowed tabs for staff
//   //   : tabList;  // Show all tabs for non-staff users

//   // Conditionally filter tabList based on user role
//   const filteredTabList = userroles === "Staff"
//     ? tabList.filter(tab => tab.id === 'tab2') // Only show tab2 for staff
//     : tabList; // Show all tabs if user is not staff

    
//   if (loading) {
//     return (
//       <div className="h-screen flex justify-center items-center bg-neutral-100">
//         <Loader2 className="mr-2 h-12 w-12 animate-spin" />

//         <div className="text-2xl text-gray-500">Loading...</div>
//       </div>
//     ); // Display loading message or spinner while fetching userroles
//   }
//   return (
//     <div className="h-screen bg-neutral-100">
//       <Sidebar onTabClick={handleTabClick} tabList={filteredTabList} sections={sections} activeTab={activeTab} sidebarWidth={sidebarWidth}/>
//       <div className={`ml-[${sidebarWidth}px]`}> {/* Top bar with dynamic title corresponding to the sidebar tab */}
//         <div className="absolute top-0 left-0 w-full z-40">
//           <TopBar activeTab={activeTab} tabList={filteredTabList} topbarHeight={topbarHeight} sidebarWidth={sidebarWidth}/>
//         </div>
//         <div className={` h-screen overflow-y-auto bg-neutral-100`}>
//           {/* Render the active tab content */}
//           <TabContent activeTab={activeTab}
//             tabList={filteredTabList}
//             topbarHeight={topbarHeight}
//             sidebarWidth={sidebarWidth}
//             />
//         </div>
//       </div>
//       <Toaster />
//     </div>

    
//   );
// };

// export default BrotherPage;

