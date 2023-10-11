import { Outlet } from 'react-router-dom';
import { Header } from './components/header';
import { RightSidebar } from './components/right-header';
import { Footer } from './components/footer';
import { Sidebar } from './components/sidebar';

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
    </>
  );
};
