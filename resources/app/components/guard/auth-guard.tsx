import '@/bootstrap';
import { useAppSelector } from '@/redux/hook';
import { pathName } from '@/routes/path-name';
import { load } from '@/utilities/local-storage';
import { storageKeys } from '@/utilities/local-storage/storage-keys';
import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { RealtimeNotification } from './realtime-notification';
import { RealtimeMessage } from './realtime-message';
import { PrepareData } from './prepare-data';
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
  return (
    <PrepareData>
      <RealtimeNotification />
      <RealtimeMessage />
      {children}
    </PrepareData>
  );
};
