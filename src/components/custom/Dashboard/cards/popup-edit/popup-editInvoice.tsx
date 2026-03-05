'use client';
import React, { useState } from 'react';
import ImageUploader from '../../../input-custom/ImageUploader'; // Ensure this is correct path
import Image from 'next/image';
import PDFUploader from '@/components/custom/input-custom/PDFUploader';

import { EditReportOrderList } from '../../ListBestSeller';


interface EditInvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportOrder: EditReportOrderList;
  setReportOrder: React.Dispatch<React.SetStateAction<EditReportOrderList | null>>;
  onSave: () => void;
  onCancel: () => void;

  errorMessage: string;
}

const EditInvoiceModal: React.FC<EditInvoiceModalProps> = ({
  isOpen,
  onClose,
  reportOrder,
  setReportOrder,
  onSave,
  onCancel,
  errorMessage,
}) => {
  const [validationError, setValidationError] = useState('');

  const handleFileUpload = (file: File) => {
    if (file) {
      // Set the uploaded file in the reportOrder state
      setReportOrder(prev => {
        if (!prev) return null;
        return {
          ...prev,
          invoice: file,
        };
      });
      setValidationError('');
    }
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    // If no invoice selected (or default File)
    if (!reportOrder || !reportOrder.invoice || (reportOrder.invoice as any).size === 0) {
      setValidationError('Image is required');
      return;
    }

    setValidationError('');
    onSave(); // Call save handler from parent
  };

  const getImageSrc = (invoice: string | File): string => {
    if (typeof invoice === 'string') {
      return invoice; // it's already a URL
    } else if (invoice instanceof File) {
      return URL.createObjectURL(invoice); // create temporary object URL
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
          <h2 className="text-xl font-semibold w-full pb-4 px-2 border-b border-neutral-200">Edit Invoice</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Preview */}
          <div className='flex items-center justify-center gap-24'>
            {/* <div>
              <label className="block text-sm font-medium mb-1">Current Invoice Preview</label>
              {/* <Image
              // src={reportOrder.invoice}
              src={getImageSrc(reportOrder.invoice)}
              alt="Current reportOrder Image"
              width={185}
              height={185}
              className="object-cover rounded border"
            /> */}
              {/* <p>{reportOrder.invoice.name}
              </p>
            </div> */} 
            <div>
  <label className="block text-sm font-medium mb-1">Current Invoice Preview</label>

  {/* Show the file name */}
  {/* <p className="text-sm text-gray-700 mb-2">
    {typeof reportOrder.invoice === 'string'
      ? reportOrder.invoice.split('/').pop()
      : reportOrder.invoice?.name}
  </p> */}
  <p className="text-sm text-gray-700 mb-2">
  {reportOrder.invoice?.name}
</p>


  {/* Open in new tab button */}
  {reportOrder.invoice && (
    <a
      href={getImageSrc(reportOrder.invoice)}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block mt-2 text-blue-600 hover:underline text-sm"
    >
      Open File in New Tab
    </a>
  )}
</div>

            {/* Upload */}
            <div>
              <label className="block text-sm font-medium mb-1">Upload New Invoice</label>
              <PDFUploader onFileSelect={handleFileUpload} />
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

export default EditInvoiceModal;
