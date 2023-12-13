import '@/bootstrap';
import { useAppSelector } from '@/redux/hook';
import { pathName } from '@/routes/path-name';
import { load } from '@/utilities/local-storage';
import { storageKeys } from '@/utilities/local-storage/storage-keys';
import React, { FC, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { RealtimeNotification } from './realtime-notification';
import { RealtimeMessage } from './realtime-message';
import { PrepareData } from './prepare-data';
import { RealtimeActivityUser } from './realtime-activity-user';
import { UserService } from '@/apis/services/user.service';
type AuthGuardProps = {
  children?: React.ReactNode;
};

export const AuthGuard: FC<AuthGuardProps> = ({ children }) => {
  const { accessToken } = useAppSelector(state => state.auth);

  const isStayIn = load(storageKeys.STAY_IN);

  const setStatus = async (status: string) => {
    try {
      const data = {
        activity_user: status,
      };

      return await UserService.changeActivityUser(data);
    } catch (error) {
      console.error('Error setting offline status:', error);
    }
  };

  useEffect(() => {
    let lastActiveTime = Date.now();
    let timeoutId: any;
    const handleVisibilityChange = () => {
      const elapsedTime = Date.now() - lastActiveTime;
      if (document.visibilityState === 'hidden') {
        timeoutId = setTimeout(
          () => {
            setStatus('Đang bận');
          },
          1000 * 60 * 5,
        );
      } else {
        if (elapsedTime > 1000 * 60 * 5) {
          setStatus('Đang hoạt động');
        }
        clearTimeout(timeoutId);
        lastActiveTime = Date.now();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // render
  if (!accessToken && !isStayIn) {
    return <Navigate to={pathName.LOGIN} />;
  }
  return (
    <PrepareData>
      <RealtimeNotification />
      <RealtimeMessage />
      <RealtimeActivityUser />
      {children}
    </PrepareData>
  );
};
