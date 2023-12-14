import { FriendService } from '@/apis/services/friend.service';
import { StorageFunc } from '@/utilities/local-storage/storage-func';
import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query';

type activityFriend = {
  user_id: number;
  activity_user: string;
};

const queryKeyPaginate = ['ListFriendPaginate', true];
const queryKeyFriends = ['friends'];

const fetchAllFriendMyUser = async () => {
  const idUser = StorageFunc.getUserId();
  const { data } = await FriendService.showAllFriendMyUser(idUser);
  return data;
};
const fetchAllFriendMyUserPaginate = async ({ pageParam = 1 }) => {
  const idUser = StorageFunc.getUserId();

  const { data } = await FriendService.showAllFriendMyUser(idUser, 8, pageParam);
  return data;
};

export const useFriend = () => {
  const { data, ...rest } = useQuery({
    queryKey: queryKeyFriends,
    queryFn: fetchAllFriendMyUser,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
  return {
    data,
    ...rest,
  };
};
export const useFriendPaginate = () => {
  const { data, ...rest } = useInfiniteQuery({
    queryKey: queryKeyPaginate,
    queryFn: fetchAllFriendMyUserPaginate,
    staleTime: 1000 * 60 * 5,
    getNextPageParam: (lastPage, _) => {
      if (lastPage.current_page === lastPage.last_page) {
        return undefined;
      }
      return lastPage.current_page + 1;
    },
  });
  return {
    data,
    ...rest,
  };
};
export const useSetListFriend = () => {
  const queryClient = useQueryClient();

  const manuallySetListFriend = (action: string, data: any) => {
    queryClient.setQueryData(queryKeyFriends, (oldData: any) => {
      if (!oldData) return oldData;

      if (action === 'add') {
        return [...oldData, data];
      }
      if (action === 'delete') {
        const updatedData = oldData.filter((item: any) => item.friend.id !== data.friend.id);
        return updatedData;
      }
      return oldData;
    });
  };
  const manuallySetListFriendPaginate = (action: string, friendId: number) => {
    queryClient.setQueryData(queryKeyPaginate, (oldData: any) => {
      if (!oldData) return oldData;

      const updatedData = oldData.pages.map((page: any) => {
        if (Array.isArray(page.data)) {
          // Trang dữ liệu trả về mảng
          const updatedPageData = page.data.filter((item: any) => item.friend.id !== friendId);
          return { ...page, data: updatedPageData };
        }

        return page;
      });

      return { ...oldData, pages: updatedData };
    });
  };
  return {
    manuallySetListFriend,
    manuallySetListFriendPaginate,
  };
};

export const useSetActivityFriend = () => {
  const queryClient = useQueryClient();

  const manuallySetActivityFriend = (data: activityFriend) => {
    queryClient.setQueryData(queryKeyFriends, (oldData: any) => {
      if (!oldData) return oldData;

      const updatedData = oldData.map((item: any) => {
        if (item.user_id_2 === data.user_id) {
          return { ...item, friend: { ...item.friend, activity_user: data.activity_user } };
        }
        return item;
      });

      return updatedData;
    });
  };

  return {
    manuallySetActivityFriend,
  };
};
