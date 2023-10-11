import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import SideImage from './components/SideImage';
import { Toaster } from '@/components/ui/toaster';

export default function AuthLayout(props: { children?: ReactNode }) {
  return (
    <main className="container relative min-h-screen flex flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-10 lg:py-7 md:px-1">
      <Header />
      {props.children}
      <Outlet />
      <SideImage/>
      <Toaster/>
    </main>
  );
}
