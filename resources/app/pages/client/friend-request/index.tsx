import { Card } from '@/components/custom';
import { useState } from 'react';
import { Row, Col, Button, Modal, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ModalDelete = ({ show, onHide, onConfirm, title }: any) => {
  return (
    <Modal size="sm" show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>{title}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Hủy bỏ
        </Button>
        <Button variant="primary" onClick={onConfirm}>
          Đồng ý
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
export const FriendRequestPage = () => {
  const [showDeleteRequest, setShowDeleteRequest] = useState(false);
  const [showDeleteSuggest, setShowDeleteSuggest] = useState(false);
  const handleDeleteRequest = () => {
    console.log('Đã xóa lời mời');
    setShowDeleteRequest(false);
  };
  const handleDeleteSuggest = () => {
    console.log('Đã xóa lời mời');
    setShowDeleteSuggest(false);
  };
  return (
    <>
      <div id="content-page" className="content-page">
        <Container>
          <Row>
            <Col sm="12">
              <Card>
                <Card.Header className="d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="card-title">Lời mời kết bạn</h4>
                  </div>
                </Card.Header>
                <Card.Body>
                  <ul className="request-list list-inline m-0 p-0">
                    <li className="d-flex align-items-center  justify-content-between flex-wrap">
                      <div className="user-img img-fluid flex-shrink-0">
                        <img
                          src={
                            'https://images.unsplash.com/photo-1682686580391-615b1f28e5ee?auto=format&fit=crop&q=60&w=600&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8'
                          }
                          alt="story-img"
                          className="rounded-circle avatar-40"
                        />
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <h6>Jaques Amole</h6>
                        <p className="mb-0">40 friends</p>
                      </div>
                      <div className="d-flex align-items-center mt-2 mt-md-0">
                        <div className="confirm-click-btn">
                          <Link to="#" className="me-3 btn btn-primary rounded confirm-btn">
                            Confirm
                          </Link>
                          <Link to="#" className="me-3 btn btn-primary rounded request-btn" style={{ display: 'none' }}>
                            View All
                          </Link>
                        </div>
                        <Link
                          to="#"
                          className="btn btn-secondary rounded"
                          data-extra-toggle="delete"
                          data-closest-elem=".item"
                          onClick={() => setShowDeleteRequest(true)}
                        >
                          Delete Request
                        </Link>
                        <ModalDelete
                          show={showDeleteRequest}
                          onHide={() => setShowDeleteRequest(false)}
                          onConfirm={handleDeleteRequest}
                          title="Bạn muốn xóa lời mời kết bạn?"
                        />
                      </div>
                    </li>
                  </ul>
                </Card.Body>
              </Card>
              <Card>
                <Card.Header className="d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="card-title">Gợi ý kết bạn</h4>
                  </div>
                </Card.Header>
                <Card.Body>
                  <ul className="request-list m-0 p-0">
                    <li className="d-flex align-items-center  flex-wrap">
                      <div className="user-img img-fluid flex-shrink-0">
                        <img
                          src={
                            'https://images.unsplash.com/photo-1682686580391-615b1f28e5ee?auto=format&fit=crop&q=60&w=600&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8'
                          }
                          alt="story-img"
                          className="rounded-circle avatar-40"
                        />
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <h6>Jen Youfelct</h6>
                        <p className="mb-0">4 friends</p>
                      </div>
                      <div className="d-flex align-items-center mt-2 mt-md-0">
                        <Link to="#" className="me-3 btn btn-primary rounded">
                          <i className="ri-user-add-line me-1"></i>Add Friend
                        </Link>
                        <Link
                          to="#"
                          className="btn btn-secondary rounded"
                          data-extra-toggle="delete"
                          data-closest-elem=".item"
                          onClick={() => setShowDeleteSuggest(true)}
                        >
                          Remove
                        </Link>
                        <ModalDelete
                          show={showDeleteSuggest}
                          onHide={() => setShowDeleteSuggest(false)}
                          onConfirm={handleDeleteSuggest}
                          title="Bạn muốn xóa gợi ý kết bạn?"
                        />
                      </div>
                    </li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};
