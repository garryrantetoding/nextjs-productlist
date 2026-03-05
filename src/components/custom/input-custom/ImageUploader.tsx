// // components/FileUploader.tsx
// import { useRef, useState } from 'react';

// export default function FileUploader() {
//   const inputRef = useRef<HTMLInputElement>(null);
//   const [fileName, setFileName] = useState<string | null>(null);

//   const handleClick = () => {
//     inputRef.current?.click(); // triggers file input
//   };


//   return (
//     <div
//       onClick={handleClick}
//       className="cursor-pointer border border-dashed border-gray-300 rounded-md p-6 flex flex-col items-center justify-center text-center hover:shadow-md transition"
//     >
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         className="h-6 w-6 text-gray-500 mb-2"
//         fill="none"
//         viewBox="0 0 24 24"
//         stroke="currentColor"
//         strokeWidth={2}
//       >
//         <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v8m0 0l-4-4m4 4l4-4m0-4a4 4 0 10-8 0" />
//       </svg>
//       <p className="text-blue-500 font-medium">choose your file</p>
//       <p className="text-gray-500 text-sm">for upload<br />JPG, PNG or SVG</p>
//       <input
//         type="file"
//         accept=".jpg,.jpeg,.png,.svg"
//         ref={inputRef}
//         onChange={handleFileChange}
//         hidden
//       />
//       {fileName && (
//         <p className="mt-2 text-xs text-gray-400">Selected: {fileName}</p>
//       )}
//     </div>
//   );
// }

import { useRef, useState } from 'react';

