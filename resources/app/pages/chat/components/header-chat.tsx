import { CustomToggle } from '@/components/custom';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useChatContext } from '../context';
import { formatFullName } from '@/utilities/functions';
import { useUserChatInfo } from '@/hooks/useChatQuery';
import { Skeleton } from '@mui/material';

export const HeaderChat = () => {
  const { onClickRemoveChat, chatId } = useChatContext();

  const { data: selectedUserInfo, isFetching } = useUserChatInfo(Number(chatId));

  const { user: currentUser } = selectedUserInfo || {};
  console.log(isFetching);
  // render
  return (
    <>
      {isFetching && (
        <div className="chat-head border-bottom border-2">
          <header className="d-flex justify-content-between align-items-center bg-white px-3">
            <div className="d-flex align-items-center gap-2">
              <Skeleton
                className="skeleton-color"
                style={{ backgroundColor: 'red !important' }}
                width={50}
                height={80}
              />
              <h5 className="mb-0">
                <Skeleton className="skeleton-color" width={200} height={30} />
              </h5>
            </div>
            <div className="chat-header-icons d-flex">
              <Skeleton className="skeleton-color" width={40} height={70} />
              <Skeleton className="skeleton-color" width={40} height={70} />
            </div>
          </header>
        </div>
      )}
      {currentUser && (
        <div className="chat-head border-bottom border-2">
          <header className="d-flex justify-content-between align-items-center bg-white pt-3  ps-3 pe-3 pb-3">
            <Link to={`/profile/${currentUser?.id}`} className="d-flex align-items-center">
              <div className="sidebar-toggle">
                <i className="ri-menu-3-line"></i>
              </div>
              <div className="avatar chat-user-profile m-0 me-3">
                <img loading="lazy" src={currentUser?.avatar} alt="avatar" className="avatar-50 " />
                <span className="avatar-status">
                  <i className="material-symbols-outlined text-success  md-14 filled">circle</i>
                </span>
              </div>
              <h5 className="mb-0">{formatFullName(currentUser)}</h5>
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
      )}
    </>
  );
};
