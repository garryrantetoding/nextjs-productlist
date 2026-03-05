// components/DeleteButton.tsx
// add in each button component
import { hasPermission, isValidRole, Role } from '@/lib/rbac';
import { getUserFromToken } from '@/lib/auth';
import { getAccessTokenFromCookies } from '@/data/services/token/get-token';
import React from 'react';

const DeleteButton = async () => {
  const token = await getAccessTokenFromCookies();
  const user = token ? getUserFromToken(token) : null;

  // Check if user exists and role is valid
  if (!user || !isValidRole(user.roles) || !hasPermission(user.roles, 'delete')) {
    return null;
  }

  return <button className="btn-red">Delete Post</button>;
};

export default DeleteButton;
