import { Link } from 'react-router-dom';
import { Container, Row, Col, Nav, Tab } from 'react-bootstrap';
import { Card } from '@/components/custom';

export const ProfileAdminPage = () => {
  const imageBanner =
    'https://marketplace.canva.com/EAENvp21inc/1/0/1600w/canva-simple-work-linkedin-banner-qt_TMRJF4m0.jpg';
  const image =
    'https://images.unsplash.com/photo-1697807650304-907257330a3e?auto=format&fit=crop&q=60&w=600&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOXx8fGVufDB8fHx8fA%3D%3D';
  const imageAvata = '	http://localhost:3000/static/media/11.e3b79bb5dc4e5f425f58.png';
  return (
    <>
      <Container>
        <Row>
          <Col sm="12">
            <Card>
              <Card.Body className="profile-page p-0">
                <div className="profile-header">
                  <div className="position-relative">
                    <img loading="lazy" src={imageBanner} alt="profile-bg" className="rounded img-fluid" />
                  </div>
                  <div className="user-detail text-center mb-3">
                    <div className="profile-img">
                      <img loading="lazy" src={imageAvata} alt="profile-img" className="avatar-130 img-fluid" />
                    </div>
                    <div className="profile-detail">
                      <h3 className="">Bni Cyst</h3>
                    </div>
                  </div>
                  <div className="profile-info p-3 d-flex align-items-center justify-content-between position-relative">
                    <div className="social-links"></div>
                    <div className="social-info">
                      <ul className="social-data-block d-flex align-items-center justify-content-between list-inline p-0 m-0">
                        <li className="text-center ps-3">
                          <h6>Posts</h6>
                          <p className="mb-0">690</p>
                        </li>
                        <li className="text-center ps-3">
                          <h6>Followers</h6>
                          <p className="mb-0">206</p>
                        </li>
                        <li className="text-center ps-3">
                          <h6>Following</h6>
                          <p className="mb-0">100</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row className="mt-1">
          <Col lg="12" md="12">
            <Card>
              <Card.Body className="p-0">
                <div className="user-tabing">
                  <Tab.Container defaultActiveKey="f2">
                    <Nav
                      variant="pills"
                      className="d-flex align-items-center justify-content-center profile-feed-items p-0 m-0"
                    >
                      <Col sm="4" as="li" className="nav-item col-12 p-0">
                        <Nav.Link eventKey="f2" href="#Abouts">
                          About
                        </Nav.Link>
                      </Col>
                      <Col sm="4" as="li" className="nav-item col-12 p-0">
                        <Nav.Link eventKey="f3" href="#Friends">
                          Friends
                        </Nav.Link>
                      </Col>
                      <Col sm="4" as="li" className="nav-item col-12 p-0">
                        <Nav.Link eventKey="f4" href="#Photos">
                          Photos
                        </Nav.Link>
                      </Col>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="f2" className="fade show" id="Photos" role="tabpanel">
                        <Card>
                          <Card.Body>
                            <h4>Contact Information</h4>
                            <hr />
                            <Row>
                              <Col className="col-3">
                                <h6>Email</h6>
                              </Col>
                              <Col className="col-9">
                                <p className="mb-0">Bnijohn@gmail.com</p>
                              </Col>
                              <Col className="col-3">
                                <h6>Mobile</h6>
                              </Col>
                              <Col className="col-9">
                                <p className="mb-0">(001) 4544 565 456</p>
                              </Col>
                              <Col className="col-3">
                                <h6>Address</h6>
                              </Col>
                              <Col className="col-9">
                                <p className="mb-0">United States of America</p>
                              </Col>
                            </Row>
                            <h4 className="mt-3">Websites and Social Links</h4>
                            <hr />
                            <Row>
                              <Col className="col-3">
                                <h6>Website</h6>
                              </Col>
                              <Col className="col-9">
                                <p className="mb-0">www.bootstrap.com</p>
                              </Col>
                              <Col className="col-3">
                                <h6>Social Link</h6>
                              </Col>
                              <Col className="col-9">
                                <p className="mb-0">www.bootstrap.com</p>
                              </Col>
                            </Row>
                            <hr />
                            <h4 className="mt-3">Basic Information</h4>
                            <hr />
                            <Row>
                              <Col className="col-3">
                                <h6>Birth Date</h6>
                              </Col>
                              <Col className="col-9">
                                <p className="mb-0">24 January</p>
                              </Col>
                              <Col className="col-3">
                                <h6>Birth Year</h6>
                              </Col>
                              <Col className="col-9">
                                <p className="mb-0">1994</p>
                              </Col>
                              <Col className="col-3">
                                <h6>Gender</h6>
                              </Col>
                              <Col className="col-9">
                                <p className="mb-0">Female</p>
                              </Col>
                              <Col className="col-3">
                                <h6>interested in</h6>
                              </Col>
                              <Col className="col-9">
                                <p className="mb-0">Designing</p>
                              </Col>
                              <Col className="col-3">
                                <h6>language</h6>
                              </Col>
                              <Col className="col-9">
                                <p className="mb-0">English, French</p>
                              </Col>
                            </Row>
                          </Card.Body>
                        </Card>
                      </Tab.Pane>
                      <Tab.Pane eventKey="f3" className="fade show" id="Abouts" role="tabpanel">
                        <Card>
                          <Card.Body>
                            <ul className="request-list list-inline m-0 p-0">
                              <li className="d-flex align-items-center  flex-wrap">
                                <div className="user-img img-fluid flex-shrink-0">
                                  <img
                                    loading="lazy"
                                    src={image}
                                    alt="story-img"
                                    className="rounded-circle avatar-40"
                                  />
                                </div>
                                <div className="flex-grow-1 ms-3">
                                  <h6>Paul Misunday</h6>
                                  <p className="mb-0">6 friends</p>
                                </div>
                                <div className="d-flex align-items-center mt-2 mt-md-0">
                                  <Link to="#" className="me-3 btn btn-primary rounded">
                                    Follow
                                  </Link>
                                </div>
                              </li>
                              <li className="d-flex align-items-center  flex-wrap">
                                <div className="user-img img-fluid flex-shrink-0">
                                  <img
                                    loading="lazy"
                                    src={image}
                                    alt="story-img"
                                    className="rounded-circle avatar-40"
                                  />
                                </div>
                                <div className="flex-grow-1 ms-3">
                                  <h6>Reanne Carnation</h6>
                                  <p className="mb-0">12 friends</p>
                                </div>
                                <div className="d-flex align-items-center mt-2 mt-md-0">
                                  <Link to="#" className="me-3 btn btn-primary rounded">
                                    Follow
                                  </Link>
                                </div>
                              </li>
                              <li className="d-flex align-items-center  flex-wrap">
                                <div className="user-img img-fluid flex-shrink-0">
                                  <img
                                    loading="lazy"
                                    src={image}
                                    alt="story-img"
                                    className="rounded-circle avatar-40"
                                  />
                                </div>
                                <div className="flex-grow-1 ms-3">
                                  <h6>Reanne Carnation</h6>
                                  <p className="mb-0">12 friends</p>
                                </div>
                                <div className="d-flex align-items-center mt-2 mt-md-0">
                                  <Link to="#" className="me-3 btn btn-primary rounded">
                                    Follow
                                  </Link>
                                </div>
                              </li>
                              <li className="d-flex align-items-center  flex-wrap">
                                <div className="user-img img-fluid flex-shrink-0">
                                  <img
                                    loading="lazy"
                                    src={image}
                                    alt="story-img"
                                    className="rounded-circle avatar-40"
                                  />
                                </div>
                                <div className="flex-grow-1 ms-3">
                                  <h6>Reanne Carnation</h6>
                                  <p className="mb-0">12 friends</p>
                                </div>
                                <div className="d-flex align-items-center mt-2 mt-md-0">
                                  <Link to="#" className="me-3 btn btn-primary rounded">
                                    Follow
                                  </Link>
                                </div>
                              </li>
                              <li className="d-flex align-items-center  flex-wrap">
                                <div className="user-img img-fluid flex-shrink-0">
                                  <img
                                    loading="lazy"
                                    src={image}
                                    alt="story-img"
                                    className="rounded-circle avatar-40"
                                  />
                                </div>
                                <div className="flex-grow-1 ms-3">
                                  <h6>Reanne Carnation</h6>
                                  <p className="mb-0">15 friends</p>
                                </div>
                                <div className="d-flex align-items-center mt-2 mt-md-0">
                                  <Link to="#" className="me-3 btn btn-primary rounded">
                                    Follow
                                  </Link>
                                </div>
                              </li>
                              <li className="d-flex align-items-center  flex-wrap">
                                <div className="user-img img-fluid flex-shrink-0">
                                  <img
                                    loading="lazy"
                                    src={image}
                                    alt="story-img"
                                    className="rounded-circle avatar-40"
                                  />
                                </div>
                                <div className="flex-grow-1 ms-3">
                                  <h6>Reanne Carnation</h6>
                                  <p className="mb-0">21 friends</p>
                                </div>
                                <div className="d-flex align-items-center mt-2 mt-md-0">
                                  <Link to="#" className="me-3 btn btn-primary rounded">
                                    Follow
                                  </Link>
                                </div>
                              </li>
                            </ul>
                          </Card.Body>
                        </Card>
                      </Tab.Pane>
                      <Tab.Pane eventKey="f4" className="fade show" id="Friends" role="tabpanel">
                        <Card>
                          <div className="card-header d-flex justify-content-between">
                            <div className="header-title">
                              <h4 className="card-title">Photos</h4>
                            </div>
                            <div className="card-header-toolbar d-flex align-items-center">
                              <p className="m-0">
                                <Link to="javacsript:void();">Add Photo </Link>
                              </p>
                            </div>
                          </div>
                          <Card.Body>
                            <ul className="profile-img-gallary p-0 m-0 list-unstyled">
                              <li className="">
                                <Link to="#">
                                  <img loading="lazy" src={image} alt="gallary-img" className="img-fluid" />
                                </Link>
                              </li>
                              <li className="">
                                <Link to="#">
                                  <img loading="lazy" src={image} alt="gallary-img" className="img-fluid" />
                                </Link>
                              </li>
                              <li className="">
                                <Link to="#">
                                  <img loading="lazy" src={image} alt="gallary-img" className="img-fluid" />
                                </Link>
                              </li>
                              <li className="">
                                <Link to="#">
                                  <img loading="lazy" src={image} alt="gallary-img" className="img-fluid" />
                                </Link>
                              </li>
                              <li className="">
                                <Link to="#">
                                  <img loading="lazy" src={image} alt="gallary-img" className="img-fluid" />
                                </Link>
                              </li>
                              <li className="">
                                <Link to="#">
                                  <img loading="lazy" src={image} alt="gallary-img" className="img-fluid" />
                                </Link>
                              </li>
                              <li className="">
                                <Link to="#">
                                  <img loading="lazy" src={image} alt="gallary-img" className="img-fluid" />
                                </Link>
                              </li>
                              <li className="">
                                <Link to="#">
                                  <img loading="lazy" src={image} alt="gallary-img" className="img-fluid" />
                                </Link>
                              </li>
                              <li className="">
                                <Link to="#">
                                  <img loading="lazy" src={image} alt="gallary-img" className="img-fluid" />
                                </Link>
                              </li>
                            </ul>
                          </Card.Body>
                        </Card>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
