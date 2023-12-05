export const pathName = {
  //======== Un Auth path ========//
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/get-forgot-password',
  RESET_PASSWORD: '/get-reset-password',
  VERIFY_REGISTER: '/verify-register',

  //======== Auth path ========//
  HOME: '/',
  POST: '/post',
  POST_DETAIL: '/post/:id',
  QUESTS: '/quests',
  QUESTS_CREATE: '/quests/create',
  QUESTS_UPDATE: '/quests/update/:id',
  QUESTS_DETAIL: '/quests/:id',
  LIST_QUESTS_MOST_CMT: '/quests/most-cmt',
  LIST_QUESTS_NO_ANSWER: '/quests/no-answer',
  LIST_QUESTS_MY_QANDA: '/quests/my-qanda',
  LIST_QUESTS_BY_MAJOR: '/quests/by-majors/:majorId',
  BLOG: '/blog',
  BLOG_CREATE: '/blog-create',
  BLOG_DETAIL: '/blog/:id',
  PROFILE: '/profile',
  PROFILE_ID: '/profile/:id',
  PROFILE_FRIEND_LIST: '/profile#pills-friends-tab',
  FRIEND_LIST: '/friend-list',
  FRIEND_REQUEST: '/friend-request',
  GROUP: '/group',
  NOTIFICATION: '/notification',
  EDIT_PROFILE: '/edit-profile',
  EDITOR: '/editor',
  UPLOAD: '/upload',
  ACCOUNT_SETTING: '/account-setting',
  PRIVACY_SECURITY: '/privacy-security',

  //======== Chat path ========//
  CHAT: '/chat',
  CHAT_DETAIL: '/chat/:id',
  SEARCH: '/search',

  ERROR_500: '/error-500',
} as const;
