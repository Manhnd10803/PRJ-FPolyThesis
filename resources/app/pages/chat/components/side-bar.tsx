import { MessagesService } from '@/apis/services/messages.service';
import { useAppDispatch } from '@/redux/hook';
import { chatActions } from '@/redux/slice';
import { StorageFunc } from '@/utilities/local-storage/storage-func';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Form, Nav } from 'react-bootstrap';
import { ListUserChat } from './list-user-chat';
import { PopUpSetting } from './popup-setting';

export const queryKeyListChat = ['list_user_chat'];

export const SideBar = () => {
  const userInfo = StorageFunc.getUser();

  const dispatch = useAppDispatch();

  const [searchText, setSearchText] = useState('');

  // func
  const getListUserChat = async () => {
    const { data } = await MessagesService.getListUserChat();
    return data;
  };

  const { data: listUserChat, isLoading } = useQuery({
    queryKey: queryKeyListChat,
    queryFn: getListUserChat,
    onSuccess: data => {
      dispatch(chatActions.setListUserChat(data));
    },
  });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };
  const [show1, setShow1] = useState('false');
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
              onClick={() => setShow1('true')}
            />
          </div>
          <div className="chat-caption">
            <h5 className="mb-0">{userInfo?.username}</h5>
            {/* <p className="m-0">{userInfo?.major}</p> */}
          </div>
        </div>

        <PopUpSetting data={userInfo} show1={show1} setShow1={setShow1} />

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
        <Nav as="ul" variant="pills" className="iq-chat-ui nav flex-column">
          {isLoading ? <div>Loading...</div> : null}
          {listUserChat?.length === 0 && <div>Không có tin nhắn nào</div>}
          {listUserChat && listUserChat.length > 0 ? <ListUserChat data={listUserChat} search={searchText} /> : null}
        </Nav>
      </div>
    </>
  );
};
