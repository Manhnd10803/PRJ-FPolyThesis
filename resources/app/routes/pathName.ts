export const PATH_NAME = {
  // Common
  ROOT: '/',
  ERROR_404: '/404',
  ERROR_403: '/403',
  LOGIN: '/login',
  SIGNUP: '/signup',
  HOME: '/home',
  MESSAGES: '/messages',

  // Admin
  ADMIN: '/admin',
  ADMIN_USERS: '/admin/users',
  ADMIN_USERS_CREATE: '/admin/users/create',
  ADMIN_USERS_EDIT: '/admin/users/:id/edit',
  ADMIN_USERS_DETAIL: '/admin/users/:id/detail',
};

export type PATH_NAME_TYPE = (typeof PATH_NAME)[keyof typeof PATH_NAME];
