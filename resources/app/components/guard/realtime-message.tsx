import receiveMessage from '@/assets/mp3/receive-message.mp3';
import { useListPrivateChannel, useSetConversation, useSetListPrivateChannel } from '@/hooks/useChatQuery';
import { IUser } from '@/models/user';
import { useAppSelector } from '@/redux/hook';
import { StorageFunc } from '@/utilities/local-storage/storage-func';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const audioReceiveMessage = () => {
  new Audio(receiveMessage).play();
};

export const RealtimeMessage = () => {
  const location = useLocation();

  const chatId = location.pathname.split('/')[2];

  const { accessToken } = useAppSelector(state => state.auth);

  const localUserId = StorageFunc.getUserId();

  const { data: listPrivateChannel } = useListPrivateChannel();
  const queryClient = useQueryClient();
  const { manuallySetConversation } = useSetConversation();
  const { manuallySetListPrivateChannel } = useSetListPrivateChannel();
  const handleStreamPrivateMessage = (event: any) => {
    try {
      const { sender_id, action = 'send' } = event.message;

      if (action === 'delete') {
        const data = {
          data: event.message.id,
          id: event.message.sender_id,
        };
        manuallySetConversation('delete', data);
        return;
      }
      // check xem có phải người mới gửi tin nhắn không
      const isNewSender =
        listPrivateChannel &&
        listPrivateChannel?.data?.findIndex((item: IUser) => Number(item.id) === Number(sender_id)) === -1;
      if (isNewSender || !listPrivateChannel) {
        // queryClient.invalidateQueries(['list_private_channel']);
        const data = {
          data: event.message.sender,
          id: event.message.sender_id,
        };
        manuallySetListPrivateChannel('add', data);
        return;
      }
      const isChatting = Number(chatId) === Number(sender_id);

      if (isChatting) {
        const data = {
          data: event.message,
          id: event.message.sender_id,
        };
        audioReceiveMessage();
        manuallySetConversation('add', data);
      }
    } catch (error) {
      console.log('handlePrivateMessage', error);
    }
  };

  useEffect(() => {
    if (!accessToken) return;

    window.Echo.connector.options.auth.headers['Authorization'] = `Bearer ${accessToken}`;

    window.Echo.private(`user.${localUserId}`).listen('.PrivateMessageSent', handleStreamPrivateMessage);

    return () => {
      window.Echo.private(`user.${localUserId}`).stopListening('.PrivateMessageSent', handleStreamPrivateMessage);
    };
  }, [accessToken, chatId, localUserId]);

  return <div>{listPrivateChannel ? null : ''}</div>;
};
