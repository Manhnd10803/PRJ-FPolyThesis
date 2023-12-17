import { pathName } from '@/routes/path-name';
import diacritics from 'diacritics';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useChatContext } from '../context';
import { useListPrivateChannel } from '@/hooks/useChatQuery';
import { Skeleton } from '@mui/material';
import { formatFullName } from '@/utilities/functions';
import { StorageFunc } from '@/utilities/local-storage/storage-func';

type ListPrivateChannelProps = {
  search: string;
};

export const ListPrivateChannel = ({ search }: ListPrivateChannelProps) => {
  const { data, isFetching } = useListPrivateChannel();

  const listPrivateChannel = data?.data || [];

  const { onClickRemoveChat } = useChatContext();
  const userId = StorageFunc.getUserId();

  const normalizedSearch = diacritics.remove(search.toLowerCase());

  const filteredUsers = search
    ? listPrivateChannel?.filter(item => diacritics.remove(item.username.toLowerCase()).includes(normalizedSearch))
    : listPrivateChannel;

  if (!isFetching && listPrivateChannel && listPrivateChannel.length === 0) return <div>Bạn chưa nhắn tin với ai</div>;
  return (
    <Nav as="ul" variant="pills" className="iq-chat-ui nav flex-column">
      {isFetching &&
        Array.from({ length: 8 }).map((_, index) => (
          <Nav.Item as="li" className="item mb-3 mt-3" key={index}>
            <div className="d-flex align-items-center">
              <div className="avatar me-2">
                <Skeleton variant="circular" className="skeleton-color" width={50} height={50} animation="wave" />
              </div>

              <div className="chat-sidebar-name">
                <Skeleton className="skeleton-color" width="50%" height={20} animation="wave" />
                <Skeleton className="skeleton-color" width="30%" height={20} animation="wave" />
              </div>
            </div>
          </Nav.Item>
        ))}

      {filteredUsers &&
        filteredUsers?.map((item, index) => {
          return (
            <Nav.Item as="li" key={index} className="item " style={{ width: '98%' }}>
              <Nav.Link as={Link} eventKey={item.id} to={`${pathName.CHAT}/${item.id}`}>
                <div className="d-flex align-items-center" style={{ paddingLeft: '10px' }}>
                  <div className="avatar me-2">
                    <img loading="lazy" src={item?.avatar} alt="chatuserimage" className="avatar-55 rounded-circle" />
                    {item?.activity_user && (
                      <i
                        className={`material-symbols-outlined md-14 filled position-absolute bottom-0 end-0 text-${
                          item.activity_user === 'Đang hoạt động'
                            ? 'success'
                            : item.activity_user === 'Đang bận'
                            ? 'warning'
                            : item.activity_user === 'Ẩn'
                            ? 'light'
                            : 'danger'
                        }`}
                        style={{ fontSize: '20px' }}
                      >
                        circle
                      </i>
                    )}
                  </div>
                  <div className="chat-sidebar-name">
                    <h6 className="mb-0">{formatFullName(item)}</h6>
                    {/* <h6 className="mb-0">{formatFullName(item)} ({item?.major?.majors_name})</h6> */}
                    <h6
                      style={{
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: 1,
                        WebkitBoxOrient: 'vertical',
                      }}
                    >
                      {item.last_message?.sender_id === userId ? 'Bạn:' : ''} {item.last_message?.content}
                    </h6>
                    {/* <span className="text-primary">{item?.activity_user}</span> */}
                  </div>

                  <div className="chat-meta float-right text-center mt-2 me-1">
                    <div
                      onClick={e => {
                        e.preventDefault();
                        e.stopPropagation();
                        onClickRemoveChat(item.id);
                      }}
                    >
                      <i className="bg-soft-secondary rounded-circle p-1 material-symbols-outlined md-18 me-1">
                        delete
                      </i>
                    </div>
                  </div>
                </div>
              </Nav.Link>
            </Nav.Item>
          );
        })}
    </Nav>
  );
};
