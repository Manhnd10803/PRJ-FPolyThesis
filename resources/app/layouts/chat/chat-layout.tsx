import { Outlet } from 'react-router-dom';
export const ChatLayout = () => {
  return (
    <>
      <div className="main-content">
        <Outlet />
      </div>
    </>
  );
};
