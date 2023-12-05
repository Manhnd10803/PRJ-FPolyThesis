import { NotificationService } from '@/apis/services/notification.service';
import { INotification, NotificationStatus } from '@/models/notifications';
import { Paginate } from '@/models/pagination';
import { InfiniteData, useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { produce } from 'immer';
import toast from 'react-hot-toast';

export const queryKeyNotifications = ['notifications'];

export const queryKeyCountNotifications = ['count-notifications'];

const fetchNotifications = async ({ quantity = 10, pageParam = 1 }) => {
  const { data } = await NotificationService.getListNotifications(quantity, pageParam);
  return data;
};

const fetchNotificationsNotSeen = async () => {
  const { data } = await NotificationService.getAmountNotificationNotSeen();
  return data;
};

export function useCountNotificationsNotSeen() {
  const { data } = useQuery({
    queryKey: queryKeyCountNotifications,
    queryFn: fetchNotificationsNotSeen,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return data?.count;
}

export const useSetAmountNotificationsNotSeen = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation(async (operation: 'increase' | 'decrease' | 'seeAll') => {
    let newCount;

    const currentCount = queryClient.getQueryData<{ count: number } | undefined>(queryKeyCountNotifications);

    if (operation === 'increase') {
      newCount = (currentCount?.count || 0) + 1;
    } else if (operation === 'decrease' && currentCount?.count && currentCount.count > 0) {
      newCount = currentCount.count - 1;
    } else if (operation === 'seeAll') {
      newCount = 0;
    } else {
      newCount = currentCount?.count;
    }

    await queryClient.setQueryData(queryKeyCountNotifications, { count: newCount });
    return newCount;
  });

  const setAmountNotificationsNotSeen = async (operation: 'increase' | 'decrease' | 'seeAll') => {
    try {
      await mutation.mutateAsync(operation);
    } catch (error) {
      console.error('Error mutating notifications count:', error);
    }
  };

  return setAmountNotificationsNotSeen;
};

export default function useInfiniteNotifications() {
  const { data, ...rest } = useInfiniteQuery({
    queryKey: queryKeyNotifications,
    queryFn: fetchNotifications,
    getNextPageParam: (lastPage, _) => {
      if (lastPage.current_page === lastPage.last_page) {
        return undefined;
      }
      return lastPage.current_page + 1;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return {
    data: data?.pages.flatMap(page => page.data),
    ...rest,
  };
}

export const useSeeNotification = () => {
  const setAmountNotificationsNotSeen = useSetAmountNotificationsNotSeen();
  const queryClient = useQueryClient();

  const manuallySeeNotification = (id: INotification['id']) => {
    NotificationService.seeNotification(id);

    queryClient.setQueryData(queryKeyNotifications, (oldData: InfiniteData<Paginate<INotification>> | undefined) => {
      if (!oldData) return oldData;

      return produce(oldData, draft => {
        draft.pages.forEach(page => {
          page.data.forEach(notification => {
            if (notification.id === id) {
              notification.status = NotificationStatus.READ;
            }
          });
        });
      });
    });
    setAmountNotificationsNotSeen('decrease');
  };

  return {
    manuallySeeNotification,
  };
};

export const useAddNotification = () => {
  const queryClient = useQueryClient();
  const setAmountNotificationsNotSeen = useSetAmountNotificationsNotSeen();

  const manuallyAddNotification = async (newNotify: INotification) => {
    queryClient.setQueryData(queryKeyNotifications, (oldData: InfiniteData<Paginate<INotification>> | undefined) => {
      if (!oldData) return oldData;

      const [firstPage, ...rest] = oldData?.pages;
      firstPage.data.unshift(newNotify);

      return {
        ...oldData,
        pages: [{ ...firstPage }, ...rest],
      };
    });
    setAmountNotificationsNotSeen('increase');
  };

  return {
    manuallyAddNotification,
  };
};

export const useDeleteNotification = () => {
  const queryClient = useQueryClient();
  const setAmountNotificationsNotSeen = useSetAmountNotificationsNotSeen();

  const mutation = useMutation({
    mutationFn: (id: number) => {
      return NotificationService.deleteNotification(id);
    },
  });

  const manuallyDeleteNotification = (id: INotification['id']) => {
    mutation.mutate(id, {
      onSuccess: () => {
        queryClient.setQueryData(
          queryKeyNotifications,
          (oldData: InfiniteData<Paginate<INotification>> | undefined) => {
            if (!oldData) return oldData;

            return produce(oldData, draft => {
              draft.pages.forEach(page => {
                page.data = page.data.filter(notification => notification.id !== id);
              });
            });
          },
        );
        setAmountNotificationsNotSeen('decrease');
      },
      onError(error, variables, context) {
        toast.error('Có lỗi xảy ra khi xóa thông báo');
        console.log('onError - DeleteNotification', error, variables, context);
      },
    });
  };

  return {
    manuallyDeleteNotification,
  };
};

export const useSeeAllNotification = () => {
  const queryClient = useQueryClient();
  const setAmountNotificationsNotSeen = useSetAmountNotificationsNotSeen();

  const manuallySeeAllNotification = () => {
    NotificationService.seeAllNotification();

    queryClient.setQueryData(queryKeyNotifications, (oldData: InfiniteData<Paginate<INotification>> | undefined) => {
      if (!oldData) return oldData;

      return produce(oldData, draft => {
        draft.pages.forEach(page => {
          page.data.forEach(notification => {
            if (notification.status === NotificationStatus.UNREAD) {
              notification.status = NotificationStatus.READ;
            }
          });
        });
      });
    });

    setAmountNotificationsNotSeen('seeAll');
  };

  return {
    manuallySeeAllNotification,
  };
};
