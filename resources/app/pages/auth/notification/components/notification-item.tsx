import { useDeleteNotification, useSeeNotification } from '@/hooks/useNotificationQuery';
import { INotification, NotificationStatus } from '@/models/notifications';
import { formatNotificationLink, getColorClassIconNotification, mappingNotificationIcon } from '@/utilities/functions';
import { Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { MoreAction } from './more-action';
import { momentVi } from '@/utilities/functions/moment-locale';

type NotificationItemProps = {
  item: INotification;
};
export const NotificationItem = ({ item }: NotificationItemProps) => {
  // state
  const navigate = useNavigate();

  const { manuallySeeNotification } = useSeeNotification();
  const { manuallyDeleteNotification } = useDeleteNotification();

  const handleClickNotification = () => {
    if (item.status === NotificationStatus.UNREAD) {
      manuallySeeNotification(item.id);
    }
    navigate(formatNotificationLink(item));
  };

  const handleClickSeeNotification = () => {
    if (item.status === NotificationStatus.UNREAD) {
      manuallySeeNotification(item.id);
    }
  };

  // func
  const handleDeleteNotification = () => {
    manuallyDeleteNotification(item.id);
  };

  // render
  return (
    <Card className={`${item.status === NotificationStatus.UNREAD ? 'bg-light' : 'bg-color'} hover-bg-sort-primary`}>
      <Card.Body key={item.id}>
        <div onClick={handleClickNotification}>
          <ul className="notification-list m-0 p-0">
            <li className="d-flex align-items-center justify-content-between">
              <Link
                to="#"
                className="me-3 iq-notify bg-soft-primary rounded-circle p-3 d-flex align-items-center justify-content-center"
                style={{ visibility: item.status === NotificationStatus.UNREAD ? 'visible' : 'hidden' }}
              >
                <i className="material-symbols-outlined text-primary filled" style={{ fontSize: 20 }}>
                  circle
                </i>
              </Link>
              <div className="user-img img-fluid">
                <img src={item.user.avatar} alt="notification-user-img" className="rounded-circle avatar-40" />
              </div>
              <div className="w-100">
                <div className="d-flex justify-content-between">
                  <div className="ms-3">
                    <h6>{item.content}</h6>
                    <p className="mb-0 text-primary">{momentVi(item?.updated_at).fromNow()}</p>
                  </div>
                  <div className="d-flex align-items-center">
                    <Link to="#" className="me-3 iq-notify">
                      <i
                        style={{ fontSize: 26 }}
                        className={`material-symbols-outlined md-18 filled ${getColorClassIconNotification(item)}`}
                      >
                        {mappingNotificationIcon(item)}
                      </i>
                    </Link>
                    <div
                      onClick={e => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                    >
                      <MoreAction
                        onDetail={handleClickNotification}
                        onDelete={handleDeleteNotification}
                        onSee={handleClickSeeNotification}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </Card.Body>
    </Card>
  );
};
