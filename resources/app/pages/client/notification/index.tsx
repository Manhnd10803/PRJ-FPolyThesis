import React from 'react';
import { Row, Col, Container, Dropdown, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const imageUrl = 'https://picsum.photos/20';

export const NotificationPage = () => {
  return (
    <>
      <div id="content-page" className="content-page">
        <Container>
          <Row>
            <Col sm="12">
              <h4 className="card-title mb-3">Thông báo</h4>
            </Col>
            <Col sm="12">
              <Card>
                <Card.Body>
                  <ul className="notification-list m-0 p-0">
                    <li className="d-flex align-items-center justify-content-between">
                      <div className="user-img img-fluid">
                        <img src={imageUrl} alt="story-img" className="rounded-circle avatar-40" />
                      </div>
                      <div className="w-100">
                        <div className="d-flex justify-content-between">
                          <div className=" ms-3">
                            <h6>Paige Turner Posted in UI/UX Community</h6>
                            <p className="mb-0">30 ago</p>
                          </div>
                          <div className="d-flex align-items-center">
                            <Link to="#" className="me-3 iq-notify bg-soft-primary rounded">
                              <i className="material-symbols-outlined md-18">military_tech</i>
                            </Link>
                            <div className="card-header-toolbar d-flex align-items-center">
                              <Dropdown>
                                <Link to="#">
                                  <Dropdown.Toggle as="span" className="material-symbols-outlined">
                                    more_horiz
                                  </Dropdown.Toggle>
                                </Link>
                                <Dropdown.Menu className="dropdown-menu-right">
                                  <Dropdown.Item to="#">
                                    <i className="ri-eye-fill me-2"></i>View
                                  </Dropdown.Item>
                                  <Dropdown.Item to="#">
                                    <i className="ri-delete-bin-6-fill me-2"></i>Delete
                                  </Dropdown.Item>
                                  <Dropdown.Item to="#">
                                    <i className="ri-pencil-fill me-2"></i>Edit
                                  </Dropdown.Item>
                                  <Dropdown.Item to="#">
                                    <i className="ri-printer-fill me-2"></i>Print
                                  </Dropdown.Item>
                                  <Dropdown.Item to="#">
                                    <i className="ri-file-download-fill me-2"></i>Download
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                  <ul className="notification-list m-0 p-0">
                    <li className="d-flex align-items-center justify-content-between">
                      <div className="user-img img-fluid">
                        <img src={imageUrl} alt="story-img" className="rounded-circle avatar-40" />
                      </div>
                      <div className="w-100">
                        <div className="d-flex justify-content-between">
                          <div className=" ms-3">
                            <h6>Anne Fibbiyon Like Your Post</h6>
                            <p className="mb-0">15 ago</p>
                          </div>
                          <div className="d-flex align-items-center">
                            <Link to="#" className="me-3 iq-notify bg-soft-danger rounded">
                              <i className="material-symbols-outlined md-18">favorite_border</i>
                            </Link>
                            <div className="card-header-toolbar d-flex align-items-center">
                              <Dropdown>
                                <Link to="#">
                                  <Dropdown.Toggle as="span" className="material-symbols-outlined">
                                    more_horiz
                                  </Dropdown.Toggle>
                                </Link>
                                <Dropdown.Menu className="dropdown-menu-right">
                                  <Dropdown.Item to="#">
                                    <i className="ri-eye-fill me-2"></i>View
                                  </Dropdown.Item>
                                  <Dropdown.Item to="#">
                                    <i className="ri-delete-bin-6-fill me-2"></i>Delete
                                  </Dropdown.Item>
                                  <Dropdown.Item to="#">
                                    <i className="ri-pencil-fill me-2"></i>Edit
                                  </Dropdown.Item>
                                  <Dropdown.Item to="#">
                                    <i className="ri-printer-fill me-2"></i>Print
                                  </Dropdown.Item>
                                  <Dropdown.Item to="#">
                                    <i className="ri-file-download-fill me-2"></i>Download
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                  <ul className="notification-list m-0 p-0">
                    <li className="d-flex align-items-center justify-content-between">
                      <div className="user-img img-fluid">
                        <img src={imageUrl} alt="story-img" className="rounded-circle avatar-40" />
                      </div>
                      <div className="w-100">
                        <div className="d-flex justify-content-between">
                          <div className="ms-3">
                            <h6>Barry Cuda add Story</h6>
                            <p className="mb-0">40 ago</p>
                          </div>
                          <div className="d-flex align-items-center">
                            <Link to="#" className="me-3 iq-notify bg-soft-primary rounded">
                              <i className="material-symbols-outlined md-18">military_tech</i>
                            </Link>
                            <div className="card-header-toolbar d-flex align-items-center">
                              <Dropdown>
                                <Link to="#">
                                  <Dropdown.Toggle as="span" className="material-symbols-outlined">
                                    more_horiz
                                  </Dropdown.Toggle>
                                </Link>
                                <Dropdown.Menu className="dropdown-menu-right">
                                  <Dropdown.Item to="#">
                                    <i className="ri-eye-fill me-2"></i>View
                                  </Dropdown.Item>
                                  <Dropdown.Item to="#">
                                    <i className="ri-delete-bin-6-fill me-2"></i>Delete
                                  </Dropdown.Item>
                                  <Dropdown.Item to="#">
                                    <i className="ri-pencil-fill me-2"></i>Edit
                                  </Dropdown.Item>
                                  <Dropdown.Item to="#">
                                    <i className="ri-printer-fill me-2"></i>Print
                                  </Dropdown.Item>
                                  <Dropdown.Item to="#">
                                    <i className="ri-file-download-fill me-2"></i>Download
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                  <ul className="notification-list m-0 p-0">
                    <li className="d-flex align-items-center justify-content-between">
                      <div className="user-img img-fluid">
                        <img src={imageUrl} alt="story-img" className="rounded-circle avatar-40" />
                      </div>
                      <div className="w-100">
                        <div className="d-flex justify-content-between">
                          <div className="ms-3">
                            <h6>Cliff Hanger posted a comment on your status update</h6>
                            <p className="mb-0">42 ago</p>
                          </div>
                          <div className="d-flex align-items-center">
                            <Link to="#" className="me-3 iq-notify bg-soft-success rounded">
                              <i className="material-symbols-outlined md-16">chat_bubble_outline</i>
                            </Link>
                            <div className="card-header-toolbar d-flex align-items-center">
                              <Dropdown>
                                <Link to="#">
                                  <Dropdown.Toggle as="span" className="material-symbols-outlined">
                                    more_horiz
                                  </Dropdown.Toggle>
                                </Link>
                                <Dropdown.Menu className="dropdown-menu-right">
                                  <Dropdown.Item to="#">
                                    <i className="ri-eye-fill me-2"></i>View
                                  </Dropdown.Item>
                                  <Dropdown.Item to="#">
                                    <i className="ri-delete-bin-6-fill me-2"></i>Delete
                                  </Dropdown.Item>
                                  <Dropdown.Item to="#">
                                    <i className="ri-pencil-fill me-2"></i>Edit
                                  </Dropdown.Item>
                                  <Dropdown.Item to="#">
                                    <i className="ri-printer-fill me-2"></i>Print
                                  </Dropdown.Item>
                                  <Dropdown.Item to="#">
                                    <i className="ri-file-download-fill me-2"></i>Download
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                  <ul className="notification-list m-0 p-0">
                    <li className="d-flex align-items-center justify-content-between">
                      <div className="user-img img-fluid">
                        <img src={imageUrl} alt="story-img" className="rounded-circle avatar-40" />
                      </div>
                      <div className="w-100">
                        <div className="d-flex justify-content-between">
                          <div className="ms-3">
                            <h6>Rick O'Shea posted a comment on your photo</h6>
                            <p className="mb-0">50 ago</p>
                          </div>
                          <div className="d-flex align-items-center">
                            <Link to="#" className="me-3 iq-notify bg-soft-success rounded">
                              <i className="material-symbols-outlined md-16">chat_bubble_outline</i>
                            </Link>
                            <div className="card-header-toolbar d-flex align-items-center">
                              <Dropdown>
                                <Link to="#">
                                  <Dropdown.Toggle as="span" className="material-symbols-outlined">
                                    more_horiz
                                  </Dropdown.Toggle>
                                </Link>
                                <Dropdown.Menu className="dropdown-menu-right">
                                  <Dropdown.Item to="#">
                                    <i className="ri-eye-fill me-2"></i>View
                                  </Dropdown.Item>
                                  <Dropdown.Item to="#">
                                    <i className="ri-delete-bin-6-fill me-2"></i>Delete
                                  </Dropdown.Item>
                                  <Dropdown.Item to="#">
                                    <i className="ri-pencil-fill me-2"></i>Edit
                                  </Dropdown.Item>
                                  <Dropdown.Item to="#">
                                    <i className="ri-printer-fill me-2"></i>Print
                                  </Dropdown.Item>
                                  <Dropdown.Item to="#">
                                    <i className="ri-file-download-fill me-2"></i>Download
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                  <ul className="notification-list m-0 p-0">
                    <li className="d-flex align-items-center justify-content-between">
                      <div className="user-img img-fluid">
                        <img src={imageUrl} alt="story-img" className="rounded-circle avatar-40" />
                      </div>
                      <div className="w-100">
                        <div className="d-flex justify-content-between">
                          <div className=" ms-3">
                            <h6>Sal Monella Add Photo with You</h6>
                            <p className="mb-0">1 month ago</p>
                          </div>
                          <div className="d-flex align-items-center">
                            <Link to="#" className="me-3 iq-notify bg-soft-primary rounded">
                              <i className="material-symbols-outlined md-18">military_tech</i>
                            </Link>
                            <div className="card-header-toolbar d-flex align-items-center">
                              <Dropdown>
                                <Link to="#">
                                  <Dropdown.Toggle as="span" className="material-symbols-outlined">
                                    more_horiz
                                  </Dropdown.Toggle>
                                </Link>
                                <Dropdown.Menu className="dropdown-menu-right">
                                  <Dropdown.Item to="#">
                                    <i className="ri-eye-fill me-2"></i>View
                                  </Dropdown.Item>
                                  <Dropdown.Item to="#">
                                    <i className="ri-delete-bin-6-fill me-2"></i>Delete
                                  </Dropdown.Item>
                                  <Dropdown.Item to="#">
                                    <i className="ri-pencil-fill me-2"></i>Edit
                                  </Dropdown.Item>
                                  <Dropdown.Item to="#">
                                    <i className="ri-printer-fill me-2"></i>Print
                                  </Dropdown.Item>
                                  <Dropdown.Item to="#">
                                    <i className="ri-file-download-fill me-2"></i>Download
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                  <ul className="notification-list m-0 p-0">
                    <li className="d-flex align-items-center justify-content-between">
                      <div className="user-img img-fluid">
                        <img src={imageUrl} alt="story-img" className="rounded-circle avatar-40" />
                      </div>
                      <div className="w-100">
                        <div className="d-flex justify-content-between">
                          <div className="ms-3">
                            <h6>Barb Dwyer commented on your new profile status</h6>
                            <p className="mb-0">2 month ago</p>
                          </div>
                          <div className="d-flex align-items-center">
                            <Link to="#" className="me-3 iq-notify bg-soft-success rounded">
                              <i className="material-symbols-outlined md-16">chat_bubble_outline</i>
                            </Link>
                            <div className="card-header-toolbar d-flex align-items-center">
                              <Dropdown>
                                <Link to="#">
                                  <Dropdown.Toggle as="span" className="material-symbols-outlined">
                                    more_horiz
                                  </Dropdown.Toggle>
                                </Link>
                                <Dropdown.Menu className="dropdown-menu-right">
                                  <Dropdown.Item to="#">
                                    <i className="ri-eye-fill me-2"></i>View
                                  </Dropdown.Item>
                                  <Dropdown.Item to="#">
                                    <i className="ri-delete-bin-6-fill me-2"></i>Delete
                                  </Dropdown.Item>
                                  <Dropdown.Item to="#">
                                    <i className="ri-pencil-fill me-2"></i>Edit
                                  </Dropdown.Item>
                                  <Dropdown.Item to="#">
                                    <i className="ri-printer-fill me-2"></i>Print
                                  </Dropdown.Item>
                                  <Dropdown.Item to="#">
                                    <i className="ri-file-download-fill me-2"></i>Download
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                  <ul className="notification-list m-0 p-0">
                    <li className="d-flex align-items-center justify-content-between">
                      <div className="user-img img-fluid">
                        <img src={imageUrl} alt="story-img" className="rounded-circle avatar-40" />
                      </div>
                      <div className="w-100">
                        <div className="d-flex justify-content-between">
                          <div className="info ms-3">
                            <h6>Terry Aki commented on your new profile status</h6>
                            <p className="mb-0">2 month ago</p>
                          </div>
                          <div className="d-flex align-items-center">
                            <Link to="#" className="me-3 iq-notify bg-soft-success rounded">
                              <i className="material-symbols-outlined md-16">chat_bubble_outline</i>
                            </Link>
                            <div className="card-header-toolbar d-flex align-items-center">
                              <Dropdown>
                                <Link to="#">
                                  <Dropdown.Toggle as="span" className="material-symbols-outlined">
                                    more_horiz
                                  </Dropdown.Toggle>
                                </Link>
                                <Dropdown.Menu className="dropdown-menu-right">
                                  <Dropdown.Item to="#">
                                    <i className="ri-eye-fill me-2"></i>View
                                  </Dropdown.Item>
                                  <Dropdown.Item to="#">
                                    <i className="ri-delete-bin-6-fill me-2"></i>Delete
                                  </Dropdown.Item>
                                  <Dropdown.Item to="#">
                                    <i className="ri-pencil-fill me-2"></i>Edit
                                  </Dropdown.Item>
                                  <Dropdown.Item to="#">
                                    <i className="ri-printer-fill me-2"></i>Print
                                  </Dropdown.Item>
                                  <Dropdown.Item to="#">
                                    <i className="ri-file-download-fill me-2"></i>Download
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </Card.Body>
              </Card>
              <Card>
                <Card.Body>
                  <ul className="notification-list m-0 p-0">
                    <li className="d-flex align-items-center justify-content-between">
                      <div className="user-img img-fluid">
                        <img src={imageUrl} alt="story-img" className="rounded-circle avatar-40" />
                      </div>
                      <div className="w-100">
                        <div className="d-flex justify-content-between">
                          <div className=" ms-3">
                            <h6>Paige Turner Posted in Development Community</h6>
                            <p className="mb-0">3 month ago</p>
                          </div>
                          <div className="d-flex align-items-center">
                            <Link to="#" className="me-3 iq-notify bg-soft-primary rounded">
                              <i className="material-symbols-outlined md-18 ">military_tech</i>
                            </Link>
                            <div className="card-header-toolbar d-flex align-items-center">
                              <Dropdown>
                                <Link to="#">
                                  <Dropdown.Toggle as="span" className="material-symbols-outlined">
                                    more_horiz
                                  </Dropdown.Toggle>
                                </Link>
                                <Dropdown.Menu className="dropdown-menu-right">
                                  <Dropdown.Item to="#">
                                    <i className="ri-eye-fill me-2"></i>View
                                  </Dropdown.Item>
                                  <Dropdown.Item to="#">
                                    <i className="ri-delete-bin-6-fill me-2"></i>Delete
                                  </Dropdown.Item>
                                  <Dropdown.Item to="#">
                                    <i className="ri-pencil-fill me-2"></i>Edit
                                  </Dropdown.Item>
                                  <Dropdown.Item to="#">
                                    <i className="ri-printer-fill me-2"></i>Print
                                  </Dropdown.Item>
                                  <Dropdown.Item to="#">
                                    <i className="ri-file-download-fill me-2"></i>Download
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                          </div>
                        </div>
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
