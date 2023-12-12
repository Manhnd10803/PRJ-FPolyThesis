import { HistoryService } from '@/apis/services/history.service';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Card, Col, Container, Nav, Row, Tab } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { HistoryLoggedInItem } from './components/history-logged-in-item';
import { HistoryOtherItem } from './components/history-other-item';
import { HistoryCommentItem } from './components/history-comment-item';
import toast from 'react-hot-toast';
import { useEffect, useRef, useState } from 'react';
import { DateRange, RangeKeyDict } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // calender style file
import 'react-date-range/dist/theme/default.css'; // calender theme css file
import { vi } from 'date-fns/locale';
import { Loading } from '@/components/shared/loading';
import { pathName } from '@/routes/path-name';
import { menuHistory } from './components/history-menu';
import { DeleteHistoryModal, DeleteHistoryByLogNameModal } from './components/modal-custom';
import { useInView } from 'react-intersection-observer';

const imageUrlLoading = 'https://i.gifer.com/ZKZg.gif';

export const AccountHistoryPage = () => {
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [showModalDeleteByLogName, setShowModalDeleteByLogName] = useState(false);
  const [deleteCondition, setDeleteCondition] = useState<number | null>(null);
  const [deleteAllCondition, setDeleteAllCondition] = useState<string>('');
  const [rangeTime, setRangeTime] = useState<any>({ startDate: '', endDate: new Date() });
  const [showFilter, setShowFilter] = useState(false);
  const [showBtnFilter, setShowBtnFilter] = useState(true);

  const { ref: endRef, inView: endInView } = useInView();

  let { hash } = useLocation();
  let params = hash.split('#')[1];

  const dateRangeRef = useRef();
  useEffect(() => {
    function handleClickOutside(event: any) {
      if (dateRangeRef.current && !dateRangeRef.current.contains(event.target)) {
        setShowFilter(false);
        setShowBtnFilter(true);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dateRangeRef]);
  let activeKey = 'about1';
  let title = 'Lịch sử đăng nhập';
  switch (params) {
    case 'auths':
    case '':
      break;
    case 'blogs':
      title = 'Blog';
      params = 'blogs';
      activeKey = 'about2';
      break;
    case 'posts':
      title = 'Bài viết';
      params = 'posts';
      activeKey = 'about3';
      break;
    case 'qas':
      title = 'Câu hỏi';
      params = 'qas';
      activeKey = 'about4';
      break;
    case 'comments':
      title = 'Bình luận';
      params = 'comments';
      activeKey = 'about5';
      break;
    case 'searches':
      title = 'Lịch sử tìm kiếm';
      params = 'searches';
      activeKey = 'about6';
      break;
    case 'likes':
      title = 'Lượt thích và cảm xúc';
      params = 'likes';
      activeKey = 'about7';
      break;
    case 'reports':
      title = 'Lịch sử báo cáo';
      params = 'reports';
      activeKey = 'about8';
      break;
    default:
      title = 'Lịch sử đăng nhập';
      params = 'auths';
      activeKey = 'about1';
      break;
  }

  const getHistories = async ({ pageParam = 1 }) => {
    try {
      const { data } = await HistoryService.getHistories(params, rangeTime, pageParam);
      return data;
    } catch (error) {
      throw new Error('Failed to fetch histories');
    }
  };

  const queryKeyHistory = ['history', params, rangeTime];
  const { data, fetchNextPage, hasNextPage, isLoading, isFetching } = useInfiniteQuery({
    queryKey: queryKeyHistory,
    queryFn: getHistories,
    getNextPageParam: (lastPage, _) => {
      if (lastPage.current_page === lastPage.last_page) {
        return undefined;
      }
      return lastPage.current_page + 1;
    },
  });
  const listHistory = data?.pages.flatMap(page => page.data);

  const handleDeleteHistory = async (id: number) => {
    try {
      setDeleteCondition(id);
      setShowModal(true);
    } catch (error) {
      throw new Error('Xoá thất bại');
    }
  };

  const onDeleteConfirmed = async () => {
    if (deleteCondition !== null) {
      try {
        await HistoryService.deleteHistory(deleteCondition);
        queryClient.invalidateQueries(['history']);
        toast.success('Xoá lịch sử hoạt động thành công');
        setShowModal(false);
      } catch (error) {
        toast.error('Xoá thất bại');
      }
    }
  };

  const handleDeleteHistoryByLogName = async (logName: string) => {
    try {
      setDeleteAllCondition(logName);
      setShowModalDeleteByLogName(true);
    } catch (error) {
      throw new Error('Xoá thất bại');
    }
  };

  const onDeleteByLogNameConfirmed = async () => {
    if (deleteAllCondition !== '') {
      try {
        await HistoryService.deleteAllHistoryByLogName(deleteAllCondition);
        queryClient.invalidateQueries(['history']);
        toast.success('Xoá toàn bộ lịch sử của hoạt động thành công');
        setShowModalDeleteByLogName(false);
      } catch (error) {
        toast.error('Xoá thất bại');
      }
    }
  };

  const handleSelect = (ranges: RangeKeyDict) => {
    setRangeTime({
      startDate: ranges.selection.startDate,
      endDate: new Date((ranges.selection.endDate as Date).getTime() + 86400000 - 1000 * 60),
    });
  };

  const changeBtnShowFilter = () => {
    setShowBtnFilter(!showBtnFilter);
    setShowFilter(!showFilter);
  };

  useEffect(() => {
    if (endInView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [endInView, isFetching, hasNextPage, fetchNextPage]);

  const [isSticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      const topThreshold = 50;

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
      <DeleteHistoryModal show={showModal} onHide={() => setShowModal(false)} onDelete={onDeleteConfirmed} />
      <DeleteHistoryByLogNameModal
        show={showModalDeleteByLogName}
        onHide={() => setShowModalDeleteByLogName(false)}
        onDelete={onDeleteByLogNameConfirmed}
      />
      <div id="content-page" className="content-page history-page">
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
                      LỊCH SỬ HOẠT ĐỘNG
                    </h3>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>
          <Tab.Container id="left-tabs-example" activeKey={activeKey}>
            <Row>
              <Col md={3}>
                <Card>
                  <Card.Body>
                    <Nav variant="pills" className="basic-info-items list-inline d-block p-0 m-0">
                      {menuHistory &&
                        menuHistory.map(item => (
                          <Nav.Item key={item.id}>
                            <Nav.Link
                              href={`#${item.param}`}
                              eventKey={`about${item.id}`}
                              className="d-flex align-items-center gap-3"
                            >
                              <i className="material-symbols-outlined">{item.icon}</i> {item.name}
                            </Nav.Link>
                          </Nav.Item>
                        ))}
                    </Nav>
                  </Card.Body>
                </Card>
              </Col>
              <Col md={9} className="ps-4">
                <Card>
                  <Card.Body>
                    <Tab.Content>
                      <Tab.Pane eventKey={activeKey}>
                        <div className="d-flex justify-content-between">
                          <h4>{title}</h4>

                          <div>
                            {showBtnFilter && (
                              <div className="d-flex align-items-center">
                                <Button variant="primary" onClick={changeBtnShowFilter} className="me-3">
                                  Bộ lọc
                                </Button>
                                <Button
                                  variant="primary"
                                  onClick={() => setRangeTime({ startDate: '', endDate: new Date() })}
                                  className="me-3"
                                >
                                  Xem tất cả
                                </Button>
                                <Link
                                  to={`${pathName.ACCOUNT_HISTORY}#${params}`}
                                  className="material-symbols-outlined text-dark"
                                  onClick={() => handleDeleteHistoryByLogName(params)}
                                >
                                  delete
                                </Link>
                              </div>
                            )}
                            {showFilter && (
                              <div
                                ref={dateRangeRef}
                                style={{ position: 'absolute', zIndex: '1000', top: 14, right: 5 }}
                              >
                                <DateRange
                                  ranges={[
                                    {
                                      startDate: rangeTime.startDate,
                                      endDate: rangeTime.endDate,
                                      key: 'selection',
                                    },
                                  ]}
                                  maxDate={new Date()}
                                  dateDisplayFormat="dd/MM/yyyy"
                                  locale={vi}
                                  color="#0d6efd"
                                  onChange={handleSelect}
                                  showPreview={false}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                        <hr />
                        <div className={`${isSticky ? 'scroller-history' : ''}`}>
                          {isLoading ? (
                            <Loading size={100} textStyle={{ fontSize: '30px' }} textLoading="Đang tải..." />
                          ) : (
                            <>
                              {listHistory && listHistory.length === 0 && (
                                <div className="text-center">
                                  <h4>Không có dữ liệu</h4>
                                </div>
                              )}
                              {listHistory &&
                                listHistory.map((item: any) => (
                                  <>
                                    {params === 'auths' ? (
                                      <HistoryLoggedInItem item={item} onDelete={handleDeleteHistory} />
                                    ) : params === 'comments' ? (
                                      <HistoryCommentItem item={item} onDelete={handleDeleteHistory} />
                                    ) : (
                                      <HistoryOtherItem item={item} onDelete={handleDeleteHistory} param={params} />
                                    )}
                                  </>
                                ))}
                              {isFetching && (
                                <div className="col-sm-12 text-center">
                                  <img src={imageUrlLoading} alt="loader" style={{ height: '50px' }} />
                                </div>
                              )}
                              {!isFetching && !hasNextPage && listHistory && listHistory.length > 0 && (
                                <div className="text-center">
                                  <h5>Không còn dữ liệu cũ hơn !</h5>
                                </div>
                              )}
                              <div ref={endRef}></div>
                            </>
                          )}
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Tab.Container>
        </Container>
      </div>
    </>
  );
};
