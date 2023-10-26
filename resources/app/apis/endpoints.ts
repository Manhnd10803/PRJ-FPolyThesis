export const ApiConstants = {
  // auth
  LOGIN: `/auth/login`,
  LOGINGOOGLE: `/auth/google-auth`,
  REGISTER: `/auth/register`,
  FORGOTPASSWORD: '/auth/post-forgot-password',
  RESETPASSWORD: '/auth/post-reset-password',
  LOGOUT: `/auth/logout`,
  VERIFYREMAILREGISTER: `/auth/verify`,

  REFRESH: `/auth/refresh-token`,

  // user
  USER: `/users`,

  // post
  POSTS: `/posts`,

  // admin blog
  BLOGS: `/admin/blogs/list-approved`,
  BLOG_PENDING: `/admin/blogs/list-pending`,
  BLOG_DETAIL: `/admin/blogs/detail`,
  BLOG_APPROVE: `/admin/blogs/approve`,
  BLOG_REJECT: `/admin/blogs/reject`,
  // Add more endpoints as needed
} as const;
