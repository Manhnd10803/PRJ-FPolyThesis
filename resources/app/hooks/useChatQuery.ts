import { AuthService } from '@/apis/services/auth.service';
import { MessagesService } from '@/apis/services/messages.service';
import { GetListPrivateChannelResponseType } from '@/models/messages';
import { IUser } from '@/models/user';
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { produce } from 'immer';

const queryKeyListPrivateChannel = ['list_private_channel'];
const queryKeyConversation = ['list_chat_message'];

//===================================== Private Channel =====================================//

const getUserChatInfo = async (userId: number) => {
  const { data } = await AuthService.GetUserDetailById(userId);
  return data;
};

const getListPrivateChannel = async () => {
  const { data } = await MessagesService.getListPrivateChannel();
  return data;
};

export const useUserChatInfo = (userId: number) => {
  const queryClient = useQueryClient();

  const listPrivateChannel = queryClient.getQueryData(['list_private_channel']) as GetListPrivateChannelResponseType;

  const existUserInfo = listPrivateChannel?.data?.find(item => +item.id === +userId);

  console.log({ existUserInfo, listPrivateChannel });

  const result = useQuery({
    queryKey: ['user_chat_info', userId],
    queryFn: () => getUserChatInfo(userId),
    enabled: userId !== 0 && !existUserInfo,
    initialData: { user: existUserInfo },
  });

  return result;
};

export const useListPrivateChannel = () => {
  const { data, ...rest } = useQuery({
    queryKey: queryKeyListPrivateChannel,
    queryFn: getListPrivateChannel,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
  return {
    data,
    ...rest,
  };
};

export const useMutationPrivateChannel = () => {
  const queryClient = useQueryClient();

  const manuallyAddPrivateChannel = (data: IUser) => {
    queryClient.setQueryData(queryKeyListPrivateChannel, (oldData: GetListPrivateChannelResponseType | undefined) => {
      if (!oldData) return oldData;

      // trường hợp listPrivateChannel chưa có dữ liệu và có action là send
      if (oldData.data.length === 0) {
        return produce(oldData, draft => {
          draft.data = [data];
        });
      } else {
        return produce(oldData, draft => {
          const existingItem = draft.data.find((item: any) => item.id === data.id);

          if (!existingItem) {
            draft.data.unshift(data);
          }
        });
      }
    });
  };

  const manuallyDeletePrivateChannel = (id: number) => {
    queryClient.setQueryData(queryKeyListPrivateChannel, (oldData: GetListPrivateChannelResponseType | undefined) => {
      if (!oldData) return oldData;

      return produce(oldData, draft => {
        const newData = draft.data.filter(item => +item.id !== +id);
        draft.data = newData;
      });
    });
  };

  return {
    manuallyAddPrivateChannel,
    manuallyDeletePrivateChannel,
  };
};

export const useDeletePrivateChannel = () => {
  const { manuallyDeletePrivateChannel } = useMutationPrivateChannel();

  const { mutate, ...rest } = useMutation({
    mutationFn: async (id: number) => {
      manuallyDeletePrivateChannel(+id);

      await MessagesService.deletePrivateChannel(id);
    },
  });
  return {
    deletePrivateChannel: mutate,
    ...rest,
  };
};

//===================================== Conversation =====================================//

const getConversation = async ({ chatId = 0, quantity = 15, pageParam = 1 }) => {
  const { data } = await MessagesService.getConversationOfChannel(chatId, quantity, pageParam);
  return data;
};

export const useConversation = (chatId: number) => {
  const { data, ...rest } = useInfiniteQuery({
    queryKey: [queryKeyConversation, +chatId],
    queryFn: ({ pageParam = 1 }) => getConversation({ chatId, pageParam }),
    staleTime: 1000 * 60 * 5,
    enabled: chatId !== 0,
    getNextPageParam: (lastPage, _) => {
      if (lastPage.current_page === lastPage.last_page) {
        return undefined;
      }
      return lastPage.current_page + 1;
    },
  });
  return {
    data: data?.pages.flatMap(page => page.data),
    ...rest,
  };
};

export const useSetConversation = () => {
  const queryClient = useQueryClient();

  const manuallySetConversation = (action: any, data: any) => {
    queryClient.setQueryData([queryKeyConversation, data.id], (oldData: any) => {
      if (!oldData) return data; // Nếu không có dữ liệu cũ, trả về dữ liệu mới

      if (action === 'send') {
        const [firstPage, ...rest] = oldData?.pages;
        firstPage.data.unshift(data.data);

        return {
          ...oldData,
          pages: [{ ...firstPage }, ...rest],
        };
      }

      if (action === 'delete') {
        const updatedData = produce(oldData, draft => {
          draft.pages.forEach(page => {
            page.data = page.data.filter(message => message.id !== data.data);
          });
        });

        return updatedData;
      }

      return oldData;
    });
  };

  return {
    manuallySetConversation,
  };
};
