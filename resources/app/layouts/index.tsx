
import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './main/components/Header';
// import Header from './auth/components/Header';

export default function MainLayout(props: { children?: ReactNode }) {
  return (
    <main className='p-4'>
      <Header />
      {props.children}
      <Outlet />
    </main>
  );
}