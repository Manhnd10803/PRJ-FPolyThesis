import moment from 'moment';
import parse from 'html-react-parser';
import { Link, useLocation } from 'react-router-dom';
import { Row, Col, Tab, Dropdown, Card } from 'react-bootstrap';
import { StorageFunc } from '@/utilities/local-storage/storage-func';
import { ProfileService } from '@/apis/services/profile.service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { MessagesService } from '@/apis/services/messages.service';
import { RightSideBar } from './components/right-side-bar/right-side-bar';
import { useEffect, useRef, useState } from 'react';
import InputEmoji from 'react-input-emoji';
import { CustomToggle } from '@/components/custom';
import sendMessageSound from '@/assets/mp3/sendmessage.mp3';
import receiveMessages from '@/assets/mp3/receiverMessage.mp3';
export const ChatPage = () => {
  const localUserId = StorageFunc.getUserId();
  let { hash } = useLocation();
  let chat_id = hash.split('#')[1];
  const socketID = window.Echo.socketId();

  const audioReceiverMessage = () => {
    new Audio(receiveMessages).play();
  };
  useEffect(() => {
    // echo.leave(`user.${localUserId}`); //rời channel
    const handlePrivateMessage = (event: any) => {
      queryClient.invalidateQueries(queryKeyMessage);
      audioReceiverMessage();
    };

    window.Echo.private(`user.${localUserId}`).listen('.PrivateMessageSent', handlePrivateMessage);
    return () => {
      window.Echo.private(`user.${localUserId}`).stopListening('.PrivateMessageSent', handlePrivateMessage);
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

  const audioSendMessage = () => {
    new Audio(sendMessageSound).play();
  };

  const queryClient = useQueryClient();
  const sendMessageMutation = useMutation(
    messageText => {
      return MessagesService.sendMessages(Number(chat_id), { content: messageText }, socketID);
    },
    {
      onSuccess: data => {
        audioSendMessage();
        queryClient.invalidateQueries(queryKeyMessage);
        scrollToLastMessage();
      },
    },
  );

  const handleSendMessage = () => {
    const messageText = message.trim();
    if (messageText) {
      sendMessageMutation.mutate(messageText);
    }
  };

  //scroll to last message
  const chatContentRef = useRef(null);

  const scrollToLastMessage = () => {
    if (chatContentRef.current) {
      const chatContent = chatContentRef.current;
      chatContent.scrollTop = chatContent.scrollHeight;
    }
  };
  useEffect(() => {
    if (chatMessage && chatMessage.length > 0) {
      scrollToLastMessage();
    }
  }, [chatMessage]);
  return (
    <>
      {/* <div>
        <Button onClick={start}>Play</Button>
      </div> */}
      <div id="content-page" className="content-page p-0">
        <Row>
          <Col sm="12">
            <Card className="mb-0">
              <Card.Body className="chat-page p-0">
                <div className="chat-data-block">
                  <Row>
                    <Col lg={2} className="chat-data-left scroller" style={{ paddingRight: '2px' }}>
                      <RightSideBar
                        isLoading={isUserLoading}
                        data={detailUserProfile}
                        listChatMessage={listChatMessage}
                        isListChatLoading={isListChatLoading}
                      />
                    </Col>
                    <Col lg={10} className=" chat-data p-0 chat-data-right border-start">
                      <Tab.Content>
                        {!isReceiverUserLoading && (
                          <>
                            <div className="chat-head border-bottom border-2">
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
                                    <Dropdown.Toggle
                                      as={CustomToggle}
                                      variant="material-symbols-outlined cursor-pointer md-18 nav-hide-arrow pe-0 show"
                                    >
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
                                        <span className="chat-time mt-1">{moment(item.created_at).format('LT')}</span>
                                      </div>
                                      <div className="chat-detail" style={{ maxWidth: '50%' }}>
                                        <div>
                                          <Dropdown
                                            className="d-flex justify-content-center align-items-center"
                                            as="span"
                                          >
                                            <Dropdown.Toggle
                                              as={CustomToggle}
                                              variant="material-symbols-outlined cursor-pointer md-18 nav-hide-arrow pe-0 show"
                                            >
                                              more_vert
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu className="dropdown-menu-right">
                                              <Dropdown.Item
                                                className="d-flex align-items-center"
                                                onClick={() => console.log('hihi')}
                                              >
                                                <i className="material-symbols-outlined md-18 me-1">delete_outline</i>
                                                Xoá
                                              </Dropdown.Item>
                                            </Dropdown.Menu>
                                          </Dropdown>
                                        </div>
                                        <div className="chat-message">
                                          <div>{parse(item.content.replace('</br>', '<br />'))}</div>
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
                                        <span className="chat-time mt-1">{moment(item.created_at).format('LT')}</span>
                                      </div>
                                      <div className="chat-detail" style={{ maxWidth: '50%' }}>
                                        <div className="chat-message" style={{ backgroundColor: '#F0F0F0' }}>
                                          <div>{parse(item.content.replace('</br>', '<br />'))}</div>
                                        </div>
                                        <div>
                                          <Dropdown
                                            className="d-flex justify-content-center align-items-center"
                                            as="span"
                                          >
                                            <Dropdown.Toggle
                                              as={CustomToggle}
                                              variant="material-symbols-outlined cursor-pointer md-18 nav-hide-arrow pe-0 show"
                                            >
                                              more_vert
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu className="dropdown-menu-right">
                                              <Dropdown.Item className="d-flex align-items-center" href="#">
                                                <i className="material-symbols-outlined md-18 me-1">delete_outline</i>
                                                Xoá
                                              </Dropdown.Item>
                                            </Dropdown.Menu>
                                          </Dropdown>
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
                            <InputEmoji
                              value={message}
                              onChange={setMessage}
                              cleanOnEnter
                              onEnter={handleSendMessage}
                              placeholder="Type a message"
                              theme="auto"
                              shouldReturn={true}
                              keepOpened={true}
                            />
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
