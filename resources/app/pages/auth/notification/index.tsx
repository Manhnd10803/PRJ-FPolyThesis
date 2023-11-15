import { NotificationService } from '@/apis/services/notification.service';
import { INotification } from '@/models/notifications';
import { formatNotificationLink, mappingNotificationIcon } from '@/utilities/functions';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import { Card, Col, Container, Row, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { MoreAction } from './components/more-action';
import styles from './notification.module.scss';

type NotificationItemProps = {
  item: INotification;
};
const NotificationItem = ({ item }: NotificationItemProps) => {
  return (
    <Card>
      <Card.Body key={item.id} className={item.status ? '' : styles.item}>
        <Link to={formatNotificationLink(item)}>
          <ul className="notification-list m-0 p-0">
            <li className="d-flex align-items-center justify-content-between">
              <div className="user-img img-fluid">
                <img src={item.user.avatar} alt="notification-user-img" className="rounded-circle avatar-40" />
              </div>
              <div className="w-100">
                <div className="d-flex justify-content-between">
                  <div className=" ms-3">
                    <h6>
                      {/* {formatFullName(item.user)} {formatNotificationAction(item)} */}
                      {item.content}
                    </h6>
                    <p className="mb-0">{moment(item.created_at).format('LT')}</p>
                  </div>
                  <div className="d-flex align-items-center">
                    <Link to="#" className="me-3 iq-notify bg-soft-success rounded">
                      <i className="material-symbols-outlined md-18">{mappingNotificationIcon(item)}</i>
                    </Link>
                    <MoreAction />
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </Link>
      </Card.Body>
    </Card>
  );
};
export const NotificationPage = () => {
  const fetchNotifications = async () => {
    const { data } = await NotificationService.getListNotifications();
    return data;
  };

  const { data, isLoading, error } = useQuery({ queryKey: ['notifications'], queryFn: fetchNotifications });

  if (error) return <div>Error</div>;

  return (
    <>
      <div id="content-page" className="content-page">
        <Container>
          <Row>
            <Col sm="12">
              <h4 className="card-title mb-3">Thông báo</h4>
            </Col>
            <Col sm="12">
              {isLoading ? (
                <div className="w-100 h-100 d-flex align-items-center justify-content-center">
                  <Spinner animation="border" variant="primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </div>
              ) : null}
              {data?.map(item => <NotificationItem item={item} />)}
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};
