import { Form, Nav } from 'react-bootstrap';
import { ListUserChat } from '../list-user-chat/list-user-chat';
import { useState } from 'react';
import { PopUpSetting } from './components/popup-setting';

export const RightSideBar = ({ isLoading, data, isListChatLoading, listChatMessage }) => {
  // searchText
  const [searchText, setSearchText] = useState('');

  const handleSearchChange = (event: any) => {
    setSearchText(event.target.value);
  };
  const [show1, setShow1] = useState('false');
  return (
    <>
      <div className="chat-search pt-3 ps-3">
        {!isLoading && (
          <div className="d-flex align-items-center">
            <div className="chat-profile me-3">
              <img
                loading="lazy"
                src={data?.user?.avatar}
                alt="chat-user"
                className="avatar-60 "
                onClick={() => setShow1('true')}
              />
            </div>
            <div className="chat-caption">
              <h5 className="mb-0">{data?.user?.username}</h5>
              <p className="m-0">{data?.user?.major}</p>
            </div>
          </div>
        )}

        <PopUpSetting data={data} show1={show1} setShow1={setShow1} />

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
        <h5>Public Channels</h5>
        <Nav as="ul" variant="pills" className="iq-chat-ui nav flex-column">
          {!isListChatLoading && <ListUserChat data={listChatMessage} search={searchText} />}
        </Nav>
      </div>
    </>
  );
};
