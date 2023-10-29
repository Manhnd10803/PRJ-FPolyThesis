import { Row, Col, Nav, Tab, Badge, Button, ButtonGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from '@/components/custom';
import React, { useEffect, useState } from 'react';
import { MajorService } from '@/apis/services/major.service';
import { IMajors } from '@/models/major';
import { useQuery } from '@tanstack/react-query';
import { formatDateFromCreatedAt } from '../../blog/components/format-date';
import { QandAService } from '@/apis/services/qanda.service';
import LikeButton from './like';

const imageUrl = 'https://picsum.photos/20';

export const ListQandAPage = ({ data }: any) => {
  const navigate = useNavigate();
  // console.log(data);

  const handleDetailsClick = (id: number) => {
    QandAService.getDetailQandA(id)
      .then(response => {
        const detailData = response.data;
        const idToPass = detailData.id;
        console.log(`View details of user with ID ${id}`);

        navigate(`/quest/${id}`, { state: { id: idToPass } });
      })
      .catch(error => {
        console.error('Error fetching details:', error);
      });
  };

  return (
    <>
      {/* Danh sách câu hỏi */}
      <Card>
        <Card.Body className="p-0">
          <div className="user-tabing">
            <Tab.Container defaultActiveKey="f1">
              <Col sm="12">
                <Card>
                  <Card.Body className="p-0">
                    <div className="user-tabing p-3">
                      <div className="d-flex flex-wrap align-items-center justify-content-between">
                        <Nav
                          variant="pills"
                          className="d-flex align-items-center text-center profile-forum-items p-0 m-0 w-100"
                        >
                          <Col sm={2} className=" p-0">
                            <Nav.Link eventKey="f1" role="button">
                              Newest
                            </Nav.Link>
                          </Col>
                          <Col sm={2} className=" p-0">
                            {/* Câu trả lời tốt nhất, đáng tin nhất (Có lượt thích nhiều) */}
                            <Nav.Link eventKey="f2" role="button">
                              Score
                            </Nav.Link>
                          </Col>
                          {/* <Col sm={2} className=" p-0">
                          <Nav.Link eventKey="" role="button">Liked Topics</Nav.Link>
                          </Col> */}
                          <Col sm={2} className=" p-0">
                            <Nav.Link eventKey="f3" role="button">
                              Unanswered
                            </Nav.Link>
                          </Col>
                          <Col sm={2} className=" p-0">
                            <Nav.Link eventKey="f4" role="button">
                              Bountied
                            </Nav.Link>
                          </Col>
                          <Col sm={2} className=" p-0">
                            <Nav.Link eventKey="f5" role="button">
                              My Question
                            </Nav.Link>
                          </Col>
                        </Nav>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              </Col>

              <Tab.Content>
                <Tab.Pane eventKey="f1" className="fade show" id="Posts" role="tabpanel">
                  <Card>
                    <Card.Body>
                      {/* Câu hỏi mẫu */}
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

                          <Link to={'/detail-question'} className="h3">
                            Tiêu đề câu hỏi của bạn
                          </Link>

                          <p>Đoạn văn ngắn miêu tả câu hỏi của bạn.</p>
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
                          <div className="d-flex flex-wrap justify-content-evenly mb-0 mt-2">
                            <div className="d-flex align-items-center">
                              <i className="material-symbols-outlined md-16"> thumb_up </i>
                              <h6 className="ms-2">426</h6>
                            </div>
                            <hr className="hr-vertical" />
                            <div className="d-flex align-items-center">
                              <i className="material-symbols-outlined md-16"> chat_bubble_outline </i>
                              <h6 className="ms-2">32</h6>
                            </div>
                            <hr className="hr-vertical" />
                            <div className="d-flex align-items-center">
                              <i className="material-symbols-outlined md-16"> thumb_down </i>
                              <h6 className="ms-2">426</h6>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* List câu hỏi */}

                      {data &&
                        data.map((qandA, index) => (
                          <div key={qandA.qa.id} className="borderbox1 mt-3 rounded d-flex rounded">
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
                                  Chuyên ngành {qandA.qa.majors_id}
                                </Link>
                                <div className="ms-auto d-flex align-items-center">
                                  <i className="material-symbols-outlined md-16">schedule</i>
                                  <span className="mx-1">
                                    <small>{formatDateFromCreatedAt(qandA.qa.created_at)}</small>
                                  </span>
                                </div>
                              </div>

                              <Link onClick={() => handleDetailsClick(qandA.qa.id)} className="h3">
                                {qandA.qa.title}
                              </Link>

                              <p>{qandA.qa.content.substring(0, 120)} ..... </p>
                              {/* {majors?.map((item: IMajors) => <option value={item.id}>{item.majors_name}</option>)} */}
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

                              {/* Hashtag */}
                              <div>
                                {qandA.qa.hashtag.split(',').map((hashtag, index) => (
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

                              <div className="d-flex flex-wrap justify-content-evenly mb-0 mt-2">
                                <LikeButton />
                                <div className="d-flex align-items-center">
                                  <i className="material-symbols-outlined md-16"> thumb_up </i>
                                  <h6 className="ms-2">111</h6>
                                </div>
                                <hr className="hr-vertical" />
                                <div className="d-flex align-items-center">
                                  <i className="material-symbols-outlined md-16"> chat_bubble_outline </i>
                                  <h6 className="ms-2">32</h6>
                                </div>
                                <hr className="hr-vertical" />
                                <div className="d-flex align-items-center">
                                  <i className="material-symbols-outlined md-16"> thumb_down </i>
                                  <h6 className="ms-2">426</h6>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </Card.Body>
                  </Card>
                </Tab.Pane>

                <Tab.Pane eventKey="f2" className="fade show" id="Photos" role="tabpanel">
                  <Card>
                    <Card.Body>
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
                          <div>
                            <h6>All Hash Tag</h6>
                          </div>

                          <p>
                            ReactQuill 2 is here, baby! And it brings a full port to TypeScript and React 16+, a
                            refactored build system, and a general tightening of the internal logic. We worked hard to
                            avoid introducing any behavioral changes. For the vast majority of the cases, no migration
                            is necessary at all. However, support for long-deprecated props, the ReactQuill Mixin, and
                            the Toolbar component have been removed. Be sure to read the migration guide.
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
                          <div className="d-flex flex-wrap justify-content-evenly mb-0 mt-2">
                            <div className="d-flex align-items-center">
                              <i className="material-symbols-outlined md-16"> thumb_up </i>
                              <h6 className="ms-2">426</h6>
                            </div>
                            <hr className="hr-vertical" />
                            <div className="d-flex align-items-center">
                              <i className="material-symbols-outlined md-16"> chat_bubble_outline </i>
                              <h6 className="ms-2">32</h6>
                            </div>
                            <hr className="hr-vertical" />
                            <div className="d-flex align-items-center">
                              <i className="material-symbols-outlined md-16"> thumb_down </i>
                              <h6 className="ms-2">426</h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Tab.Pane>

                <Tab.Pane eventKey="f3" className="fade show" id="Abouts" role="tabpanel">
                  <Card>
                    <Card.Body>
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
                          <div>
                            <h6>All Hash Tag</h6>
                          </div>

                          <p>
                            ReactQuill 2 is here, baby! And it brings a full port to TypeScript and React 16+, a
                            refactored build system, and a general tightening of the internal logic. We worked hard to
                            avoid introducing any behavioral changes. For the vast majority of the cases, no migration
                            is necessary at all. However, support for long-deprecated props, the ReactQuill Mixin, and
                            the Toolbar component have been removed. Be sure to read the migration guide.
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
                          <div className="d-flex flex-wrap justify-content-evenly mb-0 mt-2">
                            <div className="d-flex align-items-center">
                              <i className="material-symbols-outlined md-16"> thumb_up </i>
                              <h6 className="ms-2">426</h6>
                            </div>
                            <hr className="hr-vertical" />
                            <div className="d-flex align-items-center">
                              <i className="material-symbols-outlined md-16"> chat_bubble_outline </i>
                              <h6 className="ms-2">32</h6>
                            </div>
                            <hr className="hr-vertical" />
                            <div className="d-flex align-items-center">
                              <i className="material-symbols-outlined md-16"> thumb_down </i>
                              <h6 className="ms-2">426</h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Tab.Pane>

                <Tab.Pane eventKey="f4" className="fade show" id="Friends" role="tabpanel">
                  <Card>
                    <Card.Body>
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
                          <div>
                            <h6>All Hash Tag</h6>
                          </div>

                          <p>
                            ReactQuill 2 is here, baby! And it brings a full port to TypeScript and React 16+, a
                            refactored build system, and a general tightening of the internal logic. We worked hard to
                            avoid introducing any behavioral changes. For the vast majority of the cases, no migration
                            is necessary at all. However, support for long-deprecated props, the ReactQuill Mixin, and
                            the Toolbar component have been removed. Be sure to read the migration guide.
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
                          <div className="d-flex flex-wrap justify-content-evenly mb-0 mt-2">
                            <div className="d-flex align-items-center">
                              <i className="material-symbols-outlined md-16"> thumb_up </i>
                              <h6 className="ms-2">426</h6>
                            </div>
                            <hr className="hr-vertical" />
                            <div className="d-flex align-items-center">
                              <i className="material-symbols-outlined md-16"> chat_bubble_outline </i>
                              <h6 className="ms-2">32</h6>
                            </div>
                            <hr className="hr-vertical" />
                            <div className="d-flex align-items-center">
                              <i className="material-symbols-outlined md-16"> thumb_down </i>
                              <h6 className="ms-2">426</h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Tab.Pane>

                <Tab.Pane eventKey="f5" className="fade show" id="Abouts" role="tabpanel">
                  <Card>
                    <Card.Body>
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
                          <div>
                            <h6>All Hash Tag</h6>
                          </div>

                          <p>
                            ReactQuill 2 is here, baby! And it brings a full port to TypeScript and React 16+, a
                            refactored build system, and a general tightening of the internal logic. We worked hard to
                            avoid introducing any behavioral changes. For the vast majority of the cases, no migration
                            is necessary at all. However, support for long-deprecated props, the ReactQuill Mixin, and
                            the Toolbar component have been removed. Be sure to read the migration guide.
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
                          <div className="d-flex flex-wrap justify-content-evenly mb-0 mt-2">
                            <div className="d-flex align-items-center">
                              <i className="material-symbols-outlined md-16"> thumb_up </i>
                              <h6 className="ms-2">426</h6>
                            </div>
                            <hr className="hr-vertical" />
                            <div className="d-flex align-items-center">
                              <i className="material-symbols-outlined md-16"> chat_bubble_outline </i>
                              <h6 className="ms-2">32</h6>
                            </div>
                            <hr className="hr-vertical" />
                            <div className="d-flex align-items-center">
                              <i className="material-symbols-outlined md-16"> thumb_down </i>
                              <h6 className="ms-2">426</h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};
