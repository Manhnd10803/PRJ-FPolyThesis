import React, { FC } from 'react';
// import { Navigate } from 'react-router-dom';
// import { PATH_NAME } from '@/routes/pathName';

type AdminGuardProps = {
  children?: React.ReactNode;
};
export const AdminGuard: FC<AdminGuardProps> = ({ children }) => {
  // selector get isAuth

  // if not login or not auto login navigate to login page
  // if (!isAuth) {
  //   return <Navigate to={PATH_NAME.LOGIN} />;
  // }

  // else show router
  return <>{children}</>;
};
