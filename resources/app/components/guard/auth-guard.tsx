import '@/bootstrap';
import { useAppSelector } from '@/redux/hook';
import { pathName } from '@/routes/path-name';
import { load } from '@/utilities/local-storage';
import { storageKeys } from '@/utilities/local-storage/storage-keys';
import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';
type AuthGuardProps = {
  children?: React.ReactNode;
};

export const AuthGuard: FC<AuthGuardProps> = ({ children }) => {
  const { accessToken } = useAppSelector(state => state.auth);

  const isStayIn = load(storageKeys.STAY_IN);
  // render
  if (!accessToken && !isStayIn) {
    return <Navigate to={pathName.LOGIN} />;
  }
  return <>{children}</>;
};
