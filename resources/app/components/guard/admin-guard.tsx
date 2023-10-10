import React, { FC } from 'react';

type AdminGuardProps = {
  children?: React.ReactNode;
};
export const AdminGuard: FC<AdminGuardProps> = ({ children }) => {
  return <>{children}</>;
};
