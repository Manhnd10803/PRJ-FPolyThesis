import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const LogoAndMenu = () => {
  const minisidebar = () => {
    (document.getElementById('first-tour') as HTMLElement).classList.toggle('sidebar-mini');
  };

  // render
  return (
    <div className="d-flex align-items-center gap-3  pb-2 pb-lg-0">
      <Link to="/" className="d-flex align-items-center gap-2 iq-header-logo">
        <Image src="https://i.pinimg.com/736x/b8/76/c7/b876c7e29de1001a4e8471555b224896.jpg" width={70} />

        <h3 className="logo-title d-none d-sm-block" data-setting="app_name">
          FpolyZone
        </h3>
      </Link>

      <Link to="#" className="sidebar-toggle" data-toggle="sidebar" data-active="true" onClick={minisidebar}>
        <div className="icon material-symbols-outlined iq-burger-menu">menu</div>
      </Link>
    </div>
  );
};
