// import store from '@redux/stores';

// export const checkRole = (requireRoles: string | string[] = '') => {
//   const roles = store.getState().auth.roles || [];
//   if (Array.isArray(requireRoles)) {
//     if (!requireRoles.length) return true;
//     for (let index = 0; index < requireRoles.length; index++) {
//       const role = requireRoles[index];
//       if (!roles.includes(role)) return false;
//     }
//     return true;
//   } else {
//     if (!requireRoles) return true;
//     return roles.includes(requireRoles);
//   }
// };
