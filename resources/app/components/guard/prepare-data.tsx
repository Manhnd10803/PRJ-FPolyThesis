import { MessagesService } from '@/apis/services/messages.service';
import { NotificationService } from '@/apis/services/notification.service';
import { useAppDispatch } from '@/redux/hook';
import { chatActions, notificationActions } from '@/redux/slice';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

const queryListPrivateChannel = ['list_private_channel'];

type PrepareDataProps = {
  children?: React.ReactNode;
};
export const PrepareData = ({ children }: PrepareDataProps) => {
  const dispatch = useAppDispatch();

  // func
  //============ chat ============//
  const getListPrivateChannel = async () => {
    const { data } = await MessagesService.getListPrivateChannel();
    return data;
  };

  const { isLoading: isLoadingChannel } = useQuery({
    queryKey: queryListPrivateChannel,
    queryFn: getListPrivateChannel,
    onSuccess: data => {
      dispatch(chatActions.setListPrivateChannel(data));
    },
    onError(err) {
      dispatch(chatActions.setListPrivateChannel([]));
      console.log('list private channel', err);
    },
  });

  useEffect(() => {
    dispatch(chatActions.setLoading(isLoadingChannel));
  }, [isLoadingChannel]);

  // render
  return <>{children}</>;
};
