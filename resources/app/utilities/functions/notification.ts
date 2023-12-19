import {
  INotification,
  NotificationIcon,
  NotificationIconColor,
  NotificationLink,
  NotificationType,
} from '@/models/notifications';

export const formatNotificationAction = (item: INotification) => {
  // how to format content of notification
  return item.content;
};

export const mappingNotificationIcon = (item: INotification) => {
  return NotificationIcon[item.notification_type];
};

type IconNotificationType = ReturnType<typeof mappingNotificationIcon>;

export const getColorClassIconNotification = (item: INotification) => {
  return NotificationIconColor[mappingNotificationIcon(item) as IconNotificationType];
};

export const formatNotificationLink = (item: INotification) => {
  return NotificationLink[item.notification_type] + `/${item.objet_id}`;
};
