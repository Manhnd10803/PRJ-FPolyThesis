export const ApiConstants = {
  // auth
  LOGIN: `/auth/login`,
  LOGINGOOGLE: `/auth/google-auth`,
  REGISTER: `/auth/register`,
  LOGOUT: `/auth/logout`,
  REFRESH: `/auth/refresh`,

  // user
  USER: `/users`,

  // post
  POSTS: `/posts`,

  // Add more endpoints as needed
} as const;
