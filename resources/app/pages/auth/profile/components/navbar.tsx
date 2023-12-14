import { Card, Nav } from 'react-bootstrap';

export const Navbar = ({ isUser }) => {
  return (
    <>
      {isUser ? (
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
                  <Nav.Item as="li" className="col-12 col-sm-3 p-0">
                    <Nav.Link href="#qa" eventKey="forth" role="button" className="text-center p-3">
                      Question & Answer
                    </Nav.Link>
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
                  <Nav.Item as="li" className="col-12 col-sm-6 p-0 ">
                    <Nav.Link href="#timeline" eventKey="first" role="button" className=" text-center p-3">
                      Timeline
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item as="li" className="col-12 col-sm-6 p-0">
                    <Nav.Link href="#pills-friends-tab" eventKey="third" role="button" className="text-center p-3">
                      Friends
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
