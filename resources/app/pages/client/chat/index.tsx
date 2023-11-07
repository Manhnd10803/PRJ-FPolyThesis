import { Link, useLocation } from 'react-router-dom';
import { Row, Col, Form, Tab, Nav, Button, Dropdown, Card } from 'react-bootstrap';
import { StorageFunc } from '@/utilities/local-storage/storage-func';
import { ProfileService } from '@/apis/services/profile.service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { MessagesService } from '@/apis/services/messages.service';
import { formatTime } from './components/format-time';
import { RightSideBar } from './components/right-side-bar/right-side-bar';
import Echo from 'laravel-echo';
import { useEffect, useState } from 'react';

export const ChatPage = () => {
  const localUserId = StorageFunc.getUserId();
  const getDetailUserProfile = async () => {
    const { data } = await ProfileService.getDetailUserProfile(localUserId);
    return data;
  };

  const queryKeyUser = ['user'];
  const { data: detailUserProfile, isLoading: isUserLoading } = useQuery(queryKeyUser, getDetailUserProfile);

  const getListChat = async () => {
    const { data } = await MessagesService.getListChat();
    return data;
  };

  const queryKeyListChat = ['listchat'];
  const { data: listChatMessage, isLoading: isListChatLoading } = useQuery(queryKeyListChat, getListChat);

  let { hash } = useLocation();
  let chat_id = hash.split('#')[1];
  const getDetailReceiverProfile = async () => {
    const { data } = await ProfileService.getDetailUserProfile(chat_id);
    return data.user;
  };

  const queryKeyUserReceiver = ['receiver_user', chat_id];
  const { data: detailReceiverProfile, isLoading: isReceiverUserLoading } = useQuery(
    queryKeyUserReceiver,
    getDetailReceiverProfile,
    {
      enabled: !!chat_id,
    },
  );

  const getMessage = async () => {
    if (chat_id) {
      const { data } = await MessagesService.showMessages(Number(chat_id));
      return data;
    }
    return null;
  };

  const queryKeyMessage = ['message', chat_id];
  const { data: chatMessage, isLoading: isMessage } = useQuery(queryKeyMessage, getMessage, {
    enabled: !!chat_id,
  });

  const [message, setMessage] = useState('');

  const echo = new Echo({
    broadcaster: 'socket.io',
    host: 'http://localhost:6001',
  });

  const queryClient = useQueryClient();
  const sendMessageMutation = useMutation(
    messageText => {
      return MessagesService.sendMessages(Number(chat_id), { content: messageText });
    },
    {
      onSuccess: data => {
        queryClient.invalidateQueries(queryKeyMessage);
      },
    },
  );

  useEffect(() => {
    echo.private(`user.${chat_id}`).listen('PrivateMessageSent', (event: any) => {
      console.log('Received message:', event);
    });
  }, []);

  const handleSendMessage = (e: any) => {
    e.preventDefault();

    const messageText = message.trim();
    if (messageText) {
      sendMessageMutation.mutate(messageText);

      echo.private(`user.${chat_id}`).whisper('typing', {
        message: messageText,
      });

      setMessage(''); // Xóa nội dung tin nhắn sau khi gửi
    }
  };
  return (
    <>
      <div id="content-page" className="content-page">
        {/* <h1>ChatPage</h1> */}
        <Row>
          <Col sm="2"></Col>
          <Col sm="10">
            <Card>
              <Card.Body className="chat-page p-0">
                <div className="chat-data-block">
                  <Row>
                    <Col lg={2} className="chat-data-left scroller">
                      <RightSideBar
                        isLoading={isUserLoading}
                        data={detailUserProfile}
                        listChatMessage={listChatMessage}
                        isListChatLoading={isListChatLoading}
                      />
                    </Col>
                    <Col lg={10} className=" chat-data p-0 chat-data-right">
                      <Tab.Content>
                        {!isReceiverUserLoading && (
                          <>
                            <div className="chat-head">
                              <header className="d-flex justify-content-between align-items-center bg-white pt-3  ps-3 pe-3 pb-3">
                                <div className="d-flex align-items-center">
                                  <div className="sidebar-toggle">
                                    <i className="ri-menu-3-line"></i>
                                  </div>
                                  <div className="avatar chat-user-profile m-0 me-3">
                                    <img
                                      loading="lazy"
                                      src={detailReceiverProfile.avatar}
                                      alt="avatar"
                                      className="avatar-50 "
                                    />
                                    <span className="avatar-status">
                                      <i className="material-symbols-outlined text-success  md-14 filled">circle</i>
                                    </span>
                                  </div>
                                  <h5 className="mb-0">{detailReceiverProfile.username}</h5>
                                </div>
                                <div className="chat-header-icons d-flex">
                                  <Link
                                    to="#"
                                    className="chat-icon-phone bg-soft-primary d-flex justify-content-center align-items-center"
                                  >
                                    <i className="material-symbols-outlined md-18">delete</i>
                                  </Link>
                                  <Dropdown
                                    className="bg-soft-primary d-flex justify-content-center align-items-center"
                                    as="span"
                                  >
                                    <Dropdown.Toggle variant="material-symbols-outlined cursor-pointer md-18 nav-hide-arrow pe-0 show">
                                      more_vert
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu className="dropdown-menu-right">
                                      <Dropdown.Item className="d-flex align-items-center" href="#">
                                        <i className="material-symbols-outlined md-18 me-1">push_pin</i>Pin to top
                                      </Dropdown.Item>
                                      <Dropdown.Item className="d-flex align-items-center" href="#">
                                        <i className="material-symbols-outlined md-18 me-1">delete_outline</i>Delete
                                        chat
                                      </Dropdown.Item>
                                      <Dropdown.Item className="d-flex align-items-center" href="#">
                                        <i className="material-symbols-outlined md-18 me-1">watch_later</i>Block
                                      </Dropdown.Item>
                                    </Dropdown.Menu>
                                  </Dropdown>
                                </div>
                              </header>
                            </div>
                          </>
                        )}

                        {!isMessage && (
                          <div className="chat-content scroller">
                            {chatMessage.map((item, index) => (
                              <>
                                {localUserId === item.sender_id ? (
                                  <>
                                    <div className="chat d-flex other-user" key={index}>
                                      <div className="chat-user">
                                        <Link className="avatar m-0" to="">
                                          <img
                                            loading="lazy"
                                            src={item.sender.avatar}
                                            alt="avatar"
                                            className="avatar-35 "
                                          />
                                        </Link>
                                        <span className="chat-time mt-1">{formatTime(item.created_at)}</span>
                                      </div>
                                      <div className="chat-detail">
                                        <div className="chat-message">
                                          <p>{item.content}</p>
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <div className="chat chat-left" key={index}>
                                      <div className="chat-user">
                                        <Link className="avatar m-0" to="">
                                          <img
                                            loading="lazy"
                                            src={item.sender.avatar}
                                            alt="avatar"
                                            className="avatar-35 "
                                          />
                                        </Link>
                                        <span className="chat-time mt-1">{formatTime(item.created_at)}</span>
                                      </div>
                                      <div className="chat-detail">
                                        <div className="chat-message" style={{ backgroundColor: '#F0F0F0' }}>
                                          <p>{item.content}</p>
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                )}
                              </>
                            ))}
                          </div>
                        )}
                        <div className="chat-footer p-3 bg-white">
                          <Form onSubmit={handleSendMessage} className="d-flex align-items-center" action="#">
                            <div className="chat-attagement d-flex">
                              <Link to="#">
                                <i className="far fa-smile pe-3" aria-hidden="true"></i>
                              </Link>
                              <Link to="#">
                                <i className="fa fa-paperclip pe-3" aria-hidden="true"></i>
                              </Link>
                            </div>
                            <Form.Control
                              type="text"
                              value={message}
                              name="content"
                              onChange={e => setMessage(e.target.value)}
                              className="me-3"
                              placeholder="Type your message"
                            />
                            <Button type="submit" variant="primary d-flex align-items-center">
                              <i className="far fa-paper-plane" aria-hidden="true"></i>
                              <span className="d-none d-lg-block ms-1">Send</span>
                            </Button>
                          </Form>
                        </div>
                      </Tab.Content>
                    </Col>
                  </Row>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};
