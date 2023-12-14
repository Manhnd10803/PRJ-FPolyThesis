import { MessagesService } from '@/apis/services/messages.service';
import sendMessageSound from '@/assets/mp3/send-message.mp3';
import { pathName } from '@/routes/path-name';
import { useMutation } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { ChatBox } from './components/chat-box';
import { ChatForm } from './components/chat-form';
import { HeaderChat } from './components/header-chat';
import { PopUpDeleteChat } from './components/pop-up-delete-chat';
import { SideBar } from './components/side-bar';
import { ChatContextProvider } from './context';
import { useSetConversation, useSetListPrivateChannel, useUserChatInfo } from '@/hooks/useChatQuery';

const audioSend = new Promise<HTMLAudioElement>(resolve => {
  resolve(new Audio(sendMessageSound));
});

export const ChatPage = () => {
  //state
  const { id: chatId = 0 } = useParams();

  const removeChannelId = useRef<number | null>(null);

  const { manuallySetListPrivateChannel } = useSetListPrivateChannel();
  const { manuallySetConversation } = useSetConversation();
  // this will be inferred as `ChatBoxHandle`
  type ChatBoxHandle = React.ElementRef<typeof ChatBox>;

  const chatBoxRef = useRef<ChatBoxHandle>(null);

  const navigate = useNavigate();

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
        const newData = {
          data: data.data,
          id: data.data.receiver_id,
        };
        manuallySetConversation('add', newData);
        const data2 = {
          data: data.data.receiver,
          id: data.data.receiver_id,
        };
        manuallySetListPrivateChannel('add', data2);
        //scroll to bottom  chat box
        chatBoxRef.current?.scrollToBottom();
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
        manuallySetListPrivateChannel('delete', removeChannelId.current!);
        navigate(pathName.CHAT);
      },
    },
  );
  const handleConfirmDelete = () => {
    deleteMessageMutation.mutate(removeChannelId.current!);

    setShowModal(false);
  };
  const { data: selectedUserInfo } = useUserChatInfo(Number(chatId));
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
                            <HeaderChat selectedUserInfo={selectedUserInfo} />

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
