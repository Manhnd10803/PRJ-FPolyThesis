import { ROLES } from '@/common/configs';
import { PATH_NAME } from '@/routes/PathName';

export const SideBarCommon = [
  {
    title: 'Home',
    // icon: VerifyUserIcon,
    href: PATH_NAME.HOME,
    requireRoles: [ROLES.GUEST],
  },
  {
    title: 'Message',
    // icon: AssessmentIcon,
    href: PATH_NAME.HOME,
  },
];
