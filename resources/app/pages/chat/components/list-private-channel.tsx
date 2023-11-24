import { useAppSelector } from '@/redux/hook';
import { pathName } from '@/routes/path-name';
import diacritics from 'diacritics';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

type ListPrivateChannelProps = {
  search: string;
};

export const ListPrivateChannel = ({ search }: ListPrivateChannelProps) => {
  const { listPrivateChannel } = useAppSelector(state => state.chat);

  const normalizedSearch = diacritics.remove(search.toLowerCase());

  const filteredUsers = search
    ? listPrivateChannel.filter(item => diacritics.remove(item.username.toLowerCase()).includes(normalizedSearch))
    : listPrivateChannel;

  if (listPrivateChannel.length === 0) return <div>Bạn chưa nhắn tin với ai</div>;

  return (
    <Nav as="ul" variant="pills" className="iq-chat-ui nav flex-column">
      {filteredUsers?.map((item, index) => {
        return (
          <Nav.Item as="li" key={index} className="item">
            <Nav.Link as={Link} eventKey={item.id} to={`${pathName.CHAT}/${item.id}`}>
              <div className="d-flex align-items-center">
                <div className="avatar me-2">
                  <img loading="lazy" src={item.avatar} alt="chatuserimage" className="avatar-50 " />
                  <span className="avatar-status">
                    <i className="material-symbols-outlined text-success  md-14 filled">circle</i>
                  </span>
                </div>

                <div className="chat-sidebar-name">
                  <h6 className="mb-0">{item.username}</h6>
                  <h6 className="mb-0">{item.majors_name}</h6>
                  <span>Đang hoạt động</span>
                </div>

                <div className="chat-meta float-right text-center mt-2 me-1">
                  <div onClick={() => console.log('delete chat')}>
                    <i className="bg-soft-secondary rounded-circle p-1 material-symbols-outlined md-18 me-1">delete</i>
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
