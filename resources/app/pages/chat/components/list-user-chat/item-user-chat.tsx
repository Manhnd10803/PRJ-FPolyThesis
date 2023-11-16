import { Nav } from 'react-bootstrap';

export const ItemUserChat = ({ item, index }) => {
  return (
    <>
      <Nav.Item as="li" key={index} className="item">
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
              <div onClick={() => console.log('delete chat')}>
                <i className="bg-soft-secondary rounded-circle p-1 material-symbols-outlined md-18 me-1">delete</i>
              </div>
            </div>
          </div>
        </Nav.Link>
      </Nav.Item>
    </>
  );
};

export default ItemUserChat;
