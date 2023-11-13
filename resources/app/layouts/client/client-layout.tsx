import '@/bootstrap';
import { Outlet } from 'react-router-dom';
import { Header, RightSidebar, Footer, Sidebar } from './components';
import { SettingOffCanvas } from '@/components/setting/setting-offcanvas';

type ClientLayoutProps = {
  hasRightSidebar?: boolean;
};

export const ClientLayout = ({ hasRightSidebar = true }: ClientLayoutProps) => {
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
