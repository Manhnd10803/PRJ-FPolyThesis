import { CustomToggle } from '@/components/custom';
import { useAppSelector } from '@/redux/hook';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useChatContext } from '../context';

export const HeaderChat = () => {
  const { selectedUserInfo } = useAppSelector(state => state.chat);

  const { onClickRemoveChat, chatId } = useChatContext();

  // render
  return (
    <>
      {selectedUserInfo ? (
        <div className="chat-head border-bottom border-2">
          <header className="d-flex justify-content-between align-items-center bg-white pt-3  ps-3 pe-3 pb-3">
            <Link to={`/profile/${selectedUserInfo?.id}`} className="d-flex align-items-center">
              <div className="sidebar-toggle">
                <i className="ri-menu-3-line"></i>
              </div>
              <div className="avatar chat-user-profile m-0 me-3">
                <img loading="lazy" src={selectedUserInfo?.avatar} alt="avatar" className="avatar-50 " />
                <span className="avatar-status">
                  <i className="material-symbols-outlined text-success  md-14 filled">circle</i>
                </span>
              </div>
              <h5 className="mb-0">{selectedUserInfo?.username}</h5>
            </Link>
            <div className="chat-header-icons d-flex">
              <Link
                to="#"
                onClick={() => onClickRemoveChat(chatId)}
                className="chat-icon-phone bg-soft-primary d-flex justify-content-center align-items-center"
              >
                <i className="material-symbols-outlined md-18">delete</i>
              </Link>
              <Dropdown className="bg-soft-primary d-flex justify-content-center align-items-center" as="span">
                <Dropdown.Toggle
                  as={CustomToggle}
                  variant="material-symbols-outlined cursor-pointer md-18 nav-hide-arrow pe-0 show"
                >
                  more_vert
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu-right">
                  <Dropdown.Item className="d-flex align-items-center" href="#">
                    <i className="material-symbols-outlined md-18 me-1">watch_later</i>Chặn
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </header>
        </div>
      ) : (
        <div style={{ height: 78, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <h3>Không tìm thấy người dùng này</h3>
        </div>
      )}
    </>
  );
};
