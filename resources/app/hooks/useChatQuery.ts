import { AuthService } from '@/apis/services/auth.service';
import { MessagesService } from '@/apis/services/messages.service';
import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query';
import { produce } from 'immer';

const queryKeyListPrivateChannel = ['list_private_channel'];
const queryKeyConversation = ['list_chat_message'];
const queryKeyUserChatInfo = ['user_chat_info'];

const getUserChatInfo = async (userId: number) => {
  const { data } = await AuthService.GetUserDetailById(userId);
  return data;
};

const getListPrivateChannel = async () => {
  const { data } = await MessagesService.getListPrivateChannel();
  return data;
};

const getConversation = async ({ chatId = 0, quantity = 15, pageParam = 1 }) => {
  const { data } = await MessagesService.getConversationOfChannel(chatId, quantity, pageParam);
  return data;
};

export const useUserChatInfo = (userId: number) => {
  const queryClient = useQueryClient();
  const result = useQuery({
    queryKey: queryKeyUserChatInfo,
    queryFn: () => getUserChatInfo(userId),
    enabled: userId !== 0,
    initialData: () => {
      return queryClient.getQueryData(['list_private_channel'])?.data?.find((item: any) => +item.id === +userId);
    },
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

export const useSetListPrivateChannel = () => {
  const queryClient = useQueryClient();

  const manuallySetListPrivateChannel = (action: string, data: any) => {
    queryClient.setQueryData(queryKeyListPrivateChannel, (oldData: any) => {
      if (!oldData.data) {
        return oldData;
      }
      if (oldData.data.length === 0) {
        return (oldData.data = [data.data]);
      }
      if (action === 'add') {
        return produce(oldData, draft => {
          if (!draft.data || !Array.isArray(draft.data)) {
            draft.data = [];
          }
          const existingItem = draft.data.find((item: any) => item.id === data.id);
          if (!existingItem) {
            const newData = [...draft.data, data.data];
            draft.data = newData;
          }
        });
      }
      if (action === 'delete') {
        const updatedData = oldData?.data.filter((item: any) => item.id !== data.id);
        return updatedData;
      }
      return oldData;
    });
  };

  return {
    manuallySetListPrivateChannel,
  };
};

export const useSetConversation = () => {
  const queryClient = useQueryClient();

  const manuallySetConversation = (action: string, data: any) => {
    queryClient.setQueryData([queryKeyConversation, data.id], (oldData: any) => {
      if (!oldData) return data; // Nếu không có dữ liệu cũ, trả về dữ liệu mới

      if (action === 'add') {
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
