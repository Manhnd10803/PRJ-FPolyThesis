import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './components';

export const AuthLayout = (props: { children?: ReactNode }) => {
  console.log({ props });
  return (
    <div className='relative flex min-h-screen flex-col'>
      <div className='flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0'>
        <Sidebar />
        <div className='flex-1'>
          {props.children}
          <Outlet />
        </div>
      </div>
    </div>
  );
};
