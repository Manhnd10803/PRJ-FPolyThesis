import React, { ComponentType } from 'react';

type CommonType = {
  path?: string;
  guard?: React.FC;
  layout?: ComponentType | undefined;
  component?: any;
  requireRoles?: string[] | [];
};

export type RoutesType = CommonType & {
  routes?: CommonType[];
};

export type ParamsType = {
  id?: string;
};
