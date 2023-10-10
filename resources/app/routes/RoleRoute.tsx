import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import checkRole from '@common/helpers/checkRole';
// import { PATH_NAME } from '@routes/pathName';

type IProps = {
  requireRoles: string[] | [];
  children?: React.ReactNode;
};

export const RoleRoute: FC<IProps> = ({ children, requireRoles = [] }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // if (requireRoles.length === 0) return;
    // if (!checkRole(requireRoles)) {
    //   navigate(PATH_NAME.ERROR_403, { replace: true });
    // }
  }, [navigate, requireRoles]);

  return <>{children}</>;
};
