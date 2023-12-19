import notifyImageDefault from '@/assets/images/notification-default.png';
import mp3NotificationCommon from '@/assets/mp3/noti-common.mp3';
import { useAddNotification } from '@/hooks/useNotificationQuery';
import { INotification } from '@/models/notifications';
import { useAppSelector } from '@/redux/hook';
import { pathName } from '@/routes/path-name';
import { formatNotificationLink } from '@/utilities/functions';
import { StorageFunc } from '@/utilities/local-storage/storage-func';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';

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
        <div className="me-2 p-2">
          <img
            className="rounded-circle avatar-50"
            style={{ objectFit: 'cover' }}
            src={avatarSender || notifyImageDefault}
            alt=""
          />
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
      duration: 10000,
    },
  );
};

export const RealtimeNotification = () => {
  const location = useLocation();

  const isChatPage = useMemo(() => {
    return location.pathname.split('/')[1] === pathName.CHAT.split('/')[1];
  }, [location]);

  const { manuallyAddNotification } = useAddNotification();

  const { accessToken } = useAppSelector(state => state.auth);

  const localUserId = StorageFunc.getUserId();

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      window.Echo.connector.options.auth.headers['Authorization'] = `Bearer ${accessToken}`;

      // Lắng nghe notification
      const handleReceiveNotification = (event: any) => {
        const { content } = event.notification;
        const { notification_type } = event.notification;
        if (notification_type === 'friend') {
          queryClient.invalidateQueries(['friends']);
          queryClient.invalidateQueries(['friend']);
        }
        const { avatar_sender } = event;

        // Nếu đang ở trang chat thì không hiển thị notification
        if (!isChatPage) {
          // play sound
          audioReceiverNotification();
          console.log(event.notification.notification_type);
          showNotification({
            content,
            onClick: (id: string) => {
              toast.dismiss(id);
              if (event.notification.notification_type === 'message') {
                window.open(formatNotificationLink(event.notification), '_blank');
              } else {
                navigate(formatNotificationLink(event.notification));
              }
            },
            avatarSender: avatar_sender || notifyImageDefault,
          });
        }

        // Thêm vào danh sách notification

        const newNotification: INotification = {
          ...event.notification,
          user: {
            avatar: avatar_sender || notifyImageDefault,
          },
        };
        manuallyAddNotification(newNotification);
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
  }, [accessToken, isChatPage]);

  return null;
};
