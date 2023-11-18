import { Row, Col, Nav, Tab, Badge, Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Card } from '@/components/custom';
import React, { useEffect, useState } from 'react';
import { IMajors } from '@/models/major';
import { formatDateFromCreatedAt } from '../../blog/components/format-date';
import { QandAService } from '@/apis/services/qanda.service';
import { ListNewQAndAs } from './components/list-new-qanda';
import { useQuery } from '@tanstack/react-query';
import { MajorService } from '@/apis/services/major.service';

const imageUrl = 'https://picsum.photos/20';

export const ListQandAPage = ({ data }: any) => {
  const navigate = useNavigate();
  const [selectedMajorId, setSelectedMajorId] = useState(null);

  // console.log(data);

  const { data: majors } = useQuery({
    queryKey: ['majors'],
    queryFn: () => MajorService.getMajors(),
  });
  const listMajors = majors?.data;
  // console.log(listMajors);

  const handleMajorSelect = majorId => {
    console.log('Selected Major ID:', majorId);
    setSelectedMajorId(majorId);
    navigate(`/quests/by-majors/${majorId}`);
  };

  const handleTabClick = key => {
    switch (key) {
      case 'f1':
        navigate('/quests');
        break;
      case 'f2':
        navigate('/quests/most-cmt');
        break;
      case 'f3':
        navigate('/quests/no-answer');
        break;
      case 'f4':
        navigate('/quests/my-qanda');
        break;
      default:
        break;
    }
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
                            <Nav.Link eventKey="f2" role="button" onClick={() => handleTabClick('f2')}>
                              Hay nhất
                            </Nav.Link>
                          </Col>
                          <Col sm={2} className=" p-0">
                            <Nav.Link eventKey="f3" role="button" onClick={() => handleTabClick('f3')}>
                              Chưa trả lời
                            </Nav.Link>
                          </Col>
                          <Col sm={2} className=" p-0">
                            <Nav.Link eventKey="f4" role="button" onClick={() => handleTabClick('f4')}>
                              My Question
                            </Nav.Link>
                          </Col>
                          <Col sm={2} className="p-0">
                            <button className=" btn">
                              <div className="card-header-toolbar d-flex align-items-center">
                                <Dropdown>
                                  <Dropdown.Toggle as="div" className="lh-1">
                                    {/* <span className="material-symbols-outlined">more_horiz</span> */}
                                    <Nav.Link eventKey="f5" role="button">
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
              </Tab.Content>
            </Tab.Container>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};
