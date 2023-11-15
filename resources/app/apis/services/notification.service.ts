import { GetNotificationsResponseType } from '@/models/notifications';
import httpRequest from '../axios-instance';
import { ApiConstants } from '../endpoints';

const getListNotifications = () => {
  return httpRequest.get<GetNotificationsResponseType>(ApiConstants.NOTIFICATIONS);
};

export const NotificationService = { getListNotifications };
