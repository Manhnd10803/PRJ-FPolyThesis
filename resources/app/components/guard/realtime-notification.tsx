import mp3NotificationCommon from '@/assets/mp3/noti-common.mp3';
import { INotification } from '@/models/notifications';
import { useAppSelector } from '@/redux/hook';
import { formatNotificationLink } from '@/utilities/functions';
import { StorageFunc } from '@/utilities/local-storage/storage-func';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import notiImageDefault from '@/assets/images/notification-default.png';
import { useAddNotification } from '@/hooks/useNotificationQuery';

const audioReceiverNotification = () => {
  new Audio(mp3NotificationCommon).play();
};

const showNotification = ({
  content,
  onClick,
  avatarSender,
}: {
  content: INotification['content'];
  onClick: (id: string) => void;
  avatarSender: string;
}) => {
  toast(
    t => (
      <div
        onClick={() => onClick(t.id)}
        className="me-4 d-flex justify-content-center align-items-center rounded"
        style={{ cursor: 'pointer' }}
      >
        <div className="me-2 rounded-circle p-2" style={{ background: avatarSender ? 'transparent' : 'red' }}>
          <img className="avatar-40 " style={{ objectFit: 'cover' }} src={avatarSender || notiImageDefault} alt="" />
        </div>
        <div>
          <span>{content}</span>
        </div>
        <div
          className="p-2"
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
      duration: 1000000,
    },
  );
};

showNotification({
  content:
    'event. notification .content event.n otificatio n.content event. notification .content event.n otificatio n.conten',
  onClick: (id: string) => {
    console.log(id);
  },
  avatarSender: '',
});

export const RealtimeNotification = () => {
  const navigate = useNavigate();

  const { manuallyAddNotification } = useAddNotification();

  const { accessToken } = useAppSelector(state => state.auth);

  const localUserId = StorageFunc.getUserId();

  useEffect(() => {
    if (accessToken) {
      window.Echo.connector.options.auth.headers['Authorization'] = `Bearer ${accessToken}`;

      // Lắng nghe notification
      const handleReceiveNotification = (event: any) => {
        // play sound
        audioReceiverNotification();

        console.log('handleReceiveNotification', event);

        const { content, user } = event.notification;

        showNotification({
          content,
          onClick: (id: string) => {
            navigate(formatNotificationLink(event.notification));
            toast.dismiss(id);
          },
          avatarSender: user.avatar || notiImageDefault,
        });

        // Thêm vào danh sách notification
        manuallyAddNotification(event.notification);
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
  }, [accessToken]);

  return null;
};
