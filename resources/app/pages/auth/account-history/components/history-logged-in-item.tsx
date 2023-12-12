import { useAppSelector } from '@/redux/hook';
import { momentVi } from '@/utilities/functions/moment-locale';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const imageUrl = 'https://via.placeholder.com/1';

export type History = {
  item: any;
  onDelete: (id: number) => void;
};

export const HistoryLoggedInItem = ({ item, onDelete }: History) => {
  const { userInfo } = useAppSelector(state => state.auth);

  const extractDeviceString = (userAgent: string) => {
    const index = userAgent.indexOf('(');

    if (index !== -1) {
      const start = index + 1;
      const spaceIndex = userAgent.indexOf(' ', start);

      if (spaceIndex !== -1) {
        const result = userAgent.substring(start, spaceIndex).trim().split(';')[0];

        return result;
      }
    }
  };
  return (
    <>
      <Card className="bg-light" key={item.id}>
        <Card.Body>
          <div>
            <ul className="notification-list m-0 p-0">
              <li className="d-flex align-items-center justify-content-between">
                <div className="user-img img-fluid">
                  <img src={userInfo?.avatar} alt="notification-user-img" className="rounded-circle avatar-40" />
                </div>
                <div className="w-100">
                  <div className="d-flex justify-content-between">
                    <div className="ms-3">
                      <h6>
                        <strong>{item.properties.username}</strong> đã đăng nhập trên{' '}
                        {extractDeviceString(item.properties.user_agent)}
                      </h6>
                      <h6>
                        <strong>Địa chỉ IP:</strong> {item.properties.ip_address}
                      </h6>
                      <h6>
                        <strong>Trình duyệt:</strong> {item.properties.user_agent}
                      </h6>
                      <h6>
                        <strong>Thời gian:</strong> {momentVi(item.created_at).format('DD/MM/YYYY HH:mm:ss')}
                      </h6>
                    </div>
                    <div className="d-flex align-items-center">
                      <Link to="#auths" onClick={() => onDelete(item.id)} className="me-3 iq-notify">
                        <i style={{ fontSize: 26 }} className={`material-symbols-outlined md-18 filled`}>
                          delete
                        </i>
                      </Link>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};
