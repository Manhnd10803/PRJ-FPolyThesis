import { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
// import { Sidebar } from './components';
import Header from './components/Header';
import SideImage from './components/SideImage';

// export const AuthLayout = (props: { children?: ReactNode }) => {
//   console.log({ props });
//   return (
//     <div className='relative flex min-h-screen flex-col'>
//       <div className='flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0'>
//         <Sidebar />
//         <div className='flex-1'>
//           {props.children}
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// };

export default function AuthLayout(props: { children?: ReactNode }) {
  return (
    <main className="container relative min-h-screen flex flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-10 lg:py-7 md:px-1">
      <Header />
      {props.children}
      <Outlet />
      <SideImage/>
    </main>
  );
}