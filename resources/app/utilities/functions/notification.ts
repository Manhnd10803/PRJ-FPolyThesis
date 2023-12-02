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
  // Nếu noti type là friend thì link sẽ là link đến friend request , k có id
  if (item.notification_type === NotificationType.friend) {
    return NotificationLink[item.notification_type];
  }
  // Còn lại thì sẽ có id
  return NotificationLink[item.notification_type] + `/${item.objet_id}`;
};
