import { Row, Col, Nav, Tab, Badge, Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from '@/components/custom';
import React, { useEffect, useState } from 'react';
import { IMajors } from '@/models/major';
import { formatDateFromCreatedAt } from '../../blog/components/format-date';
import { QandAService } from '@/apis/services/qanda.service';
import { ListNewQAndAs } from './components/list-new-qanda';
import { ListMostsCmtQAndAs } from './components/list-best-cmt-qanda';
import { ListNoAnswerQAndAs } from './components/list-no-answer-qanda';
import { ListMyQAndAs } from './components/list-my-qanda';
import { useQuery } from '@tanstack/react-query';
import { MajorService } from '@/apis/services/major.service';
import { ListQAndAsByMajorId } from './components/list-qanda-major';

const imageUrl = 'https://picsum.photos/20';

export const ListQandAPage = ({ data }: any) => {
  // const navigate = useNavigate();
  const [selectedMajorId, setSelectedMajorId] = useState(null);

  console.log(data);

  const { data: majors } = useQuery({
    queryKey: ['majors'],
    queryFn: () => MajorService.getMajors(),
  });
  const listMajors = majors?.data;
  console.log(listMajors);

  const handleMajorSelect = majorId => {
    console.log('Selected Major ID:', majorId);
    setSelectedMajorId(majorId);
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
                              Tất cả
                            </Nav.Link>
                          </Col>
                          <Col sm={2} className=" p-0">
                            {/* Câu trả lời tốt nhất, đáng tin nhất (Có lượt thích nhiều) */}
                            <Nav.Link eventKey="f2" role="button">
                              Hay nhất
                            </Nav.Link>
                          </Col>
                          {/* <Col sm={2} className=" p-0">
                          <Nav.Link eventKey="" role="button">Liked Topics</Nav.Link>
                          </Col> */}
                          <Col sm={2} className=" p-0">
                            <Nav.Link eventKey="f3" role="button">
                              Chưa trả lời
                            </Nav.Link>
                          </Col>
                          {/* <Col sm={2} className=" p-0">
                            <Nav.Link eventKey="f4" role="button">
                              Nhiều Like
                            </Nav.Link>
                          </Col> */}
                          <Col sm={2} className=" p-0">
                            <Nav.Link eventKey="f5" role="button">
                              My Question
                            </Nav.Link>
                          </Col>
                          <Col sm={2} className="p-0">
                            <button className=" btn">
                              <div className="card-header-toolbar d-flex align-items-center">
                                <Dropdown>
                                  <Dropdown.Toggle as="div" className="lh-1">
                                    {/* <span className="material-symbols-outlined">more_horiz</span> */}
                                    <Nav.Link eventKey="f6" role="button">
                                      Chuyên ngành
                                    </Nav.Link>
                                  </Dropdown.Toggle>
                                  <Dropdown.Menu>
                                    {listMajors?.map((item: IMajors) => (
                                      <Dropdown.Item
                                        href="#"
                                        eventKey="f7"
                                        role="button"
                                        key={item.id}
                                        onClick={() => handleMajorSelect(item.id)}
                                      >
                                        {item.majors_name}
                                      </Dropdown.Item>
                                    ))}

                                    {/* <Dropdown.Item href="#" eventKey="f8" role="button">
                                      Xóa câu hỏi
                                    </Dropdown.Item> */}
                                  </Dropdown.Menu>
                                </Dropdown>
                              </div>
                            </button>
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
                      {/* Danh sách câu hỏi mới nhất ( ALL CÂU HỎI ) */}
                      <ListNewQAndAs data={data} />
                    </Card.Body>
                  </Card>
                </Tab.Pane>

                <Tab.Pane eventKey="f2" className="fade show" id="Photos" role="tabpanel">
                  <Card>
                    <Card.Body>
                      {/* Danh sách câu hỏi hay nhất */}
                      <ListMostsCmtQAndAs data={data} />
                    </Card.Body>
                  </Card>
                </Tab.Pane>

                <Tab.Pane eventKey="f3" className="fade show" id="Abouts" role="tabpanel">
                  <Card>
                    <Card.Body>
                      {/* Danh sách câu hỏi chưa có câu trả lời */}
                      <ListNoAnswerQAndAs data={data} />
                    </Card.Body>
                  </Card>
                </Tab.Pane>

                <Tab.Pane eventKey="f4" className="fade show" id="Friends" role="tabpanel">
                  <Card>
                    <Card.Body>
                      {/* Danh sách câu hỏi nhiều like nhất */}
                      {/* <ListBestLikeQAndAs /> */}
                    </Card.Body>
                  </Card>
                </Tab.Pane>

                <Tab.Pane eventKey="f5" className="fade show" id="Abouts" role="tabpanel">
                  <Card>
                    <Card.Body>
                      {/* Danh sách câu hỏi của bạn */}
                      <ListMyQAndAs data={data} />
                    </Card.Body>
                  </Card>
                </Tab.Pane>

                <Tab.Pane eventKey="f7" className="fade show" id="Abouts" role="tabpanel">
                  <Card>
                    <Card.Body>
                      {/* Danh sách câu hỏi của bạn */}

                      <ListQAndAsByMajorId data={data} majorId={selectedMajorId} />
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
