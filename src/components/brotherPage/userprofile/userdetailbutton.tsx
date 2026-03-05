import React from 'react';

interface UserButtonProps {
  onClick: () => void;
}

const UserButton: React.FC<UserButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} className="ml-4  hover:bg-gray-200 p-2 flex justify-center items-center rounded-full mr-1"
    style={{color: "rgba(31, 65, 115, 1)"}}>
{/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
</svg> */}
<svg width="9" height="6" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.55805 5.94121L0.649414 2.03258L1.95291 0.730011L4.55805 3.33607L7.16319 0.730011L8.46668 2.03258L4.55805 5.94121Z" fill="#1F4173"/>
</svg>

    </button>
  );
};

export default UserButton;
