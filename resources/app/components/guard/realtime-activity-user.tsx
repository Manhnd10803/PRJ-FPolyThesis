import { useFriend, useSetActivityFriend } from '@/hooks/useFriendQuery';
import { useAppSelector } from '@/redux/hook';
import { StorageFunc } from '@/utilities/local-storage/storage-func';
import { useEffect } from 'react';

export const RealtimeActivityUser = () => {
  const { accessToken } = useAppSelector(state => state.auth);

  const localUserId = StorageFunc.getUserId();

  const { manuallySetActivityFriend } = useSetActivityFriend();

  useEffect(() => {
    if (accessToken) {
      window.Echo.connector.options.auth.headers['Authorization'] = `Bearer ${accessToken}`;

      // Lắng nghe event
      const handleCheckStatusUser = (event: any) => {
        manuallySetActivityFriend(event);
      };

      window.Echo.private(`activity.${localUserId}`).listen('.CheckStatusUser', handleCheckStatusUser);

      return () => {
        window.Echo.private(`activity.${localUserId}`).stopListening('.CheckStatusUser', handleCheckStatusUser);
      };
    }
  }, [accessToken]);

  return null;
};
