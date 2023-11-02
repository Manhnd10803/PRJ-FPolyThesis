import { useState } from 'react';
import { Card, Col, Nav, Row, Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { formatTime } from '../components/format-time';

export const MyBlog = ({ listBlog, isLoading }) => {
  const [searchQueries, setSearchQueries] = useState({
    about1: '',
    about2: '',
    about3: '',
  });

  const handleSearchInputChange = (tabKey, query) => {
    setSearchQueries({ ...searchQueries, [tabKey]: query });
  };

  const clearSearch = tabKey => {
    setSearchQueries({ ...searchQueries, [tabKey]: '' });
  };

  const filteredBlogListAbout1 = listBlog?.filter(item =>
    item.title.toLowerCase().includes(searchQueries.about1.toLowerCase()),
  );

  const filteredBlogListAbout2 = listBlog?.filter(item =>
    item.title.toLowerCase().includes(searchQueries.about2.toLowerCase()),
  );

  const filteredBlogListAbout3 = listBlog?.filter(item =>
    item.title.toLowerCase().includes(searchQueries.about3.toLowerCase()),
  );

  return (
    <>
      <Tab.Container id="left-tabs-example" defaultActiveKey="about1">
        <Row>
          <Col md={3}>
            <Card>
              <Card.Body>
                <Nav variant="pills" className=" basic-info-items list-inline d-block p-0 m-0">
                  <Nav.Item>
                    <Nav.Link href="#blog" eventKey="about1" className="d-flex align-items-center gap-3">
                      <i className="material-symbols-outlined">create</i> Bài viết công khai
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link href="#blog-pending" eventKey="about2" className="d-flex align-items-center gap-3">
                      <i className="material-symbols-outlined">forum</i> Chờ duyệt
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link href="#blog-reject" eventKey="about3" className="d-flex align-items-center gap-3">
                      <i className="material-symbols-outlined">delete</i> Vi phạm
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Body>
            </Card>
          </Col>
          <Col md={9} className="ps-4">
            <Card>
              <Card.Body>
                <Tab.Content>
                  <Tab.Pane eventKey="about1">
                    {isLoading ? (
                      <>
                        <h4>Loading...</h4>
                      </>
                    ) : (
                      <>
                        <div className="d-flex justify-content-between">
                          <h4>Bài viết công khai</h4>
                          <form>
                            <div className="d-flex align-items-center">
                              <input
                                type="text"
                                placeholder="Tìm kiếm..."
                                value={searchQueries.about1}
                                onChange={e => handleSearchInputChange('about1', e.target.value)}
                              />
                              {searchQueries.about1 && (
                                <button type="button" onClick={() => clearSearch('about1')} className="btn btn-link">
                                  Xóa
                                </button>
                              )}
                            </div>
                          </form>
                        </div>
                        <hr />
                        {filteredBlogListAbout1 && filteredBlogListAbout1.length > 0 ? (
                          <>
                            {filteredBlogListAbout1.map((item, index) => (
                              <Row className="mb-2" key={index}>
                                <div className="col-12">
                                  <Link
                                    className="text-dark font-bold"
                                    style={{ fontSize: '20px' }}
                                    to={`/blog-detail/${item.id}`}
                                  >
                                    {item.title}
                                  </Link>
                                </div>
                                <div className="col-12">
                                  <p className="mb-0">Sửa lần cuối: {formatTime(item.created_at)}</p>
                                </div>
                                <hr />
                              </Row>
                            ))}
                          </>
                        ) : (
                          <h4>Không có data</h4>
                        )}
                      </>
                    )}
                  </Tab.Pane>
                  <Tab.Pane eventKey="about2">
                    {isLoading ? (
                      <>
                        <h4>Loading...</h4>
                      </>
                    ) : (
                      <>
                        <div className="d-flex justify-content-between">
                          <h4>Bài viết đang chờ xét duyệt</h4>
                          <form>
                            <div className="d-flex align-items-center">
                              <input
                                type="text"
                                placeholder="Tìm kiếm..."
                                value={searchQueries.about2}
                                onChange={e => handleSearchInputChange('about2', e.target.value)}
                              />
                              {searchQueries.about2 && (
                                <button type="button" onClick={() => clearSearch('about2')} className="btn btn-link">
                                  Xóa
                                </button>
                              )}
                            </div>
                          </form>
                        </div>
                        <hr />
                        {filteredBlogListAbout2 && filteredBlogListAbout2.length > 0 ? (
                          <>
                            {filteredBlogListAbout2.map((item, index) => (
                              <Row className="mb-2" key={index}>
                                <div className="col-12">
                                  <Link
                                    className="text-dark font-bold"
                                    style={{ fontSize: '20px' }}
                                    to={`/blog-detail/${item.id}`}
                                  >
                                    {item.title}
                                  </Link>
                                </div>
                                <div className="col-12">
                                  <p className="mb-0">Sửa lần cuối: {formatTime(item.created_at)}</p>
                                </div>
                                <hr />
                              </Row>
                            ))}
                          </>
                        ) : (
                          <h4>Không có data</h4>
                        )}
                      </>
                    )}
                  </Tab.Pane>
                  <Tab.Pane eventKey="about3">
                    {isLoading ? (
                      <>
                        <h4>Loading...</h4>
                      </>
                    ) : (
                      <>
                        {filteredBlogListAbout3 && filteredBlogListAbout3.length > 0 ? (
                          <>
                            <div className="d-flex justify-content-between">
                              <h4>Bài viết vi phạm</h4>
                              <form>
                                <div className="d-flex align-items-center">
                                  <input
                                    type="text"
                                    placeholder="Tìm kiếm..."
                                    value={searchQueries.about3}
                                    onChange={e => handleSearchInputChange('about3', e.target.value)}
                                  />
                                  {searchQueries.about3 && (
                                    <button
                                      type="button"
                                      onClick={() => clearSearch('about3')}
                                      className="btn btn-link"
                                    >
                                      Xóa
                                    </button>
                                  )}
                                </div>
                              </form>
                            </div>
                            <hr />
                            {filteredBlogListAbout3.map((item, index) => (
                              <Row className="mb-2" key={index}>
                                <div className="col-12">
                                  <Link
                                    className="text-dark font-bold"
                                    style={{ fontSize: '20px' }}
                                    to={`/blog-detail/${item.id}`}
                                  >
                                    {item.title}
                                  </Link>
                                </div>
                                <div className="col-12">
                                  <p className="mb-0">Sửa lần cuối: {formatTime(item.created_at)}</p>
                                </div>
                                <hr />
                              </Row>
                            ))}
                          </>
                        ) : (
                          <h4>Không có data</h4>
                        )}
                      </>
                    )}
                  </Tab.Pane>
                </Tab.Content>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Tab.Container>
    </>
  );
};
