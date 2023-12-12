import { Card, Col, Dropdown, Nav } from 'react-bootstrap';

export const Navbar = () => {
  return (
    <Col sm="12">
      <Card>
        <Card.Body className="p-0">
          <div className="user-tabing p-3">
            <div className="d-flex flex-wrap align-items-center justify-content-between">
              <Nav variant="pills" className="d-flex align-items-center text-center profile-forum-items p-0 m-0 w-100">
                <Col sm={3} className=" p-0">
                  <Nav.Link href="#all-question" eventKey="all-question" role="button" className=" text-center p-3">
                    Tất cả
                  </Nav.Link>
                </Col>
                <Col sm={3} className=" p-0">
                  <Nav.Link href="#best-question" eventKey="best-question" role="button" className=" text-center p-3">
                    Hay nhất
                  </Nav.Link>
                </Col>
                <Col sm={3} className=" p-0">
                  <Nav.Link href="#no-answer" eventKey="no-answer" role="button" className=" text-center p-3">
                    Chưa trả lời
                  </Nav.Link>
                </Col>
                <Col sm={3} className=" p-0">
                  <Nav.Link href="#majors" eventKey="majors" role="button" className=" text-center p-3">
                    Chuyên ngành
                  </Nav.Link>
                </Col>
              </Nav>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};
