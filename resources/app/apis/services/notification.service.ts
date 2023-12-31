import { GetSeeNotificationsResponseType, INotification } from '@/models/notifications';
import { Paginate } from '@/models/pagination';
import httpRequest from '../axios-instance';
import { ApiConstants } from '../endpoints';

const getListNotifications = (quantity: number, page: number) => {
  return httpRequest.get<Paginate<INotification>>(`${ApiConstants.NOTIFICATIONS}/${quantity}?page=${page}`);
};

const seeNotification = (id: number) => {
  return httpRequest.get<GetSeeNotificationsResponseType>(`${ApiConstants.SEE_NOTIFICATION}/${id}`);
};

const deleteNotification = (id: number) => {
  return httpRequest.delete<{ message: string }>(`${ApiConstants.NOTIFICATION}/${id}`);
};

const seeAllNotification = () => {
  return httpRequest.put<{ message: string }>(`${ApiConstants.SEE_ALL_NOTIFICATION}`);
};

const getAmountNotificationNotSeen = () => {
  return httpRequest.get<{ count: number }>(`${ApiConstants.COUNT_NOTIFICATIONS}`);
};

export const NotificationService = {
  getListNotifications,
  seeNotification,
  deleteNotification,
  seeAllNotification,
  getAmountNotificationNotSeen,
};
