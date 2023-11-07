import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Accordion, Nav, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { CustomToggle } from './custom-toggle';

export const VerticalNavbar = React.memo(() => {
  const [activeMenu, setActiveMenu] = useState(false);
  const [active, setActive] = useState('');
  //location
  let location = useLocation();
  // console.log(document);
  return (
    <>
      <Accordion as="ul" className="navbar-nav iq-main-menu" id="sidebar-menu">
        <li className="nav-item static-item">
          <Link className="nav-link static-item disabled" to="#" tabIndex={-1}>
            <span className="default-icon">FpolyZone</span>
            <span className="mini-icon" data-bs-toggle="tooltip" title="Social" data-bs-placement="right">
              -
            </span>
          </Link>
        </li>
        <li className={`${location.pathname === '/' ? 'active' : ''} nav-item `}>
          <Link className={`${location.pathname === '/' ? 'active' : ''} nav-link `} aria-current="page" to="/">
            <OverlayTrigger placement="right" overlay={<Tooltip>Newsfeed</Tooltip>}>
              <i className="icon material-symbols-outlined">newspaper</i>
            </OverlayTrigger>
            <span className="item-name">Dashboard</span>
          </Link>
        </li>
        <li className={`${location.pathname === '/admin/users' ? 'active' : ''} nav-item `}>
          <Link
            className={`${location.pathname === '/admin/users' ? 'active' : ''} nav-link `}
            aria-current="page"
            to="/admin/users"
          >
            <OverlayTrigger placement="right" overlay={<Tooltip>Users</Tooltip>}>
              <i className="icon material-symbols-outlined">people</i>
            </OverlayTrigger>
            <span className="item-name">Users</span>
          </Link>
        </li>
        <Accordion.Item
          as="li"
          eventKey="profile-menu"
          bsPrefix={`nav-item ${active === 'profile' ? 'active' : ''} `}
          onClick={() => setActive('profile')}
        >
          <CustomToggle eventKey="profile-menu" onClick={activeKey => setActiveMenu(activeKey)}>
            <OverlayTrigger placement="right" overlay={<Tooltip>Profiles</Tooltip>}>
              <i className="icon material-symbols-outlined">person</i>
            </OverlayTrigger>
            <span className="item-name">Profiles</span>
            <i className="right-icon material-symbols-outlined">chevron_right</i>
          </CustomToggle>

          <Accordion.Collapse eventKey="profile-menu">
            <ul className="sub-nav">
              <Nav.Item as="li">
                <Link
                  className={`${location.pathname === '/dashboard/app/profile' ? 'active' : ''} nav-link`}
                  to="/dashboard/app/profile"
                >
                  <i className="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" viewBox="0 0 24 24" fill="currentColor">
                      <g>
                        <circle cx="12" cy="12" r="8" fill="currentColor"></circle>
                      </g>
                    </svg>
                  </i>
                  <OverlayTrigger placement="right" overlay={<Tooltip>Profile</Tooltip>}>
                    <i className="sidenav-mini-icon"> P </i>
                  </OverlayTrigger>
                  <span className="item-name"> Profile </span>
                </Link>
              </Nav.Item>
            </ul>
          </Accordion.Collapse>
        </Accordion.Item>
      </Accordion>
    </>
  );
});
