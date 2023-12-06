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

  // useEffect(() => {
  //   let lastTabSwitchTime = Date.now();

  //   const handleVisibilityChange = async () => {
  //     let timer;
  //     if (document.hidden) {
  //       timer = setTimeout(async () => {
  //         // Xử lý khi người dùng đã quay lại sau 1 phút
  //         // Ví dụ: thông báo người dùng đã quay lại sau 1 phút
  //         const data={
  //           activity_user:'Offline'
  //         }
  //         await UserService.changeActivityUser(data);
  //       }, 1000 * 60 * 1);
  //     } else {
  //       clearTimeout(timer);
  //       const data={
  //         activity_user:'Online'
  //       }
  //       await UserService.changeActivityUser(data);
  //       lastTabSwitchTime = Date.now(); // Cập nhật thời điểm khi tab được chuyển
  //     }
  //   };

  //   const handleTabClose = async () => {
  //     const data={
  //       activity_user:'Offline'
  //     }
  //     await UserService.changeActivityUser(data);
  //   };

  //   document.addEventListener('visibilitychange', handleVisibilityChange);
  //   window.addEventListener('beforeunload', handleTabClose);

  //   return () => {
  //     document.removeEventListener('visibilitychange', handleVisibilityChange);
  //     window.removeEventListener('beforeunload', handleTabClose);
  //   };
  // }, []);

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
