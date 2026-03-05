import { useRef, useState } from 'react';

interface PDFUploaderProps {
  onFileSelect: (file: File) => void;
}

const PDFUploader: React.FC<PDFUploaderProps> = ({ onFileSelect }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleClick = () => {
    inputRef.current?.click(); // Trigger file input
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("testfile",e.target.files);
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      console.log('File selected:', file);

      onFileSelect(file);  // Pass the file to parent
    }
  };

  return (
    <div
      className="p-6 flex flex-col items-center justify-center text-center"
      style={{
        backgroundColor: 'rgba(248, 249, 251, 1)',
        borderRadius: '8px',
        border: '1px dashed rgba(229, 229, 231, 1)',
        width: 200,
        height: 185,
      }}
    >
      <div
        onClick={handleClick}
        className="cursor-pointer bg-white rounded-full p-2 flex flex-col items-center justify-center text-center hover:shadow-md transition"
        style={{
          border: '1px solid rgba(229, 229, 231, 1)',
          width: 36,
          height: 36,
          color: 'rgba(50, 53, 57, 1)',
        }}
      >
        {/* You can replace this SVG with a PDF icon if you want */}
        <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 2C5.44772 2 5 2.44772 5 3V21C5 21.5523 5.44772 22 6 22H18C18.5523 22 19 21.5523 19 21V8.82843C19 8.29799 18.7893 7.78929 18.4142 7.41421L13.5858 2.58579C13.2107 2.21071 12.702 2 12.1716 2H6Z" stroke="#323539" strokeWidth="2" />
          <path d="M13 2V7C13 7.55228 13.4477 8 14 8H19" stroke="#323539" strokeWidth="2"/>
        </svg>
      </div>
      <p className="text-blue-500 font-medium">choose your file</p>
      <p className="text-gray-500 text-sm">for upload<br />PDF only</p>
      <input
        type="file"
        accept=".pdf"
        ref={inputRef}
        onChange={handleFileChange}
        hidden
      />
      {fileName && (
        <div className="mt-2 flex items-center space-x-2">
          <p className="text-xs text-gray-400">Selected: {fileName}</p>
        </div>
      )}
    </div>
  );
};

export default PDFUploader;
