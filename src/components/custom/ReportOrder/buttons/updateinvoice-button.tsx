import React from 'react';

// Define PopupButtonProps to accept an onClick handler
interface UpdateImageButtonProps {
  onClick: () => void;
}

const UpdateImageButton: React.FC<UpdateImageButtonProps> = ({ onClick }) => {
  return (
    
    <button onClick={onClick} className="border-2 border-green-500 bg-white p-2 rounded-xl w-8/10"
    style={{
     width: 31.91,
     height: 34.77,
     backgroundColor: 'rgba(218, 252, 203, 1)', // light blue
     color: 'rgba(46, 160, 13, 1)',           // blue text
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
      <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.4436 1.4436V4.34161C7.4436 4.53377 7.51993 4.71805 7.65581 4.85392C7.79168 4.98979 7.97596 5.06612 8.16811 5.06612H11.0661" stroke="#2EA00D" strokeWidth="1.64116" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9.61713 14.4847H2.3721C1.9878 14.4847 1.61924 14.3321 1.3475 14.0603C1.07576 13.7886 0.923096 13.42 0.923096 13.0357V2.8927C0.923096 2.5084 1.07576 2.13984 1.3475 1.8681C1.61924 1.59636 1.9878 1.4437 2.3721 1.4437H7.44362L11.0661 5.06621V13.0357C11.0661 13.42 10.9135 13.7886 10.6417 14.0603C10.37 14.3321 10.0014 14.4847 9.61713 14.4847Z" stroke="#2EA00D" strokeWidth="1.64116" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M5.27002 9.41304H5.99452V12.3111H6.71903M5.99452 7.23953H6.00177" stroke="#2EA00D" strokeWidth="1.64116" strokeLinecap="round" strokeLinejoin="round" />
        </svg>


</div>
   </button>


  );
};

export default UpdateImageButton;
