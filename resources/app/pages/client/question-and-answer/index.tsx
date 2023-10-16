import { Container, Col, Row, Card, Button, Nav, Modal } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { ListQandAPage } from './components/list-qanda';
import { useState } from 'react';
import { TabsAskQuestion } from './components/tab-ask-question';

export const QuestionAndAnswerPage = () => {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <>
      <div id="content-page" className="content-page">
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
                  <Button
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
                    onClick={handleShow}
                  >
                    Ask Question
                  </Button>
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

          {/*============== Modal Create Ask Question =============*/}
          <Modal centered size="lg" className="fade" id="post-modal" onHide={handleClose} show={showModal}>
            <Modal.Header className="d-flex justify-content-between">
              <Modal.Title id="post-modalLabel">Ask questions</Modal.Title>
              <Link to="#" className="lh-1" onClick={handleClose}>
                <span className="material-symbols-outlined">close</span>
              </Link>
            </Modal.Header>
            <Modal.Body>
              <TabsAskQuestion />
            </Modal.Body>
          </Modal>

          {/* Danh sách câu hỏi */}
          <ListQandAPage />
        </Container>
      </div>
    </>
  );
};
