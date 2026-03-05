'use client';
import React, { useState } from 'react';
import ImageUploader from '../../../input-custom/ImageUploader'; // Ensure this is correct path
import Image from 'next/image';

import { ResellerList,EditResellerList } from '../../ListReseller';
interface EditImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  reseller: EditResellerList;
  setReseller: React.Dispatch<React.SetStateAction<EditResellerList | null>>;
  onSave: () => void;
  onCancel: () => void;

  errorMessage: string;
}

const EditImageModal: React.FC<EditImageModalProps> = ({
  isOpen,
  onClose,
  reseller,
  setReseller,
  onSave,
  onCancel,
  errorMessage,
}) => {
  const [validationError, setValidationError] = useState('');

  const handleFileUpload = (file: File) => {
    if (file) {
      // Set the uploaded file in the reseller state
      setReseller(prev => {
        if (!prev) return null;
        return {
          ...prev,
          storePhoto: file,
        };
      });
      setValidationError('');
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    // If no image selected (or default File)
    if (!reseller || !reseller.storePhoto || (reseller.storePhoto as any).size === 0) {
      setValidationError('Image is required');
      return;
    }

    setValidationError('');
    onSave(); // Call save handler from parent
  };

  const getImageSrc = (storePhoto: string | File): string => {
    if (typeof storePhoto === 'string') {
      return storePhoto; // it's already a URL
    } else if (storePhoto instanceof File) {
      return URL.createObjectURL(storePhoto); // create temporary object URL
    }
    return '';
  };
  

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex justify-center items-center backdrop-blur-xs z-60"
      style={{ backgroundColor: 'rgba(211, 211, 211, 0.5)' }}
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-1/2"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold w-full pb-4 px-2 border-b border-neutral-200">Edit Image</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Preview */}
          <div className='flex items-center justify-center gap-24'>
          <div>
            <label className="block text-sm font-medium mb-1">Current Image Preview</label>
            <Image
              // src={reseller.image}
              // src={getImageSrc(reseller.storePhoto)}
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${reseller.storePhoto}`} // Assuming 'image' is a URL or base64 string. Adjust accordingly if it’s different.

              alt="Current reseller Image"
              width={185}
              height={185}
              className="object-cover rounded border"
            />
          </div>

          {/* Upload */}
          <div>
            <label className="block text-sm font-medium mb-1">Upload New Image</label>
            <ImageUploader onFileSelect={handleFileUpload} />
            {(validationError || errorMessage) && (
              <p className="text-red-500 text-sm mt-1">
                {validationError || errorMessage}
              </p>
            )}
          </div>
</div>
          {/* Buttons */}
          <div className="flex justify-center space-x-2 mt-4">
            <button
              type="button"
              onClick={onCancel}
              className="bg-neutral-400 border-2 text-white hover:bg-neutral-500 h-10 w-20 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white hover:bg-blue-600 h-10 w-30 rounded-md"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditImageModal;
