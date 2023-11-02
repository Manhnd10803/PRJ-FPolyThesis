export const ApiConstants = {
  // auth
  LOGIN: `/auth/login`,
  LOGIN_GOOGLE: `/auth/google-auth`,
  REGISTER: `/auth/register`,
  FORGOT_PASSWORD: '/auth/post-forgot-password',
  RESET_PASSWORD: '/auth/post-reset-password',
  LOGOUT: `/auth/logout`,
  VERIFY_EMAIL_REGISTER: `/auth/verify`,

  REFRESH_TOKEN: `/auth/refresh-token`,

  // user
  USER: `/users`,

  // question and answer
  CREATE_QANDA: '/quests',
  ALL_QANDA: '/quests',
  // LIST_QANDA: '/quests/lista',
  LIST_QANDA_BY_MAJOR: '/quests/major',
  LIST_MY_QANDA: '/quests/my-quests',
  LIST_MOST_CMT_QANDA: '/quests/most-commented',
  LIST_UNANSWER_QANDA: '/quests/unanswer',
  DETAIL_QANDA: '/quests',
  UPDATE_QANDA: '/quests',
  DELETE_QANDA: '/quests',

  // post
  POSTS: `/posts`,

  // blog
  SHOW_BLOGS: `/blogs`,
  SHOW_BLOG_DETAIL: `/blogs`,
  CREATE_BLOG: `/blogs`,

  // major
  MAJORS: `/majors`,

  // Comment
  CREATE_COMMENT: `/comment`,
  DELETE_COMMENT: `/comment`,
  EDIT_COMMENT: `/comment`,
  // Like
  CREATE_LIKE_BLOG: `/like/blog`,
  CREATE_LIKE_QANDA: `/like/qa`,

  // Friend
  SHOW_FRIEND_REQUEST: `/friend-list-request`,
  CONFIRM_FRIEND_REQUEST: `/confirm-request`,
  DELETE_FRIEND_REQUEST: `/delete-request`,

  // profile
  PROFILE: `/profile`,
  DETAIL_USER_PROFILE: `/profile`,
  // admin

  USERS_ADMIN: `/admin/users`,

  // Add more endpoints as needed
} as const;
