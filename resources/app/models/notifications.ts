import { pathName } from '@/routes/path-name';
import { IUser } from './user';

export interface INotification {
  id: number;
  sender: number;
  recipient: number;
  content: string;
  notification_type: NotificationTypeUnion;
  status: NotificationStatusType;
  objet_id: number;
  created_at: Date;
  updated_at: Date;
  user: IUser;
}

export const NotificationStatus = {
  READ: '1',
  UNREAD: '0',
} as const;

export type NotificationStatusType = (typeof NotificationStatus)[keyof typeof NotificationStatus];

export type NotificationState = {
  isLoading: boolean;
  notifications: Array<INotification>;
};

export type GetSeeNotificationsResponseType = {
  type: string;
  objet_id: string;
};

export const NotificationType = {
  friend: 'friend',
  like_post: 'like_post',
  like_blog: 'like_blog',
  like_qa: 'like_qa',
  comment_post: 'comment_post',
  comment_blog: 'comment_blog',
  comment_qa: 'comment_qa',
  reply_post: 'reply_post',
  reply_blog: 'reply_blog',
  reply_qa: 'reply_qa',
  message: 'message',
} as const;

export type NotificationTypeUnion = (typeof NotificationType)[keyof typeof NotificationType];

export const NotificationIconColor = {
  favorite_border: 'text-primary',
  comment: 'text-info',
  group_add: 'text-success',
  question_answer: 'text-info',
  message: 'text-warning',
} as const;

export const NotificationIconClass = {
  group_add: 'group_add',
  favorite_border: 'favorite_border',
  comment: 'comment',
  question_answer: 'question_answer',
  message: 'textsms',
} as const;

export const NotificationIcon = {
  [NotificationType['friend']]: NotificationIconClass.group_add,
  [NotificationType['like_post']]: NotificationIconClass.favorite_border,
  [NotificationType['comment_post']]: NotificationIconClass.comment,
  [NotificationType['reply_post']]: NotificationIconClass.question_answer,
  [NotificationType['like_blog']]: NotificationIconClass.favorite_border,
  [NotificationType['comment_blog']]: NotificationIconClass.comment,
  [NotificationType['reply_blog']]: NotificationIconClass.question_answer,
  [NotificationType['like_qa']]: NotificationIconClass.favorite_border,
  [NotificationType['comment_qa']]: NotificationIconClass.comment,
  [NotificationType['reply_qa']]: NotificationIconClass.question_answer,
  [NotificationType['message']]: NotificationIconClass.message,
} as const;

export const NotificationLink = {
  [NotificationType['friend']]: pathName.PROFILE,
  [NotificationType['like_post']]: pathName.POST,
  [NotificationType['comment_post']]: pathName.POST,
  [NotificationType['reply_post']]: pathName.POST,
  [NotificationType['like_blog']]: pathName.BLOG,
  [NotificationType['comment_blog']]: pathName.BLOG,
  [NotificationType['reply_blog']]: pathName.BLOG,
  [NotificationType['like_qa']]: pathName.QUESTS_DETAIL,
  [NotificationType['comment_qa']]: pathName.QUESTS_DETAIL,
  [NotificationType['reply_qa']]: pathName.QUESTS_DETAIL,
  [NotificationType['message']]: pathName.CHAT,
} as const;
