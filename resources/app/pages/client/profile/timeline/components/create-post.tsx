import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CustomToggle } from '@/components/custom';
import { Button, Card, Dropdown, Modal } from 'react-bootstrap';

const imageUrl = 'https://picsum.photos/20';

export const CreatePost = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Card id="post-modal-data">
        <div className="card-header d-flex justify-content-between">
          <div className="header-title">
            <h4 className="card-title">Create Post</h4>
          </div>
        </div>
        <Card.Body>
          <div className="d-flex align-items-center">
            <div className="user-img">
              <img loading="lazy" src={imageUrl} alt="userimg" className="avatar-60 rounded-circle" />
            </div>
            <form className="post-text ms-3 w-100 " onClick={handleShow}>
              <input
                type="text"
                className="form-control rounded"
                placeholder="Write something here..."
                style={{ border: 'none' }}
              />
            </form>
          </div>
          <hr />
          <ul className=" post-opt-block d-flex list-inline m-0 p-0 flex-wrap">
            <li className="bg-soft-primary rounded p-2 pointer d-flex align-items-center me-3 mb-md-0 mb-2">
              <img loading="lazy" src={imageUrl} alt="icon" className="img-fluid me-2" /> Photo/Video
            </li>
            <li className="bg-soft-primary rounded p-2 pointer d-flex align-items-center me-3 mb-md-0 mb-2">
              <img loading="lazy" src={imageUrl} alt="icon" className="img-fluid me-2" /> Tag Friend
            </li>
            <li className="bg-soft-primary rounded p-2 pointer d-flex align-items-center me-3">
              <img loading="lazy" src={imageUrl} alt="icon" className="img-fluid me-2" /> Feeling/Activity
            </li>
            <li className="bg-soft-primary rounded p-2 pointer text-center">
              <div className="card-header-toolbar d-flex align-items-center">
                <Dropdown>
                  <Dropdown.Toggle as={CustomToggle} id="post-option">
                    <span className="material-symbols-outlined">more_horiz</span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu className=" dropdown-menu-right" aria-labelledby="post-option">
                    <Dropdown.Item onClick={handleShow} href="#">
                      Check in
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleShow} href="#">
                      Live Video
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleShow} href="#">
                      Gif
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleShow} href="#">
                      Watch Party
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleShow} href="#">
                      Play with Friend
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </li>
          </ul>
        </Card.Body>
        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Header className="d-flex justify-content-between">
            <h5 className="modal-title" id="post-modalLabel">
              Create Post
            </h5>
            <button type="button" className="btn btn-secondary lh-1" onClick={handleClose}>
              <span className="material-symbols-outlined">close</span>
            </button>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex align-items-center">
              <div className="user-img">
                <img loading="lazy" src={imageUrl} alt="userimg" className="avatar-60 rounded-circle img-fluid" />
              </div>
              <form className="post-text ms-3 w-100" action="">
                <input
                  type="text"
                  className="form-control rounded"
                  placeholder="Write something here..."
                  style={{ border: 'none' }}
                />
              </form>
            </div>
            <hr />
            <ul className="d-flex flex-wrap align-items-center list-inline m-0 p-0">
              <li className="col-md-6 mb-3">
                <div className="bg-soft-primary rounded p-2 pointer me-3">
                  <Link to="#"></Link>
                  <img loading="lazy" src={imageUrl} alt="icon" className="img-fluid" /> Photo/Video
                </div>
              </li>
              <li className="col-md-6 mb-3">
                <div className="bg-soft-primary rounded p-2 pointer me-3">
                  <Link to="#"></Link>
                  <img loading="lazy" src={imageUrl} alt="icon" className="img-fluid" /> Tag Friend
                </div>
              </li>
              <li className="col-md-6 mb-3">
                <div className="bg-soft-primary rounded p-2 pointer me-3">
                  <Link to="#"></Link>
                  <img loading="lazy" src={imageUrl} alt="icon" className="img-fluid" /> Feeling/Activity
                </div>
              </li>
              <li className="col-md-6 mb-3">
                <div className="bg-soft-primary rounded p-2 pointer me-3">
                  <Link to="#"></Link>
                  <img loading="lazy" src={imageUrl} alt="icon" className="img-fluid" /> Check in
                </div>
              </li>
              <li className="col-md-6 mb-3">
                <div className="bg-soft-primary rounded p-2 pointer me-3">
                  <Link to="#"></Link>
                  <img loading="lazy" src={imageUrl} alt="icon" className="img-fluid" /> Live Video
                </div>
              </li>
              <li className="col-md-6 mb-3">
                <div className="bg-soft-primary rounded p-2 pointer me-3">
                  <Link to="#"></Link>
                  <img loading="lazy" src={imageUrl} alt="icon" className="img-fluid" /> Gif
                </div>
              </li>
              <li className="col-md-6 mb-3">
                <div className="bg-soft-primary rounded p-2 pointer me-3">
                  <Link to="#"></Link>
                  <img loading="lazy" src={imageUrl} alt="icon" className="img-fluid" /> Watch Party
                </div>
              </li>
              <li className="col-md-6 mb-3">
                <div className="bg-soft-primary rounded p-2 pointer me-3">
                  <Link to="#"></Link>
                  <img loading="lazy" src={imageUrl} alt="icon" className="img-fluid" /> Play with Friends
                </div>
              </li>
            </ul>
            <hr />
            <div className="other-option">
              <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                  <div className="user-img me-3">
                    <img loading="lazy" src={imageUrl} alt="userimg" className="avatar-60 rounded-circle img-fluid" />
                  </div>
                  <h6>Your Story</h6>
                </div>
                <div className="card-post-toolbar">
                  <Dropdown>
                    <Dropdown.Toggle
                      className="dropdown-toggle"
                      data-bs-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                      role="button"
                    >
                      <span className="btn btn-primary">Friend</span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-menu m-0 p-0">
                      <Dropdown.Item className="dropdown-item p-3" href="#">
                        <div className="d-flex align-items-top">
                          <i className="ri-save-line h4"></i>
                          <div className="data ms-2">
                            <h6>Public</h6>
                            <p className="mb-0">Anyone on or off Facebook</p>
                          </div>
                        </div>
                      </Dropdown.Item>
                      <Dropdown.Item className="dropdown-item p-3" href="#">
                        <div className="d-flex align-items-top">
                          <i className="ri-close-circle-line h4"></i>
                          <div className="data ms-2">
                            <h6>Friends</h6>
                            <p className="mb-0">Your Friend on facebook</p>
                          </div>
                        </div>
                      </Dropdown.Item>
                      <Dropdown.Item className="dropdown-item p-3" href="#">
                        <div className="d-flex align-items-top">
                          <i className="ri-user-unfollow-line h4"></i>
                          <div className="data ms-2">
                            <h6>Friends except</h6>
                            <p className="mb-0">Don't show to some friends</p>
                          </div>
                        </div>
                      </Dropdown.Item>
                      <Dropdown.Item className="dropdown-item p-3" href="#">
                        <div className="d-flex align-items-top">
                          <i className="ri-notification-line h4"></i>
                          <div className="data ms-2">
                            <h6>Only Me</h6>
                            <p className="mb-0">Only me</p>
                          </div>
                        </div>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            </div>
            <Button variant="primary" className="d-block w-100 mt-3">
              Post
            </Button>
          </Modal.Body>
        </Modal>
      </Card>
    </>
  );
};
