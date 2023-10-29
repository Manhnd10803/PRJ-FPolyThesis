export const ApiConstants = {
  // auth
  LOGIN: `/auth/login`,
  LOGIN_GOOGLE: `/auth/google-auth`,
  REGISTER: `/auth/register`,
  FORGOT_PASSWORD: '/auth/post-forgot-password',
  RESET_PASSWORD: '/auth/post-reset-password',
  LOGOUT: `/auth/logout`,
  VERIFY_EMAIL_REGISTER: `/auth/verify`,

  REFRESH: `/auth/refresh-token`,

  // user
  USER: `/users`,

  // question and answer
  CREATEASK: '/quests',
  ALL_QANDA: '/quests',
  // LIST_QANDA: '/quests/lista',
  DETAIL_QANDA: '/quests',

  // post
  POSTS: `/posts`,

  // blog
  SHOW_BLOGS: `/blogs`,
  CREATE_BLOG: `/blogs`,

  // major
  MAJORS: `/majors`,

  // admin

  USERS_ADMIN: `/admin/users`,

  // Add more endpoints as needed
} as const;
