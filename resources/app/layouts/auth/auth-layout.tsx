import { Outlet } from 'react-router-dom';
import { Header, RightSidebar, Footer, Sidebar } from './components';
import { SettingOffCanvas } from '@/components/setting/setting-offcanvas';

type AuthLayoutProps = {
  hasRightSidebar?: boolean;
};

export const AuthLayout = ({ hasRightSidebar = true }: AuthLayoutProps) => {
  return (
    <>
      <Sidebar />
      <Header />
      <div className="main-content">
        <Outlet />
      </div>
      {hasRightSidebar && <RightSidebar />}
      <Footer />
      <SettingOffCanvas />
    </>
  );
};
