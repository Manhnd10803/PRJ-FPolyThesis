import { HistoryService } from '@/apis/services/history.service';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Button, Card, Col, Container, Modal, Nav, Row, Tab } from 'react-bootstrap';
import { Link, useLocation, useParams } from 'react-router-dom';
import { HistoryLoggedInItem } from './components/history-logged-in-item';
import { HistoryOtherItem } from './components/history-other-item';
import { HistoryCommentItem } from './components/history-comment-item';
import toast from 'react-hot-toast';
import { useEffect, useRef, useState } from 'react';
import { DateRange, RangeKeyDict } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { vi } from 'date-fns/locale';
import { Loading } from '@/components/shared/loading';

const menuHistory = [
  {
    id: 1,
    name: 'Lịch sử đăng nhập',
    icon: 'passkey',
    param: 'auths',
  },
  {
    id: 2,
    name: 'Blog',
    icon: 'article',
    param: 'blogs',
  },
  {
    id: 3,
    name: 'Bài viết',
    icon: 'newspaper',
    param: 'posts',
  },
  {
    id: 4,
    name: 'Câu hỏi',
    icon: 'quiz',
    param: 'qas',
  },
  {
    id: 5,
    name: 'Bình luận',
    icon: 'comment',
    param: 'comments',
  },
  {
    id: 6,
    name: 'Lịch sử tìm kiếm',
    icon: 'search',
    param: 'searches',
  },
  {
    id: 7,
    name: 'Bạn bè',
    icon: 'group',
    param: 'friends',
  },
];

export const AccountHistoryPage = () => {
  const queryClient = useQueryClient();
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [rangeTime, setRangeTime] = useState<any>({ startDate: new Date(), endDate: new Date() });
  const [showFilter, setShowFilter] = useState(false);
  const [showBtnFilter, setShowBtnFilter] = useState(true);

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
    case 'friends':
      title = 'Bạn bè';
      params = 'friends';
      activeKey = 'about7';
      break;
    default:
      title = 'Lịch sử đăng nhập';
      params = 'auths';
      activeKey = 'about1';
      break;
  }

  const getHistories = async () => {
    try {
      const { data } = await HistoryService.getHistories(params, rangeTime);
      return data;
    } catch (error) {
      throw new Error('Failed to fetch histories');
    }
  };

  const queryKey = ['history', params, rangeTime];
  const { data: listHistory, isLoading } = useQuery(queryKey, getHistories, {
    onSuccess: () => {
      queryClient.invalidateQueries([queryKey]);
    },
  });

  const DeleteHistoryModal = (props: any) => {
    return (
      <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Xác nhận xoá</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Bạn muốn xoá lịch sử hoạt động này?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.onHide}>
            Huỷ
          </Button>
          <Button onClick={props.onDelete}>Xác nhận</Button>
        </Modal.Footer>
      </Modal>
    );
  };

  const handleDeleteHistory = async (id: number) => {
    try {
      setDeleteId(id);
      setShowModal(true);
    } catch (error) {
      throw new Error('Xoá thất bại');
    }
  };

  const onDeleteConfirmed = async () => {
    if (deleteId !== null) {
      try {
        await HistoryService.deleteHistory(deleteId);
        queryClient.invalidateQueries(['history']);
        toast.success('Xoá lịch sử hoạt động thành công');
        setShowModal(false);
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
  return (
    <>
      <DeleteHistoryModal show={showModal} onHide={() => setShowModal(false)} onDelete={onDeleteConfirmed} />
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
                                  onClick={() => setRangeTime({ startDate: '', endDate: '' })}
                                  className="me-3"
                                >
                                  Xem tất cả
                                </Button>
                                <Link
                                  to="#"
                                  className="material-symbols-outlined text-dark"
                                  onClick={() => handleDeleteHistory(0)}
                                >
                                  more_vert
                                </Link>
                              </div>
                            )}
                            {showFilter && (
                              <div
                                ref={dateRangeRef}
                                style={{ position: 'absolute', zIndex: '1000', top: 5, right: 5 }}
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
                        <>
                          {isLoading ? (
                            <Loading size={100} textStyle={{ fontSize: '30px' }} textLoading="Đang tải..." />
                          ) : (
                            <>
                              {listHistory &&
                                listHistory.map((item: any) => (
                                  <>
                                    {params === 'auths' ? (
                                      <HistoryLoggedInItem item={item} onDelete={handleDeleteHistory} />
                                    ) : params === 'comments' ? (
                                      <HistoryCommentItem item={item} onDelete={handleDeleteHistory} />
                                    ) : (
                                      <HistoryOtherItem item={item} onDelete={handleDeleteHistory} />
                                    )}
                                  </>
                                ))}
                            </>
                          )}
                        </>
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
