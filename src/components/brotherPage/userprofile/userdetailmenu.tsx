// import React from 'react';
// import { LogoutButton } from '@/components/custom/auth-custom/logout-button';

// // Define the type for the Dropdown component
// interface DropdownProps {
//   visible: boolean;
//   onClose: () => void;
// }

// const UserDetailMenu: React.FC<DropdownProps> = ({ visible, onClose }) => {
//   if (!visible) return null; // Don't render if dropdown isn't visible

//   return (
//     <div className="absolute bg-white shadow-lg right-0 top-full p-4 mt-2 rounded border z-50">
//       <ul>
// <LogoutButton label="Log out"/>
//       </ul>
//     </div>
//   );
// };

// export default UserDetailMenu;
'use client';

import React from 'react';
import { LogoutButton } from '@/components/custom/auth-custom/logout-button';
import clsx from 'clsx'; // Optional: for clean conditional class handling

interface DropdownProps {
  visible: boolean;
  onClose: () => void;
}

const UserDetailMenu: React.FC<DropdownProps> = ({ visible, onClose }) => {
  return (
    <div
      className={clsx(
        'absolute right-0 top-full z-50 w-48 h-[50px] flex items-center rounded border-1 border-black bg-white shadow-lg transition-all duration-300 ease-in-out transform',
        visible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 -translate-y-2 pointer-events-none'
      )}
    >
      <ul>
        <LogoutButton label="Log out" />
      </ul>
    </div>
  );
};

export default UserDetailMenu;
