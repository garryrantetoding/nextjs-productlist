// 'use client';

// import React, { useEffect, useState } from 'react';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import { Loader2 } from 'lucide-react';

// interface Coordinate {
//   lat: number;
//   lng: number;
//   shopName: string;
//   address: string;
//   storePhoto: string;
//   no: number;
// }

// interface MapProps {
//   coordinates: Coordinate[];
//   isLoadingMap: boolean;
// }



// const MapComponent: React.FC<MapProps> = ({ coordinates, isLoadingMap }) => {
 
// const goldenRatioConjugate = 0.61803398875;
// let hue = Math.random(); // Random initial hue

// // Generate evenly spaced HSL colors using golden ratio
// const getUniqueColor = (): string => {
//   hue += goldenRatioConjugate;
//   hue %= 1;

//   const h = Math.floor(hue * 360);
//   const s = 70;  // saturation %
//   const l = 55;  // lightness %

//   return hslToHex(h, s, l);
// };

// const hslToHex = (h: number, s: number, l: number): string => {
//   s /= 100;
//   l /= 100;

//   const k = (n: number) => (n + h / 30) % 12;
//   const a = s * Math.min(l, 1 - l);
//   const f = (n: number) =>
//     l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));

//   const toHex = (x: number) =>
//     Math.round(x * 255)
//       .toString(16)
//       .padStart(2, '0');

//   return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`;
// };


// const darkenColor = (hex: string, percent = 15): string => { // Increase percent → darker color, Decrease percent → subtler darkening
//   const num = parseInt(hex.slice(1), 16);
//   const amt = Math.round(2.55 * percent);
//   const R = (num >> 16) - amt;
//   const G = ((num >> 8) & 0x00FF) - amt;
//   const B = (num & 0x0000FF) - amt;

//   const clamp = (val: number) => Math.max(0, Math.min(255, val));

//   return `#${(clamp(R) << 16 | clamp(G) << 8 | clamp(B)).toString(16).padStart(6, '0')}`;
// };


//   useEffect(() => {
//     if (typeof window === 'undefined') return;

//     const map = L.map('map').setView(
//       [coordinates[0]?.lat || 51.505, coordinates[0]?.lng || -0.09],
//       13
//     );

//     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       attribution:
//         '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//     }).addTo(map);

//     coordinates.forEach((coord) => {
//       const markerId = `marker-btn-${coord.no}`;
//       const color = getUniqueColor();
//       const darkerColor = darkenColor(color, 15);
//       const styleId = `marker-style-${coord.no}`;
      
//       // Avoid duplicating styles
//       if (!document.getElementById(styleId)) {
//         const style = document.createElement('style');
//         style.id = styleId;
//         style.innerHTML = `
//           #marker-btn-${coord.no} {
//             background-color: ${color} !important;
//           }
      
//           #marker-btn-${coord.no}:hover {
//             background-color: ${darkerColor} !important;
//           }
//         `;
//         document.head.appendChild(style);
//       }

//       const customIcon = L.divIcon({
//         className: 'custom-marker',
//         html: `<button id="${markerId}" class="marker-btn">${coord.no}</button>`,
//         iconSize: [30, 30],
//         iconAnchor: [15, 15],
//       });

//       const marker = L.marker([coord.lat, coord.lng], { icon: customIcon }).addTo(map);
  

//       const imageUrl = coord.storePhoto
//   ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/${coord.storePhoto}`
//   : null;

// const popupContent = `
//   <div style="text-align: center;">
    
//     ${
//       imageUrl
//         ? `<img 
//             src="${imageUrl}" 
//             alt="Store photo" 
//             style="width: 100%; height: auto; max-width: 200px; object-fit: cover; margin-top: 8px; border-radius: 8px;" 
//           />`
//         : ''
//     }<br/>
//     <b>${coord.shopName}</b><br/>
//     ${coord.address}<br/>
//   </div>
// `;

// marker.bindPopup(popupContent);


//       // Delay to ensure button is rendered before attaching the event
//       setTimeout(() => {
//         const btn = document.getElementById(markerId);
//         if (btn) {
//           btn.addEventListener('click', async (e) => {
//             e.stopPropagation(); // Avoid bubbling up to Leaflet map
//             marker.openPopup();//open bindPopup

//           });
//         }
//       }, 0);
//     });

//     return () => {
//       map.remove();
//     };
//   }, [coordinates]);

  

