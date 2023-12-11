import { pathName } from '@/routes/path-name';
import { momentVi } from '@/utilities/functions/moment-locale';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import parser from 'html-react-parser';
import { useAppSelector } from '@/redux/hook';

export type History = {
  item: any;
  onDelete: (id: number) => void;
};

export const HistoryOtherItem = ({ item, onDelete }: History) => {
  const { userInfo } = useAppSelector(state => state.auth);
  const getLogName = (item: any) => {
    let data = null;
    let action = item.event === 'created' ? item.properties.attributes : item.properties.old;
    if (item.log_name === 'blogs') {
      data = {
        title: `blog <strong>${action.title}</strong>`,
        path: pathName.BLOG,
      };
      return data;
    } else if (item.log_name === 'posts') {
      data = {
        title: 'bài viết',
        path: pathName.POST,
      };
      return data;
    } else if (item.log_name === 'qas') {
      data = {
        title: `câu hỏi <strong>${action.title}</strong>`,
        path: pathName.QUESTS,
      };
      return data;
    } else if (item.log_name === 'searches') {
      data = {
        title: `<strong>${action.query}</strong>`,
        path: '',
      };
      return data;
    } else if (item.log_name === 'friends') {
      data = {
        title: `<strong>${action.query}</strong>`,
        path: '',
      };
      return data;
    }
  };
  const getAction = (item: any) => {
    let data = null;
    const logName = getLogName(item)?.title;
    switch (item.event) {
      case 'created':
        if (item.log_name === 'searches') {
          data = {
            title: `đã tìm kiếm ${logName}`,
            id: item.properties.attributes.id,
          };
          return data;
        } else if (item.log_name === 'friends') {
          data = {
            title: `đã kết bạn với ${logName}`,
            id: item.properties.attributes.id,
          };
          return data;
        } else {
          data = {
            title: `đã tạo một ${logName}`,
            id: item.properties.attributes.id,
          };
          return data;
        }

      default:
        if (item.log_name === 'friends') {
          data = {
            title: `đã huỷ kết bạn với ${logName}`,
            id: item.properties.old.id,
          };
          return data;
        } else {
          data = {
            title: `đã xoá một ${logName}`,
            id: item.properties.old.id,
          };
          return data;
        }
    }
  };

  const Content = () => (
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
                  <strong>Bạn</strong> {parser(getAction(item).title)}
                </h6>
                <h6>
                  <strong>Thời gian:</strong> {momentVi(item.created_at).format('DD/MM/YYYY HH:mm:ss')}
                </h6>
              </div>
              <div className="d-flex align-items-center">
                <Link to="#blogs" onClick={() => onDelete(item.id)} className="me-3 iq-notify">
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
  );

  return (
    <>
      <Card className="bg-light" key={item.id}>
        <Card.Body>
          {getLogName(item)?.path !== '' ? (
            <Link to={`${getLogName(item)?.path}/${getAction(item).id}`}>
              <Content />
            </Link>
          ) : (
            <Content />
          )}
        </Card.Body>
      </Card>
    </>
  );
};
