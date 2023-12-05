import { CustomToggle } from '@/components/custom';
import { Loading } from '@/components/shared/loading';
import useInfiniteNotifications, { useSeeAllNotification } from '@/hooks/useNotificationQuery';
import { useEffect } from 'react';
import { Col, Container, Dropdown, Row } from 'react-bootstrap';
import { useInView } from 'react-intersection-observer';
import { NotificationItem } from './components/notification-item';

export const NotificationPage = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isError, isLoading } = useInfiniteNotifications();

  const { ref: endRef, inView: endInView } = useInView();

  const { manuallySeeAllNotification } = useSeeAllNotification();

  const handleClickSeeAllNotification = () => {
    manuallySeeAllNotification();
  };

  // effect
  useEffect(() => {
    if (endInView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [endInView, isFetchingNextPage, hasNextPage, fetchNextPage]);

  if (isError) {
    return <span>Error...</span>;
  }

  return (
    <>
      <div id="content-page" className="content-page">
        <Container>
          <Row>
            <Col sm="12" className="d-flex justify-content-between">
              <h3 className="card-title mb-3">Thông báo</h3>
              <div>
                <Dropdown className="d-flex justify-content-center align-items-center" as="span">
                  <Dropdown.Toggle
                    as={CustomToggle}
                    variant="material-symbols-outlined cursor-pointer md-18 nav-hide-arrow pe-0 show"
                  >
                    <i className="material-symbols-outlined text-dark fs-2">more_horiz</i>
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="dropdown-menu-right">
                    <Dropdown.Item
                      onClick={handleClickSeeAllNotification}
                      className="d-flex align-items-center"
                      href="#"
                    >
                      <i className="material-symbols-outlined md-18 me-1">done</i>Đánh dấu tất cả là đã đọc
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </Col>
            <Col sm="12">
              {isLoading && <Loading size={100} textStyle={{ fontSize: '30px' }} />}
              {!isLoading && data && data?.map(item => <NotificationItem key={item.id} item={item} />)}
              {isFetchingNextPage ? (
                <div className="w-100 h-100 d-flex align-items-center justify-content-center">
                  <Loading size={60} textStyle={{ fontSize: '20px' }} textLoading="Đang tải thông báo cũ hơn ..." />
                </div>
              ) : (
                <div className="d-flex align-items-center justify-content-center mt-2 py-4">
                  <h4>Không còn thông báo cũ hơn</h4>
                </div>
              )}
              <div ref={endRef}></div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};
