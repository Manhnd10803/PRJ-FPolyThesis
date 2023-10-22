import { Container, Col, Row, Card, Button, Badge, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const imageUrl = 'https://picsum.photos/20';

export const DetailQuestionPage = () => {
  return (
    <>
      <div id="content-page" className="content-page">
        <Container>
          <Card>
            <Card.Body>
              <ul className="post-comments p-0 m-0">
                <li className="mb-2">
                  <div>
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
                          avoid introducing any behavioral changes. For the vast majority of the cases, no migration is
                          necessary at all. However, support for long-deprecated props, the ReactQuill Mixin, and the
                          Toolbar component have been removed. Be sure to read the migration guide.
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
                        {/* Icon like cmt */}
                        <div className="text-center mt-4">
                          <p>Hide 203 Answer</p>
                        </div>
                        {/* Cau tra loi */}
                        <ul className="post-comments p-2  card rounded">
                          <li className="mb-2">
                            <div className="d-flex justify-content-between">
                              <div className="user-img">
                                <img src={imageUrl} alt="userimg" className="avatar-40 me-3 rounded-circle img-fluid" />
                              </div>
                              <div className="w-100 text-margin">
                                <div className="">
                                  <h5 className="mb-0 d-inline-block me-1">Emma Labelle</h5>
                                  <h6 className=" mb-0 d-inline-block">2 weeks ago</h6>
                                </div>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. </p>
                              </div>
                            </div>
                          </li>
                        </ul>

                        <form className="d-flex align-items-center mt-3" action="#">
                          <input type="text" className="form-control rounded" placeholder="Write your comment" />
                          <div className="comment-attagement d-flex align-items-center me-4">
                            <span className="material-symbols-outlined md-18 me-1"> comment </span>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </>
  );
};
