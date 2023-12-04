import { SearchService } from '@/apis/services/search.service';
import { useEffect, useState } from 'react';
import { Badge, Card, Col, Container, Nav, Row, Tab } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { formatFullName } from '@/utilities/functions';
import parse from 'html-react-parser';
import { momentVi } from '@/utilities/functions/moment-locale';
export const SearchPage = () => {
  const truncateTextStyle = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
  };
  const location = useLocation();
  const navigate = useNavigate();
  const [type, setType] = useState('blog');
  const searchParams = new URLSearchParams(location.search);
  const searchValueFromURL = searchParams.get('search') || '';
  const [searchValue, setSearchValue] = useState(searchValueFromURL);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSearchValue(searchValueFromURL);
  }, [searchValueFromURL]);
  useEffect(() => {
    setSearchValue(searchValueFromURL);

    setLoading(true);
    SearchService.getSearchEverything(type, searchValueFromURL)
      .then(response => {
        console.log(response.data);
        setData(response.data);
      })
      .finally(() => {
        setLoading(false);
      });

    return () => {
      setData([]);
    };
  }, [type, searchValueFromURL]);

  const handleSearchSubmit = () => {
    setLoading(true);
    SearchService.getSearchEverything(type, searchValue)
      .then(response => {
        console.log(response.data);
        setData(response.data);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  console.log(data);
  const handleFormSubmit = (event: any) => {
    const newUrl = `/search?search=${searchValue}`;
    navigate(newUrl);
    event.preventDefault();
    handleSearchSubmit();
  };

  const handleNavClick = (newType: any) => {
    setType(newType);
  };

  return (
    <>
      <Container>
        <Row>
          <Tab.Container id="left-tabs-example" defaultActiveKey="first">
            <Col lg={12}>
              <Card>
                <Card.Body className="p-0">
                  <div className="user-tabing p-3">
                    <form className="iq-comingsoon-form w-100 my-4" onSubmit={handleFormSubmit}>
                      <div className="">
                        <input
                          placeholder="Search Fpoly"
                          type="text"
                          className="comming mb-0 form-control"
                          value={searchValue}
                          onChange={e => setSearchValue(e.target.value)}
                        />
                        <button type="submit" className="btn-primary btn btn-primary d-flex ">
                          Tìm Kiếm
                        </button>
                      </div>
                    </form>
                    <div className="">
                      <Nav
                        variant="pills"
                        className=" d-flex align-items-center text-center profile-forum-items p-0 m-0 justify-content-between"
                      >
                        <Col sm={3} className=" p-0">
                          <Nav.Link eventKey="first" role="button" onClick={() => handleNavClick('blog')}>
                            Blog
                          </Nav.Link>
                        </Col>
                        <Col sm={3} className=" p-0">
                          <Nav.Link eventKey="second" role="button" onClick={() => handleNavClick('qa')}>
                            Câu hỏi
                          </Nav.Link>
                        </Col>
                        <Col sm={3} className=" p-0">
                          <Nav.Link eventKey="third" role="button" onClick={() => handleNavClick('user')}>
                            Bạn bè
                          </Nav.Link>
                        </Col>
                      </Nav>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col sm={12}>
              <Tab.Content className="forum-content">
                <Tab.Pane eventKey="first">
                  <Card>
                    {loading ? (
                      // Display a loading indicator if loading is true
                      <p className="text-center">Loading...</p>
                    ) : (
                      <>
                        {data && data.length > 0 && type == 'blog' ? (
                          data.map((item, index) => (
                            <Row key={index}>
                              <Link to={`/blog/${item.id}`} className="text-black">
                                <Card.Body className="p-3">
                                  <div className="borderbox1 mt-3 rounded d-flex rounded">
                                    <div className="user-img me-2">
                                      <img
                                        loading="lazy"
                                        src={item?.user?.avatar}
                                        alt="userimg"
                                        className="avatar-40 rounded-circle"
                                      />
                                    </div>
                                    <div className="borderbox border rounded p-2">
                                      <div className="d-flex flex-wrap mb-1">
                                        <div>
                                          <div>
                                            {formatFullName(item?.user)} <p>@{item?.user?.username}</p>
                                          </div>
                                        </div>
                                        <span className="text-primary ms-1 d-flex  align-items-start">
                                          <i className="material-symbols-outlined me-2 text-primary md-16">
                                            check_circle
                                          </i>

                                          <Link to="#" className="mb-0">
                                            {item?.major?.majors_name}
                                          </Link>
                                        </span>
                                        <div className="ms-auto d-flex">
                                          <div className="ms-auto d-flex ">
                                            <>
                                              <i className="material-symbols-outlined md-16"> thumb_up </i>
                                              <span className="mx-1">
                                                <small>{item?.likes_count}</small>
                                              </span>
                                            </>
                                          </div>
                                          <div className="ms-auto d-flex ">
                                            <i className="material-symbols-outlined md-16"> chat_bubble_outline </i>
                                            <span className="mx-1">
                                              <small>{item?.comments_count}</small>
                                            </span>
                                          </div>
                                          <div className="ms-auto d-flex ">
                                            <i className="material-symbols-outlined md-16">schedule</i>
                                            <span className="mx-1">
                                              <small>{momentVi(item?.created_at).fromNow()}</small>
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                      <Link to={'#'} className="h5">
                                        {item?.title}
                                      </Link>
                                      <div style={truncateTextStyle}>
                                        {' '}
                                        {item?.content ? parse(JSON.parse(item?.content)) : 'Content not available'}
                                      </div>
                                      <Row className="mt-2"></Row>
                                      {/* Hashtag */}
                                      <div>
                                        <Badge
                                          as={Link}
                                          bg=""
                                          to="#"
                                          className="badge border border-danger text-danger mt-2 h-1 ms-2 me-2"
                                        >
                                          {item?.hashtag}
                                        </Badge>
                                      </div>
                                    </div>
                                  </div>
                                </Card.Body>
                              </Link>
                            </Row>
                          ))
                        ) : (
                          <p className="text-center">Mời bạn thực hiện tìm kiếm</p>
                        )}
                      </>
                    )}
                  </Card>
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <Card>
                    {loading ? (
                      // Display a loading indicator if loading is true
                      <p className="text-center">Loading...</p>
                    ) : (
                      <>
                        {data && data.length > 0 && type == 'qa' ? (
                          data.map((item, index) => (
                            <Row key={index}>
                              <Link to={`/quests/${item.id}`} className="text-black">
                                <Card.Body className="p-3">
                                  <div className="borderbox1 mt-3 rounded d-flex rounded">
                                    <div className="user-img me-2">
                                      <img
                                        loading="lazy"
                                        src={item?.user?.avatar}
                                        alt="userimg"
                                        className="avatar-40 rounded-circle"
                                      />
                                    </div>
                                    <div className="borderbox border rounded p-2">
                                      <div className="d-flex flex-wrap mb-1">
                                        <div>
                                          <div>
                                            {formatFullName(item?.user)} <p>@{item?.user?.username}</p>
                                          </div>
                                        </div>
                                        <span className="text-primary ms-1 d-flex  align-items-start">
                                          <i className="material-symbols-outlined me-2 text-primary md-16">
                                            check_circle
                                          </i>

                                          <Link to="#" className="mb-0">
                                            {item?.major?.majors_name}
                                          </Link>
                                        </span>
                                        <div className="ms-auto d-flex">
                                          <div className="ms-auto d-flex ">
                                            <>
                                              <i className="material-symbols-outlined md-16"> thumb_up </i>
                                              <span className="mx-1">
                                                <small>{item?.likes_count}</small>
                                              </span>
                                            </>
                                          </div>
                                          <div className="ms-auto d-flex ">
                                            <i className="material-symbols-outlined md-16"> chat_bubble_outline </i>
                                            <span className="mx-1">
                                              <small>{item?.comments_count}</small>
                                            </span>
                                          </div>
                                          <div className="ms-auto d-flex ">
                                            <i className="material-symbols-outlined md-16">schedule</i>
                                            <span className="mx-1">
                                              <small>{momentVi(item?.created_at).fromNow()}</small>
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                      <Link to={'#'} className="h5">
                                        {item?.title}
                                      </Link>
                                      <Row className="mt-2"></Row>
                                      {/* Hashtag */}
                                      <div>
                                        <Badge
                                          as={Link}
                                          bg=""
                                          to="#"
                                          className="badge border border-danger text-danger mt-2 h-1 ms-2 me-2"
                                        >
                                          {item?.hashtag}
                                        </Badge>
                                      </div>
                                    </div>
                                  </div>
                                </Card.Body>
                              </Link>
                            </Row>
                          ))
                        ) : (
                          <p className="text-center">Mời bạn thực hiện tìm kiếm</p>
                        )}
                      </>
                    )}
                  </Card>
                </Tab.Pane>
                <Tab.Pane eventKey="third">
                  <Card>
                    <Row className="p-4">
                      {loading ? (
                        // Display a loading indicator if loading is true
                        <p className="text-center">Loading...</p>
                      ) : (
                        <>
                          {data && data.length > 0 && type == 'user' ? (
                            data.map((item, index) => (
                              <Col sm={3} key={index}>
                                <Link to={`/profile/${item.id}`} className="text-black">
                                  <Card className="mb-3">
                                    <Card.Img variant="top" src={item.avatar} alt="ảnh đại diện" />

                                    <Card.Body>
                                      <Card.Title as="h5" className="card-title">
                                        {formatFullName(item)}
                                      </Card.Title>

                                      <Card.Text className="card-text">@{item.username}</Card.Text>
                                      <div className="d-flex flex-column gap-2 mt-2 mt-md-0"></div>
                                    </Card.Body>
                                  </Card>
                                </Link>
                              </Col>
                            ))
                          ) : (
                            <p className="text-center">Mời bạn thực hiện tìm kiếm</p>
                          )}
                        </>
                      )}
                    </Row>
                  </Card>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Tab.Container>
        </Row>
      </Container>
    </>
  );
};
