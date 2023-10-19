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

            {/* Danh sách câu hỏi */}
            <ListQandAPage />
          </Row>

          {/*============== Modal Create Ask Question =============*/}
          <Modal
            centered
            size="xl"
            className="fade"
            id="post-modal"
            onHide={handleClose}
            show={showModal}
            style={{ paddingTop: '60px', paddingBottom: '30px' }}
          >
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
        </Container>
      </div>
    </>
  );
};
