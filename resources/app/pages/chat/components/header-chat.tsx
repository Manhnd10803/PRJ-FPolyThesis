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

  // render
  return (
    <>
      {isFetching && (
        <div className="chat-head border-bottom border-2">
          <header className="d-flex justify-content-between align-items-center bg-white px-3">
            <div className="d-flex align-items-center gap-2">
              <Skeleton
                variant="circular"
                className="skeleton-color"
                style={{ backgroundColor: 'red !important' }}
                width={55}
                height={55}
                animation="wave"
              />
              <div className="d-flex flex-column">
                <h5 className="mb-0">
                  <Skeleton
                    className="skeleton-color"
                    width={200}
                    height={30}
                    animation="wave"
                    style={{ borderRadius: '8px' }}
                  />
                </h5>
                <h6 style={{ fontSize: '12px' }}>
                  <Skeleton className="skeleton-color" width={100} height={20} animation="wave" />
                </h6>
              </div>
            </div>
            <div className="chat-header-icons d-flex">
              <Skeleton className="skeleton-color" width={40} height={70} animation="wave" />
              <Skeleton className="skeleton-color" width={40} height={70} animation="wave" />
            </div>
          </header>
        </div>
      )}
      {currentUser && (
        <div className="chat-head border-bottom border-2">
          <header className="d-flex justify-content-between align-items-center bg-white pt-3  ps-3 pe-3 pb-3">
            <Link to={`/profile/${currentUser?.id}`} className="d-flex align-items-center">
              <div className="avatar chat-user-profile m-0 me-3 position-relative">
                <img loading="lazy" src={currentUser?.avatar} alt="avatar" className="avatar-55 rounded-circle" />
                {currentUser?.activity_user && (
                  <i
                    className={`material-symbols-outlined md-14 filled position-absolute bottom-0 end-0 text-${
                      currentUser.activity_user === 'Đang hoạt động'
                        ? 'success'
                        : currentUser.activity_user === 'Đang bận'
                          ? 'warning'
                          : currentUser.activity_user === 'Ẩn'
                            ? 'light'
                            : 'danger'
                    }`}
                    style={{ fontSize: '20px' }}
                  >
                    circle
                  </i>
                )}
              </div>
              <div className="d-flex flex-column">
                <h5 className="mb-0">{formatFullName(currentUser)}</h5>
                {currentUser?.activity_user && (
                  <h6 style={{ fontSize: '12px' }}>
                    {currentUser?.activity_user === 'Đang hoạt động'
                      ? 'Đang hoạt động'
                      : currentUser?.activity_user === 'Đang bận'
                        ? 'Đang bận'
                        : currentUser?.activity_user === 'Ẩn'
                          ? 'Ẩn'
                          : 'Ngoại tuyến'}
                  </h6>
                )}
              </div>
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
                    <i className="material-symbols-outlined md-18 me-1">error</i>Báo cáo
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
