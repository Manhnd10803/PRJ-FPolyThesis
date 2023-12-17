import { StorageFunc } from '@/utilities/local-storage/storage-func';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { ListPrivateChannel } from './list-private-channel';
import { PopUpSetting } from './popup-setting';
import { formatFullName } from '@/utilities/functions';
import { IUser } from '@/models/user';

export const SideBar = () => {
  const userInfo = StorageFunc.getUser();

  const [showPopupSetting, setShowPopupSetting] = useState(false);

  const [searchText, setSearchText] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  return (
    <>
      <div className="chat-search pt-3 ps-3">
        <div className="d-flex align-items-center">
          <div className="chat-profile me-3 position-relative ">
            <img
              loading="lazy"
              className="img-fluid rounded-circle"
              width={70}
              height={70}
              src={userInfo?.avatar}
              alt="chat-user"
              onClick={() => setShowPopupSetting(true)}
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
                style={{ fontSize: '20px' }}
              >
                circle
              </i>
            )}
          </div>
          <div className="chat-caption">
            <h5 className="mb-0">{formatFullName(userInfo as IUser)}</h5>
            <p className="m-0">{userInfo?.majors_name ?? ''}</p>
            {userInfo?.activity_user && (
              <h6 style={{ fontSize: '12px' }}>
                {userInfo?.activity_user === 'Đang hoạt động'
                  ? 'Đang hoạt động'
                  : userInfo?.activity_user === 'Đang bận'
                  ? 'Đang bận'
                  : userInfo?.activity_user === 'Ẩn'
                  ? 'Ẩn'
                  : 'Ngoại tuyến'}
              </h6>
            )}
          </div>
        </div>

        <PopUpSetting show={showPopupSetting} setShow={setShowPopupSetting} />

        <div className="chat-searchbar mt-4" style={{ width: '96%' }}>
          <Form.Group className="form-group chat-search-data m-0">
            <input
              type="text"
              className="form-control round"
              id="chat-search"
              placeholder="Search"
              onChange={handleSearchChange}
            />
            <i className="material-symbols-outlined"> search </i>
          </Form.Group>
        </div>
      </div>
      <div className="chat-sidebar-channel scroller mt-4 ps-3">
        <h5 className="mt-3" style={{ width: '98%' }}>
          Danh sách tin nhắn
        </h5>
        <ListPrivateChannel search={searchText} />
      </div>
    </>
  );
};
