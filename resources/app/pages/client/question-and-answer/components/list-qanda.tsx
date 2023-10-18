import { Container, Col, Row, Card, Button, Nav, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const ListQandAPage = () => {
  return (
    <>
      <Container>
        <Row>
          <Col sm="12">
            <Card className="position-relative inner-page-bg bg-primary">
              <div
                className="d-flex flex-wrap align-items-center justify-content-between p-5"
                style={{ height: '100px' }}
              >
                <div className=" d-flex align-items-center text-center profile-forum-items p-0 m-0 w-75">
                  <h3 className="text-white">All Questions</h3>
                </div>
                <Link
                  to="https://getbootstrap.com/"
                  target="_blank"
                  style={{
                    display: 'inline-block',
                    padding: '6px 12px',
                    textDecoration: 'none',
                    color: '#DD300E',
                    backgroundColor: 'white',
                    border: '1px solid #DD300E',
                    borderRadius: '4px',
                    margin: '0.5rem',
                    fontWeight: '600',
                  }}
                >
                  Ask Question
                </Link>
              </div>
            </Card>
          </Col>
          <Col sm="12">
            <Card>
              <Card.Body className="p-0">
                <div className="user-tabing p-3">
                  <div className="d-flex flex-wrap align-items-center justify-content-between">
                    <Nav
                      variant="pills"
                      className="d-flex align-items-center text-center profile-forum-items p-0 m-0 w-100"
                    >
                      <Col sm={2} className=" p-0">
                        <Nav.Link eventKey="first" role="button">
                          Newest
                        </Nav.Link>
                      </Col>
                      <Col sm={2} className=" p-0">
                        {/* Câu trả lời tốt nhất, đáng tin nhất (Có lượt thích nhiều) */}
                        <Nav.Link eventKey="second" role="button">
                          Score
                        </Nav.Link>
                      </Col>
                      {/* <Col sm={2} className=" p-0">
                          <Nav.Link eventKey="third" role="button">Liked Topics</Nav.Link>
                        </Col> */}
                      <Col sm={2} className=" p-0">
                        <Nav.Link eventKey="forth" role="button">
                          Unanswered
                        </Nav.Link>
                      </Col>
                      <Col sm={2} className=" p-0">
                        <Nav.Link eventKey="fifth" role="button">
                          Bountied
                        </Nav.Link>
                      </Col>
                      <Col sm={2} className=" p-0">
                        <Nav.Link eventKey="sixth" role="button">
                          My Question
                        </Nav.Link>
                      </Col>
                    </Nav>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Danh sách câu hỏi */}
      </Container>
    </>
  );
};
