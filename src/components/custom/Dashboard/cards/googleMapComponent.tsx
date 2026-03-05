// 'use client';

// import React, { useCallback, useRef, useState } from 'react';
// import {
//   GoogleMap,
//   Marker,
//   useLoadScript
// } from '@react-google-maps/api';
// import Image from 'next/image';
// import { LoadMapDetail } from '@/data/services/brother/dashboard-service';
// import { toast } from 'sonner';
// import { Loader2 } from 'lucide-react';

// interface Coordinate {
//   lat: number;
//   lng: number;
//   shopName: string;
//   address: string;
//   no: number;
// }

// interface MapProps {
//   coordinates: Coordinate[];
//   isLoadingMap: boolean;
// }

// interface MapDetailProps {
//   coordinates: { lat: number; lng: number };
//   shopName: string;
//   address: string;
//   no: number;
//   storePhoto: string;
// }

// const containerStyle = {
//   width: '100%',
//   height: '100%',
// };

// const MapComponent: React.FC<MapProps> = ({ coordinates, isLoadingMap }) => {
//   const { isLoaded } = useLoadScript({
//     googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '', // Set this in your .env.local
//   });

//   const [data, setData] = useState<MapDetailProps>();
//   const [isPanelOpen, setPanelOpen] = useState<boolean>(false);
//   const mapRef = useRef<google.maps.Map | null>(null);

//   const onMapLoad = useCallback((map: google.maps.Map) => {
//     mapRef.current = map;
//   }, []);

//   const handleMarkerClick = async (coord: Coordinate) => {
//     try {
//       const fetchedDetail = await LoadMapDetail(coord.no);
//       if (fetchedDetail.data) {
//         setData(fetchedDetail.data);
//         setPanelOpen(true);
//       }
//     } catch (err) {
//       console.error('Failed to load map detail:', err);
//       toast.error('Failed to load map detail', {
//         style: { backgroundColor: '#FF4D4D', color: 'white' },
//         position: 'top-center',
//         duration: 5000,
//       });
//     }
//   };

//   const handleClosePanel = () => {
//     setPanelOpen(false);
//   };

//   if (isLoadingMap || !isLoaded) {
//     return (
//       <div className="bg-white w-full p-5 rounded-2xl h-full flex justify-center items-center">
//         <Loader2 className="mr-2 h-12 w-12 animate-spin" />
//         <div className="text-2xl text-gray-500">Loading map...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white w-full p-5 rounded-2xl h-full relative">
//       <GoogleMap
//         mapContainerStyle={containerStyle}
//         center={coordinates[0] || { lat: 0, lng: 0 }}
//         zoom={13}
//         onLoad={onMapLoad}
//       >
//         {coordinates.map((coord) => (
//           <Marker
//             key={coord.no}
//             position={{ lat: coord.lat, lng: coord.lng }}
//             label={{
//               text: `${coord.no}`,
//               color: 'white',
//               fontWeight: 'bold',
//             }}
//             onClick={() => handleMarkerClick(coord)}
//             icon={{
//               url: `https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=${coord.no}|ff0000|000000`,
//               labelOrigin: new google.maps.Point(15, 10),
//             }}
//           />
//         ))}
//       </GoogleMap>

//       {/* Side Panel */}
//       <div
//         className={`map-panel ${isPanelOpen ? 'open' : ''}`}
//         style={{
//           width: isPanelOpen ? '50%' : '0',
//           height: '100%',
//           padding: isPanelOpen ? '20px' : '0',
//           borderRight: isPanelOpen ? 'solid 2px rgba(0, 0, 0, 1)' : '',
//         }}
//       >
//         <button className="close-btn" onClick={handleClosePanel}>
//           &times;
//         </button>
//         {data && (
//           <div className="mt-10">
//             <div
//               className="bg-red-900"
//               style={{
//                 width: '290px',
//                 height: '150px',
//                 position: 'relative',
//                 overflow: 'hidden',
//               }}
//             >
//               <Image
//                 src={
//                   data.storePhoto
//                     ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/${data.storePhoto}`
//                     : '/placeholder.png'
//                 }
//                 alt="Store photo"
//                 fill
//                 style={{
//                   objectFit: 'cover',
//                   objectPosition: 'center -40px',
//                 }}
//               />
//             </div>
//             <div className="data-container text-center text-black mt-2 border-b-2 border-black">
//               {data.shopName}
//             </div>
//             <div className="text-left mt-2 text-black">
//               Address: {data.address}
//             </div>
//           </div>
//         )}
//       </div>

//       <style jsx global>{`
//         .map-panel {
//           position: absolute;
//           top: 0;
//           left: 0;
//           bottom: 0;
//           background-color: rgba(255, 255, 255, 1);
//           color: black;
//           overflow-y: auto;
//           transition: width 0.3s ease;
//           box-sizing: border-box;
//           z-index: 40;
//         }

//         .map-panel.open {
//           width: 50%;
//         }

//         .close-btn {
//           background: none;
//           border: none;
//           color: black;
//           font-size: 30px;
//           position: absolute;
//           top: 10px;
//           right: 10px;
//           cursor: pointer;
//         }

//         .close-btn:hover {
//           color: #ff6f61;
//         }

//         .data-container {
//           font-size: 20px;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default MapComponent;
