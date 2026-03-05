"use client";
import React, { useState, useEffect } from 'react';
import SearchBar from '../custom/Dashboard/filters/searchbar';
import CryptoJS from "crypto-js";
import { toast } from 'sonner';
import { LoadPermissionsAuth } from '@/data/services/brother/productlist-service';
import ExitModal from '../custom/ExitModal';
import Pagination from '../custom/Pagination/pagination-button';
import PageSizeInput from '../custom/Pagination/pagesizeinput';
import { Loader2 } from 'lucide-react';

import DateRangeSelector from '../custom/Dashboard/filters/datefilter';

import ShippedOrderCard from '../custom/Dashboard/cards/shippedOrderCard';
import PendingOrderCard from '../custom/Dashboard/cards/pendingOrderCard';
import NewOrderCard from '../custom/Dashboard/cards/newOrderCard';
import { LoadShippingOrder, LoadNewOrder, LoadPendingOrder, LoadChart, LoadBestSeller, LoadMap } from '@/data/services/brother/dashboard-service';
import ResellerChart from '../custom/Dashboard/cards/resellerChart';
import BestSellerList from '../custom/Dashboard/ListBestSeller';
// import MapComponent from '../custom/Dashboard/cards/mapComponent';
import dynamic from 'next/dynamic';

const MapComponent = dynamic(() => import('../custom/Dashboard/cards/mapComponent'), {
  ssr: false,
});

interface ShippedOrderProps {
  shippedOrderCount: number;
}

interface PendingOrderProps {
  pendingOrderCount: number;
}

interface NewOrderProps {
  newOrderCount: number;
}

interface ChartProps {
  city: string;
  totalResellers: number;
}

interface MapProps {
 
  coordinates: {lat: number; lng: number; };
  no: number; shopName: string; address: string; storePhoto: string;
}

interface BestSellerProps {
  product: string;
  price: string;
  soldItems: number;
  profit: string;
}

interface SimpleMapPoint {
  lat: number;
  lng: number;
  shopName: string;
  address: string;
  no: number;
  storePhoto: string;
}


