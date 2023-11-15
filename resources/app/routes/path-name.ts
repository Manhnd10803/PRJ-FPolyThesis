export const pathName = {
  //======== Un Auth path ========//
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/get-forgot-password',
  RESET_PASSWORD: '/get-reset-password',
  VERIFY_REGISTER: '/verify-register',

  //======== Auth path ========//
  HOME: '/',
  QUESTS: '/quests',
  QUESTS_CREATE: '/quests/create',
  QUESTS_UPDATE: '/quests/update/:id',
  QUESTS_DETAIL: '/quests/:id',
  BLOG: '/blog',
  BLOG_CREATE: '/blog-create',
  BLOG_DETAIL: '/blog-detail/:id',
  PROFILE: '/profile',
  PROFILE_ID: '/profile/:id',
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
} as const;
