import { SearchService } from '@/apis/services/search.service';
import { useEffect, useState } from 'react';
import { Badge, Card, Col, Container, Nav, Row, Tab } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { formatFullName } from '@/utilities/functions';
import parse from 'html-react-parser';
import { momentVi } from '@/utilities/functions/moment-locale';
import { hideImages } from '@/utilities/funcJsonImage';
import { CardLoadBlogSearch, CardLoadFriendOther, CardLoadQaSearch } from '@/utilities/funcLoadFriend/CardLoad';
import { useInfiniteQuery } from '@tanstack/react-query';
import { pathName } from '@/routes/path-name';
import { useInView } from 'react-intersection-observer';
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
  let { hash } = useLocation();
  let activeTab = hash.split('#')[1] || 'blog';
  const { ref: endRef, inView: endInView } = useInView();
  useEffect(() => {
    setSearchValue(searchValueFromURL);
  }, [searchValueFromURL]);

  const fetchSearch = async ({ pageParam = 1 }) => {
    const { data } = await SearchService.getSearchEverything(type, searchValueFromURL, pageParam);
    return data;
  };

  const queryKeySearchBar = ['search', type, searchValueFromURL];

  const {
    data: dataSearch,
    isLoading,
    fetchNextPage,
    isFetching,
    hasNextPage,
  } = useInfiniteQuery(queryKeySearchBar, {
    queryFn: fetchSearch,
    getNextPageParam: (lastPage, _) => {
      if (lastPage.current_page === lastPage.last_page) {
        return undefined;
      }
      return lastPage.current_page + 1;
    },
    enabled: searchValueFromURL !== '',
    // keepPreviousData: true,
    staleTime: 600000,
  });

  useEffect(() => {
    if (endInView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [endInView, isFetching, hasNextPage, fetchNextPage]);

  const listFriend = dataSearch?.pages.flatMap(page => page.data);

  const handleSubmitForm = (event: any) => {
    event.preventDefault();
    setSearchValue(event.target.value);

    const newUrl = `/search?search=${searchValue}#${activeTab}`;
    navigate(newUrl);
  };

  const handleNavClick = (newType: any) => {
    setType(newType);
  };
  return (
    <>
      <Container>
        <div className="content-page">
          <Row>
            <Tab.Container id="left-tabs-example" activeKey={activeTab}>
              <Col lg={12}>
                <Card>
                  <Card.Body className="p-0">
                    <div className="user-tabing p-3">
                      <form className="iq-comingsoon-form w-100 my-4" onSubmit={handleSubmitForm}>
                        <div className="">
                          <input
                            placeholder="Tìm kiếm trên FpolyZone"
                            type="text"
                            className="comming mb-0 form-control"
                            value={searchValue}
                            onChange={(event: any) => setSearchValue(event.target.value)}
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
                            <Nav.Link eventKey="blog" href="#blog" role="button" onClick={() => handleNavClick('blog')}>
                              Blog
                            </Nav.Link>
                          </Col>
                          <Col sm={3} className=" p-0">
                            <Nav.Link eventKey="qa" href="#qa" role="button" onClick={() => handleNavClick('qa')}>
                              Câu hỏi
                            </Nav.Link>
                          </Col>
                          <Col sm={3} className=" p-0">
                            <Nav.Link eventKey="post" href="#post" role="button" onClick={() => handleNavClick('post')}>
                              Bảng tin
                            </Nav.Link>
                          </Col>

                          <Col sm={3} className=" p-0">
                            <Nav.Link
                              eventKey="friend"
                              href="#friend"
                              role="button"
                              onClick={() => handleNavClick('user')}
                            >
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
                  <Tab.Pane eventKey="blog">
                    <Card>
                      {isLoading ? (
                        <>
                          <CardLoadBlogSearch />
                          <CardLoadBlogSearch />
                          <CardLoadBlogSearch />
                        </>
                      ) : (
                        <>
                          {listFriend && listFriend.length > 0 && type == 'blog' ? (
                            listFriend.map((item, index) => (
                              <Row key={index}>
                                <Link to={`${pathName.BLOG}/${item.id}`} className="text-black">
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
                                            <div className="d-flex gap-2">
                                              <div>{formatFullName(item?.user)}</div>{' '}
                                              <span className="text-secondary">@{item?.user?.username}</span>
                                            </div>
                                            <span className="text-primary ms-1 d-flex  align-items-center">
                                              <i className="material-symbols-outlined me-2 text-primary md-16">
                                                check_circle
                                              </i>
                                              <Link to="#" className="mb-0">
                                                {item?.major?.majors_name}
                                              </Link>
                                            </span>
                                          </div>
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
                                        <h5>{item?.title}</h5>
                                        <div style={truncateTextStyle}>
                                          {item?.content ? parse(hideImages(JSON.parse(item?.content))) : ''}
                                        </div>
                                        <Row className="mt-2"></Row>
                                        {item?.hashtag && (
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
                                        )}
                                      </div>
                                    </div>
                                  </Card.Body>
                                </Link>
                              </Row>
                            ))
                          ) : (
                            <span className="text-center my-3">Mời bạn thực hiện tìm kiếm</span>
                          )}
                        </>
                      )}
                      {isFetching && listFriend && listFriend.length > 0 ? <CardLoadBlogSearch /> : null}
                    </Card>
                  </Tab.Pane>
                  <Tab.Pane eventKey="qa">
                    <Card>
                      {isLoading ? (
                        <>
                          <CardLoadQaSearch />
                          <CardLoadQaSearch />
                          <CardLoadQaSearch />
                        </>
                      ) : (
                        <>
                          {listFriend && listFriend.length > 0 && type == 'qa' ? (
                            listFriend.map((item, index) => (
                              <Row key={index}>
                                <Link to={`${pathName.QUESTS_DETAIL}/${item.id}`} className="text-black">
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
                                            <div className="d-flex gap-2">
                                              <div>{formatFullName(item?.user)}</div>{' '}
                                              <span className="text-secondary">@{item?.user?.username}</span>
                                            </div>
                                            <span className="text-primary ms-1 d-flex  align-items-center">
                                              <i className="material-symbols-outlined me-2 text-primary md-16">
                                                check_circle
                                              </i>
                                              <Link to="#" className="mb-0">
                                                {item?.major?.majors_name}
                                              </Link>
                                            </span>
                                          </div>
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
                                        <h5>{item?.title}</h5>
                                        <Row className="mt-2"></Row>
                                        {/* Hashtag */}
                                        {item?.hashtag && (
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
                                        )}
                                      </div>
                                    </div>
                                  </Card.Body>
                                </Link>
                              </Row>
                            ))
                          ) : (
                            <span className="text-center my-3">Mời bạn thực hiện tìm kiếm</span>
                          )}
                        </>
                      )}
                      {isFetching && listFriend && listFriend.length > 0 ? <CardLoadQaSearch /> : null}
                    </Card>
                  </Tab.Pane>
                  <Tab.Pane eventKey="post">
                    <Card>
                      {isLoading ? (
                        <>
                          <CardLoadQaSearch />
                          <CardLoadQaSearch />
                          <CardLoadQaSearch />
                        </>
                      ) : (
                        <>
                          {listFriend && listFriend.length > 0 && type == 'post' ? (
                            listFriend.map((item, index) => (
                              <Row key={index}>
                                <Link to={`${pathName.POST}/${item.id}`} className="text-black">
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
                                              {formatFullName(item?.user)}{' '}
                                              <p className="text-secondary">@{item?.user?.username}</p>
                                            </div>
                                          </div>
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

                                        <Row className="mt-2"></Row>
                                        {/* Hashtag */}
                                        <div style={truncateTextStyle}>{item?.content ? item?.content : '...'}</div>
                                        {item?.hashtag && (
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
                                        )}
                                      </div>
                                    </div>
                                  </Card.Body>
                                </Link>
                              </Row>
                            ))
                          ) : (
                            <span className="text-center my-3">Mời bạn thực hiện tìm kiếm</span>
                          )}
                        </>
                      )}
                      {isFetching && listFriend && listFriend.length > 0 ? <CardLoadQaSearch /> : null}
                    </Card>
                  </Tab.Pane>
                  <Tab.Pane eventKey="friend">
                    <Card>
                      <Row className="p-4">
                        {isLoading ? (
                          <>
                            <CardLoadFriendOther />
                            <CardLoadFriendOther />
                            <CardLoadFriendOther />
                          </>
                        ) : (
                          <>
                            {listFriend && listFriend.length > 0 && type == 'user' ? (
                              listFriend.map((item, index) => (
                                <Col key={index} xl={3} lg={4} md={6} sm={12}>
                                  <Link to={`${pathName.PROFILE}/${item.id}`} className="text-black">
                                    <Card className="mb-3">
                                      <Card.Img variant="top" src={item?.avatar} alt="ảnh đại diện" />
                                      <Card.Body>
                                        <Card.Title as="h5" className="card-title">
                                          {formatFullName(item)}
                                        </Card.Title>

                                        <Card.Text className="card-text text-secondary">@{item?.username}</Card.Text>
                                        <div className="d-flex flex-column gap-2 mt-2 mt-md-0"></div>
                                      </Card.Body>
                                    </Card>
                                  </Link>
                                </Col>
                              ))
                            ) : (
                              <span className="text-center my-3">Mời bạn thực hiện tìm kiếm</span>
                            )}
                          </>
                        )}
                        {isFetching && listFriend && listFriend.length > 0 ? <CardLoadFriendOther /> : null}
                      </Row>
                    </Card>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Tab.Container>
            <div ref={endRef}></div>
          </Row>
        </div>
      </Container>
    </>
  );
};
