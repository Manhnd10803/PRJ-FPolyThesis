import { CustomToggle } from '@/components/custom';
import useInfiniteNotifications, {
  useCountNotificationsNotSeen,
  useSeeAllNotification,
  useSeeNotification,
} from '@/hooks/useNotificationQuery';
import { INotification, NotificationStatus } from '@/models/notifications';
import { pathName } from '@/routes/path-name';
import { formatFullName, formatNotificationLink } from '@/utilities/functions';
import { momentVi } from '@/utilities/functions/moment-locale';
import { Skeleton } from '@mui/material';
import { useEffect, useState } from 'react';
import { Card, Dropdown, Image } from 'react-bootstrap';
import { useInView } from 'react-intersection-observer';
import { Link, useNavigate } from 'react-router-dom';

type NotificationItemProps = {
  item: INotification;
};
const NotificationItem = ({ item }: NotificationItemProps) => {
  const navigate = useNavigate();
  const { manuallySeeNotification } = useSeeNotification();

  const handleClickNotification = () => {
    if (item.status === NotificationStatus.UNREAD) {
      manuallySeeNotification(item.id);
    }
    navigate(formatNotificationLink(item));
  };

  return (
    <div
      className={`iq-sub-card ${
        item.status === NotificationStatus.UNREAD ? 'bg-light' : 'bg-color'
      } hover-bg-sort-primary`}
      onClick={handleClickNotification}
      style={{ cursor: 'pointer' }}
    >
      <div className="d-flex align-items-center">
        <div className="">
          <Image className="avatar-40 rounded" src={item.user.avatar} alt="" loading="lazy" />
        </div>
        <div className="ms-3 w-100">
          <h6 className="mb-0 ">
            {formatFullName(item?.user)} {item.content}
          </h6>
          <div className="d-flex justify-content-between align-items-center">
            <small className="float-right font-size-12 text-primary mt-1">{momentVi(item.updated_at).fromNow()}</small>
          </div>
        </div>
      </div>
    </div>
  );
};
export const HeaderNotification = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isError, isLoading } = useInfiniteNotifications();

  const { ref: endRef, inView: endInView } = useInView();

  const [notificationIcon, setNotificationIcon] = useState<string>('notifications');

  const { manuallySeeAllNotification } = useSeeAllNotification();
  const countNotificationsNotSeen = useCountNotificationsNotSeen();

  const handleClickSeeAllNotification = () => {
    manuallySeeAllNotification();
  };

  useEffect(() => {
    if (data) {
      data.filter(item => item.status === NotificationStatus.UNREAD).length > 0
        ? setNotificationIcon('notifications_unread')
        : setNotificationIcon('notifications');
    }
  }, [data]);

  // effect
  useEffect(() => {
    if (endInView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [endInView, isFetchingNextPage, hasNextPage, fetchNextPage]);

  return (
    <Dropdown as="li" className="nav-item">
      <Dropdown.Toggle href="#" as={CustomToggle} variant="search-toggle d-flex align-items-center">
        <i className="material-symbols-outlined">{notificationIcon}</i>
      </Dropdown.Toggle>
      <Dropdown.Menu className="sub-drop sub-drop-large">
        <Card className="shadow-none m-0">
          <Card.Header className="d-flex justify-content-between bg-primary">
            <div className="header-title bg-primary">
              <h5 className="mb-0 text-white">Thông báo</h5>
            </div>
            <div className="d-flex align-items-center gap-2">
              <small className="badge bg-white text-primary">{countNotificationsNotSeen}</small>
              <div>
                <Dropdown className="bg-soft-primary d-flex justify-content-center align-items-center" as="span">
                  <Dropdown.Toggle
                    as={CustomToggle}
                    variant="material-symbols-outlined cursor-pointer md-18 nav-hide-arrow pe-0 show"
                  >
                    <i className="material-symbols-outlined text-white">more_horiz</i>
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
            </div>
          </Card.Header>
          <Card.Body className="p-0 scroller border-bottom" style={{ maxHeight: 280 }}>
            {isError ? <span>Error...</span> : null}
            {isLoading && (
              <div className="d-flex align-items-center p-3">
                <div className="">
                  <Skeleton
                    variant="rectangular"
                    width={40}
                    height={40}
                    animation="wave"
                    style={{ borderRadius: '5px' }}
                  />
                </div>
                <div className="ms-3 w-100">
                  <Skeleton
                    variant="rectangular"
                    width="70%"
                    height={17}
                    animation="wave"
                    style={{ borderRadius: '8px' }}
                  />
                  <div className="d-flex justify-content-between align-items-center mt-1">
                    <Skeleton
                      variant="rectangular"
                      width={100}
                      height={15}
                      animation="wave"
                      style={{ borderRadius: '8px' }}
                    />
                  </div>
                </div>
              </div>
            )}
            {!isLoading &&
              !isError &&
              data &&
              data.map(item => {
                return <NotificationItem key={item.id} item={item} />;
              })}
            {isFetchingNextPage ? (
              <>
                <div className="d-flex align-items-center p-3">
                  <div className="">
                    <Skeleton
                      variant="rectangular"
                      width={40}
                      height={40}
                      animation="wave"
                      style={{ borderRadius: '5px' }}
                    />
                  </div>
                  <div className="ms-3 w-100">
                    <Skeleton
                      variant="rectangular"
                      width="70%"
                      height={17}
                      animation="wave"
                      style={{ borderRadius: '8px' }}
                    />
                    <div className="d-flex justify-content-between align-items-center mt-1">
                      <Skeleton
                        variant="rectangular"
                        width={100}
                        height={15}
                        animation="wave"
                        style={{ borderRadius: '8px' }}
                      />
                    </div>
                  </div>
                </div>
                <div className="d-flex align-items-center p-3">
                  <div className="">
                    <Skeleton
                      variant="rectangular"
                      width={40}
                      height={40}
                      animation="wave"
                      style={{ borderRadius: '5px' }}
                    />
                  </div>
                  <div className="ms-3 w-100">
                    <Skeleton
                      variant="rectangular"
                      width="70%"
                      height={17}
                      animation="wave"
                      style={{ borderRadius: '8px' }}
                    />
                    <div className="d-flex justify-content-between align-items-center mt-1">
                      <Skeleton
                        variant="rectangular"
                        width={100}
                        height={15}
                        animation="wave"
                        style={{ borderRadius: '8px' }}
                      />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="d-flex align-items-center justify-content-center mt-2 py-4">
                <h6 className="mb-0">Không còn thông báo cũ hơn</h6>
              </div>
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
