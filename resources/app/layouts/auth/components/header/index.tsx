//@ts-nocheck
import { useState } from 'react';
import { Container, Nav } from 'react-bootstrap';

//Component
import { FriendRequest } from './friend-request';
import { HomeItem } from './home-item';
import { LogoAndMenu } from './logo-and-menu';
import { HeaderMessage } from './header-message';
import { HeaderNotification } from './header-notification';
import { SearchBar } from './search-bar';
import { SearchBarMobile } from './search-bar-mobile';
import { UserDropdown } from './user-dropdown';

export const Header = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="iq-top-navbar" id="header-navbar">
        <Nav expand="lg" variant="light" className="nav navbar navbar-expand-lg navbar-light iq-navbar p-lg-0">
          <Container fluid className="navbar-inner">
            <LogoAndMenu />
            <SearchBar show={show} handleClose={handleClose} handleShow={handleShow} />

            <ul className="navbar-nav navbar-list">
              <HomeItem />
              {/* <SearchBarMobile show={show} handleClose={handleClose} handleShow={handleShow} /> */}
              <FriendRequest />
              <HeaderNotification />
              <HeaderMessage />
              <UserDropdown />
            </ul>
          </Container>
        </Nav>
      </div>
    </>
  );
};
