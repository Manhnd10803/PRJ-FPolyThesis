import { Form, Image, Modal, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

type SearchBarMobileProps = {
  show: boolean;
  handleShow: () => void;
  handleClose: () => void;
};

const imageUrl = 'https://picsum.photos/50';

export const SearchBarMobile = ({ show, handleShow, handleClose }: SearchBarMobileProps) => {
  return (
    <Nav.Item as="li" className="d-lg-none">
      <div className="iq-search-bar device-search  position-relative">
        <form
          action="#"
          className="searchbox"
          onClick={handleShow}
          data-bs-toggle="modal"
          data-bs-target="#exampleModalFullscreenSm"
        >
          <Link className="search-link d-none d-lg-block" to="/">
            <span className="material-symbols-outlined">search</span>
          </Link>
          <Form.Control
            type="text"
            className="text search-input form-control bg-soft-primary  d-none d-lg-block"
            placeholder="Search here..."
          />
          <Link
            className="d-lg-none d-flex"
            to="/"
            onClick={handleShow}
            data-bs-toggle="modal"
            data-bs-target="#exampleModalFullscreenSm"
          >
            <span className="material-symbols-outlined">search</span>
          </Link>
        </form>

        <Modal show={show} onHide={handleClose} className="search-modal" id="post-modal">
          <div className="modal-dialog modal-fullscreen-lg-down m-0">
            <Modal.Header className="py-2">
              <div className="d-flex align-items-center justify-content-between d-lg-none w-100">
                <form
                  action="#"
                  className="searchbox w-50"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModalFullscreenSm"
                  onClick={handleShow}
                >
                  <Link className="search-link" to="/">
                    <span className="material-symbols-outlined">search</span>
                  </Link>

                  <Form.Control
                    type="text"
                    className="text search-input bg-soft-primary"
                    placeholder="Search here..."
                  />
                </form>

                <Link to="/" className="material-symbols-outlined text-dark" onClick={handleClose}>
                  close
                </Link>
              </div>
              {/* <Modal.Title> */}
              <div className="d-flex align-items-center justify-content-between ms-auto w-100">
                <h5 className=" h4" id="exampleModalFullscreenLabel">
                  Recent
                </h5>

                <Link to="/" className="text-dark">
                  Clear All
                </Link>
              </div>
              {/* </Modal.Title> */}
            </Modal.Header>
            <Modal.Body className="p-0">
              <div className="d-flex d-lg-none align-items-center justify-content-between w-100 p-3 pb-0">
                <h5 className=" h4" id="exampleModalFullscreenLabel">
                  Recent
                </h5>

                <Link to="/" className="text-dark">
                  Clear All
                </Link>
              </div>
              <div className="d-flex align-items-center border-bottom search-hover py-2 px-3">
                <div className="flex-shrink-0">
                  <Image
                    className="align-self-center img-fluid avatar-50 rounded-pill"
                    src={imageUrl}
                    alt=""
                    loading="lazy"
                  />
                </div>

                <div className="d-flex flex-column ms-3">
                  <Link to="/" className="h5">
                    Paige Turner
                  </Link>

                  <span>Paige001</span>
                </div>

                <div className="d-flex align-items-center ms-auto">
                  <Link to="/" className="me-3 d-flex align-items-center">
                    <small>Follow</small>{' '}
                  </Link>

                  <Link to="/" className="material-symbols-outlined text-dark">
                    close
                  </Link>
                </div>
              </div>
              <div className="d-flex align-items-center border-bottom search-hover py-2 px-3">
                <div className="flex-shrink-0">
                  <Image
                    className="align-self-center img-fluid avatar-50 rounded-pill"
                    src={imageUrl}
                    alt=""
                    loading="lazy"
                  />
                </div>

                <div className="d-flex flex-column ms-3">
                  <Link to="/" className="h5">
                    Monty Carlo
                  </Link>

                  <span>Carlo.m</span>
                </div>

                <div className="d-flex align-items-center ms-auto">
                  <Link to="/" className="me-3 d-flex align-items-center">
                    <small>Unfollow</small>{' '}
                  </Link>

                  <Link to="/" className="material-symbols-outlined text-dark">
                    close
                  </Link>
                </div>
              </div>
              <div className="d-flex align-items-center search-hover py-2 px-3 border-bottom">
                <div className="flex-shrink-0">
                  <Image
                    className="align-self-center img-fluid avatar-50 rounded-pill"
                    src={imageUrl}
                    alt=""
                    loading="lazy"
                  />
                </div>

                <div className="d-flex flex-column ms-3">
                  <Link to="/" className="h5">
                    Paul Molive
                  </Link>

                  <span>Paul.45</span>
                </div>

                <div className="d-flex align-items-center ms-auto">
                  <Link to="/" className="me-3 d-flex align-items-center">
                    <small>Request</small>{' '}
                  </Link>

                  <Link to="/" className="material-symbols-outlined text-dark">
                    close
                  </Link>
                </div>
              </div>
              <div className="">
                <h4 className="px-3 py-2">Suggestions</h4>

                <div className="suggestion-card px-3 d-flex">
                  <div className="text-center story">
                    <div className="story-profile">
                      <Image className="avatar-50 rounded-pill" src={imageUrl} alt="" loading="lazy" />

                      <Link to="/" className="h6 mt-0 mt-lg-2 ms-3 ms-lg-0 text-ellipsis short-2 small">
                        Ammy Paul
                      </Link>
                    </div>

                    <Link to="/" className="d-lg-none align-items-center d-flex">
                      <small>Follow</small>{' '}
                    </Link>
                  </div>

                  <div className="text-center story">
                    <div className="story-profile">
                      <Image className="avatar-50 rounded-pill" src={imageUrl} alt="" loading="lazy" />

                      <Link to="/" className="h6 mt-0 mt-lg-2 ms-3 ms-lg-0 text-ellipsis short-2 small">
                        Roger Carlo
                      </Link>
                    </div>

                    <Link to="/" className="d-lg-none align-items-center d-flex">
                      <small>Unfollow</small>{' '}
                    </Link>
                  </div>

                  <div className="text-center story ">
                    <div className="story-profile">
                      <Image className="avatar-50 rounded-pill" src={imageUrl} alt="" loading="lazy" />

                      <Link to="/" className="h6 mt-0 mt-lg-2 ms-3 ms-lg-0 text-ellipsis short-2 small">
                        Justin Molive
                      </Link>
                    </div>

                    <Link to="/" className="d-lg-none align-items-center d-flex">
                      <small>Follow</small>{' '}
                    </Link>
                  </div>

                  <div className="text-center story">
                    <div className="story-profile ">
                      <Image className="avatar-50 rounded-pill" src={imageUrl} alt="" loading="lazy" />

                      <Link to="/" className="h6 mt-0 mt-lg-2 ms-3 ms-lg-0 text-ellipsis short-2 small">
                        Roy Fisher
                      </Link>
                    </div>

                    <Link to="/" className="d-lg-none align-items-center d-flex">
                      <small>Request</small>{' '}
                    </Link>
                  </div>

                  <div className="text-center story">
                    <div className="story-profile">
                      <Image className="avatar-50 rounded-pill" src={imageUrl} alt="" loading="lazy" />

                      <Link to="/" className="h6 mt-0 mt-lg-2 ms-3 ms-lg-0 text-ellipsis short-2 small">
                        Johan Carlo
                      </Link>
                    </div>

                    <Link to="/" className="d-lg-none align-items-center d-flex">
                      <small>Follow</small>{' '}
                    </Link>
                  </div>

                  <div className="text-center story">
                    <div className="story-profile">
                      <Image className="avatar-50 rounded-pill" src={imageUrl} alt="" loading="lazy" />

                      <Link to="/" className="h6 mt-0 mt-lg-2 ms-3 ms-lg-0 text-ellipsis short-2 small">
                        MedrLink Miles
                      </Link>
                    </div>

                    <Link to="/" className="d-lg-none align-items-center d-flex">
                      <small>Unfollow</small>{' '}
                    </Link>
                  </div>

                  <div className="text-center story">
                    <div className="story-profile">
                      <Image className="avatar-50 rounded-pill" src={imageUrl} alt="" loading="lazy" />

                      <Link to="/" className="h6 mt-0 mt-lg-2 ms-3 ms-lg-0 text-ellipsis short-2 small">
                        Aohan Paul
                      </Link>
                    </div>

                    <Link to="/" className="d-lg-none align-items-center d-flex">
                      <small>Request</small>{' '}
                    </Link>
                  </div>

                  <div className="text-center story">
                    <div className="story-profile">
                      <Image className="avatar-50 rounded-pill" src={imageUrl} alt="" loading="lazy" />

                      <Link to="/" className="h6 mt-0 mt-lg-2 ms-3 ms-lg-0 text-ellipsis short-2 small">
                        Rokni Joy
                      </Link>
                    </div>

                    <Link to="/" className="d-lg-none align-items-center d-flex">
                      <small>Follow</small>{' '}
                    </Link>
                  </div>

                  <div className="text-center story">
                    <div className="story-profile">
                      <Image className="avatar-50 rounded-pill" src={imageUrl} alt="" loading="lazy" />

                      <Link to="/" className="h6 mt-0 mt-lg-2 ms-3 ms-lg-0 text-ellipsis short-2 small">
                        Sepid Ryan
                      </Link>
                    </div>

                    <Link to="/" className="d-lg-none align-items-center d-flex">
                      <small>Unfollow</small>{' '}
                    </Link>
                  </div>
                </div>
              </div>
            </Modal.Body>
          </div>
        </Modal>
      </div>
    </Nav.Item>
  );
};
