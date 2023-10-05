import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

export const AuthLayout = (props: { children?: ReactNode }) => {
  console.log({ props });
  return (
    <div className='relative flex min-h-screen flex-col'>
      {/* sidebar */}
      <div className='flex-1'>
        {props.children}
        <Outlet />
      </div>
    </div>
  );
};
