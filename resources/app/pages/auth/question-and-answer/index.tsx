import { Container, Col, Row, Card, Tab } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { QandAService } from '@/apis/services/qanda.service';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { Navbar } from './components/navbar';
import { QandAItem } from './components/qanda-item';
import { Loading } from '@/components/shared/loading';

const imageUrlLoading = 'https://i.gifer.com/ZKZg.gif';

export const QuestionAndAnswerPage = () => {
  let { hash } = useLocation();

  const { ref: endRef, inView: endInView } = useInView();

  let type = hash.split('#')[1];

  let activeTab = type !== '' ? type : 'all-answer';
  let title = 'TẤT CẢ CÁC CÂU HỎI';
  switch (type) {
    case 'all-answer':
    case '':
      title = 'TẤT CẢ CÁC CÂU HỎI';
      type = 'all';
      break;
    case 'best-question':
      title = 'CÂU HỎI HAY NHẤT';
      type = 'most-commented';
      break;
    case 'no-answer':
      title = 'CÂU HỎI CHƯA CÓ CÂU TRẢ LỜI';
      type = 'unanswer';
      break;
    default:
      title = 'TẤT CẢ CÁC CÂU HỎI';
      type = 'all';
      break;
  }

  const queryKeyQa = ['qa', type];

  const getListQa = async ({ major_id = '', pageParam = 1 }) => {
    const { data } = await QandAService.getListQandA(type, major_id, pageParam);
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
  const listQanda = data?.pages.flatMap(page => page.data);

  useEffect(() => {
    if (endInView && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [endInView, isFetching, hasNextPage, fetchNextPage]);
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
                      {title}
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
          </Row>
          <Card>
            <Card.Body className="p-0">
              <div className="user-tabing">
                <Navbar />
                <Tab.Container activeKey={activeTab ?? 'all-answer'}>
                  <Tab.Content>
                    <Tab.Pane eventKey={activeTab} className="fade show" id="Posts" role="tabpanel">
                      {isLoading ? (
                        <Loading size={100} textStyle={{ fontSize: '30px' }} textLoading="Đang tải..." />
                      ) : (
                        listQanda && listQanda.map((item: any, index: number) => <QandAItem key={index} item={item} />)
                      )}
                      {isFetching && !isLoading && (
                        <div className="col-sm-12 text-center">
                          <img src={imageUrlLoading} alt="loader" style={{ height: '50px' }} />
                        </div>
                      )}
                      {!isFetching && !hasNextPage && listQanda && listQanda.length > 0 && (
                        <div className="text-center">
                          <h5>Không còn dữ liệu cũ hơn !</h5>
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
