import { Outlet } from 'react-router-dom';

export const DefaultLayout = () => {
  return (
    <div>
      DefaultLayout
      <Outlet />
    </div>
  );
};
