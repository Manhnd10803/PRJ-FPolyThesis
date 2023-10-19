import { Row, Col, Nav, Tab, Dropdown, Badge, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Card, CustomToggle, ShareOffCanvas } from '@/components/custom';
const imageUrl = 'https://picsum.photos/20';
export const ListQandAPage = () => {
  return (
    <>
      {/* Danh sách câu hỏi */}

      <Card>
        <Card.Body className="p-0">
          <div className="user-tabing">
            <Tab.Container defaultActiveKey="f1">
              {/* <Nav  variant="pills" className="d-flex align-items-center justify-content-center profile-feed-items p-0 m-0">
                <Col sm="3" as="li" className="nav-item col-12 p-0">
                  <Nav.Link eventKey="f1" href="#Posts">Posts</Nav.Link>
                </Col>
                <Col sm="3" as="li" className="nav-item col-12 p-0">
                  <Nav.Link eventKey="f2" href="#Abouts">About</Nav.Link>
                </Col>
                <Col sm="3" as="li" className="nav-item col-12 p-0">
                  <Nav.Link eventKey="f3" href="#Friends">Friends</Nav.Link>
                </Col>
                <Col sm="3" as="li" className="nav-item col-12 p-0">
                  <Nav.Link eventKey="f4" href="#Photos">Photos</Nav.Link>
                </Col>
              </Nav> */}
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
                            <Nav.Link eventKey="f1" role="button">
                              Newest
                            </Nav.Link>
                          </Col>
                          <Col sm={2} className=" p-0">
                            {/* Câu trả lời tốt nhất, đáng tin nhất (Có lượt thích nhiều) */}
                            <Nav.Link eventKey="f2" role="button">
                              Score
                            </Nav.Link>
                          </Col>
                          {/* <Col sm={2} className=" p-0">
                          <Nav.Link eventKey="" role="button">Liked Topics</Nav.Link>
                          </Col> */}
                          <Col sm={2} className=" p-0">
                            <Nav.Link eventKey="f3" role="button">
                              Unanswered
                            </Nav.Link>
                          </Col>
                          <Col sm={2} className=" p-0">
                            <Nav.Link eventKey="f4" role="button">
                              Bountied
                            </Nav.Link>
                          </Col>
                          <Col sm={2} className=" p-0">
                            <Nav.Link eventKey="f5" role="button">
                              My Question
                            </Nav.Link>
                          </Col>
                        </Nav>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              <Tab.Content>
                <Tab.Pane eventKey="f1" className="fade show" id="Posts" role="tabpanel">
                  <Card>
                    <Card.Body>
                      <div className="borderbox1 mt-3 rounded d-flex rounded">
                        <div className="user-img me-2">
                          <img loading="lazy" src={imageUrl} alt="userimg" className="avatar-40 rounded-circle" />
                        </div>

                        <div className="borderbox border rounded p-2">
                          <div className="d-flex align-items-center flex-wrap">
                            <h5>User Name</h5>
                            <span className="text-primary ms-1 d-flex align-items-center">
                              <i className="material-symbols-outlined me-2 text-primary md-16">check_circle</i>
                            </span>
                            <Link to="#" className="mb-0">
                              Chuyên ngành
                            </Link>
                            <div className="ms-auto d-flex align-items-center">
                              <i className="material-symbols-outlined md-16">schedule</i>
                              <span className="mx-1">
                                <small>2 hours</small>
                              </span>
                            </div>
                          </div>

                          <h6>Text</h6>

                          <p>
                            ReactQuill 2 is here, baby! And it brings a full port to TypeScript and React 16+, a
                            refactored build system, and a general tightening of the internal logic. We worked hard to
                            avoid introducing any behavioral changes. For the vast majority of the cases, no migration
                            is necessary at all. However, support for long-deprecated props, the ReactQuill Mixin, and
                            the Toolbar component have been removed. Be sure to read the migration guide.
                          </p>
                          <Row className="mt-2">
                            {/* IMAGE */}
                            {/* <Col lg="4" md="6" className="mt-1">
                              <img loading="lazy" src={imageUrl} className="img-fluid rounded" alt="Responsive img" />
                            </Col>
                            <Col lg="4" md="6" className="mt-1">
                              <img loading="lazy" src={imageUrl} className="img-fluid rounded" alt="Responsive img" />
                            </Col>
                            <Col lg="4" md="6" className="mt-1">
                              <img loading="lazy" src={imageUrl} className="img-fluid rounded" alt="Responsive img" />
                            </Col> */}
                          </Row>
                          <div>
                            <Badge as={Link} bg="" to="#" className="badge border border-danger text-danger mt-2 h-1">
                              {' '}
                              #All Hash Tag
                            </Badge>{' '}
                          </div>
                          <div className="d-flex flex-wrap justify-content-evenly mb-0 mt-2">
                            <div className="d-flex align-items-center">
                              <i className="material-symbols-outlined md-16"> thumb_up </i>
                              <h6 className="ms-2">426</h6>
                            </div>
                            <hr className="hr-vertical" />
                            <div className="d-flex align-items-center">
                              <i className="material-symbols-outlined md-16"> chat_bubble_outline </i>
                              <h6 className="ms-2">32</h6>
                            </div>
                            <hr className="hr-vertical" />
                            <div className="d-flex align-items-center">
                              <i className="material-symbols-outlined md-16"> thumb_down </i>
                              <h6 className="ms-2">426</h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Tab.Pane>

                <Tab.Pane eventKey="f2" className="fade show" id="Photos" role="tabpanel">
                  <Card>
                    <Card.Body>
                      <div className="borderbox1 mt-3 rounded d-flex rounded">
                        <div className="user-img me-2">
                          <img loading="lazy" src={imageUrl} alt="userimg" className="avatar-40 rounded-circle" />
                        </div>

                        <div className="borderbox border rounded p-2">
                          <div className="d-flex align-items-center flex-wrap">
                            <h5>User Name</h5>
                            <span className="text-primary ms-1 d-flex align-items-center">
                              <i className="material-symbols-outlined me-2 text-primary md-16">check_circle</i>
                            </span>
                            <Link to="#" className="mb-0">
                              Chuyên ngành
                            </Link>
                            <div className="ms-auto d-flex align-items-center">
                              <i className="material-symbols-outlined md-16">schedule</i>
                              <span className="mx-1">
                                <small>2 hours</small>
                              </span>
                            </div>
                          </div>
                          <div>
                            <h6>All Hash Tag</h6>
                          </div>

                          <p>
                            ReactQuill 2 is here, baby! And it brings a full port to TypeScript and React 16+, a
                            refactored build system, and a general tightening of the internal logic. We worked hard to
                            avoid introducing any behavioral changes. For the vast majority of the cases, no migration
                            is necessary at all. However, support for long-deprecated props, the ReactQuill Mixin, and
                            the Toolbar component have been removed. Be sure to read the migration guide.
                          </p>
                          <Row className="mt-2">
                            {/* IMAGE */}
                            {/* <Col lg="4" md="6" className="mt-1">
                              <img loading="lazy" src={imageUrl} className="img-fluid rounded" alt="Responsive img" />
                            </Col>
                            <Col lg="4" md="6" className="mt-1">
                              <img loading="lazy" src={imageUrl} className="img-fluid rounded" alt="Responsive img" />
                            </Col>
                            <Col lg="4" md="6" className="mt-1">
                              <img loading="lazy" src={imageUrl} className="img-fluid rounded" alt="Responsive img" />
                            </Col> */}
                          </Row>
                          <div className="d-flex flex-wrap justify-content-evenly mb-0 mt-2">
                            <div className="d-flex align-items-center">
                              <i className="material-symbols-outlined md-16"> thumb_up </i>
                              <h6 className="ms-2">426</h6>
                            </div>
                            <hr className="hr-vertical" />
                            <div className="d-flex align-items-center">
                              <i className="material-symbols-outlined md-16"> chat_bubble_outline </i>
                              <h6 className="ms-2">32</h6>
                            </div>
                            <hr className="hr-vertical" />
                            <div className="d-flex align-items-center">
                              <i className="material-symbols-outlined md-16"> thumb_down </i>
                              <h6 className="ms-2">426</h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Tab.Pane>

                <Tab.Pane eventKey="f3" className="fade show" id="Abouts" role="tabpanel">
                  <Card>
                    <Card.Body>
                      <div className="borderbox1 mt-3 rounded d-flex rounded">
                        <div className="user-img me-2">
                          <img loading="lazy" src={imageUrl} alt="userimg" className="avatar-40 rounded-circle" />
                        </div>

                        <div className="borderbox border rounded p-2">
                          <div className="d-flex align-items-center flex-wrap">
                            <h5>User Name</h5>
                            <span className="text-primary ms-1 d-flex align-items-center">
                              <i className="material-symbols-outlined me-2 text-primary md-16">check_circle</i>
                            </span>
                            <Link to="#" className="mb-0">
                              Chuyên ngành
                            </Link>
                            <div className="ms-auto d-flex align-items-center">
                              <i className="material-symbols-outlined md-16">schedule</i>
                              <span className="mx-1">
                                <small>2 hours</small>
                              </span>
                            </div>
                          </div>
                          <div>
                            <h6>All Hash Tag</h6>
                          </div>

                          <p>
                            ReactQuill 2 is here, baby! And it brings a full port to TypeScript and React 16+, a
                            refactored build system, and a general tightening of the internal logic. We worked hard to
                            avoid introducing any behavioral changes. For the vast majority of the cases, no migration
                            is necessary at all. However, support for long-deprecated props, the ReactQuill Mixin, and
                            the Toolbar component have been removed. Be sure to read the migration guide.
                          </p>
                          <Row className="mt-2">
                            {/* IMAGE */}
                            {/* <Col lg="4" md="6" className="mt-1">
                              <img loading="lazy" src={imageUrl} className="img-fluid rounded" alt="Responsive img" />
                            </Col>
                            <Col lg="4" md="6" className="mt-1">
                              <img loading="lazy" src={imageUrl} className="img-fluid rounded" alt="Responsive img" />
                            </Col>
                            <Col lg="4" md="6" className="mt-1">
                              <img loading="lazy" src={imageUrl} className="img-fluid rounded" alt="Responsive img" />
                            </Col> */}
                          </Row>
                          <div className="d-flex flex-wrap justify-content-evenly mb-0 mt-2">
                            <div className="d-flex align-items-center">
                              <i className="material-symbols-outlined md-16"> thumb_up </i>
                              <h6 className="ms-2">426</h6>
                            </div>
                            <hr className="hr-vertical" />
                            <div className="d-flex align-items-center">
                              <i className="material-symbols-outlined md-16"> chat_bubble_outline </i>
                              <h6 className="ms-2">32</h6>
                            </div>
                            <hr className="hr-vertical" />
                            <div className="d-flex align-items-center">
                              <i className="material-symbols-outlined md-16"> thumb_down </i>
                              <h6 className="ms-2">426</h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Tab.Pane>

                <Tab.Pane eventKey="f4" className="fade show" id="Friends" role="tabpanel">
                  <Card>
                    <Card.Body>
                      <div className="borderbox1 mt-3 rounded d-flex rounded">
                        <div className="user-img me-2">
                          <img loading="lazy" src={imageUrl} alt="userimg" className="avatar-40 rounded-circle" />
                        </div>

                        <div className="borderbox border rounded p-2">
                          <div className="d-flex align-items-center flex-wrap">
                            <h5>User Name</h5>
                            <span className="text-primary ms-1 d-flex align-items-center">
                              <i className="material-symbols-outlined me-2 text-primary md-16">check_circle</i>
                            </span>
                            <Link to="#" className="mb-0">
                              Chuyên ngành
                            </Link>
                            <div className="ms-auto d-flex align-items-center">
                              <i className="material-symbols-outlined md-16">schedule</i>
                              <span className="mx-1">
                                <small>2 hours</small>
                              </span>
                            </div>
                          </div>
                          <div>
                            <h6>All Hash Tag</h6>
                          </div>

                          <p>
                            ReactQuill 2 is here, baby! And it brings a full port to TypeScript and React 16+, a
                            refactored build system, and a general tightening of the internal logic. We worked hard to
                            avoid introducing any behavioral changes. For the vast majority of the cases, no migration
                            is necessary at all. However, support for long-deprecated props, the ReactQuill Mixin, and
                            the Toolbar component have been removed. Be sure to read the migration guide.
                          </p>
                          <Row className="mt-2">
                            {/* IMAGE */}
                            {/* <Col lg="4" md="6" className="mt-1">
                              <img loading="lazy" src={imageUrl} className="img-fluid rounded" alt="Responsive img" />
                            </Col>
                            <Col lg="4" md="6" className="mt-1">
                              <img loading="lazy" src={imageUrl} className="img-fluid rounded" alt="Responsive img" />
                            </Col>
                            <Col lg="4" md="6" className="mt-1">
                              <img loading="lazy" src={imageUrl} className="img-fluid rounded" alt="Responsive img" />
                            </Col> */}
                          </Row>
                          <div className="d-flex flex-wrap justify-content-evenly mb-0 mt-2">
                            <div className="d-flex align-items-center">
                              <i className="material-symbols-outlined md-16"> thumb_up </i>
                              <h6 className="ms-2">426</h6>
                            </div>
                            <hr className="hr-vertical" />
                            <div className="d-flex align-items-center">
                              <i className="material-symbols-outlined md-16"> chat_bubble_outline </i>
                              <h6 className="ms-2">32</h6>
                            </div>
                            <hr className="hr-vertical" />
                            <div className="d-flex align-items-center">
                              <i className="material-symbols-outlined md-16"> thumb_down </i>
                              <h6 className="ms-2">426</h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Tab.Pane>

                <Tab.Pane eventKey="f5" className="fade show" id="Abouts" role="tabpanel">
                  <Card>
                    <Card.Body>
                      <div className="borderbox1 mt-3 rounded d-flex rounded">
                        <div className="user-img me-2">
                          <img loading="lazy" src={imageUrl} alt="userimg" className="avatar-40 rounded-circle" />
                        </div>

                        <div className="borderbox border rounded p-2">
                          <div className="d-flex align-items-center flex-wrap">
                            <h5>User Name</h5>
                            <span className="text-primary ms-1 d-flex align-items-center">
                              <i className="material-symbols-outlined me-2 text-primary md-16">check_circle</i>
                            </span>
                            <Link to="#" className="mb-0">
                              Chuyên ngành
                            </Link>
                            <div className="ms-auto d-flex align-items-center">
                              <i className="material-symbols-outlined md-16">schedule</i>
                              <span className="mx-1">
                                <small>2 hours</small>
                              </span>
                            </div>
                          </div>
                          <div>
                            <h6>All Hash Tag</h6>
                          </div>

                          <p>
                            ReactQuill 2 is here, baby! And it brings a full port to TypeScript and React 16+, a
                            refactored build system, and a general tightening of the internal logic. We worked hard to
                            avoid introducing any behavioral changes. For the vast majority of the cases, no migration
                            is necessary at all. However, support for long-deprecated props, the ReactQuill Mixin, and
                            the Toolbar component have been removed. Be sure to read the migration guide.
                          </p>
                          <Row className="mt-2">
                            {/* IMAGE */}
                            {/* <Col lg="4" md="6" className="mt-1">
                              <img loading="lazy" src={imageUrl} className="img-fluid rounded" alt="Responsive img" />
                            </Col>
                            <Col lg="4" md="6" className="mt-1">
                              <img loading="lazy" src={imageUrl} className="img-fluid rounded" alt="Responsive img" />
                            </Col>
                            <Col lg="4" md="6" className="mt-1">
                              <img loading="lazy" src={imageUrl} className="img-fluid rounded" alt="Responsive img" />
                            </Col> */}
                          </Row>
                          <div className="d-flex flex-wrap justify-content-evenly mb-0 mt-2">
                            <div className="d-flex align-items-center">
                              <i className="material-symbols-outlined md-16"> thumb_up </i>
                              <h6 className="ms-2">426</h6>
                            </div>
                            <hr className="hr-vertical" />
                            <div className="d-flex align-items-center">
                              <i className="material-symbols-outlined md-16"> chat_bubble_outline </i>
                              <h6 className="ms-2">32</h6>
                            </div>
                            <hr className="hr-vertical" />
                            <div className="d-flex align-items-center">
                              <i className="material-symbols-outlined md-16"> thumb_down </i>
                              <h6 className="ms-2">426</h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};
