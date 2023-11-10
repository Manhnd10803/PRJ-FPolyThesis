import { Link, useLocation } from 'react-router-dom';
import { Row, Col, Form, Tab, Nav, Button, Dropdown, Card } from 'react-bootstrap';
import { StorageFunc } from '@/utilities/local-storage/storage-func';
import { ProfileService } from '@/apis/services/profile.service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { MessagesService } from '@/apis/services/messages.service';
import { formatTime } from './components/format-time';
import { RightSideBar } from './components/right-side-bar/right-side-bar';
import Echo from 'laravel-echo';
import { useEffect, useRef, useState } from 'react';
import socketio from 'socket.io-client';
export const ChatPage = () => {
  const localUserId = StorageFunc.getUserId();
  let { hash } = useLocation();
  let chat_id = hash.split('#')[1];
  const [socketID, setSocketID] = useState('');
  const token = StorageFunc.getAccessToken();
  useEffect(() => {
    const echo = new Echo({
      host: 'http://localhost:6001',
      broadcaster: 'socket.io',
      client: socketio,
      encrypted: false, //Chỉ định xem kết nối giữa client và server có sử dụng SSL/TLS để mã hóa hay không
      disableStats: true, //thu thập thống kê (statistics) của kết nối
      auth: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      transports: ['websocket'],
    });
    echo.connector.socket.connected = true;
    const socketioID = echo.socketId();
    setSocketID(socketioID);
    // echo.leave(`user.${localUserId}`); //rời channel
    const handlePrivateMessage = (event: any) => {
      console.log(event.message.content);
      queryClient.invalidateQueries(queryKeyMessage);
      alert('Có tin nhắn mới!');
    };

    // Đăng ký sự kiện listen chỉ một lần khi component được mount
    echo.private(`user.${localUserId}`).listen('.PrivateMessageSent', handlePrivateMessage);

    // Cleanup: Loại bỏ sự kiện khi component unmount
    return () => {
      echo.private(`user.${localUserId}`).stopListening('.PrivateMessageSent', handlePrivateMessage);
    };
  }, []);

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

  const queryClient = useQueryClient();
  const sendMessageMutation = useMutation(
    messageText => {
      return MessagesService.sendMessages(Number(chat_id), { content: messageText }, socketID);
    },
    {
      onSuccess: data => {
        queryClient.invalidateQueries(queryKeyMessage);
      },
    },
  );

  const handleSendMessage = (e: any) => {
    e.preventDefault();

    const messageText = message.trim();
    if (messageText) {
      sendMessageMutation.mutate(messageText);
      setMessage('');
    }
  };

  //scroll to last message
  const chatContentRef = useRef(null);

  useEffect(() => {
    const scrollToLastMessage = () => {
      if (chatContentRef.current) {
        const chatContent = chatContentRef.current;
        chatContent.scrollTop = chatContent.scrollHeight;
      }
    };

    if (chatMessage && chatMessage.length > 0) {
      scrollToLastMessage();
    }
  }, [chatMessage]);

  return (
    <>
      <div id="content-page" className="content-page">
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
                          <div className="chat-content scroller" ref={chatContentRef}>
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
                                      <div className="chat-detail" style={{ maxWidth: '50%' }}>
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
                                      <div className="chat-detail" style={{ maxWidth: '50%' }}>
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
                        {chat_id && (
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
                                onChange={e => {
                                  setMessage(e.target.value);
                                }}
                                className="me-3"
                                placeholder="Type your message"
                              />

                              <Button type="submit" variant="primary d-flex align-items-center">
                                <i className="far fa-paper-plane" aria-hidden="true"></i>
                                <span className="d-none d-lg-block ms-1">Send</span>
                              </Button>
                            </Form>
                          </div>
                        )}
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
