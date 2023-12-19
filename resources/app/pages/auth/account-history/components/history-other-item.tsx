import { pathName } from '@/routes/path-name';
import { momentVi } from '@/utilities/functions/moment-locale';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import parser from 'html-react-parser';
import { useAppSelector } from '@/redux/hook';

export type History = {
  item: any;
  onDelete: (id: number) => void;
  param: string;
};

export const HistoryOtherItem = ({ item, onDelete, param }: History) => {
  const { userInfo } = useAppSelector(state => state.auth);

  const getPathTypeReport = (reportType: string) => {
    switch (reportType) {
      case 'post':
        return pathName.POST;
      case 'blog':
        return pathName.BLOG;
      case 'user':
        return pathName.PROFILE;
      case 'comment':
        return '';
      default:
        return pathName.QUESTS_DETAIL;
    }
  };

  const getTypeObject = (reportType: string) => {
    switch (reportType) {
      case 'post':
        return 'bài viết';
      case 'blog':
        return 'blog';
      case 'user':
        return 'người dùng';
      case 'comment':
        return 'bình luận';
      default:
        return 'câu hỏi';
    }
  };

  const getLogName = (item: any) => {
    let data = null;
    let action = item.event === 'created' ? item?.properties?.attributes : item?.properties?.old;
    switch (item?.log_name) {
      case 'blogs':
        data = {
          title: `blog <strong>${action.title}</strong>`,
          path: pathName.BLOG,
        };
        break;
      case 'posts':
        data = {
          title: 'bài viết',
          path: pathName.POST,
        };
        break;
      case 'qas':
        data = {
          title: `câu hỏi <strong>${action.title}</strong>`,
          path: pathName.QUESTS_DETAIL,
        };
        break;
      case 'searches':
        data = {
          title: `<strong>${action.query}</strong>`,
          path: '',
        };
        break;
      case 'likes':
        const pathTypeLike =
          action?.post_id !== null ? pathName.POST : action?.blog_id ? pathName.BLOG : pathName.QUESTS_DETAIL;
        const type = action?.post_id !== null ? 'bài viết' : action?.blog_id ? 'blog' : 'câu hỏi';
        data = {
          title: `<strong>${type}</strong>`,
          path: pathTypeLike,
        };
        break;
      case 'reports':
        const pathTypeReport = getPathTypeReport(action?.report_type);
        const typeObject = getTypeObject(action?.report_type);
        data = {
          title: `<strong>${typeObject}</strong>`,
          path: pathTypeReport,
        };
        break;
      default:
        break;
    }

    return data;
  };

  const getAction = (item: any) => {
    let data = null;
    const logName = getLogName(item)?.title;
    let action =
      item?.event === 'created' || item?.event === 'updated' ? item?.properties.attributes : item?.properties.old;
    switch (item?.event) {
      case 'updated':
        switch (item?.log_name) {
          case 'posts':
            data = {
              title: `đã cập nhật trạng thái một ${logName} thành ${
                action?.status === 1
                  ? `<strong>Bạn bè</strong>`
                  : action?.status === 0
                    ? `<strong>Công khai</strong>`
                    : `<strong>Chỉ mình tôi</strong>`
              }`,
              id: action?.id,
            };
            break;
        }
        break;
      case 'created':
        switch (item?.log_name) {
          case 'searches':
            data = {
              title: `đã tìm kiếm ${logName}`,
              id: action?.id,
            };
            break;
          case 'likes':
            const emotion = action?.emotion === 'like' ? 'thích' : 'bày tỏ cảm xúc về';
            const newId =
              action?.post_id !== null ? action?.post_id : action?.blog_id !== null ? action?.blog_id : action?.qa_id;
            data = {
              title: `đã ${emotion} một ${logName}`,
              id: newId,
            };
            break;
          case 'reports':
            data = {
              title: `đã báo cáo một ${logName}`,
              id: action?.report_type_id,
            };
            break;
          default:
            data = {
              title: `đã tạo một ${logName}`,
              id: item?.properties?.attributes?.id,
            };
            break;
        }
        break;
      default:
        switch (item?.log_name) {
          case 'likes':
            const newId =
              action?.post_id !== null ? action?.post_id : action?.blog_id !== null ? action?.blog_id : action?.qa_id;
            data = {
              title: `đã bỏ thích một ${logName}`,
              id: newId,
            };
            break;
          default:
            data = {
              title: `đã xoá một ${logName}`,
              id: action?.id,
            };
            break;
        }
        break;
    }

    return data;
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
                  <strong>Bạn</strong> {parser(getAction(item)?.title ?? '')}
                </h6>
                <h6>
                  <strong>Thời gian:</strong> {momentVi(item?.created_at).format('DD/MM/YYYY HH:mm:ss')}
                </h6>
              </div>
              <div className="d-flex align-items-center">
                <Link
                  to={`${pathName.ACCOUNT_HISTORY}#${param}`}
                  onClick={() => onDelete(item?.id)}
                  className="me-3 iq-notify"
                >
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
      <Card className="bg-light" key={item?.id}>
        <Card.Body>
          {getLogName(item)?.path !== '' ? (
            <Link to={`${getLogName(item)?.path}/${getAction(item)?.id}`}>
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
