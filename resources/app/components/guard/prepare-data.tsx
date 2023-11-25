import { MessagesService } from '@/apis/services/messages.service';
import { useAppDispatch } from '@/redux/hook';
import { chatActions } from '@/redux/slice';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

const queryListPrivateChannel = ['list_private_channel'];

type PrepareDataProps = {
  children?: React.ReactNode;
};
export const PrepareData = ({ children }: PrepareDataProps) => {
  const dispatch = useAppDispatch();

  // func
  const getListPrivateChannel = async () => {
    const { data } = await MessagesService.getListPrivateChannel();
    return data;
  };

  const { isLoading } = useQuery({
    queryKey: queryListPrivateChannel,
    queryFn: getListPrivateChannel,
    onSuccess: data => {
      dispatch(chatActions.setListPrivateChannel(data));
    },
  });

  useEffect(() => {
    dispatch(chatActions.setLoading(isLoading));
  }, [isLoading]);
  // render
  return <>{children}</>;
};
