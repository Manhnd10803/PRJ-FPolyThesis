import { INotification, NotificationIcon, NotificationLink } from '@/models/notifications';

export const formatNotificationAction = (item: INotification) => {
  // how to format content of notification
  return item.content;
};

export const mappingNotificationIcon = (item: INotification) => {
  return NotificationIcon[item.notification_type];
};

export const formatNotificationLink = (item: INotification) => {
  return NotificationLink[item.notification_type] + `/${item.objet_id}`;
};
