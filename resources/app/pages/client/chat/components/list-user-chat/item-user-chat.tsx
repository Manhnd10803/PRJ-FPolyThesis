import { Nav } from 'react-bootstrap';
const imageUrl = 'https://picsum.photos/20';
export const ItemUserChat = ({ item, index }) => {
  return (
    <>
      <Nav.Item as="li" key={index}>
        <Nav.Link eventKey={item.id} href={`#${item.id}`}>
          <div className="d-flex align-items-center">
            <div className="avatar me-2">
              <img loading="lazy" src={item.avatar} alt="chatuserimage" className="avatar-50 " />
              <span className="avatar-status">
                <i className="material-symbols-outlined text-success  md-14 filled">circle</i>
              </span>
            </div>

            <div className="chat-sidebar-name">
              <h6 className="mb-0">{item.username}</h6>
              <span>Lorem Ipsum is</span>
            </div>

            <div className="chat-meta float-right text-center mt-2 me-1">
              <div className="chat-msg-counter bg-primary text-white">20</div>
              <span className="text-nowrap">05 min</span>
            </div>
          </div>
        </Nav.Link>
      </Nav.Item>
    </>
  );
};

export default ItemUserChat;
