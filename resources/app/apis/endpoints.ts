export const ApiConstants = {
  // auth
  LOGIN: `/auth/login`,
  LOGIN_GOOGLE: `/auth/google-auth`,
  REGISTER: `/auth/register`,
  FORGOT_PASSWORD: '/auth/post-forgot-password',
  RESET_PASSWORD: '/auth/post-reset-password',
  LOGOUT: `/auth/logout`,
  VERIFY_EMAIL_REGISTER: `/auth/verify`,

  REFRESH: `/auth/refresh`,

  // user
  USER: `/users`,

  // post
  POSTS: `/posts`,
  // blog

  BLOGS: `/blogs`,
  BLOG_DETAIL: `/blogs`,

  // comments
  POST_COMMENT: ``,

  // admin

  USERS_ADMIN: `/admin/users`,

  // Add more endpoints as needed
} as const;
