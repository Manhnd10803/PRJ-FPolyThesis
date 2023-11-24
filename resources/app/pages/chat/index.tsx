import { MessagesService } from '@/apis/services/messages.service';
import receiveMessages from '@/assets/mp3/receive-message.mp3';
import sendMessageSound from '@/assets/mp3/send-message.mp3';
import { IMessages } from '@/models/messages';
import { IUser } from '@/models/user';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { chatActions } from '@/redux/slice';
import { StorageFunc } from '@/utilities/local-storage/storage-func';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { ChatBox } from './components/chat-box';
import { ChatForm } from './components/chat-form';
import { HeaderChat } from './components/header-chat';
import { PopUpDeleteChat } from './components/pop-up-delete-chat';
import { SideBar, queryListPrivateChannel } from './components/side-bar';
import { ChatContextProvider } from './context';

const audioSend = new Audio(sendMessageSound);
const audioReceive = new Audio(receiveMessages);

export const ChatPage = () => {
  // hook
  const { id: chatId } = useParams();

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { listPrivateChannel } = useAppSelector(state => state.chat);

  const { accessToken } = useAppSelector(state => state.auth);

  const queryClient = useQueryClient();

  //state
  const [showModal, setShowModal] = useState(false);

  const localUserId = StorageFunc.getUserId();

  const socketID = window.Echo.socketId();

  // func

  const sendMessageMutation = useMutation((messageText: string) => {
    return MessagesService.sendMessages(Number(chatId), { content: messageText }, socketID);
  });
  const handleSendMessage = (message: string) => {
    sendMessageMutation.mutate(message, {
      onSuccess: ({ data }) => {
        audioSend.play();
        dispatch(chatActions.addMessageToConversation(data.data as IMessages));
      },
    });
  };

  const handleConfirmDeleteChat = () => {
    setShowModal(true);
  };

  //xoá đoạn chat
  const deleteMessageMutation = useMutation(
    (channelId: number) => {
      return MessagesService.deletePrivateChannel(channelId);
    },
    {
      onSuccess: () => {
        dispatch(chatActions.removePrivateChannel(chatId));

        navigate('/chat');
      },
    },
  );
  const handleConfirmDelete = () => {
    deleteMessageMutation.mutate(Number(chatId));

    setShowModal(false);
  };

  const handleStreamPrivateMessage = useCallback(
    (event: any) => {
      try {
        const { sender_id, action = 'send' } = event.message;

        console.log('🤪 event.message', event.message);

        if (action === 'delete') {
          return dispatch(chatActions.removeMessageFromConversation(event.message.id));
        }
        console.log('listPrivateChannel2', listPrivateChannel);
        // Nếu người gửi chưa có trong danh sách chat thì cập nhật lại danh sách user chat
        const isNewSender = listPrivateChannel.findIndex((item: IUser) => +item.id === +sender_id) === -1;

        console.log('isNewSender', isNewSender);

        if (isNewSender) {
          queryClient.invalidateQueries(queryListPrivateChannel);
        }

        audioReceive.play();

        dispatch(chatActions.addMessageToConversation(event.message));
      } catch (error) {
        console.log('handlePrivateMessage', error);
      }
    },
    [listPrivateChannel],
  );

  useEffect(() => {
    if (!accessToken) return;

    window.Echo.connector.options.auth.headers['Authorization'] = `Bearer ${accessToken}`;

    window.Echo.private(`user.${localUserId}`).listen('.PrivateMessageSent', handleStreamPrivateMessage);

    return () => {
      window.Echo.private(`user.${localUserId}`).stopListening('.PrivateMessageSent', handleStreamPrivateMessage);
    };
  }, []);

  // trường hợp nhập id từ url cũng phải lấy thông tin user
  useEffect(() => {
    if (chatId) {
      dispatch(chatActions.getDetailUserChatById(chatId));
    }
    return () => {
      dispatch(chatActions.clearConversation());
    };
  }, [chatId]);

  // render
  return (
    <>
      {listPrivateChannel ? '' : null}
      <div id="content-page" className="content-page p-0">
        <Row>
          <Col sm="12">
            <Card className="mb-0">
              <Card.Body className="chat-page p-0">
                <div className="chat-data-block">
                  <Row>
                    <Col lg={3} className="chat-data-left scroller" style={{ paddingRight: '2px' }}>
                      <SideBar />
                    </Col>
                    <Col lg={9} className="chat-data p-0 chat-data-right border-start">
                      {chatId ? (
                        <ChatContextProvider value={{ chatId: chatId }}>
                          <div style={{ position: 'relative', minHeight: '100%' }}>
                            <HeaderChat onClickRemoveChat={handleConfirmDeleteChat} />

                            <ChatBox />

                            <ChatForm onSend={handleSendMessage} />
                          </div>
                        </ChatContextProvider>
                      ) : (
                        <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '100%' }}>
                          <h1>Chat với bạn bè nào 💬 ...</h1>
                        </div>
                      )}
                    </Col>
                  </Row>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
      <PopUpDeleteChat showModal={showModal} onClose={() => setShowModal(false)} onDelete={handleConfirmDelete} />
    </>
  );
};
