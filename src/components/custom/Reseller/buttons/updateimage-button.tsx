import React from 'react';

// Define PopupButtonProps to accept an onClick handler
interface UpdateImageButtonProps {
  onClick: () => void;
}

const UpdateImageButton: React.FC<UpdateImageButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick} className=""
     style={{

backgroundColor: 'rgba(225, 61, 58, 1)',
      width: 114,
height: 34.1875,
// gap: 4.24px;
borderRadius: '8.47px',
padding: '10.59px',
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
       <span
  style={{
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 400,
    fontSize: '12.22px',
    lineHeight: '105%',
    letterSpacing: '0',
    textAlign: 'center',
    color: 'rgba(231, 244, 255, 1)',

    width: 93,
    height: 13,
  }}
>Update Image</span>



    </button>
  );
};

export default UpdateImageButton;
