import { useAppSelector } from '@/redux/hook';
import { pathName } from '@/routes/path-name';
import { momentVi } from '@/utilities/functions/moment-locale';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export type History = {
  item: any;
  onDelete: (id: number) => void;
};

export const HistoryCommentItem = ({ item, onDelete }: History) => {
  const { userInfo } = useAppSelector(state => state.auth);
  const newItem =
    item.event === 'created' || item.event === 'updated' ? item.properties.attributes : item.properties.old;
  const checkTypeId = (item: any) => {
    let data = null;
    switch (true) {
      case newItem.blog_id !== null:
        data = {
          id: newItem.blog_id,
          type: 'blog',
          path: pathName.BLOG,
        };
        return data;
      case newItem.qa_id !== null:
        data = {
          id: newItem.qa_id,
          type: 'câu hỏi',
          path: pathName.QUESTS,
        };
        return data;
      case newItem.post_id !== null:
        data = {
          id: newItem.post_id,
          type: 'bài viết',
          path: pathName.POST,
        };
        return data;
      default:
        return null;
    }
  };

  const getAction = (item: any) => {
    let data = null;
    const newItem =
      item.event === 'created' || item.event === 'updated' ? item.properties.attributes : item.properties.old;
    switch (item.event) {
      case 'created':
        if (newItem.reply_to !== '' && newItem.parent_id !== null) {
          data = {
            title: `đã trả lời bình luận của ${newItem.reply_to}`,
            content: newItem.content,
            id: checkTypeId(item)?.id,
          };
        } else {
          data = {
            title: `đã bình luận về một ${checkTypeId(item)?.type}`,
            content: newItem.content,
            id: checkTypeId(item)?.id,
          };
        }
        return data;
      case 'deleted':
        data = {
          title: `đã xoá một bình luận`,
          content: item.properties.old.content,
          id: checkTypeId(item)?.id,
        };
        return data;
      case 'updated':
        data = {
          title: `đã sửa một bình luận`,
          content: newItem.content,
          id: checkTypeId(item)?.id,
        };
        return data;
      default:
        return null;
    }
  };
  return (
    <>
      <Card className="bg-light" key={item.id}>
        <Card.Body>
          <Link to={`${checkTypeId(item)?.path}/${getAction(item)?.id}`}>
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
                          <strong>Bạn</strong> {getAction(item)?.title}
                        </h6>
                        <h6>
                          <strong>Thời gian:</strong> {momentVi(item.created_at).format('DD/MM/YYYY HH:mm:ss')}
                        </h6>
                      </div>
                      <div className="d-flex align-items-center">
                        <Link to="#comments" onClick={() => onDelete(item.id)} className="me-3 iq-notify">
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
          </Link>
        </Card.Body>
      </Card>
    </>
  );
};
