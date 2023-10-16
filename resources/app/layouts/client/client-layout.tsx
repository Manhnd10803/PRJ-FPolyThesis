import { Outlet } from 'react-router-dom';
import { Header, RightSidebar, Footer, Sidebar } from './components';
import { SettingOffCanvas } from '@/components/setting/setting-offcanvas';

export const ClientLayout = () => {
  return (
    <>
      <Sidebar />
      <Header />
      <div className="main-content">
        <Outlet />
      </div>
      <RightSidebar />
      <Footer />
      <SettingOffCanvas />
    </>
  );
};