interface ImageUploaderProps {
  onFileSelect: (file: File) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onFileSelect }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null); //  Preview image state

  const handleClick = () => {
    inputRef.current?.click(); // triggers file input
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setPreviewUrl(URL.createObjectURL(file)); // Generate preview
      onFileSelect(file);  // Pass the file to parent
    }
  };

  return (
    <div
      className="p-6 flex flex-col items-center justify-center text-center "
      style={{backgroundColor:'rgba(248, 249, 251, 1)',
        borderRadius:'8px',
        border:'1px dashed rgba(229, 229, 231, 1)',
        width:200,
        height:185,
      }}
    >
        <div
        onClick={handleClick}
        className="cursor-pointer  bg-white rounded-full p-2 flex flex-col items-center justify-center text-center hover:shadow-md transition"
  style={{border:'1px solid rgba(229, 229, 231, 1)',
    width: 36,
    height:36,
    color: 'rgba(50, 53, 57, 1)'
  }}
        >
     <svg  width="100%"
  height="100%"
  viewBox="0 0 18 18"  style={{ display: 'block',fill: 'rgba(50, 53, 57, 0.5)'  }} className='z-100' xmlns="http://www.w3.org/2000/svg">
<path d="M8.165 12.2396C8.165 12.7008 8.53884 13.0746 9 13.0746C9.46116 13.0746 9.835 12.7008 9.835 12.2396H8.165ZM9.835 3.07295C9.835 2.6118 9.46116 2.23795 9 2.23795C8.53884 2.23795 8.165 2.6118 8.165 3.07295L9.835 3.07295ZM11.7429 5.33005C12.069 5.65614 12.5977 5.65614 12.9238 5.33005C13.2499 5.00397 13.2499 4.47527 12.9238 4.14919L11.7429 5.33005ZM9.58926 1.99554L8.99882 2.58598L9.58926 1.99554ZM8.41074 1.99554L9.00118 2.58598L9.00118 2.58598L8.41074 1.99554ZM5.07623 4.14919C4.75014 4.47527 4.75014 5.00397 5.07623 5.33005C5.40232 5.65614 5.93101 5.65614 6.2571 5.33005L5.07623 4.14919ZM2.335 12.2396C2.335 11.7785 1.96116 11.4046 1.5 11.4046C1.03884 11.4046 0.665 11.7785 0.665 12.2396H2.335ZM17.335 12.2396C17.335 11.7785 16.9612 11.4046 16.5 11.4046C16.0388 11.4046 15.665 11.7785 15.665 12.2396H17.335ZM15.135 16.1338L14.7559 15.3898H14.7559L15.135 16.1338ZM16.2275 15.0413L16.9715 15.4203V15.4203L16.2275 15.0413ZM1.77248 15.0413L1.02849 15.4203L1.77248 15.0413ZM2.86502 16.1338L2.48594 16.8778H2.48594L2.86502 16.1338ZM9.835 12.2396L9.835 3.07295L8.165 3.07295L8.165 12.2396H9.835ZM12.9238 4.14919L10.1797 1.40511L8.99882 2.58598L11.7429 5.33005L12.9238 4.14919ZM7.82031 1.40511L5.07623 4.14919L6.2571 5.33005L9.00118 2.58598L7.82031 1.40511ZM10.1797 1.40511C9.52816 0.753583 8.47183 0.753584 7.82031 1.40511L9.00118 2.58598C9.00211 2.58505 9.00157 2.58573 9.0002 2.58628C8.9994 2.58661 8.99936 2.58646 9 2.58646C9.00064 2.58646 9.00061 2.58661 8.9998 2.58628C8.99843 2.58573 8.99789 2.58505 8.99882 2.58598L10.1797 1.40511ZM0.665 12.2396V12.4063H2.335V12.2396H0.665ZM5.5 17.2413H12.5V15.5713H5.5V17.2413ZM17.335 12.4063V12.2396H15.665V12.4063H17.335ZM12.5 17.2413C13.1863 17.2413 13.7512 17.2419 14.21 17.2045C14.6785 17.1662 15.1093 17.084 15.5141 16.8778L14.7559 15.3898C14.6258 15.4561 14.4392 15.5102 14.074 15.54C13.699 15.5706 13.2138 15.5713 12.5 15.5713V17.2413ZM15.665 12.4063C15.665 13.1201 15.6644 13.6053 15.6337 13.9803C15.6039 14.3455 15.5498 14.5321 15.4835 14.6622L16.9715 15.4203C17.1777 15.0156 17.2599 14.5848 17.2982 14.1163C17.3356 13.6575 17.335 13.0926 17.335 12.4063H15.665ZM15.5141 16.8778C16.1416 16.5581 16.6518 16.0479 16.9715 15.4203L15.4835 14.6622C15.3239 14.9755 15.0692 15.2302 14.7559 15.3898L15.5141 16.8778ZM0.665 12.4063C0.665 13.0926 0.664351 13.6575 0.701834 14.1163C0.740113 14.5848 0.822278 15.0156 1.02849 15.4203L2.51647 14.6622C2.45021 14.5321 2.39613 14.3455 2.36629 13.9803C2.33565 13.6053 2.335 13.1201 2.335 12.4063H0.665ZM5.5 15.5713C4.78616 15.5713 4.30099 15.5706 3.926 15.54C3.56076 15.5102 3.37416 15.4561 3.24411 15.3898L2.48594 16.8778C2.89066 17.084 3.32149 17.1662 3.79001 17.2045C4.24878 17.2419 4.81371 17.2413 5.5 17.2413V15.5713ZM1.02849 15.4203C1.34823 16.0479 1.85842 16.5581 2.48594 16.8778L3.24411 15.3898C2.93082 15.2302 2.6761 14.9755 2.51647 14.6622L1.02849 15.4203Z" fill="#323539"/>
</svg>
</div>
      <p className="text-blue-500 font-medium">choose your file</p>
      <p className="text-gray-500 text-sm">for upload<br />JPG, PNG or SVG</p>
      <input
        type="file"
        accept=".jpg,.jpeg,.png,.svg"
        ref={inputRef}
        onChange={handleFileChange}
        hidden
      />
      {fileName && (
        <div className="mt-2 flex items-center space-x-2">
        <p className="text-xs text-gray-400">Selected: {fileName}</p>
        {previewUrl && (
          <img
            src={previewUrl}
            alt="preview"
            className="w-6 h-6 rounded object-cover"
          />
        )}
      </div>
      )}
    </div>
  );
};

export default ImageUploader;

