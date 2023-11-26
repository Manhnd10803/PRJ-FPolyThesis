import { MessagesService } from '@/apis/services/messages.service';
import sendMessageSound from '@/assets/mp3/send-message.mp3';
import { IMessages } from '@/models/messages';
import { useAppDispatch } from '@/redux/hook';
import { chatActions } from '@/redux/slice';
import { pathName } from '@/routes/path-name';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { ChatBox } from './components/chat-box';
import { ChatForm } from './components/chat-form';
import { HeaderChat } from './components/header-chat';
import { PopUpDeleteChat } from './components/pop-up-delete-chat';
import { SideBar } from './components/side-bar';
import { ChatContextProvider } from './context';

const audioSend = new Promise<HTMLAudioElement>(resolve => {
  resolve(new Audio(sendMessageSound));
});

export const ChatPage = () => {
  //state
  const { id: chatId } = useParams();

  const removeChannelId = useRef<number | null>(null);

  // this will be inferred as `ChatBoxHandle`
  type ChatBoxHandle = React.ElementRef<typeof ChatBox>;

  const chatBoxRef = useRef<ChatBoxHandle>(null);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const [showModal, setShowModal] = useState(false);

  const socketID = window.Echo.socketId();

  const sendMessageMutation = useMutation((messageText: string) => {
    return MessagesService.sendMessages(Number(chatId), { content: messageText }, socketID);
  });

  const handleSendMessage = (message: string) => {
    sendMessageMutation.mutate(message, {
      onSuccess: ({ data }) => {
        // play sound
        audioSend.then(audio => audio.play());

        //scroll to bottom  chat box
        chatBoxRef.current?.scrollToBottom();

        dispatch(chatActions.addMessageToConversation(data.data as IMessages));
      },
    });
  };

  const handleConfirmDeleteChat = (id: number) => {
    removeChannelId.current = Number(id);
    setShowModal(true);
  };

  //xoá đoạn chat
  const deleteMessageMutation = useMutation(
    (channelId: number) => {
      return MessagesService.deletePrivateChannel(channelId);
    },
    {
      onSuccess: () => {
        dispatch(chatActions.removePrivateChannel(removeChannelId.current!));

        dispatch(chatActions.clearConversation());
        navigate(pathName.CHAT);
      },
    },
  );
  const handleConfirmDelete = () => {
    deleteMessageMutation.mutate(removeChannelId.current!);

    setShowModal(false);
  };

  // trường hợp nhập id từ url cũng phải lấy thông tin user
  useEffect(() => {
    if (chatId) {
      dispatch(chatActions.getDetailUserChatById(+chatId));
    }
    return () => {
      dispatch(chatActions.clearConversation());
    };
  }, [chatId]);

  // render
  return (
    <>
      <div id="content-page" className="content-page p-0">
        <Row>
          <Col sm="12">
            <Card className="mb-0">
              <Card.Body className="chat-page p-0">
                <div className="chat-data-block">
                  <ChatContextProvider value={{ chatId: Number(chatId), onClickRemoveChat: handleConfirmDeleteChat }}>
                    <Row>
                      <Col lg={3} className="chat-data-left scroller" style={{ paddingRight: '2px' }}>
                        <SideBar />
                      </Col>
                      <Col lg={9} className="chat-data p-0 chat-data-right border-start">
                        {chatId ? (
                          <div style={{ position: 'relative', minHeight: '100%' }}>
                            <HeaderChat />

                            <ChatBox ref={chatBoxRef} />

                            <ChatForm onSend={handleSendMessage} />
                          </div>
                        ) : (
                          <div
                            className="d-flex align-items-center justify-content-center"
                            style={{ minHeight: '100%' }}
                          >
                            <h1>Chat với bạn bè nào 💬 ...</h1>
                          </div>
                        )}
                      </Col>
                    </Row>
                  </ChatContextProvider>
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
