import React, { FC } from 'react';
type AuthGuardProps = {
  children?: React.ReactNode;
};
export const AuthGuard: FC<AuthGuardProps> = ({ children }) => {
  return <>{children}</>;
};
