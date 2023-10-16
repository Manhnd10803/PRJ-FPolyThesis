import { Accordion, Nav, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { CustomToggle } from '../custom-toggle';

type NestedNavbarItemProps = {
  title: string;
  active: string;
  setActive: React.Dispatch<React.SetStateAction<string>>;
  setActiveMenu: React.Dispatch<React.SetStateAction<boolean>>;
  eventKey: string;
  subNav: SubNavbarItemProps[];
};

export const NestedNavbarItem = ({
  title,
  active,
  setActive,
  setActiveMenu,
  eventKey,
  subNav,
}: NestedNavbarItemProps) => {
  return (
    <Accordion.Item
      as="li"
      eventKey={eventKey}
      bsPrefix={`nav-item ${active === 'profile' ? 'active' : ''} `}
      onClick={() => setActive('profile')}
    >
      <CustomToggle eventKey={eventKey} onClick={activeKey => setActiveMenu(activeKey.state)}>
        <OverlayTrigger placement="right" overlay={<Tooltip>{title}</Tooltip>}>
          <i className="icon material-symbols-outlined">person</i>
        </OverlayTrigger>
        <span className="item-name">{title}</span>
        <i className="right-icon material-symbols-outlined">chevron_right</i>
      </CustomToggle>
      <Accordion.Collapse eventKey={eventKey}>
        <ul className="sub-nav">
          {/* ============== Sub Navbar ============== */}
          {subNav.map((item, index) => (
            <SubNavbarItem key={index} {...item} />
          ))}
        </ul>
      </Accordion.Collapse>
    </Accordion.Item>
  );
};

// ======================= SubNavbarItem ======================= //
type SubNavbarItemProps = {
  pathname: string;
  icon: React.ReactElement;
  title: string;
  miniTitle: string;
};
const SubNavbarItem = ({ pathname, icon, title, miniTitle }: SubNavbarItemProps) => {
  const location = useLocation();
  return (
    <Nav.Item as="li">
      <Link className={`${location.pathname === pathname ? 'active' : ''} nav-link`} to={pathname}>
        {icon}
        <OverlayTrigger placement="right" overlay={<Tooltip>{title}</Tooltip>}>
          <i className="sidenav-mini-icon">{miniTitle}</i>
        </OverlayTrigger>
        <span className="item-name">{title}</span>
      </Link>
    </Nav.Item>
  );
};