const DashboardForm: React.FC = () => {
  const [invoiceNumberSearch, setInvoiceNumberSearch] = useState('');
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')
   const [shippingOrder, setShippingOrder] = useState<number>(0); // Initially empty, will be populated by backend Order
   const [newOrder, setNewOrder] = useState<number>(0); // Initially empty, will be populated by backend Order
   const [PendingOrder, setPendingOrder] = useState<number>(0); // Initially empty, will be populated by backend Order

   const [isLoadingNew, setIsLoadingNew] = useState(true); // Modal state
   const [isLoadingShipping, setIsLoadingShipping] = useState(true);
   const [isLoadingPending, setIsLoadingPending] = useState(true);
   const [chartData, setChartData] = useState<ChartProps[]>([]);
   const [isLoadingChart, setIsLoadingChart] = useState(true);

   const [bestSellerData, setBestSellerData] = useState<BestSellerProps[]>([]);
   const [isLoadingBestSeller, setIsLoadingBestSeller] = useState(true);

   const [isLoadingMap, setIsLoadingMap] = useState(true);
   const [mapData, setMapData] = useState<SimpleMapPoint[]>([]);

  const [isExitModalOpen, setIsExitModalOpen] = useState(false); // Modal state
  // const [page, setPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(1);
  // const [pageSize, setPageSize] = useState(5);
  const [loading, setLoading] = useState(true); // Loading state



  useEffect(() => {

    const fetchData = async () => {
      // try {
      //   // Fetch permissions
      //   const responsepermission = await LoadPermissionsAuth();
      //   // setPermissionauth(responsepermission);
      //   // console.log("testauth",responsepermission);
      //   // Check if the user has the DELETE_USER permission
      //    if (responsepermission===undefined){

      //         setIsExitModalOpen(true); // Open the modal when the token is expired
      //         toast.error(`Session Expired`, {
      //           style: { backgroundColor: '#FF4D4D', color: 'white' },
      //           position: 'top-center',
      //           duration: 5000,
      //         }); 
      //   } else if (responsepermission.includes("GETALL_USER")) {
        try {
          setIsLoadingShipping(true);
          setIsLoadingPending(true);
          setIsLoadingNew(true);
          console.log("testdate",startDate,endDate)
        
          const fetchedShippingOrder = await LoadShippingOrder(startDate,endDate); 
          const fetchedNewOrder = await LoadNewOrder(startDate,endDate); 
          const fetchedPendingOrder = await LoadPendingOrder(startDate,endDate);
        console.log("testorderload",fetchedShippingOrder,fetchedNewOrder,fetchedPendingOrder)

        const fetchedChart = await LoadChart();
        console.log("testChart",fetchedChart.data)


        const fetchedBestSellerData = await LoadBestSeller(startDate,endDate);
        console.log("testChart",fetchedBestSellerData.data)

        const fetchedMapData = await LoadMap(); // Fetch map data
        console.log("testMap",fetchedMapData.data)


       


          if (fetchedShippingOrder?.data?.shippedOrderCount !== undefined) {
            setShippingOrder(fetchedShippingOrder.data.shippedOrderCount);
            setIsLoadingShipping(false);
          }
        
          if (fetchedNewOrder?.data?.newOrderCount !== undefined) {
            setNewOrder(fetchedNewOrder.data.newOrderCount);
            setIsLoadingNew(false);
          }
        
          if (fetchedPendingOrder?.data?.pendingOrderCount !== undefined) {
            setPendingOrder(fetchedPendingOrder.data.pendingOrderCount);
            setIsLoadingPending(false);

          }
          


          if (fetchedChart?.data) {
            setChartData(fetchedChart.data);
            setIsLoadingChart(false);

          }

          if (fetchedBestSellerData?.data) {
            setBestSellerData(fetchedBestSellerData.data);
            setIsLoadingBestSeller(false);

          }

          if (fetchedMapData?.data) {
            const transformedMapData = fetchedMapData?.data?.map((item: MapProps) => ({
              lat: item.coordinates.lat,
              lng: item.coordinates.lng,
              shopName: item.shopName,
              address: item.address,
              storePhoto: item.storePhoto,
              no: item.no,
            })) || [];
            console.log("testtransformmap",transformedMapData)
            setMapData(transformedMapData);
            
            // setMapData(fetchedMapData.data);
            setIsLoadingMap(false);

          }

        
        } catch (error) {
          console.error("Error fetching data:", error);
          toast.error("Error fetching data", {
            style: { backgroundColor: '#FF4D4D', color: 'white' },
            position: 'top-center',
            duration: 5000,
          });
        } finally {
          setLoading(false);
        }
        

    
    };

    fetchData();
  }, [
    startDate, endDate, 
    // invoiceNumberSearch,
  ]); // Empty dependency array to run this effect only once when the component mounts.


  const handleDateChange = (start: Date | null, end: Date | null) => {
    const formattedStart = start ? start.toISOString().split('T')[0] : ''
    const formattedEnd = end ? end.toISOString().split('T')[0] : ''

    setStartDate(formattedStart)
    setEndDate(formattedEnd)

    // You can update state or make API calls here
  };



  const closeExitModal = () => {
    setIsExitModalOpen(false);
  };




  if (loading) {
    return (
      <div className={`h-screen  flex justify-center items-center bg-neutral-100 `}>
        <Loader2 className="mr-2 h-12 w-12 animate-spin" />

        <div className="text-2xl text-gray-500">Loading...</div>
      </div>
    ); // Display loading message or spinner while fetching userroles
  }
  return (
    <div className={`p-5 `}
      style={{ backgroundColor: 'rgba(231, 244, 255, 1)' }}
    >

      <div className="flex justify-between items-top mb-4 w-full">
        {/* Date Filters */}
        <DateRangeSelector onDateChange={handleDateChange} />
        {/* Search Bar */}

        {/* <SearchBar searchQuery={invoiceNumberSearch} setSearchQuery={setInvoiceNumberSearch} /> */}

      </div>
     
      <div className="flex justify-between items-top mb-4 w-full">
        <ShippedOrderCard isLoadingShipping={isLoadingShipping} shippingOrder={shippingOrder}/>
        <PendingOrderCard isLoadingPending={isLoadingPending} pendingOrder={PendingOrder}/>
        <NewOrderCard isLoadingNew={isLoadingNew} newOrder={newOrder}/>

      </div>
<div className='flex justify-between w-full '>
<div className='w-[calc(592/1007*100%)] '>

<MapComponent coordinates={mapData} isLoadingMap={isLoadingMap}/>  {/* Passing map data as props */}
</div>
  <div className='ml-5 w-[calc(415/1007*100%)]'>

  <ResellerChart data={chartData} isLoadingChart={isLoadingChart}/>
      <BestSellerList
        startDate={startDate}
        endDate={endDate}
        data={bestSellerData}
        setData={setBestSellerData}
        isLoadingBestSeller={isLoadingBestSeller}
      />

  </div>
</div>
     
      {/* Pass searchQuery, rolesFilter, and statusFilter to the App component */}
      <ExitModal isExitModalOpen={isExitModalOpen} onCloseExitModal={closeExitModal} />

    </div>
  );
};

export default DashboardForm;
