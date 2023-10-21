import { Row, Col, Image, Container, Button, Form } from 'react-bootstrap';
import { Card } from '../components/card';
import { Link } from 'react-router-dom';
import { Comments } from './components/comments';

const DataComments = [
  {
    title: 'There are many variations of passages.',
    date: '2 Weeks ago',
    likes: 20,
    comments: 82,
    content: `
      Voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
      veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
      voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
      voluptatem sequi nesciunt.
    `,
    image:
      'https://images.unsplash.com/photo-1697462247834-7d55761daea3?auto=format&fit=crop&q=60&w=600&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHx8',
  },
  {
    title: 'There are many variations of passages.',
    date: '2 Weeks ago',
    likes: 20,
    comments: 82,
    content: `
      Voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
      veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
      voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
      voluptatem sequi nesciunt.
    `,
    image:
      'https://images.unsplash.com/photo-1697462247834-7d55761daea3?auto=format&fit=crop&q=60&w=600&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHx8',
  },
];

const newImageUrl =
  'https://images.unsplash.com/photo-1697462247834-7d55761daea3?auto=format&fit=crop&q=60&w=600&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHx8';

export const BlogDetailPage = () => {
  return (
    <>
      <div id="content-page" className="content-page">
        <Container>
          <Row>
            <Col lg="8">
              <Card className="card-block card-stretch card-height blog blog-detail">
                <Card.Body>
                  <div className="image-block">
                    <Image src={newImageUrl} className="img-fluid rounded w-100" alt="blog-img" />
                  </div>
                  <div className="blog-description mt-3">
                    <h5 className="mb-3 pb-3 border-bottom">There are many variations of passages.</h5>
                    <div className="blog-meta d-flex align-items-center mb-3 position-right-side flex-wrap">
                      <div className="date date me-4 d-flex align-items-center">
                        <i className="material-symbols-outlined pe-2 md-18 text-primary">calendar_month</i>2 Weeks ago
                      </div>
                      <div className="like date me-4 d-flex align-items-center">
                        <i className="material-symbols-outlined pe-2 md-18 text-primary">thumb_up_alt</i>20 like
                      </div>
                      <div className="comments date me-4 d-flex align-items-center">
                        <i className="material-symbols-outlined pe-2 md-18 text-primary">mode_comment</i>82 comments
                      </div>
                      <div className="share date me-4 d-flex align-items-center">
                        <i className="material-symbols-outlined pe-2 md-18 text-primary">share</i>share
                      </div>
                    </div>
                    <p>
                      Voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore
                      veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                      voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
                      voluptatem sequi nesciunt.
                    </p>
                    <Link className="d-flex align-items-center" to="#" tabIndex="-1">
                      Read More <i className="material-symbols-outlined md-14">arrow_forward_ios</i>
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col lg="4">
              <Card className="card-block card-stretch card-height blog-post">
                <Card.Header className="d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="card-title">New Post</h4>
                  </div>
                </Card.Header>
                <Card.Body>
                  <ul className="list-inline p-0 mb-0 mt-2">
                    <li className="mb-3">
                      <Row className="align-items-top pb-3 border-bottom">
                        <Col md="5">
                          <div className="image-block">
                            <Image src={newImageUrl} className="img-fluid rounded w-100" alt="blog-img" />
                          </div>
                        </Col>
                        <Col md="7">
                          <div className="blog-description mt-1 mt-md-0">
                            <div className="date mb-1">
                              <Link to="#" tabIndex="-1">
                                4 Weeks ago
                              </Link>
                            </div>
                            <h6>All the Lorem Ipsum generators</h6>
                          </div>
                        </Col>
                      </Row>
                    </li>
                    <li className="mb-3">
                      <Row className="align-items-top pb-3 border-bottom">
                        <Col md="5">
                          <div className="image-block">
                            <Image src={newImageUrl} className="img-fluid rounded w-100" alt="blog-img" />
                          </div>
                        </Col>
                        <Col md="7">
                          <div className="blog-description mt-1 mt-md-0">
                            <div className="date mb-1">
                              <Link to="#" tabIndex="-1">
                                3 Weeks ago
                              </Link>
                            </div>
                            <h6>All the Lorem Ipsum generators</h6>
                          </div>
                        </Col>
                      </Row>
                    </li>
                    <li className="mb-3">
                      <Row className="align-items-top pb-3 border-bottom">
                        <Col md="5">
                          <div className="image-block">
                            <Image src={newImageUrl} className="img-fluid rounded w-100" alt="blog-img" />
                          </div>
                        </Col>
                        <Col md="7">
                          <div className="blog-description mt-1 mt-md-0">
                            <div className="date mb-1">
                              <Link to="#" tabIndex="-1">
                                2 Weeks ago
                              </Link>
                            </div>
                            <h6>All the Lorem Ipsum generators</h6>
                          </div>
                        </Col>
                      </Row>
                    </li>
                    <li className="mb-3">
                      <Row className="align-items-top pb-3 border-bottom">
                        <Col md="5">
                          <div className="image-block">
                            <Image src={newImageUrl} className="img-fluid rounded w-100" alt="blog-img" />
                          </div>
                        </Col>
                        <Col md="7">
                          <div className="blog-description mt-1 mt-md-0">
                            <div className="date mb-1">
                              <Link to="#" tabIndex="-1">
                                1 Week ago
                              </Link>
                            </div>
                            <h6>All the Lorem Ipsum generators</h6>
                          </div>
                        </Col>
                      </Row>
                    </li>
                    <li className="mb-3">
                      <Row className="align-items-top pb-3 border-bottom">
                        <Col md="5">
                          <div className="image-block">
                            <Image src={newImageUrl} className="img-fluid rounded w-100" alt="blog-img" />
                          </div>
                        </Col>
                        <Col md="7">
                          <div className="blog-description mt-1 mt-md-0">
                            <div className="date mb-1">
                              <Link to="#" tabIndex="-1">
                                3 days ago
                              </Link>
                            </div>
                            <h6>All the Lorem Ipsum generators</h6>
                          </div>
                        </Col>
                      </Row>
                    </li>
                    <li>
                      <Row className="align-items-top">
                        <Col md="5">
                          <div className="image-block">
                            <Image src={newImageUrl} className="img-fluid rounded w-100" alt="blog-img" />
                          </div>
                        </Col>
                        <Col md="7">
                          <div className="blog-description mt-1 mt-md-0">
                            <div className="date mb-1">
                              <Link to="#" tabIndex="-1">
                                2 Days ago
                              </Link>
                            </div>
                            <h6>All the Lorem Ipsum generators</h6>
                          </div>
                        </Col>
                      </Row>
                    </li>
                  </ul>
                </Card.Body>
              </Card>
            </Col>
            <Col lg="12">
              <Card className="card-block card-stretch card-height blog user-comment">
                <Card.Header className="d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="card-title">User Comment</h4>
                  </div>
                </Card.Header>
                <Card.Body>
                  <Comments data={DataComments} />
                </Card.Body>
              </Card>
            </Col>
            <Col lg="12">
              <Card className="card-block card-stretch card-height blog mb-0">
                <Card.Header className="d-flex justify-content-between">
                  <div className="header-title">
                    <h4 className="card-title">Your Comment</h4>
                  </div>
                </Card.Header>
                <Card.Body>
                  <Form>
                    <Form.Group className="form-group">
                      <Form.Label htmlFor="email1">Email address:</Form.Label>
                      <Form.Control type="email" id="email1" />
                    </Form.Group>
                    <Form.Group className="form-group">
                      <Form.Label htmlFor="pwd">Password:</Form.Label>
                      <Form.Control type="password" id="pwd" />
                    </Form.Group>
                    <Form.Group className="form-group">
                      <Form.Label htmlFor="exampleFormControlTextarea1">Comment</Form.Label>
                      <Form.Control as="textarea" id="exampleFormControlTextarea1" rows={4} />
                    </Form.Group>
                    <Form.Check className="form-check mt-3 mb-3 w-100">
                      <Form.Check.Input type="checkbox" id="remember-box" value="option1" />
                      <Form.Check.Label htmlFor="remember-box">Remember me</Form.Check.Label>
                    </Form.Check>
                    <Button type="button" variant="btn btn-primary me-2 mb-3">
                      Submit
                    </Button>
                    <Button type="button" variant="btn bg-soft-danger mb-3">
                      Cancel
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};
