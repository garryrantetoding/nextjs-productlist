"use client";
import React, { useState } from 'react';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable, Table, Row } from '@tanstack/react-table';
import CheckboxToggle from './buttons/toggle-button'; // Ensure this is correct path
import PopupButton from './buttons/detail-button';
import StatusSwitchConfirmationModal from './cards/popup-togglestatus'; // Import the new modal
import { Role, Status, Deleted } from '@/data/services/enum/enum';
import { ChangeStatus } from '@/data/services/brother/productlist-service';
import ExitModal from '../ExitModal';
import { LoadPermissionsAuth } from '@/data/services/brother/productlist-service';
import { toast } from 'sonner';
import Image from 'next/image';
import UpdateImageButton from './buttons/updateinvoice-button';
import EditInvoiceModal from './cards/popup-edit/popup-editInvoice';
import { EditReportOrderList, EditReportOrderImage, LoadReportOrderList } from '@/data/services/brother/reportorder-service';
import EditReportOrderModal from './cards/popup-edit/popup-editReportOrderList';
import ConfirmSaveModal from './cards/popup-edit/popup-saveedit';
import DiscardEditModal from './cards/popup-edit/popup-discardedit';
import { BuyerRoleEnum, CategoryEnum, OrderStatusEnum, PaymentStatusEnum, TaskStatusEnum } from '@/data/services/enum/reportorder-enum';
import { Loader2 } from 'lucide-react';



export type BestSellerProps = {
  product: string;
  price: string;
  soldItems: number;
  profit: string;
}



const columnHelper = createColumnHelper<BestSellerProps>();

interface ResellerListProps {
  // invoiceNumberSearch: string;

  startDate: string;
  endDate: string;
  data: BestSellerProps[];
  setData: React.Dispatch<React.SetStateAction<BestSellerProps[]>>;
  isLoadingBestSeller: boolean;
  // page: number;
  // pageSize: number;
}

