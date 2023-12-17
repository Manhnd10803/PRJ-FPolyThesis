import { StorageFunc } from '@/utilities/local-storage/storage-func';
import { useEffect } from 'react';
import { formatFullName } from '@/utilities/functions';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

type PopUpSettingProps = {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PopUpSetting = ({ show, setShow }: PopUpSettingProps) => {
  const userInfo = StorageFunc.getUser();

  useEffect(() => {
    ChatSidebar();
  }, []);

  const ChatSidebar = () => {
    document.getElementsByClassName('scroller')[0].classList.add('show');
  };

  const ChatSidebarClose = () => {
    document.getElementsByClassName('scroller')[0].classList.remove('show');
  };
  const formatBirthday = (birthday: null | undefined) => {
    if (!birthday) {
      return '';
    }
    const [year, month, day] = birthday.split('-');
    const formattedBirthday = `${day}-${month}-${year}`;
    return formattedBirthday;
  };
  return (
    <div id="user-detail-popup" className={`scroller ${show ? 'show' : ''}`} style={{ width: '413.5px' }}>
      <div className="user-profile">
        <Button type="submit" onClick={ChatSidebarClose} variant=" close-popup p-3">
          <i className="material-symbols-outlined md-18" onClick={() => setShow(false)}>
            close
          </i>
        </Button>

        <div className="user text-center mb-4 ">
          <Link className="avatar m-0 " to="">
            <div className="position-relative" style={{ width: '141px', margin: 'auto' }}>
              <img
                loading="lazy"
                src={userInfo?.avatar}
                alt="avatar"
                width={140}
                height={140}
                className="img-fluid rounded-circle "
              />
              {userInfo?.activity_user && (
                <i
                  className={`material-symbols-outlined md-14 filled position-absolute bottom-0 end-0 text-${
                    userInfo.activity_user === 'Đang hoạt động'
                      ? 'success'
                      : userInfo.activity_user === 'Đang bận'
                      ? 'warning'
                      : userInfo.activity_user === 'Ẩn'
                      ? 'light'
                      : 'danger'
                  }`}
                  style={{ fontSize: '40px' }}
                >
                  circle
                </i>
              )}
            </div>
          </Link>

          <div className="user-name mt-4">
            <h4 className="text-center">{userInfo && formatFullName(userInfo)}</h4>
            <span style={{ fontSize: '12px' }}>{userInfo?.username}</span>
          </div>
        </div>

        <hr />

        <div className="user-detail text-center mt-4 ps-4 pe-4">
          <h3 className="mt-4 mb-4">Thông tin chung</h3>
          <h6 className="mt-2 mb-4">
            Bio
            <span
              className="text-muted "
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 1,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {' '}
              {userInfo?.biography ? userInfo.biography : 'Người dùng này lười quá chả để lại gì cả 😱'}
            </span>
          </h6>

          <ul className="user-status p-0 ">
            <li className="mb-3">
              <div className="d-flex justify-content-between">
                <span>Email:</span>
                <span className="text-muted">{userInfo?.email}</span>
              </div>
            </li>
            <li className="mb-3">
              <div className="d-flex justify-content-between">
                <span>Số điện thoại:</span>
                <span className="text-muted">{userInfo?.phone}</span>
              </div>
            </li>
            <li className="mb-3">
              <div className="d-flex justify-content-between">
                <span>Ngày sinh:</span>
                <span className="text-muted">{formatBirthday(userInfo?.birthday)}</span>
              </div>
            </li>
            <li className="mb-3">
              <div className="d-flex justify-content-between">
                <span>Địa chỉ:</span>
                <span
                  className="text-muted"
                  style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {userInfo?.address}
                </span>
              </div>
            </li>
            <li className="mb-3">
              <div className="d-flex justify-content-between">
                <span>Chuyên ngành:</span>
                <span className="text-muted">{userInfo?.majors_name}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
