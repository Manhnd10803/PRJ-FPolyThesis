export const ApiConstants = {
  // auth
  LOGIN: `/auth/login`,
  LOGINGOOGLE: `/auth/google-auth`,
  REGISTER: `/auth/register`,
  FORGOTPASSWORD: '/auth/post-forgot-password',
  RESETPASSWORD: '/auth/post-reset-password',
  LOGOUT: `/auth/logout`,
  VERIFYREMAILREGISTER: `/auth/verify`,

  REFRESH: `/auth/refresh`,

  // user
  USER: `/users`,

  // post
  POSTS: `/posts`,

  // Add more endpoints as needed
} as const;
