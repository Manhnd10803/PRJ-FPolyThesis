import '@/bootstrap';
import { useAppSelector } from '@/redux/hook';
import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';
type AuthGuardProps = {
  children?: React.ReactNode;
};

export const AuthGuard: FC<AuthGuardProps> = ({ children }) => {
  const { accessToken } = useAppSelector(state => state.auth);

  // render
  if (!accessToken) {
    return <Navigate to="/login" />;
  } else {
    return <>{children}</>;
  }
};
