import { Container, Col, Row, Card, Button, Nav, Modal } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { QandAService } from '@/apis/services/qanda.service';
import { useQuery } from '@tanstack/react-query';
import { ListQandAPage } from './list-qanda';
import { CreateQandA } from './create-qanda';

export const QuestionAndAnswerPage = () => {
  const fetchQandAs = async () => {
    const { data } = await QandAService.getAllQandA();
    const qAndAsData = data;
    return qAndAsData;
  };

  const { data } = useQuery(['qa'], () => fetchQandAs());
  console.log(data);

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
                    <h3
                      className="text-white"
                      style={{ fontWeight: 'bold', fontSize: '25px', color: 'blue', textTransform: 'uppercase' }}
                    >
                      TẤT CẢ CÁC CÂU HỎI
                    </h3>
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
                    ĐẶT CÂU HỎI MỚI
                  </Button>
                </div>
              </Card>
            </Col>

            {/* Danh sách câu hỏi */}
            <ListQandAPage data={data} />
          </Row>

          {/*============== MODAL ĐẶT CÂU HỎI =============*/}
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
              <Modal.Title id="post-modalLabel">ĐẶT CÂU HỎI MỚI NGAY ! </Modal.Title>
              <Link to="#" className="lh-1" onClick={handleClose}>
                <span className="material-symbols-outlined">close</span>
              </Link>
            </Modal.Header>
            <Modal.Body>
              {/* FORM Đặt câu hỏi */}
              <CreateQandA />
            </Modal.Body>
          </Modal>
        </Container>
      </div>
    </>
  );
};
