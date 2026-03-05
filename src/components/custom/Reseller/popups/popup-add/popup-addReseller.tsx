
import React, { useState, useEffect } from 'react';
import { z } from 'zod';
import TiptapEditor from '../../../input-custom/tiptapeditor';
import ImageUploader from '../../../input-custom/ImageUploader';

// Zod validation schema


export const AddResellerSchema = z.object({
  storePhoto: z.instanceof(File),
  shopName: z.string().min(1, 'Shop name is required'),
  owner: z.string().min(1, 'Owner is required'),
  roles: z.string().min(1, 'Roles are required'),
  email: z.string().email('Invalid email').min(1, 'Email is required'),
  phone: z
    .string()
    .regex(/^\d+$/, 'Phone must contain only numbers')
    .min(1, 'Phone number is required'),
  address1: z.string().min(1, 'Address line 1 is required'),
  address2: z.string().min(1, 'Address line 2 is required'),
  city: z.string().min(1, 'City is required'),
  printerA3: z.boolean(),
  printerA4: z.boolean(),
});



interface ListReseller {
  storePhoto: File;//image
  shopName: string;//productname
  owner: string;//category
  roles: string;//customerprice
  email: string;//resellerprice
  phone: string;//description
  address1: string;//videotutorial
  address2: string;//description
  city: string;//videotutorial
  printerA3: boolean;//brochure
  printerA4: boolean;//brochure
}

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProductList: (

    storePhoto: File,//image
    shopName: string,//productname
    owner: string,//category
    roles: string,//customerprice
    email: string,//resellerprice
    phone: string,//description
    address1: string,//videotutorial
    address2: string,//description
    city: string,//videotutorial
    printerA3: boolean,//brochure
    printerA4: boolean,//brochure

  ) => void;
  newProductList: ListReseller;
  setNewProductList: React.Dispatch<React.SetStateAction<ListReseller>>;
  setDiscardConfirmationOpen: React.Dispatch<React.SetStateAction<boolean>>;
  backendError: Record<keyof ListReseller, string>;
  setBackendError: React.Dispatch<React.SetStateAction<Record<keyof ListReseller, string>>>;
}

