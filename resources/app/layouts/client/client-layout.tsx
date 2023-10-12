import { Outlet } from 'react-router-dom';
import { Header } from './components/header';
import { RightSidebar } from './components/right-header';
import { Footer } from './components/footer';
import { Sidebar } from './components/sidebar';
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
