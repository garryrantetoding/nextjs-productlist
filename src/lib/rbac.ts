// lib/rbac.ts
export type Role = 'Owner' | 'Approver' | 'Staff';
export type Permission = 'create' | 'edit' | 'delete' | 'view';

const roles: Record<Role, Permission[]> = {
  Owner: ['create', 'edit', 'delete', 'view'],
  Approver: ['create', 'edit', 'view'],
  Staff: ['view']
};

export const hasPermission = (role: Role, permission: Permission): boolean => {
  return roles[role]?.includes(permission);
};

// Optional: runtime check to validate roles
export const isValidRole = (role: any): role is Role => {
  return ['Owner', 'Approver', 'Staff'].includes(role);
};
