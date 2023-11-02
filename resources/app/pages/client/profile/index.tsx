import { Link, useLocation, useParams } from 'react-router-dom';
import Navbar from './components/navbar';
import { Header } from './components/header';
import { Timeline } from './timeline';
import { Row, Col, Container, Dropdown, Nav, Tab, OverlayTrigger, Tooltip, Card } from 'react-bootstrap';
import { useState } from 'react';
import { MyBlog } from './my-blog';
import { ProfileService } from '@/apis/services/profile.service';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { MyListQa } from './question-and-answer';
import { StorageFunc } from '@/utilities/local-storage/storage-func';
// images
const imageUrl = 'https://picsum.photos/20';

export const ProfilePage = () => {
  const [imageController, setImageController] = useState({
    toggler: false,
    slide: 1,
  });

  function imageOnSlide(number: any) {
    setImageController({
      toggler: !imageController.toggler,
      slide: number,
    });
  }
  let { hash } = useLocation();
  let type = hash.split('#')[1];
  let status = '';
  switch (type) {
    case 'timeline':
    case '':
      type = 'post';
      break;
    case 'blog':
      type = 'blog';
      break;
    case 'blog-pending':
      type = 'blog';
      status = 'pending';
      break;
    case 'blog-reject':
      type = 'blog';
      status = 'reject';
      break;
    case 'qa':
      type = 'qa';
      break;

    default:
      type = 'post';
      break;
  }

  const queryClient = useQueryClient();
  const { id } = useParams();
  const localUserId = StorageFunc.getUserId();
  const getDetailProfile = async () => {
    const user_id = id || localUserId;
    const { data } = await ProfileService.getDetailProfile(user_id, type, status);
    return data;
  };

  const queryKey = ['profile', type, status];
  const { data: detailProfile, isLoading } = useQuery(queryKey, getDetailProfile, {
    onSuccess: () => {
      queryClient.invalidateQueries([type, status]);
    },
  });

  const getDetailUesrProfile = async () => {
    const user_id = id || localUserId;
    const { data } = await ProfileService.getDetailUserProfile(user_id);
    return data;
  };

  const queryKeyUesr = ['user'];
  const { data: detailUserProfile, isLoading: isUserLoading } = useQuery(queryKeyUesr, getDetailUesrProfile);
  return (
    <>
      <div id="content-page" className="content-page">
        <Container>
          <Row>
            <Header detailUser={detailUserProfile} isLoading={isUserLoading} friend_id={id} />
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
              <Navbar friend_id={id} />
              <Col sm={12}>
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    {isLoading ? (
                      <>
                        <h4>Loading...</h4>
                      </>
                    ) : (
                      <>
                        <Timeline
                          about={detailUserProfile?.user}
                          listPost={detailProfile?.data}
                          isLoading={isLoading}
                          friend_id={id}
                        />
                      </>
                    )}
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    <MyBlog listBlog={detailProfile?.data[0]?.blog?.data} isLoading={isLoading} />
                  </Tab.Pane>
                  <Tab.Pane eventKey="third">
                    <Tab.Container id="left-tabs-example" defaultActiveKey="all-friends">
                      <Card>
                        <Card.Body>
                          <h2>Friends</h2>
                          <div className="friend-list-tab mt-2">
                            <Nav
                              variant="pills"
                              className=" d-flex align-items-center justify-content-left friend-list-items p-0 mb-2"
                            >
                              <Nav.Item>
                                <Nav.Link href="#pill-all-friends" eventKey="all-friends">
                                  All Friends
                                </Nav.Link>
                              </Nav.Item>
                              <Nav.Item>
                                <Nav.Link href="#pill-recently-add" eventKey="recently-add">
                                  Recently Added
                                </Nav.Link>
                              </Nav.Item>
                              <Nav.Item>
                                <Nav.Link href="#pill-closefriends" eventKey="closefriends">
                                  Close friends
                                </Nav.Link>
                              </Nav.Item>
                              <Nav.Item>
                                <Nav.Link href="#pill-home" eventKey="home-town">
                                  Home/Town
                                </Nav.Link>
                              </Nav.Item>
                              <Nav.Item>
                                <Nav.Link href="#pill-following" eventKey="following">
                                  Following
                                </Nav.Link>
                              </Nav.Item>
                            </Nav>
                            <Tab.Content>
                              <Tab.Pane eventKey="all-friends">
                                <Card.Body className="p-0">
                                  <Row>
                                    <div className="col-md-6 col-lg-6 mb-3">
                                      <div className="iq-friendlist-block">
                                        <div className="d-flex align-items-center justify-content-between">
                                          <div className="d-flex align-items-center">
                                            <Link to="#">
                                              <img
                                                loading="lazy"
                                                src={imageUrl}
                                                alt="profile-img"
                                                className="img-fluid"
                                              />
                                            </Link>
                                            <div className="friend-info ms-3">
                                              <h5>Petey Cruiser</h5>
                                              <p className="mb-0">15 friends</p>
                                            </div>
                                          </div>
                                          <div className="card-header-toolbar d-flex align-items-center">
                                            <Dropdown>
                                              <Dropdown.Toggle variant="secondary me-2 d-flex align-items-center">
                                                <i className="material-symbols-outlined me-2">done</i>
                                                Friend
                                              </Dropdown.Toggle>
                                              <Dropdown.Menu className="dropdown-menu-right">
                                                <Dropdown.Item href="#">Get Notification</Dropdown.Item>
                                                <Dropdown.Item href="#">Close Friend</Dropdown.Item>
                                                <Dropdown.Item href="#">Unfollow</Dropdown.Item>
                                                <Dropdown.Item href="#">Unfriend</Dropdown.Item>
                                                <Dropdown.Item href="#">Block</Dropdown.Item>
                                              </Dropdown.Menu>
                                            </Dropdown>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </Row>
                                </Card.Body>
                              </Tab.Pane>
                            </Tab.Content>
                          </div>
                        </Card.Body>
                      </Card>
                    </Tab.Container>
                  </Tab.Pane>
                  <Tab.Pane eventKey="forth">
                    <Tab.Container id="left-tabs-example" defaultActiveKey="p1">
                      <Card>
                        <Card.Body>
                          <h2>Photos</h2>
                          <div className="friend-list-tab mt-2">
                            <Nav
                              variant="pills"
                              className=" d-flex align-items-center justify-content-left friend-list-items p-0 mb-2"
                            >
                              <li>
                                <Nav.Link eventKey="p1" href="#pill-photosofyou">
                                  Photos of You
                                </Nav.Link>
                              </li>
                              <li>
                                <Nav.Link eventKey="p2" href="#pill-your-photos">
                                  Your Photos
                                </Nav.Link>
                              </li>
                            </Nav>
                            <Tab.Content>
                              <Tab.Pane eventKey="p1">
                                <Card.Body className="p-0">
                                  <div className="d-grid gap-2 d-grid-template-1fr-13">
                                    <div>
                                      <div className="user-images position-relative overflow-hidden">
                                        <Link onClick={() => imageOnSlide(10)} to="#">
                                          <img
                                            loading="lazy"
                                            src={imageUrl}
                                            className="img-fluid rounded"
                                            alt="Responsive"
                                          />
                                        </Link>
                                        <div className="image-hover-data">
                                          <div className="product-elements-icon">
                                            <ul className="d-flex align-items-center m-0 p-0 list-inline">
                                              <li>
                                                <Link to="#" className="pe-3 text-white d-flex align-items-center">
                                                  {' '}
                                                  60 <i className="material-symbols-outlined md-14 ms-1">
                                                    thumb_up
                                                  </i>{' '}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link to="#" className="pe-3 text-white d-flex align-items-center">
                                                  {' '}
                                                  30{' '}
                                                  <span className="material-symbols-outlined  md-14 ms-1">
                                                    chat_bubble_outline
                                                  </span>{' '}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link to="#" className="pe-3 text-white d-flex align-items-center">
                                                  {' '}
                                                  10{' '}
                                                  <span className="material-symbols-outlined md-14 ms-1">
                                                    forward
                                                  </span>{' '}
                                                </Link>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                        <OverlayTrigger placement="top" overlay={<Tooltip>Edit or Remove</Tooltip>}>
                                          <Link to="#" className="image-edit-btn material-symbols-outlined md-16">
                                            drive_file_rename_outline
                                          </Link>
                                        </OverlayTrigger>
                                      </div>
                                    </div>
                                  </div>
                                </Card.Body>
                              </Tab.Pane>
                              <Tab.Pane eventKey="p2">
                                <div className="card-body p-0">
                                  <div className="d-grid gap-2 d-grid-template-1fr-13 ">
                                    <div>
                                      <div className="user-images position-relative overflow-hidden">
                                        <Link onClick={() => imageOnSlide(33)} to="#">
                                          <img
                                            loading="lazy"
                                            src={imageUrl}
                                            className="img-fluid rounded"
                                            alt="Responsive"
                                          />
                                        </Link>
                                        <div className="image-hover-data">
                                          <div className="product-elements-icon">
                                            <ul className="d-flex align-items-center m-0 p-0 list-inline">
                                              <li>
                                                <Link to="#" className="pe-3 text-white d-flex align-items-center">
                                                  {' '}
                                                  60 <i className="material-symbols-outlined md-14 ms-1">
                                                    thumb_up
                                                  </i>{' '}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link to="#" className="pe-3 text-white d-flex align-items-center">
                                                  {' '}
                                                  30{' '}
                                                  <span className="material-symbols-outlined  md-14 ms-1">
                                                    chat_bubble_outline
                                                  </span>{' '}
                                                </Link>
                                              </li>
                                              <li>
                                                <Link to="#" className="pe-3 text-white d-flex align-items-center">
                                                  {' '}
                                                  10{' '}
                                                  <span className="material-symbols-outlined md-14 ms-1">
                                                    forward
                                                  </span>{' '}
                                                </Link>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                        <OverlayTrigger placement="top" overlay={<Tooltip>Edit or Remove</Tooltip>}>
                                          <Link to="#" className="image-edit-btn material-symbols-outlined md-16">
                                            drive_file_rename_outline
                                          </Link>
                                        </OverlayTrigger>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </Tab.Pane>
                            </Tab.Content>
                          </div>
                        </Card.Body>
                      </Card>
                    </Tab.Container>
                  </Tab.Pane>
                  <Tab.Pane eventKey="five">
                    {isLoading ? (
                      <>
                        <h4>Loading...</h4>
                      </>
                    ) : (
                      <>
                        <MyListQa listQa={detailProfile?.data[0]?.qa?.data} isLoading={isLoading} />
                      </>
                    )}
                  </Tab.Pane>
                  {/* <div className="col-sm-12 text-center">
                  <img loading="lazy" src={imageUrl} alt="loader" style={{ height: '100px' }} />
                </div> */}
                </Tab.Content>
              </Col>
            </Tab.Container>
          </Row>
        </Container>
      </div>
    </>
  );
};
