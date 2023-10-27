import { Card } from '@/components/custom';
import { Row, Col, Image, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const Comments = () => {
  return (
    <>
      <Col lg="12">
        <Card className="card-block card-stretch card-height blog user-comment">
          <Card.Header className="d-flex justify-content-between">
            <div className="header-title">
              <h4 className="card-title">User Comment</h4>
            </div>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col lg="12">
                <Card className="card-block card-stretch card-height blog">
                  <Card.Body>
                    {/* Comment content */}
                    <div className="d-flex align-items-center">
                      <div className="user-image mb-3">
                        <Image
                          className="avatar-80 rounded"
                          src={
                            'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=60&w=600&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww'
                          }
                          alt="#"
                          data-original-title=""
                          title=""
                        />
                      </div>
                      <div className="ms-3">
                        <h5>Hoang Dung</h5>
                        <p>Developer</p>
                      </div>
                    </div>
                    <div className="blog-description">
                      <p>Phần code react đó của bạn rất hay</p>
                      <div className="d-flex align-items-center justify-content-between mb-2 position-right-side">
                        <div className="d-flex align-items-center gap-3">
                          <Link to="#" className="comments d-flex align-items-center">
                            <span className="material-symbols-outlined">reply</span>
                            reply
                          </Link>
                          <Link to="#" className="comments d-flex align-items-center">
                            <i className="material-symbols-outlined pe-2 md-18 text-primary">mode_comment</i>
                            <div>
                              <span>4</span> comment
                            </div>
                          </Link>
                          <span>4 phút</span>
                        </div>
                      </div>
                      <Form className="comment-text d-flex align-items-center mt-3 gap-2">
                        <input type="text" className="form-control rounded" placeholder="Enter Your Comment" />
                        <Button
                          type="submit" // Đảm bảo nút có kiểu submit
                          variant="btn btn-primary d-flex align-items-center "
                        >
                          <span className="material-symbols-outlined">send</span>
                        </Button>
                      </Form>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg="12" className="ps-0 ps-md-5">
                <Card className="card-block card-stretch card-height blog">
                  <Card.Body>
                    <div className="d-flex align-items-center">
                      <div className="user-image mb-3">
                        <Image
                          className="avatar-80 rounded"
                          src={
                            'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=60&w=600&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww'
                          }
                          alt="#"
                          data-original-title=""
                          title=""
                        />
                      </div>
                      <div className="ms-3">
                        <h5>Phan Luan</h5>
                        <p>Developer</p>
                      </div>
                    </div>
                    <div className="blog-description">
                      <p>
                        <span className="text-primary">@Hoang Dung</span> Khá hay
                      </p>
                      <div className="d-flex align-items-center gap-3 mb-2 position-right-side">
                        <Link to="#" className="comments d-flex align-items-center">
                          <span className="material-symbols-outlined">reply</span>
                          reply
                        </Link>
                        <span>3 phút</span>
                      </div>
                      <Form className="comment-text d-flex align-items-center mt-3 gap-2">
                        <input type="text" className="form-control rounded" placeholder="Enter Your Comment" />
                        <Button type="submit" variant="btn btn-primary d-flex align-items-center">
                          <span className="material-symbols-outlined">send</span>
                        </Button>
                      </Form>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};
