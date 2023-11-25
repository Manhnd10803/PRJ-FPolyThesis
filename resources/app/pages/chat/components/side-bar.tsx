import { Loading } from '@/components/shared/loading';
import { useAppSelector } from '@/redux/hook';
import { StorageFunc } from '@/utilities/local-storage/storage-func';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { ListPrivateChannel } from './list-private-channel';
import { PopUpSetting } from './popup-setting';

export const SideBar = () => {
  const userInfo = StorageFunc.getUser();

  const { isLoading } = useAppSelector(state => state.chat);

  const [showPopupSetting, setShowPopupSetting] = useState(false);

  const [searchText, setSearchText] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  return (
    <>
      <div className="chat-search pt-3 ps-3">
        <div className="d-flex align-items-center">
          <div className="chat-profile me-3">
            <img
              loading="lazy"
              src={userInfo?.avatar}
              alt="chat-user"
              className="avatar-60 "
              onClick={() => setShowPopupSetting(true)}
            />
          </div>
          <div className="chat-caption">
            <h5 className="mb-0">{userInfo?.username}</h5>
            <p className="m-0">{userInfo?.majors_name ?? ''}</p>
          </div>
        </div>

        <PopUpSetting show={showPopupSetting} setShow={setShowPopupSetting} />

        <div className="chat-searchbar mt-4">
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
        <h5 className="mt-3">Tin nhắn</h5>
        {isLoading ? (
          <Loading size={100} textStyle={{ fontSize: '30px' }} />
        ) : (
          <ListPrivateChannel search={searchText} />
        )}
      </div>
    </>
  );
};
