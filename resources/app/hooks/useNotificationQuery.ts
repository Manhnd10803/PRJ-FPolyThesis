import { NotificationService } from '@/apis/services/notification.service';
import { INotification, NotificationStatus } from '@/models/notifications';
import { Paginate } from '@/models/pagination';
import { InfiniteData, useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { produce } from 'immer';

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

  const manuallySeeNotification = async (id: INotification['id']) => {
    await NotificationService.seeNotification(id);

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
