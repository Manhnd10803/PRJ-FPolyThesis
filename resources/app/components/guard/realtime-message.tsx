import receiveMessage from '@/assets/mp3/receive-message.mp3';
import { IUser } from '@/models/user';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { chatActions } from '@/redux/slice';
import { StorageFunc } from '@/utilities/local-storage/storage-func';
import { useEffect } from 'react';

const audioReceiveMessage = () => {
  new Audio(receiveMessage).play();
};

export const RealtimeMessage = () => {
  const dispatch = useAppDispatch();

  const { accessToken } = useAppSelector(state => state.auth);

  const localUserId = StorageFunc.getUserId();

  const { listPrivateChannel } = useAppSelector(state => state.chat);

  const handleStreamPrivateMessage = (event: any) => {
    try {
      const { sender_id, action = 'send' } = event.message;

      console.log('🤪 event.message', event.message);

      if (action === 'delete') {
        return dispatch(chatActions.removeMessageFromConversation(event.message.id));
      }

      console.log('listPrivateChannelRef', listPrivateChannel);
      // check xem có phải người mới gửi tin nhắn không
      const isNewSender = listPrivateChannel.findIndex((item: IUser) => +item.id === +sender_id) === -1;

      console.log('isNewSender ', isNewSender);

      if (isNewSender) {
        // nếu là người mới gửi tin nhắn thì thêm vào listPrivateChannel
        dispatch(chatActions.addPrivateChannel(event.message.sender));
      }

      audioReceiveMessage();

      dispatch(chatActions.addMessageToConversation(event.message));
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
  }, [accessToken]);

  useEffect(() => {
    console.log({ listPrivateChannel });
  }, [listPrivateChannel]);
  return <div>{listPrivateChannel ? null : ''}</div>;
};
