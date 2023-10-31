import { Link } from 'react-router-dom';
import Navbar from './components/navbar';
import { Header } from './components/header';
import { Timeline } from './timeline';
import { Row, Col, Container, Dropdown, Nav, Tab, OverlayTrigger, Tooltip, Card } from 'react-bootstrap';
import { useState } from 'react';
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
  return (
    <>
      <Container>
        <Row>
          <Header />

          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Navbar />
            <Col sm={12}>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  {/* timeline */}
                  <Timeline />
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <Tab.Container id="left-tabs-example" defaultActiveKey="about1">
                    <Row>
                      <Col md={4}>
                        <Card>
                          <Card.Body>
                            <Nav variant="pills" className=" basic-info-items list-inline d-block p-0 m-0">
                              <Nav.Item>
                                <Nav.Link href="#" eventKey="about1">
                                  Contact and Basic Info
                                </Nav.Link>
                              </Nav.Item>
                              <Nav.Item>
                                <Nav.Link href="#" eventKey="about2">
                                  Hobbies and Interests
                                </Nav.Link>
                              </Nav.Item>
                              <Nav.Item>
                                <Nav.Link href="#" eventKey="about3">
                                  Family and Relationship
                                </Nav.Link>
                              </Nav.Item>
                              <Nav.Item>
                                <Nav.Link href="#" eventKey="about4">
                                  Work and Education
                                </Nav.Link>
                              </Nav.Item>
                              <Nav.Item>
                                <Nav.Link href="#" eventKey="about5">
                                  Places You've Lived
                                </Nav.Link>
                              </Nav.Item>
                            </Nav>
                          </Card.Body>
                        </Card>
                      </Col>
                      <Col md={8} className=" ps-4">
                        <Card>
                          <Card.Body>
                            <Tab.Content>
                              <Tab.Pane eventKey="about1">
                                <h4>Personal Info</h4>
                                <hr />
                                <Row className="mb-2">
                                  <div className="col-3">
                                    <h6>About Me:</h6>
                                  </div>
                                  <div className="col-9">
                                    <p className="mb-0">
                                      Hi, I’m James, I’m 36 and I work as a Digital Designer for the “Daydreams” Agency
                                      in Pier 56
                                    </p>
                                  </div>
                                </Row>
                              </Tab.Pane>
                              <Tab.Pane eventKey="about2">
                                <h4 className="mt-2">Hobbies and Interests</h4>
                                <hr />
                                <h6 className="mb-1">Hobbies:</h6>
                                <p>
                                  Hi, I’m Bni, I’m 26 and I work as a Web Designer for the iqonicdesign.I like to ride
                                  the bike to work, swimming, and working out. I also like reading design magazines, go
                                  to museums, and binge watching a good tv show while it’s raining outside.
                                </p>
                                <h6 className="mt-2 mb-1">Favourite TV Shows:</h6>
                                <p>
                                  Breaking Good, RedDevil, People of Interest, The Running Dead, Found, American Guy.
                                </p>
                                <h6 className="mt-2 mb-1">Favourite Movies:</h6>
                                <p>Idiocratic, The Scarred Wizard and the Fire Crown, Crime Squad, Ferrum Man.</p>
                                <h6 className="mt-2 mb-1">Favourite Games:</h6>
                                <p>
                                  The First of Us, Assassin’s Squad, Dark Assylum, NMAK16, Last Cause 4, Grand Snatch
                                  Auto.
                                </p>
                                <h6 className="mt-2 mb-1">Favourite Music Bands / Artists:</h6>
                                <p>Iron Maid, DC/AC, Megablow, The Ill, Kung Fighters, System of a Revenge.</p>
                                <h6 className="mt-2 mb-1">Favourite Books:</h6>
                                <p>
                                  The Crime of the Century, Egiptian Mythology 101, The Scarred Wizard, Lord of the
                                  Wings, Amongst Gods, The Oracle, A Tale of Air and Water.
                                </p>
                                <h6 className="mt-2 mb-1">Favourite Writers:</h6>
                                <p>
                                  Martin T. Georgeston, Jhonathan R. Token, Ivana Rowle, Alexandria Platt, Marcus Roth.
                                </p>
                              </Tab.Pane>
                              <Tab.Pane eventKey="about3">
                                <h4 className="mb-3">Relationship</h4>
                                <ul className="suggestions-lists m-0 p-0">
                                  <li className="d-flex mb-4 align-items-center">
                                    <div className="user-img img-fluid">
                                      <span className="material-symbols-outlined md-18">add</span>
                                    </div>
                                    <div className="media-support-info ms-3">
                                      <h6>Add Your Relationship Status</h6>
                                    </div>
                                  </li>
                                </ul>
                                <h4 className="mt-3 mb-3">Family Members</h4>
                                <ul className="suggestions-lists m-0 p-0">
                                  <li className="d-flex mb-4 align-items-center">
                                    <div className="user-img img-fluid">
                                      <span className="material-symbols-outlined md-18">add</span>
                                    </div>
                                    <div className="media-support-info ms-3">
                                      <h6>Add Family Members</h6>
                                    </div>
                                  </li>
                                  <li className="d-flex mb-4 align-items-center justify-content-between">
                                    <div className="user-img img-fluid">
                                      <img
                                        loading="lazy"
                                        src={imageUrl}
                                        alt="story1"
                                        className="rounded-circle avatar-40"
                                      />
                                    </div>
                                    <div className="w-100">
                                      <div className="d-flex justify-content-between">
                                        <div className="ms-3">
                                          <h6>Paul Molive</h6>
                                          <p className="mb-0">Brothe</p>
                                        </div>
                                        <div className="edit-relation">
                                          <Link to="#">
                                            <span className="material-symbols-outlined me-2 md-18">edit</span>
                                            Edit
                                          </Link>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                  <li className="d-flex justify-content-between mb-4  align-items-center">
                                    <div className="user-img img-fluid">
                                      <img
                                        loading="lazy"
                                        src={imageUrl}
                                        alt="story-img"
                                        className="rounded-circle avatar-40"
                                      />
                                    </div>
                                    <div className="w-100">
                                      <div className="d-flex flex-wrap justify-content-between">
                                        <div className=" ms-3">
                                          <h6>Anna Mull</h6>
                                          <p className="mb-0">Sister</p>
                                        </div>
                                        <div className="edit-relation">
                                          <Link to="#">
                                            <span className="material-symbols-outlined me-2 md-18">edit</span>
                                            Edit
                                          </Link>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                  <li className="d-flex mb-4 align-items-center justify-content-between">
                                    <div className="user-img img-fluid">
                                      <img
                                        loading="lazy"
                                        src={imageUrl}
                                        alt="story-img"
                                        className="rounded-circle avatar-40"
                                      />
                                    </div>
                                    <div className="w-100">
                                      <div className="d-flex justify-content-between">
                                        <div className="ms-3">
                                          <h6>Paige Turner</h6>
                                          <p className="mb-0">Cousin</p>
                                        </div>
                                        <div className="edit-relation">
                                          <Link to="#">
                                            <span className="material-symbols-outlined me-2 md-18">edit</span>
                                            Edit
                                          </Link>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                </ul>
                              </Tab.Pane>
                              <Tab.Pane eventKey="about4">
                                <h4 className="mb-3">Work</h4>
                                <ul className="suggestions-lists m-0 p-0">
                                  <li className="d-flex justify-content-between mb-4  align-items-center">
                                    <div className="user-img img-fluid">
                                      <span className="material-symbols-outlined md-18">add</span>
                                    </div>
                                    <div className="ms-3">
                                      <h6>Add Work Place</h6>
                                    </div>
                                  </li>
                                  <li className="d-flex mb-4 align-items-center justify-content-between">
                                    <div className="user-img img-fluid">
                                      <img
                                        loading="lazy"
                                        src={imageUrl}
                                        alt="story-img"
                                        className="rounded-circle avatar-40"
                                      />
                                    </div>
                                    <div className="w-100">
                                      <div className="d-flex justify-content-between">
                                        <div className="ms-3">
                                          <h6>Themeforest</h6>
                                          <p className="mb-0">Web Designer</p>
                                        </div>
                                        <div className="edit-relation">
                                          <Link to="#" className="d-flex align-items-center">
                                            <span className="material-symbols-outlined me-2 md-18">edit</span>
                                            Edit
                                          </Link>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                  <li className="d-flex mb-4 align-items-center justify-content-between">
                                    <div className="user-img img-fluid">
                                      <img
                                        loading="lazy"
                                        src={imageUrl}
                                        alt="story-img"
                                        className="rounded-circle avatar-40"
                                      />
                                    </div>
                                    <div className="w-100">
                                      <div className="d-flex flex-wrap justify-content-between">
                                        <div className="ms-3">
                                          <h6>iqonicdesign</h6>
                                          <p className="mb-0">Web Developer</p>
                                        </div>
                                        <div className="edit-relation">
                                          <Link to="#" className="d-flex align-items-center">
                                            <span className="material-symbols-outlined me-2 md-18">edit</span>
                                            Edit
                                          </Link>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                  <li className="d-flex mb-4 align-items-center justify-content-between">
                                    <div className="user-img img-fluid">
                                      <img
                                        loading="lazy"
                                        src={imageUrl}
                                        alt="story-img"
                                        className="rounded-circle avatar-40"
                                      />
                                    </div>
                                    <div className="w-100">
                                      <div className="d-flex flex-wrap justify-content-between">
                                        <div className="ms-3">
                                          <h6>W3school</h6>
                                          <p className="mb-0">Designer</p>
                                        </div>
                                        <div className="edit-relation">
                                          <Link to="#" className="d-flex align-items-center">
                                            <span className="material-symbols-outlined me-2 md-18">edit</span>
                                            Edit
                                          </Link>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                </ul>
                                <h4 className="mb-3">Professional Skills</h4>
                                <ul className="suggestions-lists m-0 p-0">
                                  <li className="d-flex mb-4 align-items-center">
                                    <div className="user-img img-fluid">
                                      <span className="material-symbols-outlined md-18">add</span>
                                    </div>
                                    <div className="ms-3">
                                      <h6>Add Professional Skills</h6>
                                    </div>
                                  </li>
                                </ul>
                                <h4 className="mt-3 mb-3">College</h4>
                                <ul className="suggestions-lists m-0 p-0">
                                  <li className="d-flex mb-4 align-items-center">
                                    <div className="user-img img-fluid">
                                      <span className="material-symbols-outlined md-18">add</span>
                                    </div>
                                    <div className="ms-3">
                                      <h6>Add College</h6>
                                    </div>
                                  </li>
                                  <li className="d-flex mb-4 align-items-center">
                                    <div className="user-img img-fluid">
                                      <img
                                        loading="lazy"
                                        src={imageUrl}
                                        alt="story-img"
                                        className="rounded-circle avatar-40"
                                      />
                                    </div>
                                    <div className="w-100">
                                      <div className="d-flex flex-wrap justify-content-between">
                                        <div className="ms-3">
                                          <h6>Lorem ipsum</h6>
                                          <p className="mb-0">USA</p>
                                        </div>
                                        <div className="edit-relation">
                                          <Link to="#" className="d-flex align-items-center">
                                            <span className="material-symbols-outlined me-2 md-18">edit</span>
                                            Edit
                                          </Link>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                </ul>
                              </Tab.Pane>
                              <Tab.Pane eventKey="about5">
                                <h4 className="mb-3">Current City and Hometown</h4>
                                <ul className="suggestions-lists m-0 p-0">
                                  <li className="d-flex mb-4 align-items-center justify-content-between">
                                    <div className="user-img img-fluid">
                                      <img
                                        loading="lazy"
                                        src={imageUrl}
                                        alt="story-img"
                                        className="rounded-circle avatar-40"
                                      />
                                    </div>
                                    <div className="w-100">
                                      <div className="d-flex flex-wrap justify-content-between">
                                        <div className="ms-3">
                                          <h6>Georgia</h6>
                                          <p className="mb-0">Georgia State</p>
                                        </div>
                                        <div className="edit-relation">
                                          <Link to="#" className="d-flex align-items-center">
                                            <span className="material-symbols-outlined me-2 md-18">edit</span>
                                            Edit
                                          </Link>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                  <li className="d-flex mb-4 align-items-center justify-content-between">
                                    <div className="user-img img-fluid">
                                      <img
                                        loading="lazy"
                                        src={imageUrl}
                                        alt="story-img"
                                        className="rounded-circle avatar-40"
                                      />
                                    </div>
                                    <div className="w-100">
                                      <div className="d-flex flex-wrap justify-content-between">
                                        <div className="ms-3">
                                          <h6>Atlanta</h6>
                                          <p className="mb-0">Atlanta City</p>
                                        </div>
                                        <div className="edit-relation">
                                          <Link to="#" className="d-flex align-items-center">
                                            <span className="material-symbols-outlined me-2 md-18">edit</span>
                                            Edit
                                          </Link>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                </ul>
                                <h4 className="mt-3 mb-3">Other Places Lived</h4>
                                <ul className="suggestions-lists m-0 p-0">
                                  <li className="d-flex mb-4 align-items-center">
                                    <div className="user-img img-fluid">
                                      <span className="material-symbols-outlined md-18">add</span>
                                    </div>
                                    <div className="ms-3">
                                      <h6>Add Place</h6>
                                    </div>
                                  </li>
                                </ul>
                              </Tab.Pane>
                            </Tab.Content>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                  </Tab.Container>
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
                                {' '}
                                Close friends
                              </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link href="#pill-home" eventKey="home-town">
                                {' '}
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
                                                60 <i className="material-symbols-outlined md-14 ms-1">thumb_up</i>{' '}
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
                                                10 <span className="material-symbols-outlined md-14 ms-1">
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
                                                60 <i className="material-symbols-outlined md-14 ms-1">thumb_up</i>{' '}
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
                                                10 <span className="material-symbols-outlined md-14 ms-1">
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
                {/* <div className="col-sm-12 text-center">
                  <img loading="lazy" src={imageUrl} alt="loader" style={{ height: '100px' }} />
                </div> */}
              </Tab.Content>
            </Col>
          </Tab.Container>
        </Row>
      </Container>
    </>
  );
};
