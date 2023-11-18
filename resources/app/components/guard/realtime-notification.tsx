import mp3NotificationCommon from '@/assets/mp3/noti-common.mp3';
import { INotification } from '@/models/notifications';
import { useAppSelector } from '@/redux/hook';
import { formatNotificationLink } from '@/utilities/functions';
import { StorageFunc } from '@/utilities/local-storage/storage-func';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const audioReceiverNotification = () => {
  new Audio(mp3NotificationCommon).play();
};

const showNotification = (content: INotification['content'], onClick: (id: string) => void) => {
  toast(
    t => (
      <div onClick={() => onClick(t.id)} className="p-2 me-4" style={{ cursor: 'pointer' }}>
        <span>{content}</span>
        <div
          style={{
            position: 'absolute',
            right: 8,
            top: 8,
            padding: 4,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={() => {
            toast.dismiss(t.id);
          }}
        >
          <i className="material-symbols-outlined me-1">close</i>
        </div>
      </div>
    ),
    {
      position: 'top-right',
      duration: 10000,
    },
  );
};

export const RealtimeNotification = () => {
  const navigate = useNavigate();
  const { accessToken } = useAppSelector(state => state.auth);

  const localUserId = StorageFunc.getUserId();

  useEffect(() => {
    if (accessToken) {
      window.Echo.options.auth.headers.Authorization = `Bearer ${accessToken}`;

      // Lắng nghe notification
      const handleReceiveNotification = (event: any) => {
        audioReceiverNotification();
        showNotification(event.notification.content, (id: string) => {
          navigate(formatNotificationLink(event.notification));
          toast.dismiss(id);
        });
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

  return <></>;
};