function BestSellerList({
  // invoiceNumberSearch,
  startDate, endDate,
  data, setData,
  // page, pageSize
isLoadingBestSeller,
}: ResellerListProps) {

  const [isExitModalOpen, setIsExitModalOpen] = useState(false); // Modal state




  // const filteredData = React.useMemo(() => {
  //   let filtered = data;


  //   return filtered;
  // }, [searchQuery, rolesFilter, statusFilter, data]);

  React.useEffect(() => {
    console.log("Data updated for table:", data);
  }, [data]);














  const closeExitModal = () => {
    setIsExitModalOpen(false);

  };











  const columns = React.useMemo(() => [


    columnHelper.accessor('product', {
      cell: info => info.getValue(),
      header: () => <span>Product</span>,
      footer: info => info.column.id,
    }),
    columnHelper.accessor('price', {
      cell: info => info.getValue(),
      header: () => <div className='flex gap-1 items-center'><span>Price</span><svg width="7" height="4" viewBox="0 0 7 4" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.896973 0.236511L3.70103 3.04057L6.50508 0.236511" fill="#C8CAD8" />
      </svg>
      </div>,
      footer: info => info.column.id,
    }),
    columnHelper.accessor('soldItems', {
      cell: info => {
        const sold = info.getValue();
      return (
        <div className='text-right mx-2'>{sold}</div>
      )
      },
      header: () => <div className='flex gap-1 items-center'><span>Sold</span><svg width="7" height="4" viewBox="0 0 7 4" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.896973 0.236511L3.70103 3.04057L6.50508 0.236511" fill="#C8CAD8" />
      </svg>
      </div>,
      footer: info => info.column.id,
    }),
    columnHelper.accessor('profit', {
      cell: info => info.getValue(),
      header: () => <div className='flex gap-1 items-center'><span>Profit</span><svg width="7" height="4" viewBox="0 0 7 4" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.896973 0.236511L3.70103 3.04057L6.50508 0.236511" fill="#C8CAD8" />
      </svg>
      </div>,
      footer: info => info.column.id,
    }),

  ], [data]);

  const table = useReactTable({
    // data: filteredData, // Use filtered data
    data,

    columns,
    getCoreRowModel: getCoreRowModel(),
    // state: {
    //   rowSelection: selectedRows,  // Pass the selected rows state (updated format)
    // },
    // onRowSelectionChange: setSelectedRows,  // Update selected rows when changed
  });

  if (isLoadingBestSeller) {
    return (
      <div className={`mt-2 bg-white p-5 flex justify-center items-center`}
      style={{ borderRadius: "14.91px" }}>
       

        <Loader2 className="mr-2 h-12 w-12 animate-spin" />

        <div className="text-2xl text-gray-500">Loading...</div>
      </div>
    ); // Display loading message or spinner while fetching userroles
  }

  return (
    <div className={`mt-2 bg-white p-5 `}
      style={{ borderRadius: "14.91px" }}>
      {/* Table wrapper */}
      <div className='flex items-start justify-between mb-4'>
        <span className='font-semibold'>Bestsellers</span>
        <div className='flex items-center justify-end gap-3'><span className='font-semibold'>More</span><svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.27246 4.23685H7.81525M7.81525 4.23685L4.54386 0.965454M7.81525 4.23685L4.54386 7.50825" stroke="#8E95A9" strokeWidth="1.40203" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        </div>
      </div>
      <div className="overflow-hidden">
        <table className="w-full table-auto table-layout-fixed">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                <td colSpan={headerGroup.headers.length}>
                  <div className="rounded-t-md mb-2 py-2 overflow-hidden"
                    style={{ backgroundColor: "#F8F8F8" }}>
                    <table className="table-fixed" style={{
                      width: '100%',  // Adjust table width based on sidebar width
                    }}>
                      {/* <colgroup>
                        <col style={{ width: '125px' }} />
                        <col style={{ width: '95px' }} />
                        <col style={{ width: '60px' }} />
                        <col style={{ width: '95px' }} />
                      </colgroup> */}
<colgroup>
  <col style={{ width: `${(125 / 375) * 100}%` }} />
  <col style={{ width: `${(95 / 375) * 100}%` }} />
  <col style={{ width: `${(60 / 375) * 100}%` }} />
  <col style={{ width: `${(95 / 375) * 100}%` }} />
</colgroup>

                      <thead>
                        <tr>
                          {headerGroup.headers.map(header => (
                            <th key={header.id} className=" text-left text-xs px-2 py-2 text-black">
                              <div className="max-h-20 overflow-y-auto overflow-hidden text-ellipsis break-words">
                                {!header.isPlaceholder &&
                                  flexRender(header.column.columnDef.header, header.getContext())}
                              </div>
                            </th>
                          ))}
                        </tr>
                      </thead>
                    </table>
                  </div>
                </td>
              </tr>
            ))}
          </thead>
          <tbody>
  <tr>
    <td colSpan={table.getHeaderGroups()[0].headers.length}>
      <div className="max-h-40 overflow-y-auto pr-1">
        {table.getRowModel().rows.map(row => (
          <div key={row.id} className="border-b-2 mb-2 py-2" style={{ borderBottom: '2px solid #E9EAF3' }}>
            <table className="table-fixed w-full">
            <colgroup>
  <col style={{ width: `${(125 / 375) * 100}%` }} />
  <col style={{ width: `${(95 / 375) * 100}%` }} />
  <col style={{ width: `${(60 / 375) * 100}%` }} />
  <col style={{ width: `${(95 / 375) * 100}%` }} />
</colgroup>

              <tbody>
                <tr>
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="text-left text-xs px-2 py-2 text-black">
                      <div className="max-h-20 overflow-hidden text-ellipsis break-words">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </div>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </td>
  </tr>
</tbody>


        </table>
      </div>





      <ExitModal isExitModalOpen={isExitModalOpen} onCloseExitModal={closeExitModal} />

    </div>
  );
}

export default BestSellerList;
