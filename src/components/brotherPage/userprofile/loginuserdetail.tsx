"use client";
import React, { useState, useEffect } from 'react';
import { LoadDetail } from "@/data/services/brother/productlist-service";
import { Role } from '@/data/services/enum/enum';
import UserButton from './userdetailbutton'; // Import the button component
import UserDetailMenu from './userdetailmenu';
import { getAccessTokenFromCookies } from '@/data/services/token/get-token';
import { getUserFromToken } from '@/lib/auth';
interface TopbarDetailProps {
  name: string;
  email: string;
  roles: string;
  password: string;
}

interface DecodeProps {
  id: string;
  email: string;
  name: string;
  roles: string; // or 'role', depending on your backend
  iat: number;
  exp: number;
}


const TopbarDetail: React.FC = () => {
  // const [data, setData] = useState<TopbarDetailProps | null>(null); 
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [data, setData] = useState<DecodeProps | null>(null); 

  // Fetch data from backend on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const fetchedData = await LoadDetail();
        const token = await getAccessTokenFromCookies();
          const user = token ? getUserFromToken(token) : null;
          setData(user); // Set the fetched data to state


        // console.log("Fetched data:", fetchedData); // Add this log to check the data
        // setData(fetchedData); // Set the fetched data to state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run this effect only once when the component mounts

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownVisible(prev => !prev);
  };

  if (!data) {
    return <div>Loading...</div>; // Optional: show loading state while data is being fetched
  }

  return (
    <div className="flex items-center space-x-4 relative  rounded-md p-2">
      <span
  style={{
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '42px',
    height: '42px',
    borderRadius: '50%',
    backgroundColor: 'rgba(13, 46, 160, 1)', // optional: light gray background
    color: '#ffffff', // text color
    fontWeight: 'bold',
    fontSize: '18px',
  }}
>
  {data?.name?.[0]?.toUpperCase()}
</span>

      <div className='mr-12'>
        <div className='font-bold'>{data.name}</div>
        <div>{data.roles}</div>
      </div>

      {/* Button to toggle the dropdown */}
      <UserButton onClick={toggleDropdown} />

      {/* Dropdown Component */}
      <UserDetailMenu visible={dropdownVisible} onClose={() => setDropdownVisible(false)} />
    </div>
  );
};

export default TopbarDetail;
