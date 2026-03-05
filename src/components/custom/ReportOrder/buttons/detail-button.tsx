import React from 'react';

// Define PopupButtonProps to accept an onClick handler
interface PopupButtonProps {
  onClick: () => void;
}

const PopupButton: React.FC<PopupButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} className="border-2 border-blue-500  p-2 rounded-xl w-8/10"
     style={{
      width: 31.91,
      height: 34.77,
      backgroundColor: 'rgba(212, 235, 255, 1)', // light blue
      color: 'rgba(43, 103, 255, 1)',           // blue text
      // border: '1px solid #93c5fd', // border light blue
      borderRadius: '6.95px',         // rounded corners
      padding: '1.46px',
      // transition: 'all 0.2s ease-in-out',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',     // vertical alignment
      justifyContent: 'center', // horizontal alignment
      //   /* For Firefox */
    //   scrollbarWidth: 'none', 

    //   /* For Chrome, Safari, and Opera */
    //   WebkitOverflowScrolling: 'touch', 
    }}
    
    >
       <div className=" flex items-center">
       <svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.94932 15.9305C1.55089 15.9305 1.20981 15.7886 0.926083 15.5049C0.642353 15.2211 0.500488 14.8801 0.500488 14.4816C0.500488 14.0832 0.642353 13.7421 0.926083 13.4584C1.20981 13.1747 1.55089 13.0328 1.94932 13.0328H13.54C13.9384 13.0328 14.2795 13.1747 14.5632 13.4584C14.847 13.7421 14.9888 14.0832 14.9888 14.4816C14.9888 14.8801 14.847 15.2211 14.5632 15.5049C14.2795 15.7886 13.9384 15.9305 13.54 15.9305H1.94932ZM2.67374 11.584C2.46849 11.584 2.29644 11.5145 2.15759 11.3757C2.01875 11.2369 1.94932 11.0648 1.94932 10.8596V9.17528C1.94932 9.07869 1.96743 8.98512 2.00365 8.89457C2.03987 8.80402 2.09421 8.72252 2.16665 8.65008L8.5053 2.31143L11.2219 5.02799L4.88321 11.3666C4.81077 11.4391 4.72927 11.4934 4.63872 11.5296C4.54817 11.5659 4.4546 11.584 4.35801 11.584H2.67374ZM12.0368 4.23113L9.32027 1.51457L10.6242 0.210616C10.757 0.0657324 10.9261 -0.00369096 11.1313 0.00234585C11.3366 0.00838266 11.5056 0.077806 11.6384 0.210616L13.3408 1.913C13.4736 2.04581 13.54 2.21182 13.54 2.41103C13.54 2.61025 13.4736 2.7823 13.3408 2.92718L12.0368 4.23113Z" fill="#2B67FF"/>
</svg>


 </div>
    </button>
  );
};

export default PopupButton;
