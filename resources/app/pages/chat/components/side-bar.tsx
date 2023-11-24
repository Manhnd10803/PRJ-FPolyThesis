import { MessagesService } from '@/apis/services/messages.service';
import { Loading } from '@/components/shared/loading';
import { useAppDispatch } from '@/redux/hook';
import { chatActions } from '@/redux/slice';
import { StorageFunc } from '@/utilities/local-storage/storage-func';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { ListPrivateChannel } from './list-private-channel';
import { PopUpSetting } from './popup-setting';

export const queryListPrivateChannel = ['list_private_channel'];

export const SideBar = () => {
  const userInfo = StorageFunc.getUser();

  const dispatch = useAppDispatch();

  const [showPopupSetting, setShowPopupSetting] = useState(false);

  const [searchText, setSearchText] = useState('');

  // func
  const getListPrivateChannel = async () => {
    const { data } = await MessagesService.getListPrivateChannel();
    return data;
  };

  const { isLoading } = useQuery({
    queryKey: queryListPrivateChannel,
    queryFn: getListPrivateChannel,
    onSuccess: data => {
      dispatch(chatActions.setListPrivateChannel(data));
    },
  });

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
            <p className="m-0">{userInfo?.majors_name}</p>
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
