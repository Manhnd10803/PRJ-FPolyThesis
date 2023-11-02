import { Card, Dropdown, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const Navbar = ({ friend_id }) => {
  return (
    <>
      {!friend_id ? (
        <>
          <Card className="p-0">
            <Card.Body className="p-0">
              <div className="user-tabing">
                <Nav
                  as="ul"
                  variant="pills"
                  className="d-flex align-items-center justify-content-center profile-feed-items p-0 m-0"
                >
                  <Nav.Item as="li" className=" col-12 col-sm-3 p-0 ">
                    <Nav.Link href="#timeline" eventKey="first" role="button" className=" text-center p-3">
                      Timeline
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item as="li" className="col-12 col-sm-3 p-0">
                    <Nav.Link href="#blog" eventKey="second" role="button" className="text-center p-3">
                      My Blogs
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item as="li" className=" col-12 col-sm-3 p-0">
                    <Nav.Link href="#pills-friends-tab" eventKey="third" role="button" className="text-center p-3">
                      Friends
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item as="li" className="col-12 col-sm-2 p-0">
                    <Nav.Link href="#pills-photos-tab" eventKey="forth" role="button" className="text-center p-3">
                      Photos
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item as="li" className="col-12 col-sm-1 p-0">
                    <div className="card-header-toolbar d-flex align-items-center justify-content-center">
                      <Dropdown>
                        <Link to="#">
                          <Dropdown.Toggle as="span" className="material-symbols-outlined">
                            more_vert
                          </Dropdown.Toggle>
                        </Link>
                        <Dropdown.Menu className="dropdown-menu-right">
                          <Dropdown.Item href="#qa" eventKey="five">
                            <i className="ri-eye-fill me-2"></i>Question & Answer
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </Nav.Item>
                </Nav>
              </div>
            </Card.Body>
          </Card>
        </>
      ) : (
        <>
          <Card className="p-0">
            <Card.Body className="p-0">
              <div className="user-tabing">
                <Nav
                  as="ul"
                  variant="pills"
                  className="d-flex align-items-center justify-content-center profile-feed-items p-0 m-0"
                >
                  <Nav.Item as="li" className=" col-12 col-sm-4 p-0 ">
                    <Nav.Link href="#timeline" eventKey="first" role="button" className=" text-center p-4">
                      Timeline
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item as="li" className=" col-12 col-sm-4 p-0">
                    <Nav.Link href="#pills-friends-tab" eventKey="third" role="button" className="text-center p-3">
                      Friends
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item as="li" className="col-12 col-sm-4 p-0">
                    <Nav.Link href="#pills-photos-tab" eventKey="forth" role="button" className="text-center p-3">
                      Photos
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </div>
            </Card.Body>
          </Card>
        </>
      )}
    </>
  );
};

export default Navbar;
