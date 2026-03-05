// // // import { useState, useEffect } from 'react';

// // // interface DateRangePickerProps {
// // //   onDateChange: (startDate: string, endDate: string) => void;
// // // }

// // // function DateRangePicker({ onDateChange }: DateRangePickerProps) {
// // //   const [startDate, setStartDate] = useState('');
// // //   const [endDate, setEndDate] = useState('');

// // //   // Call parent callback whenever either date changes
// // //   useEffect(() => {
// // //     onDateChange(startDate, endDate);
// // //   }, [startDate, endDate, onDateChange]);

// // //   return (
// // //     <div className="flex gap-4 items-center">
// // //       <div>
// // //         <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
// // //           Start Date
// // //         </label>
// // //         <input
// // //           type="date"
// // //           id="startDate"
// // //           value={startDate}
// // //           onChange={(e) => setStartDate(e.target.value)}
// // //           className="border border-gray-300 rounded-md px-2 py-1"
// // //         />
// // //       </div>

// // //       <div>
// // //         <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
// // //           End Date
// // //         </label>
// // //         <input
// // //           type="date"
// // //           id="endDate"
// // //           value={endDate}
// // //           onChange={(e) => setEndDate(e.target.value)}
// // //           className="border border-gray-300 rounded-md px-2 py-1"
// // //         />
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default DateRangePicker;

// // import { useState, useEffect } from 'react';

// // interface DateRangePickerProps {
// //   onDateChange: (startDate: string, endDate: string) => void;
// // }

// // const DateRangePicker: React.FC<DateRangePickerProps> = ({ onDateChange }) => {
// //   const [rangeValue, setRangeValue] = useState(''); // Combined string value

// //   // Extract start and end dates when input changes
// //   useEffect(() => {
// //     const [start, end] = rangeValue.split(' to ').map(s => s.trim());
// //     if (start && end) {
// //       onDateChange(start, end);
// //     }
// //   }, [rangeValue, onDateChange]);

// //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     setRangeValue(e.target.value);
// //   };

// //   return (
// //     <div>
// //       <label htmlFor="dateRange" className="block text-sm font-medium text-gray-700 mb-1">
// //         Date Range
// //       </label>
// //       <input
// //         type="text"
// //         id="dateRange"
// //         value={rangeValue}
// //         onChange={handleChange}
// //         placeholder="YYYY-MM-DD to YYYY-MM-DD"
// //         className="border border-gray-300 rounded-md px-2 py-1 w-64"
// //       />
// //     </div>
// //   );
// // };

// // export default DateRangePicker;

// 'use client'

// import { useState } from 'react'
// import DatePicker from 'react-datepicker'
// import 'react-datepicker/dist/react-datepicker.css'
// import axios from 'axios'

// export default function DateRangeSelector() {
//   const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null])
//   const [startDate, endDate] = dateRange

//   const sendDateRange = async () => {
//     if (!startDate || !endDate) return

//     try {
//       const response = await axios.post('/api/submit-date-range', {
//         startDate: startDate.toISOString(),
//         endDate: endDate.toISOString(),
//       })
//       console.log('Server Response:', response.data)
//     } catch (error) {
//       console.error('Error sending date range:', error)
//     }
//   }

//   return (
//     <div className="flex flex-col items-start gap-4">
//       <DatePicker
//         selectsRange
//         startDate={startDate}
//         endDate={endDate}
//         onChange={(update: [Date | null, Date | null]) => {
//           setDateRange(update)
//         }}
//         isClearable
//         placeholderText="Select date range"
//       />
//       <button
//         onClick={sendDateRange}
//         className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
//       >
//         Send Date Range
//       </button>
//     </div>
//   )
// }
'use client'

import { useState, useEffect } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

interface DateRangeSelectorProps {
  onDateChange: (startDate: Date | null, endDate: Date | null) => void
}

export default function DateRangeSelector({ onDateChange }: DateRangeSelectorProps) {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null])
  const [startDate, endDate] = dateRange

  useEffect(() => {
    // Send date range to parent whenever it's updated
    // onDateChange(startDate, endDate)
    const normalizeToUTC = (date: Date | null): Date | null => {
      if (!date) return null
      return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
    }
  
    // Normalize both dates before sending
    onDateChange(normalizeToUTC(startDate), normalizeToUTC(endDate))
  }, [startDate, endDate, onDateChange])

  return (
    <div className="flex flex-col items-start z-48 gap-4">
      <DatePicker
        selectsRange
        startDate={startDate}
        endDate={endDate}
        onChange={(update: [Date | null, Date | null]) => {
          setDateRange(update)
        }}
        isClearable
        placeholderText="Select date range"
        className="border px-2 bg-white w-55 py-2 rounded-md"
      />
    </div>
  )
}
