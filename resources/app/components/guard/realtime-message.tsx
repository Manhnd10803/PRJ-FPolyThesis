import receiveMessage from '@/assets/mp3/receive-message.mp3';
import { useListPrivateChannel, useMutationConversation, useMutationPrivateChannel } from '@/hooks/useChatQuery';
import { IMessages, realtimeChatActionType } from '@/models/messages';
import { IUser } from '@/models/user';
import { useAppSelector } from '@/redux/hook';
import { StorageFunc } from '@/utilities/local-storage/storage-func';
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

  const { manuallyAddMessageToConversation } = useMutationConversation();
  const { mannuallyDeleteMessage } = useMutationConversation();

  const { manuallyAddPrivateChannel } = useMutationPrivateChannel();

  const handleStreamPrivateMessage = (event: any) => {
    try {
      const { sender_id, action = 'send' }: { sender_id: number; action: realtimeChatActionType } = event.message;

      if (action === 'delete') {
        mannuallyDeleteMessage(event.message.sender_id as number, event.message.id as number);
        return;
      }
      // check xem có phải người mới gửi tin nhắn không
      const isNewSender =
        listPrivateChannel && listPrivateChannel?.data?.findIndex(item => +item.id === +sender_id) === -1;

      if (isNewSender || !listPrivateChannel) {
        manuallyAddPrivateChannel(event.message.sender as IUser);
        return;
      }
      const isChatting = Number(chatId) === Number(sender_id);

      if (isChatting) {
        audioReceiveMessage();
        manuallyAddMessageToConversation(event.message as IMessages, event.message.sender_id as number);
      }
    } catch (error) {
      console.error('handlePrivateMessage', error);
    }
  };

  useEffect(() => {
    if (!accessToken) return;

    // hết hạn token thì set lại token
    window.Echo.connector.options.auth.headers['Authorization'] = `Bearer ${accessToken}`;

    window.Echo.private(`user.${localUserId}`).listen('.PrivateMessageSent', handleStreamPrivateMessage);

    return () => {
      window.Echo.private(`user.${localUserId}`).stopListening('.PrivateMessageSent', handleStreamPrivateMessage);
    };
  }, [accessToken, chatId, localUserId, listPrivateChannel]);

  return null;
};