const ResellerListModal: React.FC<UserModalProps> = ({
  isOpen,
  onClose,
  onAddProductList,
  newProductList,
  setNewProductList,
  setDiscardConfirmationOpen,
  backendError,
  setBackendError,
}) => {
  const [errors, setErrors] = useState<Record<keyof ListReseller, string>>({
    storePhoto: '',
    shopName: '',
    owner: '',
    roles: '',
    email: '',
    phone: '',
    address1: '',
    address2: '',
    city: '',
    printerA3: '',
    printerA4: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewProductList(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setErrors({
      storePhoto: '',
      shopName: '',
      owner: '',
      roles: '',
      email: '',
      phone: '',
      address1: '',
      address2: '',
      city: '',
      printerA3: '',
      printerA4: '',
    });

    setBackendError({
      storePhoto: '',
      shopName: '',
      owner: '',
      roles: '',
      email: '',
      phone: '',
      address1: '',
      address2: '',
      city: '',
      printerA3: '',
      printerA4: '',
    });

    const result = AddResellerSchema.safeParse(newProductList);

    if (!result.success) {
      const formattedErrors = result.error.format();

      const validationErrors: Record<keyof ListReseller, string> = {

        storePhoto: formattedErrors.storePhoto?._errors.join(', ') || '',

        shopName: formattedErrors.shopName?._errors.join(', ') || '',
        owner: formattedErrors.owner?._errors.join(', ') || '',
        roles: formattedErrors.roles?._errors.join(', ') || '',
        email: formattedErrors.email?._errors.join(', ') || '',
        phone: formattedErrors.phone?._errors.join(', ') || '',
        address1: formattedErrors.address1?._errors.join(', ') || '',
        address2: formattedErrors.address2?._errors.join(', ') || '',
        city: formattedErrors.city?._errors.join(', ') || '',
        printerA3: formattedErrors.printerA3?._errors.join(', ') || '',
        printerA4: formattedErrors.printerA4?._errors.join(', ') || '',
      };

      setErrors(validationErrors);
      return;
    }

    onAddProductList(



      newProductList.storePhoto,
      newProductList.shopName,
      newProductList.owner,
      newProductList.roles,
      newProductList.email,
      newProductList.phone,
      newProductList.address1,
      newProductList.address2,
      newProductList.city,
      newProductList.printerA3,
      newProductList.printerA4,
    );

    onClose();
    setDiscardConfirmationOpen(false);
  };

  useEffect(() => {
    if (!isOpen) {
      setErrors({
        storePhoto: '',
        shopName: '',
        owner: '',
        roles: '',
        email: '',
        phone: '',
        address1: '',
        address2: '',
        city: '',
        printerA3: '',
        printerA4: '',
      });

      setBackendError({
        storePhoto: '',
        shopName: '',
        owner: '',
        roles: '',
        email: '',
        phone: '',
        address1: '',
        address2: '',
        city: '',
        printerA3: '',
        printerA4: '',
      });
    }
  }, [isOpen, setBackendError]);

  const handleFileUpload = (file: File) => {
    setNewProductList(prev => ({ ...prev, storePhoto: file }));
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex justify-center items-center backdrop-blur-xs z-60"
      style={{ backgroundColor: 'rgba(211, 211, 211, 0.5)' }}
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-1/2 max-h-[90vh] overflow-y-auto"

        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold  w-full pb-4 px-2 border-b-1 border-neutral-200">New Item</h2>

        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* File Upload using ImageUploader */}
          <div className='flex justify-between'
            style={{ gap: '20px' }}>
            <div>
              <div>
                <label className="block text-sm font-medium">Store Photo</label>
                <ImageUploader onFileSelect={handleFileUpload} />
                {errors.storePhoto || backendError.storePhoto ? (
                  <p className="text-red-500 text-sm">{errors.storePhoto || backendError.storePhoto}</p>
                ) : null}
              </div>

              {/* Brochure */}
              <div>
                <label className="block text-sm font-medium">Printer Inkjet A3</label>
                <select
                  name="printerA3"
                  value={newProductList.printerA3 ? "yes" : "no"}
                  onChange={(e) =>
                    setNewProductList(prev => ({
                      ...prev,
                      printerA3: e.target.value === "yes",  // Set printerA3 as true if "yes" is selected
                    }))
                  }
                  className="w-full border px-3 py-2 rounded-3xl"
                  style={{
                    height: 40,
                    backgroundColor: '#F8F9FB', border: '1px solid #E5E5E7'
                  }}
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
                {(errors.printerA3 || backendError.printerA3) && (
                  <p className="text-red-500 text-sm">
                    {errors.printerA3 || backendError.printerA3}
                  </p>
                )}              </div>
              <div>
                <label className="block text-sm font-medium">Printer Inkjet A4</label>
                <select
                  name="printerA4"
                  value={newProductList.printerA4 ? "yes" : "no"}
                  onChange={(e) =>
                    setNewProductList(prev => ({
                      ...prev,
                      printerA4: e.target.value === "yes",  // Set printerA4 as true if "yes" is selected
                    }))
                  }
                  className="w-full border px-3 py-2 rounded-3xl"
                  style={{
                    height: 40,
                    backgroundColor: '#F8F9FB', border: '1px solid #E5E5E7'
                  }}
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>
                {(errors.printerA4 || backendError.printerA4) && (
                  <p className="text-red-500 text-sm">
                    {errors.printerA4 || backendError.printerA4}
                  </p>
                )}              </div>

            </div>
            <div className='w-full'>
              {/* Text Inputs */}
              <InputField
                label="Shop Name"
                name="shopName"
                placeholder="Enter shop name"
                value={newProductList.shopName}
                onChange={handleInputChange}
                error={errors.shopName || backendError.shopName}
              />
              <InputField
                label="Owner"
                name="owner"
                placeholder="Enter name"
                value={newProductList.owner}
                onChange={handleInputChange}
                error={errors.owner || backendError.owner}
              />

              {/* <InputField
                label="Category"
                name="category"
                value={newProductList.category}
                onChange={handleInputChange}
                error={errors.category}
              /> */}

              <div>
                <label className="block text-sm font-medium">Roles</label>
                <select
                  name="roles"
                  value={newProductList.roles}
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded-3xl"
                  style={{
                    height: 40,
                    color: newProductList.roles === "" ? '#989898' : 'black', // Apply red color if no role is selected
                    backgroundColor: '#F8F9FB', border: '1px solid #E5E5E7'
                  }}
                >
                  <option value="">Choose Roles</option>

                  <option value="Reseller">Reseller</option>


                </select>
                {(errors.roles || backendError.roles) && (
                  <p className="text-red-500 text-sm">
                    {errors.roles || backendError.roles}
                  </p>
                )}              </div>
              <InputField
                label="Email"
                name="email"
                placeholder="Enter email"
                value={newProductList.email}
                onChange={handleInputChange}
                error={errors.email || backendError.email}
              />
              {/* <InputField
                label="Video Tutorial URL"
                name="videotutorial"
                type="url"
                placeholder='URL'
                value={newProductList.videotutorial}
                onChange={handleInputChange}
                error={errors.videotutorial}
              /> */}

              {/* <InputField
                label="Customer Price"
                name="customerprice"
                placeholder='0,00'
                value={newProductList.customerprice}
                onChange={handleInputChange}
                error={errors.customerprice}
              />

              <InputField
                label="Reseller Price"
                name="resellerprice"
                placeholder='0,00'
                value={newProductList.resellerprice}
                onChange={handleInputChange}
                error={errors.resellerprice}
              /> */}

              <InputField
                label="Phone"
                name="phone"
                placeholder="000"
                value={newProductList.phone}
                onChange={handleInputChange}

                error={errors.phone || backendError.phone}
              />


              {/* Textarea */}
              {/* <div>
                <label className="block text-sm font-medium">Address 1</label>
                <TiptapEditor
                  value={newProductList.address1}
                  onChange={(html) => setNewProductList(prev => ({ ...prev, address1: html }))}
                />
                {(errors.address1 || backendError.address1) && (
                  <p className="text-red-500 text-sm">
                    {errors.address1 || backendError.address1}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium">Address 2</label>
                <TiptapEditor
                  value={newProductList.address2}
                  onChange={(html) => setNewProductList(prev => ({ ...prev, address2: html }))}
                />
                {(errors.address2 || backendError.address2) && (
                  <p className="text-red-500 text-sm">
                    {errors.address2 || backendError.address2}
                  </p>
                )}
              </div> */}

              <InputField
                label="Address 1"
                name="address1"
                placeholder="Enter address 1"
                value={newProductList.address1}
                onChange={handleInputChange}
                error={errors.address1 || backendError.address1}
              />
              <InputField
                label="Address 2"
                name="address2"
                placeholder="Enter address 2"
                value={newProductList.address2}
                onChange={handleInputChange}
                error={errors.address2 || backendError.address2}
              />
              <div>
                {/* <label className="block text-sm font-medium">City</label>
                <select
                  name="city"
                  value={newProductList.city}
                  onChange={handleInputChange}
                  className="w-full border px-3 py-2 rounded-3xl"
                  style={{
                    height: 40,
                    color: newProductList.city === "" ? '#989898' : 'black', // Apply red color if no role is selected
                    backgroundColor: '#F8F9FB', border: '1px solid #E5E5E7'
                  }}
                >
                  <option value="">Choose city</option>

                  <option value="Bogor">Bogor</option>


                </select> */}
                <InputField
                  label="City"
                  name="city"
                  placeholder="Enter city"
                  value={newProductList.city}
                  onChange={handleInputChange}
                  error={errors.city || backendError.city}
                />

                {/*                 
                {(errors.city || backendError.city) && (
                  <p className="text-red-500 text-sm">
                    {errors.city || backendError.city}
                  </p>
                )} */}
              </div>
            </div>
          </div>
        </form>
        <div className="flex justify-center space-x-2 mt-4">

          <button
            type="button"
            onClick={onClose}
            className="bg-neutral-400 border-2  text-white hover:bg-neutral-500 h-10 w-20 rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-500 text-white  hover:bg-blue-600 h-10 w-30 rounded-md"
          >
            Add Reseller
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResellerListModal;

// Reusable Input Field Component
type InputFieldProps = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeFile?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
};

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type = 'text',
  placeholder = 'text',
  value,
  onChange,
  error,
}) => {
  const isPhoneNumber = name === 'phone'; // You can adjust this condition

  const formatPhoneNumber = (val: string) => {
    const num = val.replace(/\D/g, '');
    return num.replace(/(\d{4})(\d{3,4})(\d{0,4})/, (_, p1, p2, p3) =>
      [p1, p2, p3].filter(Boolean).join(' ')
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let rawValue = e.target.value;

    if (isPhoneNumber) {
      const clean = rawValue.replace(/\D/g, ''); // Remove non-digits
      const formatted = formatPhoneNumber(clean);

      // Send raw numeric value to parent
      const customEvent = {
        ...e,
        target: {
          ...e.target,
          name: e.target.name,
          value: clean,
        },
      };

      onChange?.(customEvent as React.ChangeEvent<HTMLInputElement>);
    } else {
      onChange?.(e);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium">{label}</label>
      <input
        type={type}
        name={name}
        value={isPhoneNumber ? formatPhoneNumber(value ?? '') : value}
        onChange={handleInputChange}
        placeholder={placeholder}
        className="w-full px-3 py-2 rounded-3xl"
        style={{
          height: 40,
          backgroundColor: '#F8F9FB',
          border: '1px solid #E5E5E7',
        }}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};
