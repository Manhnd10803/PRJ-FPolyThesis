import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/layouts/guest/components/Header';

export default function AuthLayout(props: { children?: ReactNode }) {
  return (
    <main className='p-4'>
      <Header />
      {props.children}
      <Outlet />
    </main>
  );
}
