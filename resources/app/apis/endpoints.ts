export const ApiConstants = {
  // auth
  LOGIN: '/oauth/token',
  REFRESH_TOKEN: '/oauth/token',

  LOGIN_GOOGLE: '/api/auth/google-auth',
  REGISTER: '/api/auth/register',
  FORGOT_PASSWORD: '/api/auth/post-forgot-password',
  RESET_PASSWORD: '/api/auth/post-reset-password',
  CONFIRM_PASSWORD: '/api/auth/confirm-password',
  RESET_NEW_PASSWORD: '/api/auth/reset-new-password',
  LOGOUT: '/api/auth/logout',
  VERIFY_EMAIL_REGISTER: '/api/auth/verify',

  // user
  USER: '/api/users',
  USER_DETAIL: '/api/get-user',

  // question and answer
  CREATE_QANDA: '/api/quests',
  ALL_QANDA: '/api/quests',
  // LIST_QANDA: '/api/quests/lista',
  LIST_QANDA_BY_MAJOR: '/api/quests/major',
  LIST_MY_QANDA: '/api/quests/my-quests',
  LIST_MOST_CMT_QANDA: '/api/quests/most-commented',
  LIST_UNANSWER_QANDA: '/api/quests/unanswer',
  DETAIL_QANDA: '/api/quests',
  UPDATE_QANDA: '/api/quests',
  DELETE_QANDA: '/api/quests',

  // post
  POSTS: '/api/posts',

  // blog
  SHOW_BLOGS: '/api/blogs',
  SHOW_BLOG_DETAIL: '/api/blogs',
  CREATE_BLOG: '/api/blogs',

  // major
  MAJORS: '/api/majors',
  LIST_MAJORS_REGISTER: '/api/list-majors',

  // Comment
  CREATE_COMMENT: '/api/comment',
  DELETE_COMMENT: '/api/comment',
  EDIT_COMMENT: '/api/comment',
  // Like
  CREATE_LIKE_BLOG: '/api/like/blog',
  CREATE_LIKE_QANDA: '/api/like/qa',

  // Friend
  SHOW_FRIEND_REQUEST: '/api/friend-list-request',
  CONFIRM_FRIEND_REQUEST: '/api/confirm-request',
  DELETE_FRIEND_REQUEST: '/api/delete-request',
  SHOW_FRIEND_MY_USER: `api/friend-list`,
  ADD_FRIEND: `api/send-request`,
  STATUS_FRIEND: `api/status-friend`,
  UN_FRIEND: `api/unfriend`,
  // profile
  PROFILE: '/api/profile',
  DETAIL_USER_PROFILE: '/api/profile',

  //Info User
  SHOW_INFO_USER: `api/user-info`,
  EDIT_INFO_USER: `api/profile/update`,
  // admin

  USERS_ADMIN: '/api/admin/users',

  // Add more endpoints as needed

  SHOW_MESSAGE: '/api/messages',
  SEND_MESSAGES: '/api/messages',

  // chat
  LIST_CHAT_MESSAGE: '/api/messages/listuserchat',
} as const;
