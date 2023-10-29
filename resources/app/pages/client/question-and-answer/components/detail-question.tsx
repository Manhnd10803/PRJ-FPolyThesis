import { QandAService } from '@/apis/services/qanda.service';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Container, Col, Row, Card, Button, Badge, Modal, Form, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { formatDateFromCreatedAt } from '../../blog/components/format-date';
import { UpdateAsk } from './update-ask';
const imageUrl = 'https://picsum.photos/20';

export const DetailQuestionPage = () => {
  const location = useLocation();
  const id = location.pathname.split('/').pop(); // Lấy ID từ URL
  console.log(id);
  const [qAndAData, setQandAData] = useState(null);

  useEffect(() => {
    // Tải dữ liệu từ API khi trang được tạo ra
    QandAService.getDetailQandA(id)
      .then(response => {
        const data = response.data;
        console.log(data);
        setQandAData(data);
      })
      .catch(error => {
        console.error('Lỗi khi hiển thị thông tin câu hỏi:', error);
      });
  }, [id]);

  if (!qAndAData) {
    return <div className="text-center">Loading...</div>;
  }

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
                            Chuyên ngành {qAndAData.qa.majors_id}
                          </Link>
                          <button className=" btn">
                            <div className="card-header-toolbar d-flex align-items-center">
                              <Dropdown>
                                <Dropdown.Toggle as="div" className="lh-1">
                                  <span className="material-symbols-outlined">more_horiz</span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                  <Dropdown.Item href="#">Sửa câu hỏi</Dropdown.Item>
                                  <Dropdown.Item href="#">Xóa câu hỏi</Dropdown.Item>
                                </Dropdown.Menu>
                              </Dropdown>
                            </div>
                          </button>

                          <div className="ms-auto d-flex align-items-center">
                            <div className="ms-auto d-flex align-items-center">
                              <i className="material-symbols-outlined md-16"> thumb_up </i>
                              <span className="mx-1">
                                <small>111</small>
                              </span>
                            </div>

                            <div className="ms-auto d-flex align-items-center">
                              <i className="material-symbols-outlined md-16"> chat_bubble_outline </i>
                              <span className="mx-1">
                                <small>111</small>
                              </span>
                            </div>

                            <i className="material-symbols-outlined md-16">schedule</i>
                            <span className="mx-1">
                              <small>{formatDateFromCreatedAt(qAndAData.qa.created_at)}</small>
                            </span>
                          </div>
                        </div>

                        <h6>Tiêu đề {qAndAData.qa.title}</h6>

                        <p>{qAndAData.qa.content}</p>
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

                        {/* HashTag */}
                        <div>
                          {qAndAData.qa.hashtag.split(',').map((hashtag, index) => (
                            <Badge
                              as={Link}
                              bg=""
                              to="#"
                              className="badge border border-danger text-danger mt-2 h-1 ms-2 me-2"
                              key={index}
                            >
                              {hashtag}
                            </Badge>
                          ))}
                        </div>

                        {/* Icon like cmt */}
                        <div className="text-center mt-4">
                          <p>Tất cả câu trả lời</p>
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
                          {/* <input type="text" className="form-control rounded" placeholder="Write your comment" /> */}
                          <Col sm="12">
                            <Form.Control
                              as="textarea"
                              className="textarea"
                              id="content"
                              rows={5}
                              placeholder="Let us know the problem you are having..."
                            />
                          </Col>
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

          {/*============== Modal Update Ask Question =============*/}
          {/* <Modal
            centered
            size="xl"
            className="fade"
            id="post-modal"
            onHide={}
            show={}
            style={{ paddingTop: '60px', paddingBottom: '30px' }}
          >
            <Modal.Header className="d-flex justify-content-between">
              <Modal.Title id="post-modalLabel">Ask questions</Modal.Title>
              <Link to="#" className="lh-1" onClick={}>
                <span className="material-symbols-outlined">close</span>
              </Link>
            </Modal.Header>
            <Modal.Body>
              <UpdateAsk />
            </Modal.Body>
          </Modal> */}
        </Container>
      </div>
    </>
  );
};
