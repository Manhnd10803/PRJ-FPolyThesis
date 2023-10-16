import { Col, Container, Dropdown, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { Card, CustomToggle, ShareOffCanvas } from '@/components/custom';
import { CreatePost } from './components/create-post';

//image
const imageUrl = 'https://picsum.photos/20';

export const HomePage = () => {
  return (
    <>
      <div id="content-page" className="content-page">
        <Container>
          <Row>
            {/* ======== left content */}
            <Col lg={8} className="row m-0 p-0">
              <Col sm={12}>
                <CreatePost />
              </Col>
              <Col sm={12}>
                <Card className=" card-block card-stretch card-height">
                  <Card.Body>
                    <div className="user-post-data">
                      <div className="d-flex justify-content-between">
                        <div className="me-3">
                          <img className="rounded-circle img-fluid" src={imageUrl} alt="" />
                        </div>
                        <div className="w-100">
                          <div className="d-flex justify-content-between">
                            <div>
                              <h5 className="mb-0 d-inline-block">Anna Sthesia</h5>
                              <span className="mb-0 ps-1 d-inline-block">Add New Post</span>
                              <p className="mb-0 text-primary">Just Now</p>
                            </div>
                            <div className="card-post-toolbar">
                              <Dropdown>
                                <Dropdown.Toggle variant="bg-transparent">
                                  <span className="material-symbols-outlined">more_horiz</span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="dropdown-menu m-0 p-0">
                                  <Dropdown.Item className=" p-3" to="#">
                                    <div className="d-flex align-items-top">
                                      <div className="h4 material-symbols-outlined">
                                        <i className="ri-save-line"></i>
                                      </div>
                                      <div className="data ms-2">
                                        <h6>Save Post</h6>
                                        <p className="mb-0">Add this to your saved items</p>
                                      </div>
                                    </div>
                                  </Dropdown.Item>
                                  <Dropdown.Item className="p-3" to="#">
                                    <div className="d-flex align-items-top">
                                      <i className="ri-close-circle-line h4"></i>
                                      <div className="data ms-2">
                                        <h6>Hide Post</h6>
                                        <p className="mb-0">See fewer posts like this.</p>
                                      </div>
                                    </div>
                                  </Dropdown.Item>
                                  <Dropdown.Item className=" p-3" to="#">
                                    <div className="d-flex align-items-top">
                                      <i className="ri-user-unfollow-line h4"></i>
                                      <div className="data ms-2">
                                        <h6>Unfollow User</h6>
                                        <p className="mb-0">Stop seeing posts but stay friends.</p>
                                      </div>
                                    </div>
                                  </Dropdown.Item>
                                  <Dropdown.Item className=" p-3" to="#">
                                    <div className="d-flex align-items-top">
                                      <i className="ri-notification-line h4"></i>
                                      <div className="data ms-2">
                                        <h6>Notifications</h6>
                                        <p className="mb-0">Turn on notifications for this post</p>
                                      </div>
                                    </div>
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo
                        non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus
                      </p>
                    </div>
                    <div className="user-post">
                      <div className=" d-grid grid-rows-2 grid-flow-col gap-3">
                        <div className="row-span-2 row-span-md-1">
                          <img src={imageUrl} alt="post1" className="img-fluid rounded w-100" />
                        </div>
                        <div className="row-span-1">
                          <img src={imageUrl} alt="post2" className="img-fluid rounded w-100" />
                        </div>
                        <div className="row-span-1 ">
                          <img src={imageUrl} alt="post3" className="img-fluid rounded w-100" />
                        </div>
                      </div>
                    </div>
                    <div className="comment-area mt-3">
                      <div className="d-flex justify-content-between align-items-center flex-wrap">
                        <div className="like-block position-relative d-flex align-items-center">
                          <div className="d-flex align-items-center">
                            <div className="like-data">
                              <Dropdown>
                                <Dropdown.Toggle as={CustomToggle}>
                                  <img src={imageUrl} className="img-fluid" alt="" />
                                </Dropdown.Toggle>
                                <Dropdown.Menu className=" py-2">
                                  <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip>Like</Tooltip>}
                                    className="ms-2 me-2"
                                  >
                                    <img src={imageUrl} className="img-fluid me-2" alt="" />
                                  </OverlayTrigger>
                                  <OverlayTrigger placement="top" overlay={<Tooltip>Love</Tooltip>} className="me-2">
                                    <img src={imageUrl} className="img-fluid me-2" alt="" />
                                  </OverlayTrigger>
                                  <OverlayTrigger placement="top" overlay={<Tooltip>Happy</Tooltip>} className="me-2">
                                    <img src={imageUrl} className="img-fluid me-2" alt="" />
                                  </OverlayTrigger>
                                  <OverlayTrigger placement="top" overlay={<Tooltip>HaHa</Tooltip>} className="me-2">
                                    <img src={imageUrl} className="img-fluid me-2" alt="" />
                                  </OverlayTrigger>
                                  <OverlayTrigger placement="top" overlay={<Tooltip>Think</Tooltip>} className="me-2">
                                    <img src={imageUrl} className="img-fluid me-2" alt="" />
                                  </OverlayTrigger>
                                  <OverlayTrigger placement="top" overlay={<Tooltip>Sade</Tooltip>} className="me-2">
                                    <img src={imageUrl} className="img-fluid me-2" alt="" />
                                  </OverlayTrigger>
                                  <OverlayTrigger placement="top" overlay={<Tooltip>Lovely</Tooltip>} className="me-2">
                                    <img src={imageUrl} className="img-fluid me-2" alt="" />
                                  </OverlayTrigger>
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                            <div className="total-like-block ms-2 me-3">
                              <Dropdown>
                                <Dropdown.Toggle as={CustomToggle} id="post-option">
                                  140 Likes
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Item href="#">Max Emum</Dropdown.Item>
                                  <Dropdown.Item href="#">Bill Yerds</Dropdown.Item>
                                  <Dropdown.Item href="#">Hap E. Birthday</Dropdown.Item>
                                  <Dropdown.Item href="#">Tara Misu</Dropdown.Item>
                                  <Dropdown.Item href="#">Midge Itz</Dropdown.Item>
                                  <Dropdown.Item href="#">Sal Vidge</Dropdown.Item>
                                  <Dropdown.Item href="#">Other</Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                          </div>
                          <div className="total-comment-block">
                            <Dropdown>
                              <Dropdown.Toggle as={CustomToggle} id="post-option">
                                20 Comment
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item href="#">Max Emum</Dropdown.Item>
                                <Dropdown.Item href="#">Bill Yerds</Dropdown.Item>
                                <Dropdown.Item href="#">Hap E. Birthday</Dropdown.Item>
                                <Dropdown.Item href="#">Tara Misu</Dropdown.Item>
                                <Dropdown.Item href="#">Midge Itz</Dropdown.Item>
                                <Dropdown.Item href="#">Sal Vidge</Dropdown.Item>
                                <Dropdown.Item href="#">Other</Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                        </div>
                        <ShareOffCanvas />
                      </div>
                      <hr />
                      <ul className="post-comments list-inline p-0 m-0">
                        <li className="mb-2">
                          <div className="d-flex">
                            <div className="user-img">
                              <img src={imageUrl} alt="user1" className="avatar-35 rounded-circle img-fluid" />
                            </div>
                            <div className="comment-data-block ms-3">
                              <h6>Monty Carlo</h6>
                              <p className="mb-0">Lorem ipsum dolor sit amet</p>
                              <div className="d-flex flex-wrap align-items-center comment-activity">
                                <Link to="#">like</Link>
                                <Link to="#">reply</Link>
                                <Link to="#">translate</Link>
                                <span> 5 min </span>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="d-flex">
                            <div className="user-img">
                              <img src={imageUrl} alt="user1" className="avatar-35 rounded-circle img-fluid" />
                            </div>
                            <div className="comment-data-block ms-3">
                              <h6>Paul Molive</h6>
                              <p className="mb-0">Lorem ipsum dolor sit amet</p>
                              <div className="d-flex flex-wrap align-items-center comment-activity">
                                <Link to="#">like</Link>
                                <Link to="#">reply</Link>
                                <Link to="#">translate</Link>
                                <span> 5 min </span>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                      <form className="comment-text d-flex align-items-center mt-3">
                        <input type="text" className="form-control rounded" placeholder="Enter Your Comment" />
                        <div className="comment-attagement d-flex">
                          <Link to="#">
                            <i className="ri-link me-3"></i>
                          </Link>
                          <Link to="#">
                            <i className="ri-user-smile-line me-3"></i>
                          </Link>
                          <Link to="#">
                            <i className="ri-camera-line me-3"></i>
                          </Link>
                        </div>
                      </form>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm={12}>
                <div className="card card-block card-stretch card-height">
                  <div className="card-body">
                    <div className="user-post-data">
                      <div className="d-flex justify-content-between">
                        <div className="me-3">
                          <img className="rounded-circle img-fluid" src={imageUrl} alt="" />
                        </div>
                        <div className="w-100">
                          <div className="d-flex  justify-content-between">
                            <div>
                              <h5 className="mb-0 d-inline-block">Barb Ackue</h5>
                              <span className="mb-0 ps-1 d-inline-block">Added New Image in a Post</span>
                              <p className="mb-0 text-primary">1 hour ago</p>
                            </div>
                            <div className="card-post-toolbar">
                              <Dropdown>
                                <Dropdown.Toggle variant="bg-transparent">
                                  <span className="material-symbols-outlined">more_horiz</span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="dropdown-menu m-0 p-0">
                                  <Dropdown.Item className=" p-3" to="#">
                                    <div className="d-flex align-items-top">
                                      <div className="h4">
                                        <i className="ri-save-line"></i>
                                      </div>
                                      <div className="data ms-2">
                                        <h6>Save Post</h6>
                                        <p className="mb-0">Add this to your saved items</p>
                                      </div>
                                    </div>
                                  </Dropdown.Item>
                                  <Dropdown.Item className="p-3" to="#">
                                    <div className="d-flex align-items-top">
                                      <i className="ri-close-circle-line h4"></i>
                                      <div className="data ms-2">
                                        <h6>Hide Post</h6>
                                        <p className="mb-0">See fewer posts like this.</p>
                                      </div>
                                    </div>
                                  </Dropdown.Item>
                                  <Dropdown.Item className=" p-3" to="#">
                                    <div className="d-flex align-items-top">
                                      <i className="ri-user-unfollow-line h4"></i>
                                      <div className="data ms-2">
                                        <h6>Unfollow User</h6>
                                        <p className="mb-0">Stop seeing posts but stay friends.</p>
                                      </div>
                                    </div>
                                  </Dropdown.Item>
                                  <Dropdown.Item className=" p-3" to="#">
                                    <div className="d-flex align-items-top">
                                      <i className="ri-notification-line h4"></i>
                                      <div className="data ms-2">
                                        <h6>Notifications</h6>
                                        <p className="mb-0">Turn on notifications for this post</p>
                                      </div>
                                    </div>
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo
                        non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus
                      </p>
                    </div>
                    <div className="user-post">
                      <Link to="#">
                        <img src={imageUrl} alt="post1" className="img-fluid rounded w-100" />
                      </Link>
                    </div>
                    <div className="comment-area mt-3">
                      <div className="d-flex justify-content-between align-items-center flex-wrap">
                        <div className="like-block position-relative d-flex align-items-center">
                          <div className="d-flex align-items-center">
                            <div className="like-data">
                              <Dropdown>
                                <Dropdown.Toggle as={CustomToggle}>
                                  <img src={imageUrl} className="img-fluid" alt="" />
                                </Dropdown.Toggle>
                                <Dropdown.Menu className=" py-2">
                                  <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip>Like</Tooltip>}
                                    className="ms-2 me-2"
                                  >
                                    <img src={imageUrl} className="img-fluid me-2" alt="" />
                                  </OverlayTrigger>
                                  <OverlayTrigger placement="top" overlay={<Tooltip>Love</Tooltip>} className="me-2">
                                    <img src={imageUrl} className="img-fluid me-2" alt="" />
                                  </OverlayTrigger>
                                  <OverlayTrigger placement="top" overlay={<Tooltip>Happy</Tooltip>} className="me-2">
                                    <img src={imageUrl} className="img-fluid me-2" alt="" />
                                  </OverlayTrigger>
                                  <OverlayTrigger placement="top" overlay={<Tooltip>HaHa</Tooltip>} className="me-2">
                                    <img src={imageUrl} className="img-fluid me-2" alt="" />
                                  </OverlayTrigger>
                                  <OverlayTrigger placement="top" overlay={<Tooltip>Think</Tooltip>} className="me-2">
                                    <img src={imageUrl} className="img-fluid me-2" alt="" />
                                  </OverlayTrigger>
                                  <OverlayTrigger placement="top" overlay={<Tooltip>Sade</Tooltip>} className="me-2">
                                    <img src={imageUrl} className="img-fluid me-2" alt="" />
                                  </OverlayTrigger>
                                  <OverlayTrigger placement="top" overlay={<Tooltip>Lovely</Tooltip>} className="me-2">
                                    <img src={imageUrl} className="img-fluid me-2" alt="" />
                                  </OverlayTrigger>
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                            <div className="total-like-block ms-2 me-3">
                              <Dropdown>
                                <Dropdown.Toggle as={CustomToggle} id="post-option">
                                  140 Likes
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Item href="#">Max Emum</Dropdown.Item>
                                  <Dropdown.Item href="#">Bill Yerds</Dropdown.Item>
                                  <Dropdown.Item href="#">Hap E. Birthday</Dropdown.Item>
                                  <Dropdown.Item href="#">Tara Misu</Dropdown.Item>
                                  <Dropdown.Item href="#">Midge Itz</Dropdown.Item>
                                  <Dropdown.Item href="#">Sal Vidge</Dropdown.Item>
                                  <Dropdown.Item href="#">Other</Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                          </div>
                          <div className="total-comment-block">
                            <Dropdown>
                              <Dropdown.Toggle as={CustomToggle} id="post-option">
                                20 Comment
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item href="#">Max Emum</Dropdown.Item>
                                <Dropdown.Item href="#">Bill Yerds</Dropdown.Item>
                                <Dropdown.Item href="#">Hap E. Birthday</Dropdown.Item>
                                <Dropdown.Item href="#">Tara Misu</Dropdown.Item>
                                <Dropdown.Item href="#">Midge Itz</Dropdown.Item>
                                <Dropdown.Item href="#">Sal Vidge</Dropdown.Item>
                                <Dropdown.Item href="#">Other</Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                        </div>
                        <ShareOffCanvas />
                      </div>
                      <hr />
                      <ul className="post-comments list-inline p-0 m-0">
                        <li className="mb-2">
                          <div className="d-flex ">
                            <div className="user-img">
                              <img src={imageUrl} alt="user1" className="avatar-35 rounded-circle img-fluid" />
                            </div>
                            <div className="comment-data-block ms-3">
                              <h6>Monty Carlo</h6>
                              <p className="mb-0">Lorem ipsum dolor sit amet</p>
                              <div className="d-flex flex-wrap align-items-center comment-activity">
                                <Link to="#">like</Link>
                                <Link to="#">reply</Link>
                                <Link to="#">translate</Link>
                                <span> 5 min </span>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="d-flex ">
                            <div className="user-img">
                              <img src={imageUrl} alt="user1" className="avatar-35 rounded-circle img-fluid" />
                            </div>
                            <div className="comment-data-block ms-3">
                              <h6>Paul Molive</h6>
                              <p className="mb-0">Lorem ipsum dolor sit amet</p>
                              <div className="d-flex flex-wrap align-items-center comment-activity">
                                <Link to="#">like</Link>
                                <Link to="#">reply</Link>
                                <Link to="#">translate</Link>
                                <span> 5 min </span>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                      <form className="comment-text d-flex align-items-center mt-3">
                        <input type="text" className="form-control rounded" placeholder="Enter Your Comment" />
                        <div className="comment-attagement d-flex">
                          <Link to="#">
                            <i className="ri-link me-3"></i>
                          </Link>
                          <Link to="#">
                            <i className="ri-user-smile-line me-3"></i>
                          </Link>
                          <Link to="#">
                            <i className="ri-camera-line me-3"></i>
                          </Link>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </Col>
              <Col sm={12}>
                <div className="card card-block card-stretch card-height">
                  <div className="card-body">
                    <div className="user-post-data">
                      <div className="d-flex justify-content-between">
                        <div className="me-3">
                          <img className="rounded-circle img-fluid" src={imageUrl} alt="" />
                        </div>
                        <div className="w-100">
                          <div className=" d-flex  justify-content-between">
                            <div>
                              <h5 className="mb-0 d-inline-block">Ira Membrit</h5>
                              <p className="mb-0 ps-1 d-inline-block">Update her Status</p>
                              <p className="mb-0 text-primary">6 hour ago</p>
                            </div>
                            <div className="card-post-toolbar">
                              <Dropdown>
                                <Dropdown.Toggle variant="bg-transparent">
                                  <span className="material-symbols-outlined">more_horiz</span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="dropdown-menu m-0 p-0">
                                  <Dropdown.Item className=" p-3" to="#">
                                    <div className="d-flex align-items-top">
                                      <div className="h4">
                                        <i className="ri-save-line"></i>
                                      </div>
                                      <div className="data ms-2">
                                        <h6>Save Post</h6>
                                        <p className="mb-0">Add this to your saved items</p>
                                      </div>
                                    </div>
                                  </Dropdown.Item>
                                  <Dropdown.Item className="p-3" to="#">
                                    <div className="d-flex align-items-top">
                                      <i className="ri-close-circle-line h4"></i>
                                      <div className="data ms-2">
                                        <h6>Hide Post</h6>
                                        <p className="mb-0">See fewer posts like this.</p>
                                      </div>
                                    </div>
                                  </Dropdown.Item>
                                  <Dropdown.Item className=" p-3" to="#">
                                    <div className="d-flex align-items-top">
                                      <i className="ri-user-unfollow-line h4"></i>
                                      <div className="data ms-2">
                                        <h6>Unfollow User</h6>
                                        <p className="mb-0">Stop seeing posts but stay friends.</p>
                                      </div>
                                    </div>
                                  </Dropdown.Item>
                                  <Dropdown.Item className=" p-3" to="#">
                                    <div className="d-flex align-items-top">
                                      <i className="ri-notification-line h4"></i>
                                      <div className="data ms-2">
                                        <h6>Notifications</h6>
                                        <p className="mb-0">Turn on notifications for this post</p>
                                      </div>
                                    </div>
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo
                        non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus
                      </p>
                    </div>
                    <div className="comment-area mt-3">
                      <div className="d-flex justify-content-between align-items-center flex-wrap">
                        <div className="like-block position-relative d-flex align-items-center">
                          <div className="d-flex align-items-center">
                            <div className="like-data">
                              <Dropdown>
                                <Dropdown.Toggle as={CustomToggle}>
                                  <img src={imageUrl} className="img-fluid" alt="" />
                                </Dropdown.Toggle>
                                <Dropdown.Menu className=" py-2">
                                  <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip>Like</Tooltip>}
                                    className="ms-2 me-2"
                                  >
                                    <img src={imageUrl} className="img-fluid me-2" alt="" />
                                  </OverlayTrigger>
                                  <OverlayTrigger placement="top" overlay={<Tooltip>Love</Tooltip>} className="me-2">
                                    <img src={imageUrl} className="img-fluid me-2" alt="" />
                                  </OverlayTrigger>
                                  <OverlayTrigger placement="top" overlay={<Tooltip>Happy</Tooltip>} className="me-2">
                                    <img src={imageUrl} className="img-fluid me-2" alt="" />
                                  </OverlayTrigger>
                                  <OverlayTrigger placement="top" overlay={<Tooltip>HaHa</Tooltip>} className="me-2">
                                    <img src={imageUrl} className="img-fluid me-2" alt="" />
                                  </OverlayTrigger>
                                  <OverlayTrigger placement="top" overlay={<Tooltip>Think</Tooltip>} className="me-2">
                                    <img src={imageUrl} className="img-fluid me-2" alt="" />
                                  </OverlayTrigger>
                                  <OverlayTrigger placement="top" overlay={<Tooltip>Sade</Tooltip>} className="me-2">
                                    <img src={imageUrl} className="img-fluid me-2" alt="" />
                                  </OverlayTrigger>
                                  <OverlayTrigger placement="top" overlay={<Tooltip>Lovely</Tooltip>} className="me-2">
                                    <img src={imageUrl} className="img-fluid me-2" alt="" />
                                  </OverlayTrigger>
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                            <div className="total-like-block ms-2 me-3">
                              <Dropdown>
                                <Dropdown.Toggle as={CustomToggle} id="post-option">
                                  140 Likes
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Item href="#">Max Emum</Dropdown.Item>
                                  <Dropdown.Item href="#">Bill Yerds</Dropdown.Item>
                                  <Dropdown.Item href="#">Hap E. Birthday</Dropdown.Item>
                                  <Dropdown.Item href="#">Tara Misu</Dropdown.Item>
                                  <Dropdown.Item href="#">Midge Itz</Dropdown.Item>
                                  <Dropdown.Item href="#">Sal Vidge</Dropdown.Item>
                                  <Dropdown.Item href="#">Other</Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                          </div>
                          <div className="total-comment-block">
                            <Dropdown>
                              <Dropdown.Toggle as={CustomToggle} id="post-option">
                                20 Comment
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item href="#">Max Emum</Dropdown.Item>
                                <Dropdown.Item href="#">Bill Yerds</Dropdown.Item>
                                <Dropdown.Item href="#">Hap E. Birthday</Dropdown.Item>
                                <Dropdown.Item href="#">Tara Misu</Dropdown.Item>
                                <Dropdown.Item href="#">Midge Itz</Dropdown.Item>
                                <Dropdown.Item href="#">Sal Vidge</Dropdown.Item>
                                <Dropdown.Item href="#">Other</Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                        </div>
                        <ShareOffCanvas />
                      </div>
                      <hr />
                      <ul className="post-comments list-inline p-0 m-0">
                        <li className="mb-2">
                          <div className="d-flex">
                            <div className="user-img">
                              <img src={imageUrl} alt="user1" className="avatar-35 rounded-circle img-fluid" />
                            </div>
                            <div className="comment-data-block ms-3">
                              <h6>Monty Carlo</h6>
                              <p className="mb-0">Lorem ipsum dolor sit amet</p>
                              <div className="d-flex flex-wrap align-items-center comment-activity">
                                <Link to="#">like</Link>
                                <Link to="#">reply</Link>
                                <Link to="#">translate</Link>
                                <span> 5 min </span>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="d-flex ">
                            <div className="user-img">
                              <img src={imageUrl} alt="user1" className="avatar-35 rounded-circle img-fluid" />
                            </div>
                            <div className="comment-data-block ms-3">
                              <h6>Paul Molive</h6>
                              <p className="mb-0">Lorem ipsum dolor sit amet</p>
                              <div className="d-flex flex-wrap align-items-center comment-activity">
                                <Link to="#">like</Link>
                                <Link to="#">reply</Link>
                                <Link to="#">translate</Link>
                                <span> 5 min </span>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                      <form className="comment-text d-flex align-items-center mt-3">
                        <input type="text" className="form-control rounded" placeholder="Enter Your Comment" />
                        <div className="comment-attagement d-flex">
                          <Link to="#">
                            <i className="ri-link me-3"></i>
                          </Link>
                          <Link to="#">
                            <i className="ri-user-smile-line me-3"></i>
                          </Link>
                          <Link to="#">
                            <i className="ri-camera-line me-3"></i>
                          </Link>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </Col>
              <Col sm={12}>
                <div className="card card-block card-stretch card-height">
                  <div className="card-body">
                    <div className="post-item">
                      <div className="d-flex justify-content-between">
                        <div className="me-3">
                          <img className="rounded-circle img-fluid avatar-60" src={imageUrl} alt="" />
                        </div>
                        <div className="w-100">
                          <div className="d-flex justify-content-between">
                            <div>
                              <h5 className="mb-0 d-inline-block">Bni Cyst</h5>
                              <p className="ms-1 mb-0 ps-1 d-inline-block">Changed Profile Picture</p>
                              <p className="mb-0">3 day ago</p>
                            </div>
                            <div className="card-post-toolbar">
                              <Dropdown>
                                <Dropdown.Toggle variant="bg-transparent">
                                  <span className="material-symbols-outlined">more_horiz</span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="dropdown-menu m-0 p-0">
                                  <Dropdown.Item className=" p-3" to="#">
                                    <div className="d-flex align-items-top">
                                      <div className="h4">
                                        <i className="ri-save-line"></i>
                                      </div>
                                      <div className="data ms-2">
                                        <h6>Save Post</h6>
                                        <p className="mb-0">Add this to your saved items</p>
                                      </div>
                                    </div>
                                  </Dropdown.Item>
                                  <Dropdown.Item className="p-3" to="#">
                                    <div className="d-flex align-items-top">
                                      <i className="ri-close-circle-line h4"></i>
                                      <div className="data ms-2">
                                        <h6>Hide Post</h6>
                                        <p className="mb-0">See fewer posts like this.</p>
                                      </div>
                                    </div>
                                  </Dropdown.Item>
                                  <Dropdown.Item className=" p-3" to="#">
                                    <div className="d-flex align-items-top">
                                      <i className="ri-user-unfollow-line h4"></i>
                                      <div className="data ms-2">
                                        <h6>Unfollow User</h6>
                                        <p className="mb-0">Stop seeing posts but stay friends.</p>
                                      </div>
                                    </div>
                                  </Dropdown.Item>
                                  <Dropdown.Item className=" p-3" to="#">
                                    <div className="d-flex align-items-top">
                                      <i className="ri-notification-line h4"></i>
                                      <div className="data ms-2">
                                        <h6>Notifications</h6>
                                        <p className="mb-0">Turn on notifications for this post</p>
                                      </div>
                                    </div>
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="user-post text-center">
                      <Link to="#">
                        <img src={imageUrl} alt="post1" className="img-fluid rounded w-100 mt-3" />
                      </Link>
                    </div>
                    <div className="comment-area mt-3">
                      <div className="d-flex justify-content-between align-items-center flex-wrap">
                        <div className="like-block position-relative d-flex align-items-center">
                          <div className="d-flex align-items-center">
                            <div className="like-data">
                              <Dropdown>
                                <Dropdown.Toggle as={CustomToggle}>
                                  <img src={imageUrl} className="img-fluid" alt="" />
                                </Dropdown.Toggle>
                                <Dropdown.Menu className=" py-2">
                                  <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip>Like</Tooltip>}
                                    className="ms-2 me-2"
                                  >
                                    <img src={imageUrl} className="img-fluid me-2" alt="" />
                                  </OverlayTrigger>
                                  <OverlayTrigger placement="top" overlay={<Tooltip>Love</Tooltip>} className="me-2">
                                    <img src={imageUrl} className="img-fluid me-2" alt="" />
                                  </OverlayTrigger>
                                  <OverlayTrigger placement="top" overlay={<Tooltip>Happy</Tooltip>} className="me-2">
                                    <img src={imageUrl} className="img-fluid me-2" alt="" />
                                  </OverlayTrigger>
                                  <OverlayTrigger placement="top" overlay={<Tooltip>HaHa</Tooltip>} className="me-2">
                                    <img src={imageUrl} className="img-fluid me-2" alt="" />
                                  </OverlayTrigger>
                                  <OverlayTrigger placement="top" overlay={<Tooltip>Think</Tooltip>} className="me-2">
                                    <img src={imageUrl} className="img-fluid me-2" alt="" />
                                  </OverlayTrigger>
                                  <OverlayTrigger placement="top" overlay={<Tooltip>Sade</Tooltip>} className="me-2">
                                    <img src={imageUrl} className="img-fluid me-2" alt="" />
                                  </OverlayTrigger>
                                  <OverlayTrigger placement="top" overlay={<Tooltip>Lovely</Tooltip>} className="me-2">
                                    <img src={imageUrl} className="img-fluid me-2" alt="" />
                                  </OverlayTrigger>
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                            <div className="total-like-block ms-2 me-3">
                              <Dropdown>
                                <Dropdown.Toggle as={CustomToggle} id="post-option">
                                  140 Likes
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Item href="#">Max Emum</Dropdown.Item>
                                  <Dropdown.Item href="#">Bill Yerds</Dropdown.Item>
                                  <Dropdown.Item href="#">Hap E. Birthday</Dropdown.Item>
                                  <Dropdown.Item href="#">Tara Misu</Dropdown.Item>
                                  <Dropdown.Item href="#">Midge Itz</Dropdown.Item>
                                  <Dropdown.Item href="#">Sal Vidge</Dropdown.Item>
                                  <Dropdown.Item href="#">Other</Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                          </div>
                          <div className="total-comment-block">
                            <Dropdown>
                              <Dropdown.Toggle as={CustomToggle} id="post-option">
                                20 Comment
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item href="#">Max Emum</Dropdown.Item>
                                <Dropdown.Item href="#">Bill Yerds</Dropdown.Item>
                                <Dropdown.Item href="#">Hap E. Birthday</Dropdown.Item>
                                <Dropdown.Item href="#">Tara Misu</Dropdown.Item>
                                <Dropdown.Item href="#">Midge Itz</Dropdown.Item>
                                <Dropdown.Item href="#">Sal Vidge</Dropdown.Item>
                                <Dropdown.Item href="#">Other</Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                        </div>
                        <ShareOffCanvas />
                      </div>
                      <hr />
                      <ul className="post-comments list-inline p-0 m-0">
                        <li className="mb-2">
                          <div className="d-flex">
                            <div className="user-img">
                              <img src={imageUrl} alt="user1" className="avatar-35 rounded-circle img-fluid" />
                            </div>
                            <div className="comment-data-block ms-3">
                              <h6>Monty Carlo</h6>
                              <p className="mb-0">Lorem ipsum dolor sit amet</p>
                              <div className="d-flex flex-wrap align-items-center comment-activity">
                                <Link to="#">like</Link>
                                <Link to="#">reply</Link>
                                <Link to="#">translate</Link>
                                <span> 5 min </span>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="d-flex">
                            <div className="user-img">
                              <img src={imageUrl} alt="user1" className="avatar-35 rounded-circle img-fluid" />
                            </div>
                            <div className="comment-data-block ms-3">
                              <h6>Paul Molive</h6>
                              <p className="mb-0">Lorem ipsum dolor sit amet</p>
                              <div className="d-flex flex-wrap align-items-center comment-activity">
                                <Link to="#">like</Link>
                                <Link to="#">reply</Link>
                                <Link to="#">translate</Link>
                                <span> 5 min </span>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                      <form className="comment-text d-flex align-items-center mt-3">
                        <input type="text" className="form-control rounded" placeholder="Enter Your Comment" />
                        <div className="comment-attagement d-flex">
                          <Link to="#">
                            <i className="ri-link me-3"></i>
                          </Link>
                          <Link to="#">
                            <i className="ri-user-smile-line me-3"></i>
                          </Link>
                          <Link to="#">
                            <i className="ri-camera-line me-3"></i>
                          </Link>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </Col>
              <Col sm={12}>
                <div className="card card-block card-stretch card-height">
                  <div className="card-body">
                    <div className="user-post-data">
                      <div className="d-flex justify-content-between">
                        <div className="me-3">
                          <img className="rounded-circle img-fluid" src={imageUrl} alt="" />
                        </div>
                        <div className="w-100">
                          <div className="d-flex justify-content-between">
                            <div>
                              <h5 className="mb-0 d-inline-block">Paige Turner</h5>
                              <p className="mb-0 ps-1 d-inline-block">Added New Video in his Timeline</p>
                              <p className="mb-0 text-primary">1 day ago</p>
                            </div>
                            <div className="card-post-toolbar">
                              <Dropdown>
                                <Dropdown.Toggle variant="bg-transparent">
                                  <span className="material-symbols-outlined">more_horiz</span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="dropdown-menu m-0 p-0">
                                  <Dropdown.Item className=" p-3" to="#">
                                    <div className="d-flex align-items-top">
                                      <div className="h4">
                                        <i className="ri-save-line"></i>
                                      </div>
                                      <div className="data ms-2">
                                        <h6>Save Post</h6>
                                        <p className="mb-0">Add this to your saved items</p>
                                      </div>
                                    </div>
                                  </Dropdown.Item>
                                  <Dropdown.Item className="p-3" to="#">
                                    <div className="d-flex align-items-top">
                                      <i className="ri-close-circle-line h4"></i>
                                      <div className="data ms-2">
                                        <h6>Hide Post</h6>
                                        <p className="mb-0">See fewer posts like this.</p>
                                      </div>
                                    </div>
                                  </Dropdown.Item>
                                  <Dropdown.Item className=" p-3" to="#">
                                    <div className="d-flex align-items-top">
                                      <i className="ri-user-unfollow-line h4"></i>
                                      <div className="data ms-2">
                                        <h6>Unfollow User</h6>
                                        <p className="mb-0">Stop seeing posts but stay friends.</p>
                                      </div>
                                    </div>
                                  </Dropdown.Item>
                                  <Dropdown.Item className=" p-3" to="#">
                                    <div className="d-flex align-items-top">
                                      <i className="ri-notification-line h4"></i>
                                      <div className="data ms-2">
                                        <h6>Notifications</h6>
                                        <p className="mb-0">Turn on notifications for this post</p>
                                      </div>
                                    </div>
                                  </Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3">
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi nulla dolor, ornare at commodo
                        non, feugiat non nisi. Phasellus faucibus mollis pharetra. Proin blandit ac massa sed rhoncus
                      </p>
                    </div>
                    <div className="user-post">
                      <div className="ratio ratio-16x9">
                        <iframe title="vedio" src="https://www.youtube.com/embed/j_GsIanLxZk?rel=0"></iframe>
                      </div>
                    </div>
                    <div className="comment-area mt-3">
                      <div className="d-flex justify-content-between align-items-center flex-wrap">
                        <div className="like-block position-relative d-flex align-items-center">
                          <div className="d-flex align-items-center">
                            <div className="like-data">
                              <Dropdown>
                                <Dropdown.Toggle as={CustomToggle} id="post-option">
                                  <img src={imageUrl} className="img-fluid" alt="" />
                                </Dropdown.Toggle>
                                <Dropdown.Menu className=" py-2">
                                  <OverlayTrigger
                                    placement="top"
                                    overlay={<Tooltip>Like</Tooltip>}
                                    className="ms-2 me-2"
                                  >
                                    <img src={imageUrl} className="img-fluid me-2" alt="" />
                                  </OverlayTrigger>
                                  <OverlayTrigger placement="top" overlay={<Tooltip>Love</Tooltip>} className="me-2">
                                    <img src={imageUrl} className="img-fluid me-2" alt="" />
                                  </OverlayTrigger>
                                  <OverlayTrigger placement="top" overlay={<Tooltip>Happy</Tooltip>} className="me-2">
                                    <img src={imageUrl} className="img-fluid me-2" alt="" />
                                  </OverlayTrigger>
                                  <OverlayTrigger placement="top" overlay={<Tooltip>HaHa</Tooltip>} className="me-2">
                                    <img src={imageUrl} className="img-fluid me-2" alt="" />
                                  </OverlayTrigger>
                                  <OverlayTrigger placement="top" overlay={<Tooltip>Think</Tooltip>} className="me-2">
                                    <img src={imageUrl} className="img-fluid me-2" alt="" />
                                  </OverlayTrigger>
                                  <OverlayTrigger placement="top" overlay={<Tooltip>Sade</Tooltip>} className="me-2">
                                    <img src={imageUrl} className="img-fluid me-2" alt="" />
                                  </OverlayTrigger>
                                  <OverlayTrigger placement="top" overlay={<Tooltip>Lovely</Tooltip>} className="me-2">
                                    <img src={imageUrl} className="img-fluid me-2" alt="" />
                                  </OverlayTrigger>
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                            <div className="total-like-block ms-2 me-3">
                              <Dropdown>
                                <Dropdown.Toggle as={CustomToggle} id="post-option">
                                  140 Likes
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Item href="#">Max Emum</Dropdown.Item>
                                  <Dropdown.Item href="#">Bill Yerds</Dropdown.Item>
                                  <Dropdown.Item href="#">Hap E. Birthday</Dropdown.Item>
                                  <Dropdown.Item href="#">Tara Misu</Dropdown.Item>
                                  <Dropdown.Item href="#">Midge Itz</Dropdown.Item>
                                  <Dropdown.Item href="#">Sal Vidge</Dropdown.Item>
                                  <Dropdown.Item href="#">Other</Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                          </div>
                          <div className="total-comment-block">
                            <Dropdown>
                              <Dropdown.Toggle as={CustomToggle} id="post-option">
                                20 Comment
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item href="#">Max Emum</Dropdown.Item>
                                <Dropdown.Item href="#">Bill Yerds</Dropdown.Item>
                                <Dropdown.Item href="#">Hap E. Birthday</Dropdown.Item>
                                <Dropdown.Item href="#">Tara Misu</Dropdown.Item>
                                <Dropdown.Item href="#">Midge Itz</Dropdown.Item>
                                <Dropdown.Item href="#">Sal Vidge</Dropdown.Item>
                                <Dropdown.Item href="#">Other</Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                        </div>
                        <ShareOffCanvas />
                      </div>
                      <hr />
                      <ul className="post-comments list-inline p-0 m-0">
                        <li className="mb-2">
                          <div className="d-flex flex-wrap">
                            <div className="user-img">
                              <img src={imageUrl} alt="user1" className="avatar-35 rounded-circle img-fluid" />
                            </div>
                            <div className="comment-data-block ms-3">
                              <h6>Monty Carlo</h6>
                              <p className="mb-0">Lorem ipsum dolor sit amet</p>
                              <div className="d-flex flex-wrap align-items-center comment-activity">
                                <Link to="#">like</Link>
                                <Link to="#">reply</Link>
                                <Link to="#">translate</Link>
                                <span> 5 min </span>
                              </div>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="d-flex flex-wrap">
                            <div className="user-img">
                              <img src={imageUrl} alt="user1" className="avatar-35 rounded-circle img-fluid" />
                            </div>
                            <div className="comment-data-block ms-3">
                              <h6>Paul Molive</h6>
                              <p className="mb-0">Lorem ipsum dolor sit amet</p>
                              <div className="d-flex flex-wrap align-items-center comment-activity">
                                <Link to="#">like</Link>
                                <Link to="#">reply</Link>
                                <Link to="#">translate</Link>
                                <span> 5 min </span>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                      <form className="comment-text d-flex align-items-center mt-3">
                        <input type="text" className="form-control rounded" placeholder="Enter Your Comment" />
                        <div className="comment-attagement d-flex">
                          <Link to="#">
                            <i className="ri-link me-3"></i>
                          </Link>
                          <Link to="#">
                            <i className="ri-user-smile-line me-3"></i>
                          </Link>
                          <Link to="#">
                            <i className="ri-camera-line me-3"></i>
                          </Link>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </Col>
            </Col>
            <Col lg={4}>
              {/* ======== right content */}
              <Card>
                <div className="card-header d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="card-title">Events</h4>
                  </div>
                  <div className="card-header-toolbar d-flex align-items-center">
                    <Dropdown>
                      <Dropdown.Toggle
                        as={CustomToggle}
                        id="dropdownMenuButton"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        role="button"
                      >
                        <i className="ri-more-fill h4"></i>
                      </Dropdown.Toggle>
                      <Dropdown.Menu className=" dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                        <Dropdown.Item href="#">
                          <i className="ri-eye-fill me-2"></i>View
                        </Dropdown.Item>
                        <Dropdown.Item href="#">
                          <i className="ri-delete-bin-6-fill me-2"></i>Delete
                        </Dropdown.Item>
                        <Dropdown.Item href="#">
                          <i className="ri-pencil-fill me-2"></i>Edit
                        </Dropdown.Item>
                        <Dropdown.Item href="#">
                          <i className="ri-printer-fill me-2"></i>Print
                        </Dropdown.Item>
                        <Dropdown.Item href="#">
                          <i className="ri-file-download-fill me-2"></i>Download
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
                <Card.Body>
                  <ul className="media-story list-inline m-0 p-0">
                    <li className="d-flex mb-4 align-items-center ">
                      <img src={imageUrl} alt="story1" className="rounded-circle img-fluid" />
                      <div className="stories-data ms-3">
                        <h5>Web Workshop</h5>
                        <p className="mb-0">1 hour ago</p>
                      </div>
                    </li>
                    <li className="d-flex align-items-center">
                      <img src={imageUrl} alt="story2" className="rounded-circle img-fluid" />
                      <div className="stories-data ms-3">
                        <h5>Fun Events and Festivals</h5>
                        <p className="mb-0">1 hour ago</p>
                      </div>
                    </li>
                  </ul>
                </Card.Body>
              </Card>
              <Card>
                <div className="card-header d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="card-title">Upcoming Birthday</h4>
                  </div>
                </div>
                <Card.Body>
                  <ul className="media-story list-inline m-0 p-0">
                    <li className="d-flex mb-4 align-items-center">
                      <img src={imageUrl} alt="story3" className="rounded-circle img-fluid" />
                      <div className="stories-data ms-3">
                        <h5>Anna Sthesia</h5>
                        <p className="mb-0">Today</p>
                      </div>
                    </li>
                    <li className="d-flex align-items-center">
                      <img src={imageUrl} alt="story-img" className="rounded-circle img-fluid" />
                      <div className="stories-data ms-3">
                        <h5>Paul Molive</h5>
                        <p className="mb-0">Tomorrow</p>
                      </div>
                    </li>
                  </ul>
                </Card.Body>
              </Card>
              <Card>
                <div className="card-header d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="card-title">Suggested Pages</h4>
                  </div>
                  <div className="card-header-toolbar d-flex align-items-center">
                    <Dropdown>
                      <Dropdown.Toggle as={CustomToggle}>
                        <i className="ri-more-fill h4"></i>
                      </Dropdown.Toggle>
                      <Dropdown.Menu className="dropdown-menu-right" aria-labelledby="dropdownMenuButton01">
                        <Dropdown.Item href="#">
                          <i className="ri-eye-fill me-2"></i>View
                        </Dropdown.Item>
                        <Dropdown.Item href="#">
                          <i className="ri-delete-bin-6-fill me-2"></i>Delete
                        </Dropdown.Item>
                        <Dropdown.Item href="#">
                          <i className="ri-pencil-fill me-2"></i>Edit
                        </Dropdown.Item>
                        <Dropdown.Item href="#">
                          <i className="ri-printer-fill me-2"></i>Print
                        </Dropdown.Item>
                        <Dropdown.Item href="#">
                          <i className="ri-file-download-fill me-2"></i>Download
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </div>
                <Card.Body>
                  <ul className="suggested-page-story m-0 p-0 list-inline">
                    <li className="mb-3">
                      <div className="d-flex align-items-center mb-3">
                        <img src={imageUrl} alt="story-img" className="rounded-circle img-fluid avatar-50" />
                        <div className="stories-data ms-3">
                          <h5>Iqonic Studio</h5>
                          <p className="mb-0">Lorem Ipsum</p>
                        </div>
                      </div>
                      <img src={imageUrl} className="img-fluid rounded" alt="Responsive" />
                      <div className="mt-3">
                        <Link to="#" className="btn d-block">
                          <i className="ri-thumb-up-line me-2"></i> Like Page
                        </Link>
                      </div>
                    </li>
                    <li>
                      <div className="d-flex align-items-center mb-3">
                        <img src={imageUrl} alt="story-img" className="rounded-circle img-fluid avatar-50" />
                        <div className="stories-data ms-3">
                          <h5>Cakes & Bakes </h5>
                          <p className="mb-0">Lorem Ipsum</p>
                        </div>
                      </div>
                      <img src={imageUrl} className="img-fluid rounded" alt="Responsive" />
                      <div className="mt-3">
                        <Link to="#" className="btn d-block">
                          <i className="ri-thumb-up-line me-2"></i> Like Page
                        </Link>
                      </div>
                    </li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>

            {/*========= icon loadmore =========*/}
            <div className="col-sm-12 text-center">
              <img src={imageUrl} alt="loader" style={{ height: '100px' }} />
            </div>
          </Row>
        </Container>
      </div>
    </>
  );
};
