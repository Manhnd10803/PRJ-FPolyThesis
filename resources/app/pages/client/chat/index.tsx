import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Form, Tab, Nav, Button, Dropdown, Container, Card } from 'react-bootstrap';
const imageUrl = 'https://picsum.photos/20';

export const ChatPage = () => {
  const [show, setShow] = useState('');
  const [show1, setShow1] = useState('true'); // Đảm bảo biến show1 được cài đặt là 'true' ban đầu
  const [show2, setShow2] = useState('');

  useEffect(() => {
    // Gọi hàm ChatSidebar khi trang web được tải lên để hiển thị Chat Sidebar mà không cần click.
    ChatSidebar();
  }, []); // Sử dụng useEffect để đảm bảo gọi chỉ một lần khi trang web được tải lên

  const ChatSidebar = () => {
    setShow('first'); // Đảm bảo show ban đầu là 'first' để hiển thị Chat Sidebar
    document.getElementsByClassName('scroller')[0].classList.add('show');
  };

  const ChatSidebarClose = () => {
    document.getElementsByClassName('scroller')[0].classList.remove('show');
  };
  return (
    <>
      <div id="content-page" className="content-page">
        {/* <h1>ChatPage</h1> */}
        <Row>
          <Col sm="2"></Col>
          <Col sm="10">
            <Card>
              <Card.Body className="chat-page p-0">
                <div className="chat-data-block">
                  <Row>
                    <Col lg={2} className="chat-data-left scroller">
                      <div className="chat-search pt-3 ps-3">
                        <div className="d-flex align-items-center">
                          <div className="chat-profile me-3">
                            <img
                              loading="lazy"
                              src={imageUrl}
                              alt="chat-user"
                              className="avatar-60 "
                              onClick={() => setShow1('true')}
                            />
                          </div>
                          <div className="chat-caption">
                            <h5 className="mb-0">Bni Jordan</h5>
                            <p className="m-0">Web Designer</p>
                          </div>
                        </div>

                        <div id="user-detail-popup" className={`scroller ${show1 === 'true' ? 'show' : ''}`}>
                          <div className="user-profile">
                            <Button type="submit" onClick={ChatSidebarClose} variant=" close-popup p-3">
                              <i className="material-symbols-outlined md-18" onClick={() => setShow1('false')}>
                                close
                              </i>
                            </Button>

                            <div className="user text-center mb-4">
                              <Link className="avatar m-0" to="">
                                <img loading="lazy" src={imageUrl} alt="avatar" />
                              </Link>

                              <div className="user-name mt-4">
                                <h4 className="text-center">Bni Jordan</h4>
                              </div>

                              <div className="user-desc">
                                <p className="text-center">Web Designer</p>
                              </div>
                            </div>

                            <hr />

                            <div className="user-detail text-left mt-4 ps-4 pe-4">
                              <h5 className="mt-4 mb-4">About</h5>
                              <p>It is long established fact that a reader will be distracted bt the reddable.</p>
                              <h5 className="mt-3 mb-3">Status</h5>
                              <ul className="user-status p-0">
                                <li className="mb-1">
                                  <i className="ri-checkbox-blank-circle-fill text-success pe-1"></i>
                                  <span>Online</span>
                                </li>
                                <li className="mb-1">
                                  <i className="ri-checkbox-blank-circle-fill text-warning pe-1"></i>
                                  <span>Away</span>
                                </li>
                                <li className="mb-1">
                                  <i className="ri-checkbox-blank-circle-fill text-danger pe-1"></i>
                                  <span>Do Not Disturb</span>
                                </li>
                                <li className="mb-1">
                                  <i className="ri-checkbox-blank-circle-fill text-light pe-1"></i>
                                  <span>Offline</span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="chat-searchbar mt-4">
                          <Form.Group className="form-group chat-search-data m-0">
                            <input type="text" className="form-control round" id="chat-search" placeholder="Search" />
                            <i className="material-symbols-outlined"> search </i>
                          </Form.Group>
                        </div>
                      </div>
                      <div className="chat-sidebar-channel scroller mt-4 ps-3">
                        <h5>Public Channels</h5>
                        <Nav as="ul" variant="pills" className="iq-chat-ui nav flex-column">
                          <Nav.Item as="li">
                            <Nav.Link eventKey="first" href="#chatbox1">
                              <div className="d-flex align-items-center">
                                <div className="avatar me-2">
                                  <img loading="lazy" src={imageUrl} alt="chatuserimage" className="avatar-50 " />
                                  <span className="avatar-status">
                                    <i className="material-symbols-outlined text-success  md-14 filled">circle</i>
                                  </span>
                                </div>

                                <div className="chat-sidebar-name">
                                  <h6 className="mb-0">Team Discussions</h6>
                                  <span>Lorem Ipsum is</span>
                                </div>

                                <div className="chat-meta float-right text-center mt-2 me-1">
                                  <div className="chat-msg-counter bg-primary text-white">20</div>
                                  <span className="text-nowrap">05 min</span>
                                </div>
                              </div>
                            </Nav.Link>
                          </Nav.Item>

                          <li>
                            <Nav.Link eventKey="second" href="#chatbox2">
                              <div className="d-flex align-items-center">
                                <div className="avatar me-2">
                                  <img loading="lazy" src={imageUrl} alt="chatuserimage" className="avatar-50 " />
                                  <span className="avatar-status">
                                    <i className="ri-checkbox-blank-circle-fill text-success"></i>
                                  </span>
                                </div>
                                <div className="chat-sidebar-name">
                                  <h6 className="mb-0">Announcement</h6>
                                  <span>This Sunday we</span>
                                </div>
                                <div className="chat-meta float-right text-center mt-2 me-1">
                                  <div className="chat-msg-counter bg-primary text-white">10</div>
                                  <span className="text-nowrap">10 min</span>
                                </div>
                              </div>
                            </Nav.Link>
                          </li>
                        </Nav>
                      </div>
                    </Col>
                    <Col lg={10} className=" chat-data p-0 chat-data-right">
                      <Tab.Content>
                        <div className="chat-head">
                          <header className="d-flex justify-content-between align-items-center bg-white pt-3  ps-3 pe-3 pb-3">
                            <div className="d-flex align-items-center">
                              <div className="sidebar-toggle">
                                <i className="ri-menu-3-line"></i>
                              </div>
                              <div className="avatar chat-user-profile m-0 me-3">
                                <img loading="lazy" src={imageUrl} alt="avatar" className="avatar-50 " />
                                <span className="avatar-status">
                                  <i className="material-symbols-outlined text-success  md-14 filled">circle</i>
                                </span>
                              </div>
                              <h5 className="mb-0">Team Discussions</h5>
                            </div>
                            {/* USER PROFILE */}
                            {/* <div className="user-profile">
                          <Button type="submit" onClick={ChatSidebarClose} variant=" close-popup p-3">
                            <i className="material-symbols-outlined md-18" onClick={() => setShow2('false')}>
                              close
                            </i>
                          </Button>
                          <div className="user mb-4  text-center">
                            <Link className="avatar m-0" to="">
                              <img loading="lazy" src={imageUrl} alt="avatar" />
                            </Link>
                            <div className="user-name mt-4">
                              <h4>Bni Jordan</h4>
                            </div>
                            <div className="user-desc">
                              <p>Cape Town, RSA</p>
                            </div>
                          </div>
                          <hr />
                          <div className="chatuser-detail text-left mt-4">
                            <Row>
                              <Col md="6" className="col-6  title">
                                Bni Name:
                              </Col>
                              <Col md="6" className="col-6  text-right">
                                Bni
                              </Col>
                            </Row>
                            <hr />
                            <Row>
                              <Col md="6" className="col-6 title">
                                Tel:
                              </Col>
                              <Col md="6" className="col-6 text-right">
                                072 143 9920
                              </Col>
                            </Row>
                            <hr />
                            <Row>
                              <Col md="6" className="col-6 title">
                                Date Of Birth:
                              </Col>
                              <Col md="6" className="col-6 text-right">
                                July 12, 1989
                              </Col>
                            </Row>
                            <hr />
                            <Row>
                              <Col md="6" className="col-6 title">
                                Gender:
                              </Col>
                              <Col md="6" className="col-6 text-right">
                                Male
                              </Col>
                            </Row>
                            <hr />
                            <Row>
                              <Col md="6" className="col-6 title">
                                Language:
                              </Col>
                              <Col md="6" className="col-6 text-right">
                                Engliah
                              </Col>
                            </Row>
                          </div>
                        </div> */}

                            <div className="chat-header-icons d-flex">
                              <Link
                                to="#"
                                className="chat-icon-phone bg-soft-primary d-flex justify-content-center align-items-center"
                              >
                                <i className="material-symbols-outlined md-18">phone</i>
                              </Link>
                              <Link
                                to="#"
                                className="chat-icon-phone bg-soft-primary d-flex justify-content-center align-items-center"
                              >
                                <i className="material-symbols-outlined md-18">videocam</i>
                              </Link>
                              <Link
                                to="#"
                                className="chat-icon-phone bg-soft-primary d-flex justify-content-center align-items-center"
                              >
                                <i className="material-symbols-outlined md-18">delete</i>
                              </Link>
                              <Dropdown
                                className="bg-soft-primary d-flex justify-content-center align-items-center"
                                as="span"
                              >
                                <Dropdown.Toggle variant="material-symbols-outlined cursor-pointer md-18 nav-hide-arrow pe-0 show">
                                  more_vert
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="dropdown-menu-right">
                                  <Dropdown.Item className="d-flex align-items-center" href="#">
                                    <i className="material-symbols-outlined md-18 me-1">push_pin</i>Pin to top
                                  </Dropdown.Item>
                                  <Dropdown.Item className="d-flex align-items-center" href="#">
                                    <i className="material-symbols-outlined md-18 me-1">delete_outline</i>Delete chat
                                  </Dropdown.Item>
                                  <Dropdown.Item className="d-flex align-items-center" href="#">
                                    <i className="material-symbols-outlined md-18 me-1">watch_later</i>Block
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                          </header>
                        </div>
                        <div className="chat-content scroller">
                          <div className="chat d-flex other-user">
                            <div className="chat-user">
                              <Link className="avatar m-0" to="">
                                <img loading="lazy" src={imageUrl} alt="avatar" className="avatar-35 " />
                              </Link>
                              <span className="chat-time mt-1">6:45</span>
                            </div>
                            <div className="chat-detail">
                              <div className="chat-message">
                                <p>How can we help? We're here for you! 😄</p>
                              </div>
                            </div>
                          </div>
                          <div className="chat chat-left">
                            <div className="chat-user">
                              <Link className="avatar m-0" to="">
                                <img loading="lazy" src={imageUrl} alt="avatar" className="avatar-35 " />
                              </Link>
                              <span className="chat-time mt-1">6:48</span>
                            </div>
                            <div className="chat-detail">
                              <div className="chat-message">
                                <p>Hey John, I am looking for the best admin template.</p>
                                <p>Could you please help me to find it out? 🤔</p>
                              </div>
                            </div>
                          </div>
                          <div className="chat chat d-flex other-user">
                            <div className="chat-user">
                              <Link className="avatar m-0" to="">
                                <img loading="lazy" src={imageUrl} alt="avatar" className="avatar-35 " />
                              </Link>
                              <span className="chat-time mt-1">6:49</span>
                            </div>
                            <div className="chat-detail">
                              <div className="chat-message">
                                <p>Absolutely!</p>
                                <p>SocialV Dashboard is the responsive bootstrap 5 admin template.</p>
                              </div>
                            </div>
                          </div>
                          <div className="chat chat-left">
                            <div className="chat-user">
                              <Link className="avatar m-0" to="">
                                <img loading="lazy" src={imageUrl} alt="avatar" className="avatar-35 " />
                              </Link>
                              <span className="chat-time mt-1">6:52</span>
                            </div>
                            <div className="chat-detail">
                              <div className="chat-message">
                                <p>Looks clean and fresh UI.</p>
                              </div>
                            </div>
                          </div>
                          <div className="chat d-flex other-user">
                            <div className="chat-user">
                              <Link className="avatar m-0" to="">
                                <img loading="lazy" src={imageUrl} alt="avatar" className="avatar-35 " />
                              </Link>
                              <span className="chat-time mt-1">6:53</span>
                            </div>
                            <div className="chat-detail">
                              <div className="chat-message">
                                <p>Thanks, from ThemeForest.</p>
                              </div>
                            </div>
                          </div>
                          <div className="chat chat-left">
                            <div className="chat-user">
                              <Link className="avatar m-0" to="">
                                <img loading="lazy" src={imageUrl} alt="avatar" className="avatar-35 " />
                              </Link>
                              <span className="chat-time mt-1">6:54</span>
                            </div>
                            <div className="chat-detail">
                              <div className="chat-message">
                                <p>I will purchase it for sure. 👍</p>
                              </div>
                            </div>
                          </div>
                          <div className="chat d-flex other-user">
                            <div className="chat-user">
                              <Link className="avatar m-0" to="">
                                <img loading="lazy" src={imageUrl} alt="avatar" className="avatar-35 " />
                              </Link>
                              <span className="chat-time mt-1">6:56</span>
                            </div>
                            <div className="chat-detail">
                              <div className="chat-message">
                                <p>Okay Thanks..</p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="chat-footer p-3 bg-white">
                          <Form className="d-flex align-items-center" action="#">
                            <div className="chat-attagement d-flex">
                              <Link to="#">
                                <i className="far fa-smile pe-3" aria-hidden="true"></i>
                              </Link>
                              <Link to="#">
                                <i className="fa fa-paperclip pe-3" aria-hidden="true"></i>
                              </Link>
                            </div>
                            <Form.Control type="text" className="me-3" placeholder="Type your message" />
                            <Button type="submit" variant="primary d-flex align-items-center">
                              <i className="far fa-paper-plane" aria-hidden="true"></i>
                              <span className="d-none d-lg-block ms-1">Send</span>
                            </Button>
                          </Form>
                        </div>
                      </Tab.Content>
                    </Col>
                  </Row>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};
