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
import { FriendsMyUserPage } from './friends';
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
    case 'commentedQuestions':
      type = 'commentedQuestions';
      break;

    default:
      type = 'post';
      break;
  }

  const queryClient = useQueryClient();
  const { id } = useParams();
  const localUserId = StorageFunc.getUserId();
  const isUser = id == undefined || id == localUserId ? true : false;
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

  const queryKeyUser = ['user'];
  const { data: detailUserProfile, isLoading: isUserLoading } = useQuery(queryKeyUser, getDetailUesrProfile);
  return (
    <>
      <div id="content-page" className="content-page">
        <Container>
          <Row>
            <Header detailUser={detailUserProfile} queryKey={queryKeyUser} isLoading={isUserLoading} isUser={isUser} />
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
              <Navbar isUser={isUser} />
              <Col sm={12}>
                <Tab.Content>
                  <Tab.Pane eventKey="first">
                    <Timeline
                      about={detailUserProfile?.user}
                      listPost={detailProfile?.listPost}
                      listImage={detailProfile?.detailTimeline?.images}
                      listFriend={detailProfile?.detailTimeline?.friend_details}
                      isLoading={isLoading}
                      friend_id={id}
                    />
                  </Tab.Pane>
                  <Tab.Pane eventKey="second">
                    {type === 'blog' && <MyBlog listBlog={detailProfile?.data[0]?.blog?.data} isLoading={isLoading} />}
                  </Tab.Pane>
                  <Tab.Pane eventKey="third">
                    <FriendsMyUserPage />
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
                    {(type === 'qa' || type === 'commentedQuestions') && (
                      <MyListQa
                        listQa={type === 'qa' ? detailProfile?.data[0]?.qa?.data : detailProfile?.data[0]?.qa?.data}
                        isLoading={isLoading}
                      />
                    )}
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Tab.Container>
          </Row>
        </Container>
      </div>
    </>
  );
};