//   if (isLoadingMap) {
//     return (
//       <div className="bg-white w-full p-5 rounded-2xl h-full  flex justify-center items-center">

//         <Loader2 className="mr-2 h-12 w-12 animate-spin" />

//         <div className="text-2xl text-gray-500">Loading...</div>
//       </div>
//     ); // Display loading message or spinner while fetching userroles
//   }

//   return (
//     <div className="bg-white w-full p-5 rounded-2xl h-full relative">
//       <div id="map" style={{ width: '100%', height: '100%' , zIndex: 35, }}></div>

   

//       <style jsx global>{`
//         .marker-btn {
//           // background-color: #007bff;
//           color: white;
//           border-radius: 50%;
//           border: none;
//           width: 40px;
//           height: 40px;
//           text-align: center;
//           font-weight: bold;
//           cursor: pointer;
//           font-size: 20px;
//         }

//         .marker-btn:hover {
//           // background-color: #0056b3;
//         }

//         .custom-marker {
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }

       
//       `}</style>
//     </div>
//   );
// };

// export default MapComponent;
'use client';

import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Loader2 } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

interface Coordinate {
  lat: number;
  lng: number;
  shopName: string;
  address: string;
  storePhoto: string;
  no: number;
}

interface MapProps {
  coordinates: Coordinate[];
  isLoadingMap: boolean;
}

