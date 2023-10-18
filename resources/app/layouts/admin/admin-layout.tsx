import { Outlet } from 'react-router-dom';
import { Header } from './components/header';
import { Sidebar } from './components/sidebar';
export const AdminLayout = () => {
  return (
    <>
      <Sidebar />
      <Header />
      <div className="main-content">
        <Outlet />
      </div>
    </>
  );
};
