import { pathName } from '@/routes/path-name';
import { Skeleton } from '@mui/material';
import diacritics from 'diacritics';
import React, { useEffect, useState } from 'react';
import { Card, Col, Nav, Row, Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { formatTime } from '../components/format-time';
import { useInView } from 'react-intersection-observer';

type MyBlogProps = {
  listBlog: any;
  isLoading: boolean;
  isFetching: boolean;
  hasNextPage: any;
  fetchNextPage: any;
};

const imageUrlLoading = 'https://i.gifer.com/ZKZg.gif';

export const MyBlog = ({ listBlog, isLoading, isFetching, hasNextPage, fetchNextPage }: MyBlogProps) => {
  const [searchQueries, setSearchQueries] = useState<any>({
    about1: '',
    about2: '',
    about3: '',
  });

  const handleSearchInputChange = (tabKey: any, query: any) => {
    setSearchQueries({ ...searchQueries, [tabKey]: query });
  };

  const normalizeText = (text: any) => diacritics.remove(text.toLowerCase());

  const filteredBlogListAbout = (tabKey: any) => {
    const normalizedSearch = normalizeText(searchQueries[tabKey]);
    return listBlog?.filter((item: any) => normalizeText(item.title).includes(normalizedSearch));
  };

  const [isSticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      const topThreshold = 300;

      if (offset >= topThreshold) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <Tab.Container id="left-tabs-example" defaultActiveKey="about1">
        <Row>
          <Col md={3}>
            <Card>
              <Card.Body>
                <Nav variant="pills" className="basic-info-items list-inline d-block p-0 m-0">
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
                  {['about1', 'about2', 'about3'].map(tabKey => (
                    <Tab.Pane eventKey={tabKey} key={tabKey}>
                      <div className="d-flex justify-content-between">
                        <h4>
                          {tabKey === 'about1'
                            ? 'Bài viết công khai'
                            : tabKey === 'about2'
                              ? 'Bài viết đang chờ xét duyệt'
                              : 'Bài viết vi phạm'}
                        </h4>
                        <div className="d-flex align-items-center">
                          <div className="form-outline">
                            <input
                              type="search"
                              id="form1"
                              style={{ height: '35px' }}
                              className="form-control"
                              value={searchQueries[tabKey]}
                              placeholder="Tìm kiếm..."
                              onChange={e => handleSearchInputChange(tabKey, e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                      <hr />
                      <div className={`${isSticky ? 'scroller-my-blog' : ''}`}>
                        {isLoading ? (
                          <>
                            <Row className="mb-2">
                              <div className="col-12">
                                <Skeleton className="skeleton-color" variant="text" width="100%" height={100} />
                              </div>
                              <hr />
                            </Row>
                            <Row className="mb-2">
                              <div className="col-12">
                                <Skeleton className="skeleton-color" variant="text" width="100%" height={100} />
                              </div>
                            </Row>
                          </>
                        ) : (
                          <ListBlog
                            data={filteredBlogListAbout(tabKey)}
                            fetchNextPage={fetchNextPage}
                            hasNextPage={hasNextPage}
                            isFetching={isFetching}
                          />
                        )}
                      </div>
                    </Tab.Pane>
                  ))}
                </Tab.Content>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Tab.Container>
    </>
  );
};

const ListBlog = ({ data, fetchNextPage, hasNextPage, isFetching }: any) => {
  const { ref: endRefBlog, inView: endInViewBlog } = useInView();

  useEffect(() => {
    if (endInViewBlog && hasNextPage && !isFetching) {
      fetchNextPage && fetchNextPage();
    }
    console.log('endInViewBlog', endInViewBlog);
  }, [endInViewBlog, fetchNextPage, hasNextPage, isFetching]);

  return (
    <>
      {data?.map((item: any, index: number) => (
        <Row className="mb-2" key={index}>
          <div className="col-12">
            <Link className="text-dark font-bold" style={{ fontSize: '20px' }} to={`${pathName.BLOG}/${item.id}`}>
              {item.title}
            </Link>
          </div>
          <div className="col-12">
            <p className="mb-0">Cập nhật lần cuối: {formatTime(item.updated_at)}</p>
          </div>
          <hr />
        </Row>
      ))}
      {isFetching && (
        <div className="col-sm-12 text-center">
          <img src={imageUrlLoading} alt="loader" style={{ height: '50px' }} />
        </div>
      )}
      {!isFetching && !hasNextPage && data && data.length > 0 && (
        <div className="text-center">
          <h5>Không còn dữ liệu cũ hơn !</h5>
        </div>
      )}
      <div ref={endRefBlog} />
    </>
  );
};
