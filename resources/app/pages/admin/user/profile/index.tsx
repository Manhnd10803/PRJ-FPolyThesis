import { Link, useLocation } from 'react-router-dom';
import { Container, Row, Col, Nav, Tab } from 'react-bootstrap';
import { Card } from '@/components/custom';
import { AdminService } from '@/apis/services/admin.service';
import { IUsersAdmin } from '@/models/user';
import { useQuery } from '@tanstack/react-query';
import noImage from '@/assets/images/no-image.png';
export const ProfileAdminPage = () => {
  const location = useLocation();
  const id = location.state && location.state.id;
  const fetchUsers = async (): Promise<IUsersAdmin> => {
    const { data } = await AdminService.getUserProfile(id);
    const userData = data.user;
    return userData;
  };

  const { data } = useQuery<IUsersAdmin>({ queryKey: ['users'], queryFn: fetchUsers });

  const fullName = data?.first_name && data?.last_name ? `${data?.first_name} ${data?.last_name}` : 'chưa cập nhật';

  const imageBanner =
    'https://marketplace.canva.com/EAENvp21inc/1/0/1600w/canva-simple-work-linkedin-banner-qt_TMRJF4m0.jpg';
  const image =
    'https://images.unsplash.com/photo-1697807650304-907257330a3e?auto=format&fit=crop&q=60&w=600&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOXx8fGVufDB8fHx8fA%3D%3D';
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
                    <div>
                      <img
                        loading="lazy"
                        src={data?.avatar || noImage}
                        alt="profile-img"
                        className="avatar-130 img-fluid rounded-circle"
                      />
                    </div>
                    <div className="profile-detail">
                      <h3 className="">{fullName} </h3>
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
                          Giới thiệu
                        </Nav.Link>
                      </Col>
                      <Col sm="4" as="li" className="nav-item col-12 p-0">
                        <Nav.Link eventKey="f3" href="#Friends">
                          Bạn bè
                        </Nav.Link>
                      </Col>
                      <Col sm="4" as="li" className="nav-item col-12 p-0">
                        <Nav.Link eventKey="f4" href="#Photos">
                          Album
                        </Nav.Link>
                      </Col>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="f2" className="fade show" id="Photos" role="tabpanel">
                        <Card>
                          <Card.Body>
                            <h4>Chuyên ngành</h4>
                            <hr />
                            <Row>
                              <Col className="col-12 ">
                                <h6 className="d-flex align-items-center gap-1">
                                  <span className="material-symbols-outlined">import_contacts</span>{' '}
                                  {data?.major?.majors_name || 'chưa cập nhật'}
                                </h6>
                              </Col>
                            </Row>

                            <h4 className="mt-3">Tổng quan</h4>
                            <hr />
                            <Row>
                              <Col className="col-3 ">
                                <h6 className="d-flex align-items-center gap-1">
                                  <span className="material-symbols-outlined">mail</span> Email
                                </h6>
                              </Col>
                              <Col className="col-9">
                                <p className="mb-0">{data?.email || 'chưa cập nhật'}</p>
                              </Col>
                              <Col className="col-3">
                                <h6 className="d-flex align-items-center gap-1">
                                  <span className="material-symbols-outlined">call</span> Di động
                                </h6>
                              </Col>
                              <Col className="col-9">
                                <p className="mb-0">{data?.phone || 'chưa cập nhật'}</p>
                              </Col>
                              <Col className="col-3">
                                <h6 className="d-flex align-items-center gap-1">
                                  <span className="material-symbols-outlined">home_pin</span> Sống tại
                                </h6>
                              </Col>
                              <Col className="col-9">
                                <p className="mb-0">{data?.address || 'chưa cập nhật'}</p>
                              </Col>
                            </Row>
                            <h4 className="mt-3">Tiểu sử</h4>
                            <hr />
                            <Row>
                              <Col className="col-9">
                                <p className="mb-0">{data?.biography || 'chưa cập nhật'}</p>
                              </Col>
                            </Row>
                            <hr />
                            <h4 className="mt-3">Thông tin cơ bản</h4>
                            <hr />
                            <Row>
                              <Col className="col-3">
                                <h6 className="d-flex align-items-center gap-1">
                                  <span className="material-symbols-outlined">cake</span> Sinh nhật
                                </h6>
                              </Col>
                              <Col className="col-9">
                                <p className="mb-0">{data?.birthday || 'chưa cập nhật'}</p>
                              </Col>

                              <Col className="col-3">
                                <h6 className="d-flex align-items-center gap-1">
                                  <span className="material-symbols-outlined">transgender</span> Giới tính
                                </h6>
                              </Col>
                              <Col className="col-9">
                                <p className="mb-0">{data?.gender || 'chưa cập nhật'}</p>
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
