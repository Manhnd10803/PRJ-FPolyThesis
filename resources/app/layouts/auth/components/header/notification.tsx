import { CustomToggle } from '@/components/custom';
import { Loading } from '@/components/shared/loading';
import useInfiniteNotifications, { useSeeNotification } from '@/hooks/useNotificationQuery';
import { INotification, NotificationStatus } from '@/models/notifications';
import { pathName } from '@/routes/path-name';
import { formatNotificationLink } from '@/utilities/functions';
import moment from 'moment';
import { useEffect } from 'react';
import { Card, Dropdown, Image } from 'react-bootstrap';
import { useInView } from 'react-intersection-observer';
import { Link, useNavigate } from 'react-router-dom';

type NotificationItemProps = {
  item: INotification;
};
const NotificationItem = ({ item }: NotificationItemProps) => {
  const navigate = useNavigate();
  const { seeNotification } = useSeeNotification();

  const handleClickNotification = async () => {
    if (item.status === NotificationStatus.UNREAD) {
      seeNotification(item.id);
    }
    navigate(formatNotificationLink(item));
  };

  return (
    <div
      className={`iq-sub-card ${item.status === NotificationStatus.UNREAD ? 'bg-light' : 'bg-color cursor-pointer'}`}
      onClick={handleClickNotification}
      style={{ cursor: 'pointer' }}
    >
      <div className="d-flex align-items-center">
        <div className="">
          <Image className="avatar-40 rounded" src={item.user.avatar} alt="" loading="lazy" />
        </div>
        <div className="ms-3 w-100">
          <h6 className="mb-0 ">{item.content}</h6>
          <div className="d-flex justify-content-between align-items-center">
            <small className="float-right font-size-12">{moment(item.created_at).fromNow()}</small>
          </div>
        </div>
      </div>
    </div>
  );
};
export const Notification = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isError, isLoading } = useInfiniteNotifications();

  const { ref: endRef, inView: endInView } = useInView();

  // effect
  useEffect(() => {
    if (endInView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [endInView, isFetchingNextPage, hasNextPage, fetchNextPage]);

  return (
    <Dropdown as="li" className="nav-item">
      <Dropdown.Toggle href="#" as={CustomToggle} variant="search-toggle d-flex align-items-center">
        <i className="material-symbols-outlined">notifications</i>
      </Dropdown.Toggle>
      <Dropdown.Menu className="sub-drop">
        <Card className="shadow-none m-0">
          <Card.Header className="d-flex justify-content-between bg-primary">
            <div className="header-title bg-primary">
              <h5 className="mb-0 text-white">All Notifications</h5>
            </div>
            <small className="badge  bg-light text-dark">4</small>
          </Card.Header>
          <Card.Body className="p-0 scroller" style={{ maxHeight: 280 }}>
            {isError ? <span>Error...</span> : null}
            {isLoading && <Loading size={100} textStyle={{ fontSize: '30px' }} />}
            {!isLoading &&
              !isError &&
              data &&
              data.map(item => {
                return <NotificationItem key={item.id} item={item} />;
              })}
            {isFetchingNextPage ? (
              <div className="w-100 h-100 d-flex align-items-center justify-content-center">
                <Loading size={40} textStyle={{ fontSize: '16px' }} textLoading="Đang tải thông báo cũ hơn ..." />
              </div>
            ) : (
              <h4>Không còn tin nhắn cũ hơn</h4>
            )}
            <div ref={endRef}></div>
          </Card.Body>
          <Card.Footer>
            <Link to={pathName.NOTIFICATION} className="iq-sub-card">
              <div className="d-flex align-items-center justify-content-center">
                <h6 className="mb-0 ">Xem thêm</h6>
              </div>
            </Link>
          </Card.Footer>
        </Card>
      </Dropdown.Menu>
    </Dropdown>
  );
};
