import { MajorService } from '@/apis/services/major.service';
import { QandAService } from '@/apis/services/qanda.service';
import { formatDateFromCreatedAt } from '@/pages/auth/blog/components/format-date';
import { momentVi } from '@/utilities/functions/moment-locale';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Badge, Row, Container, Col, Card, Nav, Dropdown } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const imageUrl = 'https://picsum.photos/20';

export const ListMostsCmtQAndAs = () => {
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();

  // console.log(data);

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

  const handleDetailsClick = (id: number) => {
    navigate(`/quests/${id}`);
  };

  useEffect(() => {
    QandAService.getMostCommentQandA()
      .then(response => {
        const filteredQAndA = response.data;
        setFilteredData(filteredQAndA);
      })
      .catch(error => {
        console.error('Error fetching filtered data:', error);
      });
  }, []);

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
      case 'f5':
        navigate(`/quests/by-majors/${majorId}`);
        break;

      default:
        break;
    }
  };

  return (
    <>
      <div id="content-page" className="content-page">
        <Container>
          <Row>
            <Col sm="12">
              <Card className="position-relative inner-page-bg bg-primary">
                <div
                  className="d-flex flex-wrap align-items-center justify-content-between p-5"
                  style={{ height: '100px' }}
                >
                  <div className=" d-flex align-items-center text-center profile-forum-items p-0 m-0 w-75">
                    <h3
                      className="text-white"
                      style={{ fontWeight: 'bold', fontSize: '25px', color: 'blue', textTransform: 'uppercase' }}
                    >
                      CÁC CÂU HỎI HAY NHẤT
                    </h3>
                  </div>

                  <Link
                    to="/quests/create"
                    style={{
                      fontWeight: '600',
                    }}
                    className="bg-white px-3 py-2 d-flex align-items-center rounded-2 d-block"
                  >
                    ĐẶT CÂU HỎI MỚI
                  </Link>
                </div>
              </Card>
            </Col>

            {/* List câu hỏi */}

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
                          <Nav.Link eventKey="f1" role="button" onClick={() => handleTabClick('f1')}>
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

            {filteredData &&
              filteredData.map((qandA, index) => (
                <div key={qandA.qa.id} className="borderbox1 mt-3 rounded d-flex rounded">
                  <div className="user-img me-2">
                    <img loading="lazy" src={imageUrl} alt="userimg" className="avatar-40 rounded-circle" />
                  </div>
                  <div className="borderbox border rounded p-2">
                    <div className="d-flex align-items-center flex-wrap mb-2">
                      <h5>{qandA?.qa?.user?.username}</h5>

                      <span className="text-primary ms-1 d-flex align-items-center">
                        <i className="material-symbols-outlined me-2 text-primary md-16">check_circle</i>
                      </span>

                      <Link to="#" className="mb-0">
                        {qandA?.qa?.major?.majors_name}
                      </Link>

                      <div className="ms-auto d-flex align-items-center">
                        <div className="ms-auto d-flex align-items-center">
                          {qandA.like_counts_by_emotion.total_likes > 0 ? (
                            <>
                              <i className="material-symbols-outlined md-16"> thumb_up </i>
                              <span className="mx-1">
                                <small>{qandA.like_counts_by_emotion.total_likes}</small>
                              </span>
                            </>
                          ) : (
                            <>
                              <i className="material-symbols-outlined md-16"> thumb_up </i>
                              <span className="mx-1">
                                <small>0</small>
                              </span>
                            </>
                          )}

                          {/* <i className="material-symbols-outlined md-16"> thumb_up </i>
                    <span className="mx-1">
                      <small>0</small>
                    </span> */}
                        </div>

                        <div className="ms-auto d-flex align-items-center">
                          <i className="material-symbols-outlined md-16"> chat_bubble_outline </i>
                          <span className="mx-1">
                            <small>{qandA.total_comments ? qandA.total_comments : '0'}</small>
                          </span>
                        </div>

                        <i className="material-symbols-outlined md-16 text-primary">schedule</i>
                        <span className="mx-1 text-primary">
                          <small>{momentVi(qandA.qa.created_at).fromNow()}</small>
                        </span>
                      </div>
                    </div>

                    <Link onClick={() => handleDetailsClick(qandA.qa.id)} className="h3">
                      {qandA.qa.title.substring(0, 110)} ...
                    </Link>

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
                  </div>
                </div>
              ))}
          </Row>
        </Container>
      </div>
    </>
  );
};
