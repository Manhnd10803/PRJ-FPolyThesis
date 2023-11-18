import '@/bootstrap';
import { useAppSelector } from '@/redux/hook';
import { pathName } from '@/routes/path-name';
import { load } from '@/utilities/local-storage';
import { StorageFunc } from '@/utilities/local-storage/storage-func';
import { storageKeys } from '@/utilities/local-storage/storage-keys';
import React, { FC, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
type AuthGuardProps = {
  children?: React.ReactNode;
};

export const AuthGuard: FC<AuthGuardProps> = ({ children }) => {
  const { accessToken } = useAppSelector(state => state.auth);

  console.log({ accessToken });
  const isStayIn = load(storageKeys.STAY_IN);
  const localUserId = StorageFunc.getUserId();

  useEffect(() => {
    if (accessToken) {
      window.Echo.options.auth.headers.Authorization = `Bearer ${accessToken}`;

      // Lắng nghe notification
      const handleReceiveNotification = (event: any) => {
        console.log('receive-notification', event);
        alert('receive-notification');
      };

      window.Echo.private(`receive-notification-${localUserId}`).listen(
        '.ReceiveNotification',
        handleReceiveNotification,
      );

      return () => {
        window.Echo.private(`receive-notification-${localUserId}`).stopListening(
          '.ReceiveNotification',
          handleReceiveNotification,
        );
      };
    }
  }, []);

  // render
  if (!accessToken && !isStayIn) {
    return <Navigate to={pathName.LOGIN} />;
  }
  return <>{children}</>;
};