const MapComponent: React.FC<MapProps> = ({ coordinates, isLoadingMap }) => {
  const goldenRatioConjugate = 0.61803398875;
  let hue = Math.random(); // Random initial hue

  // Generate evenly spaced HSL colors using golden ratio
  const getUniqueColor = (): string => {
    hue += goldenRatioConjugate;
    hue %= 1;

    const h = Math.floor(hue * 360);
    const s = 70;  // saturation %
    const l = 55;  // lightness %

    return hslToHex(h, s, l);
  };

  const hslToHex = (h: number, s: number, l: number): string => {
    s /= 100;
    l /= 100;

    const k = (n: number) => (n + h / 30) % 12;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) =>
      l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));

    const toHex = (x: number) =>
      Math.round(x * 255)
        .toString(16)
        .padStart(2, '0');

    return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`;
  };

  const darkenColor = (hex: string, percent = 15): string => {
    const num = parseInt(hex.slice(1), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) - amt;
    const G = ((num >> 8) & 0x00FF) - amt;
    const B = (num & 0x0000FF) - amt;

    const clamp = (val: number) => Math.max(0, Math.min(255, val));

    return `#${(clamp(R) << 16 | clamp(G) << 8 | clamp(B)).toString(16).padStart(6, '0')}`;
  };

  if (isLoadingMap) {
    return (
      <div className="bg-white w-full p-5 rounded-2xl h-full flex justify-center items-center">
        <Loader2 className="mr-2 h-12 w-12 animate-spin" />
        <div className="text-2xl text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-white w-full p-5 rounded-2xl h-full relative">
      <MapContainer center={[coordinates[0]?.lat || 51.505, coordinates[0]?.lng || -0.09]} zoom={13} style={{ width: '100%', height: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors" />
        
        {coordinates.map((coord) => {
          const color = getUniqueColor();
          const darkerColor = darkenColor(color, 15);

          const imageUrl = coord.storePhoto ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/${coord.storePhoto}` : null;

          return (
            <Marker
              key={coord.no}
              position={[coord.lat, coord.lng]}
              icon={L.divIcon({
                className: 'custom-marker',
                html: `
                  <button
                    style="
                      background-color: ${color}; 
                      color: white;
                      border-radius: 50%;
                      border: none;
                      width: 40px;
                      height: 40px;
                      text-align: center;
                      font-weight: bold;
                      cursor: pointer;
                      font-size: 20px;
                      transition: background-color 0.3s ease;"
                    class="marker-btn"
                    onMouseOver="this.style.backgroundColor = '${darkerColor}'"
                    onMouseOut="this.style.backgroundColor = '${color}'">
                    ${coord.no}
                  </button>
                `,
                iconSize: [30, 30],
                iconAnchor: [15, 15],
              })}
            >
              <Popup>
                <div className=''>
                  {imageUrl && (
                    <img
                      src={imageUrl}
                      alt="Store photo"
                      style={{ width: '100%', height: 'auto', maxWidth: '200px', objectFit: 'cover', marginTop: '8px', borderRadius: '8px' }}
                    />
                  )}
                  <div className='font-bold flex items-center justify-center'>{coord.shopName}</div>
                  <div>{coord.address}</div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default MapComponent;

// //custom popup(no transition, see testmapComponent or below)
// 'use client';

// import React, { useEffect, useState } from 'react';
// import L from 'leaflet';
// import { MapContainer, TileLayer, Marker } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import { Loader2 } from 'lucide-react';

// interface Coordinate {
//   lat: number;
//   lng: number;
//   shopName: string;
//   address: string;
//   storePhoto: string;
//   no: number;
// }

// interface MapProps {
//   coordinates: Coordinate[];
//   isLoadingMap: boolean;
// }

// const MapComponent: React.FC<MapProps> = ({ coordinates, isLoadingMap }) => {
//   const [activeCoord, setActiveCoord] = useState<Coordinate | null>(null);
//   const [details, setDetails] = useState<any>(null); // State for holding details

//   const goldenRatioConjugate = 0.61803398875;
//   let hue = Math.random(); // Random initial hue

//   const getUniqueColor = (): string => {
//     hue += goldenRatioConjugate;
//     hue %= 1;
//     const h = Math.floor(hue * 360);
//     const s = 70;
//     const l = 55;
//     return hslToHex(h, s, l);
//   };

//   const hslToHex = (h: number, s: number, l: number): string => {
//     s /= 100;
//     l /= 100;
//     const k = (n: number) => (n + h / 30) % 12;
//     const a = s * Math.min(l, 1 - l);
//     const f = (n: number) =>
//       l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
//     const toHex = (x: number) =>
//       Math.round(x * 255).toString(16).padStart(2, '0');
//     return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`;
//   };

//   const darkenColor = (hex: string, percent = 15): string => {
//     const num = parseInt(hex.slice(1), 16);
//     const amt = Math.round(2.55 * percent);
//     const R = (num >> 16) - amt;
//     const G = ((num >> 8) & 0x00ff) - amt;
//     const B = (num & 0x0000ff) - amt;
//     const clamp = (val: number) => Math.max(0, Math.min(255, val));
//     return (
//       '#' +
//       ((clamp(R) << 16) | (clamp(G) << 8) | clamp(B))
//         .toString(16)
//         .padStart(6, '0')
//     );
//   };

//   const handleMarkerClick = async (coord: Coordinate) => {
//     setActiveCoord(coord); // Set the clicked marker details in state
    
//     // Call the LoadDetail function and set the result to the details state
//     const detailData = "test";
//     setDetails(detailData); // Save the fetched details
//   };

//   if (isLoadingMap) {
//     return (
//       <div className="bg-white w-full p-5 rounded-2xl h-full flex justify-center items-center">
//         <Loader2 className="mr-2 h-12 w-12 animate-spin" />
//         <div className="text-2xl text-gray-500">Loading...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white w-full p-5 rounded-2xl h-full relative">
//       <MapContainer
//         center={[coordinates[0]?.lat || 51.505, coordinates[0]?.lng || -0.09]}
//         zoom={13}
//         style={{ width: '100%', height: '100%' }}
//       >
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
//         />
//         {coordinates.map((coord) => {
//           const color = getUniqueColor();
//           const darkerColor = darkenColor(color, 15);

//           return (
//             <Marker
//               key={coord.no}
//               position={[coord.lat, coord.lng]}
//               icon={L.divIcon({
//                 className: 'custom-marker',
//                 html: `
//                   <button
//                     class="marker-btn"
//                     style="
//                       background-color: ${color};
//                       color: white;
//                       border-radius: 50%;
//                       border: none;
//                       width: 40px;
//                       height: 40px;
//                       text-align: center;
//                       font-weight: bold;
//                       cursor: pointer;
//                       font-size: 20px;
//                       transition: background-color 0.3s ease;"
//                     onmouseover="this.style.backgroundColor='${darkerColor}'"
//                     onmouseout="this.style.backgroundColor='${color}'"
//                   >
//                     ${coord.no}
//                   </button>
//                 `,
//                 iconSize: [30, 30],
//                 iconAnchor: [15, 15],
//               })}
//               eventHandlers={{
//                 click: () => handleMarkerClick(coord), // Trigger the handler on click
//               }}
//             />
//           );
//         })}
//       </MapContainer>

//       {/* Custom Side Panel for Active Marker */}
//       {activeCoord && (
//         <div className="absolute right-0 top-0 h-full w-96 bg-white shadow-lg p-4 z-[9999] overflow-y-auto">
//           <div className="text-lg font-bold mb-2">{activeCoord.shopName}</div>
//           {activeCoord.storePhoto && (
//             <img
//               src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${activeCoord.storePhoto}`}
//               alt="Store"
//               className="w-full h-auto rounded mb-4"
//             />
//           )}
//           <p>{activeCoord.address}</p>

//           {/* Display additional details fetched from LoadDetail */}
//           {details && (
//             <div className="mt-4">
//               <h3 className="font-bold">Additional Details</h3>
//               <p>{details}</p> {/* Adjust this part based on your response data */}
//             </div>
//           )}

//           <button
//             onClick={() => setActiveCoord(null)}
//             className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
//           >
//             Close
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MapComponent;

// // //leaflet with custom popup(with animation and loadMapDetail)
// // 'use client';

// // import React, { useEffect, useState } from 'react';
// // import L from 'leaflet';
// // import 'leaflet/dist/leaflet.css';
// // import { LoadMapDetail } from '@/data/services/brother/dashboard-service';
// // import Image from 'next/image';
// // import { toast } from 'sonner';
// // import { Loader2 } from 'lucide-react';

// // interface Coordinate {
// //   lat: number;
// //   lng: number;
// //   shopName: string;
// //   address: string;
// //   storePhoto: string;
// //   no: number;
// // }

// // interface MapProps {
// //   coordinates: Coordinate[];
// //   isLoadingMap: boolean;
// // }

// // interface MapDetailProps {
// //   coordinates:{lat: number;
// //   lng: number;};
// //   shopName: string;
// //   address: string;
// //   no: number;
// //   storePhoto: string;
// // }

// // const MapComponent: React.FC<MapProps> = ({ coordinates, isLoadingMap }) => {
// //   const [data, setData] = useState<MapDetailProps>(); // Holds the map detail data
// //   const [isPanelOpen, setPanelOpen] = useState<boolean>(false); // Whether the sliding panel is open
// // // Function to generate a random color
// // const getRandomColor = (): string => {
// //   const letters = '0123456789ABCDEF';
// //   let color = '#';
// //   for (let i = 0; i < 6; i++) {
// //     color += letters[Math.floor(Math.random() * 16)];
// //   }

// //   // Avoid pure white color
// //   return color.toUpperCase() === '#FFFFFF' ? getRandomColor() : color;
// // };

// // // Set to store unique colors
// // const usedColors = new Set<string>();

// // // // Function to generate a unique color
// // // const getUniqueColor = (): string => {
// // //   let color = getRandomColor();

// // //   // Ensure the color is unique and not already used
// // //   while (usedColors.has(color)) {
// // //     color = getRandomColor();
// // //   }

// // //   usedColors.add(color);
// // //   return color;
// // // };

// // // // // Function to calculate the color distance (Euclidean distance in RGB space)
// // // // const getColorDistance = (color1: string, color2: string): number => {
// // // //   const hexToRgb = (hex: string) => {
// // // //     const r = parseInt(hex.slice(1, 3), 16);
// // // //     const g = parseInt(hex.slice(3, 5), 16);
// // // //     const b = parseInt(hex.slice(5, 7), 16);
// // // //     return { r, g, b };
// // // //   };

// // // //   const rgb1 = hexToRgb(color1);
// // // //   const rgb2 = hexToRgb(color2);

// // // //   const rDiff = rgb1.r - rgb2.r;
// // // //   const gDiff = rgb1.g - rgb2.g;
// // // //   const bDiff = rgb1.b - rgb2.b;

// // // //   // Euclidean distance between two RGB colors
// // // //   return Math.sqrt(rDiff * rDiff + gDiff * gDiff + bDiff * bDiff);
// // // // };

// // // // // Adjusted getUniqueColor function that ensures a minimum color interval
// // // // const getUniqueColor = (): string => {
// // // //   let color = getRandomColor();

// // // //   // Define a minimum color distance (e.g., 150 out of 255)
// // // //   const MIN_COLOR_DISTANCE = 150;

// // // //   // Ensure the color is unique and has a significant difference from all previously used colors
// // // //   while (usedColors.size > 0 && [...usedColors].some((usedColor) => getColorDistance(usedColor, color) < MIN_COLOR_DISTANCE)) {
// // // //     color = getRandomColor();
// // // //   }

// // // //   usedColors.add(color);
// // // //   return color;
// // // // };

// // // // // Example usage
// // // // console.log(getUniqueColor()); // Will generate a color that's not only unique but also sufficiently different from the existing ones

// // const goldenRatioConjugate = 0.61803398875;
// // let hue = Math.random(); // Random initial hue

// // // Generate evenly spaced HSL colors using golden ratio
// // const getUniqueColor = (): string => {
// //   hue += goldenRatioConjugate;
// //   hue %= 1;

// //   const h = Math.floor(hue * 360);
// //   const s = 70;  // saturation %
// //   const l = 55;  // lightness %

// //   return hslToHex(h, s, l);
// // };

// // const hslToHex = (h: number, s: number, l: number): string => {
// //   s /= 100;
// //   l /= 100;

// //   const k = (n: number) => (n + h / 30) % 12;
// //   const a = s * Math.min(l, 1 - l);
// //   const f = (n: number) =>
// //     l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));

// //   const toHex = (x: number) =>
// //     Math.round(x * 255)
// //       .toString(16)
// //       .padStart(2, '0');

// //   return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`;
// // };


// // const darkenColor = (hex: string, percent = 15): string => { // Increase percent → darker color, Decrease percent → subtler darkening
// //   const num = parseInt(hex.slice(1), 16);
// //   const amt = Math.round(2.55 * percent);
// //   const R = (num >> 16) - amt;
// //   const G = ((num >> 8) & 0x00FF) - amt;
// //   const B = (num & 0x0000FF) - amt;

// //   const clamp = (val: number) => Math.max(0, Math.min(255, val));

// //   return `#${(clamp(R) << 16 | clamp(G) << 8 | clamp(B)).toString(16).padStart(6, '0')}`;
// // };


// //   useEffect(() => {
// //     if (typeof window === 'undefined') return;

// //     const map = L.map('map').setView(
// //       [coordinates[0]?.lat || 51.505, coordinates[0]?.lng || -0.09],
// //       13
// //     );

// //     L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
// //       attribution:
// //         '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
// //     }).addTo(map);

// //     coordinates.forEach((coord) => {
// //       const markerId = `marker-btn-${coord.no}`;
// //       const color = getUniqueColor();
// //       const darkerColor = darkenColor(color, 15);
// //       const styleId = `marker-style-${coord.no}`;
      
// //       // Avoid duplicating styles
// //       if (!document.getElementById(styleId)) {
// //         const style = document.createElement('style');
// //         style.id = styleId;
// //         style.innerHTML = `
// //           #marker-btn-${coord.no} {
// //             background-color: ${color} !important;
// //           }
      
// //           #marker-btn-${coord.no}:hover {
// //             background-color: ${darkerColor} !important;
// //           }
// //         `;
// //         document.head.appendChild(style);
// //       }

// //       const customIcon = L.divIcon({
// //         className: 'custom-marker',
// //         html: `<button id="${markerId}" class="marker-btn">${coord.no}</button>`,
// //         iconSize: [30, 30],
// //         iconAnchor: [15, 15],
// //       });

// //       const marker = L.marker([coord.lat, coord.lng], { icon: customIcon }).addTo(map);
// //       // marker.bindPopup(`<b>${coord.shopName}</b><br>${coord.address}`);
// //       // marker.bindPopup(`
// //       //   <div style="text-align: center;">
// //       //     <b>${coord.shopName}</b><br/>
// //       //     ${coord.address}<br/>

// //       //     </div>
// //       // `);

// //       const imageUrl = coord.storePhoto
// //   ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/${coord.storePhoto}`
// //   : null;

// // const popupContent = `
// //   <div style="text-align: center;">
    
// //     ${
// //       imageUrl
// //         ? `<img 
// //             src="${imageUrl}" 
// //             alt="Store photo" 
// //             style="width: 100%; height: auto; max-width: 200px; object-fit: cover; margin-top: 8px; border-radius: 8px;" 
// //           />`
// //         : ''
// //     }<br/>
// //     <b>${coord.shopName}</b><br/>
// //     ${coord.address}<br/>
// //   </div>
// // `;

// // marker.bindPopup(popupContent);


// //       // Delay to ensure button is rendered before attaching the event
// //       setTimeout(() => {
// //         const btn = document.getElementById(markerId);
// //         if (btn) {
// //           btn.addEventListener('click', async (e) => {
// //             e.stopPropagation(); // Avoid bubbling up to Leaflet map
// //             marker.openPopup();//open bindPopup

// //             // console.log("testnumber", coord.no);
// //             // try {
// //             //   const fetchedDetail = await LoadMapDetail(coord.no);
// //             //   console.log("testdetail",fetchedDetail)
// //             //   if (fetchedDetail.data){
// //             //     setData(fetchedDetail.data);
// //             //     setPanelOpen(true); // Open the panel when a marker is clicked

// //             //   }
             
// //             // } catch (err) {
// //             //   console.error("Failed to load map detail:", err);
// //             //   toast.error("Failed to load map detail", {
// //             //     style: { backgroundColor: '#FF4D4D', color: 'white' },
// //             //     position: 'top-center',
// //             //     duration: 5000,
// //             //   });
// //             // }
// //           });
// //         }
// //       }, 0);
// //     });

// //     return () => {
// //       map.remove();
// //     };
// //   }, [coordinates]);

// //   const handleClosePanel = () => {
// //     setPanelOpen(false); // Close the panel
// //   };

// //   if (isLoadingMap) {
// //     return (
// //       <div className="bg-white w-full p-5 rounded-2xl h-full  flex justify-center items-center">

// //         <Loader2 className="mr-2 h-12 w-12 animate-spin" />

// //         <div className="text-2xl text-gray-500">Loading...</div>
// //       </div>
// //     ); // Display loading message or spinner while fetching userroles
// //   }

// //   return (
// //     <div className="bg-white w-full p-5 rounded-2xl h-full relative">
// //       <div id="map" style={{ width: '100%', height: '100%' , zIndex: 35, }}></div>

// //       {/* Sliding Panel */}
// //       <div
// //         className={`map-panel ${isPanelOpen ? 'open' : ''}`}
// //         style={{
// //           width: isPanelOpen ? '50%' : '0', // Adjust width based on panel open state
// //           height: '100%',
// //           // display: isPanelOpen ? 'block' : 'none', // Hide the panel when it's not open
// //           padding: isPanelOpen ? '20px' : '0', // Hide the panel when it's not open
// //           borderRight: isPanelOpen ? 'solid 2px rgba(0, 0, 0, 1)' : '', // Hide the panel when it's not open


// //         }}
// //       >
// //         <button className="close-btn" onClick={handleClosePanel}>
// //           &times; {/* Close button */}
// //         </button>
// //         {data && (<>
// //         <div className='mt-10'>
// //         <div className="bg-red-900" style={{ width: '290px', height: '150px', position: 'relative', overflow: 'hidden' }}>
// //   <Image
// //     src={
// //       data?.storePhoto
// //         ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/${data.storePhoto}`
// //         : '/placeholder.png'
// //     }
// //     alt="Store photo"
// //     fill
// //     style={{
// //       objectFit: 'cover',
// //       objectPosition: 'center -40px'
// //     }}  />
// // </div>
// // <div className="data-container text-center text-black mt-2 border-b-2 border-black">{data?.shopName}</div>
// // <div className=" text-left mt-2 text-black ">Address: {data?.address}</div>

// // </div>
// //                   </>
// //                 )}
// //       </div>

// //       <style jsx global>{`
// //         .marker-btn {
// //           // background-color: #007bff;
// //           color: white;
// //           border-radius: 50%;
// //           border: none;
// //           width: 40px;
// //           height: 40px;
// //           text-align: center;
// //           font-weight: bold;
// //           cursor: pointer;
// //           font-size: 20px;
// //         }

// //         .marker-btn:hover {
// //           // background-color: #0056b3;
// //         }

// //         .custom-marker {
// //           display: flex;
// //           align-items: center;
// //           justify-content: center;
// //         }

// //         /* Sliding Panel Styles */
// //         .map-panel {
// //           position: absolute;
// //           top: 0;
// //           left: 0;
// //           bottom: 0;
// //           // background-color: rgba(0, 0, 0, 0.75);
// //           background-color: rgba(255, 255, 255, 1);
// //           color: white;
// //           overflow-y: auto;
// //           transition: width 0.3s ease;
// //           box-sizing: border-box;
// //           z-index: 40;
// //         }

// //         .map-panel.open {
// //           width: 50%; /* Panel opens to cover half the map */
// //         }

// //         .close-btn {
// //           background: none;
// //           border: none;
// //           color: black;
// //           font-size: 30px;
// //           position: absolute;
// //           top: 10px;
// //           right: 10px;
// //           cursor: pointer;
// //         }

// //         .close-btn:hover {
// //           color: #ff6f61;
// //         }

// //         .data-container {
// //           font-size: 20px;
// //         }
// //       `}</style>
// //     </div>
// //   );
// // };

// // export default MapComponent;