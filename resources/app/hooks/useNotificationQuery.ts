import { NotificationService } from '@/apis/services/notification.service';
import { INotification, NotificationStatus } from '@/models/notifications';
import { Paginate } from '@/models/pagination';
import { InfiniteData, useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { produce } from 'immer';
import toast from 'react-hot-toast';

export const queryKeyNotifications = ['notifications'];

const fetchNotifications = async ({ quantity = 10, pageParam = 1 }) => {
  const { data } = await NotificationService.getListNotifications(quantity, pageParam);
  return data;
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
  };

  return {
    manuallySeeNotification,
  };
};

export const useAddNotification = () => {
  const queryClient = useQueryClient();

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
  };

  return {
    manuallyAddNotification,
  };
};

export const useDeleteNotification = () => {
  const queryClient = useQueryClient();

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
  };

  return {
    manuallySeeAllNotification,
  };
};
