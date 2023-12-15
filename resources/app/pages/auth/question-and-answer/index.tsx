import { Container, Col, Row, Card, Tab, Form } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { QandAService } from '@/apis/services/qanda.service';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { useCallback, useEffect, useState } from 'react';
import { Navbar } from './components/navbar';
import { QandAItem } from './components/qanda-item';
import { MajorService } from '@/apis/services/major.service';
import { pathName } from '@/routes/path-name';
import { Skeleton } from '@mui/material';

export const QuestionAndAnswerPage = () => {
  let { hash } = useLocation();
  const [selectedMajor, setSelectedMajor] = useState<string>('');
  const { ref: endRef, inView: endInView } = useInView();

  let type = hash.split('#')[1];

  let activeTab = type !== undefined ? type : 'all-question';
  let title = 'TẤT CẢ CÁC CÂU HỎI';
  switch (type) {
    case 'all-question':
      title = 'TẤT CẢ CÁC CÂU HỎI';
      type = 'all-question';
      break;
    case 'best-question':
      title = 'CÂU HỎI HAY NHẤT';
      type = 'most-liked';
      break;
    case 'no-answer':
      title = 'CÂU HỎI CHƯA TRẢ LỜI';
      type = 'un-answered';
      break;
    case 'majors':
      title = 'CHUYÊN NGÀNH';
      type = 'majors';
      break;
    default:
      title = 'TẤT CẢ CÁC CÂU HỎI';
      type = 'all-question';
      break;
  }
  const queryKeyQa = ['qa', type, selectedMajor];

  const getListQa = async ({ pageParam = 1 }) => {
    const { data } = await QandAService.getListQandA(type, selectedMajor, pageParam);
    return data;
  };

  const { data, fetchNextPage, hasNextPage, isLoading, isFetching } = useInfiniteQuery({
    queryKey: queryKeyQa,
    queryFn: getListQa,
    getNextPageParam: (lastPage, _) => {
      if (lastPage.current_page === lastPage.last_page) {
        return undefined;
      }
      return lastPage.current_page + 1;
    },
  });
  const listQanda = data?.pages.flatMap(page => page.qas);
  useEffect(() => {
    if (endInView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [endInView, isFetching, hasNextPage, fetchNextPage]);

  const getListMajor = async () => {
    const { data } = await MajorService.getMajors();
    return data;
  };

  const { data: majors, isLoading: isMajorLoading } = useQuery({
    queryKey: ['major'],
    queryFn: getListMajor,
    enabled: type === 'majors',
  });

  const handleMajorChange = useCallback((newMajor: any) => {
    setSelectedMajor(newMajor === '' ? '' : newMajor);
  }, []);

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
                  <div className=" d-flex align-items-center text-center profile-forum-items p-0 m-0 w-40">
                    <h3
                      className="text-white"
                      style={{ fontWeight: 'bold', fontSize: '25px', color: 'blue', textTransform: 'uppercase' }}
                    >
                      {title}
                    </h3>
                  </div>
                  {type === 'majors' && (
                    <div className="w-50">
                      <Form.Group className="form-group mb-0">
                        <select
                          className="form-select form-select-ml"
                          data-trigger
                          name="choices-single-default"
                          id="choices-single-default"
                          onChange={e => {
                            const newMajor = e.target.value;
                            handleMajorChange(newMajor);
                          }}
                        >
                          <option value="">Chọn chuyên ngành</option>
                          {isMajorLoading ? (
                            <option value="0">Đang tải...</option>
                          ) : (
                            <>
                              {majors?.map((item: any, index: any) => (
                                <option key={item.id} value={item.id}>
                                  {item.majors_name}
                                </option>
                              ))}
                            </>
                          )}
                        </select>
                      </Form.Group>
                    </div>
                  )}
                  <div>
                    <Link
                      to={pathName.QUESTS_CREATE}
                      style={{
                        fontWeight: '600',
                      }}
                      className="bg-white px-3 py-2 d-flex align-items-center rounded-2 d-block"
                    >
                      ĐẶT CÂU HỎI MỚI
                    </Link>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
          <Card>
            <Card.Body className="p-0">
              <div className="user-tabing">
                <Navbar />
                <Tab.Container activeKey={activeTab}>
                  <Tab.Content>
                    <Tab.Pane eventKey={activeTab} className="fade show" id="Posts" role="tabpanel">
                      {isLoading ? (
                        <>
                          <Card>
                            <Card.Body>
                              <div className="borderbox1 mt-3 rounded d-flex">
                                <div className="user-img me-2">
                                  <Skeleton variant="circular" width={50} height={50} animation="wave" />
                                </div>
                                <div className="borderbox border rounded p-2">
                                  <div className="d-flex align-items-center flex-wrap mb-2">
                                    <Link to="#" className="mb-0">
                                      <Skeleton variant="text" width={150} height={23} animation="wave" />
                                    </Link>
                                    <div className="ms-auto d-flex align-items-center">
                                      <Skeleton variant="text" width={150} height={25} animation="wave" />
                                    </div>
                                  </div>
                                  <Link to="#" className="h3">
                                    <Skeleton
                                      variant="text"
                                      width={500}
                                      height={33}
                                      className="mb-2"
                                      animation="wave"
                                    />
                                  </Link>
                                  <div className="d-flex justify-content-start">
                                    <Skeleton
                                      variant="text"
                                      width={70}
                                      height={50}
                                      style={{ marginRight: '10px' }}
                                      animation="wave"
                                    />
                                    <Skeleton variant="text" width={70} height={50} animation="wave" />
                                  </div>
                                </div>
                              </div>
                            </Card.Body>
                          </Card>
                          <Card>
                            <Card.Body>
                              <div className="borderbox1 mt-3 rounded d-flex">
                                <div className="user-img me-2">
                                  <Skeleton variant="circular" width={50} height={50} animation="wave" />
                                </div>
                                <div className="borderbox border rounded p-2">
                                  <div className="d-flex align-items-center flex-wrap mb-2">
                                    <Link to="#" className="mb-0">
                                      <Skeleton variant="text" width={150} height={23} animation="wave" />
                                    </Link>
                                    <div className="ms-auto d-flex align-items-center">
                                      <Skeleton variant="text" width={150} height={25} animation="wave" />
                                    </div>
                                  </div>
                                  <Link to="#" className="h3">
                                    <Skeleton
                                      variant="text"
                                      width={500}
                                      height={33}
                                      className="mb-2"
                                      animation="wave"
                                    />
                                  </Link>
                                  <div className="d-flex justify-content-start">
                                    <Skeleton
                                      variant="text"
                                      width={70}
                                      height={50}
                                      style={{ marginRight: '10px' }}
                                      animation="wave"
                                    />
                                    <Skeleton variant="text" width={70} height={50} animation="wave" />
                                  </div>
                                </div>
                              </div>
                            </Card.Body>
                          </Card>
                        </>
                      ) : (
                        listQanda && listQanda.map((item: any, index: number) => <QandAItem key={index} item={item} />)
                      )}
                      {isFetching && (
                        <Card>
                          <Card.Body>
                            <div className="borderbox1 mt-3 rounded d-flex">
                              <div className="user-img me-2">
                                <Skeleton variant="circular" width={50} height={50} animation="wave" />
                              </div>
                              <div className="borderbox border rounded p-2">
                                <div className="d-flex align-items-center flex-wrap mb-2">
                                  <Link to="#" className="mb-0">
                                    <Skeleton variant="text" width={150} height={23} animation="wave" />
                                  </Link>
                                  <div className="ms-auto d-flex align-items-center">
                                    <Skeleton variant="text" width={150} height={25} animation="wave" />
                                  </div>
                                </div>
                                <Link to="#" className="h3">
                                  <Skeleton variant="text" width={500} height={33} className="mb-2" animation="wave" />
                                </Link>
                                <div className="d-flex justify-content-start  ">
                                  <Skeleton
                                    variant="text"
                                    width={70}
                                    height={50}
                                    style={{ marginRight: '10px' }}
                                    animation="wave"
                                  />
                                  <Skeleton variant="text" width={70} height={50} animation="wave" />
                                </div>
                              </div>
                            </div>
                          </Card.Body>
                        </Card>
                      )}
                      {!isFetching && !hasNextPage && listQanda && listQanda.length > 0 && (
                        <div className="text-center">
                          <h5>Không còn dữ liệu cũ hơn !</h5>
                        </div>
                      )}
                      {!isLoading && !isFetching && listQanda && listQanda.length === 0 && (
                        <div className="text-center">
                          <h5>Không có dữ liệu !</h5>
                        </div>
                      )}
                      <div ref={endRef}></div>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </div>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </>
  );
};
